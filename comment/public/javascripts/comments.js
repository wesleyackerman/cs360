$(document).ready(function(){ 
	$("#serialize").click(function(){
		$("#comments").html("");
		var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val()};
		jobj = JSON.stringify(myobj);
		$("#json").text(jobj);

		var url = "comment";
		$.ajax({
			url:url,
			type: "POST",
			data: jobj,
			contentType: "application/json; charset=utf-8",
			success: function(data,textStatus) { 
				$("#done").html(textStatus); 
			} 
		})
	});
	$("#getThem").click(function() {
		$("#done").html("");
		$("#json").html("");
		$.getJSON('comment', function(data) {
			console.log(data);
			var everything = "No comments in database";
			if (typeof data[0] != 'undefined') {
				everything = "<ul>";
				everything += "<lh>All Comments</lh>";
				for(var comment in data) {
					com = data[comment];
					everything += "<li>Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
				}	
				everything += "</ul>";
			}
			$("#comments").html(everything);
		})
	})
	$("#getByName").click(function() {
		$("#done").html("");
		$("#json").html("");
		var url = "commentsByName";
		var name = $("#QueryName").val();
		var data = {};
		data.input = name;
		jobj = JSON.stringify(data);
		$.ajax({
			url : url,
			type: "POST",
			data: jobj,
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				var everything = "No comments found";
				if (typeof data[0] != 'undefined') {
					everything = "<ul>";
					everything += "<lh>Comments by " + data[0].Name + "</lh>";
					for (var comment in data) {
						var com = data[comment];
						everything += "<li>Comment: " + com.Comment + "</li>";
					}
				}
				$("#comments").html(everything); 
			}
		})
	})
	$("#removeAll").click(function () {
		$("#done").html("");
		$("#json").html("");
		$("#comments").html("Database cleared");
		$.getJSON("removeAll", function() {
			$("#comments").html("Database cleared");
		})
	})
});
