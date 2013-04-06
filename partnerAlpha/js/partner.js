

$(document).ready(function(){
$('.page').hide();
$('#main').show();

	var uToken = 'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0';
	var dayNames = new Array("Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday");

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
			refreshClasses();
			$('#classes').slideDown('slow');
			$(this).addClass('active');
		}
	});


	function classTable() {
		$('#classTable').find('tr').click( function(){
			$('#cfName').data('cid', $(this).attr('id'));
			$('#cfName').val($(this).find('#cName').html());
			$('#cfDescription').val($(this).data('desc'));
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
	}

	function refreshClasses() {
		getCall('http://api.fitstew.com/api/getClasses/22',function(obj) {
			$.each( obj, function( key, value ) {
				var classRow = '<tr id="' + value.id + '" data-desc="' + value.desc + '"><td><input class="pull-right" id="' + value.id + '" type="checkbox" /></td><td id="cName">' + value.service + '</td><td id="cDuration">' + value.duration + '</td><td id="cPrice">' + value.price + '</td><td id="cSpots">' + value.spots + '</td><td id="cMonday"></td><td id="cTuesday"></td><td id="cWednesday"></td><td id="cThursday"></td><td id="cFriday"></td><td id="cSaturday"></td><td id="cSunday"></td>';
					classRow = classRow + '</tr>';
					$('#classHolder').append(classRow);
				classTimes(value.id,function(classRow) {
					classTable();
				});
			}); 
		});
	}

	function classTimes(cid,callback) {
		getCall('http://api.fitstew.com/api/getClassTimes/'+cid,function(cobj) {
			$.each( cobj, function( key, value ) {	
				if(value.time) {
					var timeA = "";
					timeSplit = value.time.split(',');
					for(i = 0; i < timeSplit.length; i++){
						timeA = timeA + moment(timeSplit[i],'hh:mm').format('h:mmA') + ' ';
						console.log(timeA)
					}
					$('#' + cid).children('#c' + value.weekday).html(timeA);
				} 
			});
			callback(cid);
		});
	}


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
				$('#asMondayOpen').val(obj[0].mondayOpen);
				$('#asTuesdayOpen').val(obj[0].tuesdayOpen);
				$('#asWednesdayOpen').val(obj[0].wednesdayOpen);
				$('#asThursdayOpen').val(obj[0].thursdayOpen);
				$('#asFridayOpen').val(obj[0].fridayOpen);
				$('#asSaturdayOpen').val(obj[0].saturdayOpen);
				$('#asSundayOpen').val(obj[0].sundayOpen);
				$('#asMondayClose').val(obj[0].mondayClose);
				$('#asTuesdayClose').val(obj[0].tuesdayClose);
				$('#asWednesdayClose').val(obj[0].wednesdayClose);
				$('#asThursdayClose').val(obj[0].thursdayClose);
				$('#asFridayClose').val(obj[0].fridayClose);
				$('#asSaturdayClose').val(obj[0].saturdayClose);
				$('#asSundayClose').val(obj[0].sundayClose);
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
			authGetCall('http://api.fitstew.com/api/disbursement/','D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
				$('#pLimit').val(obj[0].paylimit);
				$('#pMethod').val(obj[0].paymenttype).attr('selected',true);
				$('#dMethod').val(obj[0].type).attr('selected',true);
			});
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
		locInfo['gid'] = '22';
		locInfo['address'] = $('#locAddress').val();
		locInfo['city'] = $('#locCity').val();
		locInfo['state'] = $('#locState').val();
		locInfo['zipcode'] = $('#locZipcode').val();
		locInfo['phone'] = $('#locPhone').val();
		locInfo['email'] = $('#locEmail').val();
		locInfo['contact'] = $('#locContact').val();
		locInfo['facebook'] = $('#locFacebook').val();
		locInfo['twitter'] = $('#locTwitter').val();
		locInfo['mondayOpen'] = $('#asMondayOpen').val();
		locInfo['tuesdayOpen'] = $('#asTuesdayOpen').val();
		locInfo['wednesdayOpen'] = $('#asWednesdayOpen').val();
		locInfo['thursdayOpen'] = $('#asThursdayOpen').val();
		locInfo['fridayOpen'] = $('#asFridayOpen').val();
		locInfo['saturdayOpen'] = $('#asSaturdayOpen').val();
		locInfo['sundayOpen'] = $('#asSundayOpen').val();
		locInfo['mondayClose'] = $('#asMondayClose').val();
		locInfo['tuesdayClose'] = $('#asTuesdayClose').val();
		locInfo['wednesdayClose'] = $('#asWednesdayClose').val();
		locInfo['thursdayClose'] = $('#asThursdayClose').val();
		locInfo['fridayClose'] = $('#asFridayClose').val();
		locInfo['saturdayClose'] = $('#asSaturdayClose').val();
		locInfo['sundayClose'] = $('#asSundayClose').val();
		locInfoJSON = JSON.stringify(locInfo);

		//(new Date).getTime();
		var imgObj = {};
		imgObj['iName'] = $('#fileUp').data('imgName');
		imgObj['image'] = $('#fileUp').data('imgEnc');
		imgObjJSON = JSON.stringify(imgObj);

		authPostCall('http://api.fitstew.com/api/addGymImage/',imgObjJSON,'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
			console.log(obj);
		});

		authPostCall('http://api.fitstew.com/api/updateGymProfile/',locInfoJSON,'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
			console.log(obj);

		})
		console.log($('#fileUp').data('imgEnc'));
	});

	$('#settingsSave').click(function(e) {
		e.preventDefault();
		var disObj = {};
		disObj['paylimit'] = $('#pLimit').val();
		disObj['paymenttype'] = $('#pMethod').val();
		disObj['type'] = $('#dMethod').val();
		disObjJSON = JSON.stringify(disObj);

		authPostCall('http://api.fitstew.com/api/updateDisbursement/',disObjJSON,'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
			console.log(obj);
		});		

	});

	$('.timepicker').timepicker();

	$('.addTime').click(function(e) {
		e.preventDefault();
		$(this).parent().find('.timeRow').append('<div class="input-append bootstrap-timepicker cfTime"><input type="text" data-default-time="false" class="input-small2 timepicker"><span class="add-on"><i class="icon-time"></i></span></div>');
		$('.timepicker').timepicker();
	});

	$('#classAdd').click(function(e) {
		e.preventDefault();
		$('#cfName').removeData('cid');
		$('#cfName').val("");
		$('#cfDuration').val("");
		$('#cfPrice').val("");
		$('#cfDescription').val("");
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


	$('#classCancel').click(function(e) {
		e.preventDefault();
		$('#classSection').slideUp('slow');
	});

	$('#classSave').click(function(e) {
		e.preventDefault();
		var dayObj = {};
		var classObj = {};

		classObj['service'] = $('#cfName').val();
		classObj['description'] = $('#cfDescription').val();
		classObj['duration'] = $('#cfDuration').val();
		classObj['price'] = $('#cfPrice').val();
		classObj['spots'] = $('#cfSpots').val();


		var monTimeArr = [];
		var tueTimeArr = [];
		var wedTimeArr = [];
		var thuTimeArr = [];
		var friTimeArr = [];
		var satTimeArr = [];
		var sunTimeArr = [];

		$('#crMonday').find('.timepicker').each(function(index) {
			if($(this).val()) {
				monTimeArr.push(moment($(this).val(),'hh:mm A').format('hh:mm'));
			}
		});
		dayObj['Monday'] = monTimeArr;
		$('#crTuesday').find('.timepicker').each(function(index) {
			if($(this).val()) {
				tueTimeArr.push(moment($(this).val(),'hh:mm A').format('hh:mm'));
			}
		});
		dayObj['Tuesday'] = tueTimeArr;		
		$('#crWednesday').find('.timepicker').each(function(index) {
			if($(this).val()) {
				wedTimeArr.push(moment($(this).val(),'hh:mm A').format('hh:mm'));
			}
		});
		dayObj['Wednesday'] = wedTimeArr;
		$('#crThursday').find('.timepicker').each(function(index) {
			if($(this).val()) {
				thuTimeArr.push(moment($(this).val(),'hh:mm A').format('hh:mm'));
			}
		});
		dayObj['Thursday'] = thuTimeArr;
		$('#crFriday').find('.timepicker').each(function(index) {
			if($(this).val()) {
				friTimeArr.push(moment($(this).val(),'hh:mm A').format('hh:mm'));
			}
		});
		dayObj['Friday'] = friTimeArr;
		$('#crSaturday').find('.timepicker').each(function(index) {
			if($(this).val()) {
				satTimeArr.push(moment($(this).val(),'hh:mm A').format('hh:mm'));
			}
		});
		dayObj['Saturday'] = satTimeArr;
		$('#crSunday').find('.timepicker').each(function(index) {
			if($(this).val()) {
				sunTimeArr.push(moment($(this).val(),'hh:mm A').format('hh:mm'));
			}
		});
		dayObj['Sunday'] = sunTimeArr;

		classObj['days'] = dayObj;
		console.log(JSON.stringify(classObj));

		if($('#cfName').data('cid')) {
			classObj['classid'] = $('#cfName').data('cid');
			authPostCall('http://api.fitstew.com/api/updateClass/',JSON.stringify(classObj),'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
				console.log(obj);
				$('#classSection').slideUp('slow');
				refreshClasses();
			});			
		} else {
			authPostCall('http://api.fitstew.com/api/addClass/',JSON.stringify(classObj),'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
				console.log(obj);
				$('#classSection').slideUp('slow');
				refreshClasses();
			});
		}
	});
});
