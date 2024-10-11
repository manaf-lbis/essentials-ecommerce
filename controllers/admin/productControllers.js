const Product = require('../../models/productSchema');
const Category = require('../../models/categorySchema');

const products = (req,res)=>{
    res.render('admin/productmanagement')
}

const addproduct = async (req,res)=>{

    try {
        const category = await Category.find();
        console.log(category);
        
        res.render('admin/addproduct',{category});

    } catch (error) {
        console.log(error);
        
        
    }
    



}


module.exports ={
    products,
    addproduct,

} 
