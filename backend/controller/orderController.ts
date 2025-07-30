import chalk from 'chalk';
import { Request, Response } from 'express';
import {
  addProductOrderService,
  deleteProductOrderService,
  getProductOrderService,
  updateProductOrderService,
} from '../services/orderService';
import {
  AddProductOrderDto,
  DeleteOrderProductDto,
  GetProductOrderDto,
  UpdateProductOrderDto,
} from '../dtos/orderDto';

const addProductOrder = async (req: Request, res: Response) => {
  try {
    const { userId, orderProductDetailData, orderAddress, paymentMethod } =
      req.body as AddProductOrderDto;

    const response = await addProductOrderService({
      userId,
      orderProductDetailData,
      orderAddress,
      paymentMethod,
    });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed('addProductToCart controller error:', error));
    return res.json({
      message: 'Add product order failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const getProductOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body as GetProductOrderDto;

    const response = await getProductOrderService({ userId });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed('getProductToCart controller error:', error));
    return res.json({
      message: 'Fetch product order failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const updateProductOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, orderAddress, paymentMethod, orderStatus } =
      req.body as UpdateProductOrderDto;

    const response = await updateProductOrderService({
      orderId,
      orderAddress,
      paymentMethod,
      orderStatus,
    });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed('updateProductToCart controller error:', error));
    return res.json({
      message: 'Update product order failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const deleteProductOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body as DeleteOrderProductDto;

    const response = await deleteProductOrderService({ orderId });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed('deleteProductToCart controller error:', error));
    return res.json({
      message: 'Delete order product failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
module.exports = {
  addProductOrder,
  getProductOrder,
  updateProductOrder,
  deleteProductOrder,
};
