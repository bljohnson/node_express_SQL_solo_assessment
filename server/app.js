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
app.get('/', function(req, res){
  console.log('in base URL');
  console.log(getQuantity(1,100)); // works
  res.sendFile( path.resolve( 'views/index.html' ) ); // gets this path
});

// post route (requires the urlencodedParser INJECTION between route and function)
app.post('/postNewAnimal', urlencodedParser, function(req, res){
  console.log('in postNewAnimal URL:' + req.body.animalType);
  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO animal_inventory (animal_type, quantity) VALUES ($1, $2)', [req.body.animalType, getQuantity(1,100)]);
  });
});
