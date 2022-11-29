module.exports = function (app, controller, cb) {
  app.route("/Panel").post((req, res) => {
    cb(
      controller.Panel.update(
        req.body.nativePanelId,
        req.body.cardId,
        req.body.ticked
      ),
      res
    );
  });
};
