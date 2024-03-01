
	document.getElementById("dashboard").addEventListener("click", function dashboard(){
		window.open("index.php","_self");
	});
	
document.getElementById("pendentes").addEventListener("click", function pendentes(){
		window.open("pendingApproval.php","_self");
	});

document.getElementById("aprovadas").addEventListener("click", function aprovadas(){
		window.open("approved.php","_self");
	});
	
	mostraNotificacoes();