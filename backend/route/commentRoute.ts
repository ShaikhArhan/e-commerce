import express from "express";
const commentController = require("../controller/commentController");
const userAuthorization = require("../middleware/userAuthorization");
const router = express.Router();

router.post(
    "/addComment",
    userAuthorization.userVerify(["user", "admin", "vendor"]),
    commentController.addComment
);
module.exports = router;