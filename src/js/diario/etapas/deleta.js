//pega o id a ser passado para deletar
var id = -1;
$(document).on('click', '.deleta', function (e) {
	e.preventDefault;
	id = $(this).closest('tr').find('td[data-id]').data('id');
});

function deleta() {
	//cria conexão com o servlet deleta
	var xhttp = new XMLHttpRequest(),
		method = "GET",
		url = "http://localhost:8080/app/diario/etapas/deletar?id=" + id;
	xhttp.open(method, url, true);
	var parser = new DOMParser();

	//recebe resposta em XML e manipula o XML
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var responseStr = xhttp.responseText;
			var xmlDoc = parser.parseFromString(responseStr, "text/xml");
			var resp = xmlDoc.childNodes[0].children[0].innerHTML;
			M.toast({
				html: resp,
				classes: "utils sucesso-2"
			});
		} else if (xhttp.status === 400) {
			var responseStr = xhttp.responseText;
			if (responseStr != "") {
				var xmlDoc = parser.parseFromString(responseStr, "text/xml");
				var resp = xmlDoc.childNodes[0].children[0].innerHTML;
				M.toast({
					html: resp,
					classes: "red darken-2"
				});
			}
		}
	};
	xhttp.send();

	setTimeout(function(){	recarrega();}, 250);
}