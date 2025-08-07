import express from "express";

const authRoute = require("./authRoute");
const tokenRoute = require("./tokenRoute");
const userRoute = require("./userRoute");
const productRoute = require("./productRoute");
const favoriteProductRoute = require("./favoriteProductRoute");
const cartRoute = require("./cartRoute");
const orderRoute = require("./orderRoute");
const ratingRoute = require("./ratingRoute");
const productsBuyedRoute = require("./productsBuyedRoute");
const commentRoute = require("./commentRoute");

const userAuthentication = require("../middleware/userAuthentication");
const routes = express.Router();

routes.use("/auth", authRoute);

routes.use("/token", userAuthentication.userVerify, tokenRoute);

routes.use("/user", userAuthentication.userVerify, userRoute);

routes.use("/product", userAuthentication.userVerify, productRoute);

routes.use(
  "/favoriteProduct",
  userAuthentication.userVerify,
  favoriteProductRoute
);
routes.use("/cart", userAuthentication.userVerify, cartRoute);

routes.use("/order", userAuthentication.userVerify, orderRoute);

routes.use("/rating", userAuthentication.userVerify, ratingRoute);

routes.use("/productsBuyed", userAuthentication.userVerify, productsBuyedRoute);

routes.use("/comment", userAuthentication.userVerify, commentRoute);

module.exports = routes;
