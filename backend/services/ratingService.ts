import chalk from "chalk";
import { db } from "../config/db";
import { CreateRatingDto, FetchRatingByProductIdDto } from "../dtos/ratingDto";
import { rating } from "../drizzle/schema/rating";
import { eq } from "drizzle-orm";
import { ratingChecker } from "../util/numberHelper";
import { addCommentService } from "./commentService";
import { getProductsBuyedByProductIdService } from "./productsBuyedService";

export const addRatingService = async (data: CreateRatingDto) => {
  try {
    const { productId, ratingDetail } = data;
    const { userId, comment } = ratingDetail;
    const userRating = ratingChecker(ratingDetail.rating);
    if (
      !productId ||
      productId === undefined ||
      productId === null ||
      productId === "" ||
      // !ratingDetail ||
      // ratingDetail === undefined ||
      // ratingDetail === null ||
      !userId ||
      userId === undefined ||
      userId === null ||
      userId === "" ||
      !userRating ||
      userRating === undefined ||
      userRating === null
      // ||
      // !comment ||
      // comment === undefined ||
      // comment === null ||
      // comment === "" 
    ) {
      throw new Error("All fields are required for product rating or comment");
    }

    const insertComment = await addCommentService({
      productId,
      productComment: { userId, userComment: comment }
    });

    const { data: commentData, status: commentStatus, message: commentMessage, error: commentError } = insertComment

    // if (commentStatus === false || commentError) {
    //   throw new Error(commentError);
    // }

    const productsBuyedExist = await getProductsBuyedByProductIdService({ productId })

    const userAlreadyBuyedProduct = productsBuyedExist?.data![0]?.allUsers?.filter((detail: any) => detail.userId === userId).length;

    const response = await db.transaction(async (txDB) => {
      const existRating = await txDB
        .select()
        .from(rating)
        .where(eq(rating.productId, productId));

      const userAlreadyRated = existRating[0]?.ratingDetail?.some(
        (detail: any) => detail.userId === userId
      );

      if (userAlreadyRated) {
        throw new Error("Already rated");
      }

      if (existRating.length < 1) {
        const insertRating = await txDB
          .insert(rating)
          .values({
            productId,
            ratingDetail: [
              {
                userId: userId,
                rating: userRating,
                usingProduct: userAlreadyBuyedProduct,
                createdAt: new Date().toISOString(),
              },
            ],
            totalRating: userRating,
            commentId: commentData![0]?.id,
          })
          .returning();

        return insertRating;
      }

      const totalRating =
        (existRating[0].ratingDetail.reduce(
          (prev, curr) => prev + curr?.rating,
          0
        ) +
          userRating) /
        (existRating[0].ratingDetail.length + 1);

      const insertRating = await txDB
        .update(rating)
        .set({
          ratingDetail: [
            ...existRating[0].ratingDetail,
            {
              userId: userId,
              rating: userRating,
              usingProduct: userAlreadyBuyedProduct,
              createdAt: new Date().toISOString(),
            },
          ],
          totalRating: ratingChecker(totalRating),
        })
        .where(eq(rating.productId, productId))
        .returning();

      return insertRating;
    });

    if (!response) {
      throw new Error("Add rating failed");
    }

    return {
      data: response,
      status: true,
      message: commentStatus ? "Rating and comment added successfully" : "Rating added",
    };
  } catch (error) {
    console.error(chalk.bgRed("addRating service error:", error));
    return {
      message: "Add rating failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getRatingService = async () => {
  try {
    const response = await db.select().from(rating);

    if (!response) {
      throw new Error("Fecth rating failed");
    }

    if (response.length === 0) {
      throw new Error("No rating available");
    }

    return {
      data: response,
      status: true,
      message: "Fetched rating successfully",
    };
  } catch (error) {
    console.error(chalk.bgRed("getRating service error:", error));
    return {
      message: "Fetch rating failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getRatingByProductIdService = async (
  data: FetchRatingByProductIdDto
) => {
  try {
    const { productId } = data;

    if (productId === "" || productId === undefined || productId === null) {
      throw new Error(
        "Product data is required for fetching specific product rating"
      );
    }

    const response = await db
      .select()
      .from(rating)
      .where(eq(rating.productId, productId));

    if (!response) {
      throw new Error("Fecth specific rating failed");
    }

    if (response.length === 0) {
      throw new Error("No specific rating available");
    }

    return {
      data: response,
      status: true,
      message: "Fetched specific rating successfully",
    };
  } catch (error) {
    console.error(chalk.bgRed("getRatingByProductId service error:", error));
    return {
      message: "Fetch specific rating failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
