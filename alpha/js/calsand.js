
$(document).ready(function(){

	$('#timeBlock').hide();

	$('#timebox').on('mouseenter', function(){
		$('#eventCircles').hide();
		$("#timebox").animate({height:"300px"}, function() {
			$('#timeBlock').show();
		});
	});
	$('#timebox').on('mouseleave', function(){
		$('#timeBlock').hide();
		$("#timebox").animate({height:"50px"}, function() {
			$('#eventCircles').show();
		});
	});
});