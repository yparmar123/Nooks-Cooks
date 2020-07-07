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

app.get("/dashboard", (req,res)=>{
    res.render("dashboard", {
        title: "Dashboard"
    });
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
    const {fName, lName, email, password} = req.body
    
    
    if (fName === "")
    {
        fNameError = error;
    } else if (!nameRegex.test(fName))
    {
        fNameError = nameErr;
    }

    if (lName === "")
    {
        lNameError = error;
    }
    else if (!nameRegex.test(lName))
    {
        lNameError = nameErr;
    }

    if (email === "")
    {
        emailError = error;
    }

    if (password === "")
    {
        passError = error;
    } else if (!passRegex.test(password))
    {
        passError = "Password must only contain letters and numbers, and must be between 6-12 characters."
    }

    if(emailError !== "" || passError !== "" || fNameError !== "" || lNameError !== "")
    {
        res.render("signup", {
            title: req.title,
            emailError: emailError,
            passError: passError,
            fNameError: fNameError,
            lNameError: lNameError,
            fValue: fName,
            lValue: lName,
            pValue: password,
            eValue: email
        });
    }
    else {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: `${email}`,
            from: `yuvrajparmar1060@gmail.com`,
            subject: "Welcome to Nook's Cooks!",
            html:
            `Welcome to the Nook's Cooks family ${fName} ${lName}!<br><br>
            We are glad to serve you healthy and tastey food! Feel free to check out our meal packages on our website as we have a wide variety of healthy yet tastey offerings!<br>
            We look forward to having you with us!<br><br>
            CEO<br>
            Tom Nook<br>
            Nook's Cooks Inc.
            `,
        };
        sgMail.send(msg)
        .then(()=>{
            res.redirect("/dashboard");
        })
        .catch(err=>{
            console.log(`Error: ${err}`);
        }); 
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Web Server is up and running!");
});
