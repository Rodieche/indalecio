var express = require('express');
var app = express();

app.get("/",function(req,res){
	res.end("Hola mundo");
});

app.listen(8090);