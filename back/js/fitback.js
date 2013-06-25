(function ($) {
	/*sendAuthentication = function (xhr) {
	  var token = "5L7VPPmFunIrQ8GCDVG30N5dcJ_f9j4Hgqm28PjVqOkqzLuEVvjg-U_6PU4VoLL4";
	  var ltype = "web",
	  //xhr.setRequestHeader('token', token);
	  //xhr.setRequestHeader('ltype', ltype);
	}*/


	var searchModel = Backbone.Model.extend({
        urlRoot: 'http://api.zunefit.com:81/api/gymSearchAdvanced/'
    });

	var search = new searchModel({address: "94596", maxDistance: "100", rate: "100"});

	search.fetch({
	  success: function (search) {
	  	console.log(search.toJSON());
	  }
	})
}) (jQuery);