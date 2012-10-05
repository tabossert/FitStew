<?php
include('../includes/config.inc.php');

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
    <link href="../css/style.css" rel="stylesheet" type="text/css" />
    <script src="../js/boot.js"></script>	
    <script src="../js/jquery-1.5.2.js"></script>
  </head>
  <body onload="getUserPref();">
  <div class="middle-container">  
    <div class="up-blue-box">
      Email      <input type="text" name="email" id="email" /><br>
      First Name <input type="text" name="firstName" id="firstName" /><br>
      Last Name  <input type="text" name="lastName" id="lastName" /><br>
      Address    <input type="text" name="address" id="address" /><br>
      City       <input type="text" name="city" id="city" /><br>
      State      <input type="text" name="state" id="state" /><br>
      Zipcode    <input type="text" name="zipcode" id="zipcode" /><br>
      <button onclick="updateUserPref();">Update</button>  
    </div>
  </div>
  </body>
</html>
