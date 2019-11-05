let cargo
function autentica() {
	//cria conexão com o servlet deleta
	let xmlResult;
	let responseStatus;
	 fetch("http://localhost:8080/app/biblioteca/cargo")
	 .then(function(response) {
		responseStatus = response.status;
		response.text()
		.then(function(result){
			xmlResult = result;
			autenticaResult(responseStatus,xmlResult);
		})
	})
}
 function  autenticaResult(responseStatus,xmlResult) {

	var parser = new DOMParser();
		if (responseStatus === 200) {
      var xmlDoc = parser.parseFromString(xmlResult, "text/xml");
      cargo = xmlDoc.getElementsByTagName("cargo")[0].textContent
      var resp = xmlDoc.getElementsByTagName("mensagem")[0].textContent
      if(cargo == "OPERADOR"){
        escondeCamposAdm();
      }
			M.toast({
				html: resp,
				classes: "green darken-2"
			});
		} else if (responseStatus === 400) {
			if (xmlResult != "") {
				var xmlDoc = parser.parseFromString(xmlResult, "text/xml");
				var resp = xmlDoc.childNodes[0]
				M.toast({
					html: resp,
					classes: "red darken-2"
				});
			}
		}else if(responseStatus === 403){
		if (xmlResult != "") {
			var xmlDoc = parser.parseFromString(xmlResult, "text/xml");
			var resp = xmlDoc.childNodes[0];
				M.toast({
					html: resp,
					classes: "red darken-2"
				});
				exibido += 1;
		}
	}
}
function escondeCamposAdm() {
   let campos = document.querySelectorAll('.admin-campo');
   for(let i=0;i<campos.length;i++){
     campos[i].classList.add("hide");
   }
}
