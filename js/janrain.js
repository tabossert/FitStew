/* 
 * Wrapper to send/recieve janrain API calls via JQuery AJAX
 */

var Janrain = function(options)
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
        _opt.url =_options.url + opt.url + '?callback=?';
        _opt.datatype = 'jsonp'
        _opt.jsonpCallback =  'jsonCallback',
        _opt.type = "GET";
        _opt.data = opt.data;
        _opt.success = function(data)
        {
            opt.success(data); 
            _this.end();
        }
        _opt.error = function()
        {           
            opt.error(); 
            _this.end();
        }
        
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
        _opt.datatype = 'jsonp';
        _opt.jsonpCallback =  'jsonCallback',
        _opt.type = "POST";
        _opt.data = opt.data;
        _opt.data["callback"] = "JQuery" + new Date().getTime();
        _opt.success = function(data)
        {
            opt.success(data); 
            _this.end();
        }
        _opt.error = function()
        {           
            opt.error(); 
            _this.end();
        }
        
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
