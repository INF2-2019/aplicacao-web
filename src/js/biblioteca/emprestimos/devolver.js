$(document).on('click', '.devolve', function (e) {
	e.preventDefault;
	id = $(this).closest('tr').find('td[data-id]').data('id');
});

function devolve() {
	//cria conexão com o servlet deleta
	let xmlResult;
	let responseStatus;
	 fetch("http://localhost:8080/app/biblioteca/emprestimos/devolver?id="+id)
	 .then(function(response) {
		responseStatus = response.status;
		response.text()
		.then(function(result){
			xmlResult = result;
			devolveResult(responseStatus,xmlResult);
		})
	})
}
 function  devolveResult(responseStatus,xmlResult) {

	var parser = new DOMParser();

		if (responseStatus === 200) {
			var xmlDoc = parser.parseFromString(xmlResult, "text/xml");
			var resp = xmlDoc.childNodes[0]
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
	//atualiza a tabela
	consulta();
}
