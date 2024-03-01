<?php
	$postBody = file_get_contents("php://input");
	$decodedJson=json_decode($postBody);
	$ref = $decodedJson->ref;
	$nomeFatura = $decodedJson->nomeFatura;
	$morada1Fatura = $decodedJson->morada1Fatura;
	$morada2Fatura = $decodedJson->morada2Fatura;
	$cpFatura = $decodedJson->cpFatura;
	$localFatura = $decodedJson->localFatura;
	$nifFatura  = $decodedJson->nifFatura;
	
	//debug lista produtos
	//tem de gravar no ficheiro quantidade de produtos codigo e preço
	//se tiver portes de envio, enviar PENVIO
	
	$dataInvoice = $ref."\n".$nomeFatura."\n".$morada1Fatura."\n".$morada2Fatura."\n".$cpFatura."\n".$localFatura."\n".$nifFatura."\n";
		$fileInvoice = fopen("fatura.txt","w");
		fwrite($fileInvoice,$dataInvoice);
		fclose($fileInvoice);
header('Content-Type: application/json');
	$retornaCodigo = ["codigoRetorno"=>"1"];
	 $jsonReturn=json_encode($retornaCodigo);
	echo($jsonReturn);
?>