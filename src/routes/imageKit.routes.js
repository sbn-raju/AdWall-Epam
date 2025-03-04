const express = require("express");
const { imageKitAuthentication } = require("../controllers/imageKit.controllers.js");


const imageKitRoute = express();


imageKitRoute.route("/auth/image-kit").post(imageKitAuthentication);


module.exports = imageKitRoute