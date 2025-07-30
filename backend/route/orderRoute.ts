import express from 'express';

const orderController = require('../controller/orderController');

const userAuthorization = require('../middleware/userAuthorization');
const routes = express.Router();

routes.post(
  '/addProductOrder',
  userAuthorization.userVerify(['user', 'admin', 'vendor']),
  orderController.addProductOrder
);
routes.post(
  '/getProductOrder',
  userAuthorization.userVerify(['user', 'admin', 'vendor']),
  orderController.getProductOrder
);
routes.patch(
  '/updateProductOrder',
  userAuthorization.userVerify('admin'),
  orderController.updateProductOrder
);
routes.delete(
  '/deleteProductOrder',
  userAuthorization.userVerify(['user', 'admin', 'vendor']),
  orderController.deleteProductOrder
);

module.exports = routes;
