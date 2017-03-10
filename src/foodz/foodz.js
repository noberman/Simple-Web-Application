// foodz.js
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

class food{
  constructor(name, description, time){
    this.name = name;
    this.description = description;
    this.time = time;
  }
}

const chickenBreast = new food('Chicken Breast', 'Boil Chicken for 20 minutes', 'anytime');
const chickenThighs = new food('Chicken Thighs', 'Boil Chicken Thighs for 20 minutes', 'anytime')
const cereal = new food('Cereal', 'add Cereal and Yoghurt/Milk together', 'breakfast');
const roastBeef = new food('Roast Beef', 'Cook Roast Beef', 'dinner');
const chipotle = new food('Chipotle Bowl', 'Do not Cook', 'lunch');

let foodsArrDin = [];
let foodsArrB = [];
let foodsArrL = [];
let foodsArrA = [];

foodsArrA.push(chickenBreast);
foodsArrA.push(chickenThighs);
foodsArrA.push(cereal);
foodsArrA.push(roastBeef);

foodsArrB.push(cereal);
foodsArrDin.push(roastBeef);

foodsArrL.push(chipotle);

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req,res) => {
  res.redirect('/foodz');
});

app.get('/foodz', (req,res) => {
  if(req.query.filterCategory === undefined){
    res.render('index', {'food': foodsArrA});
  }else if(req.query.filterCategory === 'dinner'){
    res.render('index', {'food': foodsArrDin});
  }else if(req.query.filterCategory === 'lunch'){
    res.render('index', {'food': foodsArrL});
  }else if(req.query.filterCategory === 'breakfast'){
    res.render('index', {'food': foodsArrB});
  }else if(req.query.filterCategory === 'anytime'){
    res.render('index', {'food': foodsArrA});
  }
});

app.get('/base.css', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/css','base.css'));
  //console.log(path.join(__dirname, '/public/css','base.css'));
});

app.post('/foodz', (req,res) => {
  // console.log(req.body.mealName);
  // console.log(req.body.mealDescription);
  // console.log(req.body.filterCategory);
  let foodItem = new food(req.body.mealName, req.body.mealDescription, req.body.filterCategory)
  if(req.body.filterCategory === 'dinner'){
    foodsArrDin.push(foodItem);
    foodsArrA.push(foodItem);
  }else if(req.body.filterCategory === 'lunch'){
    foodsArrL.push(foodItem);
    foodsArrA.push(foodItem);
  }else if(req.body.filterCategory === 'breakfast'){
    foodsArrB.push(foodItem);
    foodsArrA.push(foodItem);
  }else if(req.body.filterCategory === 'anytime'){
    foodsArrA.push(foodItem);
  }

  res.redirect('/foodz');
});



app.listen(8080);
