function consulta() {
	//cria conexão com o servlet consulta
	var xhttp = new XMLHttpRequest(),
		method = "GET",
		url = baseURL + "/reservas/consultar";
	xhttp.open(method, url, true);
	xhttp.withCredentials = true;
	var parser = new DOMParser();
	//recebe resposta em XML e manipula o XML para criar a tabela
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var responseStr = xhttp.responseText;
			var xmlDoc = parser.parseFromString(responseStr, "text/xml");

			//cria tabela
			var tabela = document.getElementById("printable");
			tabela.innerHTML += "<thead><th>Id</th><th>Id do Aluno</th><th>Id da Obra</th><th>Data de Reserva</th><th>Tempo de Espera</th><th>Emprestou?</th></thead>";

			var elementos = xmlDoc.childNodes[0].children; //HTMLColletion etapa
			console.log(elementos);

			for (let i = 0; i < elementos.length; i++) {
				let linha = "<tr>";

				for (let j = 0; j < (elementos[i].children.length); j++) {
					let elemento = "";

					if (j === 0) {
						elemento = "<td data-id=\"" + elementos[i].children[j].innerHTML + "\">";
					}
					elemento = "<td>"
					elemento += elementos[i].children[j].innerHTML;
					elemento += "</td>";

					linha += elemento;
				}


				linha += "</tr>"
				tabela.innerHTML += linha;
			}

		} else if (xhttp.status === 400) {
			var responseStr = xhttp.responseText;
			if (responseStr != "") {
				var xmlDoc = parser.parseFromString(responseStr, "text/xml");
				var resp = xmlDoc.childNodes[0].children[0].innerHTML;
				M.toast({
					html: resp,
					classes: "red darken-2"
				});
			}
		}
	};
	xhttp.send();
}
