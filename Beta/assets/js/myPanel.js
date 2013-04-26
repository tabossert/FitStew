var url = "http://web-dev.fitstew.com"

if(!localStorage['uToken'] || localStorage['fitTime'] < moment().subtract('minutes', 30).unix()) {
	window.location = url + "/Beta/";
}


$(document).ready(function(){

	/* Settings */
	var backArr = ['assets/img/background1.png','assets/img/background2.png'];
	var rand = backArr[Math.floor(Math.random() * backArr.length)];

	$('body').css('background', "url('" + rand + "') no-repeat;");
	$('body').css({'background-image' : 'url(' + rand + ')','background-repeat': 'no-repeat'});

	$('#classesBlock').hide();
	$('#clearSearch').hide();


	var uToken = localStorage['uToken'];
	var cuToken = localStorage['cuToken'];
	var offset = moment().zone();
	var wkNum = 0;


	$("#fundOver").popover().parent().delegate('#fundButton', 'click', function() {
		$("#fundButton").hide();
		if ($('#fmaAmount').val()) {
			var payInfo = new Object();
			payInfo.amount = $('#fmaAmount').val();
			payInfo.cToken = $('#acbcard').data('cToken');
			var payInfoJSON = JSON.stringify(payInfo);
			authPostCall('http://api.fitstew.com/api/processPayment/',payInfoJSON,uToken,function(obj) {
				if(obj.status == "success") {
					$('#fundIcon').html('<i style="color: #57b547;" class="icon-ok icon-large">');
					updateBalance();
				} else {
					$('#fundIcon').html('<i style="color: red;" class="icon-exclamation-sign icon-large">');
				}
			});
		} else {
			$('#fundIcon').html('<i style="color: red;" class="icon-exclamation-sign icon-large">');
				delay(function() {
					$('#fundIcon').html("");
					$("#fundButton").show();
			})
		}
	});


	$('#logout').click(function() {
		authGetCall('http://api.fitstew.com/api/userSignout/',uToken,function(obj) {
			console.log(obj.status);
			if(obj.status) {
				localStorage['uToken'] = "";
				window.location = url + "/Beta/";
			}
		});
	});

	/* Reusable functions */

	function updateBalance() {
		authGetCall('http://api.fitstew.com/api/balance/',uToken,function(obj) {
			$('#balance').html('$' + obj[0].balance);
		});		
	}
	updateBalance();

   function delay(callback){
      setTimeout(function(){ 
         callback(1);
      }, 5000);
    }

    function updateTimestamp() {
    	if(localStorage['fitTime'] < moment().subtract('minutes', 30).unix()) {
    		window.location = url + "/Beta/";
    	} else {
    		localStorage['fitTime'] = moment().unix();
    	}
    }	

    $(document).click(function(e) {
    		updateTimestamp();
    });

	/* Date stuff */
	$('#classMessage').hide();

   var startDate = moment().subtract('days',2).toDate();
   $('#dpd').datepicker('setStartDate',startDate).on('changeDate', function(ev){
   		$('#timeDown').remove();
   		var dropTime = "";
   		var dTime = $('#' + moment(ev.date.valueOf()).add('days',1).format('dddd')).data('time');
   		if(dTime){
	       	var timeArr = dTime.split(',');
	    	$.each(timeArr, function(time, value) {
			   //add to dropwdown here
			   timec = moment(value, 'hh:mm').subtract('minutes',offset).local().format('h:mmA')
			   dropTime = dropTime + '<option id="timeDown" value="' + timec + '">' + timec + '</option>';
		   });
		   $('#dpd').datepicker('hide');
		   $('#timeMenu').html(dropTime);
		} else {
			$('#timeDown').remove();
		}
   });

   function timeClick() {
	   var timeLink = $('.time');
	   timeLink.addClass("clickable");
	   timeLink.click(
	   		function() {
				alert('Class scheduled');	   		
	   		}
	   );
   }

   $('#addschButton').click(
		function() {
			var dtcomb = $('#dpd').val() + ' ' + $('#timeMenu :selected').text();
			var dt = moment(dtcomb, 'MM/DD/YYYY hh:mm').utc().format('YYYY-MM-DD HH:mm:ss');
			var dataCon = '{"gymid": "' + $('.bactive').children('.pName').data('gid') + '","classid": "' + $('#classModal').data('cid') + '","datetime": "' + dt + '"}';
			console.log(dataCon);
			if($('#dpd').val() && moment($('#dpd').val()).isValid()); {
				if(moment($('#timeMenu :selected').text()).isValid()); {
					authPostCall('http://api.fitstew.com/api/addEvent/',dataCon,uToken,function(obj) {
						if(obj.status == 'success') {
							$('#classMessage').html('<span class="label label-success">Class Scheduled</span>');
							$('#classMessage').show();
							var schSid = obj.sid;
							if($('#classModal').data('sid')) {
								var dataCon = '{"sid": ' + $('#classModal').data('sid') + '}';
								authPostCall('http://api.fitstew.com/api/deleteEvent/',dataCon,uToken,function(obj) {
									$('#classModal').data('sid', schSid);
									updateBalance();
									buildSchedule(wkNum)
								});
							} else {
								updateBalance();
								buildSchedule(wkNum)
							}
						} else {
							$('#classMessage').html('<span class="label label-important">' + obj.message + '</span>');
							$('#classMessage').show();
						}
					});
					delay(function() {
						$('#classMessage').hide();
					});
				}
			}
   });
   


   timeClick();


    var sli = 0;
    $('.carousel').carousel({
	   interval: false
    });
   
    $('#myCarousel').bind('slide', function(e){ 
   	   sli = 1;
    });
   
    $('#myCarousel').bind('slid', function(e){ 
   	   sli = 0;
   	   $('.item:first').remove();
    });

	$('#sSunday').css("border", "0");


	var intentConfig = {    
		sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)    
		interval: 200, // number = milliseconds for onMouseOver polling interval    
		over: inputExpand, // function = onMouseOver callback (REQUIRED)    
		timeout: 500, // number = milliseconds delay before onMouseOut    
		out: inputRetract // function = onMouseOut callback (REQUIRED)
	};
	
	$("#terms").hoverIntent( intentConfig )
   
    function inputExpand() {
    	$('#terms').animate({width: '400px'});
   	}

   	function inputRetract() {
     	$('#terms').animate({width: '200px'})
   	}

	$('#modalBut').click(
   		function() {
	   		$('#accountModal').modal('show');
   		}
    )

	$('#terms').typeahead({
		source: ['Karate','Kick Boxing','Yoga'],
		mode: 'multiple',
		items: 8
	});

	/* Account Modal */
	var ccTrans = 0;
	var tempToken = new Object();
	tempToken.cToken = $('#acbcard').data('cToken');
	$('#acbButtonText').data('func', 'create')

	$('#accountSettings').click(
   		function() {
   			getBillingInfo();
	   		$('#accountModal').modal('show');
   		}
    )	

    Stripe.setPublishableKey('pk_test_b6UX3N4Ew26Yxmtf2pdZ84yT');

    $('#acbcard').change(function() {
    	if(Stripe.validateCardNumber($('#acbcard').val())) {
    		$('#acbcard').css('box-shadow', '2px 2px 3px #57b547')
    	} else {
    		$('#acbcard').css('box-shadow', '2px 2px 3px #FF0000')
    	}
    });

    $('#acbcvc').change(function() {
    	if(Stripe.validateCVC($('#acbcvc').val())) {
    		$('#acbcvc').css('box-shadow', '2px 2px 3px #57b547')
    	} else {
    		$('#acbcvc').css('box-shadow', '2px 2px 3px #FF0000')
    	}
    });

    $('#acbexpmonth').add($('#acbexpyear')).change(function() {
    	if(Stripe.validateExpiry($('#acbexpmonth').val(), $('#acbexpyear').val())) {
    		$('#acbexpmonth').css('box-shadow', '2px 2px 3px #57b547')
    		$('#acbexpyear').css('box-shadow', '2px 2px 3px #57b547')
    	} else {
    		$('#acbexpmonth').css('box-shadow', '2px 2px 3px #FF0000')
    		$('#acbexpyear').css('box-shadow', '2px 2px 3px #FF0000')
    	}
    });


    function stripeResponseHandler(status, response) {
	    if (response.error) {
	    	ccTrans = 0;
	    } else {
	    	var ccData = new Object();
	    	ccData.email = $('#acsemail').val();
	    	ccData.cToken = response['id'];
	    	ccData.cuToken = $('#acbcard').data('cToken');
	    	var ccDataJSON = JSON.stringify(ccData);
	        var token = response['id'];
	        authPostCall('http://api.fitstew.com/api/' + $('#acbButtonText').data('func') + 'CustomerToken/',ccDataJSON,uToken,function(obj) {
	        	if(obj.status = 'success') {
	        		localStorage['cuToken'] = obj.cToken;
	        		$('#acbResult').html('<i style="color: #57b547;" class="icon-ok icon-2x">');
	        		getBillingInfo();
	        	} else {
	        		$('#acbResult').html('<i style="color: red;" class="icon-exclamation-sign icon-2x">');
	        		$('#acbError').html('<span class="label label-important">Important</span>');
	        	}
	        	delay(function() {
	        		$('#acbResult').html("");
	        	});
	        });
			ccTrans = 0;
	    }
	}	


    /*function authGetCall(uri,token,callback) {
		$.ajax({
		 	beforeSend: function(xhr) {
			  xhr.setRequestHeader("ltype", "web");
			  xhr.setRequestHeader("token", token);
			},
		    type: "GET",
		    dataType: "json",
		    contentType: "application/json",
		    url: uri,
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
			  xhr.setRequestHeader("token", token);
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
	}*/

    $('a[data-toggle="tab"]').on('show', function(e) {
		$('#' + e.target.id).children('img').attr('src','assets/img/' + $('#' + e.target.id).data('img') + '_white.png');
		$('#' + e.relatedTarget.id).children('img').attr('src','assets/img/' + $('#' + e.relatedTarget.id).data('img') + '_blue.png');
    })

    $('#acbCopyButton').click(function() {
    	$('#acbname').val($('#acsfname').val() + ' ' + $('#acslname').val())
	   	$('#acbaddress').val($('#acsaddress').val());
	   	$('#acbaddress2').val($('#acsaddress2').val());
	   	$('#acbcity').val($('#acscity').val());
	   	$('#acbstate').val($('#acsstate').val());
	   	$('#acbzipcode').val($('#acszipcode').val());	
    });

    $('#acsButton').click(function(){
    	var userData = new Object();
    	userData.email = $('#acsemail').val();
    	userData.first_name = $('#acsfname').val();
    	userData.last_name = $('#acslname').val();
    	userData.address = $('#acsaddress').val();
    	userData.address2 = $('#acsaddress2').val();
    	userData.city = $('#acscity').val();
    	userData.state = $('#acsstate').val();
    	userData.zipcode = $('#acszipcode').val();

    	var userDataJSON = JSON.stringify(userData);

    	authPostCall('http://api.fitstew.com/api/updateUserPreferences/',userDataJSON,uToken,function(obj) {
    		if(obj.status == 'success') {
    			$('#acsResult').html('<i style="color: #57b547;" class="icon-ok icon-2x">');
    		} else {
    			$('#acsResult').html('<i style="color: red;" class="icon-exclamation-sign icon-2x">');
    		}
	        delay(function() {
	        	$('#acsResult').html("");
	        });
    	})

    })

    $('#acbButton').click(function(){
    	if($('#acbButtonText').data('func') == 'update') {
    		$('#acbButtonText').html('Save');
	   		$(".acbinput").removeAttr("disabled");
	   		$(".acbinput").attr('placeholder',"");
	   		$("#acbCopyButton").show();
    	}
    	if(ccTrans == 0) {
    		ccTrans = 1;
	    	Stripe.createToken({
	            name : $("#acbname").val(),
	            address_line1 : $("#acbaddress").val(),
	            address_line2 :$("#acbaddress2").val(),
	            address_city : $("#acbcity").val(),
	            address_state :  $("#acbstate").val(),
	            address_zip : $("#acbzipcode").val(),
	            
	            number: $('#acbcard').val(),
	            cvc: $('#acbcvc').val(),
	            exp_month: $('#acbexpmonth').val(),
	            exp_year: $('#acbexpyear').val()
	        }, stripeResponseHandler);
    	}
    });





    authGetCall('http://api.fitstew.com/api/userPreferences/',uToken,function(obj) {
    	$('#acsemail').val(obj[0].email);
    	$('#acsfname').val(obj[0].first_name);
    	$('#acslname').val(obj[0].last_name);
    	$('#acsaddress').val(obj[0].address);
    	$('#acsaddress2').val(obj[0].address2);
    	$('#acscity').val(obj[0].city);
    	$('#acsstate').val(obj[0].state);
    	$('#acszipcode').val(obj[0].zipcode);
    	localStorage['cuToken'] = obj[0].cToken;
   	})

    function getBillingInfo() {
    	var ttToken = new Object();
    	ttToken.cToken = localStorage['cuToken']
	    tempTokenJSON = JSON.stringify(ttToken);
	   	authPostCall('http://api.fitstew.com/api/retrieveCustomer/',tempTokenJSON,uToken,function(obj) {
	   		if(!obj[0].ccard) {
	   			$('#acbButtonText').html('Save');
	   			$('#acbButtonText').data('func', 'create')
	   		} else {
	   			$(".acbinput").attr("disabled", "disabled");
	   			$("#acbCopyButton").hide();
	   			$('#acbButtonText').html('Update');
	   			$('#acbButtonText').data('func', 'update')
	   			$(".acbinput").val("");
		    	$('#acbname').attr('placeholder',obj[0].name);
		    	$('#acbaddress').attr('placeholder',obj[0].address_line1);
		    	$('#acbaddress2').attr('placeholder',obj[0].address_line2);
		    	$('#acbcity').attr('placeholder',obj[0].address_city);
		    	$('#acbstate').val(obj[0].address_state).attr('selected',true);
		    	$('#acbstate').css("color", "#999999");
		    	$('#acbzipcode').attr('placeholder',obj[0].address_zip);
		    	$('#acbcard').attr('placeholder','xxxxxxxxxxxx' + obj[0].ccard);
		    	$('#acbcvc').attr('placeholder','xxx');
		    	$('#acbexpmonth').attr('placeholder',obj[0].exp_month);
		    	$('#acbexpyear').attr('placeholder',obj[0].exp_year);
		    	$('#acbcard').data('cToken', obj[0].cuToken);
		    	localStorage['cuToken'] = obj[0].cuToken;
		    }
	   	})
	}	


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
	

	/* Schedule Block */

	function buildSchedule(wkNum) {
		var week = moment().add('weeks', wkNum)
		var today = moment(week).format("MMMM YYYY");
		var daysinweek = 7;
		var dayCount = 8;
		var daysCount = 0;
		var dayofweek = moment(week).format('d');
		var prevCount = moment(week).subtract('days', 1).format('d');
		var sdayofweek = moment(week).subtract('days', dayofweek-1);
		var edayofweek = moment(sdayofweek).add('days', 7).format("YYYY-MM-DD");
		var days = 0;

		var schData = new Object();
		schData.start = moment(sdayofweek).format('YYYY-MM-DD');
		schData.end = moment(edayofweek).format('YYYY-MM-DD');
		schDataJSON = JSON.stringify(schData);

		authPostCall('http://api.fitstew.com/api/userSchedule/',schDataJSON,uToken,function(schedjson) {

			$('.event').remove();
			var dayNames = new Array("Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday");
			$('#sMonth').html(today);
			
			for(var d = 0;d < daysinweek;d++)
			{
				$('#s' + dayNames[d]).children('.dayNum').html(moment(sdayofweek).format('DD'));
				console.log('#s' + dayNames[d]);
				console.log(sdayofweek);
				$.each(schedjson, function(key, value) {
					if(moment(value.datetime).format('YYYY-MM-DD') == moment(sdayofweek).format('YYYY-MM-DD')) {
						console.log(moment(value.datetime).format('YYYY-MM-DD'));
						$('#s' + dayNames[d]).children('.eventCont').append('<div class="event" data-sid="' + value.id + '" data-cid="' + value.classid + '" data-scid="' + value.sclassid + '"><div class="container-fluid"><div class="row-fluid"><div class="span12"><div class="row-fluid"><div class="schTime span6 offset2">' + moment(value.datetime).format('hh:mm') + '</div><div class="schDel span2 offset2">X</div></div></div><div class="row-fluid"><div class="schImages span6"><img src="' + value.gymImage + '"></div><div class="schImages span6"><img src="assets/img/schedule/' + value.image + '"></div></div><div class="row-fluid"><div class="schName">' + value.service + '</div></div></div></div>');
						console.log(moment(value.datetime).format('hh:mm'));
					}
				});
				sdayofweek = moment(sdayofweek).add('days', 1);
			}
			$('.event').click(
				function() {
					modalBuild($(this).data('cid'),$(this).data('sid'),function(res) {
						$('#classModal').modal('show');
						$('#classModal').on('shown', function () {
						});	
					});				
				}
			);
			$('.schDel').click(function(e) {
				e.stopPropagation();
				$('#deleteModal').data('sid',$(this).parents('.event').data('sid'));
				$('#deleteModal').modal('show');
			});
		});
	}	

	$('#delschButton').click(function() {
		var dataCon = '{"sid": ' + $('#deleteModal').data('sid') + '}';
		authPostCall('http://api.fitstew.com/api/deleteEvent/',dataCon,uToken,function(obj) {
			$('#deleteModal').data('sid');
			$('#deleteModal').modal('hide')
			updateBalance();
			buildSchedule(wkNum)
		});		
	});

	buildSchedule(0);


	$('#prevWeek').click(
		function() {
			wkNum = wkNum-1;
			buildSchedule(wkNum);
	});

	$('#nextWeek').click(
		function() {
			wkNum++;
			buildSchedule(wkNum);
	});

	$('#prevMonth').click(
		function() {
			wkNum = wkNum-4;
			buildSchedule(wkNum);
	});

	$('#nextMonth').click(
		function() {
			wkNum = wkNum+4;
			buildSchedule(wkNum);
	});


	/* ClassInfo Block */

    function mapLoc(addr) {
    	map = new GMaps({
        	div: '#map',
        	zoom: 16,
        	lat: -12.043333,
        	lng: -77.028333,
        	width: 200,
        	height: 100
      	});
   
   
	    GMaps.geocode({
			address: addr,
		  	callback: function(results, status) {
		    	if (status == 'OK') {
		      		var latlng = results[0].geometry.location;
		      		map.setCenter(latlng.lat(), latlng.lng());
		      		map.addMarker({
		        		lat: latlng.lat(),
		        		lng: latlng.lng()
		      		});
		      		map.refresh();
		    	}
		  	}
	    });
	}

	mapLoc('1461 Creekside Dr., Walnut Creek, CA');


	/* Search */
    $('#searchButton').click(
		function() {
			console.log($('#terms').data('placeholder'));
			if(!$('#distance').val() || !$('#location').val()) {
				$('#distance').tooltip('show');
				$('#location').tooltip('show');
			} else {
				$('#classesBlock').slideUp('slow');
				$('.carousel-inner').empty();
				$('.pCard').remove();
				
				var data = '{';
				data = data + '"address": "' + $('#location').val() + '", "maxDistance": "' + $('#distance').val() + '"';
				if($('#terms').data('terms')) {
					data = data + ',"workouts": "' + $('#terms').data('terms') + '"';
				}
				var data = data + '}';
				buildCards(data);
				$('#clearSearch').show();
				$('#partnerBlock').slideDown('slow');
			}

	});

	var terms;
	$('#clearButton').click(
		function() {
			terms = "";
			$('#terms').removeData('terms');
			$('#terms').attr('placeholder', "Enter Classes");
			$('#location').val("");
			$('#distance').val("");
			$('#classesBlock').slideUp('slow');
			$('#partnerBlock').slideUp('slow');
			$('#clearSearch').slideUp('slow');
	});

	$('#terms').keyup(function(e) {
		if(e.keyCode == 13 && ($('#terms').val())) {
			if(terms) {
				terms = terms + ',' + $('#terms').val();
			} else {
				terms = $('#terms').val();
			}
			$('#terms').attr('placeholder', terms);
			$('#terms').data('terms', terms)
			$('#terms').val('');
		}
	});

    /* Card Building */

    // This function sends the search params, gets the results and builds the main cards
    function buildCards(data) {
    	$('#searchButton').click(false);
    	// Perform POST call to send params and get back results
     	postCall('http://api.fitstew.com/api/gymSearchAdvanced/',data, function(obj) {
       		// Loop through each result and create card
       		if(!obj.status) {
		   		$.each( obj, function( key, value ) {
		     		$('#partnerCards').append('<div class="pCard"><div class="pName" data-gid="' + value.id + '" data-name="' + value.name + '"  data-addr="' + value.address + '" data-addr2="' + value.city +', ' + value.state + ' ' + value.zipcode + '" data-email="' + value.email + '" data-phone="' + value.phone + '" data-facebook="' + value.facebook + '" data-twitter="' + value.twitter + '" data-monday="' + value.mondayOpen + '-' + value.mondayClose + '" data-tuesday="' + value.tuesdayOpen + '-' + value.tuesdayClose + '" data-wednesday="' + value.wednesdayOpen + '-' + value.wednesdayClose + '" data-thursday="' + value.thursdayOpen + '-' + value.thursdayClose + '" data-friday="' + value.fridayOpen + '-' + value.fridayClose + '" data-saturday="' + value.saturdayOpen + '-' + value.saturdayClose + '" data-sunday="' + value.sundayOpen + '-' + value.sundayClose + '">' + value.name + '</div><div class="pImage"><img src="' + value.image + '"></div><div class="pDistance">' + value.distance + '</div><div class="pMatch">' + value.matched + '</div></div>');
 				});
		    	// Call attachedCards function
		    	attachCards();
	   		} else {
		   		$('#partnerBlock').html('<div class="searchError">No Results Found</div>');
	   		}
	 	});
		$('#searchButton').click(true);
    }

    /*buildCards('{"address": "94596", "maxDistance": "100", "workouts": "karate,yoga,Krav Maga"}')*/

    // This function retrieves classes for a fitness center builds each class card 
	function buildClassCards(gid,search,callback) {
   		//Create carasol placeholder
     	var inner = '<div class="item">';
     	// Perform GET call to retreive class info
     	getCall('http://api.fitstew.com/api/getClasses/' + gid + '/?search=' + search,function(obj) {
        	// Loop through each class and create card
   	 		$.each( obj, function( key, value ) {
	 			inner = inner + '<div class="cCard"><div class="className" data-cid="' + value.id + '">' + value.service + '</div><img src=assets/img/classes/' + value.image + '></div>';
	 		});
	 		// Close placeholder
	 		inner = inner + '</div>';
	 		callback(inner);
	 	});
    };


   function modalBuild(cid,sid,callback) {
   $('#addSuccess').hide();
    //Here We get the info for the class in question and it's fitness center
    getCall('http://api.fitstew.com/api/getClass/' + cid,function(obj) {
    	$.each( obj, function( key, value ) {
   			$('#classModalLabel').html(value.service);
   			$('#classModal').data('cid', cid);
   			$('#dpd').val("");
   			if(sid !== "") {
   				$('#classModal').data('sid', sid);
   				$('#addschButtonText').html('Reschedule');
   			} else {
   				$('#classModal').removeData('sid');
   				$('#addschButtonText').html('Add to my schedule');
   			}
  			$('#classInstructor').html('Instructor: ' + value.instructor);
  			$('#classDesc').html(value.desc);
  			 			
   		});
   	});
   	// Then we get the times for the class in question
    getCall('http://api.fitstew.com/api/getClassTimes/' + cid,function(obj) {
    	$('.day').remove();
    	$.each( obj, function( key, value ) {
    		var sched = "";
    		console.log(value);
    		if(value.time) {
    		  sched = sched + '<div class="day" id="' + value.weekday + '" data-time="' + value.time + '"><div class="weekday">' + value.weekday + '</div>';
    		  var timeArr = value.time.split(',');
    			$.each(timeArr, function(key, time) {
    				console.log(time);
	    			sched = sched + '<div class="time">' + moment(time, 'hh:mm').subtract('minutes',offset).local().format('h:mmA') + '</div>';
	    		});
    		}
    		sched = sched + '</div>';
    		$('#classSched').append(sched);
   		});
   		console.log($('#myModal').data('cid'));
   		callback(10);
   	});
   };

    function profileBuild() {
   	   $('#partnerName').html($('.bactive').children('.pName').data('name'));
   	   $('#partnerLogo').html('<img src="' + $('.bactive').children('.pImage').children('img').attr('src') + '">');
	   $('#phoneFill').html($('.bactive').children('.pName').data('phone'));
	   $('#emailFill').html($('.bactive').children('.pName').data('email'));
	   $('#fbFill').html($('.bactive').children('.pName').data('facebook'));
	   $('#twitterFill').html($('.bactive').children('.pName').data('twitter'));
	   $('#addr').html($('.bactive').children('.pName').data('addr')); 
	   $('#addr2').html($('.bactive').children('.pName').data('addr2')); 
	   mapLoc($('.bactive').children('.pName').data('addr') + $('.bactive').children('.pName').data('addr2'));
	   $('#partnerHours').children('#mondayHours').html('Monday ' + $('.bactive').children('.pName').data('monday'));
	   $('#partnerHours').children('#tuesdayHours').html('Tuesday ' + $('.bactive').children('.pName').data('tuesday'));
	   $('#partnerHours').children('#wednesdayHours').html('Wednesday ' + $('.bactive').children('.pName').data('wednesday'));
	   $('#partnerHours').children('#thursdayHours').html('Thursday ' + $('.bactive').children('.pName').data('thursday'));
	   $('#partnerHours').children('#fridayHours').html('Friday ' + $('.bactive').children('.pName').data('friday'));  
	   $('#partnerHours').children('#saturdayHours').html('Saturday ' + $('.bactive').children('.pName').data('saturday'));
	   $('#partnerHours').children('#sundayHours').html('Sunday ' + $('.bactive').children('.pName').data('sunday'));
    }

	function attachCards() {
	    $(".pCard").click(
			function() {
				if($('#classesBlock').is(':visible')) {
					if(sli == 0) {
						if(!$(this).hasClass('bactive')) {
							$('div').removeClass('bactive');
							$(this).addClass('bactive');
							buildClassCards($(this).children('.pName').data('gid'),$(this).children('.pMatch').html(),function(res) {
								$('.carousel-inner').append(res);
								$('.carousel').carousel('next');
								profileBuild();
								$('.cCard').click(
									function() {
										modalBuild($(this).children('.className').data('cid'),"",function(res) {
											$('#classModal').modal('show');
											$('#classModal').on('shown', function () {
											});	
										});				
									}
								);
							});
						}
					}
				} else {
					$(this).addClass('bactive');
					buildClassCards($(this).children('.pName').data('gid'),$(this).children('.pMatch').html(),function(res) {
						$('.carousel-inner').append(res);
						$('.item').addClass('active');
						$('#profileBlock').slideDown('slow');
						$('#classesBlock').slideDown('slow');
						profileBuild();
						$('.cCard').click(
							function() {
								modalBuild($(this).children('.className').data('cid'),"",function(res) {
									$('#classModal').modal('show');
									$('#classModal').on('shown', function () {
									});	
								});					
							}
						);
					});
				}
			}
		);
	}
});