var mysql = require('mysql');
var fs = require('fs');
var DBname = 'mainDB';
var exec = require('child_process').exec;
var client = mysql.createConnection({
	host : 'localhost',
	user:'root',
	password:'finpro',
	database:DBname
});	

client.connect(function(error, result){
	
	if(error){
		return;
	}
});
exports.getDegree = function(req, res){
	var stdX = parseFloat(req.body.stdX);
	var stdY = parseFloat(req.body.stdY);
	var indexX = parseFloat(req.body.posX);
	var indexY = parseFloat(req.body.posY);

	//var distance = rad2deg(Math.acos(Math.acos(Math.sin(stdX)*Math.sin(indexX)+Math.cos(stdX)*Math.cos(indexX)*Math.cos(stdY-indexY))))*60 * 1.1515 * 1.609344;

	var ret = ""
	var degree = Math.atan2((indexX-stdX),(indexY - stdY))*(180/Math.PI);
	if(degree < 0)
		degree += 360;
	ret += "degree = " +degree;// + ", distance : " + (distance * 1000);
	res.end(ret);

}

function rad2deg(rad){
	return ((rad * 180)/Math.PI);
}

exports.main = function(req, res){
	fs.readFile("html/hello_guide.html", function(err, data){
		console.log(data);
	});
/*	var query = client.query('select name from PlaceList', function(err, rows){
		if(err)
			console.log(err);
		else{
			console.log(rows);
			res.writeHead(200, {'Content-Type':'text/html'});
			var data = "<head><meta charset='utf-8'>";
			data += "<title>HelloGuide</title>";
			data += "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css'>";
			data += "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css'>";
			data += "<link rel='stylesheet' href='css/hello_guide.css'>";
			res.end(data);
			res.json({places:rows});
		}
	});
*/	
}

exports.getCss = function(req, res){
	fs.readFile("./css/hello_guide.css", function(err, data){
		if(err)
			console.log(err);
		else{
			res.writeHead(200, {'Content-Type':'text/css'});
			res.end(data);
		}
	});	
}
exports.getPlaceList = function(req, res){
	var query = client.query('select * from PlaceList', function(err, rows){
		if(err)
			console.log(err);
		else{
			console.log(rows);
			res.json({places:rows});
		}
	});
	//console.log(query);
};