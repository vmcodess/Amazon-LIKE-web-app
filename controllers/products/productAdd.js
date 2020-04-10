const express = require('express');
const router = express.Router();
const path = require('path');
const isAuthenticated = require('../../middleware/auth');

// Import Product Schema
const productModel = require("../../models/productModels"); 



// ----------- PRODUCT ADD ROUTE ----------
router.get("/productAdd", isAuthenticated, (req, res) => {
    res.render("products/productAdd", {
        title : "Add Product"
    })
});

router.post("/productAdd", isAuthenticated, (req, res) => {

    const newProduct = {
        productName : req.body.productName,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        quantity : req.body.quantity,
        bestSeller : req.body.bestSeller
    }

    const product = new productModel(newProduct);
    product.save()
    .then((product) => {
        //-------
        //req.files.productImage.name = `${product._id}${path.parse(req.files.productImage.name).ext}`;
        const imageFile = `${product._id}${path.parse(req.files.productImage.name).ext}`;

        req.files.productImage.mv(`public/uploads/${imageFile}`)
        .then(() => {
            
            productModel.updateOne({ _id : product._id }, { imagePath : imageFile })
            .then(() => {
                res.redirect('/products/list');
                //console.log(`Successfully updated product and added productPath`);
            })
            .catch((err) => {
                console.log(`Error updating ${err}`);
            })
        })
        .catch((err) => {
            console.log(`Error inserting image into uploads folder : ${err}`);
            res.redirect('/products/add');
        })
        //------ 
        console.log(`Product successfully inserted into database : ${product}`);
    })
    .catch((err) => {
        console.log(`Error saving product into database : ${err}`);
        res.redirect('/products/add');
    })
});


module.exports = router;