var mysql = require('mysql');
var http = require('http');

var server = http.createServer(function(req, res){
	res.writeHead(200, { 'Context-Type' : 'text.plain; charset=UTF-8'});
	res.write('Hello World\n');

	var connection = mysql.createConnection({
		host : 'localhost',
		port:3306,
		user:'root',
		password:'root',
		database:'test_db'
	});	
	connection.connect();

	res.write('ok\n');
	var query = connection.query('insert into user values(?,?,?,?)',[3,'test2','test2','wman'],function(){});
	
	res.write(query.sql + "\n"); 
	connection.query('select * from user', function(err, rows, cols){
		if(err) throw err;
		for(var idx in rows){
				var result = rows[idx];
				var data = JSON.stringify(result);
				res.write(data+"\n");
		}
		res.end();
	});
});

server.listen(8000);

