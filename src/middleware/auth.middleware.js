const jwt = require("jsonwebtoken");

const authMiddleware = async(req, res, next)=>{

    //Getting tokens from the cookies.
    const token = req?.cookies?.ad_wall;


    //Return if token is not present.
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unautorized"
        })
    }


    //Getting the details form the token.
    try {
        const decodedUser = jwt.verify(token, process.env.JWT_TOKEN_KEY);

        //Validation check for the decoded-user.
        if(!decodedUser){
            return res.status(401).json({
                success: false,
                message: "Invalid token: No User data found"
            })
        }

        //Getting the Decoded User.
        req.user = decodedUser;
        console.log(decodedUser)

        //Carrying to the next controllers
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${error}` 
        })
    }

}


module.exports = authMiddleware