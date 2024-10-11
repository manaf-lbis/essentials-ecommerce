const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');
const userController  = require('../controllers/admin/userController');
const categoryController = require('../controllers/admin/categoryController');
const productController = require('../controllers/admin/productControllers');
const auth = require('../middlewares/usersMiddleware');



router.get('/pagenotFound',adminController.pagenotFound);

router.get('/',adminController.loadLogin);
router.post('/',adminController.verifyLogin);
router.get('/dashboard',auth.adminAuth,adminController.loadDashboard);
router.get('/logout',adminController.logout);

//user management
router.get('/usermanagement',auth.adminAuth,userController.getUsers);
router.post('/blockUser/:id',auth.adminAuth,userController.blockUser);
router.post('/unblockUser/:id',auth.adminAuth,userController.unblockUser);

//category
router.get('/category',categoryController.listCategory);
router.post('/category',categoryController.addCategory);
router.get('/removeCategory',categoryController.removeCategory);

//product
router.get('/products',productController.products);
router.get('/addProduct',productController.addproduct);

module.exports= router;

