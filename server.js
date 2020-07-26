const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

require('dotenv').config({path:"./config/keys.env"});

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const generalController = require("./controllers/general");
const accountController = require("./controllers/account")
const productsController = require("./controllers/products");

app.use("/", generalController);
app.use("/account", accountController);
app.use("/products", productsController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Web Server is up and running!");
});
