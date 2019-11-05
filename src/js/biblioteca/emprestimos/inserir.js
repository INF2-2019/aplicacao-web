let dataemp = document.querySelector("#AdicionaDataEmprestimoDis")
let dataProv = document.querySelector("#AdicionaDataPrevEmprestimoDis")
let dataDevo = document.querySelector("#AdicionaDataDevolucaoDis")
let dataEmprestimo = "";
let dataPrevDevolv = "";
let dataDevolucao = "";
function getDataEmprestimo(params) {
	dataEmprestimo = dataemp.value;
}
function getDataPrevEmprestimo(params) {
	dataPrevDevolv = dataProv.value;
}
function  getDataDevolucao(params) {
 dataDevolucao = dataDevo.value
}

function adiciona() {
	let obj = {};
	let aluno = document.querySelector('#AdicionaAlunoDis').value;
	obj['id-alunos'] = aluno; 
	let acervo = document.querySelector('#AdicionaAcervoDis').value;
	obj['id-acervo'] = acervo;
	if(dataEmprestimo != ""){
	obj['data-emprestimo'] = dataEmprestimo
	}
	if(dataPrevDevolv != ""){
		obj['data-prev-devolv'] = dataPrevDevolv
	}
	if(dataDevolucao != ""){
		obj['data-devolucao'] = dataDevolucao
	}
	let multa = document.querySelector("#AdicionaMultaDis").value;
	if(multa != ""){
   obj['multa'] = multa
	}
	let xmlResult;
	let responseStatus;
	fetch("http://localhost:8080/app/biblioteca/emprestimos/inserir", {
		method: 'POST',
		body: new URLSearchParams(obj),
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
