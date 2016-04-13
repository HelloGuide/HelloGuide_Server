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

exports.regist = function (req, res){
	console.log('registering');

	var json = JSON.parse(body);
	var regId = json.regId;
	var regPw = json.regPw;
		
	console.log('insert into regId = ' + regId + ' regPw = ' + regPw);

	
	res.send("complete");
};

exports.hello = function(req, res){
        var json ='[{"NAME":"assas","ID":"asadfaee","PW":"asdvdwe"}]';
        console.log(json);
        var str = JSON.parse(json);
        console.log(str);
        res.send('Hello/');
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
	client.query('select Name from MembersInfo where MemID="'+id+'"', function(err, rows){
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
				
				client.query('insert into MembersInfo(MemID,MemPW,Name) values("'+id+'", "'+pw+'","'+name+'");',function(err, rows){
					if(err){
						console.log(err);
					console.log('error in join');
					}else{
						console.log('insert complete');
						return True;
					}
				});
			}
		}
	});

}



