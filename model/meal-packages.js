const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let packageSchema = new Schema({
    "name": String,
    "image": String,
    "price": Number,
    "description": String,
    "topMeal": Boolean,
    "meals": Number,
    "category": String
});

let Package;

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
        db.on("error", (err)=>{
            reject(err);
        });
        db.once("open", ()=>{
            Package = db.model("packages", packageSchema);
            resolve();
        });
    });
};

module.exports.getAllPackages = () => {
    return new Promise((resolve, reject) => {
        Package.find().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject("query returned 0 results");
        });
    });
}

module.exports.getTopPackages = () => {
    return new Promise((resolve, reject) => {
        Package.find({topMeal: true}).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject("query returned 0 results");
        });
    });
}

module.exports.addPackage = (packageData) => {
    return new Promise((resolve, reject) => {
        for (let prop in packageData) {
            if(packageData[prop] == '') {
                packageData[prop] = null;
            }
        }

        Package.create(packageData).then(()=>{
            resolve();
        }).catch((err) => {
            console.log(err)
            reject("unable to create package");
        });
    });
}