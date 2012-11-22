/* 
 * Implementation of the widgets and their functionalities
 */

//Configuration parameters
var ZUNEFIT_BASE_URL = "https://api.zunefit.com/api/";
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
        this.getAllClasses();
        
        this.deleteEvent();
        this.getUserWeekSchedule();
        this.getcrediDetails();
        
        this.enter();
     
       
       
    }
    
    
    this.getDate = function()
    {
        $(function() {
            $( "#datepicker" ).datepicker({
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
                value: 1,
                min: 1,
                max: 500,
                slide: function( event, ui ) {
                    $( "#amounts" ).val( "Maximum Cost $" + ui.value );
                    $( "#amount" ).css( "display","none" );
                    $( "#amounts" ).css( "display","block" );
                }
            });
            $( "#amount" ).val( "Maximum Cost $1" );
        });
    }
    
    
    
    
    this.getFeaturedWorkots = function()
    {
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
                        op += "<li><a href='#'>"+result4[i].name+"</a></li>";
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
                    //alert("bal"+response);
                    $(".balance-box").html("Balance: $ "+  res);
                }catch(e){
                   
                }
            },
            error:function(){
            //Error should be handle here
            
            //alert("error bal")
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
               
                    $("#pref_address").val(result6.address);
                
                    $("#pref_city").val(result6.city);
              
                    $("#pref_state").val(result6.state);
                    $("#pref_zip").val(result6.zipcode);
                    $("#auto_amount").val(result6.refillamount);
                    $("#when").val(result6.schedule);
                    if(result6.automatic==1){
                        $('#refil').prop('checked', true);
                    }
                }catch(e){
                    
                }
                
                
                
            },
            error:function(){
            //Error should be handle here
            
            //alert("error pref")
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
        var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
        //strDate = "2012-10-16";
        
        this.getUserSchedule(strDate+" 00:00:00", strDate+" 24:00:00");
        $(".inner-calender1").css("background-color","#565d60");
        $(".inner-calender2, .inner-calender3").css("background-color","transparent");
    }
    
    this.getUserWeekSchedule = function()
    {
        var curr = new Date; 
        var first = curr.getDate() - curr.getDay(); 
        var last = first + 6; 

        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));
        var startDate = firstday.getFullYear() + "-" + (firstday.getMonth()+1) + "-" + firstday.getDate();
        var endDate = lastday.getFullYear() + "-" + (lastday.getMonth()+1) + "-" + lastday.getDate();
        
        this.getUserSchedule(startDate+" 00:00:00", endDate+" 24:00:00");
       
        $(".inner-calender2").css("background-color","#565d60");
        $(".inner-calender1, .inner-calender3").css("background-color","transparent");
    }
    
    this.getUserMonthSchedule = function()
    {
        var mon= new Date();
        
        var firstDay = new Date(mon.getFullYear(), mon.getMonth() , 1);
        var firstDate = firstDay.getFullYear() + "-" + (firstDay.getMonth()+1) + "-" + firstDay.getDate();
        
        var lastDay = new Date(mon.getFullYear(), mon.getMonth() + 1, 0);
        var lastDate = lastDay.getFullYear() + "-" + (lastDay.getMonth()+1) + "-" + lastDay.getDate();
        
        this.getUserSchedule(firstDate+" 00:00:00", lastDate+" 24:00:00");
        $(".inner-calender3").css("background-color","#565d60");
        $(".inner-calender2, .inner-calender1").css("background-color","transparent");
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
                            content += "<ul><li>"+result7[i].name+"</li>";
                        }else{
                            if(i!=0){
                                content += "</ul>";
                            }                                
                            content += "<h1>"+result7[i].date+"</h1>";
                            content += "<ul><li>"+result7[i].name+"</li>";
                            date = result7[i].date;
                        }
                        
                    }
                    $(".inner-txt").html(content);
                    
                    
                
                }catch(ex){
                   
                
                }       
            },
            error:function(){
            //Error should be handle here
            // alert("no");  
            }
        });
    }
    
    this.getFeaturedGyms = function()
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
                        $(".user-item-link").append('<li><a href="#">'+result8[i].service +'</li>');
                    
                    }
                }catch(e){
                    
                }
                
            },
            error:function(){
            //Error should be handle here
            }
        });
    }
    
    this.searchMe = function()
    {
        
        $("#divexample1").niceScroll();
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
               
            //alert(result1);        
            },
            error:function(){
            
                $("#search-result").html("No result Found");
            
            }
        });
       
    }
    
    
    this.edit = function()
    {
        $("#pref_firstName, #pref_lastName, #pref_address, #pref_city, #pref_state, #pref_zip").removeClass('transparent').addClass('round');
        $('#edit').css("display","none");
        $('#done').css("display","block");
    }
    this.update = function()
    {
        $('#done').css("display","none");
        $('#edit').css("display","block");
        $("#pref_firstName, #pref_lastName,  #pref_address, #pref_city, #pref_state, #pref_zip").addClass('transparent').removeClass('round');
        data = {};
        data['first_name'] = $("#pref_firstName").val();
        data['last_name'] = $("#pref_lastName").val();
        data['address'] = $("#pref_address").val();
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
            // alert("no");  
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
            // alert("no");  
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
        
       
        
        
        ZUNEFIT.postJSON({
            url:'addEvent/',
            data:data,
            token : $('#utoken').val(),
          
            success:function(response){
               
                alert(response.stats);
              
            },
            error:function(){
            //Error should be handle here
            // alert("no");  
            }
            
        });
    }
    
    this.deleteEvent = function()
    {
       
        data = {};
        data['sid'] = 25;
        
        
        $.ajax({
            type: 'DELETE',
            url: "https://api.zunefit.com/api/deleteEvent/",
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
    this.enter = function()
    {
        
           
        $('#Miles, #Within, #keyword').keypress(function (e) {
            if (e.which == 13) {
       
                $("#searching").click();
      
            }
     
        
        });
    }
    
    this.advancedSearch = function()
    {
        $("#divexample1").niceScroll();
        $("a.light").live("click", function(event) {
            event.preventDefault();
            $(this).filter(':not(.fb)').fancybox()
            .addClass('fb');
            $(this).triggerHandler('click');
        });
        data = {};
       
        //        $('input:checkbox:checked.group1').map(function () {
        //           
        //            work +=this.value;
        //            work +=",";
        //            return this.value;
        //        }).get();
        //       
        //        if(work.length>0){
        //            data['workouts'] = work;
        //        }
        
        
      
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
            //alert(result1);        
            },
            error:function(){
            //Error should be handle here
            // alert("no");  
            }
        });
       
    }
    this.getInfo = function(id)
    {
        FB.XFBML.parse();
        serv = {};
        schedule ="";
        services = "<ul class='searchResult'>";
        ZUNEFIT.getJSON({
            url:'gymInfo/'+id,
            success:function(response){
                try{
                    result14 = eval(response)[0];
               
                
                    $("#g_address").val(result14.address);
                    $("#g_city").val(result14.city);
                    $("#g_state").val(result14.state);
                    $("#g_zipcode").val(result14.zipcode);
                    $("#g_phone").val(result14.phone);
                    $("#g_email").val(result14.email);
                    $("#g_contact").val(result14.contact);
                
                
                    $("#g_name").val(result14.name);
                    $("#g_rate").val(result14.rate);

                
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
                            schedule += "<hr style='clear:both;'/>";
                        }

                        schedule +="<table style = 'width:auto;'><tr><td class='bold'>Service</td><td class='bold'>:"+result15[i].service+"</td></tr><tr><td></td><td class='bold'>Price</td><td>:"+result15[i].price+"$</td></tr><tr><td></td><td class='bold'>Date</td><td>:"+result15[i].date+"</td></tr>";
                        schedule +="<tr><td></td><td class='bold'>Time</td><td>:"+result15[i].time+"</td></tr></table>";
                        schedule +='<div style="color: #565D60;text-align: right; left:100px;" >Add to my schedule<img src="images/schedule.png" onclick="widgets.user.addEvent('+id+','+result15[i].id+','+result15[i].price+')" style="cursor:pointer;"/></div>';

                    }
                 
        
                    op= {};
               
                
                    for(i=0;i<end;i++)
                    {         
                        op[i]=result15[i].service;
                        bool = true;
                        for(j=0;j<i;j++){
                            if(op[j] == result15[i].service) {
                                bool = false;
                            }
                        }
                        if(bool){
                        
                        
                            services +="<li>"+result15[i].service+"</li>";
                        
                        
                        }
                             
                    }
          
    


           
                
                    services += "</ui>";
                    $("#box-Schedule").html(schedule);
                    $("#box-Services").html(services);
                
                }catch(e){
                    
                }
            },
            error:function(){
            //Error should be handle here
            }
        });
    
       
       
        
        
        
    }
    
    this.payment = function()
    {
        $("#message").html("waiting...");
        data = {};
        data['first_name'] = $("#first_name").val();
        data['card_number'] = $("#card_number").val();
        data['last_name'] = $("#last_name").val();
        data['cvv'] = $("#cvv").val();
        data['address_1'] = $("#address_1").val();
        data['address_2'] = $("#address_2").val();
        data['expiry_month'] = $("#expiry_month").val();
        data['expiry_year'] = $("#expiry_year").val();
        data['amount'] = $("#amount").val();
        data['city'] = $("#city").val();
        data['state'] = $("#state").val();
        data['zip'] = $("#zip").val();
           
        if($('#pref_address').val().length==0){
            this.update_new();
        }           
        
       
        
        
        $.ajax({
            type: 'POST',
            url: "payment/processor.php",
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
                    // alert("no");  
                    }
            
                });
            //alert(result1);        
            }
        });
        
        
        
        
    }
    this.creditInfo = function()
    {
        $('#when').dropkick();
        $('#hide_refil').css('display', 'block');
        $('#edit_fil').css('display', 'none');
        $('#done_fil').css('display', 'block');
         
    }
    
    this.update_refill = function()
    {
      
       
        data = {};
     
        if($('#refil').is(':checked'))
        {
            data['automatic'] = 1;
        }else{
            data['automatic'] = 0;
        }
        data['refillamount'] = $("#auto_amount").val();
        data['schedule'] = $('#when').val();
      
       
        
             
        ZUNEFIT.postJSON({
            url:'updatePayment/',
            data:data,
            token : $('#utoken').val(),
          
            success:function(response){
                $('#hide_refil').css('display', 'none');
                $('#done_fil').css('display', 'none');
                $('#edit_fil').css('display', 'block');
            },
            error:function(){
            //Error should be handle here
            // alert("no");  
            }
            
        });
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
                
            },
            error:function(){
            //Error should be handle here
            // alert("no");  
            }
            
        });
    }
    
    
}
