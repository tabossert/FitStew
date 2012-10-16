$(window).load(function ()
    {
        function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });
            return vars;
        }
        var first = getUrlVars()["token"];
        //alert(first);
        
        $.ajax({
            beforeSend: function(xhrObj){
               
                xhrObj.setRequestHeader("token",first);
            },
        
            type: "GET",
            url: "https://api.zunefit.com/api/gymStats/?callback=?",
        
            dataType: "json",
            success: function(data){
                //var result = eval(data);
                alert("yes");
                alert(data.message);  
            },
            error:function(){
                //Error should be handle here
                alert("no");
            }
        });
       
    });

