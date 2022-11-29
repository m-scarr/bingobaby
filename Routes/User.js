module.exports = function (app, controller, cb) {
  app.route("/User/create").post((req, res) => {
    cb(controller.User.create(req.body.username, req.body.password), res);
  });
  app.route("/User/login").get((req, res) => {
    cb(controller.User.logIn(req.query.username, req.query.password), res);
  });
  app.route("/User/analyze").get((req, res) => {
    cb(controller.User.getUserAnalysis(req.query.username), res);
  });
  app.route("/User/pic").post((req, res) => {
    cb(controller.User.updatePic(req.body.id, req.body.profilePic), res);
  });
  app.route("/User/updateusername").post((req, res) => {
    cb(controller.User.updateUsername(req.body.id, req.body.username), res);
  });
  app.route("/User/updatepassword").post((req, res) => {
    cb(
      controller.User.updatePassword(
        req.body.username,
        req.body.password,
        req.body.newPassword
      ),
      res
    );
  });
  app.route("/User").delete((req, res) => {
    cb(controller.User.delete(req.body.username, req.body.password), res);
  });
};
