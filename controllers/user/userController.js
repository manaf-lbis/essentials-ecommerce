const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../../models/userSchema');
const session = require('express-session');





// <<<====Signup page rendering===>>>
const loadSignupPage = (req, res) => {
  try {
    return res.render('user/signup', { message: '' });
  } catch (error) {
    console.log(error);
    return res.status(500).render('user/pagenotFound');
  }
};

// <<<====login page rendering===>>>
const loadLoginpage = (req, res) => {
  try {
    return  res.render('user/login');
  } catch (error) {
    console.log(error);
    return  res.status(500);
  }
};

// <<<====login page rendering===>>>
const loadHome = (req, res) => {
  return res.render('user/home');
};

const userLogout = (req,res)=>{
  try {
    
    req.session.destroy((error)=>{
      if(error){
        console.log('session destruction error');
        return res.render('user/pagenotFound')
      }
      return res.redirect('/user')
    })

  } catch (error) {
    console.log(error)
  }
}





// <====random otp  generating=====>
const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// <====Generating otp using node mailer=====>
const sendverification = async (email, otp) => {
  try {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailoption = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Verify your identity',
      text: `YOUR OTP is ${otp}`,
    };

    // <====sending Otp======>
    const info = await transport.sendMail(mailoption);
    return info;
  } catch (error) {
    console.log('error while sending otp');
    throw error;
  }
};

// <====!!! Add New user request from user !!!=====>
  const addNewUser = async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;
      const userExist = await User.findOne({ email: email });
  
      //  <===checkin db user is already exist====>
      if (userExist) {
        console.log('user exist');
        return res.render('user/signup', {
          message: 'Entred Email Already Exist',
        });
      }
  
      const otp = otpGenerator();
      const sentInfo = await sendverification(email, otp);
  
      if (sentInfo.accepted.length > 0) {
        req.session.userOtp = otp;
        req.session.userData = { name, email, phone, password };
        console.log('first otp:', otp);
        return res.render('user/otp', { message: '' });
      }
  
      // res.render('user/otp');
    } catch (error) {
      return res.render('user/signup', { message: 'Error while sending OTP' });
      console.log(error);
    }
  };

  //===== verify otp and and creating db  =============>
const verifyOtp = async (req, res) => {
  try {
    const { name, phone, email, password } = req.session.userData;
    const { enteredOtp } = req.body;

    if (enteredOtp === req.session.userOtp) {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, phone, email, password: hashPassword });
      await user.save();

      return res
        .status(200)
        .render('user/login', {
          message:
            'Your Registration Successfully Completed! Now You can login.',
        });
    } else {
      console.log('otp invalid');
      return res.status(400).render('user/otp', { message: 'Invalid OTP' });
    }
  } catch (error) {
    console.log('mongoooo err', error);
    return res.status(500).render('user/pagenotFound');
  }
};


//================== user login=====================
const verifyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, googleId: null, isAdmin:false});

      if(!user){
        return res.status(401).render('user/login', { error: 'invalid username or password' });
      }

      if(user.isBlocked){
        return res.status(403).render('user/login', { error: 'Your account is blocked. Please contact Administrator.'});
      }

      if (!await bcrypt.compare(password, user.password)) {
        return res.status(403).render('user/login', { error: 'invalid username or password'});
      } 
      
      req.session.userId = user._id;
      return res.redirect('/user/home');
  }
  catch(error){
    console.error(`login Faild ${error}`);
    return res.render('user/login',{error:'Login Faild, Try Again later'})
  }

}



// <=====resent otp ==========>
const resentotp = async (req, res) => {
  try {
    const { email } = req.session.userData;
    const otp = otpGenerator();
    const sentInfo = await sendverification(email, otp);

    req.session.userOtp = otp;
    console.log('resend:', otp);

    if (sentInfo.accepted.length > 0) {
      return res.render('user/otp', { message: '' });
    }
  } catch (error) {
    console.log('unable to resent otp :', error);
    return res.status(500).render('user/pagenotFound');
  }
};







module.exports = {
  loadLoginpage,
  loadSignupPage,
  addNewUser,
  resentotp,
  verifyOtp,
  loadHome,
  verifyLogin,
  userLogout,

};
