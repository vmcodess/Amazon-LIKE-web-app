const express = require('express');
const router = express.Router();

router.get("/cart", (req, res) => {
    res.render("shoppingCart/cart", {
        title : "Shopping Cart"
    })
})

module.exports = router;