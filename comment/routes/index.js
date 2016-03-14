var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/commentDB');
var commentSchema = mongoose.Schema({Name: String, Comment: String }); 
var Comment = mongoose.model('Comment', commentSchema);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { console.log('Connected'); }); 

router.get('/comment', function(req, res, next) 
{ 
	console.log("In the GET route?");
	Comment.find(function(err,commentList) { //Calls the find() method on your database
		if (err) return console.error(err); //If there's an error, print it out
		else {
			res.json(commentList); }
	})
});

router.post('/comment', function(req, res, next) 
{ 
	console.log("POST comment route"); //[1]
	console.log(req.body);
	var newcomment = new Comment(req.body);
	console.log(newcomment);
	newcomment.save(function(err, post) { 
		if (err) return console.error(err);
		console.log(post);
		res.sendStatus(200);
	});
});

router.post('/commentsByName', function(req,res,next) {
	var findName = req.body.input;
	console.log("Find by name: " + findName);
	Comment.find({'Name': findName},function(err,commentList) {
		if (err) console.log(err);
		else {
			console.log(commentList);
			res.json(commentList);
		}
	});
});

router.get('/removeAll', function(req,res,next) {
	Comment.remove(function(err,res) {
		if (err) console.log(err)
	})
});


module.exports = router;
