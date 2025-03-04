const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const backendAuthRoute = require("./routes/auth.routes");
const imageKitRoute = require("./routes/imageKit.routes");
const razorpayRoute = require("./routes/razorpay.routes");



//Configuration of the dotenv.
dotenv.config();

//Creating the app object of the express.
const app = express();

//Applying the corse 
app.use(cors());


//Making the middlwares to read the input from the request.
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Using the Cookie Parser.
app.use(cookieParser());



//Getting the PORT from the env.
const PORT = process.env.PORT || 5000;


//Allowing cross origin request
// allow cross-origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//This Route is for the authentication Pages and backend routes
//***********************AUTH BACKEND ROUTES************************** */
app.use("/api/v1.Adwall/auth", backendAuthRoute);


//This Route will show the seller dashboards.
//***********************SELLER BACKEND DASHBOARD ROUTES************************* */


//This Route will show the seller dashboards.
//***********************BUYER BACKEND DASHBOARD ROUTES************************* */


app.use("/api/v1.AdWall/third-party", imageKitRoute);

app.use("/api/v1.AdWall/payment", razorpayRoute);

//Webhooks for verification of payment.


//Port is listening at PORT.
app.listen(PORT, ()=>{
    console.log(`App is listening at port: ${PORT}`);
})


