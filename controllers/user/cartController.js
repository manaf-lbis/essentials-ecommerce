const Cart = require('../../models/cartSchema');
const mongoose = require('mongoose');



const getCartPage = async (req, res) => {
    try {

        const _id = req.session?._id ?? req.session.passport?.user;
       
        const cartitems = await Cart.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(_id) } } ,
            {$unwind:'$products'},
            {$lookup:{
                from:'products',
                localField:'products.productId',
                foreignField:'_id',
                as:'allProducts'
            }},

        ]);

            let totalAmount = 0;
            let totalItems = 0;

            
        if(cartitems){
            cartitems.forEach((ele)=>{

                totalAmount += ele.allProducts[0].sellingPrice * ele.products.quantity;

                totalItems += ele.products.quantity;
            })
        }

       



        res.render('user/purchase/cart',{cartitems,totalAmount,totalItems})

    } catch (error) {
        console.log(error);
        res.render('user/pageNotFound')
    }

}







const addToCart = async (req, res) => {
    try {
        const user_id = req.session?._id ?? req.session.passport?.user;
        const { _id, quantity } = req.body;

        if(quantity<=0){
            return res.status(400).json({message:'give minimum cart value'})
        }

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

            res.status(200).json({ message: 'cart updataed Sucessfully' });

        } else {

            //creating new cart

            const Item = new Cart({
                userId: user_id,
                products: [{ productId: _id, quantity }],
            });
            Item.save();

            res.status(200).json({ message: 'cart created and updataed Sucessfully' });
        }
    } catch (error) {

        console.log(error);
        res.status(500).json({ message: 'internal Server error' });

    }
};



module.exports = {
    addToCart,
    getCartPage
};
