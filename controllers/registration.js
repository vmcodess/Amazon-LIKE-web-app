const express = require('express');
const router = express.Router();
const userRegistrationModel = require('../models/registrationModels');



// Function to check numbers
function checkPswNumber(inputtxt) {
    let letterNumber = /[0-9]/;
    if(inputtxt.match(letterNumber)) {
        return true;
    }
    else { 
        return false; 
    }
}
// Function to check numbers
function checkPswLetters(inputtxt) {
    let letterNumber = /[a-z]/;
    if(inputtxt.match(letterNumber)) {
        return true;
    }
    else { 
        return false; 
    }
}

function checkletters(txt) {
    let letters = /^[A-Za-z]+$/;

    if(txt.match(letters)) {
        return true;
    }
    else { 
        return false; 
    }
}

//--------------------------------
// ROUTE for the registration
router.get("/registration", (req, res) => {
    res.render("registration/registration", {
        title : "Registration"
    });
});


// REGISTRATION POST ------------------
router.post("/registration", (req, res) => {

    const signUpErrors = [];

    if (req.body.firstName === ""){
        signUpErrors.push("Missing First Name");
    }
    if (req.body.lastName === "") {
        signUpErrors.push("Missing Last Name");
    }
    if (req.body.username === ""){
        signUpErrors.push("Missing Username");
    }
    if (req.body.psw === "") {
        signUpErrors.push("Missing Password");
    }
    if (req.body.pswrepeat === ""){
        signUpErrors.push("Missing Password");
    }
    if (req.body.psw !== req.body.pswRepeat){
        signUpErrors.push("Passwords do not match");
    }
    let pswd = req.body.psw;
    if (pswd.length < 6){
        signUpErrors.push("Password must be greater than 6 characters")
    }
    //check for numbers
    if (checkPswNumber(req.body.psw) === false ){
        signUpErrors.push("Password must contain numbers");
    }
    //check for letters
    if (checkPswLetters(req.body.psw) === false){
        signUpErrors.push("Password must contain letters");
    }

    if (signUpErrors.length > 0) {
        res.render("registration/registration", {
            title : "Registration",
            messages : signUpErrors,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            userName : req.body.username,
            email : req.body.email
        })
    }
    else {
        
        const newUserRegistered = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            userName : req.body.username,
            password : req.body.psw
        }

        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
        to: `${newUserRegistered.email}`,
        from: `vmatveevspam@gmail.com`,
        subject: 'New User Registered',
        //text: '',
        html: 
        `
        Welcome ${newUserRegistered.firstName}, thank you for registering with QuickBuy. Your login details are below: <br>
        Username: ${newUserRegistered.userName} <br>
        Password: ${newUserRegistered.password}
        `,
        };

        sgMail.send(msg)
        .then(()=>{
            res.render("user/dashboard", {
                title : "Dashboard",
                message : `Welcome ${req.body.firstName}!`
            })
        })
        .catch(err=>{
            console.log(`Error : ${err}`);
        })

            // 1. Import the userRegistration object so that we can perform CRUD operations on the collections
            // 2. Fetch the user's data from the registration form
                // done starting line 96

            // 3. Insert the user into the users collection
            const user = new userRegistrationModel(newUserRegistered)
            user.save()
            .then(() => {
                console.log(`User successfully has been inserted into the user collection!`);
            })
            .catch((err) => {
                console.log(`Error occured when inserting data into the user collection : ${err}`);
            })
    }
});



module.exports = router;
