const express = require("express");
const router = express.Router();
const fakeDB = require("../model/fakeDB");

router.get("/MealPackages", (req, res) => {
    res.render("products/package", {
        title: "Meal Packages Page",
        packages: fakeDB.PackagesDB,
        hero: "Our meal packages."
    });
});

module.exports = router;