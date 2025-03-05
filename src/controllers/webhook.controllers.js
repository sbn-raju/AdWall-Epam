//This file have the webhooks and which will confirm the payment and will verify the status of the payment.
const razopayPaymentVerifyWebhook = async(req, res)=>{

    //Get the data from the razorpay webhook.
    const body = await req.text;

    if(!body){
        return res.status(300).json({
            success: false,
            message: "Webhook Error"
        })
    }
}


module.exports = razopayPaymentVerifyWebhook