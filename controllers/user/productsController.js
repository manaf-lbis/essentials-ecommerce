const Product = require('../../models/productSchema');
const Category = require('../../models/categorySchema');


const getDetailedPage = async (req,res)=>{
    const _id = req.params.id;

    const dbResult  = await Product.findOne({_id});

    const categoryId = dbResult.category;
    

    const recomented = await Product.find({'category':categoryId});
    

    res.render('user/productDetails',{dbResult,recomented})
     
}






module.exports ={
    getDetailedPage,
}