import express from 'express';

const cartController = require('../controller/cartController');

const userAuthorization = require('../middleware/userAuthorization');
const routes = express.Router();

routes.post(
  '/addProductToCart',
  userAuthorization.userVerify(['user', 'admin', 'vendor']),
  cartController.addProductToCart
);
routes.post(
  '/getCartProductByUserId',
  userAuthorization.userVerify(['user', 'admin', 'vendor']),
  cartController.getCartProductByUserId
);
routes.post(
  '/getSpecificCartProductByUserId',
  userAuthorization.userVerify(['user', 'admin', 'vendor']),
  cartController.getSpecificCartProductByUserId
);
routes.patch(
  '/updateQuantityCartProduct',
  userAuthorization.userVerify(['user', 'admin', 'vendor']),
  cartController.updateQuantityCartProduct
);
routes.delete(
  '/deleteCartProduct',
  userAuthorization.userVerify(['user', 'admin', 'vendor']),
  cartController.deleteCartProduct
);

module.exports = routes;
