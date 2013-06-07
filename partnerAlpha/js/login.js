$(document).ready(function(){

	var apiUrl = 'http://api.fitstew.com/'

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

	$('#partnerLogin').click(function(e) {
		e.preventDefault();
		var loginObj = {};
		loginObj['username'] = $('#username').val();
		loginObj['password'] = Sha1.hash($('#password').val());
		loginObjJSON = JSON.stringify(loginObj);

		postCall(apiUrl + 'api/gymLogin/',loginObjJSON,function(obj) {
			
			if(obj[0].status == 'failed') {

			} else {
			  localStorage['pToken'] = obj[0].token;
			  localStorage['pid'] = obj[0].gymid;
              window.location = "http://web-dev.fitstew.com/partner"
			}
		});
	});

});
