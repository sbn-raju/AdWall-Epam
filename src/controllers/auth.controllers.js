const supabase = require("../database/db.connect.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const backendAuthLoginControllers = async (req, res) => {
  //Getting the user email, password from the request body;
  const { email, password } = req.body;

  //Validation check
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Fields are required",
    });
  }

  

  //Verify if the user is present or not.
  try {
    //Query to verify the user is present or not.
    const { data: exisitingUser, error: existingUserError} = await supabase.from('users').select("id, password, role").eq('email', email).single();

    //If get the error is getting the existing user throw error
    if(existingUserError){
        throw new Error(existingUserError.message);
    }

    //This IF Block will run is the user is not present.
    if(exisitingUser?.length === 0){
        return res.status(400).json({
            success: false,
            message: "User does't exist! Please Register"
        })
    }

    //Matching the user's password with the provided password if the user is present.
    const isMatch = await bcrypt.compare(password, exisitingUser.password);

    //If the password from the exisiting user is matched with the provided password this IF Block will run to send response  
    if(isMatch){

        //Making the userData object to sign the token.
        const userData = {
            id: exisitingUser.id,
            email: email,
            role: exisitingUser.role
        }

        //Signing the JWT token with secret and user Data
        const token = jwt.sign(userData, process.env.JWT_TOKEN_KEY, {
            expiresIn: '1d',
        });

        //Sending the response back to the client. and saving the token in the cookie.
        return res.status(200).cookie('ad_wall', token, {
            httpOnly: true, 
            secure: true,
            sameSite: 'None', 
            maxAge: 24 * 60 * 60 * 1000   
        }).json({
            success: true,
            message: "Login successful",
            data: {
              userEmail: email,
              userRole: exisitingUser.role
            },
            // token: token,
          });
    }
    //This else will run if the password does't match
    else{
        return res.status(403).json({
            success: false,
            message: "Invalid Credientials"
        })
    }    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: `Internal Server Error: ${error.message || error}`
    })
  }
};




//This Controller is to handle the new registerd users.
const backendAuthRegisterControllers = async (req, res) => {
  //Get the information by the body.
  const { name, email, password, role } = req.body;

  console.log(name, email, password, role);

  //validation check
  if (!name || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Fields are required",
    });
  }

  //Hash the password before storing it into the database.
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    //Checking the database if any existing user is present or not.
    const { data: exisitingUser, error: existingUserError} = await supabase.from('users').select("id").eq('email', email);

    //Throwing the error if any error arasis when getting the user.
    if(existingUserError){
        throw new Error(existingUserError);
    }

    //This will return the response as the we do not have to add the existing user.
    if(exisitingUser?.length != 0){
        return res.status(400).json({
            success: false,
            message: "User already exist"
        })
    }
    
   //If the user is not present this part of the code will get excuted.
   //This is the query to add the user in the database.
    const { data:insertData, error: insertError} = await supabase.from("users").insert([{name: name, password: hashPassword, role: role, email: email }]).select();

    //Throwing error is anything goes wrong.
    if(insertError){
        throw new Error(insertError);
    }

    //Return response as the data and user is successfuly saved in the database.
    if(insertData?.length != 0){
        return res.status(201).json({
            success: true,
            data: insertData
        })
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: `Internal Server Error: ${error.message}`
    })
  }
};

module.exports = {
  backendAuthLoginControllers,
  backendAuthRegisterControllers
};
