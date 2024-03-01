<?php
$postLabel = file_get_contents("php://input");
$decodedJsonLabel=json_decode($postLabel);
	
	$zpl = $decodedJsonLabel->etiqueta;

$curl = curl_init();
// adjust print density (8dpmm), label width (4 inches), label height (6 inches), and label index (0) as necessary
curl_setopt($curl, CURLOPT_URL, "http://api.labelary.com/v1/printers/8dpmm/labels/4x6/0/");
curl_setopt($curl, CURLOPT_POST, TRUE);
curl_setopt($curl, CURLOPT_HTTPHEADER, array("Accept: application/pdf","X-Rotation: 90","X-Page-Size: A4","X-Page-Orientation: Portrait","X-Page-Align: Left","X-Page-Vertical-Align: Top")); // omit this line to get PNG images back
curl_setopt($curl, CURLOPT_POSTFIELDS, $zpl);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

$result = curl_exec($curl);


if (curl_getinfo($curl, CURLINFO_HTTP_CODE) == 200) {
    $file = fopen("etiqueta.pdf", "w"); // change file name for PNG images
    fwrite($file, $result);
    fclose($file);
} else {
    echo("Error: $result");
}

curl_close($curl);

?>