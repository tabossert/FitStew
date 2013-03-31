

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
			$('#classForm').hide();
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

	$('#settingsNav').click(function() {
		if(!$(this).hasClass('active')) {
			$('.page').slideUp('slow');
			$('#sidebar>ul>li.active').removeClass('active');
			$('#settings').slideDown('slow');
			$(this).addClass('active');
		}
	});

	$('#infoSave').click(function(e) {
		e.preventDefault();
	});

	$('.timepicker').timepicker();

	$('.addTime').click(function(e) {
		e.preventDefault();
		$(this).parent().find('.timeRow').append('<div class="input-append bootstrap-timepicker cfTime"><input type="text" data-default-time="false" class="input-small2 timepicker"><span class="add-on"><i class="icon-time"></i></span></div>');
		$('.timepicker').timepicker();
	});

	$('#classAdd').click(function(e) {
		e.preventDefault();
		$('#cfName').data('cid', '');
		$('#cfName').val();
		$('#cfDuration').val();
		$('#cfPrice').val();
		$('#cfSpots').val();
		$('#crMonday').html('');
		$('#crTuesday').html('');
		$('#crWednesday').html('');
		$('#crThursday').html('');
		$('#crFriday').html('');
		$('#crSaturday').html('');
		$('#crSunday').html('');
		$('#classForm').slideDown('slow');
	})

	$('#classTable').find('tr').click( function(){
		$('#cfName').data('cid', $(this).attr('id'));
		$('#cfName').val($(this).find('#cName').html());
		$('#cfDuration').val($(this).find('#cDuration').html());
		$('#cfPrice').val($(this).find('#cPrice').html());
		$('#cfSpots').val($(this).find('#cSpots').html());
		$('#classForm').slideDown('slow');
		var monSplit = $(this).find('#cMonday').html().split(" ");
		var tueSplit = $(this).find('#cTuesday').html().split(" ");
		var wedSplit = $(this).find('#cWednesday').html().split(" ");
		var thuSplit = $(this).find('#cThursday').html().split(" ");
		var friSplit = $(this).find('#cFriday').html().split(" ");
		var satSplit = $(this).find('#cSaturday').html().split(" ");
		var sunSplit = $(this).find('#cSunday').html().split(" ");
		$('#crMonday').html('');
		$('#crTuesday').html('');
		$('#crWednesday').html('');
		$('#crThursday').html('');
		$('#crFriday').html('');
		$('#crSaturday').html('');
		$('#crSunday').html('');
		for(i = 0; i < monSplit.length; i++){
			$('#crMonday').append('<div class="input-append bootstrap-timepicker cfTime"><input type="text" data-default-time="false" value="' + monSplit[i] + '" class="input-small2 timepicker"><span class="add-on"><i class="icon-time"></i></span></div>')
		}
		for(i = 0; i < tueSplit.length; i++){
			$('#crTuesday').append('<div class="input-append bootstrap-timepicker cfTime"><input type="text" data-default-time="false" value="' + tueSplit[i] + '" class="input-small2 timepicker"><span class="add-on"><i class="icon-time"></i></span></div>')
		}
		for(i = 0; i < wedSplit.length; i++){
			$('#crWednesday').append('<div class="input-append bootstrap-timepicker cfTime"><input type="text" data-default-time="false" value="' + wedSplit[i] + '" class="input-small2 timepicker"><span class="add-on"><i class="icon-time"></i></span></div>')
		}
		for(i = 0; i < thuSplit.length; i++){
			$('#crThursday').append('<div class="input-append bootstrap-timepicker cfTime"><input type="text" data-default-time="false" value="' + thuSplit[i] + '" class="input-small2 timepicker"><span class="add-on"><i class="icon-time"></i></span></div>')
		}
		for(i = 0; i < friSplit.length; i++){
			$('#crFriday').append('<div class="input-append bootstrap-timepicker cfTime"><input type="text" data-default-time="false" value="' + friSplit[i] + '" class="input-small2 timepicker"><span class="add-on"><i class="icon-time"></i></span></div>')
		}
		for(i = 0; i < satSplit.length; i++){
			$('#crSaturday').append('<div class="input-append bootstrap-timepicker cfTime"><input type="text" data-default-time="false" value="' + satSplit[i] + '" class="input-small2 timepicker"><span class="add-on"><i class="icon-time"></i></span></div>')
		}
		for(i = 0; i < sunSplit.length; i++){
			$('#crSunday').append('<div class="input-append bootstrap-timepicker cfTime"><input type="text" data-default-time="false" value="' + sunSplit[i] + '" class="input-small2 timepicker"><span class="add-on"><i class="icon-time"></i></span></div>')
		}
		$('.timepicker').timepicker();
		/*$('#cfMonday').val($(this).find('#cMonday').html());
		$('#cfTuesday').val($(this).find('#cTuesday').html());
		$('#cfWednesday').val($(this).find('#cWednesday').html());
		$('#cfThursday').val($(this).find('#cThursday').html());
		$('#cfFriday').val($(this).find('#cFriday').html());
		$('#cfSaturday').val($(this).find('#cSaturday').html());
		$('#cfSunday').val($(this).find('#cSunday').html());)*/

		//alert('You clicked row '+ ($(this).find('input:checkbox:first').attr('id')));
	});
});
