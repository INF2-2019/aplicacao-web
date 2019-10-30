//pega o id a ser passado para atualizar
$(document).on('click', '.edita', function (e) {
	e.preventDefault;
	id = $(this).closest('tr').find('td[data-id]').data('id');
});

function atualiza() {
	//cria conexão com o servlet atualiza
	let data = {};
	data['id'] =  id;
	let turma = document.querySelector('#editaTurmaDis').value;
	if(turma != ""){
		data['turma'] = turma;
	}
	let nome = document.querySelector('#editaNomeDis').value;
	if(nome != ""){
		data['nome'] = nome;
	}
	let horas = document.querySelector('#editaCargaDis').value;
  if(horas != ""){
		data['horas'] = horas;
	}
	let xmlResult;
	let responseStatus;
	fetch("http://localhost:16558/app/diario/disciplinas/atualizar", {
		method: 'POST',
		body: new URLSearchParams(data),
		headers: new Headers({
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}),
})
.then(response => {
	responseStatus = response.status;
	response.text()
	.then( result =>{
		xmlResult = result;
		atualizaResult(responseStatus,xmlResult)
	})
})
}
 function atualizaResult(responseStatus,xmlResult) {
	var parser = new DOMParser();
	var exibido = 0;

	//recebe resposta em XML e manipula o XML
		if (responseStatus === 200) {
			var xmlDoc = parser.parseFromString(xmlResult, "text/xml");
			var resp = xmlDoc.childNodes[0]
			M.toast({
				html: resp,
				classes: "green darken-2"
			});
			// div.innerHTML = resp;
		} else if (responseStatus === 400) {
			if (xmlResult != "") {
				var xmlDoc = parser.parseFromString(xmlResult, "text/xml");
				var resp = xmlDoc.childNodes[0]
				if (exibido === 0) {
					M.toast({
						html: resp,
						classes: "red darken-2"
					});
					exibido += 1;
				}
			}
			// div.innerHTML = resp;
		}else if(responseStatus === 403){
		if (xmlResult != "") {
			var xmlDoc = parser.parseFromString(xmlResult, "text/xml");
			var resp = xmlDoc.childNodes[0]
			if (exibido === 0) {
				M.toast({
					html: resp,
					classes: "red darken-2"
				});
				exibido += 1;
			}
		}
	}
	// limpa inputs
	limpaInputs();
	//atualiza a tabela
	consulta();
}
