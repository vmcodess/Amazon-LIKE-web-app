const express = require('express');
const router = express.Router();


// ROUTE for the login
router.get("/login", (req, res) => {
    res.render("login/login", {
        title : "Login"
    });
});


router.post("/login", (req,res)=>{

});


module.exports = router;