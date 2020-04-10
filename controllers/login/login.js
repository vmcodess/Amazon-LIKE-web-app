const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//const dashboardLoader = require('../../middleware/authorization');

// Import User Registration Schema
const userModel = require('../../models/registrationModels');



// **********ROUTE for the login**********
router.get("/login", (req, res) => {
    res.render("user/login", {
        title : "Login"
    });
});

router.post("/login", (req, res)=>{
    let emailEntered = req.body.email;
    let passwordEntered = req.body.psw;

    userModel.findOne({ email: emailEntered })
    .then((user) => {
        if(bcrypt.compareSync(passwordEntered, user.password)) {
            req.session.userInfo = user;
            console.log(req.session.userInfo);
            res.redirect("user/dashboard");
            //dashboardLoader(req,res);
        } else {
            // Passwords don't match
            const loginErr = [];
            loginErr.push("Invalid password");
            res.render("user/login", { 
                title : "Login",
                loginError : loginErr
            })
        }
    })
    .catch((err) => {
        // what to do if user enters a wrong email??
        const loginErr = [];
        loginErr.push("Invalid email");
        res.render("user/login", {
            title : "Login",
            loginError : loginErr
        })
    })
});




// ROUTE for LOGOUT
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

router.post("/logout", (req, res) => {

});


module.exports = router;