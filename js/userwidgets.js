/* 
 * Implementation of the widgets and their functionalities
 */

//Configuration parameters

//var ZUNEFIT_BASE_URL = "https://api.zunefit.com/api/";

//Janrain API instance

var ZUNEFIT = new ZuneFit({
    url:ZUNEFIT_BASE_URL,
    start:function(){
        startAjax();
    },
    end:function(){
        endAjax();
    }
});

//Loading widgets
$(function(){
    this.widgets = new Widgets();
    this.widgets.init();
});  

/**
 *This function is calling when the ajax call is started
 */
var startAjax = function()
{
   
    div = $("#waiting");
    div.css({
        //top:(screen.height + $(document).scrollTop() - 100),
        bottom:10,
        right:10,
        position:'fixed'
    });
    div.show();
}

/**
 *This function is calling when the ajax call is end
 */
var endAjax = function()
{
    div = $("#waiting");
    div.hide();
    div.removeAttr("style");
}



var Widgets = function()
{
    /**
     * Initialize the widgets
     */
    this.init = function()
    {
       
        this.user = new User();
        this.user.bind();
       
    }
    
    
}





var User = function()
{
    this.init = function()
    {
        this.bind();
    }
    
    this.bind = function()
    { 
        
      
        this.getFeaturedGyms();
        this.getUserBalance();
        
        this.slider();
        this.getUserPreferences();
        this.getFeaturedWorkots();
        this.getDate();
       
        
        // this.deleteEvent();
        this.getUserWeekSchedule();
        //   this.getcrediDetails();
        
        this.enter();
    //this.test();
       
       
        
    }
    this.gymView = function()
    {
        data = {};
        data['gymid']=22;
        ZUNEFIT.postJSON({
            url:'gymView/',
            data:data,
            token : $('#utoken').val(),
          
            success:function(response){
                  
            },
            error:function(){
            
            }
            
        });
        
    }    
    this.pref_det = function()
    {
        if($('#pref_det').is(':checked')){
            if($( "#pref_lastName" ).val().length != 0 && $( "#pref_lastName" ).val() != null){
                $( "#first_name" ).val($( "#pref_firstName" ).val()+" "+$( "#pref_lastName" ).val());
                $( "#address_1" ).val($( "#pref_address" ).val());
                $( "#address_2" ).val($( "#pref_address2" ).val());
                $( "#city" ).val($( "#pref_city" ).val());
                $( "#state" ).val($( "#pref_state" ).val());
                $( "#zip" ).val($( "#pref_zip" ).val());
             
            
            }else{
                $.fx.speeds._default = 1000;
            
                $( "#dialog-fill" ).dialog({
                    autoOpen: false,
                    show: "blind",
                    hide: "explode"
                });
            
                $( "#dialog-fill" ).dialog( "open" );               
           
            }
        }else{
            this.getUserPreferences();
        }
    }
    
    this.getDate = function()
    {
        $(function() {
            $( ".datepicker" ).datepicker({
                showOn: "button",
                buttonImage:"jqueryui/images/calander.png",
                buttonImageOnly: true
            });
        });
    }
    
    this.slider = function()
    {
        $(function() {
            $( "#slider-range-min" ).slider({
                range: "min",
                value: 100,
                min: 1,
                max: 500,
                slide: function( event, ui ) {
                    $( "#amounts" ).val( "Maximum Cost $" + ui.value );
                    $( "#amount" ).css( "display","none" );
                    $( "#amounts" ).css( "display","block" );
                }
            });
            $( "#amounts, #amount" ).val( "Maximum Cost $100" );
        });
    }
    
    
    
    
    this.getFeaturedGyms = function()
    
    {
        $("a.light").live("click", function(event) {
            event.preventDefault();
            $(this).filter(':not(.fb)').fancybox()
            .addClass('fb');
            $(this).triggerHandler('click');
        });
        ZUNEFIT.getJSON({
            url:'featuredGyms/',
            success:function(data){
                try{
                    result4 = eval(data);
                    op="<ul>";
                    finish = 5;
                    if(result4.length < 5 ){
                        finish = result4.length
                    }
                    for(i=0;i<finish;i++)
                    {       
                        op += "<li onclick='widgets.user.getInfo("+result4[i].id+")'><a href = '#lightbox' class='light' >"+result4[i].name+"</a></li>";
                    }
                    op +="</ul>";
                    $("#featuredGymsBox").html(op);
                }catch(e){
                    
                }
            },
            error:function(){
            //Error should be handle here
            }
        });
    }
    
    this.getUserBalance = function()
    {        
        data = {};          
        ZUNEFIT.getJSON({
            url:'balance/',
            data: data,
            token : $('#utoken').val(),
            success:function(response){
                try{
                    result5 = eval(response)[0];                
                    res = result5.balance;
                   
                    $(".balance-box").html("Balance: $ "+  res);
                }catch(e){
                   
                }
            },
            error:function(){
            //Error should be handle here
            
           
            }
        });
    }
    
    this.getUserPreferences = function()
    {
        data = {};
       
        ZUNEFIT.getJSON({
            url:'userPreferences/',
            token : $('#utoken').val(),
            success:function(data){
                try{
                    result6 = eval(data)[0];                
                
                    $("#pref_email").val(result6.email);
                
                    $("#pref_firstName").val(result6.first_name);
               
               
                    $("#pref_lastName").val(result6.last_name);
                    $("#pref_phone").val(result6.phone);
               
                    $("#pref_address").val(result6.address);
                    $("#pref_address2").val(result6.address2);
                    $("#pref_city").val(result6.city);
              
                    $("#pref_state").val(result6.state);
                    $("#pref_zip").val(result6.zipcode);
                    $("#auto_amount").val(result6.refillamount);
                    $("#when").val(result6.minamount);
                    if(result6.automatic==1){
                        $('#refil').prop('checked', true);
                    }
                    if(result6.cToken!='NULL'){
                        datas = {};
                        datas['cusToken'] = result6.cToken.replace("'","").replace("'", "");
                      
                        startAjax();
      
                        $.ajax({
                            type: 'POST',
                            url: "cus_retrieve.php",
                            data: datas,
           
                            success: function(responses){
                                endAjax();
                                $("#first_name").val(responses.name);
                                $("#address_1").val(responses.add1);
                                $("#address_2").val(responses.add2);
                                $("#city").val(responses.city);
                                $("#state").val(responses.state);
                                $("#zip").val(responses.zip);
               
                                $('.card-number').val("xxxxxxxxxxxx"+responses.last4);
                                $('.card-cvc').val("xxx");
                                $('.card-expiry-month').val(responses.month);
                                $('.card-expiry-year').val(responses.year);
                
                                    
                            }
                        });
                     
                    }
                 
                //  $('#pref_state').dropkick();
                }catch(e){
                    
                }
                
                
                
            },
            error:function(){
            //Error should be handle here
            
           
            }
        });
    }
    this.loadLeft = function(id)
    {
        $('#schedule-tab').addClass('selected');
        
        var div = [];
        div[0]='#infoBox';
        div[1]='#searchbox';
        div[2]='#preferences';
        var li = [];
        li[0]='#schedule-tab';
        li[1]='#gymsearch-tab';
        li[2]='#Preferences-tab';
        for(i=0;i<3;i++){
            if(i==id){
                $(div[i]).css('display', 'block');
                $(li[i]).addClass('selected');
            }
            else{
                $(div[i]).css('display', 'none');
                $(li[i]).removeClass('selected');
            }
        }
    }
    
    this.search = function(id)
    {
       
        var div = [];
        div[0]='#search';
        div[1]='#advSearch';
        
        var nav1 = [];
        nav1[0]='.nav1';
        nav1[1]='.nav2';
        
        
        for(i=0;i<2;i++){
            if(i==id){
                $(div[i]).css('display', 'block');
             
                $(nav1[i] ).css('background-color', '#8b8b8b');
                
                
            }
            else{
                $(div[i]).css('display', 'none');
              
                $(nav1[i] ).css('background-color', 'transparent');
                
            }
        }
    }
    
    this.preferencesBilling = function(id)
    {
        var div = [];
        div[0]='#preference';
        div[1]='#billing';
        var nav2 = [];
        nav2[0]='.nav3';
        nav2[1]='.nav4';
        
        for(i=0;i<2;i++){
            if(i==id){
                $(div[i]).css('display', 'block');
                $(nav2[i] ).css('background-color', '#8b8b8b');
            }
            else{
                $(div[i]).css('display', 'none');
                $(nav2[i] ).css('background-color', 'transparent');
            }
        }
    }
    
    this.loadBox = function(id)
    {
        var div = [];
        div[0]='#box-description';
        div[1]='#box-Schedule';
      
        div[2]='#box-Services';
        
        for(i=0;i<3;i++){
            if(i==id)
                $(div[i]).css('display', 'block');
            else
                $(div[i]).css('display', 'none');
        }
    }
    
    this.reoccur = function()
    {
       
        if ($('#reoccuring').is(':checked')) {
            $('#occur').removeAttr('disabled');
        } else {
            $('#occur').attr('disabled', 'disabled');
        }
   
    }
    
    
    this.getUserDaySchedule = function()
    {
        var d = new Date();
     
        
        fday = (d.getUTCDate() < 10) ? '0'+d.getUTCDate() : d.getUTCDate() ;
        var strDate = d.getUTCFullYear() + "-" + (d.getUTCMonth()+1) + "-" + fday;
        this.getUserSchedule(strDate+" 00:00:00", strDate+" 24:00:00");
        
        $(".inner-calender1").addClass('selectedCal');
        $(".inner-calender2, .inner-calender3").removeClass('selectedCal');
    }
    
    this.getUserWeekSchedule = function()
    {
        var curr = new Date; 
        var first = curr.getDate() - curr.getDay(); 
        var last = first + 6; 

        var firstday = new Date(curr.setDate(first));
        fday = (firstday.getUTCDate() < 10) ? '0'+firstday.getUTCDate() : firstday.getUTCDate() ;
        var lastday = new Date(curr.setDate(last));
        lday = (lastday.getUTCDate() < 10) ? '0'+lastday.getUTCDate() : lastday.getUTCDate() ;
        var startDate = firstday.getUTCFullYear() + "-" + (firstday.getUTCMonth()+1) + "-" + fday;
        var endDate = lastday.getUTCFullYear() + "-" + (lastday.getUTCMonth()+1) + "-" + lday;
        
        this.getUserSchedule(startDate+" 00:00:00", endDate+" 24:00:00");
       
        $(".inner-calender2").addClass('selectedCal');
        $(".inner-calender1, .inner-calender3").removeClass('selectedCal');
    }
    
    this.getUserMonthSchedule = function()
    {
        var mon= new Date();
        
        var firstDay = new Date(mon.getFullYear(), mon.getMonth() , 1);
        fday = (firstDay.getUTCDate() < 10) ? '0'+firstDay.getUTCDate() : firstDay.getUTCDate() ;
        var firstDate = firstDay.getUTCFullYear() + "-" + (firstDay.getUTCMonth()+1) + "-" + fday;
        
        var lastDay = new Date(mon.getFullYear(), mon.getMonth() + 1, 1);
        lday = (lastDay.getUTCDate() < 10) ? '0'+lastDay.getUTCDate() : lastDay.getUTCDate() ;
        var lastDate = lastDay.getUTCFullYear() + "-" + (lastDay.getUTCMonth()+1) + "-" + lday;
        
        this.getUserSchedule(firstDate+" 00:00:00", lastDate+" 24:00:00");
        $(".inner-calender3").addClass('selectedCal');
        $(".inner-calender2, .inner-calender1").removeClass('selectedCal');
    }
    
    this.getUserSchedule = function(start,end)
    {
        
        data = {};
        data['start'] = start;
        data['end'] = end;
        
        
        ZUNEFIT.postJSON({
            url:'userSchedule/',
            data:data,
            token : $('#utoken').val(),
            success:function(response){
                $(".inner-txt").html(" ");
                
               
            
                try{
                    result7 = eval(response);
                    finish7 = result7.length;
                    date = "";
                    content = "";
                    for(i=0;i<finish7;i++){
                        
                        if(date == result7[i].date){
                            content += "<ul><li>"+result7[i].name+" - "+result7[i].service+"</li>";
                        }else{
                            if(i!=0){
                                content += "</ul>";
                            }                                
                            content += "<h1>"+result7[i].date+"</h1>";
                            content += "<ul><li>"+result7[i].name+" - "+result7[i].service+"</li>";
                            date = result7[i].date;
                        }
                        
                    }
                    $(".inner-txt").html(content);
                    
                    
                
                }catch(ex){
                   
                
                }       
            },
            error:function(){
            //Error should be handle here
           
            }
        });
    }
    
    this.getFeaturedWorkots = function()
    {
        
        ZUNEFIT.getJSON({
            url:'featuredWorkouts/',
            success:function(response){
                try{
                    result8 = eval(response);
               
                    op="<ul>";
                    finish = 5;
                    if(result8.length < 5 ){
                        finish = result8.length
                    }
               
                    for(i=0;i<finish;i++)
                    {       
                        var service = '"'+result8[i].service+'"';
                        $(".user-item-link").append("<li onclick='widgets.user.setKeyword("+service+")'><a href = '#' >"+result8[i].service+"</li>");
                    
                    }
                }catch(e){
                    
                }
                
            },
            error:function(){
            //Error should be handle here
            }
        });
    }
    this.setKeyword = function(workout)
    {
        this.loadLeft(1);
        $("#keyword").val(workout);
        $("#Miles").val('25');
        $("#Within").val($("#pref_zip").val());
        this.advancedSearch();
    }
        
   
    
    this.searchMe = function()
    {        
        // $("#divexample1").niceScroll();
        $("a.light").live("click", function(event) {
            event.preventDefault();
            $(this).filter(':not(.fb)').fancybox()
            .addClass('fb');
            $(this).triggerHandler('click');
        });        
        data = {};
        
        if($('.searchBy').val()=='name'){
            data['type'] = "name";
        }else if($('.searchBy').val()=='city'){
            data['type'] = "city";
        }else{
            data['type'] = "zipcode";
        }        
        data['value'] = $('#searchkey').val();
        data['state'] = $('#project').val();        
               
        $("#search-result").html("Waiting for results");
        ZUNEFIT.getJSON({
            url:'gymSearch/'+data['type']+'/'+data['value']+'/'+data['state'],                     
            success:function(response){
                try{
                    result9 = eval(response);
                    last=result9.length;
                    res = "<ul class='searchResult'>";
                    $("#search-result").html("No result Found");
                    if(last>0){
                        for(i=0;i<last;i++){
                            res += '<li onclick="widgets.user.getInfo('+result9[i].id+')"><a href = "#lightbox" class="light" >'+result9[i].name+'</a></li>';
                        }
                        res += "</ul>";
                        $("#search-result").html(res);
                    
                    }else{
                        $("#search-result").html("No result Found");
                    }
                }catch(e){                    
                }              
            },
            error:function(){            
                $("#search-result").html("No result Found");
            
            }
        });
       
    }
    
    
    
    this.phone_edit = function()
    {
        $("#pref_phone, #pref_pin, #pref_pin2").removeClass('transparent').addClass('round');
        $('#phone_edit').css("display","none");
        $('#phone_done').css("display","block");
        $("#pref_phone, #pref_pin, #pref_pin2").removeAttr('readonly');

    }
    this.phone_update = function()
    {
        if($('#pref_pin').val() != $('#pref_pin2').val() )
        {
            $('#pref_error').text('Please check your Pin code: the confirmation entry does not match.');
        }else{
            $("#pref_phone, #pref_pin, #pref_pin2").attr('readonly','readonly');
            $('#phone_done').css("display","none");
            $('#phone_edit').css("display","block");
            $("#pref_phone, #pref_pin, #pref_pin2").addClass('transparent').removeClass('round');
            data = {};
     
            data['phone'] = $('#pref_phone').val();
            data["pincode"] = Sha1.hash($('#pref_pin').val());
        
            ZUNEFIT.postJSON({
                url:'setPinCode/',
                data:data,
                token : $('#utoken').val(),
          
                success:function(response){
                    $('#pref_error').text(" ");
                },
                error:function(){
            
                }
            
            });
        }
    }
    this.edit = function()
    {
        $("#pref_firstName, #pref_lastName, #pref_address, #pref_address2, #pref_city, #pref_state, #pref_zip").removeClass('transparent').addClass('round');
        $('#edit').css("display","none");
        $('#done').css("display","block");
        $(" #pref_firstName, #pref_lastName, #pref_address, #pref_address2, #pref_city, #pref_state, #pref_zip").removeAttr('readonly');
        $("#pref_state").removeAttr('disabled');
    }
    this.update = function()
    {
        $("#pref_phone,  #pref_firstName, #pref_lastName, #pref_address, #pref_address2, #pref_city, #pref_zip").attr('readonly','readonly');
        $("#pref_state").attr('disabled','disabled');
        $('#done').css("display","none");
        $('#edit').css("display","block");
        $("#pref_firstName, #pref_lastName,  #pref_address, #pref_address2, #pref_city, #pref_state, #pref_zip").addClass('transparent').removeClass('round');
        data = {};
        data['first_name'] = $("#pref_firstName").val();
        data['last_name'] = $("#pref_lastName").val();
        data['address'] = $("#pref_address").val();
        data['address2'] = $("#pref_address2").val();
        data['email'] = $("#pref_email").val();        
        data['city'] = $("#pref_city").val();
        data['state'] = $("#pref_state").val();
        data['zipcode'] = $("#pref_zip").val();
      
        ZUNEFIT.postJSON({
            url:'updateUserPreferences/',
            data:data,
            token : $('#utoken').val(),          
            success:function(response){               
               
            },
            error:function(){
            //Error should be handle here            
            }            
        });
    }
    this.update_new = function()
    {                
        data = {};        
        data['first_name'] = $("#pref_firstName").val();
        data['last_name'] = $("#pref_lastName").val();     
        data['email'] = $("#pref_email").val();        
        data['address'] = $("#address_1").val();       
        data['address2'] = $("#address_2").val();        
        data['city'] = $("#city").val();
        data['state'] = $("#state").val();
        data['zipcode'] = $("#zip").val();
      
        ZUNEFIT.postJSON({
            url:'updateUserPreferences/',
            data:data,
            token : $('#utoken').val(),          
            success:function(response){               
               
            },
            error:function(){
            //Error should be handle here           
            }            
        });
    }
    
    this.addEvent = function(gid,cid,price)
    {       
        data = {};
        data['userid'] = $("#userid").val();
        data['gymid'] = gid;
        data['classid'] = cid;
        data['price'] = price;
        var date = '#'+cid+'date';
        var time = '#'+cid+'time'
       
        times = {};
        dates = {};
        times = $(time).val().split(':');    
        dates = $(date).val().split('-'); 
        
        year =  new Date(dates[0], dates[1]-1, dates[2], times[0], times[1], 00).getUTCFullYear();
        month =  new Date(dates[0], dates[1]-1, dates[2], times[0], times[1], 00).getUTCMonth();
        day =  new Date(dates[0], dates[1]-1, dates[2], times[0], times[1], 00).getUTCDate();
        hrs =  new Date(dates[0], dates[1]-1, dates[2], times[0], times[1], 00).getUTCHours();
        min = new Date(dates[0], dates[1]-1, dates[2], times[0], times[1], 00).getUTCMinutes();
                
           
        month = month < 10 ? '0'+(month+1) : (month+1) ; 
        day = day< 10 ? '0'+day : day ;
        min = min< 10 ? '0'+min : min ; 
        hrs = hrs< 10 ? '0'+hrs : hrs ;         
                
        data['datetime'] = year+"-"+month+"-"+day+" "+hrs+":"+min+":00";
        
        ZUNEFIT.postJSON({
            url:'addEvent/',
            data:data,
            token : $('#utoken').val(),
          
            success:function(response){
                if(response.message){ 
                    alert(response.message);
                //                    $( "#suc_err" ).html('response.message');   
                //                    setTimeout( $( "#suc_err" ).html(""), 1000);
                }                   
                else{
                    alert(response.status);
                //                    $( "#suc_err" ).html('response.status');   
                //                    setTimeout( $( "#suc_err" ).html(""), 1000);
                }                                
            },
            error:function(){
            //Error should be handle here           
            }            
        });
        this.getUserWeekSchedule();
        setTimeout(this.getUserBalance, 1000);
    }    
    this.deleteEvent = function()
    {       
        data = {};
        data['sid'] = 25;        
        
        $.ajax({
            type: 'DELETE',
            url: ZUNEFIT_BASE_URL+"deleteEvent/",
            data: data,
            beforeSend : function(xhrObj) {
                xhrObj.setRequestHeader("ltype", "web");            
                xhrObj.setRequestHeader("token", $('#utoken').val());            
            },
            success: function(response){
                result12 = eval(response)[0];
                alert(result12.status);           
            }
        });       
    }
    this.newSchedule = function()
    {       
        var d = new Date();       
        fday = (d.getUTCDate() < 10) ? '0'+d.getUTCDate() : d.getUTCDate() ;
        var strDate = d.getUTCFullYear() + "-" + (d.getUTCMonth()+1) + "-" + fday;
        
        data = {};
        data['start'] = strDate+" 00:00:00";  
        data['end'] = strDate+" 24:00:00";
        data['token'] = $('#utoken').val();
        
        var current_date = new Date();
  
        data['zone'] = -current_date.getTimezoneOffset() / 60;
        
        $.ajax({
            type: 'POST',
            url: "userSchedule.php",
            data: data,            
            success: function(response){
                //  response = eval(response);
                $("#table").html(response);      
            },
            error:function(){
                //Error should be handle here    
                alert('sdf');
            } 
        });       
    }
    this.newSchedules = function(start,end)
    {       
        var d = new Date();       
        fday = (d.getUTCDate() < 10) ? '0'+d.getUTCDate() : d.getUTCDate() ;
        var strDate = d.getUTCFullYear() + "-" + (d.getUTCMonth()+1) + "-" + fday;
        
        data = {};
        data['start'] = strDate+" 00:00:00";  
        data['end'] = strDate+" 24:00:00";
        data['token'] = $('#utoken').val();
        
        ZUNEFIT.postJSON({
            url:'userSchedule/',
            data:data,
            token : $('#utoken').val(),
            success:function(response){
                response = eval(response);
                
                
                
                
                for (i = 0; i < length; i++) {
                    time = substr(response[i].time, -2, 2) == 'AM' ? substr(response[i].time, 0, 5) : ((substr(response[i].time, 0, 2) + 12) + ':' + substr(response[i].time, 2, 2));


                    arrays[time] = response[i].service;
                    arraysi[i] = response[i].time;
                }
                asort(arrays, 'time');

                table = "<table class='newScheduleTable'>";

                hr = 00;
                mn = 00;
                fif = 0;
                for (i = 0; i < 24 * 4; i) {
                    one = FALSE;
                    if (fif == 0) {
                        for (j = 0; j < length; j++) {
                            a = hr + ':' + mn;
                            b = str_replace(array('AM', 'PM', ' '), '', arraysi[j]);

                            if (a == b) {
                                one = TRUE;
                                fif = (response[i].duration/ 15) - 1;
                                break;
                            }
                        }
                    } else {
                        --fif;
                        one = TRUE;
                        two = TRUE;
                    }
                    if (one) {
                        if (two) {
                            table +=  "<tr><td class='times'><span>" + hr + ":" + mn + "<span></td><td class='service'></td></tr>";
                            two = FALSE;
                        } else {
                            table += "<tr><td class='times'><span>" + hr + ":" + mn + "<span></td><td class='service'>" + response[i].service + "</td></tr>";
                        }
                    } else {
                        table += "<tr><td class='times'><span>" + hr + ":" + mn + "<span></td><td></td></tr>";
                    }
                    i++;
                    mn += 15;
                    mn = i % 4 == 0 ? 0 : mn;
                    hr = i % 4 == 0 ? hr + 1 : hr;
                }

                table += "</table>";
                $("#table").html(table);
            
                    
            },
            error:function(){
            //Error should be handle here
           
            }
        });
        
              
    }
    this.enter = function()
    {          
        $('#Miles, #Within, #keyword').keypress(function (e) 
        {
            if (e.which == 13) {       
                $("#searching").click();      
            }       
        });
        $("#pref_pin, #pref_zip, #zip, .card-number, .card-cvc, .card-expiry-month, .card-expiry-year").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, and enter
            if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
                // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
        });
        $("#pay_amount, #auto_amount, #when").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, and enter
            if ( (event.keyCode == 190 && event.shiftKey === false) || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
                // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
        });
    }    
    this.advancedSearch = function()
    { 
        $("a.light").live("click", function(event) {
            event.preventDefault();
            $(this).filter(':not(.fb)').fancybox()
            .addClass('fb');
            $(this).triggerHandler('click');
        });
        data = {}; 
      
        if($('#Within').val()!=""){
            data['address'] = $('#Within').val();
        }
        if($('#Miles').val()!=""){
            data['maxDistance'] = $('#Miles').val();
        }
        if($('#keyword').val()!=""){
            data['workouts'] = $('#keyword').val();
        }
        if($('#amounts').val()!=""){
            data['rate'] = $('#amounts').val().substr(14);
        }
        
        res = "<ul class='searchResult'>";
        
        ZUNEFIT.postJSON({
            url:'gymSearchAdvanced/',
            data:data,          
            success:function(response){
                try{
                    result13 = eval(response);
                    last=result13.length;
                    if(last>0){
                        for(i=0;i<last;i++){
                            res += '<li onclick="widgets.user.getInfo('+result13[i].id+')"><a href = "#lightbox" class="light" >'+result13[i].name+'</a></li>';
                        }
                        res += "</ul>";
                        $("#advSearch-result").html(res);
                    
                    }else{
                        $("#advSearch-result").html("No result Found");
                    }
                }catch(e){
                    
                }                
            },
            error:function(){
            //Error should be handle here          
            }
        });       
    }
    this.getInfo = function(id)
    {
        this.gymView();
        FB.XFBML.parse();
        serv = {};
        schedule ="";
        services = "<ul class='searchResult'>";
        ZUNEFIT.getJSON({
            url:'gymInfo/'+id,
            success:function(response){
                try{
                    result14 = eval(response)[0];
                    image = "";
                
                    $("#g_address").val(result14.address);
                    $("#g_city").val(result14.city);
                    $("#g_state").val(result14.state);
                    $("#g_zipcode").val(result14.zipcode);
                    $("#g_phone").val(result14.phone);
                    $("#g_email").val(result14.email);
                    $("#g_contact").val(result14.contact);
                    $("#g_url").html('<a href="'+result14.url+'" target="_blank">'+result14.url+'</a>');                
                
                    $("#g_name").val(result14.name);
                    $("#g_rate").val(result14.rate);
                    image = '<img src="'+result14.image+'" width="60" height="60" />';
                    $("#g_image").html(image);
                   
                    facebook = result14.facebook;
                    if(result14.facebook== null || result14.facebook== "undefined"){
                        facebook = 'zunefit';
                    }
                    twitter = result14.twitter;
                    if(result14.twitter== null || result14.twitter=="undefined") {
                        twitter = 'zunefit';
                    }
                    $(".tweet").html('<iframe allowtransparency="true" frameborder="0" scrolling="no"src="//platform.twitter.com/widgets/follow_button.html?screen_name='+twitter+'" style="width:300px; height:20px;"></iframe>');
           
                    $(".like").html('<iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2F'+facebook+'&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>');
                
                }catch(e){                    
                }
            },
            error:function(){
            //Error should be handle here
            }
        });
        ZUNEFIT.getJSON({
            url:'getClasses/'+id,
            success:function(response){
                try{
                    result15 = eval(response);
                    end = result15.length;
               
                    for(i=0;i<end;i++){
                        if(i!=0){
                            schedule += "<hr style='clear:both;'/><hr/>";
                        }
                       
                        var mon = result15[i].monday;
                        if(mon != null && mon != '00:00:00'){
                            var mons = new Date("October 13, 1975 "+mon+" UTC");
                            monH = mons.getHours();
                            monM = mons.getMinutes();
                            mon = monH +':'+ monM;
                            
                        }else mon = "-";
                        var tue = result15[i].tuesday;
                        if(tue != null && tue != '00:00:00') {
                            var tues = new Date("October 13, 1975 "+tue+" UTC");
                            tueH = tues.getHours();
                            tueM = tues.getMinutes();
                            tue = tueH +':'+ tueM;
                            
                        }else tue = "-";
                        var wed = result15[i].wednesday;
                        if(wed != null && wed != '00:00:00'){
                            var weds = new Date("October 13, 1975 "+wed+" UTC");
                            wedH = weds.getHours();
                            wedM = weds.getMinutes();
                            wed = wedH +':'+ wedM;
                            
                        }else wed = "-";
                        var thu = result15[i].thursday;
                        if(thu != null && thu != '00:00:00'){
                            var thus = new Date("October 13, 1975 "+thu+" UTC");
                            thuH = thus.getHours();
                            thuM = thus.getMinutes();
                            thu = thuH +':'+ thuM;
                            
                        }else thu = "-";
                        var fri = result15[i].friday;
                        if(fri != null && fri != '00:00:00'){
                            var fris = new Date("October 13, 1975 "+fri+" UTC");
                            friH = fris.getHours();
                            friM = fris.getMinutes();
                            fri = friH +':'+ friM;
                            
                        }else fri = "-";
                        var sat = result15[i].saturday;
                        if(sat != null && sat != '00:00:00') {
                            var sats = new Date("October 13, 1975 "+sat+" UTC");
                            satH = sats.getHours();
                            satM = sats.getMinutes();
                            sat = satH +':'+ satM;
                            
                        }else sat = "-";
                        var sun = result15[i].time;
                        if(sun != null && sun != '00:00:00'){
                            var suns = new Date("October 13, 1975 "+sun+" UTC");
                            sunH = suns.getHours();
                            sunM = suns.getMinutes();
                            sun = sunH +':'+ sunM;
                            
                        }else sun = "-";       
                        
                        hrs =Math.floor(result15[i].duration/60);
                        min = result15[i].duration%60;
                        
                        schedule +="<table class ='time' style = 'width:200px;float:left;'><tr><td class='bold'>Service</td><td>:"+result15[i].service.replace(" ", "&nbsp")+"</td><td style='width:10px;'></td><td class='bold'>Price</td><td>:"+result15[i].price+"$</td></tr><tr><td class='bold'>Duration</td><td>:"+hrs+"hrs&nbsp;&&nbsp"+min+"mins</td></tr></table><br/><table><tr><td class='bold'>Mon</td><td class='bold'>Tue</td><td class='bold'>Wed</td><td class='bold'>Thu</td><td class='bold'>Fri</td><td class='bold'>Sat</td><td class='bold'>Sun</td></tr><tr><td>"+mon+"</td><td>"+tue+"</td>";
                        schedule +="<td>"+wed+"</td><td>"+thu+"</td><td>"+fri+"</td><td>"+sat+"</td><td>"+sun+"</td></tr></table>";
                        schedule +='<div style="float: left;width: 170px;position:relative;top:15px;" ><table><tr><td>Date:</td><td> <input type="text" style="width:100px;" class="round datepicker " id="'+result15[i].id+'date"/></td><td>Time: </td><td><input type="text" style="width:100px;" class="round timepicker " id="'+result15[i].id+'time"/></td></tr></table></div>';
                        schedule +='<div style="color: darkgreen;float: right;text-align: center;padding-bottom:2px;" ><img src="images/schedule.png" onclick="widgets.user.addEvent('+id+','+result15[i].id+','+result15[i].price+')" style="cursor:pointer;"/></div>';
                    }
                    services += "</ui>";
                    $("#box-Schedule").html(schedule);                   
                
                }catch(e){
                    
                }
                $('.timepicker').timepicker({                    
                    stepMinute: 15                   
                });                
                $( ".datepicker" ).datepicker();
                $( ".datepicker" ).datepicker( "option", "dateFormat", "yy-mm-dd");               
            },
            error:function(){
            //Error should be handle here
            }
        });
        servicess = "<ul>";
        ZUNEFIT.getJSON({
            url:'getTags/'+id,
            success:function(data){
                results = eval(data);
                end = results.length;
                for(i=0;i<end;i++){                   
                    servicess += '<li>'+results[i].tag+'</li>';
                }
                servicess += "</ul>";             
             
                $("#box-Services").html(servicess);              
            },
            error:function(){
          
            }
        });    
    }
    this.pay_me = function()
    {
        if($('.card-number').val().indexOf('x') != -1)
        {
            $("#message").css('display','block')
            $("#message").html("processing please wait..");
            $('.submit-button').attr("disabled","disabled");
            ZUNEFIT.getJSON({
                url:'userPreferences/',
                token : $('#utoken').val(),
                success:function(data){
                    result6 = eval(data)[0];
                    if(result6.automatic==1 && result6.cToken != null){
                                                
                        data = {};      
                        data['cusToken'] = result6.cToken.replace("'", "").replace("'", "");               
                        data['amount'] = parseInt(($("#pay_amount").val()*100),10);
                        data['name'] = $("#pref_email").val();
                        $.ajax({
                            type: 'POST',
                            url: "customer_charge.php",
                            data: data,
                            dataType:'json',
           
                            success: function(response){     
                                
                                $("#message").html(response.message);
                                $('.submit-button').removeAttr("disabled");
                                if(response.id!=0){
                                    datas = {};
                                    datas['refid']=response.id;
                                    ZUNEFIT.postJSON({                  
                                        url:'paymentTransaction/',
                                        data:datas,
                                        token : $('#utoken').val(),          
                                        success:function(response){
                                            ZUNEFIT.getJSON({
                                                url:'balance/',
                                                data: data,
                                                token : $('#utoken').val(),
                                                success:function(response){
                                                    try{
                                                        result5 = eval(response)[0];                
                                                        res = result5.balance;
                   
                                                        $(".balance-box").html("Balance: $ "+  res);
                                                    }catch(e){
                   
                                                    }
                                                },
                                                error:function(){
                                                //Error should be handle here            
                                                }
                                            });
                                        },
                                        error:function(){
                                        //Error should be handle here
                                        ;  
                                        }            
                                    });
                                }                         
                            }
                        });
                    
                    }else{
                        $("#message").html('You have to set refill automatically to use this option');
                    }
                }
            
            });
            return ;
        }
       
                
        if($('#zip').val().length > 0 && $('#zip').val().length != 5 ){
            $("#message").css('display','block')
            $("#message").html("Zip code must be 5 digits");
            return;
        }
        startAjax();
        
        $("#message").css('display','block')
        $("#message").html("processing please wait..");
        Stripe.setPublishableKey($('#pk').val());
        // disable the submit button to prevent repeated clicks
        $('.submit-button').attr("disabled", "disabled");
        if($('#pref_address').val().length==0){
            this.update_new();
        }
        // createToken returns immediately - the supplied callback submits the form if there are no errors
        Stripe.createToken({
            name : $("#first_name").val(),
            address_line1 : $("#address_1").val(),
            address_line2 :$("#address_2").val(),
            address_city : $("#city").val(),
            address_state :  $("#state").val(),
            address_zip : $("#zip").val(),
                
            number: $('.card-number').val(),
            cvc: $('.card-cvc').val(),
            exp_month: $('.card-expiry-month').val(),
            exp_year: $('.card-expiry-year').val()
        }, stripeResponseHandler);
        return false; // submit from callback
        
        function stripeResponseHandler(status, response) {
            if (response.error) {
                // re-enable the submit button
                $('.submit-button').removeAttr("disabled");
                // show the errors on the form
                endAjax();
                $(".payment-errors").html(response.error.message);
            } else {
                var form$ = $("#payment-form");
                // token contains id, last4, and card type
                try{ 
                   
                    $('#tok').remove();
                }catch(e){}
                var token = response['id'];
              
                // insert the token into the form so it gets submitted to the server
                form$.append("<input type='hidden' id ='tok' name='stripeToken' value='" + token + "' />");
                // and submit
                data = {};      
   
                data['stripeToken'] = $("#tok").val();               
                data['amount'] = parseInt(($("#pay_amount").val()*100),10);
                data['name'] = $("#pref_email").val();
                $.ajax({
                    type: 'POST',
                    url: "card.php",
                    data: data,
                    dataType:'json',
           
                    success: function(response){     
                        $("#message").html(response.message);
                        $('.submit-button').removeAttr("disabled");
                        if(response.id!=0){
                            datas = {};
                            datas['refid']=response.id;
                            ZUNEFIT.postJSON({                  
                                url:'paymentTransaction/',
                                data:datas,
                                token : $('#utoken').val(),          
                                success:function(response){
                                    ZUNEFIT.getJSON({
                                        url:'balance/',
                                        data: data,
                                        token : $('#utoken').val(),
                                        success:function(response){
                                            try{
                                                result5 = eval(response)[0];                
                                                res = result5.balance;
                   
                                                $(".balance-box").html("Balance: $ "+  res);
                                            }catch(e){
                   
                                            }
                                        },
                                        error:function(){
                                        //Error should be handle here            
                                        }
                                    });
                                },
                                error:function(){
                                //Error should be handle here
                                ;  
                                }            
                            });
                        }                         
                    }
                });        
        
            }
        }
        
    }
    this.onload = function(pay_me)
    {
        bool = true;
        if($('#pay_amount').val().indexOf('.') == -1 && $('#pay_amount').val().length != 0){
            if($('#pay_amount').val()>199 ){
                $("#dialog-confirm-one p").html("Are you sure about this $"+$('#pay_amount').val()+".00");
                $( "#dialog-confirm-one" ).dialog({
                    resizable: true,
                    height:200,
                    modal: true,
                    hide: "explode",
                    buttons: {
                        "Yes": function() {
                            pay_me();
                            $( this ).dialog( "close" );
                        },
                        Cancel: function() {
                            bool = false;
                            $( this ).dialog( "close" );
                        }
                    }
                });
            }else{
                $("#dialog-confirm-two p").html("Payment value is $"+$('#pay_amount').val()+".00");
                $( "#dialog-confirm-two" ).dialog({
                    resizable: false,
                    height:200,
                    modal: true,
                    hide: "explode",
                    buttons: {
                        "Yes": function() {
                            pay_me();
                            $( this ).dialog( "close" );
                        },
                        Cancel: function() {
                            bool = false;
                            $( this ).dialog( "close" );
                        }
                    }
                });
            }
        }else if($('#pay_amount').val()>199){
            $("#dialog-confirm-three p").html("Payment value is $"+$('#pay_amount').val());
            $( "#dialog-confirm-three" ).dialog({
                resizable: false,
                height:200,
                modal: true,
                hide: "explode",
                buttons: {
                    "Yes": function() {
                        pay_me();
                        $( this ).dialog( "close" );
                    },
                    Cancel: function() {
                        bool = false;
                        $( this ).dialog( "close" );
                    }
                }
            });
        }else{
            pay_me();
        }
       
    }
    
    
    
    
    this.payment = function()
    {
        data = {};
       
        data['stripeToken'] = $("#tok").val();
        data['amount'] = parseInt(($("#amount").val()*100),10);
      
        $.ajax({
            type: 'POST',
            url: "card.php",
            data: data,
           
            success: function(response){
                $("#message").html(response.message);
                datas = {};
                datas['refid']=response.ptoken;
                ZUNEFIT.postJSON({                   
                    url:'paymentTransaction/',
                    data:datas,
                    token : $('#utoken').val(),          
                    success:function(response){
                      
                    },
                    error:function(){
                    //Error should be handle here                       
                    }            
                });
            //alert(result1);        
            }
        });
       
    }
    this.creditInfo = function()
    {
        $('#auto_amount, #when, #refil').removeAttr('disabled');
      
        $('#edit_fil').css('display', 'none');
        $('#done_fil').css('display', 'block');
      
    }
    
    this.update_refill = function()
    {
      
        data = {};     
        if($('#refil').is(':checked'))
        {
            data['automatic'] = 1;
            if($('#zip').val().length > 0 && $('#zip').val().length != 5 ){
                $("#message").css('display','block')
                $("#message").html("Zip code must be 5 digits");
                return false;
            }
            startAjax();
        
            $("#message").css('display','block')
            $("#message").html("processing please wait..");
            Stripe.setPublishableKey($('#pk').val());
            // disable the submit button to prevent repeated clicks
          
            if($('#pref_address').val().length==0){
                this.update_new();
            }
            function apicall(){     
                ZUNEFIT.postJSON({
                    url:'updatePayment/',
                    data:data,
                    token : $('#utoken').val(),
          
                    success:function(response){
               
                        $('#done_fil').css('display', 'none');
                        $('#edit_fil').css('display', 'block');               
                        $('#auto_amount, #refil, #when').attr('disabled','disabled');
                
                    },
                    error:function(){
                    //Error should be handle here           
                    }            
                });
            }
            function stripeResponseHandler(status, response) {
                if (response.error) {
                    // re-enable the submit button                   
                    // show the errors on the form
                    endAjax();
                    $(".payment-errors").html(response.error.message);
                } else {
                    var form$ = $("#payment-form");
                    // token contains id, last4, and card type
                    try{ 
                   
                        $('#tok').remove();
                    }catch(e){}
                    var token = response['id'];
              
                    // insert the token into the form so it gets submitted to the server
                    form$.append("<input type='hidden' id ='tok' name='stripeToken' value='" + token + "' />");
                    // and submit
                    datas = {};
       
                    datas['stripeToken'] = $("#tok").val();
               
                    datas['name'] = $("#pref_email").val();
                    $.ajax({
                        type: 'POST',
                        url: "customer.php",
                        data: datas,
                        dataType:'json',           
                        success: function(response){
               
                            $("#message").html(response.message);
                          
                            if(response.id!=0){
                                data['cToken'] = response.id;
                                data['refillamount'] = $("#auto_amount").val();
                                data['minamount'] = $('#when').val();
                                apicall();
                            }                         
                        }
                    });       
                }
            }
            // createToken returns immediately - the supplied callback submits the form if there are no errors
            Stripe.createToken({
                name : $("#first_name").val(),
                address_line1 : $("#address_1").val(),
                address_line2 :$("#address_2").val(),
                address_city : $("#city").val(),
                address_state :  $("#state").val(),
                address_zip : $("#zip").val(),                
                number: $('.card-number').val(),
                cvc: $('.card-cvc').val(),
                exp_month: $('.card-expiry-month').val(),
                exp_year: $('.card-expiry-year').val()
            }, stripeResponseHandler);
        }else{
            data['automatic'] = 0;
            data['refillamount'] = $("#auto_amount").val();
            data['minamount'] = $('#when').val();
            ZUNEFIT.postJSON({
                url:'updatePayment/',
                data:data,
                token : $('#utoken').val(),          
                success:function(response){               
                    $('#done_fil').css('display', 'none');
                    $('#edit_fil').css('display', 'block');               
                    $('#auto_amount, #refil, #when').attr('disabled','disabled');                
                },
                error:function(){
                //Error should be handle here
                }            
            });
        }                
    }    
    this.getcrediDetails = function()
    {       
        data = {};
        data['offset'] = 0;
        ZUNEFIT.postJSON({
            url:'getTransactions/',
            data:data,
            token : $('#utoken').val(),
          
            success:function(response){
                result = eval(response)[0];
                datas ={};
                datas['id']=result['refid'];
                $.ajax({
                    type: 'POST',
                    url: "cardDetails.php",
                    data:datas,           
                    success: function(responses){
               
                        $("#first_name").val(responses.name),
                        $("#address_1").val(responses.add1),
                        $("#address_2").val(responses.add2),
                        $("#city").val(responses.city),
                        $("#state").val(responses.state),
                        $("#zip").val(responses.zip),                
                        $('.card-number').val('********'+responses.last4),                       
                        $('.card-expiry-month').val(responses.month),
                        $('.card-expiry-year').val(responses.year)
                
                    }                       
                });
            },
            error:function(){
            //Error should be handle here          
            }            
        });
    }   
    
}
