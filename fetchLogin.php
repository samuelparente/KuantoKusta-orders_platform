<?php


$url="https://seller.kuantokusta.pt/api/v1/auth/login";
$user="user";
$password="password";

$urlMessages = "https://seller.kuantokusta.pt/customer-support/messages";

$payload = "=20&page=1&involvedUserKey=5fda28d57fe538d12f3f9b1f&lastSenderRoleNotEqual=seller&startedAt=2023-11-01T00:00:00.000";
$urlMessages = "https://seller.kuantokusta.pt/api/discussions?".$payload;


$payload = array(
    "username" => $user,
    "password" => $password
);

$ch = curl_init();

// Enable storing of cookies in a file
$cookieFile = 'c:\inetpub\wwwroot\KK\curl_cookie.txt';
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookieFile);
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookieFile);

curl_setopt($ch, CURLOPT_COOKIE, "curl_cookie=curl_cookie; SameSite=None; Secure");

curl_setopt($ch, CURLOPT_URL,$url);	
curl_setopt($ch, CURLOPT_POST, TRUE);	
	
// Set the content type to application/json
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

// Attach encoded JSON string to the POST fields
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

	
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
curl_setopt($ch, CURLOPT_USERPWD, $user . ":" . $password);  

curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$result = curl_exec($ch);

// Parse the response JSON to get the token
$responseData = json_decode($result, true);
$token = $responseData['token'];


$ch = curl_init();

// Set the URL for the GET request
curl_setopt($ch, CURLOPT_URL, $urlMessages);

// Set the Authorization header with the token
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
));

// Disable SSL verification
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Execute the GET request
$resposta = curl_exec($ch);


// Close the cURL handle
curl_close($ch);


?>
