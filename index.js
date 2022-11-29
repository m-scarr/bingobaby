const express = require("express");
const db = require("./Models");
const routes = require("./Routes");
var bodyParser = require("body-parser");
const path = require("path");
//var env = require("dotenv").config();
const port = 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/build"));
app.route("/").get((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

db.init((connection) => {
  app.listen(port, () => {
    routes(connection, app);
    console.log("We're up and running on port " + port + "!");
  });
});
