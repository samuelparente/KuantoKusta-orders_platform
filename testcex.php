<?php
	$postBody = file_get_contents("php://input");
	
	$decodedJson=json_decode($postBody);
	
	$ref = $decodedJson->ref;
	$fecha = $decodedJson->fecha;
	$nomDest = $decodedJson->nomDest;
	$dirDest = $decodedJson->dirDest;
	$pobDest = $decodedJson->pobDest;
	$codPosNacDest = $decodedJson->codPosNacDest;
	$codPosIntDest  = $decodedJson->codPosIntDest;
	$paisISODest = $decodedJson->paisISODest;
	$contacDest = $decodedJson->contacDest;
	$telefDest = $decodedJson->telefDest;
	$observac = $decodedJson->observac;




$login = 'username';
$password = 'password';
$url = 'https://www.cexpr.es/wspsc/apiRestGrabacionEnviok8s/json/grabacionEnvio';
	// Setup request to send json via POST
$data = [
   "solicitante" => "IP38330001", 
   "ref" => $ref, 
   "refCliente" => "", 
   "fecha" => $fecha, 
   "codRte" => "P38330001", 
   "nomRte" => "ZONPHARMA", 
   "dirRte" => "RUA DOS PINHEIROS MANSOS 108", 
   "pobRte" => "AMARANTE", 
   "codPosNacRte" => "4600", 
   "codPosIntRte" => "4600", 
   "paisISORte" => "PT", 
   "contacRte" => "968672865", 
   "nomDest" => $nomDest, 
   "dirDest" => $dirDest, 
   "pobDest" => $pobDest, 
   "codPosNacDest" => $codPosNacDest, 
   "codPosIntDest" => $codPosIntDest, 
   "paisISODest" => $paisISODest, 
   "contacDest" => $contacDest, 
   "telefDest" => $telefDest, 
   "observac" => $observac, 
   "numBultos" => "1", 
   "kilos" => "1", 
   "producto" => "63", 
   "portes" => "P", 
   "listaBultos" => [
         [
            "alto" => "", 
            "ancho" => "", 
            "codBultoCli" => "", 
            "codUnico" => "", 
            "descripcion" => "", 
            "kilos" => "", 
            "largo" => "", 
            "observaciones" => "", 
            "orden" => "1", 
            "referencia" => "", 
            "volumen" => "" 
         ] 
      ], 
   "codDirecDestino" => "", 
   "listaInformacionAdicional" => [
               [
                  "tipoEtiqueta" => "2", 
                  "etiquetaPDF" => "N" 
               ] 
            ] 
]; 
 
	
$payload = json_encode($data);

	
$ch = curl_init();
	

curl_setopt($ch, CURLOPT_URL,$url);	
curl_setopt($ch, CURLOPT_POST, TRUE);	
	
	// Set the content type to application/json
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

	// Attach encoded JSON string to the POST fields
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
	
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_USERPWD, $login . ":" . $password);  

curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$result = curl_exec($ch);

/*
$info = curl_getinfo($ch);

 //debug////////////////////////////////////////////////////////////////////
$myfile = fopen("debug.txt", "w") or die("Unable to open file!");
fwrite($myfile,curl_error($ch));
fclose($myfile);
///////////////////////////////////////////////////////////////////////////
*/
curl_close($ch);  


	$resultConverted=json_decode($result);
	
	$dataReturn = ($resultConverted->{'codigoRetorno'});
	
	if ($dataReturn==0){
		
		$envioReturn = ($resultConverted->{'datosResultado'});
		$etiqueta = ($resultConverted->{'etiqueta'});
		$retornaCodigo = ["codigoRetorno"=>$dataReturn,"numeroEnvio"=>$envioReturn,"etiqueta"=>$etiqueta];
		}
	else{
		
		$retornaCodigo = ["codigoRetorno"=>$dataReturn,"numeroEnvio"=>"0"];
	}
	
	
	
	 $jsonReturn=json_encode($retornaCodigo);
	 
	header('Content-Type: application/json'); 
	echo($jsonReturn);

?>