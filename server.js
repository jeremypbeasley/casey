// INITIATE

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var db

// DATA

const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://admin:almighty@ds035348.mlab.com:35348/caseyappv1', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 9000, '0.0.0.0', () => {
    console.log('View the build at http://localhost:9000/')
  })
})

// INCLUDES

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
var _ = require('lodash');
var uniq = require('lodash.uniq');
var uniqBy = require('lodash.uniqby');
var omitBy = require('lodash.omitby');

// API — Transactions

app.get('/api/transactions/:id', (req, res) => {
  db.collection('transactions')
    .find({ _id: req.params.id })
    .toArray((err, result) => {
      if (err) { return console.log(err); }

      if (!result.length) { 
        return console.log(err); 
      } else {
        res.send(result[0]);
      }
    });
});

app.get('/api/transactions', (req, res) => {
  db.collection('transactions')
    .find()
    .toArray((err, result) => {
      if (err) { return console.log(err); }
      res.send(result);
    });
});

// API — Budgets

app.get('/api/budgets/applied', (req, res) => {
  db.collection('transactions')
    .find()
    .toArray((err, result) => {
      if (err) { return console.log(err); }
      var newresults = _.omitBy(_.uniq(_.map(result, 'category[0]')), _.isNil);
      res.send(newresults); 
    });
});

app.get('/api/budgets/all', (req, res) => {
  db.collection('budgets')
    .find()
    .toArray((err, result) => {
      if (err) { return console.log(err); }
      res.send(result); 
    });
});

// Render the app

app.get('/*', (req, res) => {
  db.collection('transactions').find().toArray((err, result) => {
    if (err) { return console.log(err); }
    res.render('pages/index.ejs', {transactions: result})
  }); 
});
