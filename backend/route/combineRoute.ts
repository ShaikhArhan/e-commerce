import express from 'express';

const authRoute = require('./authRoute');
const tokenRoute = require('./tokenRoute');
const userRoute = require('./userRoute');
const productRoute = require('./productRoute');
const favoriteProductRoute = require('./favoriteProductRoute');
const cartRoute = require('./cartRoute');
const orderRoute = require('./orderRoute');

const userAuthentication = require('../middleware/userAuthentication');
const routes = express.Router();

routes.use('/auth', authRoute);

routes.use('/token', userAuthentication.userVerify, tokenRoute);

routes.use('/user', userAuthentication.userVerify, userRoute);

routes.use('/product', userAuthentication.userVerify, productRoute);

routes.use(
  '/favoriteProduct',
  userAuthentication.userVerify,
  favoriteProductRoute
);
routes.use('/cart', userAuthentication.userVerify, cartRoute);

routes.use('/order', userAuthentication.userVerify, orderRoute);

module.exports = routes;
