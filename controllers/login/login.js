const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//const session = require('express-session');

// Import User Registration Schema
const userModel = require('../../models/registrationModels');



// ROUTE for the login
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
            // Passwords match
            console.log(`passwords match // passwordEntered = ${passwordEntered} // user.password = ${user.password}`)

            //sessions
            req.session.userInfo = user;
            console.log(`${req.session.userInfo}`)
            res.redirect("dashboard");

        } else {
            // Passwords don't match
            const loginErr = [];
            loginErr.push("Invalid password");

            console.log(`Password is wrong`)
            res.render("user/login", { // or res.redirect?
                title : "Login",
                loginError : loginErr,
                //email : 
            })
        }
        
    })
    .catch((err) => {
        // what to do if user enters a wrong email??
        console.log(`.catch // Email exists : ${err}`);

        const loginErr = [];
        loginErr.push("Invalid email");

        res.render("user/login", {
            title : "Login",
            loginError : loginErr,
            //email : 
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


// dashboard
router.get("/dashboard", (req, res) => {

    res.render("user/dashboard");

});


module.exports = router;