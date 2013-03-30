$(document).ready(function(){
	var ccTrans = 0;
	var tempToken = new Object();
	tempToken.cToken = 'cus_1SaGAoDEDZkRvq';
	$('#acbButtonText').data('func', 'create')

	$('#modalBut').click(
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
	    	//if($('#acbButtonText').data('func') == 'update') {
	    		ccData.cuToken = $('#acbcard').data('cToken');
	    	//}
	    	var ccDataJSON = JSON.stringify(ccData);
	    	alert(ccDataJSON);
	        var token = response['id'];
	        authPostCall('http://api.fitstew.com/api/' + $('#acbButtonText').data('func') + 'CustomerToken/',ccDataJSON,'FFoZbUKW1jVjKfBmPEScaeoTJpIZb3ONYkgPA0Qwlti_d0tNBWxWK41aTHWfBMVF',function(obj) {
	        	getBillingInfo()
	        });
			ccTrans = 0;
	    }
	}	


    function authGetCall(uri,token,callback) {
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
	}

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

    	authPostCall('http://api.fitstew.com/api/updateUserPreferences/',userDataJSON,'FFoZbUKW1jVjKfBmPEScaeoTJpIZb3ONYkgPA0Qwlti_d0tNBWxWK41aTHWfBMVF',function() {
    		alert("success");
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





    authGetCall('http://api.fitstew.com/api/userPreferences/','FFoZbUKW1jVjKfBmPEScaeoTJpIZb3ONYkgPA0Qwlti_d0tNBWxWK41aTHWfBMVF',function(obj) {
    	$('#acsemail').val(obj[0].email);
    	$('#acsfname').val(obj[0].first_name);
    	$('#acslname').val(obj[0].last_name);
    	$('#acsaddress').val(obj[0].address);
    	$('#acsaddress2').val(obj[0].address2);
    	$('#acscity').val(obj[0].city);
    	$('#acsstate').val(obj[0].state);
    	$('#acszipcode').val(obj[0].zipcode);
   	})

    function getBillingInfo() {
	    tempTokenJSON = JSON.stringify(tempToken);
	   	authPostCall('http://api.fitstew.com/api/retrieveCustomer/',tempTokenJSON,'FFoZbUKW1jVjKfBmPEScaeoTJpIZb3ONYkgPA0Qwlti_d0tNBWxWK41aTHWfBMVF',function(obj) {
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
		    	$('#acbstate').attr('placeholder',obj[0].address_state);
		    	$('#acbzipcode').attr('placeholder',obj[0].address_zip);
		    	$('#acbcard').attr('placeholder','xxxxxxxxxxxx' + obj[0].ccard);
		    	$('#acbcvc').attr('placeholder','xxx');
		    	$('#acbexpmonth').attr('placeholder',obj[0].exp_month);
		    	$('#acbexpyear').attr('placeholder',obj[0].exp_year);
		    	$('#acbcard').data('cToken', obj[0].cuToken);
		    }
	   	})
	}
});