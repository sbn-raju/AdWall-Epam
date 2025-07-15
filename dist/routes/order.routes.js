const express = require("express");
const {
  listOrdersController
} = require("../controllers/orders.controllers");
const authMiddleware = require("../middleware/auth.middleware");
const orderRoute = express();
orderRoute.route("/list").get(authMiddleware, listOrdersController);
module.exports = orderRoute;