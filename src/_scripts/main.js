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
 alert("Opening transaction: #" + TransID);
}

$("#TransactionList .LedgerItem").click(function() {
  var thetransaction = $(this).data('id');
  console.log(thetransaction);
  Transaction_DetailView(thetransaction);
});



