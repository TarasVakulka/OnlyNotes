var express = require("express"),
    http = require("http"),
    app = express(),
    bodyParser = require("body-parser"),
    toDos = [
        {
            "description" : "Do my homework",
            "tags" : ["рутина","навчання"]
        },
        {
            "description" : "Go to shop",
            "tags" : ["рутина"]
        },
        {
            "description" : "Сделать несколько новых задач",
            "tags"  : [ "писательство", "работа" ]
        },
        {
            "description" : "Подготовиться к лекции в понедельник",
            "tags"  : [ "работа", "преподавание" ]
        },
        {
            "description" : "Ответить на электронные письма",
            "tags"  : [ "работа" ]
        },
        {
            "description" : "Вывести Грейси на прогулку в парк",
            "tags"  : [ "рутина", "питомцы" ]
        },
        {
            "description" : "Закончить писать книгу",
            "tags"  : [ "писательство", "работа" ]
        }

    ];

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.urlencoded({ extended: true }));
http.createServer(app).listen(3000);
app.get("/todos.json", function (req, res) {
    res.json(toDos);
});
app.post("/todos.json", function (req,res) {
    var newToDo = req.body;
    console.log(newToDo);
    toDos.push(newToDo);
    res.json({"message":"Ви розміщуєтесь на сервері"});
});

