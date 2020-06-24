const express = require("express");
const exphbs  = require('express-handlebars');
const fakeDB = require('./model/fakeDB');

const app = express();

app.use(express.static("public"));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get("/", (req, res)=>{
    res.render("home", {
        title: "Home Page",
        products: fakeDB.ProductsDB,
        hero: "Meals and grocery delivered."
    });
});

app.get("/MealPackages", (req, res) => {
    res.render("package", {
        title: "Meal Packages Page",
        packages: fakeDB.PackagesDB,
        hero: "Our meal packages."
    });
});

app.listen(3000, ()=>{
    console.log("Web Server is up and running!");
});
