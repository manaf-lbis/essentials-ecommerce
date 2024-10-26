const Address = require('../../models/addressSchema');
const Cart = require('../../models/cartSchema')
const User = require('../../models/userSchema')


//requiring cart details function from controller
const cartController = require('../../controllers/user/cartController')


function getUserIdFromSession(req){
    return req.session?._id ?? req.session.passport?.user;
}


const getCheckutPage = async (req,res)=>{
    try {

        const userId = getUserIdFromSession(req);

        let userAddress = await Address.findOne({userId}) ?? [] ;

        const {totalAmount,totalItems} = await cartController.getCartDetails(req);

        res.render('user/purchase/checkout',{totalAmount,totalItems,userAddress});
        
        
    } catch (error) {

        console.log(error);
        
        
    }
}


module.exports ={
    getCheckutPage,
}