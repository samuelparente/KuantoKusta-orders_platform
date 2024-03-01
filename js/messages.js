
	
//mostra as notificações das mensagens
function mostraNotificacoes(){
fetch('background_data.json')
    .then(response => response.json())
    .then(data => {
        // Process the JSON data
		if(data.newMessages==true){
		
				if (data.messages) {
					data.messages.forEach(message => {
						console.log('ID:', message.orderID, 'Key:', message.key);
						
						var bodyMensagensPendentes = document.getElementById("corpoMensagensPendentes");
						bodyMensagensPendentes.innerHTML+=message.orderID+"<br>";
						
					});
				} else {
					console.log('Invalid JSON data structure.');
				}
			}
		else if(data.newMessages==false){
			console.log("Sem mensagens pendentes");
			var bodyMensagensPendentes = document.getElementById("corpoMensagensPendentes");
			bodyMensagensPendentes.innerHTML="Sem mensagens pendentes.";
		}
		else{
			var bodyMensagensPendentes = document.getElementById("corpoMensagensPendentes");
			bodyMensagensPendentes.innerHTML="Ocorreu um erro a ler as mensagens pendentes.";
		}
		
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
	
	
		const arrayOfObjects = [];
		
		fetch("fetchLogin.php")
		.then((response) => response.json())
		.then(dataMsg => {
			
			//debug
			//console.log(data);
			//console.log(dataMsg.size);
		
		//var mensagensObjeto = JSON.parse(dataMsg);
		const data = dataMsg.data; // Access the 'data' array
		
		var qtdeMensagens = data.length;
		var i=0;
		
		for (i=0;i<qtdeMensagens;i++){
			
			//debug
			//console.log(data[i].id+","+data[i].key+","+data[i].stats.totalMessages+"\n");
			
			const object = {
				"id":data[i].id,
				"key":data[i].key,
				"totalMessages":data[i].stats.totalMessages
			};
			arrayOfObjects.push(object);
		}
			//debug
			//console.log(arrayOfObjects);

			
			//envia os dados para gravar no php que vai tratar de ler o ficheiro existente e comparar com 
			//os dados enviados. A requisição responde se tem mensagens novas e de que encomendas, ou responde que não tem.)
			// campos da resposta: {newMessages:true/false, messages[{encomenda:numero-encomenda},{encomenda:numero-encomenda},{encomenda:numero-encomenda}]}
			
				fetch("gravaMensagens.php", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(arrayOfObjects)
				})
				.then(response => response.json())
				.then(data => {
					
					//debug
					console.log(data);
					
					contador = document.getElementById("contadorMensagens");
					
					const messageCount = data.messages.length;
					
					if(data.newMessages==true){
						
						contador.innerHTML = messageCount;
						
					}
					else{
						
						contador.innerHTML = "0";
						
					}
					
					// After processing the fetch data
					localStorage.setItem('fetchedData', JSON.stringify(data));
					localStorage.setItem('fetchCompleted', 'true');

				})
				.catch(error => {
					console.error("Error:", error);
				});


		})
		.catch(data => {
				console.log("erro inesperado a efetuar login");			
			
		})
	
}
	
	
