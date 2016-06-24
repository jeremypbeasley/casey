function loadTransactions() {
  // get JSON from the lastfm API endpoint
  $.getJSON('_data/transactions.json', function(result) {
    // make an empty variable for the big ol string you're making
    var output = '<div class="TransactionContainer">';
    // loop through each item
    $.each(result.recenttransactions.transaction, function(i, transaction){
      output += '<div class="TransactionSingle"><div class="TransactionCategory">' + transaction.category + '</div><div class="TransactionVendor">' + transaction.vendorname + '</div><div class="TransactionAmount">' + transaction.amount + '</div></div>';
    });
    output += '</div>'
    // put the menu items in the Crate
    document.getElementById("ViewOutput").innerHTML = output;
  });
};

loadTransactions();