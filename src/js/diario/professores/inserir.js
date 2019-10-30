//const method = "GET";
//const endereco = "http://localhost:8080/app/";

function inserir(){
	method = "GET";
	endereco = "http://localhost:8080/app/";
	var xhttp = new XMLHttpRequest();

	let id = document.getElementsByName("id")[0].value;
	let idDepto = document.getElementsByName("id-depto")[0].value;
	let nome = document.getElementsByName("nome")[0].value;
	let senha = document.getElementsByName("senha")[0].value;
	let email = document.getElementsByName("email")[0].value;
	let titulacao = document.getElementsByName("titulacao")[0].value;

	url= endereco + "diario/professores/inserir";
	let params = "?id="+id + "&id-depto="+idDepto + "&nome="+nome + "&senha="+senha
		 	+"&email="+email + "&titulacao="+titulacao;

	xhttp.open(method, url+params, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			let msg = this.responseXML.firstElementChild.firstElementChild.lastElementChild.textContent;
			document.getElementById("saida").innerHTML = msg;
		}
	};
	xhttp.send();
}
