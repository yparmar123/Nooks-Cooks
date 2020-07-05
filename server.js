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
    const error = "This field is required."
    if(req.body.email === "")
    {
        emailError = error;
    }

    if(req.body.password === "")
    {
        passError = error;
    }

    if(emailError !== "" || passError !== "")
    {
        res.render("login", {
            title: req.title,
            emailError: emailError,
            passError: passError
        });
    }
    else {
        res.redirect("/");
    }
});

app.post("/signup", (req,res)=>{
    let fNameError = "";
    let lNameError = "";
    let emailError = "";
    let passError = "";
    const error = "This field is required.";
    const nameErr = "This field may only contain letters.";
    const passRegex = /^[a-zA-Z0-9]{6,12}$/;
    const nameRegex = /^[a-zA-Z]*$/;
    
    
    if (req.body.fName === "")
    {
        fNameError = error;
    } else if (!nameRegex.test(req.body.fName))
    {
        fNameError = nameErr;
    }

    if (req.body.lName === "")
    {
        lNameError = error;
    }
    else if (!nameRegex.test(req.body.lName))
    {
        lNameError = nameErr;
    }

    if (req.body.email === "")
    {
        emailError = error;
    }

    if (req.body.password === "")
    {
        passError = error;
    } else if (!passRegex.test(req.body.password))
    {
        passError = "Password must only contain letters and numbers and be between 6-12 characters."
    }

    if(emailError !== "" || passError !== "" || fNameError !== "" || lNameError !== "")
    {
        res.render("signup", {
            title: req.title,
            emailError: emailError,
            passError: passError,
            fNameError: fNameError,
            lNameError: lNameError,
            fValue: req.body.fName,
            lValue: req.body.lName,
            pValue: req.body.password,
            eValue: req.body.email
        });
    }
    else {
        res.redirect("/");
    }

})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Web Server is up and running!");
});
