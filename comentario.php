<?php

	$postBody = file_get_contents("php://input");
	$decodedJson=json_decode($postBody);
	$idEnc = $decodedJson->idEnc;
	$comentario = $decodedJson->comentario;
	
	//$idEnc = "1234567890";
	//$comentario = "teste";
	
	$ftp_server = "192.168.1.66";
	$user="anonymous";
	$password="ajuda@zonpharma.com";
	$ficheiroLocal=$idEnc.".txt";
	$ficheiroRemoto = $ficheiroLocal;	

	//cria ficheiro local
	$fileCommentNew = fopen($ficheiroLocal,"w");
	fwrite($fileCommentNew,$comentario);
	fclose($fileCommentNew);
	
	// liga servidor ftp
	$ftp = ftp_connect($ftp_server) or die("Não foi possível ligar ao servidor $ftp_server");
	ftp_login($ftp, $user, $password);
 
	// Ativar o modo passivo
	ftp_pasv($ftp, true);

	//copia ficheiro local para o servidor remoto ftp
	ftp_put($ftp,$ficheiroRemoto,$ficheiroLocal);
	
	// Fecha a conexão FTP
    ftp_close($ftp);
		
		
		
	//retorno
	$retornaCodigo = ["codigoRetorno"=>"1"];
	$jsonReturn=json_encode($retornaCodigo);
	header('Content-Type: application/json');
	echo($jsonReturn);
?>