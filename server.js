const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/highscore");

var Schema = mongoose.Schema;

var gameSchema = new Schema({
  name: String,
  score: Number
});

var Game = mongoose.model("Game" , gameSchema);

app.get('/score/:num?' , function(req,res){

  if(req.params.num == null){
    Game.find(function(err, scores){
      if(err){
        console.log(err);
      }else {
        res.send(scores);
      }
    }).sort({"score": "desc"});
  }else{
    Game.find(function(err, scores){
      if(err){
        console.log(err);
      }else {
        res.send(scores);
      }
    }).sort({"score": "desc"}).limit(num);
  }
});

app.post('/save', function(res, req){
  var newGame = new Game({
    name: req.body.name,
    score: req.body.score
  });

  newGame.save(function(err){
    if(err){
      console.log(err);
      res.send().status(500);
    }
    else{
        console.log("Saved");
        res.send().status(200);
    }
  })
});

app.listen(2998);
