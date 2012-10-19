/* 
 * Implementation of the widgets and their functionalities
 */

//Configuration parameters
var JANRAIN_BASE_URL = "https://api.zunefit.com/api/";
//Janrain API instance
var JANRAIN = new Janrain({
    url:JANRAIN_BASE_URL,
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
        this.lb = new LoginBox("wsn", "msg");
        this.lb.bind();
        this.gim = new Gym();
        this.gim.bind();
        this.user = new User();
        this.user.bind();
    }
    
    this.login = function()
    {
        un = $('#username').val();
        pw = $('#password').val();
        this.lb.login(un, pw);     
    }
}


var LoginBox = function(formId,msgId)
{
    _fid = formId;
    _mid = msgId;
    /**
     * Bind fancybox
     */
    this.bind = function()
    {                   
        fb = $("#" + _fid);
        
        if(fb)
        {
            fb.fancybox({
                'scrolling'		: 'no',
                'titleShow'		: false,
                'onStart'               : function() {
                },
                'onClosed'		: function() {
                    $("#" + _mid).hide();
                }
            });
        
            $("#username , #password").keyup(function(){
             
                $("#loginError").html("");    
             
            });
         
        }         
    }
    
    this.login = function(username,password)
    {
        if(!this.validate())
        {
            //Form is not valid
            return;
        }
        data = {};
        data["username"] = username;
        data["password"] = Sha1.hash(password);
        
        JANRAIN.postJSON({
            url:'gymLogin/',
            data:data,
            success:function(data){
                //There is an issue in firefox.data reprecents as a string.Need to use eval() 1st
                result = eval(data)[0];

                if(result.status == "success")
                {
                    //Login success.Redirect to the owners home page
                    $("#token").val(result.token);
                    $("#frmOwnersLogin").submit();
                    return;
                }
                else
                {
                    //Login failed.Show error message 
                    $("#loginError").html("Login incorrect");                    
                }                
            },
            error:function(){
            //Error should be handle here
            }
        })
    } 
    
    this.validate = function()
    {
        return $("#frmOwnersLogin").valid();
    }
    
}


var Gym = function()
{
    this.init = function()
    {
        this.bind();
    }
    
    this.bind = function()
    { 
        this.getGymSchedule("2012-10-04 00:00:00", "2012-10-16 00:00:00");
        this.getGymStat();
        this.getGymBal();        
    }
    
    this.getGymSchedule = function(start,end)
    {
        data = {};
        data['start'] = start;
        data['end'] = end;
        data['token'] = $('#token').val();
        
        JANRAIN.postJSON({
            url:'gymSchedule/',
            data:data,
            success:function(data){
                result1 = eval(data)[0];
            //alert(result1);        
            },
            error:function(){
                //Error should be handle here
               // alert("no");  
            }
        });
    }
    
    this.getGymStat = function()
    {
        data = {};
        data['token'] = $('#token').val();
        
        JANRAIN.getJSON({
            url:'gymStats/',
            data:data,
            success:function(data){
                result2 = eval(data)[0];
                //alert("yes");               
                $("#owner-right-featured-box ul").append('<li><a href="#">'+result2.visits +' visits/day</li>');
                $("#owner-right-featured-box ul").append('<li><a href="#">'+result2.views +' profile views Today</li>');
                $("#owner-right-featured-box ul").append('<li><a href="#"> Average Gym Rate $ '+ result2.price +'</li>');       
            },
            error:function(){
            //Error should be handle here
            }
        });
    }
    
    this.getGymBal = function()
    {
        data = {};
        data['token'] = $('#token').val();
       // data['gid'] = 1;
        JANRAIN.getJSON({
            url:'gymBalance/',
            data:data,
            success:function(data){
                result3 = eval(data)[0];                
                //res = result3.balance;
                //alert(res);
                res = 10;
                $(".balance").html("Balance: $ "+  res);
            },
            error:function(){
            //Error should be handle here
            }
        });
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
        this.getUserPreferences();
       
    }
    
    this.getFeaturedGyms = function()
    {
        JANRAIN.getJSON({
            url:'featuredGyms/',
            success:function(data){
                result4 = eval(data);
                op="<ul>";
                finish = 5;
                if(result4.length < 5 ){finish = result4.length}
                for(i=0;i<finish;i++)
                {       
                    op += "<li><a href='#'>"+result4[i].name+"</a></li>";
                }
                op +="</ul>";
                $("#featuredGymsBox").html(op);
            },
            error:function(){
            //Error should be handle here
            }
        });
    }
    
    this.getUserBalance = function()
    {
        data = {};
        data['token'] = $('#utoken').val();
        JANRAIN.getJSON({
            url:'balance/',
            success:function(data){
               result5 = eval(data)[0];                
                //res = result5.balance;
                res = 10;
                $(".balance-box").html("Balance: $ "+  res);
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
        data['token'] = $('#utoken').val();
        JANRAIN.getJSON({
            url:'userPreferences/',
            success:function(data){
               result6 = eval(data)[0];                
                res = result6.email;
                alert(res);
                
            },
            error:function(){
            //Error should be handle here
            
           //alert("error pref")
            }
        });
    }
        
}