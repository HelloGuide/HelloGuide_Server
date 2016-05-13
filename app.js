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
, session = require('express-session');

var urlencodedParser = bodyParser.urlencoded({extended:false});

// for Android
// about join
app.post('/regist',urlencodedParser, join.regist);
app.post('/unregist', urlencodedParser, join.unregist);
// about session
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitailized: true
}))

// about login
app.post('/login', urlencodedParser, join.login);
app.get('/logout', join.logout);

// about placeList
app.get('/getPlaceList', join.getPlaceList);

// for raspberrypi
app.post('/rasp/getDegree',urlencodedParser, rasp.getDegree);
app.get('/rasp/main/',rasp.main);
app.get('/rasp/css/hello_guide.css',rasp.getCss);

// server start
server.listen(8000, function(){
	console.log('Express server listening on port ' + server.address().port);
});


