const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/auth');
const dashboardLoader = require('../../middleware/authorization');


router.get("/dashboard", isAuthenticated, dashboardLoader);


module.exports = router;