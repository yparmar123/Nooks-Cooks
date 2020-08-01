const express = require("express");
const router = express.Router();
const fakeDB = require("../model/fakeDB");

router.get("/", (req, res)=>{
    res.render("general/home", {
        title: "Home Page",
        products: fakeDB.ProductsDB,
        hero: "Meals and groceries delivered."
    });
});

router.get("/noaccess", (req,res)=> {
    res.render("general/noaccess", {
        title: "Error No Access"
    });
})

module.exports = router;