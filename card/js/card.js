$(document).ready(function(){
   $('#container').hide();
   
   $('.carousel').carousel({
	   interval: false
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
        width: 250,
        height: 200
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
   function buildCards() {
     // Perform POST call to send params and get back results
     postCall('http://api.zunefit.com/api/gymSearchAdvanced/','{"address": "94596", "maxDistance": "100", "workouts": "karate,yoga,Krav Maga"}', function(obj) {
       // Loop through each result and create card
	   $.each( obj, function( key, value ) {
	     $('#bigdiv').append('<div class="box"><div class="gtitle">' + value.name + '</div><div class="glogo"><img src="' + value.image + '"></div><div class="gdistance">' + value.distance + '</div><div class="gmatches">' + value.matched + '</div></div>');
	   
	   });
	   // Call attachedCards function
	   attachCards();
	 });
   }
   
   // This function retrieves classes for a fitness center builds each class card 
   function buildClassCards(uri,callback) {
   	 //Create carasol placeholder
     var inner = '<div class="item">';
     // Perform GET call to retreive class info
     getCall('https://api.zunefit.com/api/getClasses/22/?search=karate,KIckC',function(obj) {
        // Loop through each class and create card
   	 	$.each( obj, function( key, value ) {
	 		inner = inner + '<div class="cbox"><div class="ctitle">' + value.service + '</div><div class="clogo"><img src="img/' + value.image + '"></div></div>';
	 	});
	 	// Close placeholder
	 	inner = inner + '</div>';
	 	callback(inner);
	 });
   };
  
   // This function is to build the modal, eventually it would be nice to roll this into on call eventually
   function modalBuild(uri,callback) {
   
    //Here We get the info for the class in question and it's fitness center
    getCall('https://api.zunefit.com/api/getClass/21',function(obj) {
    	$.each( obj, function( key, value ) {
   			$('#myModalLabel').html(value.service);
  			$('#classInstructor').html(value.instructor);
  			$('#classDesc').html(value.desc);
  			$('#gymLogo').html('<img src="' + $('.bactive').children('.glogo').children('img').attr('src') + '">');
  			//$('#hours').html($('.bactive').children('.ghours').text());
  			$('#phone').html(value.phone);
  			$('#address').html(value.address + ", " + value.city + ", " + value.state + ", " + value.zipcode);
  			 			
   		});
   	});
   	// Then we get the times for the class in question
    getCall('https://api.zunefit.com/api/getClassTimes/21',function(obj) {
    	$('.day').remove();
    	$.each( obj, function( key, value ) {
    		var sched = "";
    		console.log(value);
    		sched = sched + '<div class="day"><div class="weekday">' + value.weekday + '</div>';
    		var timeArr = value.time.split(',');
    		$.each(timeArr, function(key, time) {
    			console.log(time);
	    		sched = sched + '<div class="time">' + moment(time, 'hh:mm').subtract('minutes',offset).format('hh:mmA') + '</div>';
    		});
    		sched = sched + '</div>';
    		$('#classSched').append(sched);
   		});
   		callback(10);
   	});
   	
   	//callback(10);
   };
   
   function attachCards() {
	   var slide = $(".box");
	   slide.addClass("clickable");
	   slide.click(
			function() {
				if($('#container').is(':visible')) {
					if(!$(this).hasClass('bactive')) {
						$('.carousel-inner').remove('.item');
						$('div').removeClass('bactive');
						$(this).addClass('bactive');
						buildClassCards('blah',function(res) {
							$('.carousel-inner').append(res);
							$('.carousel').carousel('next');
							var copen = $(".cbox");
							copen.addClass("clickable");
							copen.click(
								function() {
									modalBuild('blah',function(res) {
										$('#myModal').modal('show');
										$('#myModal').on('shown', function () {
											mapLoc('1461 Creekside Dr., Walnut Creek, CA');
										});	
									});				
								}
							);
						});
					}
				} else {
					$(this).addClass('bactive');
					buildClassCards('blah',function(res) {
						$('.carousel-inner').append(res);
						$('.item').addClass('active');
						$('#container').slideDown('slow');
						var copen = $(".cbox");
						copen.addClass("clickable");
						copen.click(
							function() {
								modalBuild('blah',function(res) {
									$('#myModal').modal('show');
									$('#myModal').on('shown', function () {
										mapLoc('1461 Creekside Dr., Walnut Creek, CA');
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
	buildCards()
});