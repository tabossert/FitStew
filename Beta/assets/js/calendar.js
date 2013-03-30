var schedjson = jQuery.parseJSON('[{"id": 385,"name": "Golds","classid": 21,"service": "Yoga", "image": "golds.jpg","duration": 30,"datetime": "2013-02-26T16:15:00.000Z"},{"id": 385,"name": "Srilanka","classid": 21,"service": "Yoga", "image": "golds.jpg","duration": 30,"datetime": "2013-02-26T18:00:00.000Z"},{"id": 385,"name": "Srilanka","classid": 21,"service": "Yoga", "image": "golds.jpg","duration": 30,"datetime": "2013-02-26T19:30:00.000Z"},{"id": 385,"name": "Srilanka","classid": 21,"service": "Yoga", "image": "golds.jpg","duration": 30,"datetime": "2013-02-26T21:00:00.000Z"},{"id": 385,"name": "Srilanka","classid": 21,"service": "Yoga", "image": "golds.jpg","duration": 30,"datetime": "2013-02-26T22:00:00.000Z"}]');



function byWeek(wkNum) {
	var week = moment().add('weeks', wkNum)
	var today = moment(week).format("MMMM YYYY");
	var daysinweek = 6;
	var dayCount = 8;
	var daysCount = 0;
	var dayofweek = moment(week).format('d');
	var prevCount = moment(week).subtract('days', 1).format('d');
	var sdayofweek = moment(week).subtract('days', dayofweek-1).format("YYYY-MM-DD HH:mm");
	var edayofweek = moment(sdayofweek).add('days', 7).format("YYYY-MM-DD HH:mm");
	var days = 0;
	var dates = new Array();
	

	while(prevCount > 0) {
		dates.push(moment(week).subtract('days', prevCount).format('YYYY-MM-DD'));
		prevCount = prevCount-1;
	}

	while(dates.length <= daysinweek) 
	{
		dates.push(moment(week).add('days', daysCount).format('YYYY-MM-DD'));
		daysCount++;
	}
	console.log(dates);
	$('#calcat').empty();
	$('#daycal').empty();


	var tags = "";
	var gymTag = document.createElement("div");

	document.getElementById('calcat').innerHTML = tags;
	document.getElementById('calDate').innerHTML = today;

	for(var d = 0;d < dates.length;d++)
	{
		if(dayCount < 8)
		{
			var dayNum = moment(dates[d]).format('DD');
			var divTag = document.createElement("div");
			divTag.id = dayNum;
			divTag.className = "dayp";
			document.getElementById('week').appendChild(divTag);
			var dayTag = document.createElement("div");
			a = "bar";
			b = a.concat(dayNum);
			dayTag.id = b
			dayTag.className = "daybar";
			dayTag.innerHTML = dayNum;
			document.getElementById(dayNum).appendChild(dayTag);
			dayCount++;
			/*var dotTag = document.createElement("div");
			dotTag.className = "dots";
			dotTag.innerHTML = '<ul><li></li><li></li></ul>';
			document.getElementById(b).appendChild(dotTag);*/
			var slideTag = document.createElement("div");
			slideTag.className = "copen";
			var slide = "<ul>";
			$.each(schedjson, function(key, value) {
				console.log(value.service);
				if(moment(value.datetime).format('YYYY-MM-DD') == dates[d]) {
					slide = slide.concat('<li class="schedBox" data-gid="" data-cid=""><div id="eventTime" class="eventInfo">' + moment(value.datetime).format('h:mmA') + '</div><div id="eventImg"><img src="img/' + value.image + '"></div><div id="eventName" class="eventInfo">' + value.service + '</li>');
				}
			});
			slide = slide.concat('</ul>');
			slideTag.innerHTML = slide;
			document.getElementById(b).appendChild(slideTag);
		} else {
			dayCount = 1;
			var divTag = document.createElement("div");
			divTag.id = 'week';
			divTag.className = 'week';
			document.getElementById("daycal").appendChild(divTag);
			d = d-1;
		}
	}
	var l = "bar";
	/*if(moment(week).format("MMMM YYYY") == moment().format("MMMM YYYY")) {
		var p = l.concat(moment().format('D'));
		document.getElementById(p).style.backgroundColor='blue';
	}*/
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