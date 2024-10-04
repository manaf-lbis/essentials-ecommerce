const express = require("express");
const app = express();
const env = require('dotenv').config();
const path = require('path');


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.set("views",path.join(__dirname,"views"));






app.listen(process.env.PORT,()=> console.log(`running on port ${process.env.PORT}`));
 