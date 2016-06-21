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
	visits_count:Number, 

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
	visits:Number,

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

//**************************************************************************
//						ALL GET METHOD OF THE SERVER
//**************************************************************************

//	root page

app.get("/",function(req,res){
	res.render("index");
});

//	contact page

app.get("/contacto",function(req,res){
	res.render("contact");
});

//	notice main page

app.get("/noticias",function(req,res){
	res.render("notice/index");
});

//	notice (new notice) page 

app.get("/notice/new",function(req,res){
	res.render("notice/new");
});

//	institution main page

app.get("/institucion",function(req,res){
	res.render("institution/index");
});

//	institution (new teacher) page 

app.get("/notice/new",function(req,res){
	res.render("institution/new");
});

//	student main page

app.get("/alumnos",function(req,res){
	res.render("student/index");
});

//	student (new information) page 

app.get("/notice/new",function(req,res){
	res.render("student/new");
});

//	admin dashboard page

app.get("/superadmin",function(req,res){
	res.render("admin/index");
});


//**************************************************************************
//						ALL POST METHOD OF THE SERVER
//**************************************************************************



//===========================================================================

//	PORT TO LISTEN

app.listen(8090);