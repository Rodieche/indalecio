$(document).ready(function(){
	$(".slider").slider();
	$(".button-collapse").sideNav({
		menuWidth: 300,
		edge: 'left',
		closeOnClick: true,
	});
	$('.parallax').parallax();
	$('.dropdown-button').dropdown({
		belowOrigin: false,
	});	
	$('.tooltipped').tooltip({
		delay: 50,
	});
	$('input#input_text, textarea#textarea1').characterCounter();
	Materialize.updateTextFields();
	$('#description').val('New Text');
	$('#description').trigger('autoresize');
//	$('.fixed-action-btn').openFAB();
//	$('.fixed-action-btn').closeFAB();
});