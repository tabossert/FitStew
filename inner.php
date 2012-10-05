<?php
include('includes/config.inc.php');

session_start();
//This is for development, please remove for production
//$_SESSION = "nkjdnkjsdnkjsdnfks";

if(!isset($_SESSION['token'])) {
	header('Location: '.SITE_URL);
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title>ZuneFit Panel</title>
    <link rel="stylesheet" href="css/easyprint.css" media="print" />
    <link rel="stylesheet" href="css/easy.css" media="screen" />
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="js/curvycorners.src.js"></script>
    <script type="text/javascript" src="js/easy.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript" src="js/date.js"></script>
	<script type="text/javascript" src="js/boot.js"></script>
	<script>

	  function setListeners() {
                $('#schedule').live('click', function() {
                  getSchedule(Date.today().toString('yyyy-M-d'),Date.today().addDays(1).toString('yyyy-M-d'));
                });
                $('#day').live('click', function() {
                  getSchedule(Date.today().toString('yyyy-M-d'),Date.today().addDays(1).toString('yyyy-M-d'));
                });
                $('#week').live('click', function() {
                  getSchedule(Date.today().toString('yyyy-M-d'),Date.today().addDays(8).toString('yyyy-M-d'));
                });
				$("#gymsearch").live("click",function(){
						   $("#searchbox").show();
						   });
				
	  }

	  function boot() {
		setToken('<?php echo $_SESSION['token']; ?>');
	  	getBalance();
	        featuredGyms();
		getSchedule(Date.today().toString('yyyy-M-d'),Date.today().addDays(1).toString('yyyy-M-d'));
		setListeners();
	  }

	  window.onload=boot;


	</script>
  </head>

  <body>
  <div class="headerbg">
	<div class="header-container">
	  <div class="logo"><a href="#"><img src="images/logo.png" alt="" border="0"/></a></div>
	  <div class="topmenu">
	    <div class="login-link"><a href="pages/signout.php">Sign-out</a></div>
	    <!--<div class="my-box">
	      <ul class="toplink">
	        <li><a href="pages/how.html" class="popup" rel="width:250;height:300">How it works</a></li>
	        <li><a href="inner.php">Customers </a></li>
	        <li><a href="owner.php">Gyms</a></li>
	        <li><a href="pages/gymLoc.php" class="popup" rel="width:250;height:300">Gym Locations</a></li>
	      </ul>
	    </div>-->
	  </div>
	  <div class="clr"></div>
	</div>
  </div>	
	  
  <div class="middle-container">
    <div class="left-part">
      <div class="blue-box1">
        <div id="infoBox">
	    <!--<div>
	      <div class="calender1"><a id="day" href="#"><img src="images/calender_img1.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
	DAY</div>
	      <div class="calender2"><a id= "week" href="#"><img src="images/calender_img2.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
	WEEK</div>
	      <div class="clr"></div>
	    </div>
	    <div style=" margin:15px 0px 0px 0px; border-top:1px solid #769196; height:1px;"></div>
	    <div class="inner-txt">
              <div id="infoBox">
	      </div>-->	
              </div>
	    </div>
        
         <div class="blue-box1">
        <div id="searchbox" style='display:none'>
        <input type='text' name='address' id='address' />
         <button onclick="setToken('<?php echo $_SESSION['token']; ?>');gymAdvancedSearch();">Search</button>  
	    <!--<div>
	      <div class="calender1"><a id="day" href="#"><img src="images/calender_img1.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
	DAY</div>
	      <div class="calender2"><a id= "week" href="#"><img src="images/calender_img2.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
	WEEK</div>
	      <div class="clr"></div>
	    </div>
	    <div style=" margin:15px 0px 0px 0px; border-top:1px solid #769196; height:1px;"></div>
	    <div class="inner-txt">
              <div id="infoBox">
	      </div>-->	
              </div>
	    </div>
	  </div>
	<!--</div>-->
	<div class="tabs">
	  <ul class="tabs-link">
	    <li><a id="schedule" href="javascript:void(0);">Schedule</a></li>
	    <li><a href="#" id='gymsearch'>Gym Search</a></li>
	    <li><a href="pages/userPref.php" class="popup" rel="width:250;height:300">Preferences</a></li>
	  </ul>
	</div>
	<div class="right-box">
	  <div class="balance-box" id="balanceBox">
	  </div>
	  <div class="right-featured-box">
	    <h1>Featured Gyms</h1>
            <div id="featuredGymsBox">
            </div>
	  </div>
	  <div style="height:20px;"></div>
	  <div class="right-featured-box">
	    <h1>Popular Workouts</h1>
	    <ul class="item-link">
	      <li><a href="#">Item 1</a></li>
	      <li><a href="#">Item 2</a></li>
	      <li><a href="#">Item 3</a></li>
	      <li><a href="#">Item 4</a></li>
	      <li><a href="#">Item 5</a></li>
	      <li><a href="#">Item 6</a></li>
	    </ul>
	  </div>
    </div>
  </div>
  <div class="clr"></div>
    <div class="footerbg">
      <div class="footer-container"><a href="#">How it works</a> | <a href="#">Locations</a> | <a href="#">About</a> | <a href="#">Contact Us</a> | <a href="#">Faq</a> | <a href="#">Privacy Policy</a> | <a href="#">Site Map</a><br />
	
	  Follow us on Twitter Become a fan on Facebook<br />
	
	  © 2012 Zunefit. All Rights Reserved
	  </div>
	</div>
  </body>
</html>
