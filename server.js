var express = require('express');
var path = require('path')
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs'); // not sure if needed - mle
var ObjectId = require('mongodb').ObjectID;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client/build'));

var MongoClient = require('mongodb').MongoClient

// Connection URL
var url = 'mongodb://localhost:27017/gigmapper';

//splash and sign up and login
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));

});

//login
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/login.html'));

});

app.get('/user', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/myaccount.html'));
});

// we need an xml post for the api data that is being uploaded to the database - what data is being uploaded? user and events.


//question user for actual user or users - for admin
app.get('/users', function(req,res){

  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('users');
    collection.find({}).toArray(function(err, docs) {
      res.json(docs);
      db.close();
    });
  });
})

app.post('/', function(req,res){
console.log("login post " + req.body.username + req.body.password);
MongoClient.connect(url, function(err, db) {
  var collection = db.collection('users');
  collection.insert(
    { "username": req.body.username,
      "password": req.body.password
    }
  );
  // dbUserObj=  collection.find(ObjectId("57687a2d9baaae4d4bbc8417"))
  // console.log(dbUserObj);
  res.status(200).end()
  db.close();
});



});

app.post('/users', function(req,res){
  console.log('body', req.body)
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('users');
    collection.insert(
      { "username": req.body.username,
        "password": req.body.password
      }
    )
    res.status(200).end()
    db.close();
  });
})




var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Rockstars are listening', host, port);
});
