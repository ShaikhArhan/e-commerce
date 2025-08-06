import chalk from "chalk";
import { db } from "../config/db";
import { productsBuyed } from "../drizzle/schema/productsBuyed";
import { eq } from "drizzle-orm";
import {
  AddProductBuyedDto,
  GetProductsBuyedByUserIdDto,
} from "../dtos/productBuyedDto";

export const addProductsBuyedService = async (data: AddProductBuyedDto) => {
  try {
    const { productId, userId } = data;
    if (
      !productId ||
      productId === undefined ||
      productId === null ||
      productId === "" ||
      !userId ||
      userId === undefined ||
      userId === null ||
      userId === ""
    ) {
      throw new Error(
        "product or user credentials are required to add in products buyed data"
      );
    }
    const response = await db.transaction(async (txDB) => {
      const productsBuyedExist = await txDB
        .select()
        .from(productsBuyed)
        .where(eq(productsBuyed.productId, productId));

      if (productsBuyedExist?.length < 1) {
        const response = await txDB
          .insert(productsBuyed)
          .values({
            productId: productId,
            allUsers: [userId],
            totalBuyedQuantity: 1,
          })
          .returning();

        return response;
      }

      const response = await txDB
        .update(productsBuyed)
        .set({
          allUsers: [...productsBuyedExist[0].allUsers, userId],
          totalBuyedQuantity: productsBuyedExist[0].allUsers.length + 1,
        })
        .where(eq(productsBuyed.productId, productId))
        .returning();

      return response;
    });

    if (!response) {
      throw new Error("Add user in products buyed data failed");
    }

    if (response.length === 0) {
      throw new Error("No products buyed data available");
    }

    return {
      data: response,
      status: true,
      message: "Add user in products buyed data successfully",
    };
  } catch (error) {
    console.error(chalk.bgRed("addProductsBuyed service error:", error));
    return {
      message: "Add user in products buyed data failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getProductsBuyedByProductIdService = async (
  data: GetProductsBuyedByUserIdDto
) => {
  try {
    const { productId } = data;

    if (productId === "" || productId === undefined || productId === null) {
      throw new Error(
        "Product data is required for fetching specific product buyed data"
      );
    }

    const response = await db
      .select({
        id: productsBuyed.id,
        productId: productsBuyed.productId,
        allUsers: productsBuyed.allUsers,
        totalBuyedQuantity: productsBuyed.totalBuyedQuantity,
        createdAt: productsBuyed.createdAt,
      })
      .from(productsBuyed)
      .where(eq(productsBuyed.productId, productId));

    if (!response) {
      throw new Error("Fecth specific product buyed data failed");
    }

    if (response.length === 0) {
      throw new Error("No specific product buyed data available");
    }

    return {
      data: response,
      status: true,
      message: "Fetched specific product buyed data successfully",
    };
  } catch (error) {
    console.error(
      chalk.bgRed("getProductsBuyedByProductId service error:", error)
    );
    return {
      message: "Fetch specific product buyed data failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
