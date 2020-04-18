const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const isAuthenticated = require('../../middleware/auth');

// IMPORT user schema
const userModel = require('../../models/registrationModels');

// Import Product Schema
const productModel = require("../../models/productModels"); 
// Import cart Model
const Cart = require("../../models/cart");

router.get("/add-to-cart/:id", isAuthenticated, (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    productModel.findById(productId)
    .then((product) => {
        cart.add(product, product.id);
        req.session.cart = cart;
        //console.log(req.session.cart);
        res.redirect("/cart");
    })
    .catch(err => console.log(`error adding to cart : ${err}`));
})

router.get("/cart", isAuthenticated, (req, res) => {
    if (!req.session.cart) {
        return res.render("shoppingCart/cart", {products : null});
    }
    let cart = new Cart(req.session.cart);
    //cart.item = shows the whole object...but how to access the string
    //console.log(cart.items);
    //console.log(cart.items);

    res.render("shoppingCart/cart", { 
        products : cart.generateArray(), 
        totalPrice : cart.totalPrice
    })
})

// ROUTER POST for cart form // send email
router.post("/cart", isAuthenticated, (req, res) => {

    //send user an email when he places an order
    // 1. destructure the form
    const submittedForm = {
        productName : req.body.productName,
        productQuantity : req.body.productQuantity,
        totalPrice : req.body.totalPrice,
        cartSubtotal : req.body.cartSubtotal,
        cartTax : req.body.cartTax,
        cartShipping : req.body.cartShipping,
        cartTotal : req.body.cartTotal
    }
    console.log(submittedForm);

    // 2. get the users session info
    const user = req.session.userInfo;
    //console.log(req.session.userInfo) // works
    

    // 3. send email with products
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
    to: `${user.email}`,
    from: `vmatveevspam@gmail.com`,
    subject: 'Your QuickBuy Order has been received!',
    //text: '',
    html: 
    `
    Hi ${user.firstName}, <br><br>

    Just to let you know -- we've received your order, and it is now being processed: <br><br>
    
    ${submittedForm.productName} x${submittedForm.productQuantity} <br>
    $${submittedForm.totalPrice} <br><br>

    Subtotal: $${submittedForm.cartSubtotal} <br>
    Tax (5%): $${submittedForm.cartTax} <br>
    Shopping: $${submittedForm.cartShipping} <br>
    Total : $${submittedForm.cartTotal} <br><br>

    Thanks for using QuickBuy!
    `,
    };

    sgMail.send(msg)
    .then(()=>{
        console.log(`Email successfully sent!`);
        res.redirect("/");
        //alert('Product ordered!');
        // 4. destroy cart session
        delete req.session.cart;
    })
    .catch(err=>{
        console.log(`Email did not send -> Error : ${err}`);
    })
})

module.exports = router;