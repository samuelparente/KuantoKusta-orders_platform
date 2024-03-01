// JavaScript Document

function reply_click(clickedId)
  {
	  document.getElementById("hiddenId").value=clickedId;
   		var confirmodal = new bootstrap.Modal(document.getElementById('myModal'), {
			keyboard: false
});
confirmodal.show();
  }

function submitDel(){
	
	var registo=document.getElementById("hiddenId").value;
	var url="delete.php?id="+registo;
	window.location.replace(url);
}