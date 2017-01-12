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


function Transaction_DetailView(TransID) {
 //alert("Opening transaction: #" + TransID);
}

$("#TransactionList .LedgerItem").click(function() {
  var thetransaction = $(this).data('id');
  console.log(thetransaction);
  Transaction_DetailView(thetransaction);
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
function RenderTransactionDetail(thestuff) {
  console.log(thestuff);
  var output = '';
  output += '<div class="bbg pb3"><div class="FeatureLabel Display2 mt8 pl2 pb4">Transaction</div></div><ul class="LedgerSet"><li class="LedgerItem bbg"><div class="op50 LedgerRow"><div class="LedgerCell">Transaction ID</div></div><div class="LedgerRow"><div class="LedgerCell">' + thestuff + '</div></div></li></ul>';
  output += '';
  return output;
}

$("#TransactionList .LedgerItem").click(function() {
  var thetransaction = $(this).data('id');
  var decent = RenderTransactionDetail(thetransaction);
  OpenOverlay(decent);
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

