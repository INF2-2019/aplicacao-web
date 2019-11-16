const paramNomes = ["id", "id-depto", "nome", "senha", "email", "titulacao"];
const ROTA_EDICAO = "/diario/professores/atualizar";
const ROTA_REMOCAO = "/diario/professores/deletar";
const ROTA_CONSULTA = "/diario/professores/consultar";
const LABEL_ATRIBUTOS = 'class="primary-text text-lighten-1 short col s12" style="font-size:18px;"'

function info(id){
	if(id == ""){
		window.alert("Insira ID");
		return;
	}

	let xhttp = new XMLHttpRequest();
	let url = ENDERECO + ROTA_CONSULTA + "?id=" + id;

	xhttp.open("GET", url, true);
	xhttp.withCredentials = true;
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE) {
			var xml = (new DOMParser()).parseFromString(this.responseText, "application/xml");
			var raiz = xml.firstElementChild;
			if(xhttp.status === 200) {
				var elementos = raiz.children;
				let informacoes = document.getElementById("informacoes");
				informacoes.innerHTML = "";
				for(let i = 0; i < elementos.length; i++) {
					var dados = elementos[i].children;
					informacoes.innerHTML += "<label " + LABEL_ATRIBUTOS + " id=\"id\"> SIAPE: " + dados[0].textContent + "</label>";
					informacoes.innerHTML += "<label " + LABEL_ATRIBUTOS + " id=\"nome\"> Nome: " + dados[2].textContent + "</label>";
					informacoes.innerHTML += "<label " + LABEL_ATRIBUTOS + " id=\"idDepto\"> id-Depto: " + dados[1].textContent + "</label>";
					informacoes.innerHTML += "<label " + LABEL_ATRIBUTOS + " id=\"email\"> E-mail: " + dados[3].textContent + "</label>";
					informacoes.innerHTML += "<label " + LABEL_ATRIBUTOS + " id=\"titulacao\"> Titulação: " + dados[4].textContent + "</label>";
				}
			} else if(xhttp.status == 404) {
				document.getElementsByTagName("p")[0].innerHTML = ("Servidor offline");
			} else {
				document.getElementsByTagName("p")[0].innerHTML = (raiz.firstElementChild.textContent);
			}
		}
	};
	xhttp.send();
}

function deletar(id) {

	if(id == ""){
		window.alert("Insira ID");
		return;
	}

	let xhttp = new XMLHttpRequest();
	let url = ENDERECO + ROTA_REMOCAO + "?id=" + id;

	xhttp.open("GET", url, true);
	xhttp.withCredentials = true;
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE) {
			var xml = (new DOMParser()).parseFromString(this.responseText, "application/xml");
			var raiz = xml.firstElementChild;
			if(xhttp.status === 200) {
				atualizarTabela();
			} else if(xhttp.status == 404) {
				document.getElementsByTagName("p")[0].innerHTML = ("Servidor offline");
			} else {
				document.getElementsByTagName("p")[0].innerHTML = (raiz.firstElementChild.textContent);
			}
		}
	};
	xhttp.send();
}

function alterar() {

	let id = document.getElementsByName("id")[0].value;
	let idDepto = document.getElementsByName("id-depto")[0].value;
	let nome = document.getElementsByName("nome")[0].value;
	let senha = document.getElementsByName("senha")[0].value;
	let email = document.getElementsByName("email")[0].value;
	let titulacao = document.getElementsByName("titulacao")[0].value;

	if(id == "" || idDepto == "" || nome == "" || email == "") {
		window.alert("Apenas senha pode permanecer vazio");
		return;
	}

	requisicaoPost(id, idDepto, nome, senha, email, titulacao);
}

// Não consegui fazer o vanilla funcionar com POST, sinto muito
function requisicaoPost(id, idDepto, nome, senha, email, titulacao) {
	$.ajax(ENDERECO+ROTA_EDICAO, {
		method: "POST",
		xhrFields: { withCredentials: true },
		data: {
			id: id,
			"id-depto": idDepto,
			nome: nome,
			senha: senha,
			email: email,
			titulacao: titulacao
		}
	})
	.then(
		function success(name) {
			atualizarTabela();
		},

		function fail(data, status) {
			let resposta = data.responseXML.firstElementChild.firstElementChild.innerHTML;
			document.getElementsByTagName("p")[0].innerHTML = status == 404 ? "Servidor offline" : resposta;
		}
	);
}
