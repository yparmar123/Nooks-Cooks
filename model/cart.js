let userCart = [];

module.exports.addItem = (inItem, quanPackages) => {
  return new Promise((resolve, reject) => {
    let check = true;
    for (let i = 0; i < userCart.length; i++) {
      if (userCart[i].packageID === inItem.packageID) {
        userCart[i].quantity =
          parseInt(userCart[i].quantity, 10) + parseInt(quanPackages, 10);
        check = false;
      }
    }
    if (check) {
      let item = inItem;
      item.quantity = quanPackages;
      userCart.push(inItem);
    }
    resolve(userCart.length);
  });
};

module.exports.removeItem = (inItem) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < userCart.length; i++) {
      if (userCart[i].packageID === inItem.packageID) {
        userCart.splice(i, 1);
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
  return new Promise((resolve, reject) => {
    let price = 0;
    if (userCart) {
      userCart.forEach((x) => {
        price += x.price * x.quantity;
      });
    }
    resolve(price);
  });
};

module.exports.emptyCart = () => {
  return new Promise((resolve, reject) => {
    userCart = [];
    resolve();
  });
};

module.exports.makeEmail = (data, user, total) => {
  return new Promise((resolve, reject) => {
    let email = `Hello ${user.fName} ${user.lName},<br><br>
        We have attached your receipt for today below! Have a nice day!<br><br>
        <h2>Receipt</h2><br>
        <table> <thead> <tr> <th>Package</th> <th>Quantity</th> <th>Price</th> </tr> </thead><tbody>`;
    let receipt = "";
    data.forEach((element) => {
      receipt = `<tr><td>${element.name}</td> <td>${element.quantity}</td> <td>${element.price}</td> </tr>`;
      email += receipt;
    });
    email += `<tfoot> <tr> <td>Total: ${total}</td></tr></tfoot></table>`;
    resolve(email);
  });
};
