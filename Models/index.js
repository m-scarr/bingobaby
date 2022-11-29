const mysql = require("mysql2");
const fs = require("fs");

module.exports = {
  init: (cb) => {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      multipleStatements: true,
    });
    var queryString =
      "CREATE DATABASE IF NOT EXISTS bingobaby;\nUSE bingobaby;\n";
    ["User", "CardSubject", "NativePanel", "Card", "Panel", "Review"].forEach(
      (table) => {
        queryString +=
          fs.readFileSync("Models/" + table + ".sql", "utf8") + "\n";
      }
    );
    connection.query(queryString, function (err, result) {
      if (err) {
        console.log(
          "There was an error while generating the necessary tables."
        );
        throw err;
      } else {
        console.log("Database is looking good!");
        cb(connection);
      }
    });
  },
};
