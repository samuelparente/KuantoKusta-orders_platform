<?php

$jsonString = file_get_contents("php://input");
$data = json_decode($jsonString, true);

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
