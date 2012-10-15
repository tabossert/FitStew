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
        $("#" + _fid).fancybox({
            'scrolling'		: 'no',
            'titleShow'		: false,
            'onStart'               : function() {
            },
            'onClosed'		: function() {
                $("#" + _mid).hide();
            }
        });
                       
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