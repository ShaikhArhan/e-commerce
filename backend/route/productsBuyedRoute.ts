import express from "express";
const productsBuyedController = require("../controller/productsBuyedController");
const userAuthorization = require("../middleware/userAuthorization");
const router = express.Router();

router.post(
  "/addProductsBuyed",
  userAuthorization.userVerify(["user", "admin", "vendor"]),
  productsBuyedController.addProductsBuyed
);

router.post(
  "/getProductsBuyedByProductId",
  userAuthorization.userVerify(["user", "admin", "vendor"]),
  productsBuyedController.getProductsBuyedByProductId
);

module.exports = router;
