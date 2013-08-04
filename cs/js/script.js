$(document).ready(function() {
	// make placeholders work for IE too
	$('input').placeholder();

	var backArr = ['tagline1.png','tagline3.png'];
	var rand = backArr[Math.floor(Math.random() * backArr.length)];

	$('#tag_line').attr('src', 'images/' + rand);

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

    $('.popup').click(function(event) {
    	var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = this.href,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;
    
    	window.open(url, 'twitter', opts);
 
    	return false;
  	});

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
		timeout : 10000,
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
		errorPlacement: function(error, element) {
			$('#form-subscribe-email').addClass('input_error');
		},
		submitHandler: function(form) {
			pauseSlider();
			$('#form-subscribe-email').removeClass('input_error');
			var regObj = {};
			regObj['email'] = $('#form-subscribe-email').val();
			regObj['city'] = client_city;
			regObj['state'] = client_state;
			PostCall("http://api.fitstew.com/api/registerUser/", JSON.stringify(regObj), function(retObj) {
				$("#form-subscribe").each(function() {
					this.reset();
					$("#subscription-submitted").html("<p>" + retObj.message + "</p>");
					$("#form-subscribe").fadeOut(1000, function() {
						$("#subscription-submitted").fadeIn(1000);
					});
				});
			}, "json");
		} 
	});
	/************************************************/

	function pauseSlider() {
		content_slider.cycle('paused');
		$('.small_play_pause').removeClass('small_pause').addClass('small_play');
	}
	
});