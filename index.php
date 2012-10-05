<?php
include('includes/RestRequest.inc.php');
include('includes/config.inc.php');

session_start();
if(isset($_POST['token']) || isset($_SESSION['token']))
{
  if(isset($_POST['token']))
  {
    $pbody = json_encode(array("token" => $_POST['token'], "ltype" => "web"));
    $request = apiCall(API_URL .'userSignup/','POST',0,$pbody);
    $response = json_decode($request);
    $_SESSION['token'] = $response[0]->token;
    header('Location: '.SITE_URL.'inner.php');
  }
  header('Location: '.SITE_URL.'inner.php');
} else {
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<html xmlns:fb="http://ogp.me/ns/fb#">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
  <title>ZuneFit  </title>
  <link href="css/style.css" rel="stylesheet" type="text/css" />
  <link href="fonts/stylesheet1.css" rel="stylesheet" type="text/css" />
  <link href="web-font/stylesheet2.css" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" type="text/css" href="css/ceebox.css" />

  <script type="text/javascript" src="js/curvycorners.src.js"></script>
  <script src="js/jquery.js"></script>
  <script src='js/jquery.ceebox-min.js'></script>
  <script src='js/jquery.color.js'></script>
  <script src='js/jquery.metadata.js'></script>
  <script type="text/javascript">
	(function() {
	    if (typeof window.janrain !== 'object') window.janrain = {};
	        if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};
	            
	    janrain.settings.tokenUrl = '<?php echo SITE_URL;?>index.php';
	
	    function isReady() { janrain.ready = true; };
	        if (document.addEventListener) {
	              document.addEventListener("DOMContentLoaded", isReady, false);
	                  } else {
	                        window.attachEvent('onload', isReady);
	                            }
	
	    var e = document.createElement('script');
	        e.type = 'text/javascript';
	            e.id = 'janrainAuthWidget';
	
	    if (document.location.protocol === 'https:') {
	          e.src = 'https://rpxnow.com/js/lib/zunefittesting/engage.js';
	              } else {
	                    e.src = 'http://widget-cdn.rpxnow.com/js/lib/zunefittesting/engage.js';
	                        }
	
	    var s = document.getElementsByTagName('script')[0];
	        s.parentNode.insertBefore(e, s);
	        })();
  </script>
</head>

<body>
<!-- Facebook SDK -->
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<!-- Facebook SDK END -->



<div class="headerbg">
  <div class="header-container">
    <div class="logo"><a href="#"><img src="images/logo.png" alt="" border="0"/></a></div>
    <div class="topmenu">
	<div class="login-link"> 
        <a class="janrainEngage" href="#">User Sign-In</a>| <a href="#">Gym Sign-In</a></li>
        <div class="my-box">
          <ul class="toplink">
            <li><a href="pages/how.html" class="popup" rel="width:250;height:300">How it works</a></li>
            <li><a href="inner.php">Customers </a></li>
            <li><a href="owner.php">Gyms</a></li>
            <li><a href="pages/gymLoc.php" class="popup" rel="width:250;height:300">Locations</a></li>
	</ul>
        </div>
	</div>
    </div>
  </div>
<div class="clr"></div>


<div class="main-middle-container">
  <div class="left-part">
    <h1>Pay as you go fitness...</h1>
    <div class="blue-box">
      <div class="blue-box-text">
        <p>ZuneFit let's you pay as you go while attending multiple gyms.  You can work out as little or as much as you want and only pay when you go to the gym.  With ZuneFit there are never any long term commitments or contracts.</p>
      </div>
    </div>
  <div class="heading"><h1>Multiple Locations</h1></div>
  <div class="white-box"><img src="images/map_img.jpg" alt="" /></div>
  <div class="heading2">
    <h1>Gym goers, how it works</h1>
    <p>With ZuneFit, you sign up, fund your account, and locate a gyms in your area.  Once you show up at the gym check in with your phone number
    and PIN and then attend the class or use the gym like you would if you had a membership.  It's that simple. </p>
  </div>
<div class="read-link"><a href="#">Read more...</a></div>
</div>

<div class="right-part">
  <div class="black-box">
	<video width="420" height="360" controls="controls" poster="images/logo.png">
      <source src="<?php echo SITE_URL; ?>zunefit_02.mp4" type="video/mp4" />
      <source src="<?php echo SITE_URL; ?>zunefit_02.mp4" type='application/ogg; codecs="theora, vorbis"'> 
      Your browser does not support the video tag.
    </video>
  </div>
  <div class="heading3"><h1>Multiple Gym Types</h1></div>
  <div class="white-box1"><img src="images/gym_pic.jpg" alt="" /></div>
  <div class="heading4">
    <h1>Gym owners, how it works</h1>
    <p>If you own or manage a gym and want to be listed on ZuneFit you sign up for an account, build your profile page, and wait for new customers
    to start attending your gym.  It's that easy. </p>
  </div>
  <div class="read-link"><a href="#">Read more...</a></div>
</div>
<div class="clr"></div>
  <div class="sliderbg">
    <h1>Partners</h1>
    <div class="greybg">
      <div class="arrow-left"><img src="images/left_arrow.png" alt="" /></div>
      <div class="logo-section"><img src="images/logo1.gif" /><img src="images/logo2.gif" style="margin:0px 0px 0px 14px;" /><img src="images/logo3.gif" style="margin:0px 0px 0px 14px;" /><img src="images/logo4.gif" style="margin:0px 0px 0px 14px;" /><img src="images/logo5.gif" style="margin:0px 0px 0px 14px;" /></div>
      <div class="arrow-right"><img src="images/right_arrow.png" alt="" /></div>
      <div class="clr"></div>
    </div>
  </div>
</div>
<!--</div>-->

<div class="clr"></div>
<div class="footerbg">
  <div class="footer-container"><a href="#">How it works</a> | <a href="#">Locations</a> | <a href="#">About</a> | <a href="#">Contact Us</a> | <a href="#">Faq</a> | <a href="#">Privacy Policy</a> | <a href="#">Site Map</a><br />

Follow us on Twitter Become a fan on Facebook<br />

� 2012 Zunefit. All Rights Reserved</div>
  </div>
</div>  
</body>
</html>

<?php
}
?>


