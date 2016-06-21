//	VARS

var express = require('express');
var app = express();
var mongoose = require('mongoose');

//	CONFIG MONGOOSE

mongoose.connect("mongodb://localhost/school_indalecio_school");

//===============	SCHEMA OF MONGO 	==================================

//	NOTICE SCHEMA

var noticeSchema = {

	title:String,
	description:String,
	imageUrl:String,
	visits_count:integer, 

};

//	TEACHERS SCHEMA

var teacherSchema = {

	name:String,
	information:String,
	pictureurl:String,

};

//	NOTICE FOR STUDENTS SCHEMA

var noticeStudent = {

	header:String,
	description:String,
	image:String,
	visits:integer,

};

//=========================================================================

//=================	VAR FROM Schemas 	===================================

var Notice = mongoose.model("Notice", noticeSchema);
var Teacher = mongoose.model("Teacher", teacherSchema);
var Student = mongoose.model("Student", noticeStudent); 

//=========================================================================

//	SET THE VIEW ENGINE --> JADE

app.set("view engine","jade");

//	SET STATIC FOLDER --> ASSETS

app.use(express.static("public"));

//========================	ROUTES =========================================

//	BODY OF THE APLICATION

app.get("/",function(req,res){
	res.render("index");
});

//	CREATE NEW NOTICE

app.get("/notice/new",function(req,res){
	res.render("notice/new");
});

//===========================================================================

//	PORT TO LISTEN

app.listen(8090);