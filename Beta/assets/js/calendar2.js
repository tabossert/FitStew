var schedjson = jQuery.parseJSON('[{"id": 385,"gymid": 22,"name": "Golds","classid": 21,"service": "Yoga", "image": "golds.jpg","duration": 30,"datetime": "2013-02-26T16:15:00.000Z"}]');



function buildSchedule(wkNum) {
	var week = moment().add('weeks', wkNum)
	var today = moment(week).format("MMMM YYYY");
	var daysinweek = 7;
	var dayCount = 8;
	var daysCount = 0;
	var dayofweek = moment(week).format('d');
	var prevCount = moment(week).subtract('days', 1).format('d');
	var sdayofweek = moment(week).subtract('days', dayofweek-1).format("YYYY-MM-DD");
	var edayofweek = moment(sdayofweek).add('days', 7).format("YYYY-MM-DD");
	var days = 0;

	while(prevCount > 0) {
		dates.push(moment(week).subtract('days', prevCount).format('YYYY-MM-DD'));
		prevCount = prevCount-1;
	}

	while(dates.length <= daysinweek) 
	{
		dates.push(moment(week).add('days', daysCount).format('YYYY-MM-DD'));
		daysCount++;
	}

	var dayNames = new Array("Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday");

	for(var d = 0;d < daysinweek;d++)
	{
		$('#s' + dayNames[d]).children('.dayNum')
		$.each(schedjson, function(key, value) {
			console.log(value.service);
			if(moment(value.datetime).format('YYYY-MM-DD') == sdayofweek) {
				$('#s' + dayNames[d]).children('.eventCont').append('<div class="event"><div class="schTime">' + moment(value.datetime).format('hh:mm') + '</div><div class="schImages"><img src="' + value.gymImage + '"><img src="' + value.image + '"></div><div class="row-fluid"><div class="schName">' + value.service + '</div></div>');
			}
		});
		moment(sdayofweek).add('days', 1);
	}
}







$(function(){
	var wkNum = 0;
	byWeek(wkNum);

	var forbut = $("#next");
	var prevbut = $("#previous");

	forbut.addClass("clickable");
	forbut.click(
		function() {
			wkNum++;
			byWeek(wkNum);
			initMenu();
		}
	)
	prevbut.addClass("clickable");
	prevbut.click(
		function() {
			wkNum = wkNum-1;
			byWeek(wkNum);
			initMenu();
		}
	)
});