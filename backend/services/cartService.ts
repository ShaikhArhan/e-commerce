import chalk from "chalk";
import {
  AddProductToCartDto,
  DeleteCartProductDto,
  GetCartProduct,
  GetSpecificCartProduct,
  updateQuantityCartProductDto,
} from "../dtos/cartDto";
import { db } from "../config/db";
import { products } from "../drizzle/schema/products";
import { and, eq, sql } from "drizzle-orm";
import { cart } from "../drizzle/schema/cart";

export const addProductToCartService = async (data: AddProductToCartDto) => {
  try {
    const { userId, productId } = data;

    if (!userId || userId === "" || !productId || productId === "") {
      throw new Error(
        "user or product credentials required to add product to cart"
      );
    }

    const [productExistInCart] = await db
      .select()
      .from(cart)
      .where(and(eq(cart.userId, userId), eq(cart.productId, productId)))
      .limit(1);

    if (
      productExistInCart ||
      productExistInCart != undefined ||
      productExistInCart != null
    ) {
      throw new Error("Product already exist in cart");
    }

    const response = await db.transaction(async (txDB) => {
      const [productData] = await txDB
        .select({
          price: products.price,
          discount: products.discount,
          inStock: products.inStock,
        })
        .from(products)
        .where(eq(products.id, productId));

      if (productData.inStock <= 0) {
        throw new Error("Out of stock product can not be add to cart.");
      }
      const productPrice = Number(productData.price);
      const productDiscount = Number(productData.discount);

      const totalPrice: number = parseInt(
        (productPrice - productPrice * (productDiscount / 100)).toFixed(2)
      );

      const response = await txDB
        .insert(cart)
        .values({
          userId,
          productId,
          quantity: 1,
          totalPrice,
        })
        .returning();

      return response;
    });

    if (!response) {
      throw new Error("Add product to cart failed");
    }

    return {
      data: response,
      message: "Add product to cart successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("addProductToCart service error:", error));
    return {
      message: "Add product to cart failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getCartProductService = async (data: GetCartProduct) => {
  try {
    const { userId, withProductDetail } = data;

    if (!userId || userId === "") {
      throw new Error("user credentials required to fetch cart product");
    }
    var response;
    if (withProductDetail) {
      response = await db
        .select({
          id: cart.id,
          userId: cart.userId,
          productId: cart.productId,
          product: {
            image: products.image,
            name: products.name,
            description: products.description,
            price: products.price,
            discount: products.discount,
            stockStatus: products.stockStatus,
            inStock: products.inStock,
          },
          quantity: cart.quantity,
          totalPrice: cart.totalPrice,
        })
        .from(cart)
        .leftJoin(products, eq(cart.productId, products.id))
        .where(eq(cart.userId, userId));
    } else {
      response = await db.select().from(cart).where(eq(cart.userId, userId));
    }

    if (!response) {
      throw new Error("Fetch cart product failed");
    }

    return {
      data: response,
      message: "Fetch cart product successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("getCartProduct service error:", error));
    return {
      message: "Fetch cart product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getSpecificCartProductService = async (
  data: GetSpecificCartProduct
) => {
  try {
    const { userId, productId, withProductDetail } = data;

    if (!userId || userId === "" || !productId || productId === "") {
      throw new Error(
        "user or product credentials required to fetch specific cart product"
      );
    }
    var response;
    if (withProductDetail) {
      response = await db
        .select({
          id: cart.id,
          userId: cart.userId,
          productId: cart.productId,
          product: {
            image: products.image,
            name: products.name,
            description: products.description,
            price: products.price,
            discount: products.discount,
            stockStatus: products.stockStatus,
            inStock: products.inStock,
          },
          quantity: cart.quantity,
          totalPrice: cart.totalPrice,
        })
        .from(cart)
        .leftJoin(products, eq(cart.productId, products.id))
        .where(and(eq(cart.userId, userId), eq(cart.productId, productId)));
    } else {
      response = await db
        .select()
        .from(cart)
        .where(and(eq(cart.userId, userId), eq(cart.productId, productId)));
    }

    if (!response) {
      throw new Error("Fetch specific cart product failed");
    }

    return {
      data: response,
      message: "Fetch specific cart product successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("getSpecificCartProduct service error:", error));
    return {
      message: "Fetch specific cart product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const updateQuantityCartProductService = async (
  data: updateQuantityCartProductDto
) => {
  try {
    const { userId, productId, quantity } = data;

    if (
      userId === undefined ||
      userId === null ||
      userId === "" ||
      productId === undefined ||
      productId === null ||
      productId === "" ||
      quantity === undefined ||
      quantity === null
    ) {
      throw new Error(
        "user or product details needed to update quantity in cart"
      );
    }
    if (quantity <= 0) {
      throw new Error("cart product quantity can not be smaller then 1");
    }

    const response = await db.transaction(async (txDB) => {
      const [existingCart] = await txDB
        .select({
          id: cart.id,
          userId: cart.userId,
          productId: cart.productId,
          product: {
            image: products.image,
            name: products.name,
            description: products.description,
            price: products.price,
            discount: products.discount,
            stockStatus: products.stockStatus,
            inStock: products.inStock,
          },
          quantity: cart.quantity,
          totalPrice: cart.totalPrice,
        })
        .from(cart)
        .leftJoin(products, eq(cart.productId, products.id))
        .where(and(eq(cart.userId, userId), eq(cart.productId, productId)))
        .limit(1);

      if (
        !existingCart?.product ||
        existingCart.product.inStock === undefined ||
        existingCart.product.inStock === null
      ) {
        throw new Error("Product stock information is unavailable");
      }
      if (quantity > existingCart.product.inStock) {
        throw new Error(
          `product quantity is out of stock, current stock - ${existingCart.product.inStock}`
        );
      }
      let totalPrice: number =
        (Number(existingCart.totalPrice) / Number(existingCart.quantity)) *
        quantity;

      const response = await txDB
        .update(cart)
        .set({
          quantity,
          totalPrice,
        })
        .where(and(eq(cart.userId, userId), eq(cart.productId, productId)))
        .returning();

      return response;
    });

    if (!response) {
      throw new Error("Update quantity cart product failed");
    }
    if (response.length === 0) {
      throw new Error("No cart product found");
    }

    return {
      data: response,
      message: "Update quantity cart product successful",
      status: true,
    };
  } catch (error) {
    console.error(
      chalk.bgRed("updateQuantityCartProduct service error:", error)
    );
    return {
      message: "Update quantity cart product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const deleteProductInCartService = async (
  data: DeleteCartProductDto
) => {
  try {
    const { userId, productId } = data;

    if (
      userId === undefined ||
      userId === null ||
      userId === "" ||
      productId === undefined ||
      productId === null ||
      productId === ""
    ) {
      throw new Error(
        "user or product credentials required to delete cart product"
      );
    }

    const response = await db
      .delete(cart)
      .where(and(eq(cart.userId, userId), eq(cart.productId, productId)))
      .returning();

    if (!response) {
      throw new Error("Delete cart product failed");
    }
    if (response.length === 0) {
      throw new Error("No cart product found");
    }

    return {
      data: response,
      message: "Delete cart product successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("deleteProductInCart service error:", error));
    return {
      message: "Delete cart product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
