const express = require('express');
const router = express.Router();
const path = require('path');
const isAuthenticated = require('../../middleware/auth');


// IMPORT FAKE DB 
const products = require("../../models/products");

// import from database
const productModel = require("../../models/productModels"); //product schema


// ROUTE for the products/list Page
router.get("/list", (req, res) => {
    res.render("products/products", {
        title : "Products",
        products : products.getAllProducts()
    })

    // When user clicks on image, take them to the product description page
    // const product = document.querySelector("container-product-img");
    // for (let i = 0; i < product.length; i++) {
    //     product[i].addEventListener("click", () => {
    //         res.render("products/description", {
    //             title : "Description",
    //             description : product[i]
    //         })
    //     })
    // }
});

// same as above except PULL products from DATABASE
router.get("/list", (req, res) => {
    // res.render("products/products", {
    //     title : "Products",
    //     products : products.getAllProducts()
    // })

    // pull from database, get the results that was returned and then inject those results into the product/list
    productModel.find()
    .then(() => {
        
    })
    .catch((err) => {
        console.log(`Error when retrieving products from database : ${err}`);
    })


});





// ----------- PRODUCT DESCRIPTION ----------
router.get("/description", (req, res) => {
    res.render("products/description", {
        title : "Description",
        // description
    })
})


module.exports = router;