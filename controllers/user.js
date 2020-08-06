const express = require("express");
const router = express.Router();
const cart = require("../model/cart");
const products = require("../model/meal-packages");

const ensureLogin = (req, res, next) => {
    if(!req.session.user && !req.dataSession.user) {
        res.redirect("/account/login");
    } else if (!req.session.user) {
        res.redirect("/noaccess");
    }
    else {
        next();
    }
};

router.get("/dashboard", ensureLogin, (req,res)=>{
    res.render("user/dashboard", {
        title: "Dashboard"
    });
});

router.get("/cart", ensureLogin, (req,res) => {
    let cartData = {
        cart: [],
        total: 0
    };
    cart.getCart().then((items) => {
        cartData.cart = items;
        cart.checkout().then((total) => {
            cartData.total = total;
            res.render("user/cart", {data: cartData.cart, total: cartData.total});
        }).catch((err) => {
            res.send("There was an error getting total: " + err);
        });
    }).catch((err) => {{
        res.send("There was an error: " + err);
    }});
});

router.get("/removeItem/:packageID", ensureLogin, (req,res) => {
    let cartData = {
        cart: [],
        total: 0
    };
    products.getPackageByID(req.params.packageID).then((data) => {
        cart.removeItem(data[0]).then(cart.checkout()).then((inTotal) => {{
            cartData.total = inTotal;
            cart.getCart().then((items) => {
                cartData.cart = items;
                res.redirect("/user/cart");
            }).catch((err) => {
                res.status(500).send("Unable to get package");
            });
        }}).catch((err) => {
            res.status(500).send("Unable to remove package");
        })
    })
    
})

router.get("/addPackage/:packageID", ensureLogin, (req,res) => {
    products.getPackageByID(req.params.packageID).then((data) => {
        cart.addItem(data[0]).then(() => {
            res.redirect("/products/mealPackages");
        }).catch((err) => {
            res.status(500).send("Unable to add to cart");
        });
    }).catch((err) => {
        res.status(500).send("Unable to get package");
    })
})


module.exports = router;