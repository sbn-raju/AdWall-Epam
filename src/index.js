const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const engine = require("ejs-mate");
const path = require("path");
const frontendAuthRoute = require("./routes/frontend/auth.routes");


//Configuration of the dotenv.
dotenv.config();

//Creating the app object of the express.
const app = express();

//Serving the Css and Images Files.
app.use(express.static(path.join(__dirname,"/public/css")));

//Making the view Engine.
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

console.log("Views path:", path.join(__dirname, "views"));


//Making the middlwares to read the input from the request.
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Using the Cookie Parser.
app.use(cookieParser());

//Getting the PORT from the env.
const PORT = process.env.PORT || 5000;


//This Route is for the authentication Pages and backend routes
//***********************AUTH FRONTEND ROUTES************************* */
app.use("/auth", frontendAuthRoute);

//***********************AUTH BACKEND ROUTES************************** */


//Port is listening at PORT.
app.listen(PORT, ()=>{
    console.log(`App is listening at port: ${PORT}`);
})


