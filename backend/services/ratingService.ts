import chalk from 'chalk';
import { db } from '../config/db';
import { CreateRatingDto } from '../dtos/ratingDto';
import { rating } from '../drizzle/schema/rating';
import { eq } from 'drizzle-orm';

export const addRatingService = async (data: CreateRatingDto) => {
  try {
    const { productId, ratingDetail } = data;
    const { userId, rating: userRating, comment, usingProduct } = ratingDetail
    if (!productId || !ratingDetail) {
      throw new Error('All fields are required');
    }
    const response = await db.transaction(async (txDB) => {
      const existRating = await txDB
        .select()
        .from(rating)
        .where(eq(rating.productId, productId));

      if (existRating.length < 1) {
        const insertRating = await txDB.insert(rating).values({
          productId,
          ratingDetail: [ratingDetail],
          totalRating: ratingDetail.rating / 1,
        }).returning();
        return insertRating
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
              createdAt: new Date().toISOString()
            },
          ],
        })
        .where(eq(rating.productId, productId))
        .returning();
    });
    // const response = await db
    //   .update(rating)
    //   .set({
    //     ratingDetail: [
    //       ...rating.ratingDetail,
    //       {
    //         userId: ratingDetail.userId,
    //         rating: ratingDetail.rating,
    //         comment: ratingDetail.comment,
    //         usingProduct: ratingDetail.usingProduct,
    //       },
    //     ],
    //   })
    //   .where(eq(rating.productId, productId))
    //   .returning();

    if (!response) {
      throw new Error('Add rating failed');
    }

    return {
      data: response,
      message: 'Rating added successfully',
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed('Rating service error:', error));
    return {
      message: 'Add rating failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
