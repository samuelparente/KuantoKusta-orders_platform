
<?php
$phpOrderId = $_GET["orderId"];
if($phpOrderId==""){
	$phpOrderId="1234567890";
}
?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Pragma" content="no-cache">
		<title>ZONPHARMA-Gestão de encomendas KK</title>
		
		<!-- CSS only -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">	
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
	
		<!-- JavaScript Bundle with Popper -->
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
	
		<script src="js/kk_order.js"></script>
	
		<link href="plataform.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">
		
</head>

<body>
	
	<div class="container-fluid">
			<?php include("platform_header.php");?>
				
				
			<!--<div class="col-md-12" id="titulo">
			Sistema de Gestão de encomendas do Kuanto Kusta
			</div>-->
			
				<div class="col-md-12" id="corpo">
				<?php include("platform_show_order.php");?>
					
				</div>
		
		
		</div>
				
		<!--container-->
	<!--	</div>-->
			<?php include("platform_foot.php");?>
</body>
</html>
