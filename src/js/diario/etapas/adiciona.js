function adiciona() {
	let ano = document.getElementById('adicionaAnoEtapa').value;
	let valor = document.getElementById('adicionaValorEtapa').value;

	//cria conexão com o servlet adiciona
	var xhttp = new XMLHttpRequest(),
		method = "GET",
		url = "http://localhost:8080/app/diario/etapas/inserir?ano=" + ano + "&valor=" + valor;
	xhttp.open(method, url, true);
	xhttp.withCredentials = true;

	var parser = new DOMParser();
	var exibido = 0; //verifica se a mensagem de erro ja foi mostrada

	var resp;

	//recebe resposta em XML e manipula o XML
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var responseStr = xhttp.responseText;
			var xmlDoc = parser.parseFromString(responseStr, "text/xml");
			resp =  xmlDoc.childNodes[0].children[0].innerHTML;

			toast(resp, "utils sucesso-2");
			
			setTimeout(function(){	consulta();}, 20);
		} else if (xhttp.status !== 200) {
			var responseStr = xhttp.responseText;
			if (responseStr != "") {
				var xmlDoc = parser.parseFromString(responseStr, "text/xml");
				resp = xmlDoc.childNodes[0].children[0].innerHTML;
				if (exibido === 0) {
					toast(resp, "red darken-2")
					exibido += 1;
				}
			}
			setTimeout(function(){	consulta();}, 20);
		}
	};
	xhttp.send();

	//limpa inputs
	limpaInputs();
}