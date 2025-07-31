import chalk from "chalk";
import { db } from "../config/db";
import { favoriteProduct } from "../drizzle/schema/favoriteProduct";
import {
  AddFavoriteProductDto,
  DeleteFavoriteProductDto,
  GetFavoriteProductDto,
} from "../dtos/favoriteProductDto";
import { and, eq } from "drizzle-orm";
import { products } from "../drizzle/schema/products";

export const addFavoriteProductService = async (
  data: AddFavoriteProductDto
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
        "user or product credentials required to add product in favorite product section"
      );
    }

    const [productExist] = await db
      .select()
      .from(favoriteProduct)
      .where(
        and(
          eq(favoriteProduct.userId, userId),
          eq(favoriteProduct.productId, productId)
        )
      )
      .limit(1);

    if (productExist || productExist != undefined || productExist != null) {
      throw new Error("product already exists in favorite product");
    }

    const response = await db
      .insert(favoriteProduct)
      .values({ userId, productId })
      .returning();

    if (!response) {
      throw new Error("Add favorite product failed");
    }

    return {
      data: response,
      message: "Add favorite product successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("addFavoriteProduct Service error:", error));
    return {
      message: "Add Favorite product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getFavoriteProductByUserIdService = async (
  data: GetFavoriteProductDto
) => {
  try {
    const { userId, withProductDetail } = data;
    if (userId === undefined || userId === null || userId === "") {
      throw new Error("user credentials required to get favorite product");
    }
    var response;
    if (withProductDetail) {
      response = await db
        .select({
          id: favoriteProduct.id,
          // userId: favoriteProduct.userId,
          productId: favoriteProduct.productId,
          product: {
            image: products.image,
            name: products.name,
            description: products.description,
            price: products.price,
            discount: products.discount,
            stockStatus: products.stockStatus,
            inStock: products.inStock,
          },
        })
        .from(favoriteProduct)
        .leftJoin(products, eq(favoriteProduct.productId, products.id))
        .where(eq(favoriteProduct.userId, userId));
    } else {
      response = await db
        .select()
        .from(favoriteProduct)
        .where(eq(favoriteProduct.userId, userId));
    }

    if (response.length === 0) {
      throw new Error("No favorite products found");
    }

    if (!response) {
      throw new Error("Get favorite product failed");
    }

    return {
      data: response,
      message: "Get favorite product successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("getFavoriteProduct Service error:", error));
    return {
      message: "Get Favorite product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const deleteFavoriteProductByIdService = async (
  data: DeleteFavoriteProductDto
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
        "user or product credentials required to delete favorite product"
      );
    }
    const response = await db
      .delete(favoriteProduct)
      .where(
        and(
          eq(favoriteProduct.userId, userId),
          eq(favoriteProduct.productId, productId)
        )
      )
      .returning();

    if (response.length === 0) {
      throw new Error("No favorite products found");
    }

    if (!response) {
      throw new Error("Get favorite product failed");
    }

    return {
      data: response,
      message: "Get favorite product successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("getFavoriteProduct Service error:", error));
    return {
      message: "Get Favorite product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
