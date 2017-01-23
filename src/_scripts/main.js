$(document).ready(function() {
  $('.ContentContainer.Budget').show();
  $('.ContentContainer.Budget').addClass("Active");
  function renderSection(section) {
  	$('.ContentContainer').hide();
  	var newsection = ".ContentContainer." + section;
  	console.log("Section opened: " + newsection);
  	$(newsection).show();
  };
  $(".AppNav li").click(function() {
    var thesection = $(this).data('section');
  	renderSection(thesection);
  });
});

// OVERLAYS

var OverlayStatus = false;

$(".Overlay ").hide();

function OpenOverlay(Contents) {
  if (OverlayStatus == false) {
    $(".OverlayContent").html(Contents);
    $(".Overlay ").show();
    $(".Overlay ").addClass("Active");
    OverlayStatus = true;
  }
};

function CloseOverlay() {
  $(".Overlay ").removeClass("Active");
  setTimeout(waittohide, 200);
  function waittohide() {
    $(".Overlay ").hide();
    OpenOverlay("");
    OverlayStatus = false;
  }
};

$(".OverlayClose").click(function() {
  CloseOverlay();
});

$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    CloseOverlay(); 
  }
});

// TRANSACTIONS — Details

function TransactionDetailTemplate(Contents) {
  return [
    '<div class="pb3">',
      '<div class="FeatureLabel Display2 mt8 pl2">',
      Contents.name,
      '</div>',
    '</div>',
    '<ul class="LedgerSet">',
      '<li class="LedgerItem">',
        '<div class="LedgerRow">',
          '<div class="LedgerCell">',
          'January 12, 2017 — 10:23AM',
          '</div>',
          '<div class="LedgerCell">',
          '$',
          Contents.amount,
          '</div>',
        '</div>',
      '</li>',
      '<li class="LedgerItem bbg btg mt6">',
        '<div class="LedgerRow">',
          '<div class="LedgerCell">',
          'PURCHASE SAFEWAYFOODS PADR NEW YORK NY CARD1490',
          '</div>',
        '</div>',
      '</li>',
      '<li class="LedgerItem bbg">',
        '<div class="op50 LedgerRow">',
          '<div class="LedgerCell">Budget</div>',
        '</div>',
        '<div class="LedgerRow">',
          '<div class="LedgerCell">',
          // Contents.category[0],
          '</div>',
        '</div>',
      '</li>',
      '<li class="LedgerItem">',
        '<div class="op50 LedgerRow">',
          '<div class="LedgerCell">Add a note...</div>',
        '</div>',
      '</li>',
    '</ul>'
  ].join('\n');
}

$("#TransactionList .LedgerItem").click(function() {
  var transactionID = $(this).data('id');
  $.get('/api/transactions/id/' + transactionID, function (result) {
    var OverlayContent = TransactionDetailTemplate(result);
    OpenOverlay(OverlayContent);
  })
  .fail(function (error) {
    alert("that id was invalid or something");
  })
});

// BUDGETS — List

function BudgetTemplate(Contents) {
  //console.log(Prog);
  return [
    '<li class="LedgerItem bbg" >',
      '<div class="LedgerRow">',
        '<div class="LedgerCell">',
          Contents.name,
        '</div>',
        '<div class="LedgerCell">',
          '&#36;',
          Contents.totalspent,
          ' of &#36;',
          Contents.max,
        '</div>',
      '</div>',
      '<div class="LedgerRow">',
        '<div class="LedgerCell ProgBarContainer">',
        '<span class="Progress"></span>',
        '</div>',
      '</div>',
    '</li>'
  ].join('\n');
};

// function GetBudgetStatus(Category) {
//   $.get('/api/budgets/status/' + Category, function (result) {
//     Thing = String(result.budgetstatus);
//     console.log(Thing);
//     return Thing;
//   });
// };

// function getBudgetMeta(budgetName) {
//   $.get('/api/budgets/' + budgetName, function (result) {
//     console.log(result);
//     return result;
//   });
// }

function RenderBudgetsList(BudgetObject) {
  // console.log("beg of RenderBudgetsList");
  console.log(BudgetObject);
  for (i = 0; i < BudgetObject.length; i++) {
    var y = BudgetTemplate(BudgetObject[i]);
    $("#BudgetList").append(y);
    //console.log(BudgetObject[i].name + ": " + BudgetObject[i].totalspent + " of " + BudgetObject[i].max + "spent");
  };
}

function getTransactions() {
  return $.get("/api/test/transactions");
}
function getBudgets() {
  return $.get("/api/test/budgets");
}

var promise1 = new Promise(function(resolve, reject) {
  getTransactions()
  if (getTransactions) {
    resolve(getTransactions());
  }
  else {
    reject(Error("It broke"));
  }
});

var promise2 = new Promise(function(resolve, reject) {
  getBudgets()
  if (getBudgets) {
    resolve(getBudgets());
  }
  else {
    reject(Error("It broke"));
  }
});

Promise.all([promise1, promise2]).then(values => { 
  //console.log(values); 
  var merged = _.map(values[0], function(item) {
    return _.assign(item, _.find(values[1], ['name', item.name]));
  });
  //console.log([merged]); 
  RenderBudgetsList(merged);
});



// promise1
//   .then((result) => {
//     console.log("Transactions:");
//     console.log(result);
//   });

// promise2
//   .then((result) => {
//     console.log("Budgets:");
//     console.log(result);
//   });

