
// MODULE REQUIERMENTS
var aws = require('aws-sdk'),
	http= require('http'),
	fs=require('fs'),
	path= require('path'),
	express=require('express'),
	bodyParser = require('body-parser'),
	multipart=require('connect-multiparty');

//NEW EXPRESS APP
var app = new express();
// MIDDLEWARE FOR MULTIPART
var  multipartMiddleware= multipart();
//SET THE JADE VIEWS
app.set('views',__dirname + '/views');
app.set('view engine','jade');
app.use(bodyParser());
app.use(express.static(path.join(__dirname,'public')));

//PATH JSON FILE
var config_path=path.join(__dirname,'../auth.json');

//CONFIG AWS
aws.config.loadFromPath(config_path);

// AWS OBJECT
var s3 = new aws.S3();

// AWS list Buckets
app.get('/buckets',function(req,res) {
	s3.listBuckets(function(err,data) {
		res.json(data);
	});
});

// AWS Upload File 
app.get('/upload',function(req,res) {
	res.render('upload');
});

app.post('/upload',multipartMiddleware,function(req,res) {
	// console.log(req);
	console.log(req.files);
	var s3request = {
		Body: fs.readFileSync(req.files.uploadedFile.path),
		Bucket:"acovar.email.upload",
		Key:req.files.uploadedFile.name
	};

	s3.putObject(s3request,function(err, data) {
		res.render('upload',{done: true});
	});

});

module.exports=app;