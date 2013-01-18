<?php

error_reporting(E_ERROR | E_PARSE);
include('includes/config.inc.php');

$datatopost = array(
    "start" => $_POST["start"],
    "end" => $_POST["end"]
);

$jrnToke = $_POST["token"];
$zuneFitUrl = API_URL . 'userSchedule/'; //"https://api.zunefit.com/api/userSchedule/";
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




$length = sizeof($obj);
if(!$obj->{'status'}){
    

for ($i = 0; $i < $length; $i++) {
    if(substr($obj[$i]->{'time'}, -2, 2) == 'PM'){
        $time = str_replace(' ', '',explode(':', substr($obj[$i]->{'time'}, 0, 5)));       
        $time[0] += 12; 
    }else{
         $time = str_replace(' ', '',explode(':', substr($obj[$i]->{'time'}, 0, 5)));
    }
  
    $arraysi[$i] = $time[0].":".$time[1];//$obj[$i]->{'time'};
}


echo "<table class='newScheduleTable'>";

$hr = 00;
$mn = 00;
$fif = 0;
for ($i = 0; $i < 24 * 4; $i) {
    $one = FALSE;
    if ($fif == 0) {
        for ($j = 0; $j < $length; $j++) {
            $a = $hr . ':' . $mn;
            $b = str_replace(array('AM', 'PM', ' '), '', $arraysi[$j]);

            if ($a == $b) {
                $one = TRUE;
                $fif = $obj[$j]->{'duration'} / 15 - 1;
                break;
            }
        }
    } else {
        --$fif;
        $one = TRUE;
        $two = TRUE;
    }
    if ($one) {
        if ($two) {
            echo "<tr><td class='times'><span>" . $hr . ":" . $mn . "<span></td><td class='service'></td></tr>";
            $two = FALSE;
        } else {
            echo "<tr><td class='times'><span>" . $hr . ":" . $mn . "<span></td><td class='service'>" . $obj[$j]->{'service'} . "</td></tr>";
        }
    } else {
        echo "<tr><td class='times'><span>" . $hr . ":" . $mn . "<span></td><td></td></tr>";
    }
    $i++;
    $mn += 15;
    $mn = $i % 4 == 0 ? 0 : $mn;
    $hr = $i % 4 == 0 ? $hr + 1 : $hr;
}
}
echo "</table>";
?>
