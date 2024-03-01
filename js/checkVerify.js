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
