import chalk from "chalk";
import { db } from "../config/db";
import { CreateRatingDto } from "../dtos/ratingDto";
import { rating } from "../drizzle/schema/rating";
import { eq } from "drizzle-orm";

export const addRatingService = async (data: CreateRatingDto) => {
  try {
    const { productId, ratingDetail } = data;
    const { userId, rating: userRating, comment, usingProduct } = ratingDetail;
    if (
      !productId ||
      productId === undefined ||
      productId === null ||
      productId === "" ||
      !ratingDetail ||
      ratingDetail === undefined ||
      ratingDetail === null ||
      !userId ||
      userId === undefined ||
      userId === null ||
      userId === "" ||
      !userRating ||
      userRating === undefined ||
      userRating === null ||
      !comment ||
      comment === undefined ||
      comment === null ||
      comment === "" ||
      !usingProduct ||
      usingProduct === undefined ||
      usingProduct === null
    ) {
      throw new Error("All fields are required");
    }
    const response = await db.transaction(async (txDB) => {
      const existRating = await txDB
        .select()
        .from(rating)
        .where(eq(rating.productId, productId));

      if (existRating.length < 1) {
        const insertRating = await txDB
          .insert(rating)
          .values({
            productId,
            ratingDetail: [ratingDetail],
            totalRating: ratingDetail?.rating / 1,
          })
          .returning();
        return insertRating;
      }

      const insertRating = await txDB
        .update(rating)
        .set({
          ratingDetail: [
            ...existRating[0].ratingDetail,
            {
              userId: userId,
              rating: userRating,
              comment: comment,
              usingProduct: usingProduct,
              createdAt: new Date().toISOString(),
            },
          ],
          totalRating:
            (existRating[0].ratingDetail.reduce(
              (prev, curr) => prev + curr?.rating,
              0
            ) +
              userRating) /
              existRating[0].ratingDetail.length +
            1,
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
      message: "Rating added successfully",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("Rating service error:", error));
    return {
      message: "Add rating failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
