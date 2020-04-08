const dashboardLoader = (req, res) => {
    if (req.session.userInfo.type == "Admin") {
        res.render('user/adminDashboard');
    }
    else {
        res.render('user/dashboard');
    }
}

module.exports = dashboardLoader;