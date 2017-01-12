$(document).ready(function() {

	$('.ContentContainer.Home').show();
	$('.ContentContainer.Home').addClass("Active");

function renderSection(section) {
	$('.ContentContainer').hide();
	var newsection = ".ContentContainer." + section;
	console.log(newsection);
	$(newsection).show();
};

$(".AppNav li").click(function() {
  var thesection = $(this).data('section');
	renderSection(thesection);
});

});

//OVERLAYS
// when the app loads, there's no overlay by default
var OverlayStatus = false;
// this applies a css "display: none" immediately
$(".Overlay ").hide();

//OPENING OVERLAY
function OpenOverlay(Contents) {
  if (OverlayStatus == false) {
    $(".OverlayContent").html(Contents);
    $(".Overlay ").show();
    $(".Overlay ").addClass("Active");
    OverlayStatus = true;
  }
}
// CLOSING OVERLAY 
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

// SEE A TRANS DETAILS
function RenderTransactionDetail(Contents) {
  var output = '';
  output += '<div class="bbg pb3"><div class="FeatureLabel Display2 mt8 pl2 pb4">Transaction</div></div><ul class="LedgerSet"><li class="LedgerItem bbg"><div class="op50 LedgerRow"><div class="LedgerCell">Transaction ID</div></div><div class="LedgerRow"><div class="LedgerCell">' + Contents + '</div></div></li></ul>';
  output += '';
  return output;
}
// SEE A TRANS DETAILS
function RenderBudgetDetail(Contents) {
  var output = '';
  output += '<div class="bbg pb3"><div class="FeatureLabel Display2 mt8 pl2 pb4">Groceries</div><div class="ButtonSettings" onclick="location.href=’budget_edit’;">Settings</div><div class="BudgetHeaderProgBarContainer"><span class="BudgetHeaderProgBar"></span></div><div class="BudgetTotal">&#36;267 of &#36;900</div><div class="BudgetDetailSpent FontSize13 ml2 op50">Spent in Budget</div></div><div class="LedgerSet BudgetDetailLedgerSet"><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Target</div><div class="LedgerCell">&#36;5.23</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Whole Foods</div><div class="LedgerCell">&#36;89.22</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Safeway Foods</div><div class="LedgerCell">&#36;69.28</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Target</div><div class="LedgerCell">&#36;29.42</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Target</div><div class="LedgerCell">&#36;38.19</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Frank’s Corner Store</div><div class="LedgerCell">&#36;12.34</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Quality Food Centers</div><div class="LedgerCell">&#36;213.00</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Jennybell’s Mercantile</div><div class="LedgerCell">&#36;10,000.00</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Target</div><div class="LedgerCell">&#36;5.23</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Whole Foods</div><div class="LedgerCell">&#36;89.22</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Safeway Foods</div><div class="LedgerCell">&#36;69.28</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Target</div><div class="LedgerCell">&#36;29.42</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Target</div><div class="LedgerCell">&#36;38.19</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Frank’s Corner Store</div><div class="LedgerCell">&#36;12.34</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Quality Food Centers</div><div class="LedgerCell">&#36;213.00</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Jennybell’s Mercantile</div><div class="LedgerCell">&#36;10,000.00</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Target</div><div class="LedgerCell">&#36;5.23</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Whole Foods</div><div class="LedgerCell">&#36;89.22</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Safeway Foods</div><div class="LedgerCell">&#36;69.28</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Target</div><div class="LedgerCell">&#36;29.42</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Target</div><div class="LedgerCell">&#36;38.19</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Frank’s Corner Store</div><div class="LedgerCell">&#36;12.34</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Quality Food Centers</div><div class="LedgerCell">&#36;213.00</div></div></div><div class="LedgerItem bbg"><div class="LedgerRow"><div class="LedgerCell">Jennybell’s Mercantile</div><div class="LedgerCell">&#36;10,000.00</div></div></div></div><div class="CenterText FontSize13 op50 mt4 mb4">No more transactions</div></div>';
  output += '';
  return output;
}


$("#TransactionList .LedgerItem").click(function() {
  var TransactionID = $(this).data('id');
  var OverlayContent = RenderTransactionDetail(TransactionID);
  OpenOverlay(OverlayContent);
});
$("#BudgetList .LedgerItem").click(function() {
  var OverlayContent = RenderBudgetDetail();
  OpenOverlay(OverlayContent);
});




// var OverlayStatus = false;
// $(".overlay").hide();

// function RenderOverlay(Contents) {
//   $(".overlay").text(Contents);
// };

// function ToggleOverlay() {
//   if (OverlayStatus == false) {
//     RenderOverlay("TESTING123");
//     $(".overlay").show();
//     $(".overlay").addClass("active");
//     OverlayStatus = true;
//   }
//   else {
//     $(".overlay").removeClass("active");
//     setTimeout(waittohide, 200);
//     function waittohide() {
//       $(".overlay").hide();
//       RenderOverlay("");
//       OverlayStatus = false;
//     }
//   }
// };

// $(".box, .overlay").click(function() {
//   ToggleOverlay();
// });

