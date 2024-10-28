const Order = require('../../models/orderSchema');
const Cart = require('../../models/cartSchema');
const mongoose = require('mongoose');
const { products } = require('../admin/productControllers');
const Address = require('../../models/addressSchema')



function getUserIdFromSession(req) {
    return req.session?._id ?? req.session.passport?.user;
}


async function createOrder(orderInfo) {

    try {

        const {
            paymentMethod,
            deliveryAddress,
            userId
        } = orderInfo;

        // find the cart and get the product and lookup for products collection for products details
        const cartItems = await Cart.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $project: { products: 1 } },
            {
                $lookup: {
                    from: 'products',
                    foreignField: '_id',
                    localField: 'products.productId',
                    as: 'productDetails'
                }
            }
        ]);


        // creating order items list with productId, qty, price
        const orderItems = [];
        cartItems[0].products.forEach((ele, index) => {

            orderItems.push({
                productId: ele.productId,
                quantity: ele.quantity,
                price: cartItems[0].productDetails[index].sellingPrice

            });
        });

        //calculationg total price
        const totalPrice = orderItems.reduce((acc, ele) => {
            return acc += ele.quantity * ele.price
        }, 0);


        //adderess finding wih is 
        let address = await Address.findOne(
            {
                userId: userId,
                address: { $elemMatch: { _id: deliveryAddress } }
            },
            { 'address.$': 1 }
        );

        //creating order
        const order = new Order({
            userId:userId,
            orderItems: orderItems,
            totalPrice: totalPrice,
            finalPrice: totalPrice,
            address: address.address[0],// query of of mongo is an nested array of object
            paymentMethod: paymentMethod,
        })

        await order.save();
        return true;

    } catch (error) {

        console.log(error);
        return false;

    }

}


const placeOrder =async (req, res) => {
    try {

        const userId = getUserIdFromSession(req);

        const { paymentMethod, deliveryAddress } = req.body;

        const orderInfo = {
            paymentMethod,
            deliveryAddress,
            userId
        }

        //create new Order
        const order = await createOrder(orderInfo);

        if(order){
            await Cart.deleteOne({userId:userId})
            res.render('user/purchase/orderSuccessPage');
        }else{
            res.render('user/pageNotFound')
        }


    } catch (error) {
        console.log(error);

    }

}

const allOrders = async (req,res)=>{
    try {
        const userId = getUserIdFromSession(req);

       const orders = await Order.find({ userId }).populate('orderItems.productId').sort({orderDate:-1});

       res.render('user/purchase/orders',{orders})

        
    } catch (error) {
        console.log(error);
        res.render('user/pageNotFound');
    }
}


const cancelOrder = async (req,res)=>{
    try {
        const {orderId,productId} = req.query;

        const response = await Order.updateOne(
            {orderId,'orderItems.productId':productId },
            {$set:{'orderItems.$.status':'Cancelled'}}
        );

        res.redirect('/orders')
         
        
    } catch (error) {
        console.log(error);

    }

}


module.exports = {
    placeOrder,
    allOrders,
    cancelOrder,
}