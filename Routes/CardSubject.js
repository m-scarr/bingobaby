module.exports = function (app, controller, cb) {
  app.route("/CardSubject/create").post((req, res) => {
    cb(
      controller.CardSubject.create(req.body.creatorId, req.body.subject),
      res
    );
  });
  app.route("/CardSubject/read").get((req, res) => {
    cb(controller.CardSubject.read(req.query.id), res);
  });
  app.route("/CardSubject/readUserCardSubjects").get((req, res) => {
    cb(controller.CardSubject.readUserCardSubjects(req.query.creatorId), res);
  });
  app.route("/CardSubject").post((req, res) => {
    cb(
      controller.CardSubject.update(
        req.body.userId,
        req.body.id,
        req.body.subject
      ),
      res
    );
  });
  app.route("/CardSubject/pic").post((req, res) => {
    cb(
      controller.CardSubject.updatePic(
        req.body.userId,
        req.body.id,
        req.body.subjectPic
      ),
      res
    );
  });
  app.route("/CardSubject").delete((req, res) => {
    cb(controller.CardSubject.delete(req.query.id), res);
  });
  app.route("/CardSubject/search").get((req, res) => {
    cb(controller.CardSubject.search(req.query.subject), res);
  });
};
