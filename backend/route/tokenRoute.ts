import express from 'express';
const tokenController = require('../controller/tokenController');
const userAuthorization = require('../middleware/userAuthorization');
const route = express.Router();

route.post(
  '/verifyToken',
  userAuthorization.userVerify(['user', 'admin', 'vendor']),
  tokenController.getDecodeToken
);

module.exports = route;
