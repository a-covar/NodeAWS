
// MODULE REQUIERMENTS
var aws = require('aws-sdk'),
	http= require('http'),
	fs=require('fs'),
	path= require('path'),
	express=require('express');
//NEW EXPRESS APP
var app = new express();
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

module.exports=app;