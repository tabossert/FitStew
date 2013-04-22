

$(document).ready(function(){
$('.page').hide();
$('#main').show();

	var uToken = 'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0';
	var offset = moment().zone();
	var dayNames = new Array("Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday");
	var apiUrl = 'http://api.fitstew.com/'
	//var url = 'http://api.fitstew.com/'

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


	function getParticipants(cid,classObj,callback) {
		authPostCall(apiUrl + 'api/getClassParticipants/',classObj,'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
			console.log(classObj[0].classid)
			var inner = "";
			$.each( obj, function( key, value ) {
				console.log(value)
				if(value.checkin == 1) {
					checked = "checked";
				} else {
					checked = "";
				}
				inner = inner + '<tr><td><input class="pull-right checkin" type="checkbox" data-cid="' + cid + '" data-sid="' + value.sid + '" data-uid="' + value.id + '" ' + checked + ' /></td><td>' + value.first_name + ' ' + value.last_name + '</td></tr>';
			});
			callback(inner)
		});		
	}

	function loadNextClasses(elem,offset) {
		$('#' + elem).find('.row-fluid').remove();
		var nextObj = {};
		//nextObj['weekdayStart'] = moment().utc().format('dddd');
		nextObj['start'] = moment().utc().format('YYYY-MM-DD HH:mm');
		nextObj['end'] = moment().add('hours', 20).utc().format('YYYY-MM-DD HH:mm');
		//nextObj['weekedayEnd'] = moment().add('hours', 20).utc().format('dddd');
		nextObjJSON = JSON.stringify(nextObj);

		authPostCall(apiUrl + 'api/getNextClasses/',nextObjJSON,'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
			if(obj.status !== 'failed') {
				$.each( obj, function( key, value ) {
					var widg = '<div class="row-fluid"><div class="span6 offset3"><div class="widget-box"><div class="widget-title"><h5>' + value.service + ' ' + moment(value.datetime).format('h:mm A') + '</h5></div><div class="widget-content nopadding"><table class="table table-bordered table-striped table-hover data-table"><thead><tr><th>Check-In</th><th>Name</th></tr></thead><tbody><tr>';
					var classObj = {};
					classObj['classid'] = value.id;
					classObjJSON = JSON.stringify(classObj);
					console.log(classObj);
					getParticipants(value.id,classObjJSON, function(inner) {
						widg = widg + inner + '</tr></tbody></table></div></div></div></div>';
						$('#' + elem).append(widg);

						$('#' + elem + ' input[type=checkbox]').click(function(){
							checkinObj = {};
							checkinObj['userid'] = $(this).data('uid');
							checkinObj['sid'] = $(this).data('sid');
							checkinObj['cid'] = $(this).data('cid');
							checkinObjJSON = JSON.stringify(checkinObj);
							if ($(this).attr("checked") == "checked"){
								authPostCall(apiUrl + 'api/userCheckinByGym/',checkinObjJSON,'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
								});
							} else {
								authPostCall('http://api.fitstew.com/api/deleteCheckinByGym/',checkinObjJSON,'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
								});
							}
						});
					});
				});
			}
		});
	}	



	loadNextClasses('main',24);

	function loadCal(start,end,callback) {
		/*if(period == 'day') {
			var dayz = 1;
			var cDate = moment();
		} else if(period == 'week') {
			var dayz = 7;
			var cDate = moment();
		} else if(period == 'month') {
			var dayz = moment().daysInMonth();
			var cDate = moment().date(1);
		}*/
		var dayz = moment(start).daysInMonth();
		var cDate = moment(start).date(1);


		console.log(dayz);
		console.log(cDate);
		var schedObj = {};
		var eventArr = [];
		schedObj['start'] = moment(start).utc().format('YYYY-MM')
		schedObj['end'] = moment(start).utc().add('months', 1).format('YYYY-MM')
		schedObjJSON = JSON.stringify(schedObj);
		authPostCall(apiUrl + 'api/gymSchedule/',schedObjJSON,'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
			for(var i = 0;i < dayz;i++) {
				var d = moment(cDate).add('days', i).format('dddd');
				$.each( obj, function( key, value ) {
					if(value.weekday == d) {
						var timeObj = {}
						var dat = moment(cDate).add('days', i).format('YYYY-MM-DD ');
						var tim = moment(value.time,'hh:mm').subtract('minutes', offset).format('hh:mm:ss');
						timeObj['cid'] = value.id;
						timeObj['title'] = value.service;
						timeObj['start'] = dat + tim;
						timeObj['end'] = moment(dat + tim).add('minutes', value.duration).format('YYYY-MM-DD HH:mm:ss');
						timeObj['dat'] = moment(dat).format('YYYY-MM-DD');
						timeObj['time'] = value.time;
						timeObj['duration'] = value.duration;
						timeObj['spots'] = value.spots;
						timeObj['allDay'] = false;
						eventArr.push(timeObj);
					}
				});
			}
			callback(eventArr);
		});
	}

	function buildCal(period) {
	    var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		
		//loadCal(period,function(obj) {
			$('.calendar').fullCalendar({
				events: function(start, end, callback) {
					loadCal(start,end,function(obj) {
						callback(obj);
					});
				},
				header: {
					left: 'prev,next',
					center: 'title',
					right: 'month,basicWeek,basicDay'
				},
				editable: false,
				//events: obj,
			 	eventClick: function(calEvent, jsEvent, view) {
			 		$('#classMod').slideDown('slow');
			 		$('#cschDuration').val(calEvent.duration);
			 		$('#cschSpots').val(calEvent.spots);
			 		var scidObj = {}
			 		scidObj['classid'] = calEvent.cid;
			 		scidObj['datetime'] = calEvent.dat + ' ' + calEvent.time;
			 		scidObjJSON = JSON.stringify(scidObj);
			 		$('#schPartic').find('#partWidg').remove();
					authPostCall(apiUrl + 'api/getSCID/',scidObjJSON,'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
			 			if(obj.status !== 'failed') {
					 		var classObj = {};
							classObj['classid'] = obj[0].id;
							classObjJSON = JSON.stringify(classObj);
							console.log(obj[0].id);
							getParticipants(calEvent.cid,classObjJSON, function(inner) {
								var widg = '<div id="partWidg" class="span6 offset3"><div class="widget-box"><div class="widget-title"><h5>Class Participants</h5></div><div class="widget-content nopadding"><table class="table table-bordered table-striped table-hover data-table"><thead><tr><th>Check-In</th><th>Name</th></tr></thead><tbody><tr>';
								widg = widg + inner + '</tr></tbody></table></div></div></div></div>';
								$('#schPartic').append(widg);
							});
						}
					});
	 		 	}
			});
		//});
	}

	$('#dashNav').click(function() {
		if(!$(this).hasClass('active')) {
			$('.page').slideUp('slow');
			$('#sidebar>ul>li.active').removeClass('active');
			$('#dashboard').slideDown('slow');
			$(this).addClass('active');
			popuQuickStats();
			popuGraph();
		}
	});

	$('#schedNav').click(function() {
		if(!$(this).hasClass('active')) {
			$('#classMod').hide();
			$('.page').slideUp('slow');
			$('#sidebar>ul>li.active').removeClass('active');
			$('#schedule').slideDown('slow');
			$(this).addClass('active');
			$('#schPartic').find('#partWidg').remove();
			buildCal('month');
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
		$('#classTable').find('tr').click( function(e){
			if(!$(e.target).closest('input[type="checkbox"]').length > 0) {
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
				var monSplit = $(this).find('#cMonday').html().split(",");
				var tueSplit = $(this).find('#cTuesday').html().split(",");
				var wedSplit = $(this).find('#cWednesday').html().split(",");
				var thuSplit = $(this).find('#cThursday').html().split(",");
				var friSplit = $(this).find('#cFriday').html().split(",");
				var satSplit = $(this).find('#cSaturday').html().split(",");
				var sunSplit = $(this).find('#cSunday').html().split(",");
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
					console.log(sunSplit[i])
					$('#crSunday').append('<div class="input-append bootstrap-timepicker cfTime"><input type="text" data-default-time="false" value="' + sunSplit[i] + '" class="input-small2 timepicker"><span class="add-on"><i class="icon-time"></i></span></div>')
				}
				$('.timepicker').timepicker();
			}
		});
	}

	function refreshClasses() {
		getCall(apiUrl + 'api/getClasses/22',function(obj) {
			$('#classHolder').find('tr').remove();
			$.each( obj, function( key, value ) {
				if(obj.status !== 'failed') {
					var classRow = '<tr id="' + value.id + '" data-desc="' + value.desc + '"><td class="classCheck"><input class="pull-right" id="' + value.id + '" type="checkbox" /></td><td id="cName">' + value.service + '</td><td id="cDuration">' + value.duration + '</td><td id="cPrice">' + value.price + '</td><td id="cSpots">' + value.spots + '</td><td id="cMonday"></td><td id="cTuesday"></td><td id="cWednesday"></td><td id="cThursday"></td><td id="cFriday"></td><td id="cSaturday"></td><td id="cSunday"></td>';
						classRow = classRow + '</tr>';
						$('#classHolder').append(classRow);
					classTimes(value.id,function(classRow) {
						classTable();
					});
				}
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
						if(i == 0) {
							timeA = timeA + moment(timeSplit[i], 'hh:mm').subtract('minutes',offset).local().format('h:mm A');
						} else {
							timeA = timeA + ',' + moment(timeSplit[i], 'hh:mm').subtract('minutes',offset).local().format('h:mm A');
						}
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
			getCall(apiUrl + 'api/gymInfo/22',function(obj) {
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
			authGetCall(apiUrl + 'api/disbursement/','D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
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

		authPostCall(apiUrl + 'api/addGymImage/',imgObjJSON,'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
			console.log(obj);
		});

		authPostCall(apiUrl + 'api/updateGymProfile/',locInfoJSON,'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
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

		authPostCall(apiUrl + 'api/updateDisbursement/',disObjJSON,'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
			console.log(obj);
		});		

	});

	$('.timepicker').timepicker();
	$('.datepicker').datepicker();

	$('.addTime').click(function(e) {
		e.preventDefault();
		$(this).parent().find('.timeRow').append('<div class="input-append bootstrap-timepicker cfTime"><input type="text" data-default-time="false" class="input-small2 timepicker"><span class="add-on"><i class="icon-time"></i></span></div>');
		$('.timepicker').timepicker();
	});

	$('#updateStats').click(function() {
		popuGraph();
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


	$('#classDel').click(function(e) {
		e.preventDefault();
		$("#classTable input:checked").each(function() {
		    authDeleteCall(apiUrl + 'api/deleteClass/'+this.id,'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
		    	console.log(obj);
		    	refreshClasses();
		    });
		});
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
				monTimeArr.push(moment($(this).val(),'hh:mm A').add('minutes',offset).format('HH:mm'));
			}
		});
		dayObj['Monday'] = monTimeArr;
		$('#crTuesday').find('.timepicker').each(function(index) {
			if($(this).val()) {
				tueTimeArr.push(moment($(this).val(),'hh:mm A').add('minutes',offset).format('HH:mm'));
			}
		});
		dayObj['Tuesday'] = tueTimeArr;		
		$('#crWednesday').find('.timepicker').each(function(index) {
			if($(this).val()) {
				wedTimeArr.push(moment($(this).val(),'hh:mm A').add('minutes',offset).format('HH:mm'));
			}
		});
		dayObj['Wednesday'] = wedTimeArr;
		$('#crThursday').find('.timepicker').each(function(index) {
			if($(this).val()) {
				thuTimeArr.push(moment($(this).val(),'hh:mm A').add('minutes',offset).format('HH:mm'));
			}
		});
		dayObj['Thursday'] = thuTimeArr;
		$('#crFriday').find('.timepicker').each(function(index) {
			if($(this).val()) {
				friTimeArr.push(moment($(this).val(),'hh:mm A').add('minutes',offset).format('HH:mm'));
			}
		});
		dayObj['Friday'] = friTimeArr;
		$('#crSaturday').find('.timepicker').each(function(index) {
			if($(this).val()) {
				satTimeArr.push(moment($(this).val(),'hh:mm A').add('minutes',offset).format('HH:mm'));
			}
		});
		dayObj['Saturday'] = satTimeArr;
		$('#crSunday').find('.timepicker').each(function(index) {
			if($(this).val()) {
				sunTimeArr.push(moment($(this).val(),'hh:mm A').add('minutes',offset).format('HH:mm'));
			}
		});
		dayObj['Sunday'] = sunTimeArr;

		classObj['days'] = dayObj;
		console.log(JSON.stringify(classObj));

		if($('#cfName').data('cid')) {
			classObj['classid'] = $('#cfName').data('cid');
			authPostCall(apiUrl + 'api/updateClass/',JSON.stringify(classObj),'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
				console.log(obj);
				$('#classSection').slideUp('slow');
				refreshClasses();
			});			
		} else {
			authPostCall(apiUrl + 'api/addClass/',JSON.stringify(classObj),'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
				console.log(obj);
				$('#classSection').slideUp('slow');
				refreshClasses();
			});
		}
	});

	//Analytics
	function calcPerc(num1,num2,callback) {
		var perc = ((num2 - num1) / num2) * 100;
		callback(Math.round(perc));
	}

	function setGraphs() {
		$(".peity_bar_good").peity("bar", {
			colour: "#459D1C"
		});	
		$(".peity_bar_bad").peity("bar", {
			colour: "#BA1E20"
		});	
		$(".peity_bar_neutral").peity("bar", {
			colour: "#757575"
		});	
	}

	function setPopovers() {
	    // === Popovers === //    
	    var placement = 'bottom';
	    var trigger = 'hover';
	    var html = true;

	    $('.popover-visits').popover({
	       placement: placement,
	       content: '<span class="content-big">36094</span> <span class="content-small">Total Visits</span><br /><span class="content-big">220</span> <span class="content-small">Visits Today</span><br /><span class="content-big">200</span> <span class="content-small">Visits Yesterday</span><br /><span class="content-big">5677</span> <span class="content-small">Visits in This Month</span>',
	       trigger: trigger,
	       html: html   
	    });
	    $('.popover-users').popover({
	       placement: placement,
	       content: '<span class="content-big">1433</span> <span class="content-small">Total Users</span><br /><span class="content-big">0</span> <span class="content-small">Registered Today</span><br /><span class="content-big">0</span> <span class="content-small">Registered Yesterday</span><br /><span class="content-big">16</span> <span class="content-small">Registered Last Week</span>',
	       trigger: trigger,
	       html: html   
	    });
	    $('.popover-orders').popover({
	       placement: placement,
	       content: '<span class="content-big">8650</span> <span class="content-small">Total Orders</span><br /><span class="content-big">29</span> <span class="content-small">Pending Orders</span><br /><span class="content-big">32</span> <span class="content-small">Orders Today</span><br /><span class="content-big">64</span> <span class="content-small">Orders Yesterday</span>',
	       trigger: trigger,
	       html: html   
	    });
	    $('.popover-tickets').popover({
	       placement: placement,
	       content: '<span class="content-big">2968</span> <span class="content-small">All Tickets</span><br /><span class="content-big">48</span> <span class="content-small">New Tickets</span><br /><span class="content-big">495</span> <span class="content-small">Solved</span>',
	       trigger: trigger,
	       html: html   
	    });
	}

	function popuQuickStats() {
		// === Popovers === //    
	    var placement = 'bottom';
	    var trigger = 'hover';
	    var html = true;

	    // === Stat Objects === //
		var queryObject = {};
		queryObject['start'] = moment().subtract('days', 14).utc().format('YYYY-MM-DD');
		queryObject['end'] = moment().utc().format('YYYY-MM-DD');
		authPostCall(apiUrl + 'api/barbell/pspwp/',JSON.stringify(queryObject),'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {
			var prevRevTot = 0;
			var curRevTot = 0;
			var prevVisTot = 0;
			var curVisTot = 0;
			var prevVieTot = 0;
			var curVieTot = 0;
			var i = 0;
			var dataRevArr = [];
			var dataVisArr = [];
			var dataVieArr = [];
			$.each( obj, function( key, value ) {
				if(i < 1) {
					prevRevTot = prevRevTot + value.reservations;
					prevVisTot = prevVisTot + value.visits;
					prevVieTot = prevVieTot + value.views;
					i++;
				} else {
					curRevTot = curRevTot + value.reservations;
					curVisTot = curVisTot + value.visits;
					curVieTot = curVieTot + value.views;
					dataRevArr.push(value.reservations);
					dataVisArr.push(value.visits);
					dataVieArr.push(value.views);
					i++;
				}
			});

			$('#reservData').html(dataRevArr.toString());
			$('#visitsData').html(dataVisArr.toString());
			$('#viewsData').html(dataVieArr.toString());

			calcPerc(prevRevTot,curRevTot,function(result) {
				if(result > 0) {
					$('#reservData').addClass('peity_bar_good');
					$('#reservAvg').addClass('pos');
					$('#reservAvg').html('+' + result + '%');
				} else {
					$('#reservData').addClass('peity_bar_bad');
					$('#reservAvg').addClass('neg');
					$('#reservAvg').html(result + '%');
				}
				$('#reservTot').html(curRevTot);
			})

			calcPerc(prevVisTot,curVisTot,function(result) {
				if(result > 0) {
					$('#visitsData').addClass('peity_bar_good');
					$('#visitsAvg').addClass('pos');
					$('#visitsAvg').html('+' + result + '%');
				} else {
					$('#visitsData').addClass('peity_bar_bad');
					$('#visitsAvg').addClass('neg');
					$('#visitsAvg').html(result + '%');
				}
				$('#visitsTot').html(curVisTot);
			})

			calcPerc(prevVieTot,curVieTot,function(result) {
				if(result > 0) {
					$('#viewsData').addClass('peity_bar_good');
					$('#viewsAvg').addClass('pos');
					$('#viewsAvg').html('+' + result + '%');
				} else {
					$('#viewsData').addClass('peity_bar_bad');
					$('#viewsAvg').addClass('neg');
					$('#viewsAvg').html(result + '%');
				}
				$('#viewsTot').html(curVieTot);
			})
			setGraphs();
			/*calcPerc(prevRevTot,curRevTot,function(result) {
				if(result > 1) {
					$('#reservDiv').addClass('peity_bar_good');
					setGraphs();
					$('#reservAvg').html('+' + result);
				} else {
					$('#reservDiv').addClass('peity_bar_bad');
					setGraphs();
					$('#reservAvg').html('-' + result);
				}

			})*/

		});
	}


	function popuGraph() {

		var q = 'psptp';
		var ty = 'day';
		var timeF = "%m/%d/%y"
		var queryObject = {};
		if($('#statStart').val().length == 0) {
			queryObject['start'] = moment().subtract('days', 8).utc().format('YYYY-MM-DD');
			queryObject['end'] = moment().utc().format('YYYY-MM-DD');
		} else {
			if($('#statStart').val() == $('#statEnd').val()) {
				q = 'psph';
				ty = 'hour';
				var timeF = '%I %P'
				queryObject['start'] = moment($('#statStart').val()).utc().format('YYYY-MM-DD');
				queryObject['end'] = moment($('#statEnd').val()).add('days', 1).utc().format('YYYY-MM-DD');
			} else {
				queryObject['start'] = moment($('#statStart').val()).utc().format('YYYY-MM-DD');
				queryObject['end'] = moment($('#statEnd').val()).utc().format('YYYY-MM-DD');
			}
		}
		authPostCall(apiUrl + 'api/barbell/' + q,JSON.stringify(queryObject),'D8XYJMbtQpfLd7XiDFGWQye8DEkFCdF_VzHh9OxI8Ao5ZGLv2V9lQ7Dlh0pvIBy0',function(obj) {		

			var allArr = [];
			var resArr = [];
			var visArr = [];
			var vieArr = [];

			$.each( obj, function( key, value ) {
				allArr.push(value.reservations);
				allArr.push(value.visits);
				allArr.push(value.views);
				if(ty == 'day') {
					resArr.push([moment(value.dt,'YYYY-MM-DD').utc().unix() * 1000, value.reservations]);
					visArr.push([moment(value.dt,'YYYY-MM-DD').utc().unix() * 1000, value.visits]);
					vieArr.push([moment(value.dt,'YYYY-MM-DD').utc().unix() * 1000, value.views]);
				} else {
					resArr.push([moment(value.dt).utc().unix() * 1000, value.reservations]);
					visArr.push([moment(value.dt).utc().unix() * 1000, value.visits]);
					vieArr.push([moment(value.dt).utc().unix() * 1000, value.views]);					
				}
			});

			var max = Math.max.apply(Math, allArr);
			var max = max + (max / 5);

			// === Make chart === //
	    	var plot = $.plot($(".chart"),
	           [ { data: resArr, label: "Reservations", color: "#BA1E20"}, { data: visArr, label: "Visits",color: "#459D1C" }, { data: vieArr, label: "Views",color: "#0000CC" } ], {
	               series: {
	                   lines: { show: true, fill: true },
	                   points: { show: true }
	               },
	               grid: { hoverable: true, clickable: true },
	               yaxis: { min: 0, max: max },
	               xaxis: {
					    mode: "time",
					    timeformat: timeF,
					    timezone: "browser"
					}
			   });

			// === Point hover in chart === //
		    var previousPoint = null;
		    $(".chart").bind("plothover", function (event, pos, item) {
				
		        if (item) {
		            if (previousPoint != item.dataIndex) {
		                previousPoint = item.dataIndex;
		                
		                $('#tooltip').fadeOut(200,function(){
							$(this).remove();
						});
		                var x = item.datapoint[0].toFixed(2),
							y = item.datapoint[1].toFixed(2);
		                    
		                fitstew.flot_tooltip(item.pageX, item.pageY,Math.round(y) + ' ' + item.series.label);
		            }
		            
		        } else {
					$('#tooltip').fadeOut(200,function(){
							$(this).remove();
						});
		            previousPoint = null;           
		        }   
		    })
	    });
	}
	fitstew = {
		// === Tooltip for flot charts === //
		flot_tooltip: function(x, y, contents) {
				
		$('<div id="tooltip">' + contents + '</div>').css( {
			top: y + 5,
			left: x + 5
			}).appendTo("body").fadeIn(200);
		}
	}

});
