<?php
include('includes/config.inc.php');

session_start();
//This is for development, please remove for production
$_SESSION = "nkjdnkjsdnkjsdnfks";

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
    <link href="css/styleold.css" rel="stylesheet" type="text/css" />
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
	  }
   $('#schedule').live('click', function() {
                  getSchedule(Date.today().toString('yyyy-M-d'),Date.today().addDays(1).toString('yyyy-M-d'));
                });
                $('#day').live('click', function() {
												 	setToken('<?php echo $_SESSION['token']; ?>');
                  gymSchedule();
				//  setListeners();
                });
                $('#week').live('click', function() {
                  gymSchedule();
                });
	  function boot() {
		setToken('<?php echo $_SESSION['token']; ?>');
	//  	getBalance();
		setToken('<?php echo $_SESSION['token']; ?>');
		getGymStat();
	  //     featuredGyms();
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
        <div class="login-link"><a href="#">Sign-out</a></div>
        <div class="my-box">
  	      <ul class="toplink">
	        <li><a href="pages/how.html" class="popup" rel="width:250;height:300">How it works</a></li>
	        <li><a href="inner.php">Customers </a></li>
	        <li><a href="owner.php">Gyms</a></li>
	        <li><a href="pages/gymLoc.php" class="popup" rel="width:250;height:300">Gym Locations</a></li>
	      </ul>
        </div>
      </div>
      <div class="clr"></div>
    </div>
  </div>

  <div class="middle-container">
    <div class="left-part">
      <div class="blue-box1">
        <!--<div>
          <div class="calender1"><a href="#"><img src="images/calender_img1.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
DAY</div>
          <div class="calender2"><a href="#"><img src="images/calender_img2.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
WEEK</div>
          <div class="calender3"><a href="#"><img src="images/calender_img3.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
MONTH</div>
          <div class="clr"></div>
        </div>-->
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
        <div style=" margin:15px 0px 0px 0px; border-top:1px solid #769196; height:1px;"></div>
        <div id='gymScheduleBox'>
        <div class="inner-txt">
          <h1>Monday, April 1st, 2012</h1>
          <ul class="calender-link">
            <li><a href="#">Tervor Bossert</a></li>
            <li><a href="#">Antony Zimzores</a></li>
            <li><a href="#">Daniel Jensen</a></li>
          </ul>
          <h1>Monday, April 2nd, 2012</h1>
          <ul class="calender-link">
            <li><a href="#">Tervor Bossert</a></li>
            <li><a href="#">Antony Zimzores</a></li>
            <li><a href="#">Daniel Jensen</a></li>
          </ul>
        </div>
        </div>
      </div>
    </div>
    <div class="tabs">
      <ul class="tabs-link">
        <li><a href="#">Profile</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Analytics</a></li>
        <li><a href="#">Preferences</a></li>
         <li><a href="pages/userGym.php" class="popup" rel="width:250;height:300">Add Gym</a></li>
      </ul>
    </div>

    <div class="right-box">
      <div class="right-featured-box">
        <h1>Quick State</h1>
		<ul class="item-link">
		  <li><a href="#">3 visits/day</a></li>
		  <li><a href="#">55 profile views Today</a></li>
		  <li><a href="#">Average Gym Rate $5.50</a></li>
	      <li><a href="#">Some other Statistics</a></li>
		</ul>
      </div>
    </div>
  </div>
  <div class="clr"></div>
  <div class="footerbg">
    <div class="footer-container"><a href="#">How it works</a> | <a href="#">Locations</a> | <a href="#">About</a> | <a href="#">Contact Us</a> | <a href="#">Faq</a> | <a href="#">Privacy Policy</a> | <a href="#">Site Map</a><br />

    Follow us on Twitter Become a fan on Facebook<br />

    � 2012 Zunefit. All Rights Reserved</div>
  </div>
  </body>
</html>
