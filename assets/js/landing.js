var url = "http://localhost"

if(localStorage['uToken'] && localStorage['fitTime'] > moment().subtract('minutes', 30).unix()) {

	window.location = url + "/Beta/myPanel";
}

$(document).ready(function(){
});