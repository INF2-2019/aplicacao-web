const paramNomes = ["id", "id-depto", "nome", "senha", "email", "titulacao"];

function deletar(e) {
	let id = document.getElementsByName("id")[0].value;
	if(id == ""){
		//document.getElementById("saida").innerHTML = "Insira ID";
		return;
	}

	//document.getElementById("saida").innerHTML = "Carregando...";
	let xhttp = new XMLHttpRequest();
	let url = endereco + "diario/professores/deletar?id=" + id;

	xhttp.open(method, url, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			atualizarTabela();
		}
	};
	xhttp.send();
}

function alterar(e) {
	//document.getElementById("saida").innerHTML = "Carregando...";
	let xhttp = new XMLHttpRequest();

	let url = endereco + "diario/professores/atualizar";
	let stringParams = "?";

	for(i in paramNomes) {
		let conteudo = document.getElementsByName(paramNomes[i])[0].value;
		if(conteudo == ""){
			//document.getElementById("saida").innerHTML = "Preencha todos os campos para alterar";
			return;
		}
		stringParams += "&" + paramNomes[i] + "=" + conteudo;
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
