// Author : Vladislav Matveev

//----------------
// .env
require('dotenv').config({path:"./config/.env"});
//----------------

const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// tell express to setup our template engine has handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// server static content with Express 
app.use(express.static('public/img')); // Had to add this public/img because banner and avatar wasn't showing up with just 'public'
app.use(express.static('public')); 

// This tells express to make form data available via req.body in every request
app.use(bodyParser.urlencoded({ extended: false }));



//Load Controllers
const generalController = require("./controllers/general");
const productController = require("./controllers/product");
const registrationController = require("./controllers/registration");
const loginController = require("./controllers/login");

// map each controller to the app object
app.use("/", generalController);
app.use("/", productController); // now working. Was NOT working with /products
app.use("/", registrationController);
app.use("/", loginController);



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
