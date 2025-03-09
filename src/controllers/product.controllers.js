const supabase = require("../database/db.connect.js");
const cloudinary = require("cloudinary").v2;


//Making the instance of the cloudinary to upload the file into the cloudinary.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_CLOUD_KEY_ID,
  api_secret:process.env.CLOUDINARY_CLOUD_KEY_SECRET
})

//This controller where the seller will list the products for rent.
const productListingController = async (req, res) => {

  //Getting the data from the request.
  const {
    name,
    description,
    location,
    dimensions,
    dimensionType,
    avilability,
    price,
    priceType,
  } = req.body;


  console.log(req.body);


  if(!req.file){
    return res.status(200).json({
      success: false,
      message: "Image is Required"
    })
  }

  const imagePath = req?.file?.path;

 
  //Validation check for the neccessady fields.
  if (!name || !location  || !dimensions || !price) {
    return res.status(400).json({
      success: false,
      message: "Field are required",
    });
  }

  //Making the Price and Dimensions.
  const amount = `${price}/${priceType}`;
  const finalDimensions = `${dimensions}/${dimensionType}`;

  try {
     //Uploading the image to the cloudinary to get the public link to show the user.
  const uploadResult = await cloudinary.uploader.upload(imagePath);

  //Adding the secure url to database.
  const image = uploadResult?.secure_url;

    //Querying the details to the database.
    const { data: product, error: productError } = await supabase
      .from("walls")
      .insert([
        {
          created_by: req?.user?.id,
          name: name,
          description: description,
          location: location,
          dimension: finalDimensions,
          price: amount,
          is_available: true,
          image_link: image,
        },
      ])
      .select();

    if (productError) {
      throw new Error(productError.message);
    }

    if (product?.length != 0) {
      return res.status(201).json({
        success: true,
        message: "Wall added successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

//Get the products which i have posted.
//Seller Dashboard private Route.
const sellerAdsListControllers = async(req, res)=>{
  
  //Getting the limit and the offset from the query to get the products in the list
  const page = parseInt(req?.query?.page, 10) || 1;
  const limit = parseInt(req?.query?.limit, 10) || 10;
  console.log(page, limit);

  //Getting userid from the middeware;
  const user_id = req?.user?.id;


  //Calculating the offset.
  const offset = (page - 1) * 10;

  try {
    
  //Getting the count of the products.
  const{count, error: productError } = await supabase.from("walls").select(`*`, {count: 'exact', head: true});
  
  if(productError){
    throw new Error(productError.message);
  }

  if(count == 0){
    count = 0;
  }

  //Getting the data of the product in the limit and offset.
  const { data: productData, error: productListError } = await supabase.from("walls").select('*').eq('created_by', user_id).range(offset, offset + limit - 1);

  if(productListError){
    throw new Error(productListError.message);
  }


  if(productData?.length != 0){
    return res.status(200).json({
      success: true,
      data:productData,
      totalCount: count
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




//This controller will get the products through pagination.
const getProductsController = async(req, res)=>{

    //Getting the limit and the offset from the query to get the products in the list
    const page = parseInt(req?.query?.page, 10) || 1;
    const limit = parseInt(req?.query?.limit, 10) || 10;
    console.log(page, limit);


    //Calculating the offset.
    const offset = (page - 1) * 10;

    try {
      
    //Getting the count of the products.
    const{count, error: productError } = await supabase.from("walls").select(`*`, {count: 'exact', head: true});
    
    if(productError){
      throw new Error(productError.message);
    }

    if(count == 0){
      count = 0;
    }

    //Getting the data of the product in the limit and offset.
    const { data: productData, error: productListError } = await supabase.from("walls").select('*').eq('is_available', true ).range(offset, offset + limit - 1);

    if(productListError){
      throw new Error(productListError.message);
    }

    console.log(productData);


    if(productData?.length != 0){
      return res.status(200).json({
        success: true,
        data:productData,
        totalCount: count
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


//This are public route.
//Getting the details of the single product.
const singleProductController = async(req, res)=>{

  //Getting the id of the product from the query.
  const { product_id } = req?.query;


  //Validation if the id is present or not.
  if(!product_id){
    return res.status(401).json({
      success: false,
      message: "Product Id is required"
    })
  }


  try {
    const {data:product, error:productError} = await supabase.from("walls").select('*').eq('id', product_id);

    if(productError){
      throw new Error(productError);
    }

    if(product){
      return res.status(200).json({
        success: true,
        data: product 
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


//This controller will get the product which are on rent.
const wallOnRentControllers = async(req, res)=>{

  //Getting limit and page from the query;
  const page = parseInt(req?.query?.page, 10) || 1;
  const limit = parseInt(req?.query?.limit, 10) || 10;

  //Calculate the offset also;
  const offset = (page - 1) * 10;
  
  //Get the user Id from the middleware.
  const user_id = req?.user?.id;

  //Validation check
  if(!user_id){
    return res.status(500).json({
      success: false,
      message: "Page, Limit or the User_id is missing"
    })
  }

  try {
    const {count, error:countError} = await supabase.from('walls').select('*', {count: 'exact', head: true}).eq('created_by', user_id).eq('is_available', false);

    if(countError){
      console.log(countError);
      throw new Error(countError.message);
    }

    //Getting the details of the walls which are on rent.
    const {data: productData, error: productError} = await supabase.from('walls').select('*').eq('created_by', user_id).eq('is_available', false).range(offset, offset + limit - 1);
    console.log(productData, productError);

    if(productError){
      throw new Error(productError.message);
    }

    console.log(productData);

    if(productData?.length != 0){
      return res.status(200).json({
        success: true,
        data: productData,
        totalCount: count
      })
    }else{
      return res.status(400).json({
        success: false,
        message: "No Data Found"
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

const singleProductOnRentController = async(req, res)=>{

  //Getting the id of the product from the query.
  const { product_id } = req?.query;


  //Validation if the id is present or not.
  if(!product_id){
    return res.status(401).json({
      success: false,
      message: "Product Id is required"
    })
  }


  try {
    const {data:product, error:productError} = await supabase.from("walls").select('*, users(name, email)').eq('id', product_id);

    if(productError){
      throw new Error(productError);
    }

    if(product){
      return res.status(200).json({
        success: true,
        data: product 
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


//This controller will get the product which are on rent.
const wallOnRentBuyerControllers = async(req, res)=>{

  //Getting limit and page from the query;
  const page = parseInt(req?.query?.page, 10) || 1;
  const limit = parseInt(req?.query?.limit, 10) || 10;

  //Calculate the offset also;
  const offset = (page - 1) * 10;
  
  //Get the user Id from the middleware.
  const user_id = req?.user?.id;

  //Validation check
  if(!user_id){
    return res.status(500).json({
      success: false,
      message: "Page, Limit or the User_id is missing"
    })
  }

  try {
    const {count, error:countError} = await supabase.from('orders').select('*, walls(*)', {count: 'exact', head: true}).eq('created_by', user_id).eq('payment_status', 'captured');

    if(countError){
      console.log(countError);
      throw new Error(countError.message);
    }

    //Getting the details of the walls which are on rent.
    const {data: productData, error: productError} = await supabase.from('orders').select('* , walls(*)').eq('created_by', user_id).eq('payment_status', 'captured').range(offset, offset + limit - 1);
    console.log(productData, productError);

    if(productError){
      throw new Error(productError.message);
    }

    console.log(productData);

    if(productData?.length != 0){
      return res.status(200).json({
        success: true,
        data: productData,
        totalCount: count
      })
    }else{
      return res.status(400).json({
        success: false,
        message: "No Data Found"
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
    productListingController,
    getProductsController,
    singleProductController,
    sellerAdsListControllers,
    wallOnRentControllers,
    singleProductOnRentController,
    wallOnRentBuyerControllers
}
