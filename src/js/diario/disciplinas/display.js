M.AutoInit();

function limpaInputs() {
	document.getElementById('AdicionaCargaDis').value = "";
	document.getElementById('AdicionaNomeDis').value = "";
	document.getElementById('AdicionarTurmaDis').value = "";
	document.getElementById('editaTurmaDis').value = "";
	document.getElementById('editaNomeDis').value = "";
	document.getElementById('editaCargaDis').value = "";
}
id=0;
$(document).on('click', '.info', function (e) {
	e.preventDefault;
	id = $(this).closest('tr').find('td[data-id]').data('id')
  mostraInfo();
});
$(document).on('click', '#adiciona', function (e) {
	e.preventDefault;
  criaSelect();
});
function mostraInfo() {
	
	let xmlResult;
	let responseStatus;
	 fetch("http://localhost:8080/app/diario/disciplinas/consultarporid?id="+id)
	 .then(function(response) {
		responseStatus = response.status;
		response.text()
		.then(function(result){
			xmlResult = result;
			colocainfo(responseStatus,xmlResult);
		})
	})
}
function colocainfo(responseStatus,xmlResult){
	var parser = new DOMParser();
		if (responseStatus === 200) {
			var xmlDoc = parser.parseFromString(xmlResult, "text/xml");
			//cria tabela
			var elementos = xmlDoc.childNodes[0].children;
			for (let i = 0; i < elementos.length; i++) {
				for (let j = 0; j < elementos[i].children.length; j++) {
				console.log(elementos[i].children[j].innerHTML); //id/ano/valor
				document.querySelector('.span'+j).value = elementos[i].children[j].innerHTML;
				}
			}
		}
}
function criaSelect(params) {
	
}