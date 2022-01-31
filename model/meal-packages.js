const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let packageSchema = new Schema({
  packageID: {
    type: Number,
    unique: true,
  },
  name: String,
  image: String,
  price: Number,
  description: String,
  topMeal: Boolean,
  meals: Number,
  category: String,
});

let Package;

module.exports.initialize = () => {
  return new Promise((resolve, reject) => {
    let db = mongoose.createConnection(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db.on("error", (err) => {
      reject(err);
    });
    db.once("open", () => {
      Package = db.model("packages", packageSchema);
      resolve();
    });
  });
};

module.exports.getAllPackages = () => {
  return new Promise((resolve, reject) => {
    Package.find()
      .lean()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject("query returned 0 results");
      });
  });
};

module.exports.getTopPackages = () => {
  return new Promise((resolve, reject) => {
    Package.find({ topMeal: true })
      .lean()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject("query returned 0 results");
      });
  });
};

module.exports.addPackage = (packageData) => {
  return new Promise((resolve, reject) => {
    for (let prop in packageData) {
      if (packageData[prop] == "") {
        packageData[prop] = null;
      }
    }

    Package.create(packageData)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject("unable to create package");
      });
  });
};

module.exports.getPackageByID = (ID) => {
  return new Promise((resolve, reject) => {
    Package.find({ packageID: ID })
      .lean()
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        reject("query found 0 results");
      });
  });
};

module.exports.updatePackage = (ID, packageData) => {
  return new Promise((resolve, reject) => {
    Package.updateOne({ packageID: ID }, { $set: packageData })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("unable to update package");
      });
  });
};

module.exports.deletePackage = (ID) => {
  return new Promise((resolve, reject) => {
    Package.deleteOne({ packageID: ID })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("unable to delete the package");
      });
  });
};
