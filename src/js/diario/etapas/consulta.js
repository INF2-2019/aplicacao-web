function consulta() {
	//cria conexão com o servlet consulta
	var xhttp = new XMLHttpRequest(),
		method = "GET",
		url = "http://localhost:8080/app/diario/etapas/consultar";
	xhttp.open(method, url, true);
	xhttp.withCredentials = true;

	var parser = new DOMParser();

	var tabela = document.getElementById("tabela-etapas-corpo");
	tabela.innerHTML = "";

	//recebe resposta em XML e manipula o XML para criar a tabela
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var responseStr = xhttp.responseText;
			var xmlDoc = parser.parseFromString(responseStr, "text/xml");
			//cria tabela
			var elementos = xmlDoc.childNodes[0].children; //HTMLColletion etapa
			for (let i = 0; i < elementos.length; i++) {
				let linha = "<tr>";
				for (let j = 0; j < elementos[i].children.length; j++) {
					let elemento = "";
					if (j === 0) {
						elemento = "<td data-id=\"" + elementos[i].children[j].innerHTML + "\" class =\"td-manutencao-etapas\" >";
					} else {
						elemento = "<td class =\"td-manutencao-etapas\">"
					}
					elemento += elementos[i].children[j].innerHTML; //id/ano/valor
					elemento += "</td>";
					linha += elemento;
				}
				linha += "<td class =\"td-manutencao-etapas\" >"
				linha += "<a class=\"botao-tabela-etapas edita waves-effect waves-light btn-small modal-trigger material-icons\" href=\"#EditaForm\" name=\"EditarEtapa\" id=\"Edita\">Editar</a>";
				linha += "<a class=\"botao-tabela-etapas deleta waves-effect waves-light btn-small modal-trigger material-icons red darken-2\" href=\"#RemoveForm\" style=\"margin-left: 1%\">Deletar</a></td>";
				linha += "</tr>"
				tabela.innerHTML += linha;

			}

		} else if (xhttp.status !== 200) {
			var responseStr = xhttp.responseText;
			if (responseStr != "") {
				var xmlDoc = parser.parseFromString(responseStr, "text/xml");
				var resp = xmlDoc.childNodes[0].children[0].innerHTML;

				toast(resp, "red darken-2");
			}
		}
	};
	xhttp.send();
}

function consultaParametro() {
	//cria conexão com o servlet consulta
	var xhttp = new XMLHttpRequest(),
		method = "GET",
		url = "http://localhost:8080/app/diario/etapas/consultar?id=" + document.getElementById('consultaID').value + '&ano=' + document.getElementById('consultaAno').value + '&valor=' + document.getElementById('consultaValor').value;
	xhttp.open(method, url, true);
	xhttp.withCredentials = true;

	var parser = new DOMParser();

	var tabela = document.getElementById("tabela-etapas-corpo");

	//recebe resposta em XML e manipula o XML para criar a tabela
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			tabela.innerHTML = "";
			var responseStr = xhttp.responseText;
			var xmlDoc = parser.parseFromString(responseStr, "text/xml");

			var elementos = xmlDoc.childNodes[0].children; //HTMLColletion etapa
			for (let i = 0; i < elementos.length; i++) {
				let linha = "<tr>";
				for (let j = 0; j < elementos[i].children.length; j++) {
					let elemento = "";
					if (j === 0) {
						elemento = "<td data-id=\"" + elementos[i].children[j].innerHTML + "\" class =\"td-manutencao-etapas\">";
					} else {
						elemento = "<td class =\"td-manutencao-etapas\">"
					}
					elemento += elementos[i].children[j].innerHTML; //id/ano/valor
					elemento += "</td>";
					linha += elemento;
				}
				linha += "<td class =\"td-manutencao-etapas\" >"
				linha += "<a class=\"botao-tabela-etapas edita waves-effect waves-light btn-small modal-trigger material-icons\" href=\"#EditaForm\" name=\"EditarEtapa\" id=\"Edita\">Editar</a>";
				linha += "<a class=\"botao-tabela-etapas deleta waves-effect waves-light btn-small modal-trigger material-icons red darken-2\" href=\"#RemoveForm\" style=\"margin-left: 1%\">Deletar</a></td>";
				linha += "</tr>"
				tabela.innerHTML += linha;
			}

		} else if (xhttp.status !== 200) {
			var responseStr = xhttp.responseText;
			if (responseStr != "") {
				var xmlDoc = parser.parseFromString(responseStr, "text/xml");
				var resp = xmlDoc.childNodes[0].children[0].innerHTML;

				toast(resp, "red darken-2");
			}
		}
	};
	xhttp.send();

}