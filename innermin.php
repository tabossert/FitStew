<?php
echo '';
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
echo $_POST["token"];
$closeOppURL =  "https://api.zunefit.com/api/userSignup/";
$chlead = curl_init();
curl_setopt($chlead, CURLOPT_URL, $closeOppURL);
curl_setopt($chlead, CURLOPT_USERAGENT, 'SugarConnector/1.4');
curl_setopt($chlead, CURLOPT_HTTPHEADER, array('token: '.$_POST["token"] ,'ltype: web'));
curl_setopt($chlead, CURLOPT_VERBOSE, 1);
curl_setopt($chlead, CURLOPT_RETURNTRANSFER, true);
curl_setopt($chlead, CURLOPT_CUSTOMREQUEST, "PUT"); 
//curl_setopt($chlead, CURLOPT_POSTFIELDS,$update_json);
curl_setopt($chlead, CURLOPT_SSL_VERIFYPEER, 0);
echo $chleadresult = curl_exec($chlead);
echo $chleadapierr = curl_errno($chlead);
echo $chleaderrmsg = curl_error($chlead);
curl_close($chlead);
?>
