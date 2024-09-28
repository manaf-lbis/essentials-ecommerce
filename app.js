const express = require("express");
const app = express();
const env = require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/',(req,res)=>{
   res.render('user/login')
})
app.get('/home',(req,res)=>{
   res.render('user/home')
})



app.listen(process.env.PORT,()=> console.log(`running on port ${process.env.PORT}`));
 