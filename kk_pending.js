window.onload = () => {
    //write your code here

//variáveis globais
let i;
	//let apiKeyKK="aaaaaaaaaaaaaa";
	
let apiKeyKK="blabla";
let urlApprovalKK="https://seller.kuantokusta.pt/api/kms/orders?page=1&maxResultsPerPage=100&orderState=WaitingApproval";
let urlApprovedKK="https://seller.kuantokusta.pt/api/kms/orders?page=1&maxResultsPerPage=100&orderState=Approved";
let enc_pending;
let enc_approved; 
let x=999;


//lista as encomendas pendentes
function encPendingList(){
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
							/*pendingNumber = ordersKK.length;
							
							//atualiza div com valor
							let divPending = document.createElement("div");
							let h1 = document.createElement("h1");
							
							h1.innerHTML=pendingNumber;
							document.getElementById("left-column").append(divPending);
							divPending.append(h1);
						
							console.log(pendingNumber);*/
							
							
							for (i=0;i<ordersKK.length;i++){
								let divListaEnc = document.getElementById(left-column-pending);
								let p = document.createElement("p");
								p.innerHTML = ordersKK[i].orderId;
								divListaEnc.append(p);
								}
							
						}

					})

	
		.catch(errorKK => console.log('Aconteceu um erro inesperado.', errorKK)); 
							
	
	}
	
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
encPendingList();

	//selecciona todos os checkbox
	
	
		let checkAll=document.getElementById("selectAll");
		let checkNumber=document.getElementsByName("checkIt");	
	
	var checkbox = document.querySelector("input[name=checkbox]");

checkAll.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
  } else {
    console.log("Checkbox is not checked..");
  }
});
	
	/*function checkUncheck(){
	
		
		if (checkAll.checked==true){
			
			for (let temp2=0;temp2<checkNumber.length;temp2++){
	
			checkNumber[i].checked=true;
				}
		}
		
		if (checkAll.checked==false){
			
			for (let temp2=0;temp2<checkNumber.length;temp2++){
	
			checkNumber[i].checked=false;
				}
		}
		
	}*/

}


/*const paragrafo = document.createElement("p");
	enc_pending.appendChild(paragrafo);
const texto = document.createTextNode("Testando");
paragrafo.appendChild(texto);
console.log(paragrafo);*/
/*
function CriaPDF() {
        
        // CRIA UM OBJETO WINDOW
        var win = window.open('', '', 'height=700,width=700');
        win.document.write('<html><head>');
        win.document.write('<title>Empregados</title>');   // <title> CABEÇALHO DO PDF.
        win.document.write('texto');                                     // INCLUI UM ESTILO NA TAB HEAD
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write('texto');                          // O CONTEUDO DA TABELA DENTRO DA TAG BODY
        win.document.write('</body></html>');
        win.document.close(); 	                                         // FECHA A JANELA
        win.print();                                                            // IMPRIME O CONTEUDO
    }

*/
/*
//editar tarefa
function editarTarefa(){
	let itemClicado=event.target;
	let w=itemClicado.id;
	let campoTexto = document.getElementById('tarefa');
	document.getElementById('botaoadicionar').textContent="Editar";
	
	campoTexto.value=array_tarefas[w].texto_tarefa;
	array_tarefas[w].editada=true;
	doNothing=false;	
	
		
}

//remove tarefa da lista
function removerTarefa(){
	let itemClicado=event.target;
	let w=itemClicado.id;
	array_tarefas.splice(w,1);
	mostrar_lista();
}

//marca tarefa como concluida
function concluirTarefa(){
	let itemClicado=event.target;
	let listaTarefas=document.getElementsByClassName('notdone');
	let indice=itemClicado.id;
	let a=array_tarefas[indice].finalizada;
	if(a==true){
	array_tarefas[indice].finalizada=false;		
	}
	else{
		array_tarefas[indice].finalizada=true;		
	}
	
	
	mostrar_lista();
}

//rendering da lista de tarefas	
function mostrar_lista(){
	
	//limpa lista antiga na página
	var temp = document.getElementsByTagName("ul");
	temp[0].innerHTML = "";
	//escreve lista das tarefas guardadas no array
	for(let x=array_tarefas.length;x>0;x--){
		let lista = document.getElementById('listaul');
		let item = document.createElement('li');
		let div =document.createElement('div');
		let ler_texto=array_tarefas[x-1].texto_tarefa;
		div.innerText = ler_texto;//item
		let a=array_tarefas[x-1];
		let b=a.finalizada;
			if (b==true){
				div.setAttribute('class','concluido');//item
			}
			else{
				div.setAttribute('class','notdone');//item	
			}
		lista.insertBefore(item,lista.childNodes[0]);
		item.insertBefore(div,item.childNodes[0]);
	
		//botao editar
		let span = document.createElement("div");
		let txt = document.createTextNode("\u21ba");
		span.className = "editar";
		span.id=x-1;
		span.title="Editar tarefa";
		span.setAttribute("onclick","editarTarefa();");
		span.appendChild(txt);
		item.appendChild(span);
		//botao concluido
		span = document.createElement("div");
		txt = document.createTextNode("\u2713");
		span.className = "visto";
		span.id=x-1;
		span.title="Marcar tarefa como concluída";
		span.setAttribute("onclick","concluirTarefa();");
		span.appendChild(txt);
		item.appendChild(span);
		//botao remover
		span = document.createElement("div");
		txt = document.createTextNode("\u00D7");
		span.className = "eliminar";
		span.id=x-1;
		span.title="Remover tarefa da lista";
		span.setAttribute("onclick","removerTarefa();");
		span.appendChild(txt);
		item.appendChild(span);
		
		let campoTexto = document.getElementById('tarefa');
		campoTexto.value="";
			
	}
}



//script running
document.addEventListener('DOMContentLoaded', () => {

	//Limpa lista total de tarefas e array de dados
	document.getElementById("limpa-lista").onclick = function limpalista(){
		var temp = document.getElementsByTagName("ul");
		temp[0].innerHTML = "";	
		array_tarefas=[];
	}
	
	//Elimina tarefas concluidas
	document.getElementById("limpa-concluidas").onclick = function limpaConcluidas(){
		
		for(let k=(array_tarefas.length-1);k>=0;k--){
			let t=array_tarefas[k].finalizada;
			if(t==true){
				array_tarefas.splice(k,1);
			}
			else{
				;
			}
		}
		mostrar_lista();
	}
	
	
	//Inserir nova tarefa na lista
	document.getElementById("botaoadicionar").onclick = function inseretarefa(){
		let texto=document.getElementById('tarefa').value;
			if(texto==""){
				//campo tarefa vazio
				window.alert("Preencha o campo de tarefa");
			}
			else{
				
				//tarefa nao editada - insere nova tarefa
				if(doNothing==true){
					let texto=document.getElementById('tarefa').value;
					id_tarefa=array_tarefas.length;
					let nova_tarefa = {posicao_id:id_tarefa,texto_tarefa:texto,finalizada:false,editada:false}
					array_tarefas.unshift(nova_tarefa);		
					
				}
				
				//tarefa foi editada - altera apenas o texto da tarefa
				else{
					let i;
					let texto=document.getElementById('tarefa').value;
					for(i=0;i<array_tarefas.length;i++){
						let foiEditada=array_tarefas[i];
						if(foiEditada.editada==true){
							foiEditada.texto_tarefa=texto;
							doNothing=true;
							foiEditada.editada=false;
						}	
					}
					document.getElementById('botaoadicionar').textContent="Adicionar";
				}
			mostrar_lista();
			}
	}

})

*/