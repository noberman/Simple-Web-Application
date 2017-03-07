// dicey.js
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false}));


//function for generating number
function diceRoll(){
  return Math.floor((Math.random()*6)+1);
}
//function for generating 5 numbers
function diceRolls(){
  let temp = '';
  for(let i =0; i<5; i++){
    temp += diceRoll()+'';
  }
  return temp;
}
//reads the file
fs.readFile('./diceware.wordlist.txt','utf8', (err,data) => {
  let numWords = 0;
  let glue = '';
  let words = {};
  let arr = data.split(/\n|\t/);
  let arrOfNums = [];
  let arrOfWords = [];
  let flag = false;
  //puts all the words in as object
  for(let i=0; i<data.length-1; i+=2){
    words[arr[i]] = arr[i+1];
  }



  app.get('/about', (req,res) => {
    res.render('about');
  });
  app.get('/base.css', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/css','base.css'));
  });
  app.use('/dice', (req,res,next) => {
    glue = req.query.glue;
    numWords = req.query.numWords;
    console.log(req.body)
    console.log(req.query.glue);
    console.log(req.query.numWords);
    next();
  });
  app.get('/dice', (req,res) => {
    if(req.query.numWords !== undefined){
      numWords = req.query.numWords;
      //put the words with corresponding numbers in 2 arrays
      for(let i=0; i<numWords;i++){
        let property = diceRolls();
        arrOfNums.push(property);
        arrOfWords.push(words[property]);
      }
      //console.log(arrOfWords);
      //console.log(arrOfNums);
      //flag to signal that there are words
      flag = true;
    }
    if(req.query.glue !== undefined){
      glue = req.query.glue;
    }else{
      glue = 'space';
    }
    let answer = '';
    for(let i =0; i<numWords; i++){
      answer += arrOfWords[i];
      if(i != numWords-1){
        if(glue === 'space'){
          answer += " ";
        }else if(glue === 'dash'){
          answer += '-';
        }else if(glue === 'star'){
          answer += '*';
        }else if (glue === 'none'){
          answer+= '';
        }else if(glue === 'comma'){
          answer += ',';
        }
      }
    }
    answerWords = '';
    answerNums = '';
    for(let i = 0; i<numWords; i++){
      answerWords += arrOfWords[i] + '    ';
      answerNums += arrOfNums[i] + '    ';
    }
    //console.log(arrOfNums);
    // res.render('index', words, glue, arrOfNums);
    res.render('index', {'numWords':numWords, 'answerWords': answerWords, 'answerNums':answerNums, 'words': words, 'glue': glue, 'arrOfNums': arrOfNums, 'flag': flag, 'arrOfWords': arrOfWords, 'answer': answer});


    // arrOfNums = [];
    // arrOfWords = [];
    flag = false;
    //res.redirect('dice');
    // console.log(numWords);
    // console.log(glue);

  });


  // app.post('/dice', (req, res) => {
  //   console.log('handling post', req.body.number);
  //   numWords = (req.body.numWords);
  //   res.redirect('dice');
  // });


  app.get('/', (req,res) => {
    res.redirect('/dice');
  });

  app.listen(8080);

});
