var express = require('express');
var path = require('path')
var app = express();
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('client/build'));

var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/gigmapper';

//splash and sign up and login
app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/build/login.html'));

});


app.get('/user', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/build/myaccount.html'));
});

//api request for user data, inc id.
app.get('/user/:id', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('users');
    collection.find({"_id": ObjectId(req.params.id)}).toArray(function(err, docs) {
      var user = docs[0];
      res.json(user);
      console.log(user);
      db.close();
    });
  });
});

// we need an xml post for the api data that is being uploaded to the database - what data is being uploaded? user and events.


//question user for actual user or users - for admin
app.get('/users', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('users');
    collection.find({}).toArray(function(err, docs) {
      res.json(docs);
      db.close();
    });
  });
})



app.post('/users', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('users');
    var objectToInsert = req.body;
    collection.insert(objectToInsert, function(err) {
      var objectid = objectToInsert._id;
      res.redirect('/?user_id=' + objectid);
    });
    db.close();
  });
})




var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Rockstars are listening', host, port);
});
