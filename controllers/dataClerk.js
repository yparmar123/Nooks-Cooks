const express = require("express");
const router = express.Router();
const packageData = require("../model/meal-packages");
const e = require("express");

const dataSession = (req, res, next) => {
    if(!req.dataSession.user && !req.session.user) {
        res.redirect("/account/login");
    } else if (!req.dataSession.user) {
        res.redirect("/noaccess");
    } else {
        next();
    }
};

router.get("/clerkdashboard", dataSession, (req,res)=>{
    res.render("dataClerk/clerkdashboard", {
        title: "Dashboard"
    });
});

router.get("/addPackage", dataSession, (req, res) => {
    res.render("dataClerk/addPackage", {
        title: "Add Package Page"
    });
});

router.get("/packageList", dataSession, (req, res) => {
    packageData.getAllPackages().then((data) => {
        res.render("dataClerk/packageList", {
            title: "Packages List Page",
            products: data
        });
    }).catch((err) => {
        res.render("dataClerk/packageList", {
            title: "Packages List Page",
            products: []
        });
    }); 
});

router.get("/packageList/delete/:packageID", dataSession, (req,res) => {
    packageData.deletePackage(req.params.packageID).then(() => {
        res.redirect("/dataClerk/packageList");
    }).catch((err)=>{
        res.status(500).send("Unable to Remove Employee / Employee Not Found");
    });
});

router.get("/package/:packageID", dataSession, (req, res) => {
    let viewData = {};
    packageData.getPackageByID(req.params.packageID).then((data) => {
        if (data) {
            viewData.package = data;
        } else {
            viewData.package = null;
        }
    }).catch(() => {
        viewData.package = null;
    }).then(() => {
        if(viewData.package === null) {
            res.status(404).send("Package Not Found");
        } else {
            res.render("dataClerk/package", {
                title: "Package Details",
                viewData: viewData
            });
        }
    }).catch((err) => {
        res.status(500).send("Unable to show Package")
    })
})

module.exports = router;