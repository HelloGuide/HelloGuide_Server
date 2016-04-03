var http = require('http');
var DB = require('./DBConnection');

var server = http.createServer(function(req, res){
	res.writeHead(200, { 'Context-Type' : 'text.plain; charset=UTF-8'});
	var conn = DB.DBConnect('test_db');
	
	//DB.DBInsert(conn, 'user', '9, \'user2\', \'user2\', \'user\'');
	var datas = DB.DBSelect(conn,'*','user','');
	console.log(datas);
});

server.listen(8000);