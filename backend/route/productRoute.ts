import express from "express";
const productController = require("../controller/productController");
const userAuthorization = require("../middleware/userAuthorization");
const router = express.Router();

router.post(
  "/addProduct",
  userAuthorization.userVerify(["admin", "vendor"]),
  productController.addProduct
);
router.post(
  "/addManyProduct",
  userAuthorization.userVerify("admin"),
  productController.addManyProduct
);
router.get(
  "/getProduct",
  userAuthorization.userVerify(["user", "admin", "vendor"]),
  productController.getProduct
);
router.get(
  "/getProductByAdmin",
  userAuthorization.userVerify("admin"),
  productController.getProductByAdmin
);
router.post(
  "/getProductById/:id",
  userAuthorization.userVerify(["user", "admin", "vendor"]),
  productController.getProductById
);
router.post(
  "/getProductByNameAndDescription",
  userAuthorization.userVerify(["user", "admin", "vendor"]),
  productController.getProductByNameAndDescription
);
router.patch(
  "/updatedProductById/:id",
  userAuthorization.userVerify(["admin", "vendor"]),
  productController.updatedProductById
);
router.delete(
  "/deleteProductById/:id",
  userAuthorization.userVerify(["admin", "vendor"]),
  productController.deleteProductById
);

module.exports = router;
