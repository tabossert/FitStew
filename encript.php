<?php
session_start();
include('includes/config.inc.php');

$allowedExts = array("jpg", "jpeg", "gif", "png");
$extension = end(explode(".", $_FILES["file"]["name"]));
if ((($_FILES["file"]["type"] == "image/gif")
        || ($_FILES["file"]["type"] == "image/jpeg")
        || ($_FILES["file"]["type"] == "image/png")
        || ($_FILES["file"]["type"] == "image/pjpeg"))
        && in_array($extension, $allowedExts)) {
    if ($_FILES["file"]["error"] > 0) {
        echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
    } else {
       

     echo   $meh = file_get_contents($_FILES['file']['tmp_name']);
        $results = base64_encode($meh);
        echo $name = $_FILES["file"]["name"];
        
    }
} else {
    echo "Invalid file";
}
$datatopost = array (
"gymid" => $results,
"iName" => $name,
"image" => $_POST['gid'],
);

$jrnToke = $_SESSION["token"];
$zuneFitUrl =  "https://api.zunefit.com/api/addGymImage/";
$chlead = curl_init();
curl_setopt($chlead, CURLOPT_URL, $zuneFitUrl);
curl_setopt($chlead, CURLOPT_HTTPHEADER, array('token: '.$jrnToke ,'ltype: web'));
curl_setopt ($chlead, CURLOPT_POSTFIELDS, $datatopost);
curl_setopt($chlead, CURLOPT_VERBOSE, 1);
curl_setopt($chlead, CURLOPT_RETURNTRANSFER, true);
curl_setopt($chlead, CURLOPT_CUSTOMREQUEST, "POST"); 
curl_setopt($chlead, CURLOPT_SSL_VERIFYPEER, 0);
$chleadresult = curl_exec($chlead);

//$obj = json_decode($chleadresult);
//f($obj[0]->{'status'} === 'success')
////$path = $obj[0]->{'path'};



var_dump($chleadresult);

//header ("Location: ".SITE_URL."owner.php");

//echo $chleadapierr = curl_errno($chlead);
//echo $chleaderrmsg = curl_error($chlead);
curl_close($chlead);


?>