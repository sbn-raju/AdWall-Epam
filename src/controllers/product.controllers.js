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
          is_available: avilability,
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




//This controller will get the products through pagination.
const getProductsController = async(req, res)=>{

    //Getting the limit and the offset from the query to get the products in the list
    const {page, limit} = req.query;
    
}


module.exports = {
    productListingController
}
