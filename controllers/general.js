const express = require("express");
const router = express.Router();
const packageData = require("../model/meal-packages");

router.get("/", (req, res) => {
  packageData
    .getTopPackages()
    .then((data) => {
      res.render("general/home", {
        title: "Home Page",
        packages: data,
        hero: "Meals and groceries delivered.",
      });
    })
    .catch((err) => {
      res.render("general/home", {
        title: "Home Page",
        products: [],
        hero: "Meals and groceries delivered.",
      });
    });
});

router.get("/noaccess", (req, res) => {
  res.render("general/noaccess", {
    title: "Error No Access",
  });
});

module.exports = router;
