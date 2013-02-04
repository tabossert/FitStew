

$(function(){
	var cal = moment().calendar();
	var today = moment().format("MMMM YYYY");
	var daysinmonth = moment(today, "YYYY-MM").daysInMonth();
	var dayofweek = moment().startOf('month').format('d') - 1;
	var prevDays = 0;
	var curDays = 1;
	var futDays = 1;
	var lastMonth = moment(today).subtract('months', 1).daysInMonth();
	var dates = new Array();
	if(dayofweek > 0) {
		prevDays = moment(today).subtract('days', dayofweek).format('DD');
		while(prevDays <= lastMonth) 
		{
			dates.push(prevDays);
			prevDays++;
		}
	}
	while(curDays <= daysinmonth)
	{
		dates.push(curDays);
		curDays++;
	}
	while(dates.length <= 35)
	{
		dates.push(futDays);
		futDays++;
	}
	alert(dates);
	var d = 0;

	while(d < dates.length)
	{
		
	}
	document.getElementById('calDate').innerHTML = today;
});