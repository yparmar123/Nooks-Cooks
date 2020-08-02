const express = require("express");
const router = express.Router();

const dataSession = (req, res, next) => {
    if(!req.dataSession.user && !req.session.user) {
        res.redirect("/account/login");
    } else if (!req.dataSession.user) {
        res.redirect("/noaccess");
    } else {
        next();
    }
};

router.get("/clerkdashboard", dataSession, (req,res)=>{
    res.render("dataClerk/clerkdashboard", {
        title: "Dashboard"
    });
});

router.get("/addPackage", dataSession, (req, res) => {
    res.render("dataClerk/addPackage", {
        title: "Add Package Page"
    });
});

module.exports = router;