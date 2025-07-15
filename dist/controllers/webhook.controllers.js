const supabase = require("../database/db.connect");
const crypto = require("crypto");

//This file have the webhooks and which will confirm the payment and will verify the status of the payment.
const razopayPaymentVerifyWebhook = async (req, res) => {
  //Get the data from the razorpay webhook.
  const hookData = await req.body;
  console.log(hookData);
  if (!hookData) {
    return res.status(300).json({
      success: false,
      message: "Webhook Error: Request body is not present"
    });
  }

  //Getting the signature from the header of the request.
  const signature = req.headers["x-razorpay-signature"];
  console.log(signature);

  //Validation wheather the signature is present or not.
  if (!signature) {
    return res.status(200).json({
      success: false,
      message: "Webhook headers error: Signature not found"
    });
  }

  //Creating the signature for the verification wheather the payment is real or not.
  const exceptedSignature = crypto.createHmac("sha256", process.env.RAZOR_KEY_WEBHOOK).update(JSON.stringify(hookData)).digest('hex');
  console.log("Exprected Signature", exceptedSignature);
  if (signature != exceptedSignature) {
    return res.status(401).json({
      success: false,
      message: "Webhook Error: Signature is not valid"
    });
  }
  try {
    const entity = hookData.entity;
    console.log(entity);
    if (entity === 'event') {
      //Getting the type of event
      const event = hookData.event;
      console.log(event);
      if (event === 'payment.captured') {
        //When the event of payment is capture is successfully.
        const {
          id,
          status,
          order_id,
          method
        } = hookData?.payload?.payment?.entity;
        console.log(id, status, order_id, method);

        //Validation of the above data it is not null.
        if (!id || !status || !order_id || !method) {
          return res.status(400).json({
            success: false,
            message: "Webhook Error: Either of the entity data is not present id, amount, status, order_id and method"
          });
        }

        //Now updating the orders to success and making the wall unavailable to others such that it is not bought by any body else.
        const {
          data: updateData,
          error: udpateError
        } = await supabase.from("orders").update({
          razorpay_payment_id: id,
          payment_mode: method,
          payment_status: status
        }).eq('razorpay_order_id', `${order_id}`).select('id');
        if (udpateError) {
          throw new Error(updateData.message);
        }
        console.log(updateData);
        if (updateData != null) {
          //Getting the details of the project from te data we recieved.
          const product_id = hookData?.payload?.payment?.entity?.notes?.product_id;
          console.log("Product id:", product_id);
          //Now changing the availablity in the walls so that the wall is unabliable for others.
          const {
            data: wallsUpdateData,
            error: wallsUpdateError
          } = await supabase.from("walls").update({
            is_available: false
          }).eq('id', `${product_id}`).select();
          if (wallsUpdateError) {
            throw new Error(wallsUpdateError.message);
          }
          console.log("Wall is updated successfully", wallsUpdateData);
          if (wallsUpdateData != null) {
            console.log("Wall is", wallsUpdateData);
            return res.status(200).json({
              success: true,
              message: "ok"
            });
          }
        }
      } else {
        throw new Error("Invalid event");
      }
    } else {
      throw new Error("Unexpected entity found in response");
    }
  } catch (error) {
    console.log(`Error: ${error.message || error}`);
    return res.status(502).json({
      success: false,
      message: `Webhook Error: ${error.message || error}`
    });
  }
};
module.exports = razopayPaymentVerifyWebhook;