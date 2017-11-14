var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    ToDo = require("./models/todo.js"),
    ToDosController = require("./controllers/todos_controller.js"),
    app = express(),
    bodyParser = require("body-parser");

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/onlynotes');

http.createServer(app).listen(3000);

app.get("/todos.json", ToDosController.index);
app.post("/todos", ToDosController.create);
app.delete("/todosdelete", ToDosController.destroy);
