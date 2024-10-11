const User = require('../models/userSchema');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated() || req.session.userId) {
        return next(); 
    }
    return res.redirect('/user'); 
};

const isNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated() && !req.session.userId) {
        return next(); 
    }
    return res.redirect('/user/home'); 
};


const adminAuth = (req, res, next) => {
   
    if (req.session && req.session.user) {
     
      if (req.session.user.isAdmin === true) {
        return next(); 
      }
      return res.redirect('/admin'); 
    }
    return res.redirect('/admin'); 
  };


module.exports = {
    isAuthenticated,
    isNotAuthenticated,
    adminAuth,
};