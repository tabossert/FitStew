/* 
 * Wrapper to send/recieve janrain API calls via JQuery AJAX
 */

var Janrain = function(options)
{
    _options = options;
    
    /**
     * API method call by using GET method
     */
    this.getJSON = function(opt)
    {
        start();
        _opt.url =_options.url + opt.url + "?callback=?";
        _opt.datatype = 'json';
        _opt.method = "GET";
        _opt.data = opt.data;
        _opt.success = function(data)
        {
            opt.success(data); 
            end();
        }
        _opt.error = function()
        {           
            opt.error(); 
            end();
        }
        
        $.ajax(_opt);
    }
    
    /**
     * API method call by using POST method
     */
    this.postJSON = function(opt)
    {
        start();
        _opt.url = _options.url + opt.url + "?callback=?";
        _opt.datatype = 'json';
        _opt.method = "POST";
        _opt.data = opt.data;
        _opt.success = function(data)
        {
            opt.success(data); 
            end();
        }
        _opt.error = function()
        {           
            opt.error(); 
            end();
        }
        
        $.ajax(_opt);
    }
    
    /**
     * Starting API call
     */
    this.start = function()
    {
        _options.start();
    }
    
    /**
     * Ending API call
     */
    this.end = function()
    {
        _options.end();
    }
    
}
