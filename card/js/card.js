$(document).ready(function(){
   $('#container').hide();
   
   $('.carousel').carousel({
	   interval: false
   })
   
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
  
   function mapLoc() {
      map = new GMaps({
        div: '#map',
        zoom: 16,
        lat: -12.043333,
        lng: -77.028333,
        width: 250,
        height: 200
      });
   
   
	   GMaps.geocode({
		  address: '1461 Creekside Dr., Walnut Creek, CA',
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
	 
	 function postCall(uri,data) {
		 $.ajax({
		    type: "POST",
		    dataType: "json",
		    contentType: "application/json",
		    url: uri,
		    data: data,
		    success: function(response, status, xhr){
		        console.log(response);
		        buildCards(response);
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
	 
   postCall('http://api.zunefit.com/api/gymSearchAdvanced/','{"address": "94596", "maxDistance": "100", "workouts": "karate,yoga,Krav Maga"}'); 
    
      
	 
   function buildCards(obj) {
	   $.each( obj, function( key, value ) {
	      $('#bigdiv').append('<div class="box"><div class="gtitle">' + value.name + '</div><div class="glogo"><img src="' + value.image + '"></div><div class="gdistance">' + value.distance + '</div><div class="gmatches">' + value.matched + '</div></div>');
	   });
	   attachCards();
   }
   
   function buildClassCards(uri,callback) {
     var inner = '<div class="item">';
     getCall('https://api.zunefit.com/api/getClasses/22/?search=karate,KIckC',function(obj) {
   	 	$.each( obj, function( key, value ) {
	 		inner = inner + '<div class="cbox"><div class="ctitle">' + value.service + '</div><div class="clogo"><img src="img/karate.png"></div></div>';
	 	});
	 	inner = inner + '</div>';
	 	callback(inner);
	 });
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
									$('#myModalLabel').html($(this).children('.ctitle').text());
									$('#myModal').modal('show');
									$('#myModal').on('shown', function () {
										mapLoc();
									});				
								}
							);
						});
						$('.carousel').carousel('cycle');
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
								$('#myModalLabel').html($(this).children('.ctitle').text());
								$('#myModal').modal('show');
								$('#myModal').on('shown', function () {
									mapLoc();
								});				
							}
						);
					});
				}
			}
		);
	}
});