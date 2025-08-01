import { Request, Response } from "express";
import { AddProductDto, UpdateProductDto } from "../dtos/productDto";
import {
  addManyProductService,
  addProductService,
  deleteProductByIdService,
  getProductByAdminService,
  getProductByIdService,
  getProductByNameAndDescriptionService,
  getProductService,
  updatedProductByIdService,
} from "../services/productService";
import chalk from "chalk";

const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      vendorId,
      vendorAddress,
      image,
      name,
      description,
      price,
      discount,
      stockStatus,
      inStock,
    } = req.body as AddProductDto;

    const response = await addProductService({
      vendorId,
      vendorAddress,
      image,
      name,
      description,
      price,
      discount,
      stockStatus,
      inStock,
    });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed("addProduct controller error:", error));
    return res.json({
      message: "Add product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const addManyProduct = async (req: Request, res: Response) => {
  try {
    const { productDatas } = req.body as { productDatas: Array<AddProductDto> };
    console.log(productDatas);

    const response = await addManyProductService(productDatas);

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed("addManyProduct controller error:", error));
    return res.json({
      message: "Add many product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const response = await getProductService();

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed("getProduct controller error:", error));
    return res.json({
      message: "Fetching product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getProductByAdmin = async (req: Request, res: Response) => {
  try {
    const response = await getProductByAdminService();

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed("getProduct controller error:", error));
    return res.json({
      message: "Fetching product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const response = await getProductByIdService(id);

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed("getProductById controller error:", error));
    return res.json({
      message: "Fetching specific product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getProductByNameAndDescription = async (req: Request, res: Response) => {
  try {
    const searchData: string = req.body.searchData;

    const response = await getProductByNameAndDescriptionService(searchData);

    return res.json(response);
  } catch (error) {
    console.error(
      chalk.bgRed("getProductByNameAndDescription controller error:", error)
    );
    return res.json({
      message: "Fetching specific product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updatedProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const {
      vendorAddress,
      image,
      name,
      description,
      price,
      discount,
      stockStatus,
      inStock,
    } = req.body as UpdateProductDto;

    const response = await updatedProductByIdService(id, {
      vendorAddress,
      image,
      name,
      description,
      price,
      discount,
      stockStatus,
      inStock,
    });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed("updatedProductById controller error:", error));
    return res.json({
      message: "Update specific product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const response = await deleteProductByIdService(id);

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed("updatedProductById controller error:", error));
    return res.json({
      message: "Update specific product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

module.exports = {
  addProduct,
  addManyProduct,
  getProduct,
  getProductByAdmin,
  getProductById,
  getProductByNameAndDescription,
  updatedProductById,
  deleteProductById,
};
