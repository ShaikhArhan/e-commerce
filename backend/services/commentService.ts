import chalk from "chalk";
import { db } from "../config/db";
import { comments } from "../drizzle/schema/comments";
import { eq } from "drizzle-orm";
import { AddCommentDto } from "../dtos/commentDto";
import { getProductsBuyedByProductIdService } from "./productsBuyedService";

export const addCommentService = async (data: AddCommentDto) => {
    try {
        const { productId, productComment } = data;

        const { userId, userComment } = productComment;

        if (
            !productId ||
            productId === undefined ||
            productId === null ||
            productId === "" ||
            !userId ||
            userId === undefined ||
            userId === null ||
            userId === "" ||
            !userComment ||
            userComment === undefined ||
            userComment === null ||
            userComment === ""
        ) {
            throw new Error("Product or user or comment data are required");
        }

        const productsBuyedExist = await getProductsBuyedByProductIdService({ productId })

        const userAlreadyBuyedProduct = productsBuyedExist?.data![0]?.allUsers?.filter((detail: any) => detail.userId === userId).length;

        const response = await db.transaction(async (txDB) => {
            const commentExist = await txDB
                .select()
                .from(comments)
                .where(eq(comments.productId, productId));

            if (commentExist?.length < 1) {
                const response = await txDB
                    .insert(comments)
                    .values({
                        productId: productId,
                        productComments: [
                            {
                                userId: userId,
                                userComment: userComment,
                                usingProduct: userAlreadyBuyedProduct,
                                likes: [],
                                replies: [],
                                createdAt: new Date().toISOString(),
                            }
                        ]
                    })
                    .returning();

                return response;
            }

            const response = await txDB
                .update(comments)
                .set({
                    productComments: [
                        ...commentExist[0].productComments,
                        {
                            userId: userId,
                            userComment: userComment,
                            usingProduct: userAlreadyBuyedProduct,
                            likes: [],
                            replies: [],
                            createdAt: new Date().toISOString(),
                        },
                    ],
                })
                .where(eq(comments.productId, productId))
                .returning();

            return response;
        });

        if (!response || response.length <= 0) {
            throw new Error("Add product comment failed");
        }

        return {
            data: response,
            status: true,
            message: "Add product comment successfully",
        };
    } catch (error) {
        console.error(chalk.bgRed("addComment service error:", error));
        return {
            message: "Add product comment failed",
            status: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
