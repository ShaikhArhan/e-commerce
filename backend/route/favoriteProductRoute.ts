import express from 'express';

const favoriteProductController = require('../controller/favoriteProductController');
const userAuthorization = require('../middleware/userAuthorization');

const router = express.Router();

router.post(
  '/addFavoriteProduct',
  userAuthorization.userVerify(['user', 'admin', 'vendor']),
  favoriteProductController.addFavoriteProduct
);
router.post(
  '/getFavoriteProduct',
  userAuthorization.userVerify(['user', 'admin', 'vendor']),
  favoriteProductController.getFavoriteProduct
);
router.delete(
  '/deleteFavoriteProductByIds',
  userAuthorization.userVerify(['user', 'admin', 'vendor']),
  favoriteProductController.deleteFavoriteProductByIds
);

module.exports = router;
