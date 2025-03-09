const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const backendAuthRoute = require("./routes/auth.routes");
const razorpayRoute = require("./routes/razorpay.routes");
const productRoute = require("./routes/product.routes");
const orderRoute = require("./routes/order.routes");
const webhookRoute = require("./routes/webhook.routes");



//Configuration of the dotenv.
dotenv.config();

//Creating the app object of the express.
const app = express();

//Applying the cors
app.use('*', cors({
  origin: ["http://localhost:5173", "https://098d-2401-4900-889d-e668-50b9-5135-c46-b4b3.ngrok-free.app"], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
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

app.get("/home",(req, res)=>{
    res.send("Hello");
})


//This Route will show the seller dashboards.
//***********************SELLER BACKEND DASHBOARD ROUTES************************* */
app.use("/api/v1.Adwall/product", productRoute)



//This Route will show the seller dashboards.
//***********************BUYER BACKEND DASHBOARD ROUTES************************* */
app.use("/api/v1.Adwall/order", orderRoute);



//Integrateing the payement gateway.
app.use("/api/v1.AdWall/payment", razorpayRoute);

//Webhooks for verification of payment.
app.use("/api/v1.AdWall/webhook", webhookRoute);


//Port is listening at PORT.
app.listen(PORT, ()=>{
    console.log(`App is listening at port: ${PORT}`);
})


