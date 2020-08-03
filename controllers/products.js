const express = require("express");
const router = express.Router();
const packageData = require("../model/meal-packages");

router.get("/MealPackages", (req, res) => {
    packageData.getAllPackages().then((data) => {
        res.render("products/packages", {
            title: "Meal Packages Page",
            packages: data,
            hero: "Our meal packages."
        });    
    }).catch((err) => {
        res.render("products/packages", {
            title: "Meal Packages Page",
            packages: [],
            hero: "Our meal packages."
        });  
    }) 
});

module.exports = router;