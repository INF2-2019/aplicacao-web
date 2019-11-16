const METODO = "POST";
const ENDERECO = "http://localhost:8080/app";
const ROTA = "/biblioteca/admin/login";
const MANTER = true;

const PAGINA_DESTINO = "transicao/adm.html";

let inputs;

function logar() {
	inputs = document.getElementsByTagName("input");

	let acesso = inputs[0].value;
	let senha = inputs[1].value;

	jqueryAjax(acesso, senha, MANTER);

}

function jqueryAjax(acesso, senha, manter) {
	$.ajax(ENDERECO+ROTA, {
		method: METODO,
		data: {
			login: acesso,
			senha: senha,
			manter: manter
		},
		xhrFields: {
			withCredentials: true
		}
	})
	.then(
		function success(name) {
			window.location.href = PAGINA_DESTINO;
		},

		function fail(data, status) {
				console.log(data);
				let resposta = data.responseXML.firstElementChild.firstElementChild.textContent;
				document.getElementsByTagName("p")[0].innerHTML = resposta;
		}
	);
}
