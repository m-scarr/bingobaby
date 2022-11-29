const mysql = require("mysql2");
const fs = require("fs");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  multipleStatements: true,
});
var queryString = fs.readFileSync("./step3.sql", "utf8");

connection.query(queryString, function (err, result) {
  if (err) {
    throw err;
  } else {
    console.log("Database is looking good!");
  }
});
