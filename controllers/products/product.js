const express = require('express');
const router = express.Router();


// IMPORT FAKE DB 
const products = require("../../models/products");
const productModel = require("../../models/productModels");


// ROUTE for the Products Page
router.get("/products", (req, res) => {
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

router.post("/products", (req, res) => {

});








//product description
router.get("/description", (req, res) => {
    res.render("products/description", {
        title : "Description",
        description
    })
})


module.exports = router;