const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/auth');
const adminDashboardLoader = require("../../middleware/authorization");

// Import Product Schema
const productModel = require("../../models/productModels"); 

router.get("/edit/:id", isAuthenticated, (req, res) => {

    productModel.findById( req.params.id )
    .then((product) => {
        const { _id, imagePath, productName, description, price, quantity, bestSeller } = product;
        res.render("products/productEdit", {
            _id,
            imagePath,
            productName,
            description,
            price,
            quantity,
            bestSeller
        })
    })
    .catch((err) => {
        console.log(`ID does not match anything in database: ${err}`);
    })
});


router.put("/update/:id", (req, res) => {

    const product = {
        productName : req.body.productName,
        description : req.body.description,
        price : req.body.price,
        quantity : req.body.quantity,
        bestSeller : req.body.bestSeller
    }

    productModel.updateOne({ _id : req.params.id }, product)
    .then(() => {
        res.redirect("/user/productView");
    })
    .catch((err) => {
        console.log(`Error when updating product from database : ${err}`);
    })
})

router.delete("/delete/:id", (req, res) => {

    productModel.deleteOne({ _id : req.params.id})
    .then(() => {
        res.redirect("/user/productView");
    })
    .catch(err => console.log(`Error delete product from database ${err}`));

})

module.exports = router;