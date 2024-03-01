window.onload = () => {

let apiKeyKKproduction="jjjjjjjjjjjjjjjjjjjj";

	//aprovar encomendas
	let approveBtn=document.getElementById("approveBtn");
	approveBtn.onclick= approveOrder;
	
	function approveOrder(){
		
				let urlApproveProduction = "https://seller.kuantokusta.pt/api/kms/orders/"+"9551-334812-7592"+"/approve";
					
					
			var myHeaders = new Headers();
		
	
			//myHeaders.append('accept','*/*');	
			//myHeaders.append('Accept-Encoding', 'gzip, deflate');	
			//myHeaders.append('Cache-Control','no-cache');	
			//myHeaders.append('Connection', 'keep-alive');	
			//myHeaders.append("Content-Length", 0);	
			myHeaders.append("Content-Type", "application/json");		
			//myHeaders.append('Host','seller.kuantokusta.pt');		
			//myHeaders.append('Pragma','no-cache');		
			myHeaders.append("x-api-key",apiKeyKKproduction);
			
				var myInit = { method: 'PATCH',
							  headers: myHeaders,
							  body: "",
							  	mode: 'cors',
							  	cache: 'reload' };

					
var myRequest = new Request(urlApproveProduction, myInit);

fetch(myRequest);

		
	}
	
}
					