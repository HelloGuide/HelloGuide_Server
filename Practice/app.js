

var express = require('express')
, http = require('http')
, app = express()
, server = http.createServer(app)
, join = require('./join')
, building = require('./building')
, appboard = require('./appboard')
, querystring = require('querystring')
, util = require('util');

//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.cookieParser('your secret here'));
//app.use(express.session());
//app.use(app.router);


app.post('/sign', function (req, res){
	var chunk = "";
	req.on('data', function(datas){
	//	console.log(datas);
	//	chunk = datas.toString('utf8');
	//	console.log(chunk);
	//	chunk = datas.toString('utf8');
	//	console.log(chunk);
		chunk = JSON.parse(datas);
	});
	console.log(chunk);
	
	var success = join.join(chunk.Name, chunk.ID, chunk.PW);
	
	
});

app.get('/', join.hello);

app.get('/join.html', function(req, res){
	var body = '<script type="text/javascript">';
 	body +="function to_ajax(){";
	body +="var queryString = $(\"form[name=testForm]\").serialize();"
	body +="$.ajax({";
	body += "type : 'post',url : '/sign',data : queryString,dataType : 'json',";
        body += "error: function(xhr, status, error)";
	body += "{alert(error);},";
	body += "success : function(json)";
	body += "{alert(json);},});}";
	body += "</script>";
	body += '<form name="testForm" id="testForm" method="post">';
	body += 'insert Name : <input type="text" name="name" value=""/><br/>';
	body += 'insert ID : <input type="text" name="regId" value=""/><br/>';
	body += 'insert PW : <input type="password" name="regPw" value=""/><br/>';
	body += '<a href="javascript:to_ajax();">submit</a>';
	res.send(body);
});

// for Builing Information
app.get('/building/getList', building.getBuildingList);
app.post('/building/getDetail', building.getBuildingDetail);

// for Board Information
app.get('/appboard/getList', appboard.getList);
app.post('/appboard/getDetail', appboard.getDetail);

server.listen(8000, function(){
	console.log('Express server listening on port ' + server.address().port);
});


