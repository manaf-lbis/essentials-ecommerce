const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/userController');
const userMiddleware = require('../middlewares/usersMiddleware')


router.get('/', userMiddleware.isNotAuthenticated, userController.loadLoginpage);
router.get('/signup', userMiddleware.isNotAuthenticated, userController.loadSignupPage);
router.post('/signup', userController.addNewUser);
router.post('/resentotp', userController.resentotp);
router.post('/verify-otp', userController.verifyOtp);
router.post('/login', userController.verifyLogin); 
router.get('/home', userMiddleware.isAuthenticated, userController.loadHome); 


router.get('/logout',userController.userLogout);

module.exports = router;


