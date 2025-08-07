import { Request, Response } from "express";
import { AddCommentDto } from "../dtos/commentDto";
import { addCommentService } from "../services/commentService";
import chalk from "chalk";

const addComment = async (req: Request, res: Response) => {
    try {
        const { productId, productComment } = req.body as AddCommentDto;

        const response = await addCommentService({ productId, productComment });

        return res.json(response);
    } catch (error) {
        console.error(chalk.bgRed("addComment controller error:", error));
        return res.json({
            message: "Add Comment failed",
            status: false,
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

module.exports = {
    addComment,
};