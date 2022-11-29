module.exports = function (app, controller, cb) {
  app.route("/Review/create").post((req, res) => {
    cb(
      controller.Review.create(
        req.body.reviewerId,
        req.body.cardSubjectId,
        req.body.review,
        req.body.rating
      ),
      res
    );
  });
  app.route("/Review").get((req, res) => {
    cb(controller.Review.read(req.query.id), res);
  });
};
