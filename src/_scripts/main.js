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






