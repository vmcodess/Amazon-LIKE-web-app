const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/auth');
const adminDashboardLoader = require("../../middleware/authorization");

// Import Product Schema
const productModel = require("../../models/productModels"); 

router.get("/productView", isAuthenticated, (req, res) => {

    productModel.find()
    .then((products) => {
        const allProducts = products.map(product => {
            return {
                id : product._id,
                productName : product.productName,
                description : product.description,
                price : product.price,
                quantity : product.quantity,
                category : product.category,
                image : product.imagePath
            }
        });
        res.render("products/productView", {
            title : "All Products",
            data : allProducts
        })
    })
    .catch((err) => {
        console.log(`Error retrieving products : ${err}`);
    })
});



module.exports = router;