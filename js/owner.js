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
            url: ZUNEFIT_BASE_URL+"gymStats/?callback=?",
        
            dataType: "json",
            success: function(data){
                result = eval(data)[0];
                //alert("yes");
                result.visits  
                $(".right-featured-box ul").append('<li><a href="#">'+result.visits +' visits/day</li>');
                $(".right-featured-box ul").append('<li><a href="#">'+result.views +' profile views Today</li>');
                $(".right-featured-box ul").append('<li><a href="#"> Average Gym Rate $ '+ result.price +'</li>');
                },
            error:function(){
                //Error should be handle here
                alert("no");
            }
        });
        
            
                $.ajax({
            beforeSend: function(xhrObj){
               
                xhrObj.setRequestHeader("token",first);
            },
        
            type: "GET",
            url: ZUNEFIT_BASE_URL+"gymBalance/2?callback=?",
        
            dataType: "json",
            success: function(data){
                result = eval(data)[0];
                alert("yes");
              alert(result.balance);
                },
            error:function(){
                //Error should be handle here
                alert("no");
            }
        });
       
    });

