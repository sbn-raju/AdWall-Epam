//This function will create the Image kit instance.
const dotenv = require("dotenv");
const ImageKit = require("imagekit");
dotenv.config();


//Getting all the keys and urls from the .env file.
const urlEndpoint = process.env.IMAGE_KIT_URL_ENDPOINT;
const publicKey = process.env.IMAGE_KIT_PUBLIC_KEY;
const privateKey = process.env.IMAGE_KIT_PRIVATE_KEY;


//Creating the instance of the Image Kit class.
const ImageKitInstrance = new ImageKit({
    urlEndpoint,
    publicKey,
    privateKey
});



//Returning the image kit instance.
module.exports = ImageKitInstrance