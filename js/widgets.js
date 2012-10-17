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
              result = eval(data)[0];
              //alert(result);        
            },
            error:function(){
            //Error should be handle here
             alert("no");  
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
                result = eval(data)[0];
                //alert("yes");
                
                $(".right-featured-box ul").append('<li><a href="#">'+result.visits +' visits/day</li>');
                $(".right-featured-box ul").append('<li><a href="#">'+result.views +' profile views Today</li>');
                $(".right-featured-box ul").append('<li><a href="#"> Average Gym Rate $ '+ result.price +'</li>');       
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
        data['gid'] = 1;
        JANRAIN.getJSON({
            url:'gymBalance/',
            data:data,
            success:function(data){
              results = eval(data)[0];
                
                //res = results.balance;
                res = 10;
                $(".balance").html("Balance: <br />$ "+  res);
            },
            error:function(){
            //Error should be handle here
            }
        });
    }
}