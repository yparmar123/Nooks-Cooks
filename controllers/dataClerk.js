const express = require("express");
const router = express.Router();
const packageData = require("../model/meal-packages");
const multer = require("multer");
const path = require("path");

const dataSession = (req, res, next) => {
    if(!req.dataSession.user && !req.session.user) {
        res.redirect("/account/login");
    } else if (!req.dataSession.user) {
        res.redirect("/noaccess");
    } else {
        next();
    }
};

const storage = multer.diskStorage({
    destination: "./public/img",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

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
    packageData.getPackageByID(req.params.packageID).then((data) => {
            res.render("dataClerk/package", {
                title: "Package Details",
                package: data[0]
            });
    }).catch(() => {
        res.status(500).send("Unable to show Package");      
    });
});

router.post("/package/update/:packageID", dataSession, (req,res) => {
    packageData.updatePackage(req.params.packageID, req.body).then(() => {
        res.redirect("/dataClerk/PackageList");
    }).catch((err) => {
        res.status(500).send("Unable to update Package");
    });
});

router.post("/package/add", upload.single("image"), dataSession, (req,res) => {
    packageData.addPackage(req.body).then(() => {
        packageData.updatePackage(req.body.packageID, {image: path.basename(req.file.path)}).then(()=>{
            res.redirect("/dataClerk/packageList");
        }).catch((err) => {
            res.status(500).send("Unable to add Package " + err);
        });
        
    }).catch((err) => {
        res.status(500).send("Unable to add Package " + err);
    });
});

router.get("/package/delete/:packageID", dataSession, (req,res) => {
    packageData.deletePackage(req.params.packageID).then(() => {
        res.redirect("/dataClerk/packageList");
    }).catch((err) => {
        res.status(500).send("Unable to Remove Package");
    })
})
module.exports = router;