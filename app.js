const express = require("express");
const app = express();
const env = require('dotenv').config();
const path = require('path');


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.set("views",path.join(__dirname,"views"));

app.get('/',(req,res)=>{
   res.render('user/login')
})
app.get('/signup',(req,res)=>{
   res.render('user/signup')
})
app.get('/otp',(req,res)=>{
   res.render('user/otp')
})

app.get('/home',(req,res)=>{
   res.render('user/home')
})
app.get('/shop',(req,res)=>{
   res.render('user/shop')
})
app.get('/details',(req,res)=>{
   res.render('user/productDetails')
})


//admin



app.listen(process.env.PORT,()=> console.log(`running on port ${process.env.PORT}`));
 