function adiciona() {
	let turma = document.querySelector('#AdicionarTurmaDis').value;
	let nome = document.querySelector('#AdicionaNomeDis').value;
	let horas = document.querySelector('#AdicionaCargaDis').value;
	let xmlResult;
	let responseStatus;
	fetch("http://localhost:16558/app/diario/disciplinas/inserir", {
		method: 'POST',
		body: new URLSearchParams({turma, nome,horas}),
		headers: new Headers({
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}),
})
.then(response => {
	responseStatus = response.status;
	response.text()
	.then( result =>{
		xmlResult = result;
		adicionaResult(responseStatus,xmlResult)
	})
})
}
 function adicionaResult(responseStatus,xmlResult){
  var parser = new DOMParser();
	var exibido = 0; //verifica se a mensagem de erro ja foi mostrada
	//recebe resposta em XML e manipula o XML
		  if(responseStatus === 200){
			var xmlDoc = parser.parseFromString(xmlResult, "text/xml");
			var resp = xmlDoc.childNodes[0]
			M.toast({
				html: resp,
				classes: "green darken-2"
			});
		}else if(responseStatus === 400){
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
		} else if(responseStatus === 403){
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
	//limpa inputs
	limpaInputs();
	//atualiza a tabela
	consulta();
}
