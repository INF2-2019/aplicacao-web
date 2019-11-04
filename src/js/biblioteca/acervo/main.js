const metodo = "GET";
const endereco = "http://localhost:8080/app/";
let modalInserindo;

atualizarTabela();

document.getElementsByName

function atualizarTabela() {
	var xhttp = new XMLHttpRequest();

	url = endereco + "biblioteca/acervo/consultar";

	xhttp.open(metodo, url, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var xml = (new DOMParser()).parseFromString(this.responseText, "application/xml");
			var raiz = xml.firstElementChild;
			if(raiz.nodeName == "erro") {
				console.error(raiz.firstElementChild.textContent);
				return;
			}

			var elementos = raiz.children;
			let tabelaCorpo = document.getElementsByTagName("tbody")[0];
			tabelaCorpo.innerHTML = "";
			for(let i = 0; i < elementos.length; i++) {
				var dados = elementos[i].children;
				linha = document.createElement("tr");
				let id = dados[0].textContent;
				linha.setAttribute('id', id);
				linha.innerHTML += "<td>" + id + "</td>";
				linha.innerHTML += "<td>" + dados[2].textContent + "</td>";
				linha.innerHTML += "<td>" + dados[3].textContent + "</td>";
				linha.innerHTML += "<td><a href=\"#modalInfo\" class=\"btn utils info editar modal-trigger\">INFO</a></td>";
				linha.innerHTML += "<td><a href=\"#modalAltera\" class=\"btn secondary editar modal-trigger\"  onclick=\"preparaEdicao("+id+");\">Editar</a></td>";
				linha.innerHTML += "<td><a href=\"#modalDeleta\" class=\"btn utils erro editar modal-trigger\" onclick=\"deletar("+id+");\">Deletar</a></td>";
				tabelaCorpo.appendChild(linha);
			}

			document.getElementById('saida').innerHTML = "";
		}
	};
	xhttp.send();
}

function deletar(id) {

	let xhttp = new XMLHttpRequest();
	let url = endereco + "diario/professores/deletar?id=" + id;

	xhttp.open(method, url, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			// Tratar erro
			atualizarTabela();
		}
	};
	xhttp.send();
}

function alterar(e) {
	let xhttp = new XMLHttpRequest();

	let url = endereco + "diario/professores/atualizar";
	let stringParams = "?";

	for(i in PARAMS_ACERVO) {
		let conteudo = document.getElementsByName(PARAMS_ACERVO[i])[0].value;
		if(conteudo == ""){
			//document.getElementById("saida").innerHTML = "Preencha todos os campos para alterar";
			return;
		}
		stringParams += "&" + PARAMS_ACERVO[i] + "=" + conteudo;
	}

	console.log(stringParams);
	xhttp.open(method, url+stringParams, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			atualizarTabela();
		}
	};
	xhttp.send();
}

function inserir(){
	method = "GET";
	endereco = "http://localhost:8080/app/";
	var xhttp = new XMLHttpRequest();

	url= endereco + "biblioteca/acervo/inserir";
	let params = getParams();

	xhttp.open(method, url+params, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			let msg = this.responseXML.firstElementChild.firstElementChild.lastElementChild.textContent;
			document.getElementById("saida").innerHTML = msg;
		}
	};
	xhttp.send();
}

function getParams() {
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
		params += paramsDesseTipo[param] + "=" + document.getElementsByName(paramsDesseTipo[param])[0].textContent + '&';

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
			'<label class="primary-text text-lighten-1 short col s' + paramsDesseTipo[param].tamanho + '">' + 
				paramsDesseTipo[param].exibNome + ': ' +
				'<input type="'+paramsDesseTipo[param].tipo+'" name="'+paramsDesseTipo[param].paramNome+'" value="'+ '' +'">'
			'</label>';
	}

}

function prepararInsercao() {
	document.getElementsByName('id')[0].disabled = false;
	modalInserindo = true;
	
	let inputs = document.getElementsByTagName('input');
	for(let i = 0; i < inputs.length; i++) {
		inputs.item(i).value = "";
	}
	document.getElementsByName('id-campi')[0].parentNode.firstElementChild.value = "Escolha um campus";
	document.getElementsByName('tipo')[0].parentNode.firstElementChild.value = "Escolha um tipo";
}

function preparaEdicao(id) {
	document.getElementsByName('id')[0].disabled = true;
	modalInserindo = false;
	let xhttp = new XMLHttpRequest();

	url= endereco + "biblioteca/acervo/consultar?id=" + id;

	xhttp.open("GET", url, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var xml = (new DOMParser()).parseFromString(this.responseText, "application/xml");
			var raiz = xml.firstElementChild;
			var item = raiz.firstElementChild.children;
			
			for(let i = 0; i < item.length-1; i++) {
				let propriedade = item.item(i);
				if(propriedade.nodeName == "id-campi") {
					document.getElementsByName("id-campi")[0].parentNode.firstChild.value = propriedade.textContent == "1" ? "I" : "II";
				} else if (propriedade.nodeName == "tipo") {
					document.getElementsByName("tipo")[0].parentNode.firstChild.value = convert(propriedade.textContent);
					//document.getElementsByName('tipo')[0].value = propriedade.textContent;
				} else
					document.getElementsByName(propriedade.nodeName)[0].value = propriedade.textContent;
			}
			
			alterarCampos();
		}
	};
	xhttp.send();
}

function convert(tipo) {
	switch(tipo) {
		case "ACADEMICOS": 	return "Acadêmico";
		case "LIVROS":		return "Livro";
		case "MIDIAS":		return "Mídia";
		case "PERIODICOS":	return "Periódico";
		default: 			return "Erro";
	}
}