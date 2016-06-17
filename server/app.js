var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded( { extended: false } ); // required in order to POST (app.post)
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/bethany_zoo';
var getQuantity = require('../modules/randomNumber.js');

// spin up server
app.listen(3000, 'localhost', function (req, res) {
  console.log('Now serving 3000');
});

// make public folder static
app.use(express.static('public'));

// resolved path to index.html
// base URL
// logs to Atom terminal since coming from server side
app.get('/', function (req, res) {
  console.log('in base URL');
  console.log(getQuantity(1,100)); // works
  res.sendFile( path.resolve( 'views/index.html' ) ); // gets this path
});

app.get('/getZoo', function (req, res){
  console.log('in getZoo URL');
  // this wil hold our results
    var stock = [];
    pg.connect(connectionString, function (err, client, done){
      // get all animals and store in query variable
      var currentZoo = client.query('SELECT animal_type, quantity FROM animal_inventory;');
      console.log("current zoo: " + currentZoo);
      // push each row in query into our results array
      var rows = 0;
      currentZoo.on('row', function (row) {
        stock.push(row);
      }); // end query push
      currentZoo.on('end', function (){
        return res.json(stock);
      });
    }); // end connect
  }); // end app.get

// post route (requires the urlencodedParser INJECTION between route and function)
app.post('/postNewAnimal', urlencodedParser, function(req, res){
  console.log('in postNewAnimal URL:' + req.body.animalType);
  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO animal_inventory (animal_type, quantity) VALUES ($1, $2)', [req.body.animalType, getQuantity(1,100)]);
  }); // end connect
}); // end app.post
