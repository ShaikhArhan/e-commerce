import express from 'express';

const route = express.Router();
const authController = require('../controller/authController');

route.post('/login', authController.Login);
route.post('/register', authController.Register);

module.exports = route;
