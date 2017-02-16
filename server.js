// INITIATE

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var router = express.Router()
var db

// INCLUDES

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('_public'));
var _ = require('lodash');
var uniq = require('lodash.uniq');
var uniqBy = require('lodash.uniqby');
var omitBy = require('lodash.omitby');
var sumBy = require('lodash.sumby');
var groupBy = require('lodash.groupby');
var MongoQS = require('mongo-querystring');

// DATA

const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://admin:almighty@ds035348.mlab.com:35348/caseyappv1', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 9000, '0.0.0.0', () => {
    console.log('View the build at http://localhost:9000/')
  })
});

// API — Transactions

app.get('/api/transactions/id/:id', (req, res) => {
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

app.get('/api/transactions/category/:category', (req, res) => {
  db.collection('transactions')
    .find( { category: req.params.category } )
    .toArray((err, result) => {
      if (err) { return console.log(err); }
      if (!result.length) {
        return console.log(err);
      } else {
        //res.send(result);
        //res.send(_.map(result, 'amount'));
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

app.get('/api/transactions/totals', (req, res) => {
  db.collection('transactions')
    .find()
    .toArray((err, result) => {
      if (err) { return console.log(err); }
      // sum each transaction by category
      var mass = "";
      _.forEach(_.groupBy(result, "category"), function(result) {
        var totalobject = {
          category: result[0].category,
          totalspent: _.round(( _.sumBy(result, "amount")), 2).toFixed(2),
        };
        //console.log(totalobject);
        mass += totalobject + ",";
      });
      // convert this
      console.log(mass);
    });
});

app.get('/api/transactions/category/total/:category', (req, res) => {
  db.collection('transactions')
    .find( { category: req.params.category } )
    .toArray((err, result) => {
      if (err) {
        return console.log(err);
      }
      if (!result.length) {
        return console.log(err);
      } else {
        return(result)
      }
    });
});

app.put('/api/transactions/edit', (req, res) => {
  db.collection('transactions')
  .findOneAndUpdate({ _id: req.body._id }, {
    $set: {
      category_id: req.body.newCategoryId,
      category: req.body.newCategoryName,
    }
  }, {
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

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

app.get('/api/budgets/', (req, res) => {
  var budgetsObject;
  var transactionsObject;
  db.collection('budgets')
    .find()
    .toArray((err, result) => {
      if (err) {
        return console.log(err);
      } else {
        budgetsObject = result;
        db.collection('transactions')
          .find()
          .toArray((err, result) => {
            if (err) {
              return console.log(err);
            } else {
              transactionsObject = _.groupBy(result, 'category');
              var thing = new Array();
              _.forEach(transactionsObject, function(value, key) {
                thing.push({
                  "name": key,
                  "totalspent": _.sumBy(value, "amount"),
                })
              })
              end = _(thing).concat(budgetsObject).groupBy('name').map(_.spread(_.assign)).value();
              res.send(end);
            }
        });
      }
  });
});


app.get('/api/budgets/:_id', (req, res) => {
  db.collection('budgets')
    .find( { _id: req.params._id } )
    .toArray((err, result) => {
      if (err) { return console.log(err); }
      if (!result.length) {
        return console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.put('/api/budgets/edit', (req, res) => {
  budgetId = req.body._id;
  newname = req.body.name;
  db.collection('budgets')
  .findOneAndUpdate({_id: budgetId}, {
    $set: {
      name: req.body.name,
    }
  }, {
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

// Render the app

app.get('/*', (req, res) => {
  db.collection('transactions').find().toArray((err, result) => {
    if (err) { return console.log(err); }
    res.render('pages/index.ejs');
  });
});
