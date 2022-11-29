module.exports = function (app, controller, cb) {
  app.route("/Card/create").post((req, res) => {
    cb(controller.Card.create(req.body.userId, req.body.cardSubjectId), res);
  });
  app.route("/Card").get((req, res) => {
    cb(controller.Card.read(req.query.id), res);
  });
  app.route("/Card").delete((req, res) => {
    cb(controller.Card.delete(req.query.id), res);
  });
  app.route("/Card/list").get((req, res) => {
    cb(controller.Card.list(req.query.userId), res);
  });
};
