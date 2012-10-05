<?php


function apiCall($url,$verb,$auth,$poststr = ""){
		$headArr = array();
                $curl_connection = curl_init($url);
                curl_setopt($curl_connection, CURLOPT_CONNECTTIMEOUT, 30);
                curl_setopt($curl_connection, CURLOPT_USERAGENT,
                  "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)");
                curl_setopt($curl_connection, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($curl_connection, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($curl_connection, CURLOPT_FOLLOWLOCATION, 1);
		if($auth == 1) {
		  $headArr[] = "ltype: web";
		  $headArr[] = "token: " . $_SESSION['token'];
		}
		if($verb == 'POST') {
                  curl_setopt($curl_connection, CURLOPT_POSTFIELDS, $poststr);
   		  $headArr[] = "Content-Type: application/json";
		  $headArr[] = "Content-Length: " . strlen($poststr);
                  curl_setopt($curl_connection, CURLOPT_HTTPHEADER, $headArr);
		}
		if($verb == 'DELETE')
		{
		  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
		}
                $result = curl_exec($curl_connection);
                curl_close($curl_connection);

                return $result;
}


?>
