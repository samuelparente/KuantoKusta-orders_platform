
//variáveis globais
let i
let apiKeyKK="aaaaaaaaaaaaa";
let urlApprovalKK="https://seller.kuantokusta.pt/api/kms/orders?page=1&maxResultsPerPage=100&orderState=WaitingApproval";


//Liga e lista as encomendas
function lerEncomendas(){
	
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
							console.log("Lista de encomendas recebida com sucesso.");
							console.log(ordersKK.length);
							
							for (i=0;i<ordersKK.length;i++){
								
								document.write(ordersKK[i].orderId);
								document.write(" ; ");
								document.write(ordersKK[i].deliveryAddress.customerName);
								document.write(" ; ");
								document.write(ordersKK[i].orderState);
								document.write(" ; ");
								document.write(ordersKK[i].deliveryAddress.city);
								document.write("<br>");
							}
							
								}
					})

	.catch(errorKK => console.log('Aconteceu um erro inesperado.', errorKK)); 

}


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