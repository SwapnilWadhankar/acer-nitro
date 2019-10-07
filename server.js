const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();
hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", error => {
    if (error) {
      console.log("Unable to append the server.log file to the system.");
    }
  });
  next();
});
app.use((req, res, next) => {
  res.render("maintenance.hbs");
});
app.use(express.static(__dirname + "/public"));
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTittle: "Welcome to my website",

    welcomeMessage: "This is my very first website , you are very welcomed here"
  });
});
app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTittle: "This is about the website"
  });
});
app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to handle the request",
    error: "The request is being handled in innoppriate way"
  });
});

app.listen(3002, () => {
  console.log("The server is up on the port 3002");
});
