const supabase = require("../database/db.connect.js");
const razorpay = require("../helpers/RazorPay.js");
const { options } = require("../routes/auth.routes.js");



//This API will get the orders details like address, phone numbers, payment_status, payment mode etc.
const createNewOrderController = async(req, res)=>{

    //Getting the details from the request.
    const {name, email, amount, address, phone, product_id} = req.body;

    //Getting the order id and tht user id from the authorization middleware.
    // const { user_id } = req.user;
    const user_id = req?.user?.id;
    
    //Validation check if the values are not null.
    if(!name || !email || !amount || !phone || !product_id){
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
            phone: phone,
            product_id: product_id
        }
    }

    try {
            //Creating the order id using the razorpay instance which we have created in the RazorPay file.
    const order = await razorpay.orders.create(newOrder);

    console.log(order);

    //Return the response on the basis of the status of the order.
    if(order?.status == 'created'){

        //Adding the order details into the database.
        const {data:orderDetails, error:orderError} = await supabase.from("orders").insert([{
           created_by: user_id,
           product_id: product_id,
           razorpay_order_id: order?.id,
           address: address,
           payment_status: "pending"
        }]).select();


        if(orderError){
            throw new Error("Error in Creating Order");
        }

        if(orderDetails?.length != 0){
            return res.status(201).json({
                success: true,
                data: order
            })
        }
    }else{
       throw new Error("Error in Creating Order");
    }
    } catch (error) {
        console.log(error);
    return res.status(500).json({
        success: false,
        message: `Internal Server Error: ${error.message || error}`
    })
    }
}



const placeNewOrderController = async(req, res)=>{
    
    console.log(req);
    return res.status(201).json({
        success: true,
        message: "Order is placed Successfully"
    })
}


module.exports = {
    createNewOrderController,
    placeNewOrderController
}