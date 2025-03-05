const express = require("express");
const { productListingController } = require("../controllers/product.controllers");
const upload = require("../helpers/multer");
const authMiddleware = require("../middleware/auth.middleware");
const authorization = require("../middleware/autho.middleware");


const productRoute = express();

productRoute.route("/add").post(authMiddleware, authorization(["seller"]), upload.single('image'), productListingController);


module.exports = productRoute