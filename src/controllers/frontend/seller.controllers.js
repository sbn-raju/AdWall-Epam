//This Controller will render the page of the Dashboard of the seller.
const frontendSellerDashboardControllers = async(req, res)=>{
    return res.render('seller/dashboard', {title: "Seller Dashboard"});
}

//This Controller will render the page of the 
const frontendSellerRentalFormControllers = async(req, res)=>{
    return res.render('seller/rentalForm', {title: "Seller Dashboard"});
}


module.exports = {
    frontendSellerDashboardControllers,
    frontendSellerRentalFormControllers
}