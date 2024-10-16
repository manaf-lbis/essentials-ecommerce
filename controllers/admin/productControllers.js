const Product = require('../../models/productSchema');
const Category = require('../../models/categorySchema');


const products = (req, res) => {
  res.render('admin/productmanagement');
};


//add product page 
const addproductPage = async (req, res) => {
  try {
    const category = await Category.find();
    res.render('admin/addproduct', { category, message: '' });
  } catch (error) {
    console.log(error);
  }
};

// add new product submission
const addProduct = async (req, res) => {
  try {

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    const {
      productName,brand,color,size,category,regularPrice,
      sellingPrice,material,description,quantity
    } = req.body;


    const imagesArray = req.files.map(file => file.filename);

    // Create a new product document
    const product = new Product({
      productName, brand, color, size, category, regularPrice,
      sellingPrice, material, description, quantity,
      productImage: imagesArray
    });

    // Save 
    await product.save();

    // Fetch categories 
    const dbCategory = await Category.find();


    return res.status(200).json({ success: true, message: 'Product added successfully' });

  } catch (error) {
    // Log and handle errors
    console.error('Error:', error);
    return res.status(500).redirect('pagenotFound');
  }
};




module.exports = {
  products,
  addproductPage,
  addProduct,
};
