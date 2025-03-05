const express = require("express");
const razopayPaymentVerifyWebhook = require("../controllers/webhook.controllers");


const webhookRoute = express();


webhookRoute.route("/verify").post(razopayPaymentVerifyWebhook);


module.exports = webhookRoute;