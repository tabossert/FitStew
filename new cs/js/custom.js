/** Hide Toolbar on iPhone **/
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('iphone') != -1) {
	window.addEventListener('load', function(){
		setTimeout(scrollTo, 0, 0, 1);
	}, false);
}

/** Localizations **/
var lang = {
	comm: {
		press: 		 'Press Enter to subscribe',
		input_error: 'Enter the valid email',
		thanks: 	 'We will let you know!'	
	} 
}

var width;
$(function(){

	var client_city = 'unknown';
	var client_state = 'unknown';

	$.getJSON("https://smart-ip.net/geoip-json?callback=?", function(data) {
		client_city = data.city;
		client_state = data.region_name;
	});

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
	
	width = $(window).width();
	$(window).on('resize', function() { width = $(window).width() });

	
	if(width > 1024) jump_cd();
	
	/** Default language **/
	$('#notice').text(lang.comm['press']);
	$('#thanks').text(lang.comm['thanks']);
	
	/** Fix placeholder **/
	//$('input[placeholder]').placeholder();
	
	/** Fix IE **/
	if($.browser.msie || $.browser.opera) {
		var ie_mt = width > 1024 ? 120 : 100;
		$('#message > div.n > span.lable').css({marginTop: ie_mt});
	}
	
	
	/** Animation focus and blur **/
	$('#subscribe input').on({
		'focus': function() {
			$('#social')
				.animate({opacity: 0}, {duration: 250, queue: false})
				.animate({marginTop:-32}, {queue: false}, function() {
					$(this).hide()
				});
			
			$('#notice').show().animate({opacity:1});
		},
		'blur': function() {
			$('#social').show()
				.animate({opacity: 1}, {duration: 550, queue: false})
				.animate({marginTop:0}, {queue: false});
			$('#notice').animate({opacity:0}, function() { $(this).hide() });
		}
	});
	
	/** Check-up the e-mail **/
	var last_status = true;
	$('input[name=email]').on('keyup change', function(){
		var email = $('input[name=email]').val();
		var curr_status = (!isValidEmail(email) && email.length>0) ? false : true;
		
		$(this).data('valid', curr_status)
		
		if(last_status == curr_status) return false;
		
		if(curr_status == false) {
			last_status = false;
			$('#notice').animate({opacity:0}, 100, function() { 
				$(this).text(lang.comm['input_error'])
					.animate({opacity:1}, 100);
			});
		} else {
			last_status = true;
			$('#notice').animate({opacity:0}, 100, function() { 
				$(this).text(lang.comm['press'])
					.animate({opacity:1}, 100);
			});
		}
	});
	
	/** Sending email by AJAX **/
	$('#subscribe').submit(function(){

		var input = $('input[name=email]');
		if(!input.data('valid') || input.val().length == 0) {
			err(input);
			return false;
		}

		var regObj = {};
		regObj['email'] = $('#email').val();
		regObj['city'] = client_city;
		regObj['state'] = client_state;

		jsonRegObj = JSON.stringify(regObj)
				
		$.ajax({
		    beforeSend: function(xhr) {
		    },
		    type: "POST",
		    dataType: "json",
		    contentType: "application/json",
		    data: jsonRegObj,
		    url: "https://www.fitstew.com/api/registerUser/",
			success: function(data) {
				if (data.status == 'success') {
					input.animate({marginTop: -35}).off();
					
					$('#social').show().animate({marginTop:0, opacity: 1});
					$('#notice').animate({opacity:0}, function() { $(this).hide() });
				} else err(input);
			}
		});

		return false;
	});

});


function jump_cd() {
	$('#whats').fadeIn(400);
	return false;
	var $cd = $('#message');	
	setTimeout(function(){
		if($cd.hasClass('top') || $cd.hasClass('clicked')) return false;
		$cd.animate({marginTop: '-=50'}, 200, function() {
			$cd.animate({marginTop: '+=50'}, 200, function() {
				$cd.animate({marginTop: '-=25'}, 200, function() {
					$cd.animate({marginTop: '50'}, 200, function() { $cd.removeAttr('style') });
				});
			});
		});
	}, 2500);
}

function err(input) {
	input.stop(true,true).animate({opacity:0}, 300, function(){
		$(this).animate({opacity:1}, 300);
	});
}

function isValidEmail (email, strict) {
	if ( !strict ) email = email.replace(/^\s+|\s+$/g, '');
	return (/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i).test(email);
}

function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
