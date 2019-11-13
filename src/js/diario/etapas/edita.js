//pega o id a ser passado para atualizar
$(document).on('click', '.edita', function (e) {
	e.preventDefault;
	id = $(this).closest('tr').find('td[data-id]').data('id');
});

function atualiza() {
	//cria conexão com o servlet atualiza
	var xhttp = new XMLHttpRequest(),
		method = "GET",
		url = "http://localhost:8080/app/diario/etapas/atualizar?id=" + id + "&ano=" + document.getElementById('editaAno').value + '&valor=' + document.getElementById('editaValor').value;
	xhttp.open(method, url, true);
	xhttp.withCredentials = true;

	var parser = new DOMParser();
	var exibido = 0; // verifica se a mensagem de erro já foi mostrada
	
    var resp;

	//recebe resposta em XML e manipula o XML
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var responseStr = xhttp.responseText;
			var xmlDoc = parser.parseFromString(responseStr, "text/xml");
			resp = xmlDoc.childNodes[0].children[0].innerHTML;

			toast(resp, "utils sucesso-2");

			setTimeout(function(){	consulta();}, 20);
		} else if (xhttp.status !== 200) {
			var responseStr = xhttp.responseText;
			if (responseStr != "") {
				var xmlDoc = parser.parseFromString(responseStr, "text/xml");
				resp = xmlDoc.childNodes[0].children[0].innerHTML;
				if (exibido === 0) {
					toast(resp, "red darken-2");
					exibido += 1;
				}
			}

			setTimeout(function(){	consulta();}, 20);
		}
	};
	xhttp.send();

	// limpa inputs
    limpaInputs();
    
}
