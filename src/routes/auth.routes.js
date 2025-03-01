const express = require('express');
const { backendAuthLoginControllers, backendAuthRegisterControllers } = require('../controllers/auth.controllers');

const backendAuthRoute = express();


backendAuthRoute.route("/login").post(backendAuthLoginControllers);

backendAuthRoute.route("/register").post(backendAuthRegisterControllers);


module.exports = backendAuthRoute