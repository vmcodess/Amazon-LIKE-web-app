// Author : Vladislav Matveev

//----------------
// .env
require('dotenv').config({path:"./config/.env"});
//----------------

const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// Handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// This is to allow specific forms and/or links that were clicked/submitted 
// to send PUT and DELETE requests respectively
app.use((req,res,next) => {
  if( req.query.method == "PUT") {
    req.method = "PUT"
  }
  else if (req.query.method == "DELETE") {
    req.method = "DELETE"
  }
  next();
})

// server static content with Express 
app.use(express.static('public/img')); // Had to add this public/img because banner and avatar wasn't showing up with just 'public'
app.use(express.static('public')); 

// This tells express to make form data available via req.body in every request
app.use(bodyParser.urlencoded({ extended: false }));

// session
//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: `${process.env.SECRET}`,
  resave: false,
  saveUninitialized: false,
}))
// custom middleware function
app.use((req, res, next) => {
  // create a global template variable 
  res.locals.user = req.session.userInfo;
  res.locals.cart = req.session; 
  next();
})
// sessions


//Load Controllers 
const generalController = require("./controllers/general/general");
const productController = require("./controllers/products/product");
const registrationController = require("./controllers/registration/registration");
const loginController = require("./controllers/login/login");
const shoppingCartController = require("./controllers/shoppingCart/cart");
const userDashboard = require("./controllers/dashboard/dashboard");
const productAdd = require("./controllers/products/productAdd");
const productView = require("./controllers/products/productView");
const productEdit = require("./controllers/products/productEdit");

// map each controller to the app object
app.use("/", generalController);
app.use("/products", productController);
app.use("/user", productAdd);
app.use("/user", productView);
app.use("/product", productEdit);
app.use("/", registrationController);
app.use("/", loginController);
app.use("/", shoppingCartController);
app.use("/user", userDashboard);



//-----------------------------------------------------------------------------------------MongoDB
mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log(`Connected to the database!!`);
})
.catch((err) => {
  console.log(`Error connecting to DB : ${err}`);
})
//-----------------------------------------------------------------------------------------MongoDB

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Web Server is connected!!")
});
