const express = require("express");
const { createNewOrderController, placeNewOrderController } = require("../controllers/razorpay.controllers");
const authMiddleware = require("../middleware/auth.middleware");

const razorpayRoute = express();

//This Route is for creating the new order.
razorpayRoute.route("/create-order").post(authMiddleware, createNewOrderController);

//This Route is for adding payment details from the user.
razorpayRoute.route("/place-order").post(placeNewOrderController);



module.exports = razorpayRoute;