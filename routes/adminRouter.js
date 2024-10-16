const express = require('express');
const router = express.Router();
const config = require('../config/multer');
const adminController = require('../controllers/admin/adminController');
const userController = require('../controllers/admin/userController');
const categoryController = require('../controllers/admin/categoryController');
const productController = require('../controllers/admin/productControllers');
const orderController = require('../controllers/admin/orderController');
// const offerController = require('../controllers/admin/offerController');
// const couponController = require('../controllers/admin/couponController');
const auth = require('../middlewares/usersMiddleware');





router.get('/pagenotFound', adminController.pagenotFound);

router.get('/', adminController.loadLogin);
router.post('/', adminController.verifyLogin);
router.get('/dashboard', auth.adminAuth, adminController.loadDashboard);
router.get('/logout', adminController.logout);

//user management
router.get('/usermanagement', auth.adminAuth, userController.getUsers);
router.post('/blockUser/:id', auth.adminAuth, userController.blockUser);
router.post('/unblockUser/:id', auth.adminAuth, userController.unblockUser);

//category
router.get('/category', auth.adminAuth, categoryController.listCategory);
router.post('/category', auth.adminAuth, categoryController.addCategory);
router.get('/removeCategory',auth.adminAuth, categoryController.removeCategory);

//product
router.get('/products', auth.adminAuth, productController.products);
router.get('/addProduct', auth.adminAuth, productController.addproductPage);
router.post('/addProduct', auth.adminAuth, config.upload.array('images', 3), productController.addProduct);


//orders
router.get('/orders', auth.adminAuth);

//offers
router.get('/offers');

//coupon
router.get('/coupon');

module.exports = router;
