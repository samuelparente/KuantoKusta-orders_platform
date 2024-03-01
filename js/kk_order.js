window.onload = () => {
 
// armazenamos os parâmetros da url
let urlParams = new URLSearchParams(window.location.search);

// acessamos o valor que desejamos
let orderId = urlParams.get("orderId");

//variáveis globais
let i;

	//transportadora por defeito
	var transportadoraId = "16be5184-8b19-4443-a16d-75eaf01f3b78";
    var transportadoraNome = "Correos Express";

//sandbox
let apiKeyKKsandbox="jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj";

//produção
let apiKeyKKproduction="jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj";
let urlApprovalKKProduction="https://seller.kuantokusta.pt/api/kms/orders/";
let qtdeProdutos;
let enc_pending;
let enc_approved; 
let x=999;
let cnp=0;
let productName=0;
let products=0;
let productQty=0;
let row_2;
let productSku;
let row_2_data_1;
let row_2_data_2;
let row_2_data_3;
let row_2_data_5;
let row_2_data_6;
let detailTable;

//lista as encomendas pendentes
function encProductsList(){
	
	//mostra modal 
		var loadingText="<strong>A obter informações sobre a encomenda. Aguarde...</strong><div class=\"spinner-border ms-auto\" role=\"status\" aria-hidden=\"true\"></div>";
		
		var htmlmessageRow=document.getElementById('showError');
		htmlmessageRow.innerHTML=loadingText;
	
	fetch(urlApprovalKKProduction+orderId, {
		headers: {
			Accept: "application/json",
			"X-Api-Key":apiKeyKKproduction
		}
	})

	.then(orderKK => orderKK.json()) 
	.then(orderKK =>{
			
		
							qtdeProdutos = orderKK.products.length;
		
							const dateTime = orderKK.approvalDate.split("");
								let t=0;
								let dateFormated='';
									while(dateTime[t]!='T'){
										
										dateFormated=dateFormated+dateTime[t];
										t++;
									}
		
							let orderHeader = document.getElementById('order');
		
							orderHeader.innerHTML = "Encomenda "+orderId+" aprovada em "+dateFormated;
		
							let tabelaDiv = document.getElementById("produtosSelect");
							let table = document.createElement('table');
							let thead = document.createElement('thead');
							let tbody = document.createElement('tbody');
							
							table.setAttribute('class','table table-striped');
							table.setAttribute('id','detailTable');
	
							table.appendChild(thead);
							table.appendChild(tbody);
							tabelaDiv.appendChild(table);
							
							// Cabeçalhos das colunas
							let row_1 = document.createElement('tr');
							
							let heading_2 = document.createElement('th');
							heading_2.innerHTML = "#";
							
							
							let heading_22 = document.createElement('th');
						
							
							heading_22.innerHTML = "Imagem";
		
							let heading_3 = document.createElement('th');
							heading_3.innerHTML = "Código";
							
							let heading_4 = document.createElement('th');
							heading_4.innerHTML = "Descrição";
		
							let heading_6 = document.createElement('th');
							heading_6.innerHTML = "Preço unitário";
							
							let heading_5 = document.createElement('th');
							heading_5.innerHTML = "Produto separado";
		
							let heading_8 = document.createElement('th');
							heading_8.innerHTML = "";
							
							row_1.appendChild(heading_2);
							row_1.appendChild(heading_22);
							row_1.appendChild(heading_3);
							row_1.appendChild(heading_4);
							row_1.appendChild(heading_6);
							row_1.appendChild(heading_5);
							row_1.appendChild(heading_8);
							thead.appendChild(row_1);
							
							let portesEnvio = orderKK.shippingsPrice;
							let totalEnc = orderKK.totalPrice;
							let portesDiv = document.getElementById("portes");
							let totalDiv = document.getElementById("total");
							portesDiv.innerHTML = "<h5>Portes de envio: "+portesEnvio+"€</h5>"
							totalDiv.innerHTML = "<h5>Total da encomenda: "+totalEnc+"€</h5>"
							let rowNumber=0;
							//loop por todos os produtos
							for (i=0;i<qtdeProdutos;i++){
							
								// Criar uma linha por cada unidade do produto atual
								
									for (let temp=0;temp<orderKK.products[i].quantity;temp++){
										
										rowNumber=rowNumber+1;
										
										//alinha centrado na vertical
										row_2 = document.createElement('tr');
											row_2.setAttribute('style','vertical-align: middle;');
											
										productSku = orderKK.products[i].offerSku;
										
										if (productSku==null){
											productSku="Sem CNP";
										}
										
										
										productName = orderKK.products[i].name;
										let productPrice = orderKK.products[i].price;
										
										row_2_data_1 = document.createElement('td');
									
										row_2_data_1.innerHTML = rowNumber;
										
										let row_2_data_12 = document.createElement('td');
										
										
										let imgProd = document.createElement('img');
										imgProd.setAttribute('src','https://www.zonpharma.com/images_prods_static/SKU/'+productSku+'.jpg');
										imgProd.setAttribute('height','180px');
										imgProd.setAttribute('width','auto');
										row_2_data_12.appendChild(imgProd);
										
										
										row_2_data_2 = document.createElement('td');
										row_2_data_2.innerHTML = productSku;
										
										row_2_data_3 = document.createElement('td');
										
										let linkProd = document.createElement('a');
										linkProd.setAttribute('href','https://www.zonpharma.com/pesquisa_36.html?c=1&term='+productSku);
										linkProd.setAttribute('target','_blank');
										linkProd.setAttribute('id','textColorLink');
										linkProd.innerHTML =productName;
										row_2_data_3.appendChild(linkProd);
										
										
										
										let row_2_data_7 = document.createElement('td');
										row_2_data_7.innerHTML = productPrice+"€";
										
										row_2_data_5 = document.createElement('td');
										row_2_data_5.innerHTML = "<input type=\"text\" class=\"form-control\" id="+rowNumber+" aria-describedby=\"cnp\">";
								
										row_2_data_6 = document.createElement('td');
										row_2_data_6.innerHTML="<i class=\"bi bi-x-circle-fill\" style=\"font-size: 30px;color: red;\" value="+productSku+"></i>";
							
										row_2.appendChild(row_2_data_1);
										row_2.appendChild(row_2_data_12);
										row_2.appendChild(row_2_data_2);
										row_2.appendChild(row_2_data_3);
										row_2.appendChild(row_2_data_7);
										row_2.appendChild(row_2_data_5);
										row_2.appendChild(row_2_data_6);
										tbody.appendChild(row_2);
								
									}//loop product quaantity
								
								
							}//loop for all products
						
		//preenche campo das notas
		//lerComentario();
		
		//preenche entrega e faturação
						
		document.getElementById("nomeEntrega").value=orderKK.deliveryAddress.customerName;
		document.getElementById("morada1Entrega").value=orderKK.deliveryAddress.address1;	
		document.getElementById("morada2Entrega").value=orderKK.deliveryAddress.address2;
		document.getElementById("cpEntrega").value=orderKK.deliveryAddress.zipCode;
		document.getElementById("localEntrega").value=orderKK.deliveryAddress.city;
		document.getElementById("paisEntrega").value=orderKK.deliveryAddress.country;
		document.getElementById("contatoEntrega").value=orderKK.deliveryAddress.contact;
		
		
		document.getElementById("nomeFatura").value=orderKK.billingAddress.customerName;
		document.getElementById("morada1Fatura").value=orderKK.billingAddress.address1;	
		document.getElementById("morada2Fatura").value=orderKK.billingAddress.address2;
		document.getElementById("cpFatura").value=orderKK.billingAddress.zipCode;
		document.getElementById("localFatura").value=orderKK.billingAddress.city;
		document.getElementById("paisFatura").value=orderKK.billingAddress.country;
		document.getElementById("nifFatura").value=orderKK.billingAddress.vat;
		
						//adicionar eventos verificar produtos
						detailTable=document.getElementById("detailTable");
						var rowCount = (detailTable.rows.length)-1; 
					
		for(let z=1;z<rowCount+1;z++){
			
			document.getElementById(z).addEventListener("change", function verificaCnp(){
		
				let CnpManual = document.getElementById(z).value;
				let rightCode = (detailTable.rows[z].cells[2].innerHTML);
				
					if(CnpManual==rightCode){

						detailTable.rows[z].cells[6].innerHTML="<i class=\"bi bi-check-circle-fill\" style=\"font-size: 30px;color: green;\" value=\"check\"></i>";
					}
					else{

						detailTable.rows[z].cells[6].innerHTML="<i class=\"bi bi-x-circle-fill\" style=\"font-size: 30px;color: red;\"></i>";
					}
				
				let checkNumber = document.querySelectorAll("i.bi-check-circle-fill");
						let checkOk = (checkNumber.length);
					
				
							if(checkOk==rowCount){
							
								enableDelivery();
								enableInvoice();
							}
							
							else{
								disableDelivery();	
								disableInvoice();
							}
				
			})
		}

		var htmlmessageRow=document.getElementById('showError');
		htmlmessageRow.innerHTML="";	
	})

	
		.catch(errorKK => {
		
		let showError=document.getElementById('showError');
		let textHTML = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><strong>Encomenda não encontrada.</strong><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
			  showError.innerHTML=textHTML;
			  
			   }); 
		
	}
	
	//corre API para obter lista de produtos da encomenda
	
	encProductsList();
	disableDelivery();
	disableInvoice();
	
	//adiciona escuta de caracteres restantes da caixa de observações.
	
	document.getElementById("observacoes").addEventListener("keyup", function verificaChars(){
		var charsWrite=document.getElementById("observacoes").value.length;
		var charsLeft=50-charsWrite;
		document.getElementById("charsLeft").innerHTML="Restam "+charsLeft+" de 50 caracteres.";
	});
	
	//botão enviar encomenda pressionado?
	var sendParcel =document.getElementById("sendParcel");
	sendParcel.onclick=enviaEnc;
	
	//botão criar fatura pressionado?
	var createInvoice =document.getElementById("sendInvoice");
	createInvoice.onclick=criarFatura;
	
	//botão gravar comentário pressionado?
	var gravaComentario =document.getElementById("gravaComentario");
	gravaComentario.onclick=gravarComentario;
	
	
	
	//grava comentário num ficheiro
	function gravarComentario(){
		
		
		//mostra modal para aguardar enquanto grava comentário
		//var loadingText="<strong>A gravar notas. Aguarde...</strong><div class=\"spinner-border ms-auto\" role=\"status\" aria-hidden=\"true\"></div>";
		
		//var htmlBodyAguarda=document.getElementById('modalBodyAguarda');
		//htmlBodyAguarda.innerHTML=loadingText;
		
		//$("#aguardaEnvio").modal('show');
		
		//busca o texto da caixa de observações e id da encomenda.
		
		var notes = document.getElementById("statusEncomenda").value;
		
		if (notes==""){
			notes = "Sem notas.";
		}
		
		var comentario={"comentario":document.getElementById("statusEncomenda").value, //comentario
						"idEnc":document.getElementById("order").innerHTML, //id da encomenda
						};
						
		
				fetch ('comentario.php', {
						method: 'POST',
						headers:{
							'Content-Type': 'application/json',
							
						},
						body:JSON.stringify(comentario),
					})//fetch
		
					.then(comentarioKK => comentarioKK.json())
							 
					.then(comentarioKK => {
		
						var codigoRetornado = comentarioKK.codigoRetorno;
						//$("#aguardaEnvio").modal('hide');
						showModalEnvio("Notas gravadas com sucesso!",1);
					})//then
					
					.catch(error => {
					
						showModalEnvio("Ocorreu um erro inesperado. Não foi possível gravar as notas. ERRO INTERNO: "+error,888);
					}); //mensagem erro*/
					
					
		
		
	}
	
	//ler comentario existentes
	function lerComentario(){
		
		
		var comentario={"idEnc":document.getElementById("order").innerHTML, //id da encomenda
						};

					
		fetch ('comentarioReadFtp.php', {
						method: 'POST',
						headers:{
							'Content-Type': 'application/json',
							
						},
						body:JSON.stringify(comentario),
					})//fetch
		
					.then(comentarioKK => comentarioKK.json())
							 
					.then(comentarioKK => {
		
						var codigoRetornado = comentarioKK.codigoRetorno;
						var notas = comentarioKK.notas;
						
						//$("#aguardaEnvio").modal('hide');
						
						document.getElementById("statusEncomenda").value = notas;
						
						//showModalEnvio("Notas gravadas com sucesso!",1);
					})//then
					
					.catch(error => {
					
						showModalEnvio("Ocorreu um erro inesperado. Não foi possível ler as notas. ERRO INTERNO: "+error,888);
					}); //mensagem erro*/
		
		
		
	}
	
	//criar fichero de texto com fatura
	function criarFatura(){
		
		//mostra modal para aguardar enquanto cria fatura
		var loadingText="<strong>A criar fatura. Aguarde...</strong><div class=\"spinner-border ms-auto\" role=\"status\" aria-hidden=\"true\"></div>";
		
		var htmlBodyAguarda=document.getElementById('modalBodyAguarda');
		htmlBodyAguarda.innerHTML=loadingText;
		
		showModalEnvio("<strong>A criar fatura. Aguarde...</strong><div class=\"spinner-border ms-auto\" role=\"status\" aria-hidden=\"true\"></div>",1);
		//$("#aguardaEnvio").modal('show');
		
		//dados json da fatura
		
		var morada2EnvFat;
		var nifEnvFat;
		
		if (document.getElementById("morada2Fatura").value=="")
			{
			morada2EnvFat = ".";
			}
		else{
			morada2EnvFat = document.getElementById("morada2Fatura").value
		}
		
		if(document.getElementById("nifFatura").value==""){
			nifEnvFat = "0"
		}
		else{
			nifEnvFat = document.getElementById("nifFatura").value;
		}
		
		var pedidoFatura={"ref":orderId, //referencia da encomenda
						"nomeFatura":document.getElementById("nomeFatura").value,//nome fatura
						"morada1Fatura":document.getElementById("morada1Fatura").value,//morada linha 1 fatura
						"morada2Fatura":morada2EnvFat,//morada linha 2 fatura
						"cpFatura":document.getElementById("cpFatura").value,//cp fatura
						"localFatura":document.getElementById("localFatura").value,//cidade fatura
						"nifFatura":nifEnvFat,//cidade fatura
						};
		
		//envia post para o php criar ficheiro de rexto
		fetch ('fatura.php', {
						method: 'POST',
						headers:{
							'Content-Type': 'application/json',
							
						},
						body:JSON.stringify(pedidoFatura),
					})//fetch
		
					.then(faturaKK => faturaKK.json())
							 
					.then(faturaKK => {
		
						var codigoRetornado = faturaKK.codigoRetorno;
						$("#aguardaEnvio").modal('hide');
						showModalEnvio("Fatura emitida com sucesso!",1);
					})//then
					
					.catch(error => {
						$("#aguardaEnvio").modal('hide');
						showModalEnvio("Ocorreu um erro inesperado. A fatura não foi emitida. ERRO INTERNO: "+error,888);
					}); //mensagem erro*/
		$("#aguardaEnvio").modal('hide');
	}//funcao criar fatura
	
	
	//envio da encomenda
	function enviaEnc(){
	
		//mostra modal para aguardar e criar envio
		var loadingText="<strong>A criar envio. Aguarde...</strong><div class=\"spinner-border ms-auto\" role=\"status\" aria-hidden=\"true\"></div>";
	
		var htmlBodyAguarda=document.getElementById('modalBodyAguarda');
		htmlBodyAguarda.innerHTML=loadingText;
		
		$("#aguardaEnvio").modal('show');
		var d = new Date();
		var dia = d.getDate();
		
		if (dia<10){
		dia='0'+d.getDate();	
		}
		
		
		var mes = d.getMonth()+1;
		
		if (mes<10){
		mes='0'+mes;
		}
		
		var ano = d.getFullYear();
		var data=''+dia+mes+ano;
		
		
		var cpEnvio = (document.getElementById("cpEntrega").value);
		var cpFormatado = ''+cpEnvio[0]+cpEnvio[1]+cpEnvio[2]+cpEnvio[3];
	
		
		var pedidoEnvio={"solicitante":"IP38330001",
						"ref":orderId, //referencia da encomenda
						"refCliente":"",
						"fecha":data,//data do envio
						"codRte":"P38330001",
						"nomRte":"ZONPHARMA",
						"dirRte":"RUA DOS PINHEIROS MANSOS 108",
						"pobRte":"AMARANTE",
						"codPosNacRte":"4600",
						"codPosIntRte":"4600",
						"paisISORte":"PT",
						"contacRte":"968672865",
						"nomDest":document.getElementById("nomeEntrega").value,//nome do destinatario
						"dirDest":document.getElementById("morada1Entrega").value,//morada destinatario
						"pobDest":document.getElementById("localEntrega").value,//cidade destinatario
						"codPosNacDest":cpFormatado, //CP do destinatario
						"codPosIntDest":cpFormatado,//CP do destinatario
						"paisISODest":"PT",
						"contacDest":document.getElementById("nomeEntrega").value,//nome do contato destinatario
						"telefDest":document.getElementById("contatoEntrega").value,//contato destinatario
						"observac":document.getElementById("observacoes").value,//observações
						"numBultos":"1",
						"kilos":"1",
						"producto":"63",
						"portes":"P",
						"listaBultos":[{"alto":"","ancho":"","codBultoCli":"","codUnico":"","descripcion":"","kilos":"","largo":"","observaciones":"","orden":"1","referencia":"","volumen":""}],
						"codDirecDestino":"",
						"listaInformacionAdicional":[{"tipoEtiqueta":"2","etiquetaPDF":"N"}]
						};
	
						
						
		fetch ('./testcex.php', {
						method: 'POST',
						headers:{
							'Content-Type': 'application/json',
							
						},
						body:JSON.stringify(pedidoEnvio),
					})//fetch
		
						.then(envio => envio.json())
						
						.then(envio => {
							 
							
						var codigoRetornado = envio.codigoRetorno;
						var numeroEnvio = envio.numeroEnvio;
						var etiqueta = envio.etiqueta;
			
						console.log(codigoRetornado);
						console.log(numeroEnvio);
						
						var etiquetaZpl = {"etiqueta":etiqueta[0].etiqueta2};
			
						
						switch (codigoRetornado)
								{
								case 0:
										//gera etiqueta pdf
										fetch ('./testPrint.php', {
											method: 'POST',
											headers:{
												'Content-Type': 'application/json',

											},
											body:JSON.stringify(etiquetaZpl),
										})//fetch

									showModalEnvio("Envio criado com sucesso! Número de envio: "+numeroEnvio,0);
								
										//enviar o tracking para o kuantokusta
										var urlSendProduction = "https://seller.kuantokusta.pt/api/kms/orders/"+orderId+"/send";
										
										var sendJson = {
											  "trackingId":numeroEnvio,
											  "courierId": "16be5184-8b19-4443-a16d-75eaf01f3b78",
											};
										
										 fetch(urlSendProduction,{
											method: 'PATCH',
											cache: 'reload',
											headers: {
											'x-api-key': apiKeyKKproduction,
											'Content-Type': 'application/json',
											},//headers

										body:JSON.stringify(sendJson),
										})//fetch	
										
										.then(enviaKK=>enviaKK.text())
									
											 .then(enviaKK => {
											 console.log(enviaKK);
										 })
										
										.catch(errorKK => {
											 
											 console.log(errorKK);
										 })
										////////////////////////////////////////
										
									break;
										
								case 6:
									showModalEnvio("ERRO: Formato de data de envio errado. O envio não foi criado.",6);
									break;
										
								case 23:
									showModalEnvio("ERRO: Formato do código postal errado. O envio não foi criado.",23);
									break;
										
								case 27:
									showModalEnvio("ERRO: Formato do contato telefónico errado. O envio não foi criado.",27);
									break;
										
								case 107:
								showModalEnvio("ERRO: Data de envio anterior à data atual. O envio não foi criado.",107);
								break;
										
								case 126:
										showModalEnvio("ERRO: Código postal errado. O envio não foi criado.",126);
									break;
  								
								default:
    								showModalEnvio("Ocorreu um erro inesperado. O envio não foi criado.",999);
								}
			
						})
					
					.catch(error => {
						
								showModalEnvio("Ocorreu um erro inesperado. O envio não foi criado. ERRO INTERNO: "+error,888);
					}); //mensagem erro*/
			
		
	}
	
	
	function showModalEnvio(mensagemModal,codErr){
			$("#aguardaEnvio").modal('hide');
		
		var htmlBody=document.getElementById('modalBody');
		htmlBody.innerHTML=mensagemModal;
		
		if(codErr==0){
			
			
			var btnLabel = document.createElement('button');
			btnLabel.setAttribute('class','btn btn-success');
			btnLabel.innerHTML = "Ver etiqueta";
			btnLabel.setAttribute('onclick','window.open(\'etiqueta.pdf\',\'_blank\')');
			
			var btnLabelDiv=document.getElementById('modalBody');
			
			modalBody.appendChild(btnLabel);
			
		}
		$("#avisaEnvio").modal('show');
	}
	
	
	function disableDelivery(){
			let enableBtnDelivery = document.getElementById("sendParcel");
			let enableNameDelivery = document.getElementById("nomeEntrega");
			let enableAddr1Delivery = document.getElementById("morada1Entrega");
			let enableAddr2Delivery = document.getElementById("morada2Entrega");
			let enableCPDelivery = document.getElementById("cpEntrega");
			let enableCityDelivery = document.getElementById("localEntrega");
			let enableCountryDelivery = document.getElementById("paisEntrega");
			let enableContactDelivery = document.getElementById("contatoEntrega");
			let enableObsDelivery = document.getElementById("observacoes");
		
			enableNameDelivery.disabled=true;
			enableAddr1Delivery.disabled=true;
			enableAddr2Delivery.disabled=true;
			enableCPDelivery.disabled=true;
			enableCityDelivery.disabled=true;
			enableContactDelivery.disabled=true;
			enableCountryDelivery.disabled=true;
			enableBtnDelivery.disabled=true;
			enableObsDelivery.disabled=true;
		}
	
	function enableDelivery(){
			let enableBtnDelivery = document.getElementById("sendParcel");
			let enableNameDelivery = document.getElementById("nomeEntrega");
			let enableAddr1Delivery = document.getElementById("morada1Entrega");
			let enableAddr2Delivery = document.getElementById("morada2Entrega");
			let enableCPDelivery = document.getElementById("cpEntrega");
			let enableCityDelivery = document.getElementById("localEntrega");
			let enableCountryDelivery = document.getElementById("paisEntrega");
			let enableContactDelivery = document.getElementById("contatoEntrega");
			let enableObsDelivery = document.getElementById("observacoes");

			enableNameDelivery.disabled=false;
			enableAddr1Delivery.disabled=false;
			enableAddr2Delivery.disabled=false;
			enableCPDelivery.disabled=false;
			enableCityDelivery.disabled=false;
			enableCountryDelivery.disabled=false;
			enableContactDelivery.disabled=false;
			enableBtnDelivery.disabled=false;
			enableObsDelivery.disabled=false;
		}
	
	function disableInvoice(){
			let enableBtnInvoice = document.getElementById("sendInvoice");
			let enableNameInvoice = document.getElementById("nomeFatura");
			let enableAddr1Invoice = document.getElementById("morada1Fatura");
			let enableAddr2Invoice = document.getElementById("morada2Fatura");
			let enableCPInvoice = document.getElementById("cpFatura");
			let enableCityInvoice = document.getElementById("localFatura");
			let enableCountryInvoice = document.getElementById("paisFatura");
			let enableNIFInvoice = document.getElementById("nifFatura");

			enableNameInvoice.disabled=true;
			enableAddr1Invoice.disabled=true;
			enableAddr2Invoice.disabled=true;
			enableCPInvoice.disabled=true;
			enableCityInvoice.disabled=true;
			enableCountryInvoice.disabled=true;
			enableNIFInvoice.disabled=true;
			enableBtnInvoice.disabled=true;
		}
	
	function enableInvoice(){
			let enableBtnInvoice = document.getElementById("sendInvoice");
			let enableNameInvoice = document.getElementById("nomeFatura");
			let enableAddr1Invoice = document.getElementById("morada1Fatura");
			let enableAddr2Invoice = document.getElementById("morada2Fatura");
			let enableCPInvoice = document.getElementById("cpFatura");
			let enableCountryInvoice = document.getElementById("paisFatura");
			let enableCityInvoice = document.getElementById("localFatura");
			let enableNIFInvoice = document.getElementById("nifFatura");

			enableNameInvoice.disabled=false;
			enableAddr1Invoice.disabled=false;
			enableAddr2Invoice.disabled=false;
			enableCPInvoice.disabled=false;
			enableCityInvoice.disabled=false;
			enableCountryInvoice.disabled=false;
			enableNIFInvoice.disabled=false;
			enableBtnInvoice.disabled=false;
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
	
	//mostraNotificacoes();
}//window load wait

	