const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const loginAuth = require("./model/login-auth");
const clientSessions = require("client-sessions");

require('dotenv').config({path:"./config/keys.env"});

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(clientSessions({
    cookieName: "session",
    secret: "web322_a35_user",
    duration: 2 * 60 * 1000,
    activeDuration: 1000 * 60
}));

app.use(clientSessions({
    cookieName: "dataSession",
    secret: "web322_a35_dataClerk",
    duration: 2 * 60 * 1000,
    activeDuration: 1000 * 60
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})

app.use((req, res, next) => {
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
});

const generalController = require("./controllers/general");
const accountController = require("./controllers/account")
const productsController = require("./controllers/products");

app.use("/", generalController);
app.use("/account", accountController);
app.use("/products", productsController);

const PORT = process.env.PORT || 3000;

loginAuth.initialize()
.then(loginAuth.initialize)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Web Server is up and running!");
    });
}).catch((err)=>{
    console.log("unable to start server: " + err);
})


