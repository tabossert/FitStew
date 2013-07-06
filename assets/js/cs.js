$(document).ready(function(){

	var apiUrl = "http://dev.fitstew.com/"

	function authPostCall(uri,data,callback) {
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

	$('#nButton').click(function() {
		if($('#emailIn').val() !== "") {
			if($('#zipIn').val() !== "") {
				var regObj = {};
				regObj['email'] = $('#emailIn').val();
				regObj['zipcode'] = $('#zipIn').val();
				authPostCall(apiUrl + 'api/registerUser/',JSON.stringify(regObj),function(obj) {
					$('#signuprow').empty();
					$('.notifyMess').html(obj.message);
				});
			} else {
				$('#zipIn').css({'border': '1px solid #FF0000'})
			} 
		} else {
			$('#emailIn').css({'border': '1px solid #FF0000'})
		} 
	});

});