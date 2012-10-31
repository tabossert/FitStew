<?php
session_start();
include('includes/config.inc.php');
echo "asd";
echo $jrnToke = $_POST["token"];

$zuneFitUrl =  "https://api.zunefit.com/api/userSignup/";
$chlead = curl_init();
curl_setopt($chlead, CURLOPT_URL, $zuneFitUrl);
curl_setopt($chlead, CURLOPT_HTTPHEADER, array('token: '.$jrnToke ,'ltype: web'));
curl_setopt($chlead, CURLOPT_VERBOSE, 1);
curl_setopt($chlead, CURLOPT_RETURNTRANSFER, true);
curl_setopt($chlead, CURLOPT_CUSTOMREQUEST, "POST"); 
curl_setopt($chlead, CURLOPT_SSL_VERIFYPEER, 0);
$chleadresult = curl_exec($chlead);
$obj = json_decode($chleadresult);

//$token = $obj[0]->{'token'};
$token = $obj[0]->{'token'};
echo $_SESSION['token']= $token;
var_dump($chleadresult);

//header ("Location: ".SITE_URL."inner.php");

//echo $chleadapierr = curl_errno($chlead);
//echo $chleaderrmsg = curl_error($chlead);
curl_close($chlead);

?>