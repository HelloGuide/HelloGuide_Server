var mysql = require('mysql');
exports.DBConnect = function(DBname){
	
	var connection = mysql.createConnection({
		host : 'localhost',
		port:3306,
		user:'root',
		password:'root',
		database:DBname
	});	
	connection.connect();
	return connection;
}


exports.DBDisconnect = function(connection){
	connection.end();
}

exports.DBInsert = function(connection, usedb, values){
	var qy = 'insert into ' + usedb + ' values(' + values +')';
	
	connection.query(qy, function(err, rows, cols){
		if(err) throw err;
	});
}

exports.DBSelect = function(connection, selectStr, fromStr, whereStr){
	var qy = 'select ' + selectStr + ' from ' + fromStr ;

	var datas = '';
	
	connection.query(qy, function(err, rows){
		if(err) throw err;
		
		this.datas += JSON.stringify(rows);
		
	
	});
	console.log(this.datas);
	
	return datas;

}
