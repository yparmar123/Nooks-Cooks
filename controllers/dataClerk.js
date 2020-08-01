const express = require("express");
const router = express.Router();

const dataSession = (req, res, next) => {
    if(!req.dataSession.user && !req.dataSession.user) {
        res.redirect("/login");
    } else if (!req.dataSession.user) {
        res.redirect("/noaccess");
    } else {
        next();
    }
}


router.get("/clerkdashboard", dataSession, (req,res)=>{
    res.render("dataClert/clerkdashboard", {
        title: "Dashboard"
    });
});