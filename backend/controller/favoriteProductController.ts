import chalk from 'chalk';
import { Request, Response } from 'express';
import {
  AddFavoriteProductDto,
  DeleteFavoriteProductDto,
  GetFavoriteProductDto,
} from '../dtos/favoriteProductDto';
import {
  addFavoriteProductService,
  deleteFavoriteProductByIdService,
  getFavoriteProductByUserIdService,
} from '../services/favoriteProductService';

const addFavoriteProduct = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body as AddFavoriteProductDto;
    console.log('1');
    const response = await addFavoriteProductService({
      userId,
      productId,
    });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed('addFavoriteProduct controller error:', error));
    return res.json({
      message: 'Add favorite product failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const getFavoriteProduct = async (req: Request, res: Response) => {
  try {
    const {userId, withProductDetail} = req.body as GetFavoriteProductDto;
    console.log('userId: ', userId);

    const response = await getFavoriteProductByUserIdService({userId, withProductDetail});

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed('getFavoriteProduct controller error:', error));
    return res.json({
      message: 'Fetch favorite product failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const deleteFavoriteProductByIds = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body as DeleteFavoriteProductDto;

    const response = await deleteFavoriteProductByIdService({
      userId,
      productId,
    });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed('getFavoriteProduct controller error:', error));
    return res.json({
      message: 'Fetch favorite product failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

module.exports = {
  addFavoriteProduct,
  getFavoriteProduct,
  deleteFavoriteProductByIds,
};
