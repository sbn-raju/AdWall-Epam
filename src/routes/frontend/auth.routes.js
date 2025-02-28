const express = require("express");
const { frontendLoginPageController, frontendRegisterPageController } = require("../../controllers/frontend/auth.controllers.js");


const frontendAuthRoute = express.Router();


frontendAuthRoute.route("/login").get(frontendLoginPageController);

frontendAuthRoute.route("/register").get(frontendRegisterPageController);


module.exports = frontendAuthRoute;