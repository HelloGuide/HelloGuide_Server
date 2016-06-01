var mysql = require('mysql');
var ejs = require('ejs');
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

exports.saveSearchInfo = function(req, res){
	
	var stdX = parseFloat(req.body.stdX);
	var stdY = parseFloat(req.body.stdY);
	var indexX = parseFloat(req.body.posX);
	var indexY = parseFloat(req.body.posY);
	var name = req.body.name;
	var piNum = parseInt(req.body.piNum);
	
	var theta = stdY - indexY;
	var distance = Math.sin(deg2rad(stdX)) * Math.sin(deg2rad(indexX)) + Math.cos(deg2rad(stdX))*Math.cos(deg2rad(indexX)) * Math.cos(deg2rad(theta));
	distance = Math.acos(distance);
	distance = rad2deg(distance);
	distance = distance * 60 * 1.1515 * 1.609344 * 1000;
		
	var degree = Math.atan2((indexX-stdX),(indexY - stdY))*(180/Math.PI);
	if(degree < 0)
		degree += 360;
	
	console.log("degree = " + degree + " distance = " + distance);
	client.query('insert into DistanceAngle(angle, distance, name, raspiNum) values("'+parseInt(degree)+'", "'+parseInt(distance)+'", "'+name+'","'+piNum+'");',function(err, rows){
		if(err)
			console.log(err);
	});
	
	res.end();
}

function deg2rad(deg){
	return (deg * Math.PI / 180);
}

function rad2deg(rad){
	return ((rad * 180)/Math.PI);
}

exports.getSearchDatas = function(req, res){
	
	client.query('select distance, angle, name from DistanceAngle where raspiNum ="'+req.query.piNum+'";', function(err, rows){
		if(err)
			console.log(err);
		else{
			res.json(rows);
		}
	});
	
	client.query('delete from DistanceAngle where raspiNum = "'+req.query.piNum+'";', function(err){
		if(err)
			console.log(err);
	});
	
}

exports.main = function(req, res){
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress ||req.connection.socket.remoteAddress;
	console.log(ip);
    
  //  if(ip == "192.168.0.1"){
		fs.readFile("html/rasp/hello_guide.html", 'utf8',function(err, data){
			if(err){
				console.log(err);
			} // if
			else
			{
				var query = client.query('select name, lat, lng, enName from PlaceList', function(err, rows){
					if(err){
						console.log(err);
					}else{					
						res.end(ejs.render(data,{placeList : rows}));					
					}
				});
			} // else
		}); // fs
//	}
//	else
//	{
//		res.send("incorrect IP");
//	}
}// main

exports.getMainCss = function(req, res){
	fs.readFile("./css/hello_guide.css", function(err, data){
		if(err)
			console.log(err);
		else{
			res.writeHead(200, {'Content-Type':'text/css'});
			res.end(data);
		}
	});
}

exports.getAnimateCss = function(req, res){
	fs.readFile("./css/animate.min.css", function(err, data){
		if(err)
			console.log(err);
		else{
			res.writeHead(200, {'Content-Type':'text/css'});
			res.end(data);
		}
	});
}

exports.getButtonCss = function(req, res){
	fs.readFile("./css/button.css", function(err, data){
		if(err)
			console.log(err);
		else{
			res.writeHead(200, {'Content-Type':'text/css'});
			res.end(data);
		}
	});
}

exports.getBGImg = function(req, res){
	fs.readFile("./image/background.jpg", function(err, data){
		if(err)
		console.log(err);
		else{
			res.writeHead(200, {'Content-Type':'image:jpeg'});
			res.end(data);
		}
	});
}