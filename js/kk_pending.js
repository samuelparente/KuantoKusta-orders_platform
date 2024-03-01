

window.onload = () => {
	
var fetches = [];
var counter=0;	
var i;
	var w;
	var s;
//index de posição
const posicaoX = 10;
const posicaoY = 10;
var orderDeliveryData={};
var orderInvoiceData={};
var orderHeaderData={};
var arrayEnc=[];
var ordersPrintData=[];
var idEnc;
var encObjects=[];
	var dadosFatura=[];
	
//sandbox
var apiKeyKKsandbox="jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj";
var urlApprovalKKsandbox ="https://seller-sandbox.kuantokusta.pt/api/kms/orders?page=1&maxResultsPerPage=100&orderState=WaitingApproval";
var urlApprovedKKsandbox ="https://seller-sandbox.kuantokusta.pt/api/kms/orders?page=1&maxResultsPerPage=100&orderState=Approved";	
var urlCancelSandbox="";


//produção
var apiKeyKKproduction="jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj";
var urlApprovalKKProduction="https://seller.kuantokusta.pt/api/kms/orders?page=1&maxResultsPerPage=100&orderState=WaitingApproval";
var urlApprovedKK="https://seller.kuantokusta.pt/api/kms/orders?page=1&maxResultsPerPage=100&orderState=Approved";
	
var urlOrder = "https://seller.kuantokusta.pt/api/kms/orders/";
var urlOrderSandbox ="https://seller-sandbox.kuantokusta.pt/api/kms/orders/";	
	var urlSearch = "https://www.zonpharma.com/pt/pesquisa_36.html?c=1&term=";
	
var enc_pending;
var enc_approved; 
var x=999;
	var cnp=0;
	var productName=0;
	var produtos=0;
	var productQty=0;

//lista as encomendas pendentes
function encPendingList(){
	var pendingNumber=0;
	fetch(urlApprovalKKProduction, {
		headers: {
			Accept: "application/json",
			'X-Api-Key':apiKeyKKproduction
		}
	})

	.then(ordersKK => ordersKK.json()) 
	.then(ordersKK =>{
						//console.log(ordersKK[0].orderId)
						if (ordersKK.length>0) {
							
							var tabelaDiv = document.getElementById("column-pending");
							var table = document.createElement('table');
							var thead = document.createElement('thead');
							var tbody = document.createElement('tbody');
							
							table.setAttribute('class','table table-striped');
							table.setAttribute('id','tabela-enc');
							table.appendChild(thead);
							table.appendChild(tbody);
							tabelaDiv.appendChild(table);
							
							// Cabeçalhos das colunas
							var row_1 = document.createElement('tr');
							
							var heading_1 = document.createElement('th');
							heading_1.innerHTML = "#";
							
							//var heading_6 = document.createElement('th');
							//heading_6.innerHTML = "";
							
							var heading_2 = document.createElement('th');
							heading_2.innerHTML = "Id";
							
							var heading_3 = document.createElement('th');
							heading_3.innerHTML = "Cliente";
							
							var heading_4 = document.createElement('th');
							heading_4.innerHTML = "Produtos";
							
							var heading_5 = document.createElement('th');
							heading_5.innerHTML = "";
							
							row_1.appendChild(heading_1);
							//row_1.appendChild(heading_6);
							row_1.appendChild(heading_2);
							row_1.appendChild(heading_3);
							row_1.appendChild(heading_4);
							row_1.appendChild(heading_5);
							thead.appendChild(row_1);
							
							for (i=0;i<ordersKK.length;i++){
							
								// Criar uma linha por encomenda
								var row_2 = document.createElement('tr');
								
								var row_2_data_1 = document.createElement('td');
								row_2_data_1.innerHTML = i+1;
								
								var row_2_data_2 = document.createElement('td');
								row_2_data_2.innerHTML = ordersKK[i].orderId;
								
								var row_2_data_3 = document.createElement('td');
								row_2_data_3.innerHTML = ordersKK[i].deliveryAddress.customerName;
								
								
								var row_2_data_4 = document.createElement('td');
								
									produtos="";
								
									for (var temp=0;temp<ordersKK[i].products.length;temp++){
										
										cnp = ordersKK[i].products[temp].offerSku;
										//productName = ordersKK[i].products[temp].name;
										productName = "<a class=\"linksList\"  href=\""+urlSearch+cnp+"\"target=\"_blank\">"+ordersKK[i].products[temp].name+"</a>";
										productQty = ordersKK[i].products[temp].quantity;
										
										produtos=produtos+"<p>"+productQty+" un. - "+cnp+" - "+productName+"</p>";
									}
								
								row_2_data_4.innerHTML = produtos;
							
								
								var row_2_data_5 = document.createElement('td');
								row_2_data_5.innerHTML = "<div class=\"form-check\"><input class=\"form-check-input\" type=\"checkbox\" value=\"\" name=\"checkIt\" id="+ordersKK[i].orderId+">";
								
								
								row_2.appendChild(row_2_data_1);
								//row_2.appendChild(row_2_data_6);
								row_2.appendChild(row_2_data_2);
								row_2.appendChild(row_2_data_3);
								row_2.appendChild(row_2_data_4);
								row_2.appendChild(row_2_data_5);
								tbody.appendChild(row_2);
								
							
							}
						}

					})

	
		.catch(errorKK => console.log('Aconteceu um erro inesperado.', errorKK)); 
							
	
	}
	

	//corre API para obter lista de encomendas pendentes
	encPendingList();
	mostraNotificacoes();
	///////////////////////clicou aprovar?/////////////////////////////
	
	
	
/*	function pressedBtn(){
		var a=this.id;
		
		
		aprovarEncomenda(a);
		
	}*/
	//////////////////////////BOTOES/////////////////////////////////
	

	
	//selecciona todos os checkbox
		
	var checkAll=document.getElementById("selectAllBtn");
	
	checkAll.onclick= selectAll;
	
	function selectAll(){
	
		var checkNumber=document.getElementsByName("checkIt");	
			for (var temp2=0;temp2<checkNumber.length;temp2++){
	
			checkNumber[temp2].checked=true;
				}
	}

	//limpa todos os checkbox
		
	var uncheckAll=document.getElementById("clearAllBtn");
	
	uncheckAll.onclick= unselectAll;
	
	
	function unselectAll(){
	
		var checkNumber=document.getElementsByName("checkIt");	
			for (var temp2=0;temp2<checkNumber.length;temp2++){
	
			checkNumber[temp2].checked=false;
				}
	}
	
	
	//aprovar encomendas em separado-----------------------------------------------------------------------
function aprovarEncomenda(idDaEncomenda){
		console.log(idDaEncomenda);
		var sandboxApprove="https://seller-sandbox.kuantokusta.pt/api/kms/orders/"+idDaEncomenda+"/approve";
		
		var urlApproveProduction = "https://seller.kuantokusta.pt/api/kms/orders/"+idDaEncomenda+"/approve";
		
	var response = fetch (urlApproveProduction, {
						method: 'PATCH',
						cache: 'reload',
						headers: {
						'x-api-key': apiKeyKKsandbox,
						},//headers
						
						body:""
					})//fetch
		
				
						.then(encAprovadas => encAprovadas.text())
						
							 
						.then(encAprovadas => {
							
						
				 		var showErrorMessage=document.getElementById('showMessage');
						var textHTML = "<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\"><strong>Encomendas aprovadas com sucesso.</strong><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
							
							  showErrorMessage.innerHTML=textHTML;
						
					})
			
					.then(console.log)
					.catch(error => {
						var showErrorMessage=document.getElementById('showMessage');
						var textHTML = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><strong>Aconteceu um erro inesperado.</strong><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
							showErrorMessage.innerHTML=textHTML;
						console.log(error);
					}); //mensagem erro
				
	window.open('pendingApproval.php',"_self");	
	}
	
	//aprovar encomendas total----------------------------------------------------------------------------
	
	var approveBtn=document.getElementById("approveBtn");

	approveBtn.onclick= approveOrder;
	
	 function approveOrder(){
		
		var showLoading=document.getElementById('showMessage');
		var loadingText="<strong>A efetuar pedido de aprovação. Aguarde...</strong><div class=\"spinner-border ms-auto\" role=\"status\" aria-hidden=\"true\"></div>";
		showLoading.innerHTML=loadingText;

		ordersPrintData=[];
		
		var checkNumber=document.getElementsByName("checkIt");	
		 var checkNumberQty=checkNumber.length;
		
		 //console.log("Qtde de enc selecionadas:"+checkNumberQty);
		
		 //guarda id das encomendas selecionadas
		 for (var temp2=0;temp2<checkNumberQty;temp2++){
			
			if(checkNumber[temp2].checked==true){
					
				var orderChecked = checkNumber[temp2];
				var order =orderChecked.id;
				
				ordersPrintData.push(order);
			}
		 }
				
		 //log de erro teste
		 //console.log("qtde selecionada:"+ordersPrintData.length);
		 //console.log("Encomendas:"+ordersPrintData);
		 
		 //aprova as encomendas selecionadas
			var urls=[];
		 
		 for(var indexEnc=0;indexEnc<ordersPrintData.length;indexEnc++){
			  var urlApproveProduction = "https://seller.kuantokusta.pt/api/kms/orders/"+ordersPrintData[indexEnc]+"/approve";
					
			 var sandboxApprove="https://seller-sandbox.kuantokusta.pt/api/kms/orders/"+ordersPrintData[indexEnc]+"/approve";
				urls.push(urlApproveProduction);
		 }
			 
		 const promises = urls.map(urls => fetch(urls,{
							
				method: 'PATCH',
				cache: 'reload',
				headers: {
				'x-api-key': apiKeyKKproduction,
				},//headers

				body:""
			 })//fetch		
										
			
		 .then(encAprovadas => encAprovadas.text()))
		 	
		 Promise.all(promises)
					
						.then(encAprovadas => {
						var showErrorMessage=document.getElementById('showMessage');
						var textHTML = "<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\"><strong>Encomendas aprovadas com sucesso.</strong><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
							  showErrorMessage.innerHTML=textHTML;
						
				/////////busca informação das encomendas após aprovação//////////////////////////
					arrayEnc=[];
				
				//log de array das enc
				//console.log("ARRAY DAS ENCOMENDAS:"+ordersPrintData);
				
				//urlOrder dados
				for(s=0;s<ordersPrintData.length;s++){
					
					fetch(urlOrder+ordersPrintData[s], {
						headers: {
						Accept: "application/json",
						"X-Api-Key":apiKeyKKproduction
						}
						
					})//fetch
					
					.then(orderKK => orderKK.json()) 
					.then(orderKK =>{
						
						//id encomenda
						idEnc = orderKK.orderId;
						
						//dados entrega
						var deliveryName = orderKK.deliveryAddress.customerName;
						var deliveryAddress1 = orderKK.deliveryAddress.address1;
						var deliveryAddress2 = orderKK.deliveryAddress.address2;
						var deliveryZipCode = orderKK.deliveryAddress.zipCode;
						var deliveryCity = orderKK.deliveryAddress.city;
						var deliveryCountry = orderKK.deliveryAddress.country;
						var deliveryContact = orderKK.deliveryAddress.contact;
						
						//dados faturação
						var invoiceName = orderKK.billingAddress.customerName;
						var invoiceAddress1 = orderKK.billingAddress.address1;
						var invoiceAddress2 = orderKK.billingAddress.address2;
						var invoiceZipCode = orderKK.billingAddress.zipCode;
						var invoiceCity = orderKK.billingAddress.city;
						var invoiceCountry = orderKK.billingAddress.country;
						var invoiceContact = orderKK.billingAddress.contact;
						var invoiceVat = orderKK.billingAddress.vat;
						
						orderDeliveryData={};
						orderInvoiceData={};
						orderHeaderData={};
						
						orderDeliveryData.deliveryName=deliveryName;
						orderDeliveryData.deliveryAddress1=deliveryAddress1;
						
						if(deliveryAddress2!=0){
							orderDeliveryData.deliveryAddress2=deliveryAddress2;	
						}
						orderDeliveryData.deliveryZipCode=deliveryZipCode;
						orderDeliveryData.deliveryCity=deliveryCity;
						orderDeliveryData.deliveryCountry=deliveryCountry;
						orderDeliveryData.deliveryContact=deliveryContact;
			
			
				
						orderInvoiceData.invoiceName=invoiceName;
						orderInvoiceData.invoiceAddress1=invoiceAddress1;
						
						if(invoiceAddress2!=0){
							orderInvoiceData.invoiceAddress2=invoiceAddress2;	
						}
						orderInvoiceData.invoiceZipCode=invoiceZipCode;
						orderInvoiceData.invoiceCity=invoiceCity;
						orderInvoiceData.invoiceCountry=invoiceCountry;
						orderInvoiceData.invoiceContact=invoiceContact;
						orderInvoiceData.invoiceVat=invoiceVat;
			
								arrayEnc=[];
							for (var temp1=0;temp1<orderKK.products.length;temp1++){
								
								
								
								cnp = orderKK.products[temp1].offerSku;
								productName = orderKK.products[temp1].name;
								productQty = orderKK.products[temp1].quantity;
								
								var produto={};
								
								produto.cnp=cnp;
								produto.nome=productName;
								produto.qtde=productQty;
								
								arrayEnc.push(produto);
								
							}
						
						
						var encomenda={};
						
							encomenda.id=idEnc;
							encomenda.entrega=orderDeliveryData;
							encomenda.faturacao=orderInvoiceData;
							encomenda.artigos=arrayEnc;
							
						encObjects.push(encomenda);
						
						if(encObjects.length==ordersPrintData.length){
							
							var newPdf = new jsPDF();
								
								for(var w=0;w<encObjects.length;w++){
									
									
								if (w>0){
									newPdf.addPage();
									}
									newPdf.addImage("images/logo.png", "PNG", posicaoX+10, posicaoY+10, 60, 16);
									newPdf.setFontSize(10);
							
									newPdf.autoTable({
										head:[['Sistema de gestão de encomendas do Kuanto Kusta']],
										body:[['ID da encomenda:'+encObjects[w].id]],
										startY:45,
										theme: 'striped',
									});
								
	
								
									//entrega
									var nomeEntrega=[encObjects[w].entrega.deliveryName];
									var morada1Entrega=[encObjects[w].entrega.deliveryAddress1];
									var morada2Entrega=[encObjects[w].entrega.deliveryAddress2];
									var cpCidadeEntrega=[encObjects[w].entrega.deliveryZipCode+" "+encObjects[w].entrega.deliveryCity];
									var paisEntrega=[encObjects[w].entrega.deliveryCountry];
									
									//faturacao
									var nomeFatura=encObjects[w].faturacao.invoiceName;
									
									var morada1Fatura=encObjects[w].faturacao.invoiceAddress1;
									var morada2Fatura=encObjects[w].faturacao.invoiceAddress2;
									
									var cpCidadeFatura=encObjects[w].faturacao.invoiceZipCode+" "+encObjects[w].faturacao.invoiceCity;
								
									var paisFatura=encObjects[w].faturacao.invoiceCountry;
									var nifFatura=encObjects[w].faturacao.invoiceVat;
									var contatoFatura=encObjects[w].faturacao.invoiceContact;
								
									//tabela entrega
									if(morada2Entrega){
										var listaEntrega=[[nomeEntrega],[morada1Entrega],[morada2Entrega],[cpCidadeEntrega],[paisEntrega]];
									}
									else{
										var listaEntrega=[[nomeEntrega],[morada1Entrega],[cpCidadeEntrega],[paisEntrega]];
									}
									
									newPdf.autoTable({
													head:[['Dados de entrega']],
													body:listaEntrega,
													startY:65,
													theme: 'striped',
												});
									
									//tabela fatura
									if(morada2Fatura){
										var listaFatura=[[nomeFatura],[morada1Fatura],[morada2Fatura],[cpCidadeFatura],[paisFatura],[nifFatura],[contatoFatura]];
									}
									else{
										var listaFatura=[[nomeFatura],[morada1Fatura],[cpCidadeFatura],[paisFatura],[nifFatura],[contatoFatura]];
									}
									
									
									newPdf.autoTable({
													head:[['Dados de faturação']],
													body:listaFatura,
													startY:115,
													theme: 'striped',
												});
									//////////////////////////////////////////////////////
								
									var listaProdutos = [];
									var qtdePr=encObjects[w].artigos;
									var qtdeFinal=qtdePr.length;
										
									for(var h=0;h<qtdeFinal;h++){
										var linhaProduto=[];
											
										
										if(!encObjects[w].artigos[h].cnp){
												linhaProduto.push("Sem CNP");
											}
											else{
											linhaProduto.push(encObjects[w].artigos[h].cnp);	
											}

										linhaProduto.push(encObjects[w].artigos[h].qtde);
										linhaProduto.push(encObjects[w].artigos[h].nome);
										
										listaProdutos.push(linhaProduto);
										
										}
										
									
												newPdf.autoTable({
													head:[['CNP', 'Quantidade', 'Produto']],
													body: listaProdutos,
													startY:180,
													theme: 'striped',
												});
							
										if(w==encObjects.length-1){

											newPdf.save('orders_KK.pdf');
										
										}//correu array todo...pode imprimir
									}
							
						}
						
					})// then fetch encomendas
					
					.catch(error2 => {
						var showErrorMessage=document.getElementById('showMessage');
						var textHTML = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><strong>Aconteceu um erro inesperado a obter dados das encomendas.</strong><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
							showErrorMessage.innerHTML=textHTML;
						
					}); //mensagem erro
			
						 
			
				}//loop for
						
					})
				
					
					.catch(error => {
						var showErrorMessage=document.getElementById('showMessage');
						var textHTML = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><strong>Aconteceu um erro inesperado na aprovação das encomendas.</strong><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
							showErrorMessage.innerHTML=textHTML;
						
					}); //mensagem erro
			
		//////////////////////////////////////////////////////////////////////////////////////////////////
		
	 setTimeout(reloadPage, 2500);
	}//função approveOrder

	function reloadPage(){
		
		window.open('pendingApproval.php',"_self");	
	}
	//cancelar encomendas/////////////////////////////////////////////////////////////////////////
	var cancelBtn=document.getElementById("cancelBtn");
	cancelBtn.onclick= cancelOrder;
	
	
	function cancelOrder(){
		
		var checkNumber=document.getElementsByName("checkIt");	
		
		for (var temp2=0;temp2<checkNumber.length;temp2++){
			
				if(checkNumber[temp2].checked==true){
					
					var order = document.getElementsByTagName('input');
					
				var urlCancelProduction = "https://seller.kuantokusta.pt/api/kms/orders/"+order[temp2].id+"/cancel";
					
					var sandboxCancel="https://seller-sandbox.kuantokusta.pt/api/kms/orders/"+order[temp2].id+"/cancel";
					//urlCancelProduction
					fetch(urlCancelProduction, {
						method: 'PATCH',
						cache: 'reload',
						headers: {
						'x-api-key': apiKeyKKproduction,
						'Content-Type': 'application/json'
						},//headers
						
						body:JSON.stringify({
									'reasonId': '5c25f7e44242571dfca29815'
								})
					})//fetch
					
						.then(encCanceladas => encCanceladas.json()) 
						.then(encCanceladas => {
						var showErrorMessage=document.getElementById('showMessage');
						var textHTML = "<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\"><strong>Encomendas canceladas com sucesso.</strong><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
							  showErrorMessage.innerHTML=textHTML;
						
					})
					
					.catch(encCanceladas => {
						var showErrorMessage=document.getElementById('showMessage');
						var textHTML = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><strong>Aconteceu um erro inesperado.</strong><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
							showErrorMessage.innerHTML=textHTML;
						
					}); //mensagem erro
				
				}//if
				
			}//loop for
		
			
		var removeTab = document.getElementById('tabela-enc');
		var parentEl = removeTab.parentElement;
		parentEl.removeChild(removeTab);
		
		setTimeout(reloadPage, 2500);
		
	}//função cancelar encomendas
	
	
	document.getElementById("dashboard").addEventListener("click", function dashboard(){
		window.open("index.php","_self");
	});
	
document.getElementById("pendentes").addEventListener("click", function pendentes(){
		window.open("pendingApproval.php","_self");
	});

document.getElementById("aprovadas").addEventListener("click", function aprovadas(){
		window.open("approved.php","_self");
	});

}//window load


