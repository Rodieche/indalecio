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
var nodemailer = require('nodemailer');
var sleep = require('sleep');
var methodOverride = require('method-override');
//var http = require('http');

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

//	METHOD OVERRIDE

app.use(methodOverride("_method"));

//===============	SCHEMA OF MONGO 	==================================

//	NOTICE SCHEMA

var noticeSchema = {

	title:{type:String, unique: true},
	description:String,
	imageUrl:String,
	createdAt: {type: Date, default: Date.now},
	visits_count:Number, 

};

//	TEACHERS SCHEMA

var teacherSchema = {

	name:{type:String, unique: true},
	information:String,
	grade:String,
	pictureurl:String,


};

//	NOTICE FOR STUDENTS SCHEMA

var noticeStudent = {

	header:{type:String, unique: true},
	descriptionstu:String,
	image:String,
	createdAt: {type: Date, default: Date.now},
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

//************************************************
//			ROOT PAGE
//************************************************

app.get("/",function(req,res){
	res.render("index");
});

//************************************************
//			CONTACT PAGE
//************************************************

app.get("/contacto",function(req,res){
	res.render("contact");
});

//************************************************
//			NOTICE PAGES
//************************************************

app.get("/noticias",function(req,res){
	Notice.find(function(error,documento){
		if(error){ console.log(error); }
		res.render("notice/index",{ notice: documento });
	});
});

app.get("/noticias/:id",function(req,res){
	var id_noticia = req.params.id;

	Notice.findOne({ "_id":id_noticia },function(error,noticia){
//		noticia.visits_count = noticia.visits_count + 1;
		res.render("notice/show",{ lanoticia: noticia });
	});
});


//************************************************
//			INSTITUTION PAGES
//************************************************

app.get("/institucion",function(req,res){
	Teacher.find(function(error,documento){
		if(error){ console.log(error); }
		res.render("institution/index",{ teachers: documento });
	});
});

//app.get("/institucion/:id",function(req,res){
//	var id_tea = req.params.id;
//	Teacher.findOne({ "_id":id_tea },function(error,nottea){
//		res.render("institution/show",{ teachers: nottea });
//	});
//});

//************************************************
//			STUDENT NOTICE MAIN PAGE
//************************************************

app.get("/alumnos",function(req,res){
	Student.find(function(error,documento){
		if(error){ console.log(error); }
		res.render("student/index",{ noticestudent: documento });
	});
});

app.get("/alumnos/:id",function(req,res){
	var id_notstu = req.params.id;
	Student.findOne({ "_id":id_notstu },function(error,notstu){
		res.render("student/show",{ lanoticiastu: notstu });
	});
});

//************************************************
//			MAIN ADMIN PAGE WITH FORM
//************************************************

app.get("/superadmin",function(req,res){
	res.render("admin/form");
});

//**************************************************************************
//						ALL POST METHOD OF THE SERVER
//**************************************************************************

//************************************************
//			PAGES AFTER NEW NOTCE
//************************************************

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

//************************************************
//			PAGES AFTER NEW TEACHER INFORMATION
//************************************************

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
					res.redirect("/institucion");
				});
			}
		);
	}else{
		res.render("error/nopasswd");
	};
});

//************************************************
//			PAGE AFTER NEW NOTICE FOR STUDENTS
//************************************************

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
					res.redirect("/alumnos");
				});
			}
		);
	}else{
		res.render("error/nopasswd");
	};
});

//************************************************
//			ADMIN PAGES
//************************************************

app.post("/superadmin",function(req,res){
	if(req.body.password == mypasswd){
		res.render("admin/index");
	}else{
		res.redirect("/");
	}
});

app.post("/admin/notice",function(req,res){
	Notice.find(function(error,docnot){
		if(error){ console.log(error); }
		res.render("admin/notice", { noticias: docnot });
	});
});

app.post("/admin/students",function(req,res){
	Student.find(function(error,docnstu){
		if(error){ console.log(error); }
		res.render("admin/students", { alumnos: docnstu });
	});
});

app.post("/admin/teachers",function(req,res){
	Teacher.find(function(error,doctea){
		if(error){ console.log(error); }
		res.render("admin/teachers", { teachers: doctea });
	});
});

app.post("/admin/passwd",function(req,res){
	res.render("admin/passwd");
});

//************************************************
//			CONTACT MAIL SEND
//************************************************

app.post("/contact",function(req,res){
    var correct = 0;
    var name = req.body.name;
    var from = req.body.mail;
    var subject = req.body.subject;
    var message = req.body.mail_body;
    var to = 'escuelaindaleciogomez@gmail.com';
    var transporter = nodemailer.createTransport('smtps://escuelaindaleciogomez%40gmail.com:indalecio_school_gomez@smtp.gmail.com');
    var mailOptions = {
        from: from,
        to: to, 
        subject: subject,
        text: "Mensaje de : " + name + "\n\n" + message, 
    }
    transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		res.redirect("/contacto");
	});
});

//************************************************
//			NEW PAGES
//************************************************

app.post("/alumnos/new",function(req,res){
	res.render("student/new");
});

app.post("/institucion/new",function(req,res){
	res.render("institution/new");
});

app.post("/noticias/new",function(req,res){
	res.render("notice/new");
});


//************************************************
//			EDIT PAGE
//************************************************

app.post("/noticias/edit/:id",function(req,res){
	var id_not = req.params.id;
	Notice.findOne({ "_id":id_not },function(error,not){
		res.render("notice/edit",{ noticia: not });
	});
});

app.post("/institucion/edit/:id",function(req,res){
	var id_tea = req.params.id;
	Teacher.findOne({ "_id":id_tea },function(error,tea){
		res.render("institution/edit",{ maestro: tea });
	});
});

app.put("/institucion/:id", function(req, res){
	Teacher.findById(req.params.id,function(err,maestro){
		if (err)
			res.send(err);
		maestro.name = req.body.name;
		maestro.information = req.body.information;
		maestro.grade = req.body.grade;
		maestro.save(function(err){
			if (err)
				res.send(err);
		res.redirect("/institucion");
		});
	});
});

app.delete("/institucion/:id",function(req,res){
	var id = req.params.id;
	Teacher.remove({"_id": id},function(err){
		if(err){ console.log(err); }
		res.redirect("/institucion")
	});
});

app.post("/alumnos/edit/:id",function(req,res){
	var id_notstu = req.params.id;
	Student.findOne({ "_id":id_notstu },function(error,notstu){
		res.render("student/edit",{ noticiastu: notstu });
	});
});
//===========================================================================

//	PORT TO LISTEN

app.listen(8090);