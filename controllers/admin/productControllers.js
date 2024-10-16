const Product = require('../../models/productSchema');
const Category = require('../../models/categorySchema');

const products = (req, res) => {
  res.render('admin/productmanagement');
};

const addproductPage = async (req, res) => {
  try {
    const category = await Category.find();
    res.render('admin/addproduct', { category });
  } catch (error) {
    console.log(error);
  }
};

const addProduct = (req, res) => {
  console.log('sdfsd', req.body);
  try {

    console.log('sdfsd', req.body);

  } catch (error) {

  }
}



module.exports = {
  products,
  addproductPage,
  addProduct,
};
