// dicey.js
const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'hbs');

app.get('/about', (req,res) => {
  res.render('about');
});
app.get('/base.css', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/css','base.css'));
});

app.get('/dice', (req,res) => {
  res.render('index');
  //console.log(req.query);
  res.render('simple-form', {'myName':myName});
});

app.get('/', (req,res) => {
  res.redirect('/dice');
});

app.post('/', function(req, res) {
	console.log(req.body);
	// change the global
	myName = req.body.myName;
	res.redirect('/');
});


app.listen(8080);
