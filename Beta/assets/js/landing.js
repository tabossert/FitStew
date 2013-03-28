
if(localStorage['uToken'] && localStorage['fitTime'] > moment().subtract('minutes', 30).unix()) {

	window.location = "http://localhost/Beta/myPanel";
}

$(document).ready(function(){
});