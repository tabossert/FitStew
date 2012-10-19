<?php
/**
 * Header file of the ZuneFit web application.This file includs all the essential style and javascript libraries.
 * Also initialzing the janrain web service
 */
include('includes/RestRequest.inc.php');
include('includes/config.inc.php');

session_start();

//Get current page
$currentFile = $_SERVER["PHP_SELF"];
$parts = Explode('/', $currentFile);
$page = $parts[count($parts) - 1];

if ($page != 'index.php') {
    if (isset($_POST['token'])) {
        $_SESSION['token'] = $_POST['token'];
    }
    if (!isset($_SESSION['token'])) {
        header('Location: ' . SITE_URL);
    }
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <html xmlns:fb="http://ogp.me/ns/fb#">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
            <title><?php echo (isset($title) ? $title : "ZuneFit"); ?></title>
            <link href="css/style.css" rel="stylesheet" type="text/css" />
            <link href="fonts/stylesheet1.css" rel="stylesheet" type="text/css" />
            <link href="web-font/stylesheet2.css" rel="stylesheet" type="text/css" />
            <link rel="stylesheet" type="text/css" href="css/ceebox.css" />
            <link rel="stylesheet" type="text/css" href="css/widgets.css" />
            <link rel="stylesheet" type="text/css" href="fancybox/jquery.fancybox-1.3.4.css" />

            <script type="text/javascript" src="js/curvycorners.src.js"></script>
            <script type="text/javascript" src="js/validation.js"></script>
            <script src="js/jquery-1.7.1.js"></script>
            <script src='js/jquery.ceebox-min.js'></script>
            <script src='js/jquery.color.js'></script>
            <script src='js/jquery.metadata.js'></script>
            <script src='fancybox/jquery.fancybox-1.3.4.js'></script>
            <?php //if ($page != 'index.php') : ?>
                <script src='js/SHA1.js'></script>
                <script src='js/janrain.js'></script>
                <script src='js/widgets.js'></script>
                <script src='js/validation.js'></script>
            <?php// endif; ?>
            <script type="text/javascript">
                $(function() {
                    if (typeof window.janrain !== 'object') window.janrain = {};
                    if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};
    	            
                    janrain.settings.tokenUrl = '<?php echo SITE_URL; ?>innermin.php';
	
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
                });
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
                            <?php if (!(isset($_SESSION['token']) && $_SESSION['token'] != '')) : ?>
                                <a class = "janrainEngage" href = "#">User Sign-In</a> | <a href = "#frmOwnersLogin" id = "wsn">Gym Sign-In</a>
                            <?php else : ?>
                                <a href = "logout.php">Sign-out</a> 
                            <?php endif; ?>
                            <div class = "my-box">
                                <ul class = "toplink">
                                    <li><a href = "pages/how.html" class = "popup" rel = "width:250;height:300">How it works</a></li>
                                    <li><a href = "inner.php">Customers </a></li>
                                    <li><a href = "owner.php">Gyms</a></li>
                                    <li><a href = "pages/gymLoc.php" class = "popup" rel = "width:250;height:300">Locations</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class = "clr"></div>
