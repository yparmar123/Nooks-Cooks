const express = require("express");
const router = express.Router();
const loginAuth = require("../model/login-auth");

router.get("/login", (req, res)=>{
    res.render("account/login", {
        title: "Log In Page"
    });
});

router.get("/signup", (req, res) => {
    res.render("account/signup", {
        title: "Sign Up Page"
    })
})

router.post("/login", (req, res) => {
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
        res.render("account/login", {
            title: req.title,
            emailError: emailError,
            passError: passError,
            email: req.body.email
        });
    }
    else {
        req.body.userAgent = req.get("User-Agent");

        loginAuth.checkUsers(req.body).then((user) => {
            if (!user.dataClerk){
                req.session.user = {
                    email: user.email,
                    fName: user.fName,
                    lName: user.lName,
                    dataClerk: user.dataClerk,
                    loginHistory: user.loginHistory                
                }
                res.redirect("/user/dashboard");
            } else {
                req.dataSession.user = {
                    email: user.email,
                    fName: user.fName,
                    lName: user.lName,
                    dataClerk: user.dataClerk,
                    loginHistory: user.loginHistory                
                }
                res.redirect("/dataClerk/clerkdashboard");
            }
        }).catch((err) => {
            res.render("account/login", {
                err: err,
                email: req.body.email
            })
        })
    }
});

router.post("/signup", (req,res)=>{
    let fNameError = "";
    let lNameError = "";
    let emailError = "";
    let passError = "";
    const error = "This field is required.";
    const nameErr = "This field may only contain letters.";
    const passRegex = /^[a-zA-Z0-9]{6,12}$/;
    const nameRegex = /^[a-zA-Z]*$/;
    const {fName, lName, email, password} = req.body;
    req.body.dataClerk = false;


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
        res.render("account/signup", {
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
        loginAuth.registerUser(req.body).then(()=>{
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);
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
                res.render("account/login", {
                    signedUp: '<div class="alert alert-success" role="alert">Thanks for signing up! Please log in to continue!</div>'
                });
            }).catch(err=>{
                console.log(`Error: ${err}`);
            }); 

        }).catch((err)=>{
            res.render("account/signup", {
                title: req.title,
                err: err,
                fValue: fName,
                lValue: lName,
                pValue: password,
                eValue: email
            });
        })                
    }
});

router.get("/logout" , (req, res) =>{
    req.session.reset();
    res.redirect("/");
});

module.exports = router;