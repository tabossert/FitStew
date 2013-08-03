$(document).ready(function() {
	// make placeholders work for IE too
	$('input').placeholder();

	function PostCall(uri,data,callback) {
		$.ajax({
		 	beforeSend: function(xhr) {
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

	$.getJSON("http://smart-ip.net/geoip-json?callback=?", function(data) {
		client_city = data.city;
		client_state = data.region;
	});

	//start content slider and listen on event of clicking on play/pause button
	/************************************************/
	var toggle = $('.small_play_pause').click(function() {
		var paused = content_slider.is(':paused');
		content_slider.cycle(paused ? 'resume' : 'pause', true);
		if (paused) {
			$('.small_play_pause').removeClass('small_play').addClass('small_pause');
		}
		else {
			$('.small_play_pause').removeClass('small_pause').addClass('small_play');
		}
	});
	
	//link previous/next buttons to slider content events
    var content_slider = $('#content-slider').cycle({
		fx:      'scrollHorz',
		prev: '.small_previous',
		next: '.small_next',
		timeout : 5000,
		pause: true,
	});
	/************************************************/
		
	//show/hide buttons for slider navigation
	/************************************************/
	$('div.container').hover( 
		function () {
			$(".slider_nav").css('opacity', '0.75');
		},
		function () {
			$(".slider_nav").css('opacity', '0.1');
		});
	/************************************************/
		
	/************************************************/
	//validation for subscription form
	$("#form-subscribe").validate({ 
		errorPlacement: function(error, element) {},
		submitHandler: function(form) {
			var regObj = {};
			regObj['email'] = $('#form-subscribe-email').val();
			regObj['city'] = client_city;
			regObj['state'] = client_state;
			PostCall("http://api.fitstew.com/api/registerUser/", JSON.stringify(regObj), function() {
				$("#form-subscribe").each(function() {
					this.reset();
					$("#form-subscribe").fadeOut(1000, function() {
						$("#subscription-submitted").fadeIn(1000);
					});
				});
			}, "json");
		} 
	});
	/************************************************/
	
});