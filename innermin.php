<?php
/*
 * Intermediate file to intercept janrain user loagin ,feed the login information to zunefit api and get the token
 */
$jrnToke = $_POST["token"];
$zuneFitUrl =  "https://api.zunefit.com/api/userSignup/";
$chlead = curl_init();
curl_setopt($chlead, CURLOPT_URL, $zuneFitUrl);
curl_setopt($chlead, CURLOPT_HTTPHEADER, array('token: '.$jrnToke ,'ltype: web'));
curl_setopt($chlead, CURLOPT_VERBOSE, 1);
curl_setopt($chlead, CURLOPT_RETURNTRANSFER, true);
curl_setopt($chlead, CURLOPT_CUSTOMREQUEST, "POST"); 
curl_setopt($chlead, CURLOPT_SSL_VERIFYPEER, 0);
echo $chleadresult = curl_exec($chlead);
echo $chleadapierr = curl_errno($chlead);
echo $chleaderrmsg = curl_error($chlead);
curl_close($chlead);
?>
