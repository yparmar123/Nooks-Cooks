let userCart = [];

module.exports.addItem = (inItem) => {
    return new Promise((resolve, reject) => {
        userCart.push(inItem);
        resolve(userCart.length);
    });
};

module.exports.removeItem = (inItem) => {
    return new Promise((resolve, reject) => {
        for(let i =0; i < userCart.length; i++) {
            if(userCart[i].packageID === inItem.packageID) {
                userCart.splice(i,1);
                i = userCart.length;
            }
        }
        resolve();
    });
};

module.exports.getCart = () => {
    return new Promise((resolve, reject) => {
        resolve(userCart);
    });
};

module.exports.checkout = () => {
    return new Promise((resolve,reject) => {
        let price = 0;
        if(userCart) {
            userCart.forEach(x => {
                price += x.price;
            });
        }
        resolve(price);
    });
};