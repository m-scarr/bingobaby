module.exports = function (app, controller, cb) {
    app.route("/NativePanel/create").post((req, res) => {
        cb(controller.NativePanel.create(req.body.cardSubjectId, req.body.panel), res)
    })
    app.route("/NativePanel").post((req, res) => {
        cb(controller.NativePanel.update(req.body.id, req.body.panel), res)
    })
}