$(document).ready(function(){
   $('#classesBlock').hide();
   $('#partnerBlock').hide();
   $('#profileBlock').hide();
   
   
   function delay(){
      setTimeout(function(){ 
         $('#classMessage').hide();
      }, 5000);
    }
   
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

   
   var slide = $("#searchCG");
   slide.addClass("clickable");
	slide.click(
		function() {
			if(!$('#distance').val() || !$('#location').val()) {
				$('#distance').tooltip('show');
				$('#location').tooltip('show');
				slide.preventDefault();
			}
			$('#classesBlock').hide();
			$('#profileBlock').hide();
			$('.carousel-inner').empty();
			$('.box').remove();
			
			var data = '{';
			data = data + '"address": "' + $('#location').val() + '", "maxDistance": "' + $('#distance').val() + '"';
			if($('#classes').val()) {
				data = data + ',"workouts": "' + $('#classes').val() + '"';
			}
			var data = data + '}';
			buildCards(data);
			$('#partnerBlock').slideDown('slow');
	});


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

   var offset = moment().zone();
   
   function timeClick() {
	   var timeLink = $('.time');
	   timeLink.addClass("clickable");
	   timeLink.click(
	   		function() {
				alert('Class scheduled');	   		
	   		}
	   );
   }
   
   timeClick();
  
   function mapLoc(addr) {
      map = new GMaps({
        div: '#map',
        zoom: 16,
        lat: -12.043333,
        lng: -77.028333,
        width: 100,
        height: 50
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
	 

   // This function sends the search params, gets the results and builds the main cards
   function buildCards(data) {
     // Perform POST call to send params and get back results
     postCall('http://api.fitstew.com/api/gymSearchAdvanced/',data, function(obj) {
       // Loop through each result and create card
	   $.each( obj, function( key, value ) {
	     $('#partnerBlock').append('<div class="box"><div class="gtitle" data-gid="' + value.id + '" data-addr="' + value.address + '" data-email="' + value.email + '" data-phone="' + value.phone + '" data-facebook="' + value.facebook + '" data-twitter="' + value.twitter + '" data-monday="' + value.monday + '" data-tuesday="' + value.tuesday + '" data-wednesday="' + value.wednesday + '" data-thursday="' + value.thursday + '" data-friday="' + value.friday + '" data-saturday="' + value.saturday + '" data-sunday="' + value.sunday + '">' + value.name + '</div><div class="glogo"><img src="' + value.image + '"></div><div class="gdistance">' + value.distance + '</div><div class="gmatches">' + value.matched + '</div></div>');
	   
	   });
	   // Call attachedCards function
	   attachCards();
	   //callback(0);
	 });
   }
   
   // This function retrieves classes for a fitness center builds each class card 
   function buildClassCards(gid,search,callback) {
   	 //Create carasol placeholder
     var inner = '<div class="item">';
     // Perform GET call to retreive class info
     getCall('http://api.fitstew.com/api/getClasses/' + gid + '/?search=' + search,function(obj) {
        // Loop through each class and create card
   	 	$.each( obj, function( key, value ) {
	 		inner = inner + '<div class="cbox"><div class="ctitle" data-cid="' + value.id + '">' + value.service + '</div><div class="clogo"><img src="img/' + value.image + '"></div></div>';
	 	});
	 	// Close placeholder
	 	inner = inner + '</div>';
	 	callback(inner);
	 });
   };
   
   
   function profileBuild() {
   	   $('#logo').html('<img src="' + $('.bactive').children('.glogo').children('img').attr('src') + '" height="120" width="120">');
	   $('#contact').children('#phone').html('Phone: ' + $('.bactive').children('.gtitle').data('phone'));
	   $('#contact').children('#email').html($('.bactive').children('.gtitle').data('email'));
	   $('#contact').children('#facebook').html('FBook: ' +  $('.bactive').children('.gtitle').data('facebook'));
	   $('#contact').children('#twitter').html('Twitter: ' + $('.bactive').children('.gtitle').data('twitter'));
	   $('#loc').children('#addr').html($('.bactive').children('.gtitle').data('addr'));   
	   mapLoc($('.bactive').children('.gtitle').data('addr'));
	   $('#hours').children('#monday').html('Monday ' + $('.bactive').children('.gtitle').data('monday'));
	   $('#hours').children('#tuesday').html('Tuesday ' + $('.bactive').children('.gtitle').data('tuesday'));
	   $('#hours').children('#wednesday').html('Wednesday ' + $('.bactive').children('.gtitle').data('wednesday'));
	   $('#hours').children('#thursday').html('Thursday ' + $('.bactive').children('.gtitle').data('thursday'));
	   $('#hours').children('#friday').html('Friday ' + $('.bactive').children('.gtitle').data('friday'));  
	   $('#hours').children('#saturday').html('Saturday ' + $('.bactive').children('.gtitle').data('saturday'));
	   $('#hours').children('#sunday').html('Sunday ' + $('.bactive').children('.gtitle').data('sunday'));
   }
   
  
   // This function is to build the modal, eventually it would be nice to roll this into on call eventually
   function modalBuild(cid,callback) {
   $('#addSuccess').hide();
    //Here We get the info for the class in question and it's fitness center
    getCall('http://api.fitstew.com/api/getClass/' + cid,function(obj) {
    	$.each( obj, function( key, value ) {
   			$('#myModalLabel').html(value.service);
   			$('#myModal').data('cid', cid);
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
   
   function attachCards() {
	   var slide = $(".box");
	   slide.addClass("clickable");
	   slide.click(
			function() {
				if($('#classesBlock').is(':visible')) {
					if(sli == 0) {
						if(!$(this).hasClass('bactive')) {
							$('div').removeClass('bactive');
							$(this).addClass('bactive');
							buildClassCards($(this).children('.gtitle').data('gid'),$(this).children('.gmatches').html(),function(res) {
								$('.carousel-inner').append(res);
								$('.carousel').carousel('next');
								profileBuild();
								var copen = $(".cbox");
								copen.addClass("clickable");
								copen.click(
									function() {
										modalBuild($(this).children('.ctitle').data('cid'),function(res) {
											$('#myModal').modal('show');
											$('#myModal').on('shown', function () {
											});	
										});				
									}
								);
							});
						}
					}
				} else {
					$(this).addClass('bactive');
					buildClassCards($(this).children('.gtitle').data('gid'),$(this).children('.gmatches').html(),function(res) {
						$('.carousel-inner').append(res);
						$('.item').addClass('active');
						$('#profileBlock').slideDown('slow');
						$('#classesBlock').slideDown('slow');
						profileBuild();
						var copen = $(".cbox");
						copen.addClass("clickable");
						copen.click(
							function() {
								modalBuild($(this).children('.ctitle').data('cid'),function(res) {
									$('#myModal').modal('show');
									$('#myModal').on('shown', function () {
									});	
								});					
							}
						);
					});
				}
			}
		);
	}
	//Just for testing
	//buildCards()
	
	
	
	// Putting calls here for various tasks
	
   var addScheduleItem = $("#addScheduleItem");
   addScheduleItem.addClass("clickable");
   addScheduleItem.click(
		function() {
			var dtcomb = $('#dpd').val() + ' ' + $('#timeMenu :selected').text();
			var dt = moment(dtcomb, 'MM/DD/YYYY hh:mm').utc().format('YYYY-MM-DD HH:mm:ss');
			var dataCon = '{"gymid": "' + $('.bactive').children('.gtitle').data('gid') + '","classid": "' + $('#myModal').data('cid') + '","datetime": "' + dt + '"}';
			console.log(dataCon);
				authPostCall('http://api.fitstew.com/api/addEvent/',dataCon,'rb4LTFVnoYDG8b8aYXV4si6nFVILc_5lf6X0IOZCe5O6ZrKjU7NUu-FdlANA_VQl',function(obj) {
					if(obj.status == 'success') {
						$('#classMessage').html('<span class="label label-success">Class Scheduled</span>');
						$('#classMessage').show();
						delay()
					} else {
						$('#classMessage').html('<span class="label label-important">Unable to Schedule</span>');
						$('#classMessage').show();
						delay()
					}
				});
   });
	
	
	
	
	
	
	
});