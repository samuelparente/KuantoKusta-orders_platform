<?php


if (!file_exists('background_done.marker')) {
   
$url = 'http://localhost/KK/fetchLogin.php';
$response = file_get_contents($url);


$dataObj = json_decode($response,true);

$sharedFolderPath = '\\\\ZONPHARMA\\notasKK\\';
$ficheiroRemoto = "dataRemote.txt"; // Use the remote filename

// Download the remote file content to a temporary variable
$existingCsvData = "";
$filePath = $sharedFolderPath . $ficheiroRemoto;

if (file_exists($filePath)) {
    $existingCsvData = file_get_contents($filePath);
}

$csvData = $existingCsvData;

$changedIds = array();
$newIds = array();


foreach ($dataObj['data'] as $item) { // Access the 'data' array in the JSON
    $id = $item['id'];
    $key = $item['key'];
    $totalMessages = $item['stats']['totalMessages'];

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

// Upload the modified content directly to the remote file
if (file_exists($filePath)) {
    // Delete the existing remote file
    unlink($filePath);
}

// Upload the modified content
file_put_contents($filePath, $csvData);

$response = array(
    "newMessages" => (!empty($changedIds) || !empty($newIds)),
    "messages" => array_merge($changedIds, $newIds)
);


echo json_encode($response);

    // Save data to a JSON file
    file_put_contents('background_data.json', json_encode($response));

    // Create a marker to indicate completion
    file_put_contents('background_done.marker', 'done');
}
else{
	echo "already run";
}



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