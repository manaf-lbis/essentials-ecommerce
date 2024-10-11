const Category = require('../../models/categorySchema');



const listCategory = async (req,res)=>{
    
    const categories = await Category.find({isBlocked:false});
    return res.render('admin/category',{categories})
};


const addCategory = async (req, res) => {
    try {
        const { categoryName, description } = req.body;
        const isExist = await Category.findOne({ categoryName});

        if (isExist) {
            return res.render('admin/category', { alert: 'Category Exists' });
        }

        const category = await new Category({ categoryName, description });
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
}