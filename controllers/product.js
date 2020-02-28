const express = require('express');
const router = express.Router();


// IMPORT FAKE DB 
const products = require("../models/products");


// ROUTE for the Products Page
router.get("/products", (req, res) => {
    res.render("products/products", {
        title : "Products",
        products : products.getAllProducts()
    })
})


module.exports = router;