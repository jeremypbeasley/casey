var transactionsList = [
  {
    "_id": "641eb10d-3935-4ddf-b5ca-5a6dc1578f67",
    "amount": 119.6,
    "category": "Groceries"
  }, {
    "_id": "964de13e-d8a7-43d4-a060-93674c1a0b67",
    "amount": 61.49,
    "category": "Coffee Shops"
  }, {
    "_id": "28758e41-9f99-4431-b89c-43155afaf0bd",
    "amount": 35.28,
    "category": "Movies"
  }, {
    "_id": "24bd69cf-88a9-406b-9758-895252079fae",
    "amount": 105.26,
    "category": "Groceries"
  }, {
    "_id": "24bd69cf-88a95674647767455252079fae",
    "amount": 5.36,
    "category": "Groceries"
  }, {
    "_id": "24bd69c657567555252079f7547676756ae",
    "amount": 12.12,
    "category": "Groceries"
  }
]

function getTotals() {
  _.reduce(transactionsList, function(acc, val, key) {
  acc[val.category] = {
     // name: 'category',
     amount: _.sum(i, 'amount')
   };
  return acc;
  }, {});
}

getTotals();

// looking for this:

// [ 
//   {
//     name: "Groceries",
//     totalspent: 342.12
//   }, {
//     name: "Movies",
//     totalspent: 123.23
//   },
// ]


