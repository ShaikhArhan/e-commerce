import chalk from 'chalk';
import { Request, Response } from 'express';
import {
  addProductToCartService,
  deleteProductInCartService,
  getCartProductService,
  getSpecificCartProductService,
  updateQuantityCartProductService,
} from '../services/cartService';
import {
  AddProductToCartDto,
  DeleteCartProductDto,
  GetCartProduct,
  GetSpecificCartProduct,
  updateQuantityCartProductDto,
} from '../dtos/cartDto';

const addProductToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body as AddProductToCartDto;

    const response = await addProductToCartService({ userId, productId });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed('addProductToCart controller error:', error));
    return res.json({
      message: 'Add product to cart failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const getCartProductByUserId = async (req: Request, res: Response) => {
  try {
    const { userId, withProductDetail } = req.body as GetCartProduct;

    const response = await getCartProductService({ userId, withProductDetail });

    return res.json(response);
  } catch (error) {
    console.error(
      chalk.bgRed('getCartProductByUserId controller error:', error)
    );
    return res.json({
      message: 'Fetch cart product failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const getSpecificCartProductByUserId = async (req: Request, res: Response) => {
  try {
    const { userId, productId, withProductDetail } =
      req.body as GetSpecificCartProduct;

    const response = await getSpecificCartProductService({
      userId,
      productId,
      withProductDetail,
    });

    return res.json(response);
  } catch (error) {
    console.error(
      chalk.bgRed('getSpecificCartProductByUserId controller error:', error)
    );
    return res.json({
      message: 'Fetch specific cart product failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const updateQuantityCartProduct = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } =
      req.body as updateQuantityCartProductDto; // I am thinking that in currentQuantity product quantity will get stored, but problem is that when ever a person decrease or increase the product quantity then it will again call the api which will create an api traffic, so to reduce the traffic we wil use the debounce in which at UI when user click frequently then the number will get increase and decrese, but after one or two seconds it will take that quantity value and store it and call the api to update quantity.

    const response = await updateQuantityCartProductService({
      userId,
      productId,
      quantity,
    });

    return res.json(response);
  } catch (error) {
    console.error(
      chalk.bgRed('updateQuantityCartProduct controller error:', error)
    );
    return res.json({
      message: 'Update quantity cart product failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const deleteCartProduct = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body as DeleteCartProductDto;

    const response = await deleteProductInCartService({ userId, productId });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed('deleteProductInCart controller error:', error));
    return res.json({
      message: 'Delete cart product failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

module.exports = {
  addProductToCart,
  getCartProductByUserId,
  getSpecificCartProductByUserId,
  updateQuantityCartProduct,
  deleteCartProduct,
};
