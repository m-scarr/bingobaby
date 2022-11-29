const controller = require("../Controllers");
var cors = require("cors");

module.exports = (connection, app) => {
  app.use(cors());
  const executeQuery = (query, res) => {
    connection.query(query, (err, result) => {
      console.log(err ? err : result);
      res.json(result);
    });
  };
  require("./User")(app, controller, executeQuery);
  require("./CardSubject")(app, controller, executeQuery);
  require("./NativePanel")(app, controller, executeQuery);
  require("./Card")(app, controller, executeQuery);
  require("./Panel")(app, controller, executeQuery);
  require("./Review")(app, controller, executeQuery);
};
