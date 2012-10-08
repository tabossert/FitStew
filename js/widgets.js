/* 
 * Implementation of the widgets and their functionalities
 */

//Loading widgets
$(function(){
    var widgets = new Widgets();
    widgets.init();
});  

var Widgets = function()
{
    /**
     * Initialize the widgets
     */
    this.init = function()
    {
        lb = new LoginBox("wsn", "msg");
        lb.bind();
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
}