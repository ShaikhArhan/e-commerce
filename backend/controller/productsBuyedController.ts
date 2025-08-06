import chalk from "chalk";
import { Request, Response } from "express";
import {
  addProductsBuyedService,
  getProductsBuyedByProductIdService,
} from "../services/productsBuyedService";
import {
  AddProductBuyedDto,
  GetProductsBuyedByUserIdDto,
} from "../dtos/productBuyedDto";

const addProductsBuyed = async (req: Request, res: Response) => {
  try {
    const { productId, userId } = req.body as AddProductBuyedDto;

    const response = await addProductsBuyedService({ productId, userId });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed("addProductsBuyed controller error:", error));
    return res.json({
      message: "Add products buyed data failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getProductsBuyedByProductId = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body as GetProductsBuyedByUserIdDto;

    const response = await getProductsBuyedByProductIdService({ productId });

    return res.json(response);
  } catch (error) {
    console.error(
      chalk.bgRed("getProductsBuyedByProductId controller error:", error)
    );
    return res.json({
      message: "Fetch products buyed data by product id failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

module.exports = {
  addProductsBuyed,
  getProductsBuyedByProductId,
};
