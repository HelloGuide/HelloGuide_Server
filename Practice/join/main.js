var mysql = require('/Users/minkwonhong/npm-global-modules/lib/node_modules/mysql');
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

exports.regist = function (req, res){
	console.log('registering');

	var json = JSON.parse(body);
	var regId = json.regId;
	var regPw = json.regPw;
		
	console.log('insert into regId = ' + regId + ' regPw = ' + regPw);

	
	res.send("complete");
};


exports.unregist = function (req, res){
	console.log('Unregistering');
	var body='';
	
	req.on('data', function(chunk){
		body+= chunk;
		
	});
	
	req.on('end', function(){
		var json = JSON.parse(body);
		var regId = json.regId;
		var senderId = json.senderId;
		
		console.log('delete from regId');
	});
	
	res.end();
};

exports.join = function (name, id, pw){
	var existMem = true;
	client.query('select no from MemberTable where id="'+id+'"', function(err, rows){
		if(err){
			console.log(err);
			console.log('error in isMember');
		}else{
			console.log(rows);
			if(rows.length != 0){
				console.log('exist member');
				existMem = true;
			}else{
				console.log('not exist member');
				existMem = false;
				
				client.query('insert into MemberTable(name, id, pw) values("'+name+'", "'+id+'","'+pw+'");',function(err, rows){
					if(err){
						console.log(err);
					console.log('error in join');
					}else{
						console.log('insert complete');
					}
				});
			}
		}
	});

}


