const supabase = require("../database/db.connect.js");


//This controller will list all the order done by the user.
//This are the transcation which is made by the user.
const listOrdersController = async(req, res)=>{

    //Get the use_id from the user_id.
    const user_id = req?.user?.id;

    //Get the pagination and the limit from the query to fetch the specific and limited data;
    //Explaination of the pagination used
    //Example:
       // page = 1;
       // limit = 10;
       
       //offset = (page - 1) * 10;
       //offset = (1 - 1) * 10 = 0;

       //start = offset = 0;
       //end = offset + limit -1 => 0 + 10 - 1 = 9;
       //range = (start, end);

    
    const page = parseInt(req?.query?.page, 10) || 1;
    const limit = parseInt(req?.query?.limit, 10) || 10;

    

    //Calculating the offset.
    const offset = (page - 1) * 10;
    
    //Validation check
    if(!page || !limit || !user_id){
        return res.status(401).json({
            success: false,
            message: "Page, Limit or User id may not be present"
        })
    }

    try {
        


    //calculating totatl numbers of orders for the user.
    const {count, error: countError } = await supabase.from('orders').select('*', {count: 'exact', head: true}).eq('created_by', user_id);

    if(countError){
        throw new Error(countError.message);
    }
   

    if(count?.length != 0){
        console.log(count);
    }



    //Getting the orders of the user.
    const{data: orderData, error:orderError } = await supabase.from('orders').select(`id, payment_status, razorpay_order_id, created_at, walls(id, name, price)`).eq('created_by', user_id).order('created_at', {ascending: false}).range(offset, offset + limit - 1);
    
    if(orderError){
        throw new Error(orderError.message);
    }


    if(orderData?.length != 0){
        return res.status(200).json({
            success: true,
            data: orderData,
            totalCount : count,
        })
    }else{
        return res.status(400).json({
            success: false,
            message: "No Data found"
        })
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        success: false,
        message: `Internal Server Error: ${error.message || error}`
    })

    }
}


module.exports = {
    listOrdersController,
}