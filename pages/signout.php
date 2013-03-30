<?php
include('../includes/config.inc.php');
session_start();
unset($_SESSION['token']);
session_destroy();
header('Location: '.SITE_URL) ;

?>