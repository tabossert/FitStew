<?php  include 'html/header.php'; ?>
  <script type="text/javascript">
        $(document).ready(function() {

 // executes when HTML-Document is loaded and DOM is ready

   alert('sd');
  $.ajax({
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("ltype", "web");
               
                xhrObj.setRequestHeader("token", <?php echo "'".$_POST['token']."'"; ?>);
            },
        
            type: "POST",
            url: "https://api.zunefit.com/api/userSignup/",
        
            dataType: "json",
            success: function(data){
                result = eval(data)[0];
                alert("yes");
                alert(result.status);
                },
            error:function(){
                //Error should be handle here
                alert("no");
            }
        });

});
</script>

<input type="text" name="utoken" id="utoken" value="<?php echo $_POST['token']; ?>"/>	