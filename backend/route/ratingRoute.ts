import express from 'express';
const ratingController = require('../controller/ratingController');
const userAuthorization = require('../middleware/userAuthorization');
const router = express.Router();

router.post(
  '/addRating',
  userAuthorization.userVerify(['admin', 'vendor']),
  ratingController.addRating
);

module.exports = router;