const PARAMS_ACERVO = 	  ["id-campi", "nome", "tipo", "local", "ano", "editora", "paginas"];
const PARAMS_ACADEMICOS = ["id-obra", "programa"];
const PARAMS_LIVROS = 	  ["id-obra", "isbn", "edicao"];
const PARAMS_MIDIAS = 	  ["id-obra", "subtipo", "tempo"];
const PARAMS_PERIODICOS = ["id-obra", "subtipo", "periodicidade", "mes", "volume", "issn"];
const PARAMS_S = [3, 5, 3, 3, 3, 5]

function inserir(){
	method = "GET";
	endereco = "http://localhost:8080/app/";
	var xhttp = new XMLHttpRequest();

	url= endereco + "biblioteca/acervo/inserir";
	let params = setParams();

	xhttp.open(method, url+params, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			let msg = this.responseXML.firstElementChild.firstElementChild.lastElementChild.textContent;
			document.getElementById("saida").innerHTML = msg;
		}
	};
	xhttp.send();
}

function setParams() {
	let params = "?";
	for(param in PARAMS_ACERVO)
		params += param + "=" + document.getElementsByName(param)[0].textContent + "&";

	let paramsDesseTipo;
	switch(tipoInput.textContent.toLocaleLowerCase()) {
		case "academico": paramsDesseTipo = PARAMS_ACADEMICOS; break;
		case "livro":	  paramsDesseTipo = PARAMS_LIVROS; 	   break;
		case "midia":	  paramsDesseTipo = PARAMS_MIDIAS; 	   break;
		case "periodico": paramsDesseTipo = PARAMS_PERIODICOS; break;
	}
	for(param in paramsDesseTipo)
		params += paramsDesseTipo[param] + "=" + document.getElementsByName(paramsDesseTipo[param])[0].textContent;

	return params.substring(0, params.length-1); // Substring para remover o '&' final
}

function alterarCampos() {
	let camposDiv = document.getElementById('outrosParametros');
	let tipoSelecionado = document.getElementsByName('tipo')[0].value;
	let paramsDesseTipo;
	switch(tipoSelecionado) {
		case "academico": paramsDesseTipo = PARAMS_ACADEMICOS; break;
		case "livro":	  paramsDesseTipo = PARAMS_LIVROS; 	   break;
		case "midia":	  paramsDesseTipo = PARAMS_MIDIAS; 	   break;
		case "periodico": paramsDesseTipo = PARAMS_PERIODICOS; break;
		default: return;
	}

	camposDiv.innerHTML = "";
	for(param in paramsDesseTipo) {
		camposDiv.innerHTML +=
			'<label class="primary-text text-lighten-1 short col s'+PARAMS_S[param]+'">'+paramsDesseTipo[param]+': <input type="text" name="'+paramsDesseTipo[param]+'"></label>';
	}

}
