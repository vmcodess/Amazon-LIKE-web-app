// Author : Vladislav Matveev


const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');

// IMPORT FAKE DB
const productCategories = require("./model/homePageCategories");
const productBestSeller = require("./model/homepageBestSeller");
const products = require("./model/products");

// tell express to setup our template engine has handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// server static content with Express
app.use(express.static('public/img')); // Had to add this public/img because banner and avatar wasn't showing up with just 'public'
app.use(express.static('public')); 

// This tells express to make form data available via req.body in every request
app.use(bodyParser.urlencoded({ extended: false }));


// ROUTE for the homepage
app.get("/", (req, res) => {

    res.render("home", {
        title : "Home Page",
        homeCategories : productCategories.getCategoryProducts(),
        homeBestSeller : productBestSeller.gethomeBestSeller(),

        // if (homeBestSeller == true)
    });

})

// ROUTE for the Products Page
app.get("/products", (req, res) => {

    res.render("products", {
        title : "Products",
        products : products.getAllProducts()
    })
})

// ROUTE for the customer-registration
app.get("/registration", (req, res) => {

    res.render("registration", {
        title : "Registration",
    })
})

// ROUTE for the login
app.get("/login", (req, res) => {

    res.render("login", {
        title : "Login",
    })
})


// REGISTRATION POST ------------------
app.post("/registration", (req, res) => {

    const signUpErrors = [];

    if (req.body.firstName == ""){
        signUpErrors.push("Missing First Name");
    }
    if (req.body.lastName == "") {
        signUpErrors.push("Missing Last Name");
    }
    if (req.body.username == ""){
        signUpErrors.push("Missing Username");
    }
    if (req.body.psw == "") {
        signUpErrors.push("Missing Password");
    }
    if (req.body.pswrepeat == ""){
        signUpErrors.push("Missing Password");
    }
    if (req.body.psw !== req.body.pswRepeat){
        signUpErrors.push("Passwords do not match");
    }
    // let str = "123456"
    // if (req.body.psw < str.length && req.body.pswRepeat < str.length){
    //     signUpErrors.push("Password must be greater than 6 characters")
    // }

    //checkPassword(req.body.psw);
    // let letterNumber = /^[0-9a-zA-Z]+$/;
    // if (letterNumber.test(req.body.psw !== true)){
    //     signUpErrors.push("Password must contain letters and numbers");
    // }


    if (signUpErrors.length > 0) {
        res.render("registration", {
            title : "Registration",
            messages : signUpErrors,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            userName : req.body.userName,
            email : req.body.email
        })
    }
    else {
        res.render("login", {
            title : "Login",
            // message : `Welcome ${req.body.firstName}!`
        })
    }

})

app.post("/login", (req,res)=>{
    
    const loginErrors = [];

    // if (req.body.uname < length(6)){
    //     loginErrors.push("Username must be more than 6 characters");
    // }
})


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Web Server is connected!!")
})





// // Function to check letters and numbers
// function checkPassword(inputtxt) {
//     let letterNumber = /^[0-9a-zA-Z]+$/;
//     if(inputtxt.match(letterNumber)) {
//         return true;
//     }
//     else { 
//         // alert("message"); 
//         return false; 
//     }
// }