const express = require("express");
const { createNewOrderController } = require("../controllers/razorpay.controllers");

const razorpayRoute = express();

//This Route is for creating the new order.
razorpayRoute.route("/create-order").post(createNewOrderController);

//This Route is for adding payment details from the user.
razorpayRoute.route("/place-order").post();



module.exports = razorpayRoute;