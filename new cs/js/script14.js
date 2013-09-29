$(document).ready(function() {


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

	$.getJSON("https://freegeoip.net/json/?callback=?", function(data) {
		client_city = data.city;
		client_state = data.region_name;
	});

	/************************************************/
		
	/************************************************/
	//validation for subscription form
	/*$("#form-subscribe").validate({ 
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
			PostCall("https://www.fitstew.com/api/registerUser/", JSON.stringify(regObj), function(retObj) {
				$("#form-subscribe").each(function() {
					this.reset();
					$("#subscription-submitted").html("<p>" + retObj.message + "</p>");
					$("#form-subscribe").fadeOut(1000, function() {
						$("#subscription-submitted").fadeIn(1000);
					});
				});
			}, "json");
		} 
	});*/
	/************************************************/
});