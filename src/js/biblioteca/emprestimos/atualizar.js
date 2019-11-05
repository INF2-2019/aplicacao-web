//pega o id a ser passado para atualizar
$(document).on('click', '.edita', function (e) {
	e.preventDefault;
	id = $(this).closest('tr').find('td[data-id]').data('id');
});
let dataempE = document.querySelector("#editaDataEmprestimoDis")
let dataProvE = document.querySelector("#editaDataPrevEmprestimoDis")
let dataDevoE = document.querySelector("#editaDataPrevEmprestimoDis")
let dataEmprestimoE = "";
let dataPrevDevolvE = "";
let dataDevolucaoE = "";
function getDataEmprestimoEdita() {
	dataEmprestimoE = dataempE.value;
}
function getDataPrevEmprestimoEdita() {
	dataPrevDevolvE = dataProvE.value;
}
function  getDataDevolucaoEdita() {
 dataDevolucaoE = dataDevoE.value
}
function atualiza() {
	//cria conexão com o servlet atualiza
	let data = {};
	data['id'] =  id;
	let aluno = document.querySelector('#editaAlunoDis').value;
	if(aluno != ""){
		data['id-alunos'] = aluno;
	}
	let acervo = document.querySelector('#editaAcervoDis').value;
	if(acervo != ""){
		data['id-acervo'] = acervo;
	}
	if(dataEmprestimoE != ""){
		data['data-emprestimo'] = dataEmprestimoE
		}
		if(dataPrevDevolvE != ""){
			data['data-prev-devolv'] = dataPrevDevolvE
		}
		if(dataDevolucaoE != ""){
			data['data-devolucao'] = dataDevolucaoE
		}
		let multa = document.querySelector('#editaMultaDis').value;
		if(multa != ""){
			data['multa'] = multa;
		}
	let xmlResult;
	let responseStatus;
	fetch("http://localhost:8080/app/biblioteca/emprestimos/atualizar", {
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
