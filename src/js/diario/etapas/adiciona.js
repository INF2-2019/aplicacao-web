function adiciona() {
	//cria conexão com o servlet adiciona
	var xhttp = new XMLHttpRequest(),
		method = "GET",
		url = "http://localhost:8080/app/diario/etapas/inserir?ano=" + document.getElementById('AdicionaAnoEtapa').value + '&valor=' + document.getElementById('AdicionaValorEtapa').value;
	xhttp.open(method, url, true);
	var parser = new DOMParser();
	var exibido = 0; //verifica se a mensagem de erro ja foi mostrada

	//recebe resposta em XML e manipula o XML
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var responseStr = xhttp.responseText;
			var xmlDoc = parser.parseFromString(responseStr, "text/xml");
			var resp =  xmlDoc.childNodes[0].children[0].innerHTML;
			M.toast({
				html: resp,
				classes: "utils sucesso-2"
			});
		} else if (xhttp.status === 400) {
			var responseStr = xhttp.responseText;
			if (responseStr != "") {
				var xmlDoc = parser.parseFromString(responseStr, "text/xml");
				var resp = xmlDoc.childNodes[0].children[0].innerHTML;
				if (exibido === 0) {
					M.toast({
						html: resp,
						classes: "red darken-2"
					});
					exibido += 1;
				}
			}
		}
	};
	xhttp.send();

	//limpa inputs
	limpaInputs();

	setTimeout(function(){	recarrega();}, 250);
}