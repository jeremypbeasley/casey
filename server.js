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

// SETUP

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

// ROUTING

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

app.get('/*', (req, res) => {
  db.collection('transactions').find().toArray((err, result) => {
    if (err) { return console.log(err); }
    res.render('pages/index.ejs', {transactions: result})
  }); 
});

// fetch(`/transactions/${transactionId}`)
//   .then(renderModal)

// function thisisathing(Vendor) {
//   db.collection('transactions').findOne({ 'name': Vendor }, function (err, person) {
//     if (err) return handleError(err);
//     console.log("This purchase total was $" + person.amount + ".");
//     return person.amount;
//   })
// }
// thisisathing("iTunes");


// app.get('/budget_detail', (req, res) => {
//     res.render('modals/budget_detail.ejs')
// })

// app.get('/budget_edit', (req, res) => {
//     res.render('modals/budget_edit.ejs')
// })

// app.get('/account_personalinfo_details', (req, res) => {
//     res.render('modals/account_personalinfo_details.ejs')
// })

// app.get('/account_personalinfo_edit', (req, res) => {
//   res.render('modals/account_personalinfo_edit.ejs')
// }) 

// app.get('/login', (req, res) => {
//     res.render('pages/login.ejs')
// })

// app.get('/login_form', (req, res) => {
//     res.render('pages/login_form.ejs')
// })

