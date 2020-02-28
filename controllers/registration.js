const express = require('express');
const router = express.Router();


// ROUTE for the registration
router.get("/registration", (req, res) => {
    res.render("registration/registration", {
        title : "Registration"
    });
});


// REGISTRATION POST ------------------
router.post("/registration", (req, res) => {

    const signUpErrors = [];

    if (req.body.firstName == ""){
        signUpErrors.push("Missing First Name");
    }
    if (req.body.lastName == "") {
        signUpErrors.push("Missing Last Name");
    }
    if (req.body.username == ""){
        signUpErrors.push("Missing Username");
    }
    if (req.body.psw == "") {
        signUpErrors.push("Missing Password");
    }
    if (req.body.pswrepeat == ""){
        signUpErrors.push("Missing Password");
    }
    if (req.body.psw !== req.body.pswRepeat){
        signUpErrors.push("Passwords do not match");
    }

    let str = "123456"
    if (req.body.psw < str.length && req.body.pswRepeat < str.length){
        signUpErrors.push("Password must be greater than 6 characters")
    }

    //checkPassword(req.body.psw);
    if (checkPassword(req.body.psw) == false){
        signUpErrors.push("Password must contain letters and numbers");
    }


    if (signUpErrors.length > 0) {
        res.render("registration/registration", {
            title : "Registration",
            messages : signUpErrors,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            userName : req.body.userName,
            email : req.body.email
            // signUpErrors : null
        })
    }
    else {



        const { firstName, email, username, psw } = req.body;

        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
        to: `${email}`,
        from: `vmatveevspam@gmail.com`,
        subject: 'New User Registered',
        //text: '',
        html: 
        `
        Welcome ${firstName}, thank you for registering with Quick Buy. Your login details are below: <br>
        Username: ${username} <br>
        Password: ${psw}
        `,
        };

        sgMail.send(msg)
        .then(()=>{
            res.render("login/dashboard", {
                title : "Dashboard",
                message : `Welcome ${req.body.firstName}!`
            })
        })
        .catch(err=>{
            console.log(`Error ${err}`);
        })
    }
});

// Function to check letters and numbers
function checkPassword(inputtxt) {
    let letterNumber = /^[0-9a-zA-Z]+$/;
    if(inputtxt.match(letterNumber)) {
        return true;
    }
    else { 
        // alert("message"); 
        return false; 
    }
}


module.exports = router;