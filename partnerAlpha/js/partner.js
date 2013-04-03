

$(document).ready(function(){
$('.page').hide();
$('#main').show();

	var uToken = 'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0';

	/* API Communication */
	function postCall(uri,data,callback) {
		$.ajax({
		    type: "POST",
		    dataType: "json",
		    contentType: "application/json",
		    url: uri,
		    data: data,
		    success: function(response, status, xhr){
		        console.log(response);
		        callback(response);
		    }
	    });
	}

	function authPostCall(uri,data,token,callback) {
		$.ajax({
		 	beforeSend: function(xhr) {
			  xhr.setRequestHeader("ltype", "web");
			  xhr.setRequestHeader("token", uToken);
			},
		    type: "POST",
		    dataType: "json",
		    contentType: "application/json",
		    url: uri,
		    data: data,
		    success: function(response, status, xhr){
		        console.log(response);
		        callback(response);
		    }
	    });
	}
	 
	function getCall(uri,callback) {
		$.ajax({
		    type: "GET",
		    dataType: "json",
		    contentType: "application/json",
		    url: uri,
		    success: function(response, status, xhr){
		        callback(response);
		        
		    }
	    });    
	}

    function authGetCall(uri,token,callback) {
		$.ajax({
		 	beforeSend: function(xhr) {
			  xhr.setRequestHeader("ltype", "web");
			  xhr.setRequestHeader("token", uToken);
			},
		    type: "GET",
		    dataType: "json",
		    contentType: "application/json",
		    url: uri,
		    success: function(response, status, xhr){
		        console.log(response);
		        callback(response);
		    },
		    statusCode: {
				401: function(){		 
					// Redirec the to the login page.
					localStorage['uToken'] = "";
					window.location = url + "/Beta/";
				}
			}
	    });
	}

    function authDeleteCall(uri,token,callback) {
		$.ajax({
		 	beforeSend: function(xhr) {
			  xhr.setRequestHeader("ltype", "web");
			  xhr.setRequestHeader("token", uToken);
			},
		    type: "DELETE",
		    dataType: "json",
		    contentType: "application/json",
		    url: uri,
		    success: function(response, status, xhr){
		        console.log(response);
		        callback(response);
		    },
		    statusCode: {
				401: function(){		 
					// Redirec the to the login page.
					localStorage['uToken'] = "";
					window.location = url + "/Beta/";
				}
			}
	    });
	}



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
			$('#classSection').hide();
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
			getCall('http://api.fitstew.com/api/gymInfo/22',function(obj) {
				$('#thumb').attr('src',obj[0].image);
				$('#locAddress').val(obj[0].address);
				$('#locCity').val(obj[0].city);
				$('#locState').val(obj[0].state).attr('selected',true);
				$('#locZipcode').val(obj[0].zipcode);
				$('#locPhone').val(obj[0].phone);
				$('#locEmail').val(obj[0].email);
				$('#locContact').val(obj[0].contact);
				$('#locFacebook').val(obj[0].facebook);
				$('#locTwitter').val(obj[0].twitter);
			})
			$("#locForm").validate({
				rules:{
					onfocusout:true,
					required:{
						required:true
					},
					email:{
						required:true,
						email: true
					}
				},
				errorClass: "help-inline",
				errorElement: "span",
				highlight:function(element, errorClass, validClass) {
					$(element).parents('.control-group').removeClass('success');
					$(element).parents('.control-group').addClass('error');
				},
				unhighlight: function(element, errorClass, validClass) {
					$(element).parents('.control-group').removeClass('error');
					$(element).parents('.control-group').addClass('success');
				}
			});	
			$('.fileupload').fileupload();
		}
	});

	$('#settingsNav').click(function() {
		if(!$(this).hasClass('active')) {
			$('.page').slideUp('slow');
			$('#sidebar>ul>li.active').removeClass('active');
			$('#settings').slideDown('slow');
			$(this).addClass('active');
			$("#asForm").validate({
				rules:{
					onfocusout:true,
					required:{
						required:true
					}
				},
				errorClass: "help-inline",
				errorElement: "span",
				highlight:function(element, errorClass, validClass) {
					$(element).parents('.control-group').removeClass('success');
					$(element).parents('.control-group').addClass('error');
				},
				unhighlight: function(element, errorClass, validClass) {
					$(element).parents('.control-group').removeClass('error');
					$(element).parents('.control-group').addClass('success');
				}
			});
		}
	});

	$('#infoSave').click(function(e) {
		e.preventDefault();
		var locInfo = {};
		locInfo['image'] = $('#fileUp').data('imgEnc');
		locInfo['address'] = $('#locAddress').val();
		locInfo['city'] = $('#locCity').val();
		locInfo['state'] = $('#locState').val();
		locInfo['zipcode'] = $('#locZipcode').val();
		locInfo['phone'] = $('#locPhone').val();
		locInfo['email'] = $('#locEmail').val();
		locInfo['contact'] = $('#locContact').val();
		locInfo['facebook'] = $('#locFacebook').val();
		locInfo['twitter'] = $('#locTwitter').val();
		locInfoJSON = JSON.stringify(locInfo);

		authPostCall('http://api.fitstew.com/api/updateGymProfile/',locInfoJSON,'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
			console.log(obj);

		})
		console.log($('#fileUp').data('imgEnc'));
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
		$('#cfName').val("");
		$('#cfDuration').val("");
		$('#cfPrice').val("");
		$('#cfSpots').val("");
		$('#crMonday').html('');
		$('#crTuesday').html('');
		$('#crWednesday').html('');
		$('#crThursday').html('');
		$('#crFriday').html('');
		$('#crSaturday').html('');
		$('#crSunday').html('');
		$('#classSection').slideDown('slow');
		$("#classForm").validate({
			rules:{
				onfocusout:true,
				required:{
					required:true
				}
			},
			errorClass: "help-inline",
			errorElement: "span",
			highlight:function(element, errorClass, validClass) {
				$(element).parents('.control-group').removeClass('success');
				$(element).parents('.control-group').addClass('error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).parents('.control-group').removeClass('error');
				$(element).parents('.control-group').addClass('success');
			}
		});
	})

	$('#classTable').find('tr').click( function(){
		$('#cfName').data('cid', $(this).attr('id'));
		$('#cfName').val($(this).find('#cName').html());
		$('#cfDuration').val($(this).find('#cDuration').html());
		$('#cfPrice').val($(this).find('#cPrice').html());
		$('#cfSpots').val($(this).find('#cSpots').html());
		$('#classSection').slideDown('slow');
		$("#classForm").validate({
			rules:{
				onfocusout:true,
				required:{
					required:true
				}
			},
			errorClass: "help-inline",
			errorElement: "span",
			highlight:function(element, errorClass, validClass) {
				$(element).parents('.control-group').removeClass('success');
				$(element).parents('.control-group').addClass('error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).parents('.control-group').removeClass('error');
				$(element).parents('.control-group').addClass('success');
			}
		});
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
	});
});
