var express = require('express')
, http = require('http')
, app = express()
, server = http.createServer(app)
, join = require('./join')
, appboard = require('./appboard')
, rasp = require('./raspberrypi')
, querystring = require('querystring')
, util = require('util')
, fs = require('fs')
, exec = require('child_process').exec
, bodyParser = require('body-parser')
, session = require('express-session')
, cookieParser = require('cookie-parser');
require('date-utils');


var mysql = require('mysql');
var fs = require('fs');
var DBname = 'mainDB';
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


var urlencodedParser = bodyParser.urlencoded({extended:false});

app.post('/regist',urlencodedParser, join.regist);
app.post('/unregist', urlencodedParser, join.unregist);

// about session
app.use(cookieParser());
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitailized: true,
	//cookie:{secure:true}
}))


// about login

app.post('/login', urlencodedParser, function(req, res){
	var id = req.body.id;
	var pw = req.body.pw;
	console.log(id+" "+ pw);
	client.query('select count(*) cnt from MembersInfo where ID ="'+id+'" and PW="'+pw+'"',function(err,rows){
		if(err) console.log(err);
		var cnt = rows[0].cnt;
		
		if(cnt == 1){
			client.query('select Name, ID, Age, Gender from MembersInfo where ID = "'+id + '"',function(err, datas){
				console.log(req.session);
				var hour = 3600000;
				req.session.cookie.expires = new Date(Date.now() + hour);
				req.session.cookie.maxAge = hour;
				req.session.user_id = id;
				req.session.cookie.user_id = id;
				res.json({message:'login success', memInfo : datas[0]});
			});
		}else{
			res.json({message:'login fail'});
		}
	});	
});

app.post('/getBoardDatas',urlencodedParser, function(req, res){
	var cate = req.body.cate;
	var keyword = req.body.keyword;
	var where ="";
	if(cate == " " && keyword == " ") where = "1";
	else if(keyword == " ") where = "cate = '" + cate +"';";
	else if(cate == " ") where = "title like '%" + keyword + "%';";
	else where = "cate = '" + cate + "' and title like '%"+ keyword +"%';";
	
	var query = client.query('select * from Board_Table where ' + where, function(err, rows){
		if(err){
			console.log(err);
		}
		else{
			if(rows.length == 0)
			{
				res.json({boardDatas:'no datas'});
			}
			else
			{
				res.json({boardDatas:rows});
			}
		}
	});
});


app.post('/saveBoardDatas', urlencodedParser, function(req, res){
	var author = req.session.user_id;
	var title = req.body.title;
	var content = req.body.content;
	var cate = req.body.cate;
	var dt = new Date();
	var d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');
	
	client.query('insert into Board_Table(author, title, content, date, cate) values ("'+author+'", "'+title+'","'+content+'","'+d+'", "'+cate+'");', function(err, rows){
		if(err){
			console.log(err);
		}else{
			res.json({message: 'insert success'});
		}
	});
});

// about placeList
app.get('/getPlaceList', function(req, res){
	
	var query = client.query('select * from PlaceList', function(err, rows){
		if(err)
			console.log(err);
		else{
			res.json({places:rows});
		}
	});
	
});

// for raspberrypi
app.post('/rasp/goSearch',urlencodedParser, rasp.saveSearchInfo);
app.get('/rasp/getDatas',rasp.getSearchDatas);
app.get('/rasp/main/',rasp.main);
app.get('/rasp/setSession', function(req, res){
	var hour = 3600000;
	req.session.cookie.expires = new Date(Date.now() + hour);
	req.session.cookie.maxAge = hour*24*365;
	req.session.raspi_num = req.query.piNum;
});
app.get('/rasp/css/hello_guide.css',rasp.getButtonCss);
app.get('/rasp/css/button.css',rasp.getMainCss);
app.get('/rasp/css/animate.css',rasp.getAnimateCss);
app.get('/background.jpg', rasp.getBGImg);

// server start
server.listen(8000, function(){
	console.log('Express server listening on port ' + server.address().port);
});


