import chalk from "chalk";
import { db } from "../config/db";
import {
  AddProductOrderDto,
  DeleteOrderProductDto,
  GetProductOrderDto,
  UpdateProductOrderDto,
} from "../dtos/orderDto";
import { order } from "../drizzle/schema/order";
import { and, eq, inArray } from "drizzle-orm";
import { cart } from "../drizzle/schema/cart";
import { products } from "../drizzle/schema/products";
import { addProductsBuyedService } from "./productsBuyedService";

export const addProductOrderService = async (data: AddProductOrderDto) => {
  try {
    const { userId, orderProductDetailData, orderAddress, paymentMethod } =
      data;

    if (
      userId === undefined ||
      userId === null ||
      userId === "" ||
      orderProductDetailData === undefined ||
      orderProductDetailData?.length === 0 ||
      orderAddress === undefined ||
      orderAddress === null ||
      orderAddress === "" ||
      paymentMethod === undefined ||
      paymentMethod === null
    ) {
      throw new Error(
        "user or order credentials required to add product order"
      );
    }

    const productIds = await orderProductDetailData?.map(
      (data) => data.productId
    );

    const orderProductQuantity = await Object.fromEntries(
      orderProductDetailData?.map((data) => [data.productId, data.quantity])
    );

    const productExistInCart = await db
      .select()
      .from(cart)
      .where(and(eq(cart.userId, userId), inArray(cart.productId, productIds)));

    if (
      !productExistInCart ||
      productExistInCart.length !== productIds.length
    ) {
      throw new Error(
        "Product not exist in cart, direct order not accessible!"
      );
    }

    const response = await db.transaction(async (txDB) => {
      const productFromCart = await txDB
        .select({
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
        .where(
          and(eq(cart.userId, userId), inArray(cart.productId, productIds))
        );

      if (!productFromCart || productFromCart.length !== productIds.length) {
        throw new Error(
          "Product not exist in cart, direct order not accessible!"
        );
      }

      const productDeleteFromCart = await txDB
        .delete(cart)
        .where(
          and(eq(cart.userId, userId), inArray(cart.productId, productIds))
        )
        .returning();

      if (
        !productDeleteFromCart ||
        productDeleteFromCart.length !== productIds.length
      ) {
        throw new Error(
          "Product not transfer from cart to order, try again to order!"
        );
      }
      const totalOrderProduct: number = productFromCart?.reduce(
        (total, product) => total + product.quantity,
        0
      );

      const response = await txDB
        .insert(order)
        // @ts-ignore
        .values({
          userId,
          orderProductDetail: productFromCart,
          totalOrderProduct,
          orderAddress,
          paymentMethod,
        })
        .returning();

      for (const [key, value] of Object.entries(orderProductQuantity)) {
        const [productInStock] = await db
          .select({
            inStock: products.inStock,
          })
          .from(products)
          .where(eq(products.id, key))
          .limit(1);

        await txDB
          .update(products)
          .set({ inStock: productInStock.inStock - value })
          .where(eq(products.id, key))
          .returning();

        await addProductsBuyedService({ productId: key, userId: userId });
      }

      return response;
    });

    if (!response) {
      throw new Error("Add product order failed");
    }

    return {
      data: response,
      message: "Add product order successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("addProductOrder service error:", error));
    return {
      message: "Add product order failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getProductOrderService = async (data: GetProductOrderDto) => {
  try {
    const { userId } = data;
    if (userId === undefined || userId === null || userId === "") {
      throw new Error("user credentials required to get user order product");
    }

    const response = await db
      .select()
      .from(order)
      .where(eq(order.userId, userId));

    if (!response) {
      throw new Error("Fetch product order failed");
    }
    if (response.length === 0) {
      throw new Error("No product order found");
    }

    return {
      data: response,
      message: "Fetch product order successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("getProductOrder service error:", error));
    return {
      message: "Fetch product order failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const updateProductOrderService = async (
  data: UpdateProductOrderDto
) => {
  try {
    const { orderId, orderAddress, paymentMethod, orderStatus } = data;

    if (
      orderId === undefined ||
      orderId === null ||
      orderId === "" ||
      orderAddress === undefined ||
      orderAddress === null ||
      orderAddress === "" ||
      paymentMethod === undefined ||
      paymentMethod === null ||
      orderStatus === undefined ||
      orderStatus === null
    ) {
      throw new Error("order id required to delete product order");
    }

    const response = await db
      .update(order)
      .set({
        orderAddress,
        paymentMethod,
        orderStatus,
      })
      .where(eq(order.id, orderId))
      .returning();

    if (!response) {
      throw new Error("Delete product order failed");
    }
    if (response.length === 0) {
      throw new Error("No product order found");
    }

    return {
      data: response,
      message: "Delete product order successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("deleteProductOrder service error:", error));
    return {
      message: "Delete product order failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const deleteProductOrderService = async (
  data: DeleteOrderProductDto
) => {
  try {
    const { orderId } = data;
    if (orderId === undefined || orderId === null || orderId === "") {
      throw new Error("order id required to delete product order");
    }

    const response = await db.transaction(async (txDB) => {
      const [orderDelivered] = await txDB
        .select({ orderStatus: order.orderStatus })
        .from(order)
        .where(eq(order.id, orderId))
        .limit(1);
      if (orderDelivered.orderStatus !== "delivered") {
        throw new Error("undelivered orders cannot be deleted ");
      }
      const response = await txDB
        .delete(order)
        .where(eq(order.id, orderId))
        .returning();
      return response;
    });

    if (!response) {
      throw new Error("Delete product order failed");
    }
    if (response.length === 0) {
      throw new Error("No product order found");
    }

    return {
      data: response,
      message: "Delete product order successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("deleteProductOrder service error:", error));
    return {
      message: "Delete product order failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
