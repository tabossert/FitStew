<?php

error_reporting(E_ERROR | E_PARSE);
include('includes/config.inc.php');

$datatopost = array(
    "day" => $_POST["day"],
    "gymid" => $_POST["gymid"]
);

$jrnToke = $_POST["token"];
$zuneFitUrl = API_URL . 'getDayClasses/'; //"https://api.zunefit.com/api/userSchedule/";
$chlead = curl_init();

curl_setopt($chlead, CURLOPT_URL, $zuneFitUrl);
curl_setopt($chlead, CURLOPT_HTTPHEADER, array('token: ' . $jrnToke, 'ltype: web'));
curl_setopt($chlead, CURLOPT_VERBOSE, 1);
curl_setopt($chlead, CURLOPT_POST, true);
curl_setopt($chlead, CURLOPT_POSTFIELDS, $datatopost);
curl_setopt($chlead, CURLOPT_RETURNTRANSFER, true);
curl_setopt($chlead, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($chlead, CURLOPT_SSL_VERIFYPEER, 0);
$chleadresult = curl_exec($chlead);

curl_close($chlead);

$obj = json_decode($chleadresult);

echo "<table class='newScheduleTable'>";
$length = sizeof($obj);
$hr = 00;
$mn = 00;
for ($i = 0; $i < 24 * 4; $i) {

    echo "<tr><td class='times'><span>" . $hr . ":" . $mn . "<span></td><td></td><td></td><td></td></tr>";

    $i++;
    $mn += 15;
    $mn = $i % 4 == 0 ? 0 : $mn;
    $hr = $i % 4 == 0 ? $hr + 1 : $hr;
}

echo "</table>";
?>
