const ImageKitInstrance = require("../helpers/ImageKit.js");


//This controller will authenticate the Image Kit account is valid or not using the url-enpoint, public and private Key
const imageKitAuthentication = async(req, res) =>{
    
    //Getting the Authencation Parameters from the ImageKit using the instance created in the file ImageKit.js.
    const result = ImageKitInstrance.getAuthenticationParameters();

    //Returning the Authencation Parameters.
    return res.status(201).json(result);

}

module.exports = {
    imageKitAuthentication
}