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
});