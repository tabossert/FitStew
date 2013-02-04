$(document).ready(function(){
    $('#sched').hide();
    
   var slide = $("#searchCG");
   slide.addClass("clickable");
	slide.click(
		function() {
			$('#sched').slideDown('slow');
			byWeek(wkNum,'search');
		}
	);
	var close = $("#close");
    close.addClass("clickable");
	 close.click(
		function() {
			$('#sched').slideUp('slow');
		}
	)
	
	$("#fund").click(function(e){
		//do something
		newAlert('success', 'Funding Successful!');
		e.preventDefault();
	});
		
	function newAlert (type, message) {
	    $("#alert-area").append($("<div class='alert alert-" + type + " fade in' data-alert><p> " + message + " </p></div>"));
	    $(".alert").delay(2000).fadeOut("slow", function () { $(this).remove(); });
	}
	
	var ul = $('#sidebar > ul');
	
	$('input[rel=tooltip]').tooltip();
	
		// === Resize window related === //
	$(window).resize(function()
	{
		if($(window).width() > 479)
		{
			ul.css({'display':'block'});	
			$('#content-header .btn-group').css({width:'auto'});		
		}
		if($(window).width() < 479)
		{
			ul.css({'display':'none'});
			fix_position();
		}
		if($(window).width() > 768)
		{
			$('#user-nav > ul').css({width:'auto',margin:'0'});
            $('#content-header .btn-group').css({width:'auto'});
		}
	});
	
	if($(window).width() < 468)
	{
		ul.css({'display':'none'});
		fix_position();
	}
	if($(window).width() > 479)
	{
	   $('#content-header .btn-group').css({width:'auto'});
		ul.css({'display':'block'});
	}
	
	// === Tooltips === //
	$('.tip').tooltip();	
	$('.tip-left').tooltip({ placement: 'left' });	
	$('.tip-right').tooltip({ placement: 'right' });	
	$('.tip-top').tooltip({ placement: 'top' });	
	$('.tip-bottom').tooltip({ placement: 'bottom' });	
	
	// === Search input typeahead === //
	$('#classes').typeahead({
		source: ['Karate','Kick Boxing','Yoga'],
		items: 4
	});

	
	// === Fixes the position of buttons group in content header and top user navigation === //
	function fix_position()
	{
		var uwidth = $('#user-nav > ul').width();
		$('#user-nav > ul').css({width:uwidth,'margin-left':'-' + uwidth / 2 + 'px'});
        
        var cwidth = $('#content-header .btn-group').width();
        $('#content-header .btn-group').css({width:cwidth,'margin-left':'-' + uwidth / 2 + 'px'});
	}
    
    function formsBox() {
		$('.formbox').on('mouseenter', function(){
			$(".formbox").fancybox({
				maxWidth	: 600,
				maxheight	: 500,
				margin		: 0,
				padding		: 0,
				scrolling	: 'no',
				autoDimensions	:	false,
				arrows		: false,
				fitToView	: false,
				width		: '85%',
				height		: '90%',
				autoSize	: false,
				closeClick	: false,
				openEffect	: 'none',
				closeEffect	: 'none'
			});
		});
	}
	formsBox();
});