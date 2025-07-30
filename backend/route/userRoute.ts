import express from 'express';

const userController = require('../controller/userController');

const userAuthorization = require('../middleware/userAuthorization');
const routes = express.Router();

routes.get(
  '/getUser',
  userAuthorization.userVerify('admin'),
  userController.getUser
);
module.exports = routes;
