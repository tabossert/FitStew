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
    
}

/**
 *This function is calling when the ajax call is end
 */
var endAjax = function()
{
    
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
        if( $("#frmOwnersLogin").valid())
            {
                un = $('#username').val();
                pw = $('#password').val();
                this.lb.login(un, pw);                 
            }      
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
        //$("#frmOwnersLogin").validate();
        data = {};
        data["username"] = username;
        data["password"] = Sha1.hash(password);
        
        JANRAIN.postJSON({
            url:'gymLogin/',
            data:data,
            success:function(data){
                alert(data);
                //var json = jQuery.parseJSON( data );
                alert(data.message);
                //alert(data.message);
                
            },
            error:function(){
            //Error should be handle here
            }
        })
    } 
    
}