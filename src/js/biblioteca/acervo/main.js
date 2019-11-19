//const ENDERECO = "http://localhost:8080/app";
const ROTA_CONSULTA = "/biblioteca/acervo/consultar";
const ROTA_CONSULTA_CAMPI = "/biblioteca/campi/listar"
const ROTA_REMOCAO = "/biblioteca/acervo/deletar";
const ROTA_ATUALIZACAO = "/biblioteca/acervo/atualizar";
const ROTA_INSERCAO = "/biblioteca/acervo/inserir";

let modalEstado;
let deleteId;
let select;

atualizarTabela();
carregarCampi();

function carregarCampi(){
	select = document.getElementsByName('id-campi')[0];

	let inv = document.createElement('option');
	inv.value = "Escolha um campus";
	inv.innerHTML = "Escolha um campus";
	select.appendChild(inv);

	$.ajax(ENDERECO+ROTA_CONSULTA_CAMPI, {
		method: "GET",
		xhrFields: { withCredentials: true },
	})
	.then(
		function success(data) {
			let raiz = data.firstElementChild;
			let campi = raiz.children;
			for(let i = 0; i < campi.length; i++) {
				let op = document.createElement('option');
				op.value = campi[i].children[0].innerHTML;
				op.innerHTML = campi[i].children[1].innerHTML;
				select.appendChild(op);
			}

			$('select').formSelect();
		},

		function fail(data, status) {
			let resposta = data.responseXML.firstElementChild.firstElementChild.innerHTML;
			window.alert("Ocorreu um erro: " + resposta);
		}
	);
}

function atualizarTabela() {
	var xhttp = new XMLHttpRequest();

	url = ENDERECO + ROTA_CONSULTA;

	xhttp.open("GET", url, true);
	xhttp.withCredentials = true;
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE) {
			var xml = (new DOMParser()).parseFromString(this.responseText, "application/xml");
			var raiz = xml.firstElementChild;
			if(xhttp.status === 200) {

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
			} else if(xhttp.status === 404 || xhttp == 0) {
				document.getElementById('saida').inneHTML = "Servidor offline";
			} else {
				document.getElementById('saida').innerHTML = raiz.firstElementChild.textContent;
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
	let url = ENDERECO + ROTA_REMOCAO + "?id=" + deleteId;

	xhttp.open("GET", url, true);
	xhttp.withCredentials = true;
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE) {
			if(xhttp.status === 200) {
				atualizarTabela();
			} else if (xhttp.status === 404) {
				document.getElementById("saida").innerHTML = "Servidor offline";
			} else {
				document.getElementById("saida").innerHTML = xhttp.responseXML.firstChild.firstElementChild.textContent;
			}
		}
	};
	xhttp.send();
}

function alterar() {
	let xhttp = new XMLHttpRequest();

	let url = ENDERECO + ROTA_ATUALIZACAO;
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
	xhttp.withCredentials = true;
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE) {
			if(xhttp.status === 200) {
				atualizarTabela();
			} else if(xhttp.status === 404) {
				document.getElementById("saida").innerHTML = "Servidor offline";
			} else {
				var xml = (new DOMParser()).parseFromString(this.responseText, "application/xml");
				var raiz = xml.firstElementChild;
				document.getElementById("saida").innerHTML = raiz.firstElementChild.textContent;
			}
		}
	};
	xhttp.send();
}

function inserir(){
	var xhttp = new XMLHttpRequest();

	url= ENDERECO + ROTA_INSERCAO;
	let params = getParams();

	xhttp.open("GET", url+params, true);
	xhttp.withCredentials = true;
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE) {
			if(xhttp.status === 200) {
				atualizarTabela();
			} else if (xhttp.status === 404) {
				document.getElementById("saida").innerHTML = "Servidor offline";
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

function alterarCampos(desabilitarIdObra = false) {
	let idObra = "";
	if(typeof(desabilitarIdObra) != 'boolean') {
		idObra = desabilitarIdObra;
		let idObraInput = document.getElementsByName('id-obra')[0];
		desabilitarIdObra = idObraInput != undefined && idObraInput.disabled;
	}
	let camposDiv = document.getElementById('outrosParametros');
	let paramsDesseTipo = getParamsPorTipo(document.getElementsByName('tipo')[0].value);

	camposDiv.innerHTML = "";
	for(param in paramsDesseTipo) {
		let inputHTML =
			'<label class="primary-text text-lighten-1 short col s' + paramsDesseTipo[param].tamanho + '"' +
					'name="' + paramsDesseTipo[param].propNome + '">' +
				paramsDesseTipo[param].exibNome + ': ';
		if(paramsDesseTipo[param].paramNome == "subtipo" && paramsDesseTipo[param].tipoInput == "select") {
			inputHTML += '<select name="subtipo"><option value="CD">CD</option><option value="DVD">DVD</option>' +
					'<option value="PENDRIVE">Pendrive</option><option value="FITA">Fita</option></select>';
			camposDiv.innerHTML += inputHTML;
			setTimeout(function(){$('select').formSelect();}, 50);
		} else {
			inputHTML += '<input type="'+paramsDesseTipo[param].tipo+'" name="'+paramsDesseTipo[param].paramNome+'" ';
			if(paramsDesseTipo[param].paramNome == "id-obra" && desabilitarIdObra)
				inputHTML += 'disabled="true" value="' + idObra + '"';
			inputHTML += '></label>';
			camposDiv.innerHTML += inputHTML;
		}
	}

}

function prepararInsercao() {
	modalEstado = "insercao";
	let nomeModal = document.getElementsByTagName("h4")[0];
	nomeModal.innerHTML = "Adicionar item";

	let inputs = document.getElementsByTagName('input');
	for(let i = 0; i < inputs.length; i++) {
		let input = inputs.item(i);
		input.value = "";
		if(input.name != "id") input.disabled = false;
	}

	let campiSel = document.getElementsByName('id-campi')[0];
	campiSel.value = "Escolha um campus";
	campiSel.M_FormSelect._setValueToInput();
	campiSel.disabled = false;

	let tipoSel = document.getElementsByName('tipo')[0];
	tipoSel.parentNode.firstElementChild.value = "Escolha um tipo";
	tipoSel.parentElement.firstElementChild.disabled = false;

	document.getElementById('outrosParametros').innerHTML = "";
}

function prepararEdicao(id) {
	modalEstado = "edicao";
	let nomeModal = document.getElementsByTagName("h4")[0];
	nomeModal.innerHTML = "Editar item";
	let xhttp = new XMLHttpRequest();

	url= ENDERECO + ROTA_CONSULTA + "?id=" + id;

	xhttp.open("GET", url, true);
	xhttp.withCredentials = true;
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE) {
			var xml = (new DOMParser()).parseFromString(this.responseText, "application/xml");
			var raiz = xml.firstElementChild;
			if(xhttp.status === 200) {
				var item = raiz.firstElementChild.children;

				for(let i = 0; i < item.length-1; i++) {
					let propriedade = item.item(i);
					let input = document.getElementsByName(propriedade.nodeName)[0];
					if(propriedade.nodeName != "id") input.disabled = false;
					if(propriedade.nodeName == "id-campi") {
						input.value = propriedade.textContent;
						input.M_FormSelect._setValueToInput();
					} else if (propriedade.nodeName == "tipo") {
						input.parentNode.firstChild.value = convert(propriedade.textContent);
						input.value = propriedade.textContent.toLocaleLowerCase();
					} else {
						input.value = propriedade.textContent;
					}
				}

				alterarCampos(true);
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
			} else if (xhttp.status === 404) {
				document.getElementById("saida").innerHTML = "Servidor offline";
			} else {
				document.getElementById("saida").innerHTML = xhttp.responseXML.firstChild.firstElementChild.textContent;
			}
		}
	};
	xhttp.send();
}

function prepararInfo(id) {
	modalEstado = "info";
	let nomeModal = document.getElementsByTagName("h4")[0];
	nomeModal.innerHTML = "Informações";
	let xhttp = new XMLHttpRequest();

	url= ENDERECO + ROTA_CONSULTA + "?id=" + id;

	xhttp.open("GET", url, true);
	xhttp.withCredentials = true;
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE) {
			if(xhttp.status === 200) {
				var xml = (new DOMParser()).parseFromString(this.responseText, "application/xml");
				var raiz = xml.firstElementChild;
				var item = raiz.firstElementChild.children;

				for(let i = 0; i < item.length-1; i++) {
					let propriedade = item.item(i);
					let input = document.getElementsByName(propriedade.nodeName)[0];
					input.disabled = true;
					if(propriedade.nodeName == "id-campi") {
						input.value = propriedade.textContent;
						input.M_FormSelect._setValueToInput();
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
				selects.item(1).value = "invalido";
			} else if (xhttp.status === 404) {
				document.getElementById("saida").innerHTML = "Servidor offline";
			} else {
				document.getElementById("saida").innerHTML = xhttp.responseXML.firstChild.firstElementChild.textContent;
			}
		}
	};
	xhttp.send();

}

function tipoChange() {
	let inputIdObra = document.getElementsByName('id-obra')[0];
	if(inputIdObra != undefined)
		alterarCampos(inputIdObra.value);
	else
		alterarCampos();
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
