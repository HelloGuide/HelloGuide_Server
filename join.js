var mysql = require('mysql');
var fs = require('fs');
var DBname = 'mainDB';
var exec = require('child_process').exec;
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
	console.log('connected to mysql');
});


exports.unregist = function (req, res){
	var ID = req.body.userID;
	var PW = req.body.userPW;
	
	client.query('select ID, PW from MembersInfo where ID="'+ID+'"', function(err, rows){
		if(err){
			console.log(err);
			console.log('error in isMember');
		}else{
			console.log(rows);
			if(rows.length != 0){
				console.log('exist member');
				existMem = false;
				if(rows[0] == ID && rows[1] == PW){
					client.query('delete from MembersInfo where ;',function(err, rows){
						if(err){
							console.log(err);
							console.log('error in join');
						}else{
							console.log('insert complete');
							res.send('success');
						}
					});
				}
				else{
					res.send('wrong password');
				}
			}else{
				console.log('exist member id');
				res.send('not exist');
			}
		}
	});

}

exports.regist = function (req, res){
	var ID = req.body.userID;
	var PW = req.body.userPW;
	var Name = req.body.Name;
	var Age = req.body.Age;
	var Gender = req.body.Gender;
	
	client.query('select Name from MembersInfo where ID="'+ID+'"', function(err, rows){
		if(err){
			console.log(err);
			console.log('error in isMember');
		}else{
			console.log(rows);
			if(rows.length != 0){
				console.log('exist member id');
				res.send('exist');
			}else{
				console.log('not exist member');
				existMem = false;
				
				client.query('insert into MembersInfo(ID,PW,Name,Age,Gender) values("'+ID+'", "'+PW+'","'+Name+'","'+Age+'","'+Gender+'");',function(err, rows){
					if(err){
						console.log(err);
						console.log('error in join');
					}else{
						console.log('insert complete');
						res.send('success');
					}
				});
			}
		}
	});

}

exports.login = function(req, res){
	var id = req.body.id;
	var pw = req.body.pw;
	console.log(id+" "+ pw);
	client.query('select count(*) cnt from MembersInfo where ID ="'+id+'" and PW="'+pw+'"',function(err,rows){
		if(err) console.log(err);
		console.log(rows);
		var cnt = rows[0].cnt;
		if(cnt == 1){
			console.log(cnt);
			req.session.user_id = id;
			res.send('login success');
		}else{
			console.log(cnt);
			//res.json({result:'fail'});
			res.send('login fail');
		}
	});	
}

exports.logout = function(req, res){
	req.session.destroy(function(err){
		if(err) console.log(err);
		res.send('logout success');
	})
}

exports.getPlaceList = function(req, res){
	var query = client.query('select * from PlaceList', function(err, rows){
		if(err)
			console.log(err);
		else{
			console.log(rows);
			res.json({places:rows});
		}
	});
	//console.log(query);
};