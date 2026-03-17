const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("node:path");

//set the view engine and define the views location
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middleware to parse form input entry data into the request
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(3002);
