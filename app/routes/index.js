const noteRoutes = require('./note_routes');
const mysql = require('mysql'); // подключаем модуль mysql

var client = mysql.createConnection({
	host : '127.0.0.1',
	port : '3306',
	user : 'root',
	password : '',
	database : 'the_people'
});

module.exports = function(app, db) {
  //noteRoutes(app, db);
  
  app.post('/login', (req, res) => {
    // Здесь будем создавать заметку.
	const {email,password} = req.body;
	
	// var em = JSON.parse(email);
	// var pas = JSON.parse(password);
	
	console.log(req.body);
	
	console.log('SELECT * FROM users WHERE email = "'+email+'" AND pass = "'+password+'"');
	client.query('SELECT * FROM users WHERE email = "'+email+'" AND pass = "'+password+'"', function(error, result, fields){
		if(!result)
		{
			res.status(403).json({error:{message: 'wrong email or password'}});
		}
		console.log("Result ", result);
		res.json(result);		
	});	
	
	
	
    //res.send('Hello')
  }); 
  
  
  app.post('/add_notif', (req, res) => {
    // Здесь будем создавать заметку.
	const {id_user,slug,description,created_at,expires_at,title} = req.body;	
	//console.log(req.body);	
	client.query('INSERT INTO notifications(id_not,id_user,slug,description,created_at,expires_at,title) VALUES ("","'+id_user+'","'+slug+'","'+description+'","'+created_at+'","'+expires_at+'","'+title+'")', function(error, result, fields){
		console.log("ADD ", result);
		res.json(result);		
	});	
 }); 
 
  app.post('/add_event', (req, res) => {
    // Здесь будем создавать заметку.
	const {slug,title,type,date,created_at,expires_at,short_description,description,place,image} = req.body;	
	//console.log(req.body);	
	client.query('INSERT INTO events(id_event,slug,title,type,date,created_at,expires_at,short_description,description,place,image) VALUES ("","'+slug+'","'+title+'","'+type+'","'+date+'","'+created_at+'","'+expires_at+'","'+short_description+'","'+description+'","'+place+'","'+image+'")', function(error, result, fields){
		console.log("ADD ", result);
		res.json(result);		
	});	
 }); 
 
 app.post('/add_type_ev', (req, res) => {
    // Здесь будем создавать заметку.
	const {slug,title} = req.body;	
	console.log(req.body);	
	client.query('INSERT INTO events_type(id_type_events,slug,title) VALUES ("","'+slug+'","'+title+'")', function(error, result, fields){
		console.log("ADD ", result);
		res.json(result);		
	});	
 }); 
 
 app.post('/add_place', (req, res) => {
    // Здесь будем создавать заметку.
	const {slug,title,phone,address,location} = req.body;	
	console.log(req.body);	
	client.query('INSERT INTO place(id_place,slug,title,phone,address,location) VALUES ("","'+slug+'","'+title+'","'+phone+'","'+address+'","'+location+'")', function(error, result, fields){
		console.log("ADD ", result);
		res.json(result);		
	});	
 }); 
 
 app.post('/add_user', (req, res) => {
    // Здесь будем создавать заметку.
	const {slug,pass,title,phone,address,role,email} = req.body;	
	console.log(req.body);	
	client.query('INSERT INTO users(id_user,slug,pass,title,phone,address,role,email) VALUES ("","'+slug+'","'+pass+'","'+title+'","'+phone+'","'+address+'","'+role+'","'+email+'")', function(error, result, fields){
		console.log("ADD ", result);
		res.json(result);		
	});	
 }); 
  
  app.get('/roles', (req, res) => {
    // Здесь будем создавать заметку.
	
	client.connect();
	
	client.query('SELECT * FROM role', function(error, result, fields){
    console.log("Result ", result);
	res.json(result);
	});	
	
	client.end();  
  });
  
  app.get('/users', (req, res) => {
    // Здесь будем создавать заметку.
	
	client.connect();
	
	client.query('SELECT * FROM users', function(error, result, fields){
    console.log("Result ", result);
	res.json(result);
	});	
	
	client.end();  
  });
  
   
  app.get('/events', (req, res) => {
    // Здесь будем создавать заметку.
	
	client.connect();
	
	client.query('SELECT * FROM events', function(error, result, fields){
    console.log("Result ", result);
	res.json(result);
	});	
	
	client.end();  
  });
  
  app.get('/events', (req, res) => {
    // Здесь будем создавать заметку.
	
	client.connect();
	
	client.query('SELECT * FROM events INNER JOIN events_type ON events_type.slug = events.type', function(error, result, fields){
    console.log("Result ", result);
	res.json(result);
	});	
	
	client.end();  
  });
  
  app.get('/events/:slug', (req, res) => {
    	
	const {slug} = req.params;
	client.connect();
	
	client.query('SELECT * FROM events INNER JOIN events_type ON events_type.slug = events.type INNER JOIN place ON place.slug = events.place WHERE events.slug = "' + slug + '"', function(error, result, fields){
	
		console.log("Result ", result);
		res.json(result);
	});	
	
	client.end();  
  });
  app.get('/notifications/:slug', (req, res) => {
    	
	const {slug} = req.params;
	client.connect();
	
	client.query('SELECT * FROM notifications INNER JOIN users ON users.slug = notifications.id_user WHERE notifications.slug = "' + slug + '"', function(error, result, fields){	
		console.log("Result ", result);
		res.json(result);
	});	
	
	client.end();  
  });
  
  
};

