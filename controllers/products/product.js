const express = require('express');
const router = express.Router();
//const isAuthenticated = require('../../middleware/auth');


// import from database
const productModel = require("../../models/productModels"); //product schema

// same as above except PULL products from DATABASE
router.get("/list", (req, res) => {
    // pull from database, get the results that was returned and then inject those results into the product/list
    productModel.find()
    .then((products) => {
        // filter out the information that you want from the array of documents that was returned into a new array
        // req.session.shoppingCart = products;
        const filteredProducts = products.map(product => {
            return {
                id : product._id,
                productName : product.productName,
                description : product.description,
                price : product.price,
                category : product.category,
                image : product.imagePath
            }
        });
        res.render("products/products", {
            title : "Products",
            data : filteredProducts
        })
    })
    .catch((err) => {
        console.log(`Error when pulling products from database : ${err}`);
    })
});


// ----------- PRODUCT DESCRIPTION ----------
router.get("/description/:id", (req, res) => {

    productModel.findById( req.params.id )
    .then((product) => {
        const { _id, imagePath, productName, description, price, quantity } = product;

        let stock;
        if (quantity > 0) {
            stock = "IN STOCK";
        } else {
            stock = "OUT OF STOCK"
        }

        res.render("products/description", {
            _id,
            imagePath,
            productName,
            description,
            price,
            stock
        })
    })
    .catch(err => console.log(`Error getting product description : ${err}`));
})


module.exports = router;