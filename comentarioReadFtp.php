<?php
	$postBody = file_get_contents("php://input");
	$decodedJson=json_decode($postBody);
	$idEnc = $decodedJson->idEnc;
	$ftp_server = "192.168.1.65";
	$user="anonymous";
	$password="ajuda@zonpharma.com";
	$ficheiroLocal=$idEnc.".txt";
	$ficheiroRemoto = $idEnc.".txt";	

	// liga servidor ftp
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
		$notas = file_get_contents($ficheiroLocal);	
	}
	else{
		$notas  = "Sem notas.";
	}
	
		
	//retorno
	$retornaCodigo = ["codigoRetorno"=>"1","notas"=>$notas,];
	$jsonReturn=json_encode($retornaCodigo);
	header('Content-Type: application/json');
	echo($jsonReturn);
?>