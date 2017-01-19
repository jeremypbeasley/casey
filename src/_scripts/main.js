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
$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    CloseOverlay(); 
  }
});

// SEE A TRANS DETAILS
function RenderTransactionDetail(Contents) {
  console.log(Contents);
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
          Contents.category[0],
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
  $.get('/api/transactions/' + transactionID, function (result) {
    var OverlayContent = RenderTransactionDetail(result);
    OpenOverlay(OverlayContent);
  })
  .fail(function (error) {
    alert("that id was invalid or something");
  })
});

