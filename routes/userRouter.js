const express = require('express');
const router = express.Router();
const passport = require('../config/passport')
const userController = require('../controllers/user/userController');
const userMiddleware = require('../middlewares/usersMiddleware')
const productsController = require('../controllers/user/productsController')


// google auth 
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/user' }),userController.googleAuth)


//user route
router.get('/', userMiddleware.isNotAuthenticated, userController.loadLoginpage);
router.get('/signup', userMiddleware.isNotAuthenticated, userController.loadSignupPage);
router.post('/signup', userController.addNewUser);
router.post('/resentotp', userController.resentotp);
router.post('/verify-otp', userController.verifyOtp);
router.post('/login', userController.verifyLogin); 
router.get('/home', userMiddleware.isAuthenticated, userController.loadHome); 


router.get('/logout',userController.userLogout);

//product details
router.get('/product/:id',userMiddleware.isAuthenticated,productsController.getDetailedPage );


module.exports = router;


