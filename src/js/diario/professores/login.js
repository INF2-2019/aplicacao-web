const METODO = "POST";
const ENDERECO = "http://localhost:8080/app"
const ROTA = "/diario/professores/logar"
const MANTER = true;

const PAGINA_DESTINO = "transicao/professor.html";

let inputs;

function logar() {
	inputs = document.getElementsByTagName("input");
	
	let siape = inputs[0].value;
	let senha = inputs[1].value;

	jqueryAjax(siape, senha, MANTER);
	
}

// Vanilla n tava funfando to nem aí
function jqueryAjax(siape, senha, manter) {
	$.ajax(ENDERECO+ROTA, {
		method: METODO,
		xhrFields: { withCredentials: true },
		data: {
			siape: siape,
			senha: senha,
			manter: manter
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