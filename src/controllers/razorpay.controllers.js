const supabase = require("../database/db.connect.js");
const razorpay = require("../helpers/RazorPay.js");
const { options } = require("../routes/auth.routes.js");



//This API will get the orders details like address, phone numbers, payment_status, payment mode etc.
const createNewOrderController = async(req, res)=>{

    //Getting the details from the request.
    const {name, email, amount, phone } = req.body;
    
    //Validation check if the values are not null.
    if(!name || !email || !amount || !phone){
        return res.status(400).json({
            success: false,
            message: "Invalid Fields"
        })
    }

    //Creating Order using the Razorpay order API.
    const newOrder = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt-${Date.now()}`,
        notes:{
            name: name,
            email: email,
            phone: phone
        }
    }

    //Creating the order id using the razorpay instance which we have created in the RazorPay file.
    const order = await razorpay.orders.create(newOrder);

    console.log(order);

    //Return the response on the basis of the status of the order.
    if(order.status == 'created'){
        return res.status(201).json({
            success: true,
            data: order
        })
    }else{
        return res.status(500).json({
        success: false,
        message: `Internal Server Error creating new order`
    })
    }
}



const placeNewOrderController = async(req, res)=>{

    console.log("Hello");
}


module.exports = {
    createNewOrderController
}