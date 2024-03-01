window.onload = () => {
    //write your code here

//variáveis globais
let i;
let order="";

//sandbox
let apiKeyKKsandbox="jjjjjjjjjjjjjjjjjjjjjjjjjjjj";
let urlApprovalKKsandbox ="https://seller-sandbox.kuantokusta.pt/api/kms/orders?page=1&maxResultsPerPage=100&orderState=WaitingApproval";
let urlApprovedKKsandbox ="https://seller-sandbox.kuantokusta.pt/api/kms/orders?page=1&maxResultsPerPage=100&orderState=Approved";	


//produção
let apiKeyKKproduction="jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj";
let urlApprovalKKProduction="https://seller.kuantokusta.pt/api/kms/orders?page=1&maxResultsPerPage=100&orderState=WaitingApproval";
let urlApprovedKK="https://seller.kuantokusta.pt/api/kms/orders?page=1&maxResultsPerPage=100&orderState=Approved";
let urlApproveProduction = "https://seller.kuantokusta.pt/api/kms/orders/"+order+"/approve";
	
let enc_pending;
let enc_approved; 
let x=999;
	let cnp=0;
	let productName=0;
	let produtos=0;
	let productQty=0;

//lista as encomendas pendentes
function encApprovedList(){
	let pendingNumber=0;
	fetch(urlApprovedKK, {
		headers: {
			Accept: "application/json",
			"X-Api-Key":apiKeyKKproduction
		}
	})

	.then(ordersKK => ordersKK.json()) 
	.then(ordersKK =>{
						//console.log(ordersKK[0].orderId)
						if (ordersKK.length>0) {
							
							let tabelaDiv = document.getElementById("column-approved");
							let table = document.createElement('table');
							let thead = document.createElement('thead');
							let tbody = document.createElement('tbody');
							
							table.setAttribute('class','table table-striped table-sm');
							table.appendChild(thead);
							table.appendChild(tbody);
							tabelaDiv.appendChild(table);
							
							// Cabeçalhos das colunas
							let row_1 = document.createElement('tr');
							
							let heading_1 = document.createElement('th');
							heading_1.innerHTML = "#";
							
							let heading_2 = document.createElement('th');
							heading_2.innerHTML = "Id";
							
							let heading_6 = document.createElement('th');
							heading_6.innerHTML = "Data de aprovação";
							
							let heading_3 = document.createElement('th');
							heading_3.innerHTML = "Cliente";
							
							let heading_4 = document.createElement('th');
							heading_4.innerHTML = "Produtos";
							
							let heading_7 = document.createElement('th');
							heading_7.innerHTML = "Preço Unitário";
							
							let heading_8 = document.createElement('th');
							heading_8.innerHTML = "";
							
							let heading_5 = document.createElement('th');
							heading_5.innerHTML = "";
							
							row_1.appendChild(heading_1);
							row_1.appendChild(heading_2);
							row_1.appendChild(heading_6);
							row_1.appendChild(heading_3);
							row_1.appendChild(heading_4);
							//row_1.appendChild(heading_7);
							//row_1.appendChild(heading_8);
							row_1.appendChild(heading_5);
							thead.appendChild(row_1);
							
							for (i=0;i<ordersKK.length;i++){
							
								// Criar uma linha por encomenda
								let row_2 = document.createElement('tr');
								
								let row_2_data_1 = document.createElement('td');
								row_2_data_1.innerHTML = i+1;
								
								let row_2_data_2 = document.createElement('td');
								row_2_data_2.innerHTML = ordersKK[i].orderId;
								
								let row_2_data_6 = document.createElement('td');
								
								const dateTime = ordersKK[i].approvalDate.split("");
								let t=0;
								let dateFormated='';
									while(dateTime[t]!='T'){
										
										dateFormated=dateFormated+dateTime[t];
										t++;
									}
								row_2_data_6.innerHTML = dateFormated;
								
								let row_2_data_3 = document.createElement('td');
								row_2_data_3.innerHTML = ordersKK[i].deliveryAddress.customerName;
								
								
								let row_2_data_4 = document.createElement('td');
								
								let row_2_data_7 = document.createElement('td');
								
									produtos="";
									let precos="";
								
									for (let temp=0;temp<ordersKK[i].products.length;temp++){
										
										cnp = ordersKK[i].products[temp].offerSku;
										productName = ordersKK[i].products[temp].name;
										productQty = ordersKK[i].products[temp].quantity;
									//	productPrice = ordersKK[i].products[temp].price;
										
										if (cnp==null){
											cnp="Sem CNP";
										}
										
										//produtos=produtos+"<p>"+productQty+" un. - "+cnp+" - "+productName+"</p>";
										produtos=productQty+" un. - "+cnp+" - "+productName+"</p>";
										//precos = precos+"<p>"+productPrice+"€"+"</p>";
										
										let subrow = document.createElement('tr');
										let colunaProduto = document.createElement('td');
									//	let colunaPreco = document.createElement('td');
										
										colunaProduto.innerHTML=produtos;
										//colunaPreco.innerHTML = productPrice+"€";
										
										subrow.appendChild(colunaProduto);
										//subrow.appendChild(colunaPreco);
										
										row_2_data_4.appendChild(subrow);
										
										//let subrowprice = document.createElement('tr');
										//subrowprice.innerHTML = productPrice+"€";
										//row_2_data_7.appendChild(subrowprice);
									}
								
								//row_2_data_4.innerHTML = produtos;
								
								//preços dos produtos 
								//let row_2_data_7 = document.createElement('td');
								//row_2_data_7.innerHTML = precos;
								
								//botao ver
								let row_2_data_5 = document.createElement('td');
								
								row_2_data_5.innerHTML ="<a href=\"showorder.php?orderId="+ordersKK[i].orderId+"\" class=\"btn btn-primary\" role=\"button\">Ver</a>";
									
								row_2.appendChild(row_2_data_1);
								row_2.appendChild(row_2_data_2);
								row_2.appendChild(row_2_data_6);
								row_2.appendChild(row_2_data_3);
								row_2.appendChild(row_2_data_4);
								//row_2.appendChild(row_2_data_7);
								row_2.appendChild(row_2_data_5);
								tbody.appendChild(row_2);
								
								console.log(row_2_data_5.innerHTML);
								
							}
						}

					})

	
		.catch(errorKK => console.log('Aconteceu um erro inesperado.', errorKK)); 
							
	
	}
	

	//corre API para obter lista de encomendas pendentes
	encApprovedList();
mostraNotificacoes();
	
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

