const express = require('express');
const router = express.Router();


// IMPORT FAKE DB 
const productCategories = require("../../models/homePageCategories");
const productBestSeller = require("../../models/homepageBestSeller");



// ROUTE for the homepage
router.get("/", (req, res) => {

    res.render("general/home", {
        title : "Home Page",
        homeCategories : productCategories.getCategoryProducts(),
        homeBestSeller : productBestSeller.gethomeBestSeller(),
    });
});



module.exports = router;