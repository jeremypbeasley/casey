// GLOBAL TAB FUNCTIONALITY

$(".ContentContainer.Home").show();
$(".ContentContainer.Home").addClass("Active");
function renderSection(section) {
  $(".ContentContainer").hide();
  var newsection = ".ContentContainer." + section;
  console.log("Section opened: " + newsection);
  $(newsection).show();
}
$(".AppNav li").click(function() {
  var thesection = $(this).data("section");
  renderSection(thesection);
});

// OVERLAYS

var OverlayStatus = false;

$(".Overlay ").hide();

function OpenOverlay(Contents) {
  if (OverlayStatus === false) {
    $(".OverlayContent").html(Contents);
    $(".Overlay ").show();
    $(".Overlay ").addClass("Active");
    OverlayStatus = true;
  }
}

function CloseOverlay() {
  $(".Overlay ").removeClass("Active");
  setTimeout(waittohide, 200);
  function waittohide() {
    $(".Overlay ").hide();
    OpenOverlay("");
    OverlayStatus = false;
  }
}

$(".OverlayClose").click(function() {
  CloseOverlay();
});

$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    CloseOverlay(); 
  }
});

// TRANSACTIONS 

$(document).on("click","#TransactionsList .LedgerItem",function(e){
  var transactionsId = $(this).data('id');
  console.log(transactionsId);
  $.get('/api/transactions/id/' + transactionsId, function (result) {
    var OverlayContent = TransactionsDetailTemplate(result);
    OpenOverlay(OverlayContent);
  })
  .fail(function (error) {
    alert("that id was invalid or something");
  });
});

function TransactionsListTemplate(Contents) {
  return [
    '<li class="LedgerItem bbg" data-id="' + Contents._id + '">',
      '<div class="LedgerCell op50">' + Contents.category + '</div>',
      '<div class="LedgerRow FontSizeSm">',
        '<div class="LedgerCell">' + Contents.name + '</div>',
        '<div class="LedgerCell">$' + Contents.amount + '</div>',
      '</div>',
    '</li>',
  ].join('\n');
}

function RenderTransactionsList(Contents) {
  for (i = 0; i < Contents.length; i++) {
    var y = TransactionsListTemplate(Contents[i]);
    $("#TransactionsList").append(y);
  }
}

function getTransactions() {
  return $.get("/api/transactions");
}

getTransactions().then(values => {
  RenderTransactionsList(values);
});

function TransactionsDetailTemplate(Contents) {
  return [
    '<div class="pb3">',
      '<div class="FeatureLabel Display2 mt8 pl2">',
      Contents.name,
      '</div>',
    '</div>',
    '<ul class="LedgerSet">',
      '<li class="LedgerItem">',
        '<div class="LedgerRow">',
          '<div class="LedgerCell">' + Contents.date + ' — ' + Contents.time + '</div>',
          '<div class="LedgerCell">',
          '$' + Contents.amount + '</div>',
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
          '<div class="LedgerCell">' + Contents.category + '</div>',
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

// BUDGETS 

function RenderBudgetsTracker(Contents) {
  var TotalBudget = _.sumBy(Contents, "max").toFixed(0);
  var TotalSpent = _.sumBy(Contents, "totalspent").toFixed(0);
  $("#BudgetTrackerText").html("$" + TotalSpent + " of $" + TotalBudget);
  var TrackerPercentage = (TotalSpent / TotalBudget * 100).toFixed(2) + "%";
  $("#BudgetHeaderProgBar").css({ width : TrackerPercentage}); 
}

function BudgetListTemplate(Contents) {
  return [
    '<li class="LedgerItem bbg" id="Transaction_' + Contents._id + '">',
      '<div class="LedgerRow">',
        '<div class="LedgerCell">',
          Contents.name,
        '</div>',
        '<div class="LedgerCell">',
          '$' + Contents.totalspent.toFixed(0),
          ' of &#36;' + Contents.max.toFixed(0),
        '</div>',
      '</div>',
      '<div class="LedgerRow">',
        '<div class="LedgerCell ProgBarContainer">',
        '<span class="Progress"></span>',
        '</div>',
      '</div>',
    '</li>'
  ].join('\n');
}

function RenderBudgetsList(BudgetObject) {
  for (i = 0; i < BudgetObject.length; i++) {
    var y = BudgetListTemplate(BudgetObject[i]);
    $("#BudgetList").append(y);
    var TotalBudget = (BudgetObject[i].max).toFixed(0);
    var TotalSpent = (BudgetObject[i].totalspent).toFixed(0);
    var TrackerPercentage = (TotalSpent / TotalBudget * 100);
      if (TrackerPercentage > 100) {
        $("#Transaction_" + BudgetObject[i]._id + " .Progress").addClass("DangerZone");
        TrackerPercentage = 100;
      }
    $("#Transaction_" + BudgetObject[i]._id + " .Progress").css({ width : TrackerPercentage.toFixed(2) + "%"}); 
  }
}

function getBudgets() {
  return $.get("/api/budgets");
}

function reduceTransactions(data) {
  return  _.reduce(data, function(acc, val, key) {
    if (acc[val.category]) {
      acc[val.category].totalspent = acc[val.category].totalspent + val.amount;
    }
    acc[val.category] = {
       name: val.category,
       totalspent: val.amount
    };
    return acc;
  }, {});
}

Promise.all([getTransactions(), getBudgets()]).then(values => {
  var merged = _.map(reduceTransactions(values[0]), function(item) {
    return _.assign(item, _.find(values[1], ['name', item.name]));
  });
  RenderBudgetsList(merged);
  RenderBudgetsTracker(merged);
});


