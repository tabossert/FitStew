/* 
 * Wrapper to send/recieve ZuneFit API calls via JQuery AJAX
 */

var ZuneFit = function(options)
{
    _this = this;
    _options = options;
    
    /**
     * API method call by using GET method
     */
    this.getJSON = function(opt)
    {
        _this.start();
        _opt = {};
        _opt.url =_options.url + opt.url;
        _opt.datatype = 'jsonp';
        _opt.type = "GET";
        _opt.data = opt.data;
        _opt.beforeSend = function(xhrObj) {
            xhrObj.setRequestHeader("ltype", "web");
            if(opt.token)
            {
                xhrObj.setRequestHeader("token", opt.token);
            }
        };
        _opt.success = function(data)
        {
            _this.end();
            opt.success(data); 
           
        };
        _opt.error = function()
        {       
            _this.end();
            opt.error(); 
           
        };
        
        $.ajax(_opt);
    }
    
    /**
     * API method call by using POST method
     */
    this.postJSON = function(opt)
    {
        _this.start();
        _opt = {};
        _opt.url =_options.url + opt.url;
        _opt.dataType = 'json';
        _opt.type = "POST";
        _opt.data = opt.data;
        _opt.beforeSend = function(xhrObj) {
            xhrObj.setRequestHeader("ltype", "web");
            if(opt.token)
            {
                xhrObj.setRequestHeader("token", opt.token);
            }
        };
        _opt.success = function(data)
        {
            _this.end();
            opt.success(data); 
            
        };
        _opt.error = function()
        {        
            _this.end();
            opt.error(); 
           
        };
                                
        $.ajax(_opt);        
    }
    
    /**
     * Starting API call
     */
    this.start = function()
    {
        if(_options.start)
        {
            _options.start();
        }
    }
    
    /**
     * Ending API call
     */
    this.end = function()
    {
        if(_options.end)
        {
            _options.end();
        }
    }
    
}
