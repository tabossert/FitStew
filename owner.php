<?php
include('includes/RestRequest.inc.php');
include('includes/config.inc.php');

session_start();

if(isset($_POST['token']) || isset($_SESSION['token']))
{
  if(isset($_POST['token']))
  {
    $pbody = json_encode(array("token" => $_POST['token'], "ltype" => "web"));
    $request = apiCall(API_URL .'gymSchedule/','POST',0,$pbody);
    $response = json_decode($request);
	print_r($response);exit;
    $_SESSION['token'] = $response[0]->token;
    header('Location: '.SITE_URL.'innerowner.php');
  }
  header('Location: '.SITE_URL.'innerowner.php');
  
} else {
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title>ZuneFit Gym Panel</title>
    <link rel="stylesheet" href="css/easyprint.css" media="print" />
    <link rel="stylesheet" href="css/easy.css" media="screen" />
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/curvycorners.src.js"></script>
    <script type="text/javascript" src="js/easy.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/janrain.js"></script>
    <script type="text/javascript" src="js/owner.js"></script>
    
   
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
        <div>
          <div class="calender1"><a href="#"><img src="images/calender_img1.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
DAY</div>
          <div class="calender2"><a href="#"><img src="images/calender_img2.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
WEEK</div>
          <div class="calender3"><a href="#"><img src="images/calender_img3.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
MONTH</div>
          <div class="clr"></div>
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
      </ul>
    </div>

    <div class="right-box">
        <div class="right-featured-box" onclick="fun()">
        <h1>Quick State</h1>
		<ul class="item-link">
		  <li><a href="#">3 visits/day</a></li>
		  <li><a href="#">55 profile views Today</a></li>
		  <li><a href="#">Average Gym Rate $5.50</a></li>
                  <li><a href="#" onclick="fun();">Some other Statistics</a></li>
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

<?php
}
?>