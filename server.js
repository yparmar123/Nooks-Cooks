const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

require('dotenv').config({path:"./config/keys.env"});

const fakeDB = require('./model/fakeDB');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get("/", (req, res)=>{
    res.render("home", {
        title: "Home Page",
        products: fakeDB.ProductsDB,
        hero: "Meals and groceries delivered."
    });
});

app.get("/MealPackages", (req, res) => {
    res.render("package", {
        title: "Meal Packages Page",
        packages: fakeDB.PackagesDB,
        hero: "Our meal packages."
    });
});

app.get("/login", (req, res)=>{
    res.render("login", {
        title: "Log In Page"
    });
});

app.get("/signup", (req, res) => {
    res.render("signup", {
        title: "Sign Up Page"
    })
})


app.post("/login", (req, res) => {
    let emailError = "";
    let passError = "";
    if(req.body.email === "")
    {
        emailError = "You must enter an email address";
    }

    if(req.body.password === "")
    {
        passError = "You must enter a password";
    }

    if(emailError !== "" || passError !== "")
    {
        res.render(`home`, {
            title: req.title,
            products: req.products,
            packages: req.packages,
            hero: req.hero,
            emailError: emailError,
            passError: passError
        })
    }
    else {
        res.redirect("/");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Web Server is up and running!");
});
