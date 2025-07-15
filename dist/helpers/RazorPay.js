const dotenv = require("dotenv");
dotenv.config();
const Razorpay = require("razorpay");

//Getting the key id and the key secret to make the instance of the razorpay.
const keyId = process.env.RAZOR_KEY_ID;
const keySecret = process.env.RAZOR_KEY_SECRET;

//Instance of the Razorpay.
const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret
});

//exporting the instance of the razorpay.
module.exports = razorpay;