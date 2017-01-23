$(document).ready(function() {
  $('.ContentContainer.Transactions').show();
  $('.ContentContainer.Transactions').addClass("Active");
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

function RenderBudgetsTracker(Contents) {
  var TotalBudget = _.sumBy(Contents, "max").toFixed(0);
  var TotalSpent = _.sumBy(Contents, "totalspent").toFixed(0);
  $("#BudgetTrackerText").html("$" + TotalSpent + " of $" + TotalBudget);
  var TrackerPercentage = (TotalSpent / TotalBudget * 100).toFixed(2) + "%";
  $("#BudgetHeaderProgBar").css({ width : TrackerPercentage}); 
}

function BudgetTemplate(Contents) {
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
};

function RenderBudgetsList(BudgetObject) {
  for (i = 0; i < BudgetObject.length; i++) {
    var y = BudgetTemplate(BudgetObject[i]);
    $("#BudgetList").append(y);
    var TotalBudget = (BudgetObject[i].max).toFixed(0);
    var TotalSpent = (BudgetObject[i].totalspent).toFixed(0);
    var TrackerPercentage = (TotalSpent / TotalBudget * 100);
      if (TrackerPercentage > 100) {
        $("#Transaction_" + BudgetObject[i]._id + " .Progress").addClass("DangerZone");
        TrackerPercentage = 100;
      }
    $("#Transaction_" + BudgetObject[i]._id + " .Progress").css({ width : TrackerPercentage.toFixed(2) + "%"}); 
  };
}

function getTransactions() {
  return $.get("/api/test/transactions/bycategory");
}
function getBudgets() {
  return $.get("/api/test/budgets");
}

Promise.all([getTransactions(), getBudgets()]).then(values => { 
  var merged = _.map(values[0], function(item) {
    return _.assign(item, _.find(values[1], ['name', item.name]));
  });
  RenderBudgetsList(merged);
  RenderBudgetsTracker(merged);
});
