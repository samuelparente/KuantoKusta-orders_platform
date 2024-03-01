 <?php
 header("Access-Control-Allow-Origin: *");
?>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Documento sem título</title>
</head>

<body>
	
	<?php

$url = "https://seller.kuantokusta.pt/api/kms/orders/9551-922436-6075/approve";

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_PATCH, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$headers = array(
   "accept: */*",
   "x-api-key: 56653fc7a2.ce50a66a33f44cea93e40c",
   "Content-Length: 0",
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
//for debug only!
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$resp = curl_exec($curl);
curl_close($curl);
var_dump($resp);

?>
</body>
</html>