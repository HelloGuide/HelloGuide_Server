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