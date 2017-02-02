// GLOBAL TAB FUNCTIONALITY

var initialTab = "Account";

$(".ContentContainer." + initialTab).show();
$(".ContentContainer." + initialTab).addClass("Active");
function renderSection(section) {
  $(".ContentContainer").hide();
  var newsection = ".ContentContainer." + section;
  //console.log("Section opened: " + newsection);
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
    $(".LedgerItem").removeClass("Tapped");
    $(".Overlay").hide();
    OpenOverlay("");
    OverlayStatus = false;
  }
}

$(".OverlayClose").click(function() {
  CloseOverlay();
});
$(".Overlay").on("swipe",function(){
  CloseOverlay();
});

$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    CloseOverlay(); 
  }
});

// TRANSACTIONS 

function TransactionsListTemplate(Contents) {
  return [
    '<li class="LedgerItem bbg" data-id="' + Contents._id + '">',
      '<div class="LedgerCell op50">' + Contents.category_id + '</div>',
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
          '<div class="LedgerCell">' + Contents.category_id + '</div>',
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

$(document).on("click","#TransactionsList .LedgerItem",function(e){
  var transactionsId = $(this).data('id');
  // $(this).removeClass("Tapped");
  // console.log("removed on tap");
  $(this).addClass("Tapped");
  // console.log("added");
  // function removeTapped() {
  //   $(this).removeClass("Tapped");
  //   console.log("removed auto");
  // }
  // setTimeout(removeTapped, 300);
  console.log(transactionsId);
  $.get('/api/transactions/id/' + transactionsId, function (result) {
    var OverlayContent = TransactionsDetailTemplate(result);
    OpenOverlay(OverlayContent);
  })
  .fail(function (error) {
    alert("that id was invalid or something");
  });
});

// BUDGETS 


  function RenderBudgetsTracker(Contents) {
    var TotalBudget = _.sumBy(Contents, "max").toFixed(0);
    var TotalSpent = _.sumBy(Contents, "totalspent").toFixed(0);
    $('#YouveSpent').html("$" + TotalSpent);
    $("#BudgetTrackerText").html("$" + TotalSpent + " of $" + TotalBudget);
    var TrackerPercentage = (TotalSpent / TotalBudget * 100).toFixed(2) + "%";
    $("#BudgetHeaderProgBar").css({ width : TrackerPercentage}); 
  }

  function BudgetListTemplate(Contents) {
    //console.log(Contents);
    return [
      '<li class="LedgerItem bbg" data-id="' + Contents._id + '" id="Budgets_' + Contents._id + '">',
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
      $("#BudgetsList").append(y);
      var TotalBudget = (BudgetObject[i].max).toFixed(0);
      var TotalSpent = (BudgetObject[i].totalspent).toFixed(0);
      var TrackerPercentage = (TotalSpent / TotalBudget * 100);
        if (TrackerPercentage > 100) {
          $("#Budgets_" + BudgetObject[i]._id + " .Progress").addClass("DangerZone");
          TrackerPercentage = 100;
        }
      $("#Budgets_" + BudgetObject[i]._id + " .Progress").css({ width : TrackerPercentage.toFixed(2) + "%"}); 
    }
  }

  function getBudgets() {
    return $.get("/api/budgets");
  }

  function reduceTransactions(data) {
    return  _.reduce(data, function(acc, val, key) {
      if (acc[val.category_id]) {
        acc[val.category_id].totalspent = acc[val.category_id].totalspent + val.amount;
      }
      acc[val.category_id] = {
         name: val.category_id,
         totalspent: val.amount
      };
      return acc;
    }, {});
  }

function renderViewBudgets() {
  $("#BudgetsList").html("");
  Promise.all([getTransactions(), getBudgets()]).then(values => {
    //console.log(values);
    var merged = _.map(reduceTransactions(values[0]), function(item) {
      return _.assign(item, _.find(values[1], ['_id', item.name]));
    });
    //console.log(merged);
    RenderBudgetsList(merged);
    RenderBudgetsTracker(merged);
  });

};

renderViewBudgets();

// BUDGETS - Detail

function BudgetsDetailTemplate(Contents) {
  return [
    // '<form action="#" onsubmit="return false;" method="">',
    '<ul class="LedgerSet mt6" id="BudgetsDetailContents">',
      '<li class="LedgerItem mt6">',
        '<div class="op50 LedgerRow">',
          '<div class="LedgerCell">Name</div>',
        '</div>',
        '<div class="LedgerRow">',
          '<div class="LedgerCell">',
          '<input type="hidden" name="_id" value="' + Contents._id + '"/>',
          '<input type="text" name="name" class="Display2 mt1" id="" value="' + Contents.name + '"/>',
          '</div>',
        '</div>',
      '</li>',
      // '<li class="LedgerItem">',
      //   '<div class="op50 LedgerRow">',
      //     '<div class="LedgerCell">Limit</div>',
      //   '</div>',
      //   '<div class="LedgerRow">',
      //     '<div class="LedgerCell">',
      //     '<input type="text" name="max" class="Display2 mt1" value="$' + Contents.max + '"/>',
      //     '</div>',
      //   '</div>',
      // '</li>',
      '<li class="LedgerItem mt4">',
        '<div class="LedgerRow">',
          '<div class="LedgerCell Error">Delete this budget.</div>',
        '</div>',
      '</li>',
    '</ul>',
    '<button class="Frap Inactive" id="BudgetsDetailFrap">Save ›</button>',
    // '</form'
  ].join('\n');
}

$(document).on("click","#BudgetsList .LedgerItem",function(e){
  var budgetsId = $(this).data('id');
  console.log(budgetsId);
  $.get('/api/budgets/' + budgetsId, function (result) {
    console.log(result);
    var OverlayContent = BudgetsDetailTemplate(result[0]);
    OpenOverlay(OverlayContent);
  })
  .fail(function (error) {
    //alert("that id was invalid or something");
  });
});

$(document).on("focus","#BudgetsDetailContents input[type=text]",function(){
  $("#BudgetsDetailFrap").removeClass("Inactive");
});

function updateBudgetsName() {
  newname = $('[name="name"]').val();
  budgetsId = $('[name="_id"]').val();
  console.log(newname);
  fetch('api/budgets/edit', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        '_id': budgetsId,
        'name': newname,
      })
    })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .then(data => {
    console.log("document updated!");
    CloseOverlay();
    renderViewBudgets();
  }) 
}

$(document).on("click touchstart","#BudgetsDetailFrap",function(){
  console.log("save pressed");
  updateBudgetsName();
});

$(document).on("keypress","#BudgetsDetailContents input[type=text]",function(event) {
  if (event.keyCode == 13) {
    updateBudgetsName();
    return false;
  }
})

// SNACKBARS

function templateSnackbar(id, message, type) {
  var snackbarType = "";
  if (type == "notif") {
    snackbarType = "TypeNotif";
  }
  if (type == "conf") {
    snackbarType = "TypeConf";
  }
  if (type == "error") {
    snackbarType = "TypeError";
  }
  return [
    '<div class="Snackbar ' + snackbarType + '" id="' + id + '"><span>' + message + '</span></div>'
  ].join('\n');
}

function displaySnackbar(message, type) {
  var newSnackbarId = "Snackbar_" + Math.random().toString(36).substr(2, 10);
  $('#SnackbarCont').append(templateSnackbar(newSnackbarId, message, type)) 
  setTimeout(
    function(){ 
      $('#' + newSnackbarId).addClass("Active");
    }, 
  100);
  setTimeout(
    function(){ 
      $('#' + newSnackbarId).removeClass("Active TypeNotif TypeConf TypeError");
    }, 
  3000);
  setTimeout(
    function(){ 
      $('#' + newSnackbarId).remove();
    }, 
  3200);
}

$('.SnackbarTrigger').click(function() {
  displaySnackbar($(this).attr('data-msg'), $(this).attr('data-type'));
});
