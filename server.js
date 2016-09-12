const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var db

// MONGO

const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://admin:almighty@ds035348.mlab.com:35348/caseyappv1', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 9000, '0.0.0.0', () => {
    console.log('View the build at http://localhost:9000/')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

// ROUTING

// app.get('/', (req, res) => {
//   db.collection('transactions').find().toArray((err, result) => {
//     res.render('pages/index.ejs');
//   })
// })

app.get('/transactions', (req, res) => {
  db.collection('transactions').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('pages/transactions.ejs', {transactions: result})
  })
})

app.get('/', (req, res) => {
  db.collection('transactions').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('pages/index.ejs', {transactions: result})
  })
})

app.get('/transaction_detail', (req, res) => {
    res.render('modals/transaction_detail.ejs')
})

app.get('/transaction_edit', (req, res) => {
    res.render('modals/transaction_edit.ejs')
})

app.get('/budget_detail', (req, res) => {
    res.render('modals/budget_detail.ejs')
})

app.get('/budget_edit', (req, res) => {
    res.render('modals/budget_edit.ejs')
})

app.get('/account_personalinfo_details', (req, res) => {
    res.render('modals/account_personalinfo_details.ejs')
})

app.get('/login', (req, res) => {
    res.render('pages/login.ejs')
})

app.get('/login_form', (req, res) => {
    res.render('pages/login_form.ejs')
})

// app.get('/bills', (req, res) => {
//     res.render('pages/bills.ejs')
// })

// app.get('/account', (req, res) => {
//     res.render('pages/account.ejs')
// })

// app.get('/login', (req, res) => {
//     res.render('pages/login.ejs')
// })

// app.get('/login_form', (req, res) => {
//     res.render('pages/login_form.ejs')
// })

// ADDING NEW ITEMS

app.use(bodyParser.urlencoded({extended: true}))

app.post('/transactions', (req, res) => {
  db.collection('transactions').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

// UPDATING ITEMS

app.put('/transactions', (req, res) => {
  db.collection('transactions')
  .findOneAndUpdate({category: 'France'}, {
    $set: {
      amount: req.body.amount,
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/transactions', (req, res) => {
  db.collection('transactions').findOneAndDelete({category: req.body.category}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('A darth vadar quote got deleted')
  })
})

// app.put('/transactions', (req, res) => {
//   db.collection('transactions')
//   .findOneAndUpdate({category: 'France'}, {
//     $set: {
//       amount: req.body.amount,
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })


// PLAID

// var plaid = require('plaid');
// var access_token = "";

// var plaidClient = new plaid.Client('576cd20566710877408d0572'
// , '945fb4239cb1de171fd6feb4e41291', plaid.environments.tartan);

// plaidClient.addAuthUser('wells', {
//   username: 'XXXXXXXXX',
//   password: 'XXXXXXXX',
// }, function(err, mfaResponse, response) {
//   if (err != null) {
//     console.error(err);
//   } else if (mfaResponse != null) {
//     plaidClient.stepAuthUser(mfaResponse.access_token, 'tomato', {},
//     function(err, mfaRes, response) {
//       console.log(response.accounts);
//     });
//   } else {
//     console.log(response.accounts);
//     var access_token = response.access_token;
//   }
// });

// plaidClient.getConnectUser(access_token, {
//   gte: '30 days ago',
// }, function(err, response) {
//   console.log(access_token)
// });





