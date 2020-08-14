const express = require("express");
const router = express.Router();
const packageData = require("../model/meal-packages");

router.get("/MealPackages", (req, res) => {
  packageData
    .getAllPackages()
    .then((data) => {
      res.render("products/packages", {
        title: "Meal Packages Page",
        packages: data,
        hero: "Our meal packages.",
      });
    })
    .catch((err) => {
      res.render("products/packages", {
        title: "Meal Packages Page",
        packages: [],
        hero: "Our meal packages.",
      });
    });
});

router.get("/packageDetails/:packageID", (req, res) => {
  packageData
    .getPackageByID(req.params.packageID)
    .then((data) => {
      res.render("products/packageDetails", {
        title: data.name,
        package: data[0],
      });
    })
    .catch((err) => {
      res.status(500).send("Unable to fetch data");
    });
});

module.exports = router;
