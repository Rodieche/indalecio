//	VARS

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParse = require('body-parser');
var multer = require('multer');
//app.use(multer({dest: "uploads/"}));
//var upload = multer({ dest: './uploads' });

var cloudinary = require('cloudinary');

var mypasswd = 1234;

var mysuperpasswd = "#4211868aB";

//	CONFIG MONGOOSE

mongoose.connect("mongodb://localhost/school_indalecio_school");

//	USE BODY PARSER FOR JSON

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

//	CLOUDINARY CONFIG

cloudinary.config({
	cloud_name: "www-escuelaindaleciogomez-com-ar",
	api_key: "816154774651498",
	api_secret: "308-RiCpA1bfwu4pmgHyNXiDsXM",
});

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
	grade:String,
	pictureurl:String,


};

//	NOTICE FOR STUDENTS SCHEMA

var noticeStudent = {

	header:String,
	descriptionstu:String,
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
	Notice.find(function(error,documento){
		if(error){ console.log(error); }
		res.render("notice/index",{ notice: documento });
	});
});

//	notice (new notice) page 

app.get("/noticias/new",function(req,res){
	res.render("notice/new");
});

//	institution main page

app.get("/institucion",function(req,res){
	res.render("institution/index");
});

//	institution (new teacher) page 

app.get("/institucion/new",function(req,res){
	res.render("institution/new");
});

//	student main page

app.get("/alumnos",function(req,res){
	res.render("student/index");
});

//	student (new information) page 

app.get("/alumnos/new",function(req,res){
	res.render("student/new");
});

//	admin dashboard page

app.get("/superadmin",function(req,res){
	res.render("admin/index");
});

//	nopasswd page

app.get("/errorpasswd",function(req,res){
	res.render("error/nopasswd");
});


//**************************************************************************
//						ALL POST METHOD OF THE SERVER
//**************************************************************************

//	POST NOTICIAS/NEW

app.post("/noticias", multer({ dest: './uploads/'}).single('image_notice') ,function(req,res,next){
	if(req.body.password == mypasswd){
		var notice = {
			title: req.body.title,
			description:req.body.description,
			visits_count:0,
		}

		var noticia = new Notice(notice);

		var imagen = req.file.path;

		cloudinary.uploader.upload(imagen, 
			function(result) { 
				noticia.imageUrl = result.url;
				noticia.save(function(err){
					res.redirect("/noticias");
				});
			}
		);
	}else{
		res.render("error/nopasswd");
	};
});

//	POST TEACHERS NEW

app.post("/institution", multer({ dest: './uploads/'}).single('pictureurl') ,function(req,res,next){
	if(req.body.password == mypasswd){
		var master = {
			name: req.body.name,
			information:req.body.information,
			grade:req.body.grade,
		}

		var maestra = new Teacher(master);

		var imagen = req.file.path;

		cloudinary.uploader.upload(imagen, 
			function(result) { 
				maestra.pictureurl = result.url;
				maestra.save(function(err){
					res.render("institution/index");
				});
			}
		);
	}else{
		res.render("error/nopasswd");
	};
});

//	POST STUDENT NOTICE NEW

app.post("/alumnos", multer({ dest: './uploads/'}).single('image') ,function(req,res,next){
	if(req.body.password == mypasswd){
		var studentnew = {
			header: req.body.header,
			descriptionstu:req.body.descriptionstu,
			visits:0,
		}

		var alumnonoticia = new Student(studentnew);

		var imagen = req.file.path;

		cloudinary.uploader.upload(imagen, 
			function(result) { 
				alumnonoticia.image = result.url;
				alumnonoticia.save(function(err){
					res.render("student/index");
				});
			}
		);
	}else{
		res.render("error/nopasswd");
	};
});

//===========================================================================

//	PORT TO LISTEN

app.listen(8090);