var ToDo = require("../models/todo.js"),
    ToDosController = {};
ToDosController.index = function (req, res) {
    ToDo.find({}, function (err, toDos) {
        res.json(toDos);
    });
};
ToDosController.create = function (req, res) {
    var newToDo = new ToDo({"description":req.body.description,
        "tags":req.body.description});
    newToDo.save(function (err, result) {
        console.log(result);
        if (err!==null) {
            console.log(err);
            res.json(err);
        } else {
            ToDo.find({}, function(err, result){
                if (err!==null) {
                    res.send("ERROR");
                }
                res.json(result);
            });
        }
    });
};
ToDosController.destroy = function (req, res) {
    ToDo.remove({}, function (err, result) {
        res.json(result);
    });
};
module.exports = ToDosController;
