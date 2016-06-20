//	VARS
var express = require('express');
var app = express();

//	SET THE VIEW ENGINE --> JADE
app.set("view engine","jade");

//	SET STATIC FOLDER --> ASSETS
app.use(express.static("public"));

//	BODY OF THE APLICATION
app.get("/",function(req,res){
	res.render("index");
});


//	PORT TO LISTEN
app.listen(8090);