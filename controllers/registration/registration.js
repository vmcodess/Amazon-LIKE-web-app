const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const userModel = require('../../models/registrationModels');



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


//--------------------------------
// ---------- ROUTE for the registration ----------
router.get("/registration", (req, res) => {
    res.render("user/registration", {
        title : "Registration"
    });
});


// REGISTRATION POST ------------------
router.post("/registration", (req, res) => {

    const newUserRegistered = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        userName : req.body.username,
        password : req.body.psw
    }

    const user = new userModel(newUserRegistered);
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

    //------------------------------------------------ FIND IF EMAIL EXISTS IN DB
    //1. check if email exists in DB

    userModel.findOne({ email : newUserRegistered.email })
    .then((user) => {

        if (user === null){
            console.log(`.find.then -- user==null // email does NOT exists : ${user}`);
        } else {
            signUpErrors.push("Email already exists");
            console.log(`.find.then -- user!=null : ${user}`);
            console.log(signUpErrors);
        }
    })
    .catch((error) => {
        console.log(`.find.catch : ${error}`);
        return res.send(error);
    })
    console.log(signUpErrors);

    
    //2. If doesnt exist, save
    //3. else  -> display error
    //------------------------------------------------ FIND IF EMAIL EXISTS IN DB



    if (signUpErrors.length > 0) {
        res.render("user/registration", {
            title : "Registration",
            messages : signUpErrors,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            userName : req.body.username,
            email : req.body.email
        })
    }
    else {
        
        // const newUserRegistered = {
        //     firstName : req.body.firstName,
        //     lastName : req.body.lastName,
        //     email : req.body.email,
        //     userName : req.body.username,
        //     password : req.body.psw
        // }


        // 1. Import the userRegistration object so that we can perform CRUD operations on the collections
        // 2. Fetch the user's data from the registration form
            // done starting line 90

        // 3. Insert the user into the users collection (done on like 168;)



        //---------------------------------- CRYPT PASSWORD -- WORKING -- COMMENT OUT LATER
        // let salt = bcrypt.genSaltSync(12);
        // let hashedPassword = bcrypt.hashSync(newUserRegistered.password, salt);
        // user.password = hashedPassword;
        //---------------------------------- CRYPT PASSWORD

        user.save()
        .then((user) => {
            //console.log(`user.save = .then == ${user}`)
            console.log(`User successfully has been inserted into the user collection DB!`);

            //SEND EMAIL
            // using Twilio SendGrid's v3 Node.js Library
            // https://github.com/sendgrid/sendgrid-nodejs
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
            to: `${user.email}`,
            from: `vmatveevspam@gmail.com`,
            subject: 'Welcome to QuickBuy',
            //text: '',
            html: 
            `
            Welcome ${user.firstName}, thank you for registering with QuickBuy. Your login details are below: <br>
            Username: ${user.userName} <br>
            Password: ${user.password}
            `,
            };

            sgMail.send(msg)
            .then(()=>{
                //req.session.userInfo = user;
                //console.log(`${user}`);
                res.redirect("login");
                console.log(`Email successfully sent!`);
            })
            .catch(err=>{
                console.log(`Email did not send -> Error : ${err}`);
            })

        })
        .catch((err) => {
            console.log(`Error occured when inserting data into the user collection : ${err}`);
        })
    }
});



module.exports = router;
