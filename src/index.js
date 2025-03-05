const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const backendAuthRoute = require("./routes/auth.routes");
const razorpayRoute = require("./routes/razorpay.routes");
const productRoute = require("./routes/product.routes");



//Configuration of the dotenv.
dotenv.config();

//Creating the app object of the express.
const app = express();

//Applying the cors
app.use(cors({
  origin: ["http://localhost:5173", "https://cc01-103-255-144-74.ngrok-free.app"], 
  credentials: true
}));


//Making the middlwares to read the input from the request.
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Using the Cookie Parser.
app.use(cookieParser());



//Getting the PORT from the env.
const PORT = process.env.PORT || 5000;



//This Route is for the authentication Pages and backend routes
//***********************AUTH BACKEND ROUTES************************** */
app.use("/api/v1.Adwall/auth", backendAuthRoute);


//This Route will show the seller dashboards.
//***********************SELLER BACKEND DASHBOARD ROUTES************************* */
app.use("/api/v1.Adwall/product", productRoute)

//This Route will show the seller dashboards.
//***********************BUYER BACKEND DASHBOARD ROUTES************************* */




//Integrateing the payement gateway.
app.use("/api/v1.AdWall/payment", razorpayRoute);

//Webhooks for verification of payment.


//Port is listening at PORT.
app.listen(PORT, ()=>{
    console.log(`App is listening at port: ${PORT}`);
})


