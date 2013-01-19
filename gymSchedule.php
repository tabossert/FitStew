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
$array;
$arrays;
for ($j = 0; $j < 24 * 4; $j) {

    $array[$hr . ":" . $mn] = 0;
    $j++;
    $mn += 15;
    $mn = $j % 4 == 0 ? 0 : $mn;
    $hr = $j % 4 == 0 ? $hr + 1 : $hr;
}

for ($i = 0; $i < $length; $i++) {
    if ($obj[$i]->{$_POST["day"]} != "00:00:00") {
        $hr = 00;
        $mn = 00;
        $a = (int) substr($obj[$i]->{$_POST["day"]}, 0, 2) . ':' . (int) substr($obj[$i]->{$_POST["day"]}, 2, 2);
        $duration = $obj[$i]->{'duration'} / 15;

        for ($j = 0; $j < 24 * 4; $j) {
            $b = $hr . ':' . $mn;
            if ($a == $b) {
                $array[$hr . ":" . $mn] += 1;
                $arrays[$hr . ":" . $mn] = $obj[$i]->{'service'};
                while ($duration > 1) {

                    --$duration;

                    $j++;
                    $mn += 15;
                    $mn = $j % 4 == 0 ? 0 : $mn;
                    $hr = $j % 4 == 0 ? $hr + 1 : $hr;
                    $array[$hr . ":" . $mn] += 1;
                }


                break;
            }

            $j++;
            $mn += 15;
            $mn = $j % 4 == 0 ? 0 : $mn;
            $hr = $j % 4 == 0 ? $hr + 1 : $hr;
        }
    }
}
$hr = 00;
$mn = 00;
$max = 0;
for ($j = 0; $j < 24 * 4; $j) {
    if ($array[$hr . ":" . $mn] > $max) {
        $max = $array[$hr . ":" . $mn];
    }

    $j++;
    $mn += 15;
    $mn = $j % 4 == 0 ? 0 : $mn;
    $hr = $j % 4 == 0 ? $hr + 1 : $hr;
}


$max;
$hr = 00;
$mn = 00;
for ($j = 0; $j < 24 * 4; $j) {
    echo "<tr><td class='times'>" . $hr . ":" . $mn;
    for ($i = 0; $i < $max; $i++) {
        if ($array[$hr . ":" . $mn] > 0) {
            echo "</td><td class='service'>".$arrays[$hr . ":" . $mn];
            --$array[$hr . ":" . $mn];
        } else {
            echo "</td><td>";
        }
    }
    echo "</td></tr>";
    $j++;
    $mn += 15;
    $mn = $j % 4 == 0 ? 0 : $mn;
    $hr = $j % 4 == 0 ? $hr + 1 : $hr;
}


echo "</td></tr>";

echo "</table>";
?>
