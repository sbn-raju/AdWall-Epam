const express = require('express');
const { frontendSellerDashboardControllers, frontendSellerRentalFormControllers } = require("../../controllers/frontend/seller.controllers.js");



const frontendSellerRoute = express.Router();


frontendSellerRoute.route("/dashboard").get(frontendSellerDashboardControllers);

frontendSellerRoute.route("/rental-form").get(frontendSellerRentalFormControllers);


module.exports = frontendSellerRoute;