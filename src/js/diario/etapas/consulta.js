function consulta() {
	//cria conexão com o servlet consulta
	var xhttp = new XMLHttpRequest(),
		method = "POST",
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
				linha += "<a class=\"botao-tabela-etapas edita waves-effect waves-light btn-small modal-trigger material-icons\" href=\"#EditaForm\" name=\"EditarEtapa\" id=\"Edita\" onclick=\"pegaValor(this.parentElement.parentElement)\">Editar</a>";
				linha += "<a class=\"botao-tabela-etapas deleta waves-effect waves-light btn-small modal-trigger material-icons red darken-2\" href=\"#RemoveForm\" style=\"margin-left: 1%\">Deletar</a></td>";
				linha += "</tr>"
				tabela.innerHTML += linha;

			}
			getSoma();

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

function pesquisarEtapa() {
	var input = document.querySelector("#search");
	var filter = input.value.toUpperCase();
	var table = document.querySelector("#tabela-etapas-corpo");
	var tr = table.getElementsByTagName("tr");

	for (let i = 0; i < tr.length; i++) {
		let td = tr[i].children[0];
		if (td) {
			let txtValue = td.innerHTML;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
}

function getSoma() {
	var tabela = document.getElementById("tabela-etapas-corpo");
	var tr = tabela.getElementsByTagName("tr");

	var soma = 0;

	for (let i = 0; i < tr.length; i++) {
		let valor = tr[i].children[2].innerHTML;
		soma += parseInt(valor);
	}

	return soma;

}