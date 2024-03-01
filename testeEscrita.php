<?php
$ftp_server = "192.168.1.65";
$user="anonymous";
$password="ajuda@zonpharma.com";
$ficheiroLocal="teste.txt";

// set up a connection or die
$ftp = ftp_connect($ftp_server) or die("Couldn't connect to $ftp_server");
 ftp_login($ftp, $user, $password);
 
 // Ativar o modo passivo
ftp_pasv($ftp, true);

ftp_put($ftp,"teste2remoto.txt",$ficheiroLocal);
// Fecha a conexão FTP
    ftp_close($ftp);
?>


