window.onload = () => {

//variáveis globais
let i;

let apiKeyKK="jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj";
let urlApprovalKK="https://seller.kuantokusta.pt/api/kms/orders?page=1&maxResultsPerPage=100&orderState=WaitingApproval";
let urlApprovedKK="https://seller.kuantokusta.pt/api/kms/orders?page=1&maxResultsPerPage=100&orderState=Approved";
let enc_pending;
let enc_approved; 
let x=999;
let urlMessages = "https://seller.kuantokusta.pt/customer-support/messages";

//lista as encomendas pendentes
function encPending(){
	let pendingNumber=0;
	fetch(urlApprovalKK, {
		headers: {
			Accept: "application/json",
			"X-Api-Key":apiKeyKK
		}
	})

	.then(ordersKK => ordersKK.json()) 
	.then(ordersKK =>{
						//console.log(ordersKK[0].orderId)
						if (ordersKK.length>0) {
							pendingNumber = ordersKK.length;
							
							//atualiza div com valor
							let divPending = document.createElement("div");
							let h1 = document.createElement("h3");
							
							h1.innerHTML=pendingNumber;
							document.getElementById("left-column").append(divPending);
							divPending.append(h1);
						
							//botão para seguir para as encomendas
							let divBotaoPendentes = document.createElement("div");
							let botaoPendentes = document.createElement("button");
							botaoPendentes.setAttribute("class","btn btn-primary btn-sm");
							botaoPendentes.setAttribute("id","botaoIrPendentes");
							botaoPendentes.innerHTML="Ver encomendas";
							document.getElementById("left-column").append(divBotaoPendentes);
							divBotaoPendentes.append(botaoPendentes);
							
							//botao pendentes
							let pendentesBtn=document.getElementById('botaoIrPendentes');
							pendentesBtn.addEventListener("click", function pendentes(){
							window.open('pendingApproval.php',"_self");
								});

				
								}
							
								else{
									//atualiza div com valor
							let divPending = document.createElement("div");
							let h1 = document.createElement("h3");
							
							h1.innerHTML="0";
							document.getElementById("left-column").append(divPending);
							divPending.append(h1);
									
									
								}

					})

	
		.catch(errorKK => {
		
		//atualiza div com erro
					let divPending = document.createElement("div");
					let h3 = document.createElement("h3");

					h4.innerHTML="Não foi possível obter conexão com a API do KK.";
					document.getElementById("left-column").append(divPending);
					divPending.append(h3);
		
	}); 
							
	
	}
	
//////////////////////////////////////////////////////////////////////////////////////////
	
//lista as encomendas aprovadas
function encApproved(){

	return fetch(urlApprovedKK, {
		headers: {
			Accept: "application/json",
			"X-Api-Key":apiKeyKK
		}
	})

	.then(ordersApKK => ordersApKK.json()) 
	.then(ordersApKK =>{
						//console.log(ordersKK[0].orderId)
						if (ordersApKK.length>0) {
							let approvedNumber = ordersApKK.length;
							
							//atualiza div com valor
							let divApproved = document.createElement("div");
							let h1 = document.createElement("h3");
							
							h1.innerHTML=approvedNumber;
							document.getElementById("right-column").append(divApproved);
							divApproved.append(h1);
						
							//botão para seguir para as encomendas
							let divBotaoAprovadas = document.createElement("div");
							let botaoAprovadas = document.createElement("button");
							botaoAprovadas.setAttribute("class","btn btn-primary btn-sm");
							botaoAprovadas.setAttribute("id","botaoAprovadas");
							botaoAprovadas.innerHTML="Ver encomendas";
							document.getElementById("right-column").append(divBotaoAprovadas);
							divBotaoAprovadas.append(botaoAprovadas);
							
									//botao aprovadas
									let aprovadasBtn=document.getElementById('botaoAprovadas');
									aprovadasBtn.onclick=function aprovadas(){
									window.open('approved.php',"_self");
									}
							
								}
		
								else{
									//atualiza div com valor
							let divApproved = document.createElement("div");
							let h1 = document.createElement("h3");
							
							h1.innerHTML="0";
							document.getElementById("right-column").append(divApproved);
							divApproved.append(h1);
								
									
								}

					})

	
	.catch(errorKK => {
		
		
		let divPending = document.createElement("div");
					let h4 = document.createElement("h4");

					h4.innerHTML="Não foi possível obter conexão com a API do KK.";
					document.getElementById("right-column").append(divPending);
					divPending.append(h4);
	}); 
							
	
}
	



// Show the toast
function showToast() {
  const toast = new bootstrap.Toast(myToast);
  toast.show();
}

// Hide the toast
function hideToast() {
  const toast = new bootstrap.Toast(myToast);
  toast.hide();
}

//////////////////////////////////////////////////////

	
encPending();
encApproved();
mostraNotificacoes();

//abre o offcanvas com as mensagens das encomendas

    // Get the bell icon element
    var bellIcon = document.getElementById('bellNotifications');

    // Add a click event listener
    bellIcon.addEventListener('click', function () {
      // Get the offcanvas element
      var offcanvasElement = document.getElementById('staticBackdrop');

      // Show the offcanvas
      var offcanvas = new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.show();
    });


//let iconeNotificacao = document.getElementById("bellNotifications");
//iconeNotificacao.addEventListener("click", mostraNotificacoes);
	
	let searchBtn=document.getElementById('searchBtn');

	//botao pesquisa
	searchBtn.onclick=function pesquisaEnc(){
	let temp=document.getElementById('pesquisaEncText');
	
	let urlSearch="showorder.php?orderId="+temp.value;
	window.open(urlSearch,"_self");
	}

	
	document.getElementById("dashboard").addEventListener("click", function dashboard(){
		window.open("index.php","_self");
	});
	
document.getElementById("pendentes").addEventListener("click", function pendentes(){
		window.open("pendingApproval.php","_self");
	});

document.getElementById("aprovadas").addEventListener("click", function aprovadas(){
		window.open("approved.php","_self");
	});
}

