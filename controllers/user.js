const express = require("express");
const router = express.Router();

const ensureLogin = (req, res, next) => {
    if(!req.session.user && !req.dataSession.user) {
        res.redirect("/account/login");
    } else if (!req.session.user) {
        res.redirect("/noaccess");
    }
    else {
        next();
    }
};

router.get("/dashboard", ensureLogin, (req,res)=>{
    res.render("user/dashboard", {
        title: "Dashboard"
    });
});

module.exports = router;