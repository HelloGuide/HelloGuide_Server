

var express = require('/Users/minkwonhong/npm-global-modules/lib/node_modules/express')
, http = require('http')
, app = express()
, server = http.createServer(app)
, main = require('./main')
, querystring = require('querystring')
, util = require('util');

app.post('/sign', function (req, res){
	if(req.method == 'POST'){
		var postData = '';
		req.on('data', function(chunk){
			postData += chunk;
		}).on('end', function(){
			var str = postData.split("&");
			var regName = str[0].split("=");
			var regID = str[1].split("=");
			var regPW = str[2].split("=");
			var ID = regID[1];
			var PW = regPW[1];
			var Name = regName[1];
			
			console.log(postData);
			main.join(Name, ID, PW);
			
			res.end('you posted:' + " " + Name + " " + ID + " " + PW);
		});
	}
	
});

app.post('/login', function (req, res){
	if(req.method == 'POST'){
		var postData = '';
		req.on('data', function(chunk){
			postData += chunk;
		}).on('end', function(){
			var str = postData.split("&");
			var regID = str[0].split("=");
			var regPW = str[1].split("=");
			var ID = regID[1];
			var PW = regPW[1];
			
			console.log(postData);
			main.login(ID, PW, res);
			
			
			res.end('you posted:' + " " + ID + " " + PW);
		});
	}
});
//app.get('/unregister', main.unregist);
//app.get('/send', main.send_push);

app.get('/', function(req, res){
	res.send('Hello/');
});

app.get('/join.html', function(req, res){
	var body = '<language="javascript">'
	body += '<form action="/sign" method="post">';
	body += 'insert Name : <input type="text" name="name" value=""/><br/>';
	body += 'insert ID : <input type="text" name="regId" value=""/><br/>';
	body += 'insert PW : <input type="password" name="regPw" value=""/><br/>';
	body += '<input type="submit" value="join"/></form>';
	res.send(body);
});

app.get('/login.html', function(req, res){
	var body = '<form action="/login" method="post">';
	body+= 'ID : <input type="text" name="memID" value=""/><br/>';
	body += 'PW : <input type="password" name="memPW" value=""/><br/>';
	body += '<input type="submit" value="Login">';
	res.send(body);
});

server.listen(4000, function(){
	console.log('Express server listening on port ' + server.address().port);
});

