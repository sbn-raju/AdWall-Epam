//This is the controller which will return the Login Page.
const frontendLoginPageController = async(req, res)=>{
    return res.render('auth/login', {title: 'Login'});
}

//This is the Controller which will return the register Page.
const frontendRegisterPageController = async(req, res)=>{
    return res.render('auth/register', {title: 'Register'});
}


module.exports = {
    frontendLoginPageController,
    frontendRegisterPageController
}