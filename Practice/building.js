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

exports.getBuildingList = function(req, res){
	var query = client.query('select * from BuildingInfo', function(err, rows){
		console.log(rows);
		res.json(rows);
	});
	console.log(query);
};

exports.getBuildingDetail = function(req, res){
	var building = '';

	req.on('data', function(data){
		building = JSON.parse(data);
	});

	var query = client.query('select * from BuildingDetail where BuildingName = "'+building.Name + '"', function(err, rows){
		console.log(rows);
		res.json(rows);
	});

	console.log(query);
};
