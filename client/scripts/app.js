var main = function (toDoObjects) {
	"use strict";
		 
	var toDos = toDoObjects.map(function(todoobject){
		return todoobject.description;
	});

	$(".tabs a span").toArray().forEach(function(element) {
		$(element).on("click", function() {
            var $element = $(element);
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();
            if ($element.parent().is(":nth-child(1)")) {
                var $content = $("<ul>");
                for (var i = toDos.length - 1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
                $("main .content").append($content);
                console.log("Click on tab 1");
            } else if ($element.parent().is(":nth-child(2)")) {
                var $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
                $("main .content").append($content);
                console.log("Click on tab 2");

            } else if ($element.parent().is(":nth-child(3)")) {
                console.log("Click on tab 3");
                var tags = [];
                toDoObjects.forEach(function (toDo) {
                    toDo.tags.forEach(function (tag) {
                        if (tags.indexOf(tag) === -1) {
                            tags.push(tag);
                        }
                    })
                });
                console.log(tags);
                var tagObjects = tags.map(function (tag) {
                    var toDosWithTag = [];
                    toDoObjects.forEach(function (toDo) {
                        if (toDo.tags.indexOf(tag) !== -1) {
                            toDosWithTag.push(toDo.description);
                        }
                    });
                    return {"name": tag, "toDos": toDosWithTag};
                });

            	tagObjects.forEach(function (tag) {
                	var $tagname = $("<h3>").text(tag.name),
                		$content = $("<ul>");
                	tag.toDos.forEach(function (description) {
                    	var $li = $("<li>").text(description);
                    	$content.append($li);
					});
                	$("main .content").append($tagname);
                	$("main .content").append($content);
            	});

			} else if($element.parent().is(":nth-child(4)")) {
				var $inputbox1 = $('<input type="text">');
				var $button = $("<button>+</button>");
				var $button_delete = $("<button>Видалити дані</button>");
				var $inputbox = $('<input type="text">');
				$("main .content").append('<h>Тегі</h>');
				$("main .content").append($inputbox1);
				$("main .content").append('<br/>');
                $("main .content").append('<h>Описання</h>');
				$("main .content").append($inputbox);
				$("main .content").append($button);
				$("main .content").append($button_delete);
				$($button).on("click", function(){
					var description = $inputbox.val();
					var tags = $inputbox1.val().split(",");
					var newToDo = {"description": description, "tags": tags};
					$.post("/todos", newToDo, function (result) {
						console.log(result);
						toDoObjects = result;
						toDos = toDoObjects.map(function (toDo) {
							return toDo.description;
                        });
					});
					$inputbox.val('');
					$inputbox1.val(''); 
				});
				$($button_delete).on("click", function (){
					$.ajax({
						"url" : "/todosdelete",
						"type": "DELETE",
					  }).done(function (response) {
						console.log(response);
						toDoObjects = [];
						toDos = [];
					  }).fail(function (err) {
						console.log(err);
					  });					  
				});
				console.log("Click on tab 4");
			}
			return false;
		});
	});
	$(".tabs a:first-child span").trigger("click");
};
$(document).ready(function(){
	$.getJSON("/todos.json", function(toDoObjects){
		main(toDoObjects);
	});
});
