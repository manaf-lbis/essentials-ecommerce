const Cart = require('../../models/cartSchema');
const mongoose = require('mongoose');
const Product = require('../../models/productSchema');

// getting user id from session 
function getUserIdFromSession(req) {
    return req.session?._id ?? req.session.passport?.user;
}


// cart page loading logic implimented 
async function getCartDetails(req) {
    try {

        const _id = getUserIdFromSession(req)

        const cartitems = await Cart.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(_id) } },
            { $unwind: '$products' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.productId',
                    foreignField: '_id',
                    as: 'allProducts'
                }
            },
    
        ]);
    
        let totalAmount = 0;
        let totalItems = 0;
    
    
        if (cartitems) {
    
            cartitems.forEach((ele) => {
              
                totalAmount += ele.allProducts[0].sellingPrice * ele.products.quantity;
                totalItems += ele.products.quantity;
            })
        }
    
        return { totalAmount, totalItems, cartitems }
        
    } catch (error) {
        console.log(error);
        throw error
    }

}


//cart requiring 
const getCartPage = async (req, res) => {
    try {

        const { totalAmount, totalItems, cartitems } = await getCartDetails(req)

        res.render('user/purchase/cart', { cartitems, totalAmount, totalItems })

    } catch (error) {
        console.log(error);
        res.render('user/pageNotFound')
    }

}



//Add to cart logic 
const checkAndAdd = async (user_id, _id, quantity) => {

    const result = await Cart.findOne({ userId: user_id });//checking is there any cart exist

    if (result) {

        //checking existing cart contain this product
        const response = await Cart.exists({
            userId: user_id,
            products: { $elemMatch: { productId: _id } },
        });

        if (response) {

            //product exist updatinfg the quantity 
            await Cart.updateOne(
                { userId: user_id, 'products.productId': _id },
                { $inc: { 'products.$.quantity': quantity } }
            );

        } else {

            //product not exist adding the product to array
            await Cart.updateOne(
                { userId: user_id },
                { $push: { products: { productId: _id, quantity } } }
            );
        }

        return true;

    } else {

        //creating new cart

        const Item = new Cart({
            userId: user_id,
            products: [{ productId: _id, quantity }],
        });
        Item.save();

        return true;
    }
}



const addToCart = async (req, res) => {

    try {
        const user_id = getUserIdFromSession(req)
        const { _id, quantity } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ message: 'give minimum cart value' })
        }

        // checking is product Exist or product is blocked
        const productIsExist = await Product.findOne({_id,isBlocked:false});

        let status =false;

        if(productIsExist){
            // cart adding logic 
           status = checkAndAdd(user_id, _id, quantity);

        }else{
           return res.status(400).json({ message: 'product doesnt exist' })
        }
        

        if (status) {

            return res.status(200).json({ message: 'cart updataed Sucessfully' });

        } else {

            return res.status(500).json({ message: 'internal Server error' });
        }


    } catch (error) {

        console.log(error);
        res.status(500).json({ message: 'internal Server error' });

    }
};


const removeCartItem = async (req, res) => {

    try {

        const { _id } = req.query;
        const userId = getUserIdFromSession(req)

        await Cart.updateOne({ userId: userId }, { $pull: { products: { productId: _id } } })

        res.redirect('/cart')

    } catch (error) {
        console.log(error);
        res.render('user/pageNotFound')
    }



}


module.exports = {
    addToCart,
    getCartPage,
    removeCartItem,
    getCartDetails
};


