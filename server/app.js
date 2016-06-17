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
  res.sendFile(path.resolve('views/index.html')); // gets this path
});

app.get('/getZoo', function (req, res){
  console.log('in getZoo URL');
  // create array to hold animal stock
    var stock = [];
    pg.connect(connectionString, function (err, client, done){
      // get all animals in zoo and store in stock var
      var currentZoo = client.query('SELECT animal_type, quantity FROM animal_inventory;'); // get animal type and quantity from table in db
      console.log("current zoo: " + currentZoo);
      // push each row into stock array
      var rows = 0;
      currentZoo.on('row', function (row) {
        stock.push(row);
      }); // end stock push
      currentZoo.on('end', function (){
        return res.json(stock);
      });
    }); // end connect function
  }); // end app.get for getZoo

// post route (requires the urlencodedParser INJECTION between route and function)
app.post('/postNewAnimal', urlencodedParser, function(req, res){
  console.log('in postNewAnimal URL:' + req.body.animalType);
  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO animal_inventory (animal_type, quantity) VALUES ($1, $2)', [req.body.animalType, getQuantity(1,100)]); // add new row in db table for animal being added by user
  }); // end connect function
}); // end app.post for postNewAnimal
