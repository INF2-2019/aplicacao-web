const METODO = "POST";
const ENDERECO= "http://localhost:8080/app/";
const ROTA = "diario/professores/inserir";

function inserir(){
	var xhttp = new XMLHttpRequest();

	let id = document.getElementsByName("idInsere")[0].value;
	let idDepto = document.getElementsByName("id-deptoInsere")[0].value;
	let nome = document.getElementsByName("nomeInsere")[0].value;
	let senha = document.getElementsByName("senhaInsere")[0].value;
	let email = document.getElementsByName("emailInsere")[0].value;
	let titulacao = document.getElementsByName("titulacaoInsere")[0].value;

	console.log(id);
	jqueryAjax(id, idDepto, nome, senha, email, titulacao);

	/*url= endereco + "diario/professores/inserir";
	let params = "?id="+id + "&id-depto="+idDepto + "&nome="+nome + "&senha="+senha
		 	+"&email="+email + "&titulacao="+titulacao;

	xhttp.open(method, url+params, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			let msg = this.responseXML.firstElementChild.lastElementChild.textContent;
			document.getElementById("saida").innerHTML = msg;
		}
	};
	xhttp.send();*/
}

function jqueryAjax(id, idDepto, nome, senha, email, titulacao) {
	$.ajax(ENDERECO+ROTA, {
		method: METODO,
		xhrFiels: { withCredentials: true },
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
			document.getElementsByTagName("p")[0].innerHTML = resposta;
		}
	);
}
