<?php

$jsonString = file_get_contents("php://input");
$data = json_decode($jsonString, true);

$ficheiroLocal = "data.txt";
$ficheiroRemoto = "dataRemote.txt";
$ftp_server = "192.168.1.66";
$user="anonymous";
$password="ajuda@zonpharma.com";



//ler ficheiro atual do servidor remoto

$ftp = ftp_connect($ftp_server) or die("Não foi possível ligar ao servidor $ftp_server");
ftp_login($ftp, $user, $password);

// Ativar o modo passivo
ftp_pasv($ftp, true);

if(ftp_size($ftp,$ficheiroRemoto) != -1){
	
	//copia ficheiro ftp para local
	ftp_get($ftp,$ficheiroLocal,$ficheiroRemoto);

	// Fecha a conexão FTP
	ftp_close($ftp);

	//ler conteudo do ficheiro e enviar por json para preencher o campo das notas
	$existingCsvData = file_get_contents($ficheiroLocal);	
	
}
else{
	$existingCsvData = "id,key,totalMessages\n"; // Create header if file doesn't exist
}


/*
// Read existing  file content
if (file_exists($ficheiroLocal)) {
    $existingCsvData = file_get_contents($ficheiroLocal);
} else {
    $existingCsvData = "id,key,totalMessages\n"; // Create header if file doesn't exist
}
*/

$csvData = $existingCsvData;

$changedIds = array();
$newIds = array();

foreach ($data as $item) {
    $id = $item['id'];
    $key = $item['key'];
    $totalMessages = $item['totalMessages'];

    // Check if the id exists in the existing CSV data
    if (strpos($existingCsvData, $id) !== false) {
        // Extract the existing totalMessages for the id
        $existingTotalMessages = getValueFromCsvData($existingCsvData, $id, 'totalMessages');
        
        // Compare totalMessages and add to changedIds if different
        if ($existingTotalMessages != $totalMessages) {
            $changedIds[] = array("orderID" => $id, "key" => $key);
        }
    } else {
        // Append new data to CSV data
        $csvData .= "$id,$key,$totalMessages\n";
        $newIds[] = array("orderID" => $id, "key" => $key);
    }
}

//cria ficheiro local
	$fileCommentNew = fopen($ficheiroLocal,"w");
	fwrite($fileCommentNew,$csvData);
	fclose($fileCommentNew);
	
	
// liga servidor ftp e coloca o ficheiro atualizado com as mensagens
	$ftp = ftp_connect($ftp_server) or die("Não foi possível ligar ao servidor $ftp_server");
	ftp_login($ftp, $user, $password);
 
	// Ativar o modo passivo
	ftp_pasv($ftp, false);

	//copia ficheiro local para o servidor remoto ftp
	ftp_put($ftp,$ficheiroRemoto,$ficheiroLocal);
	
	// Fecha a conexão FTP
    ftp_close($ftp);

	
// Update the CSV file with the modified data
//file_put_contents($ficheiroLocal, $csvData);

$response = array(
    "newMessages" => (!empty($changedIds) || !empty($newIds)),
    "messages" => array_merge($changedIds, $newIds)
);

//


echo json_encode($response, JSON_PRETTY_PRINT);



// Helper function to extract values from CSV data
function getValueFromCsvData($csvData, $id, $fieldName) {
    $lines = explode("\n", $csvData);
    foreach ($lines as $line) {
        $fields = explode(",", $line);
        if ($fields[0] == $id) {
            return $fields[array_search($fieldName, explode(",", "id,key,totalMessages"))];
        }
    }
    return null;
}
?>
