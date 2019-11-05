const metodo = "GET";
const endereco = "http://localhost:8080/app/";
let modalEstado;
let deleteId;

atualizarTabela();

function atualizarTabela() {
	var xhttp = new XMLHttpRequest();

	url = endereco + "biblioteca/acervo/consultar";

	xhttp.open(metodo, url, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE) {
			if(xhttp.status === 200) {
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
					let dados = elementos[i].children;
					linha = document.createElement("tr");
					let id = dados[0].textContent;
					linha.innerHTML += '<td>' + id + '</td>';
					linha.innerHTML += '<td>' + dados[2].textContent + '</td>';
					linha.innerHTML += '<td>' + dados[3].textContent + '</td>';
					linha.innerHTML += '<td><a href="#modalAltera" class="btn utils info editar modal-trigger" onclick="prepararInfo('+id+')">INFO</a></td>';
					linha.innerHTML += '<td><a href="#modalAltera" class="btn secondary editar modal-trigger"  onclick="prepararEdicao('+id+');">Editar</a></td>';
					linha.innerHTML += '<td><a href="#modalDeleta" class="btn utils erro editar modal-trigger" onclick="deleteId='+id+';">Deletar</a></td>';
					tabelaCorpo.appendChild(linha);
				}

				document.getElementById('saida').innerHTML = "";
			} else {
				let resposta = xhttp.responseXML.firstElementChild.firstElementChild;
				document.getElementById('saida').innerHTML = resposta.firstElementChild.textContent;
			}
		}
	};
	xhttp.send();
}

function onconfirmar() {
	switch(modalEstado) {
		case "edicao": alterar(); break;
		case "insercao": inserir(); break;
		case "info": break;
	}
}

function deletar() {

	let xhttp = new XMLHttpRequest();
	let url = endereco + "biblioteca/acervo/deletar?id=" + deleteId;

	xhttp.open("GET", url, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE) {
			if(xhttp.status === 200) {
				atualizarTabela();
			} else
				document.getElementById("saida").innerHTML = xhttp.responseXML.firstChild.firstElementChild.textContent;
		}
	};
	xhttp.send();
}

function alterar() {
	let xhttp = new XMLHttpRequest();

	let url = endereco + "biblioteca/acervo/atualizar";
	let stringParams = "?id=" + document.getElementsByName("id")[0].value;

	let tipo;
	for(i in PARAMS_ACERVO) {
		let conteudo = document.getElementsByName(PARAMS_ACERVO[i])[0].value;
		if(PARAMS_ACERVO[i] == "tipo") tipo = conteudo;
		stringParams += "&" + PARAMS_ACERVO[i] + "=" + conteudo;
	}

	let paramsDesseTipo = getParamsPorTipo(tipo);
	for(i in paramsDesseTipo) {
		let conteudo = document.getElementsByName(paramsDesseTipo[i].paramNome)[0].value;
		stringParams += "&" + paramsDesseTipo[i].paramNome + "=" + conteudo;
	}

	xhttp.open("GET", url+stringParams, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE) {
			if(xhttp.status === 200) {
				atualizarTabela();
			} else {
				console.log("AAAAAAA")
				document.getElementById("saida").innerHTML = "Código " + xhttp.status + ": ";
			}
			var xml = (new DOMParser()).parseFromString(this.responseText, "application/xml");
			var raiz = xml.firstElementChild;
			if(raiz.nodeName == "erro")
				document.getElementById("saida").innerHTML += raiz.firstElementChild.textContent;

		}
	};
	xhttp.send();
}

function inserir(){
	var xhttp = new XMLHttpRequest();

	url= endereco + "biblioteca/acervo/inserir";
	let params = getParams();

	xhttp.open("GET", url+params, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE) {
			if(xhttp.status === 200) {
				atualizarTabela();
			} else {
				document.getElementById("saida").innerHTML = xhttp.responseXML.firstChild.firstElementChild.textContent;
			}
		}
	};
	xhttp.send();
}

function getParams() {
	let params = "?";
	for(param in PARAMS_ACERVO) {
		let prop = PARAMS_ACERVO[param];
		params += prop + "=" + document.getElementsByName(prop)[0].value + "&";
	}

	let tipoInput = document.getElementsByName("tipo")[0];
	let paramsDesseTipo = getParamsPorTipo(tipoInput.value.toLocaleLowerCase());

	for(param in paramsDesseTipo) {
		let prop = paramsDesseTipo[param].paramNome
		params += prop + "=" + document.getElementsByName(prop)[0].value + '&';
	}

	return params.substring(0, params.length-1); // Substring para remover o '&' final
}

function alterarCampos() {
	let camposDiv = document.getElementById('outrosParametros');
	let paramsDesseTipo = getParamsPorTipo(document.getElementsByName('tipo')[0].value);

	camposDiv.innerHTML = "";
	for(param in paramsDesseTipo) {
		camposDiv.innerHTML +=
			'<label class="primary-text text-lighten-1 short col s' + paramsDesseTipo[param].tamanho + '" name="'+paramsDesseTipo[param].propNome+'">' +
				paramsDesseTipo[param].exibNome + ': ' +
				'<input type="'+paramsDesseTipo[param].tipo+'" name="'+paramsDesseTipo[param].paramNome+'" value="'+ '' +'">'
			'</label>';
	}

}

function prepararInsercao() {
	modalEstado = "insercao";

	let inputs = document.getElementsByTagName('input');
	for(let i = 0; i < inputs.length; i++) {
		let input = inputs.item(i);
		input.value = "";
		if(input.name != "id") input.disabled = false;
	}
	document.getElementsByName('id-campi')[0].parentNode.firstElementChild.value = "Escolha um campus";
	document.getElementsByName('tipo')[0].parentNode.firstElementChild.value = "Escolha um tipo";

	let selects = document.getElementsByTagName("select");
	selects.item(0).parentElement.firstElementChild.disabled = false;
	selects.item(1).parentElement.firstElementChild.disabled = false;
}

function prepararEdicao(id) {
	modalEstado = "edicao";
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
				let input = document.getElementsByName(propriedade.nodeName)[0];
				if(propriedade.nodeName != "id") input.disabled = false;
				if(propriedade.nodeName == "id-campi") {
					input.parentNode.firstChild.value = propriedade.textContent == "1" ? "I" : "II";
					input.value = propriedade.textContent;
				} else if (propriedade.nodeName == "tipo") {
					input.parentNode.firstChild.value = convert(propriedade.textContent);
					input.value = propriedade.textContent.toLocaleLowerCase();
				} else {
					input.value = propriedade.textContent;
				}
			}

			alterarCampos();
			let paramsEspecificos = item.item(item.length-1).children;
			for(param in paramsEspecificos) {
				let propNome = paramsEspecificos.item(param).nodeName;
				let propValor = paramsEspecificos.item(param).textContent;
				if(propNome == "id") propNome = "id-obra";
				if(propNome == "tempo") propValor = propValor.substring(0, 5);
				document.getElementsByName(propNome)[0].value = propValor;
			}
			let selects = document.getElementsByTagName("select");
			selects.item(0).parentElement.firstElementChild.disabled = false;
			selects.item(1).parentElement.firstElementChild.disabled = false;
		}
	};
	xhttp.send();
}

function prepararInfo(id) {
	modalEstado = "info";
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
				let input = document.getElementsByName(propriedade.nodeName)[0];
				input.disabled = true;
				if(propriedade.nodeName == "id-campi") {
					input.parentNode.firstChild.value = propriedade.textContent == "1" ? "I" : "II";
				} else if (propriedade.nodeName == "tipo") {
					input.parentNode.firstChild.value = convert(propriedade.textContent);
					input.value = propriedade.textContent.toLocaleLowerCase();
				} else {
					input.value = propriedade.textContent;
				}
			}

			alterarCampos();
			let paramsEspecificos = item.item(item.length-1).children;
			for(param in paramsEspecificos) {
				let propNome = paramsEspecificos.item(param).nodeName;
				let propValor = paramsEspecificos.item(param).textContent;
				if(propNome == "id") propNome = "id-obra";
				if(propNome == "tempo") propValor = propValor.substring(0, 5);
				document.getElementsByName(propNome)[0].value = propValor;
				document.getElementsByName(propNome)[0].disabled = true;
			}
			let selects = document.getElementsByTagName("select");
			selects.item(0).parentElement.firstElementChild.disabled = true;
			selects.item(1).parentElement.firstElementChild.disabled = true;
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

function getParamsPorTipo(tipo) {
	switch(tipo) {
		case "academicos": return PARAMS_ACADEMICOS;
		case "livros":	  return PARAMS_LIVROS;
		case "midias":	  return PARAMS_MIDIAS;
		case "periodicos": return PARAMS_PERIODICOS;
		default: return;
	}
}
