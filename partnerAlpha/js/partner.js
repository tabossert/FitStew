

$(document).ready(function(){
$('.page').hide();
$('#main').show();


	$('#home').click(function() {
		if(!$(this).hasClass('active')) {
			$('.page').slideUp('slow');
			$('#sidebar>ul>li.active').removeClass('active');
			$('#main').slideDown('slow');
			$(this).addClass('active');
		}
	});

	$('#dashNav').click(function() {
		if(!$(this).hasClass('active')) {
			$('.page').slideUp('slow');
			$('#sidebar>ul>li.active').removeClass('active');
			$('#dashboard').slideDown('slow');
			$(this).addClass('active');
		}
	});

	$('#schedNav').click(function() {
		if(!$(this).hasClass('active')) {
			$('.page').slideUp('slow');
			$('#sidebar>ul>li.active').removeClass('active');
			$('#schedule').slideDown('slow');
			$(this).addClass('active');
		}
	});
	
	$('#classNav').click(function() {
		if(!$(this).hasClass('active')) {
			$('.page').slideUp('slow');
			$('#sidebar>ul>li.active').removeClass('active');
			$('#classes').slideDown('slow');
			$(this).addClass('active');
		}
	});

	$('#locNav').click(function() {
		if(!$(this).hasClass('active')) {
			$('.page').slideUp('slow');
			$('#sidebar>ul>li.active').removeClass('active');
			$('#location').slideDown('slow');
			$(this).addClass('active');
		}
	});

	$('#infoSave').click(function(e) {
		e.preventDefault();
	});
});
