import chalk from "chalk";
import { CreateRatingDto } from "../dtos/ratingDto";
import { Request, Response } from "express";
import { addRatingService } from "../services/ratingService";

const addRating = async (req: Request, res: Response) => {
  try {
    const { productId, ratingDetail } = req.body as CreateRatingDto;

    const response = await addRatingService({ productId, ratingDetail });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed("Login controller error:", error));
    return res.json({
      message: "Login failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

module.exports = {
  addRating,
};
