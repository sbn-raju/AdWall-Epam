const express = require("express");
const {
  productListingController,
  getProductsController,
  singleProductController,
  sellerAdsListControllers,
  wallOnRentControllers,
  singleProductOnRentController,
  wallOnRentBuyerControllers
} = require("../controllers/product.controllers");
const upload = require("../helpers/multer");
const authMiddleware = require("../middleware/auth.middleware");
const authorization = require("../middleware/autho.middleware");
const productRoute = express();
productRoute.route("/add").post(authMiddleware, authorization(["seller"]), upload.single('image'), productListingController);
//Seller Routes.
productRoute.route("/seller/walls").get(authMiddleware, sellerAdsListControllers);
productRoute.route("/seller/rented").get(authMiddleware, wallOnRentControllers);
productRoute.route("/rent-single").get(authMiddleware, singleProductOnRentController);

//Buyer Routes
productRoute.route("/buyer/rented").get(authMiddleware, wallOnRentBuyerControllers);

//Public Route.
productRoute.route("/list").get(getProductsController);
productRoute.route("/single").get(singleProductController);
module.exports = productRoute;