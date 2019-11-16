const ENDERECO = "http://localhost:8080/app/";
const ROTA_CONSULTA = "diario/professores/consultar";
const ROTA_EDICAO = "diario/professores/atualizar";
const ROTA_EDITAR_SENHA = "diario/professores/atualizar-senha";
const REQUISITAR_ID_PROPRIO = -1;

function carregarPerfil() {
	let xhttp = new XMLHttpRequest();
	let id = REQUISITAR_ID_PROPRIO;

	xhttp.open("GET", ENDERECO + ROTA_CONSULTA + "?id=" + id, true);
	xhttp.withCredentials = true;
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE) {
			let raiz = xhttp.responseXML.firstElementChild;
			if(xhttp.status === 200) {
				let elemento = raiz.firstElementChild;
				let inputs = document.getElementsByTagName('input');
				var dados = elemento.children;
				for(i in dados) {
					inputs[i].value = dados[i].textContent;
				}
				M.updateTextFields();
			}
			else {
				window.alert(xhttp.status +": "+ raiz.firstElementChild.textContent);
			}
		}
	};
	xhttp.send();
}

function salvar() {
	let id = document.getElementById("siape").value;
	let idDepto = document.getElementById("depto").value;
	let nome = document.getElementById("nome").value;
	let senha = "";
	let email = document.getElementById("email").value;
	let titulacao = document.getElementById("titulacao").value;
	
	alterarPost(id, idDepto, nome, senha, email, titulacao);
}

function alterarPost(id, idDepto, nome, senha, email, titulacao) {
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
			M.toast({ html: 'Salvo com sucesso', classes: 'utils sucesso-2 text-light-text' })
		},

		function fail(data, status) {
			let resposta = data.responseXML.firstElementChild.firstElementChild.innerHTML;
			M.toast({ html: status == 404 ? "404... Servidor offline?" : resposta, classes: 'utils erro-2 text-light-text' });
		}
	);
}

function cancelar() {
	document.getElementById('antigaSenha').value = "";
	document.getElementById('novaSenha').value = "";
	M.updateTextFields();
}

function enviar() {
	let antiga = document.getElementById('antigaSenha').value;
	let nova = document.getElementById('novaSenha').value;
	alterarSenha(antiga, nova);
}

function alterarSenha(antigaSenha, novaSenha) {
	fetch(ENDERECO + ROTA_EDITAR_SENHA, {
			credentials: "include",
			method: "POST",
			body: new URLSearchParams({antigaSenha, novaSenha}),
			headers: new Headers({
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			})
		})
		.then(data => data.text())
		.then(data => {
			let dataXML = (new DOMParser()).parseFromString(data,"application/xml");
			let msg = dataXML.firstChild.firstChild.textContent
			let estado = dataXML.firstChild.nodeName;
			M.toast({html: msg, classes: 'utils ' + estado + '-2' });
		})
}