import chalk from "chalk";
import { CreateRatingDto, FetchRatingByProductIdDto } from "../dtos/ratingDto";
import { Request, Response } from "express";
import {
  addRatingService,
  getRatingByProductIdService,
  getRatingService,
} from "../services/ratingService";

const addRating = async (req: Request, res: Response) => {
  try {
    const { productId, ratingDetail } = req.body as CreateRatingDto;

    const response = await addRatingService({ productId, ratingDetail });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed("addRating controller error:", error));
    return res.json({
      message: "Add rating failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getRating = async (req: Request, res: Response) => {
  try {
    const response = await getRatingService();

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed("getRating controller error:", error));
    return res.json({
      message: "Fetch rating failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getRatingByProductId = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body as FetchRatingByProductIdDto;

    const response = await getRatingByProductIdService({ productId });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed("getRating controller error:", error));
    return res.json({
      message: "Fetch rating failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

module.exports = {
  addRating,
  getRating,
  getRatingByProductId,
};
