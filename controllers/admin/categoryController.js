const Category = require('../../models/categorySchema');



const listCategory = async (req,res)=>{
    
    const categories = await Category.find({isBlocked:false});
    return res.render('admin/category',{categories})
};

const addCategoryPage = (req,res)=>{
    try {
        res.render('admin/addcategory',{ message:'' })
         
    } catch (error) {
        console.log(error); 
    }
}


const addCategory = async (req, res) => {


    try {
        const { categoryName, description } = req.body;
        const {filename} = req.file;
     
        const isExist = await Category.findOne({ categoryName});

        if (isExist) {
            return res.render('admin/addcategory', { message: 'Category Exists' });
        }

        const category = new Category({ categoryName, description,image:filename });

        await category.save();
        
        return res.redirect('/admin/category');

    } catch (error) {
        console.log('Error while adding category: ', error);
       return  res.status(500).redirect('/admin/pagenotFound');
    }
};


const removeCategory = async (req,res)=>{
    try {
        const id = req.query.id;
        await Category.updateOne({_id:id},{$set:{isBlocked:true}});
    
        return res.redirect('/admin/category');
        
    } catch (error) {
        console.log(error);
        return res.status(500).redirect('/admin/pagenotFound')
        
    }

};





module.exports={
    listCategory,
    addCategory,
    removeCategory,
    addCategoryPage,
}