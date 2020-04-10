const express = require('express');
const router = express.Router();

// Import Product Schema
const productModel = require("../../models/productModels"); 
// Import cart Model
const Cart = require("../../models/cart");

router.get("/add-to-cart/:id", (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    productModel.findById(productId)
    .then((product) => {
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect("/");
    })
    .catch(err => console.log(`error adding to cart : ${err}`));


    // res.render("shoppingCart/cart", {
    //     title : "Shopping Cart"
    // })
})

router.post("/cart", (req, res) => {

})

module.exports = router;