var mysql = require('mysql');
var DBname = 'mainDB';

var client = mysql.createConnection({
        host : 'localhost',
        user:'root',
        password:'root',
        database:DBname
});

client.connect(function(error, result){

        if(error){
                return;
        }
        console.log('connected to mysql');
});

exports.getList = function(req, res){
	var query = client.query('select * from BoardList', function(err, rows){
		console.log(rows);
		res.json(rows);
	});
	console.log(query);
};

exports.getDetail = function(req, res){
	var board = '';
	req.on('data', function(data){
		board = JSON.parse(data);
	});

	var query = client.query('select * from BoardDetail where BoardNum = ' + board.BoardNum, function(err, rows){
		console.log(rows);
		res.json(rows);
	});

	console.log(query);
};
