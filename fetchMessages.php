<?php

//$cnpPesquisa ="7754473"; 
// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json);

$token = $data -> token;

//$url="https://seller.kuantokusta.pt/api/v1/auth/login";
$user="user";
$password="pass";

$payload = "=10&page=1&involvedUserKey=5fda28d57fe538d12f3f9b1f&lastSenderRoleNotEqual=seller&startedAt=2023-04-23T14:34:59.673";
$urlMessages = "https://seller.kuantokusta.pt/api/discussions?".$payload;



/*
$payload = array(
    "username" => $user,
    "password" => $password
);
*/

$cookieFile = 'c:\inetpub\wwwroot\KK\curl_cookie.txt';

//$ch = curl_init();
	
curl_setopt($ch, CURLOPT_URL,$urlMessages);	


curl_setopt($ch, CURLOPT_COOKIEFILE, $cookieFile);

curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);


curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$result = curl_exec($ch);

// Close curl
curl_close($ch);


echo($result);
?>
