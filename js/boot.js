var token = "";
var SITE_URL = "http://tbossert.zunefit.com/";
var API_URL = 'http://tbossert.zunefit.com/api/';

function apiCall(url,verb,data)
{
        return $.ajax(
              { beforeSend: function(xhrObj) {
                    xhrObj.setRequestHeader("token", token);
		    xhrObj.setRequestHeader("ltype", "web");
              },
              type: verb,
			  
	      dataType: 'json',
              data: data,
              url: API_URL + url,
              success: function(response){
		} 
  });
}


function users()
{
  window.location = SITE_URL + "examples.php?loginType=user";
}


function gyms()
{
  window.location = SITE_URL + "examples.php?loginType=gym";
}


function getBalance()
{
        var response = apiCall('balance/','GET','');
        response.success(function(data) {
              $.each(data, function(index, value){
                        document.getElementById('balanceBox').innerHTML = "$" + value.balance;
                });
        });
}


function getUserPref()
{
        var response = apiCall('userPreferences/','GET','');
        response.success(function(data) {
              $.each(data, function(index, value){
                        document.getElementById('email').value = value.email;
                        document.getElementById('firstName').value = value.first_name;
                        document.getElementById('lastName').value = value.last_name;
                        document.getElementById('address').value = value.address;
                        document.getElementById('city').value = value.city;
                        document.getElementById('state').value = value.state;
                        document.getElementById('zipcode').value = value.zipcode;

                });
        });
}


function updateUserPref()
{
        var email = document.getElementById('email').value;
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value
        var address = document.getElementById('address').value;
        var city = document.getElementById('city').value;
        var state = document.getElementById('state').value;
        var zipcode = document.getElementById('zipcode').value;
        var data = {"email": email, "first_name": firstName, "last_name": lastName, "address": address, "city": city, "state": state, "zipcode": zipcode};
        var response = apiCall('updateUserPreferences/','POST',data);
        response.success(function(data) {

        });
}


function gymSearch(){
	var zip = document.getElementById('gymzipcode').value;
	var state = document.getElementById('gymstate').value;
        var response = apiCall('gymSearch/zipcode/'+zip+'/'+state,'GET','');
        response.success(function(data) {
	  var gch = "<ol>";
	  $.each(data, function(index, value){
            gch += "<li>"+value.name+"<button onclick=\"gymInfo("+value.id+");\">Gym Info</button><button onclick=\"getClasses("+value.id+");\">Gym Classes</button></li>";
	   });
	   gch += "</ol>";
	   document.getElementById('gymsBox').innerHTML = gch; 
	});
       
}


function featuredGyms(){
	var response = apiCall('featuredGyms/','GET','');
	response.success(function(data) {
	  var gch = '<ul class="item-link">';
	  $.each(data, function(index, value){
	    gch += '<li><a href="#">'+value.name+'</a></li>';
	  });	
	  gch += '</ul';
	  document.getElementById('featuredGymsBox').innerHTML = gch;
	});
}

function gymInfo(id){
          var response = apiCall('gymInfo/'+id,'GET',''); 
 	  response.success(function(data) {
          var gch = "<ol>";
          $.each(data, function(index, value){            
           	gch += "<li>"+value.id+"</li><li>"+value.name+"</li><li>"+value.address+" "+value.city+" "+value.state+" "+value.zipcode+"</li><li>"+value.phone+"</li><li>"+value.email+"</li><li>"+value.contact+"</li>";
		});
           gch += "</ol>";
           document.getElementById('gymInfoBox').innerHTML = gch;    
        });

}


function getClasses(gid){
 var response = apiCall('getClasses/'+gid,'GET','');
 response.success(function(data) {
          var cch = "<ol>";
          $.each(data, function(index, value){
            cch += "<li>Class: "+value.service+"  price: "+value.price+"  date: " +value.date+"  time: "+value.time+"<button onclick=\"addEvent("+value.gymid+","+value.id+","+value.price+");\">Add To Schedule</button></li>";
           });
           cch += "</ol>";
           document.getElementById('classesBox').innerHTML = cch;
        });



}



function getSchedule(sdate,edate)
{
	data = {"start": sdate, "end": edate};
        var response = apiCall('userSchedule/','POST',data);
        response.success(function(data) {
	      var sch = '<div><div class="calender1"><a id="day" href="#"><img src="images/calender_img1.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />DAY</div><div class="calender2"><a id= "week" href="#"><img src="images/calender_img2.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />WEEK</div><div class="clr"></div></div><div style=" margin:15px 0px 0px 0px; border-top:1px solid #769196; height:1px;"></div><div class="inner-txt">';
	      var prevDate = "";
              $.each(data, function(index, value){
		if(prevDate != value.date)
		{
		  if(prevDate == "") {
		    sch+= '<h1>'+value.date+'</h1>';
		    sch+= '<ul class="calendar-link">';
		  } else {
		    sch+= '</ul>';
		    sch+= '<h1>'+value.date+'</h1>';
		    sch+= '<ul class="calendar-link">';
		  } 
                }
		sch += "<li><a href='"+API_URL+"getClass/"+value.classid+"'>"+value.time+" "+value.service+"</a><button onclick=\"deleteEvent("+value.id+");\">Delete Event</button></li>";		
		 });
		sch += "</ul>";
	      document.getElementById('infoBox').innerHTML = sch;
        });
}


function addEvent(gymid,classid,price){
  var data = {"gymid": gymid, "classid": classid, "price": price};
  var response = apiCall('addEvent/','POST',data);
  response.success(function(data) {
    getSchedule();
  });

}


function deleteEvent(id){
	var data = {"sid": id};
	var response = apiCall('deleteEvent/','DELETE',data)
	response.success(function(res) {
	  getSchedule();
	});
}

function signout(){
  window.location = SITE_URL+"/pages/logout.php";
}


function setToken(stoken){
  token = stoken; 
}


function gymUsers(gymid){
   var response = apiCall('addGymUser/','GET','');
   response.success(function(data) {
     
  });
}

function addGymUser(){
  var username = document.getElementById('username').value;
  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById('lastName').value;
  var group = document.getElementById('group').value;
  var data = {"username": username, "firstName": firstName, "lastName": lastName, "group": group};
  var response = apiCall('addGymUser/','POST',data);
  response.success(function(data) {
    
  });
}


function gymBalance(){
  var response = apiCall('gymBalance/','GET','');
  response.success(function(data) {
      $.each(data, function(index, value){
        document.getElementById('balanceBox').innerHTML = "$" + value.balance;
      });
  });
}


function gymDisbursement(){
  var response = apiCall('disbursement/','GET','');
  response.success(function(data) {
      $.each(data, function(index, value){
        if(value.type == 1){
          type = "check";
        }
        document.getElementById('disbursementBox').innerHTML = type + "  Paylimit: " + value.paylimit;
      });
  });
}


function updateDisbursement(){
  var type = document.getElementById('type').value;
  var paylimit = document.getElementById('paylimit').value
  var data = {"type": type, "paylimit": paylimit};
  var response = apiCall('updateDisbursement/','POST',data);
  response.success(function(data) {
        gymDisbursement();
  });
}


function gymClasses(gid)
{
        var response = apiCall('getClasses/'+gid,'GET','');
        response.success(function(data) {
        var ccs = '<select name="classSelect" id="classSelect" onchange="selectClass();">';
        var cch = "<ol>";
        ccs += '<option value=""></option>';
              $.each(data, function(index, value){
    cch += "<li>"+value.service+" "+value.price+" "+value.date+" "+value.time+"<button onclick=\"deleteClass("+value.id+");\">Delete Class</button></li>";   
    ccs += '<option value="'+value.id+'">'+value.service+'</option>';
     });
    cch += "</ol>";
    ccs += "</select>"
        document.getElementById('classesBox').innerHTML = cch;
        document.getElementById('classesSelectBox').innerHTML = ccs;
        });
        

}


function selectClass(cid)
{
  var cid = document.getElementById('classSelect').value;
  var response = apiCall('getClass/'+cid,'GET','');
  response.success(function(data) {
    $.each(data, function(index, value){
    document.getElementById('idUpdate').value = value.id;
    document.getElementById('serviceUpdate').value = value.service;
    document.getElementById('priceUpdate').value = value.price;
    document.getElementById('dateUpdate').value = value.date;
    document.getElementById('timeUpdate').value = value.time;
    }); 
  });
}


function addClass(gid){
  var service = document.getElementById('serviceUpdate').value;
  var price = document.getElementById('priceUpdate').value;
  var dateTime = Date.parse(document.getElementById('dateUpdate').value + " " + document.getElementById('timeUpdate').value);
  var convDateTime = dateTime.toString('yyyy-MM-dd HH:mm:ss');
  var data = {"service": service, "price": price, "datetime": convDateTime};
  var response = apiCall('addClass/','POST',data);
  response.success(function(data) {
        gymClasses(gid);
  });
}


function updateClass(gid){
  var classid = document.getElementById('idUpdate').value;
  var service = document.getElementById('serviceUpdate').value;
  var price = document.getElementById('priceUpdate').value;
  var dateTime = Date.parse(document.getElementById('dateUpdate').value + " " + document.getElementById('timeUpdate').value);
  var convDateTime = dateTime.toString('yyyy-MM-dd HH:mm:ss');
  var data = {"classid": classid, "service": service, "price": price, "datetime": convDateTime};
  var response = apiCall('updateClass/','POST',data);
  response.success(function(data) {
        gymClasses(gid);
  });
}


function deleteClass(id){
  var data = {"classid": id};
  var response = apiCall('deleteClass/','DELETE',data)
  response.success(function(res) {
    gymClasses();
  });
}


function gymSchedule()
{
        var redeem = "";
        data = {"start": "2011-01-01 00:00:00", "end": "2013-01-01 00:00:00"};
        var response = apiCall('gymSchedule/','POST',data);
        response.success(function(data) {
        var sch = "<ol>";
              $.each(data, function(index, value){
                if(value.redeemed == true)
                {
                    redeem = "redeemed";
                } else { redeem = "not redeemed";}
    sch += "<li>"+value.first_name+" "+value.last_name+" "+value.service+" "+value.date+" "+value.time+"<button onclick=\"redeem("+value.sid+");\">Redeem</button>"+redeem+"</li>";    
     });
    sch += "</ol>";
        document.getElementById('gymScheduleBox').innerHTML = sch;
        });
}


function redeem(sid)
{
  var data = {"sid": sid};
  var response = apiCall('redeemed/','POST',data);
  response.success(function(data) {
    gymSchedule();
  });
}
function getGymStat()
{
        var response = apiCall('gymStats/','GET','');
        response.success(function(data) {
                 $.each(data, function(index, value){
                   alert(value);
               });
        });
}

function addUserGym()
{
        var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value
        var gymname = document.getElementById('gymname').value;
        var data = {"username": username,"password":password,"name":gymname,"firstname": firstName, "lastname": lastName};
		alert("username:"+username);
		alert("password:"+password);
		alert("firstName:"+firstName);
		alert("lastName:"+lastName);
		alert("gymname:"+gymname);
        var response = apiCall('addGym/','POST',data);
        response.success(function(data) {
          alert(data);
        });
}

function gymAdvancedSearch(){
	var address = document.getElementById('address').value;
	 var data = {"address": '"'+address+'"',"maxdistance":'"'+100+'"',"rate":'"'+20+'"',"workouts":""};
        var response = apiCall('gymSearchAdvanced/','post',data);
        response.success(function(data) {
	//  var gch = "<ol>";
	 // $.each(data, function(index, value){
       //     gch += "<li>"+value.name+"<button onclick=\"gymInfo("+value.id+");\">Gym Info</button><button onclick=\"getClasses("+value.id+");\">Gym Classes</button></li>";
	   //});
	   //gch += "</ol>";
	   //document.getElementById('gymsBox').innerHTML = gch; 
	alert(data);
	});
       
}