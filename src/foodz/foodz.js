// foodz.js
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');



app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req,res) => {
  res.redirect('/foodz');
});

app.get('/foodz', (req,res) => {
  res.render('index');
});

app.get('/base.css', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/css','base.css'));
  //console.log(path.join(__dirname, '/public/css','base.css'));
});

app.post('/foodz', (req,res) => {
  console.log(req.body);

  res.redirect('/foodz');
});



app.listen(8080);
