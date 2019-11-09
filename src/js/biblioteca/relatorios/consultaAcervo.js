function consulta() {
	//cria conexão com o servlet consulta
	var xhttp = new XMLHttpRequest(),
		method = "GET",
		url = baseURL + "/acervo/consultar";
	xhttp.open(method, url, true);
	var parser = new DOMParser();
	var divResposta = document.getElementsByClassName("printable");

	let jaMostrouErro = false;
	//recebe resposta em XML e manipula o XML para criar a tabela
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var responseStr = xhttp.responseText;
			var xmlDoc = parser.parseFromString(responseStr, "text/xml");

			//cria tabelas
			var tabelas = [
				tabelaLivros = "<thead><th>Id</th><th>Campi</th><th>Nome</th><th>Local</th><th>Ano</th><th>Editora</th><th>Páginas</th><th>Edição</th><th>ISBN</th></thead>",
				tabelaPeriodicos = "<thead><th>Id</th><th>Campi</th><th>Nome</th><th>Local</th><th>Ano</th><th>Editora</th><th>Páginas</th><th>Periodicidade</th><th>Mês</th><th>Volume</th><th>Subtipo</th><th>ISSN</th></thead>",
				tabelaAcademicos = "<thead><th>Id</th><th>Campi</th><th>Nome</th><th>Local</th><th>Ano</th><th>Editora</th><th>Páginas</th><th>Programa</th></thead>",
				tabelaMidias = "<thead><th>Id</th><th>Campi</th><th>Nome</th><th>Local</th><th>Ano</th><th>Editora</th><th>Páginas</th><th>Tempo</th><th>Subtipo</th></thead>"
			]

			var titulos = ["LIVROS", "PERIÓDICOS", "ACADÊMICOS", "MÍDIAS"];
			var tipos = ["LIVROS", "PERIODICOS", "ACADEMICOS", "MIDIAS"];

			for (let a = 0; a <= 3; a++) {
				var tituloTabela = "<h5>" + titulos[a] + "</h5>";
				var tabela = "<table class=\"highlight centered responsive-table\">";
				tabela += tabelas[a];

				var elementos = xmlDoc.childNodes[0].children; //HTMLColletion etapa
				console.log(elementos);

				var tipoAtual = tipos[a];
				//console.log(tipoAtual);

				for (let i = 0; i < elementos.length; i++) {
					let linha = "<tr>";

					let y = " ";

					if (elementos[i].children[3] != undefined) {
						y = elementos[i].children[3].innerHTML;
					}

					if (tipoAtual == y) {
						for (let j = 0; j < (elementos[i].children.length); j++) {
							let elemento = "";
							if (elementos[i].children[j].children.length > 0) {
								for (let k = 1; k < elementos[i].children[j].children.length; k++) {
									elemento += "<td>";
									elemento += elementos[i].children[j].children[k].innerHTML;
									elemento += "</td>";
								}
							} else {
								if (j === 0) {
									elemento = "<td data-id=\"" + elementos[i].children[j].innerHTML + "\">";
								} else if (j != 3) {
									elemento = "<td>"
								}
								if (j != 3) {
									elemento += elementos[i].children[j].innerHTML;
									elemento += "</td>";
								}

							}

							linha += elemento;
							jaMostrouErro = true;
						}
					} else if(!jaMostrouErro){
						var resp = xmlDoc.childNodes[0].children[0].innerHTML;
						M.toast({
							html: resp,
							classes: "red darken-2"
						});
						jaMostrouErro = true;
					}

					linha += "</tr>"
					tabela += linha;
				}

				divResposta[a].innerHTML += tituloTabela;
				divResposta[a].innerHTML += tabela;
			}


		} else if (xhttp.status === 400) {
			var responseStr = xhttp.responseText;
			if (responseStr != "") {
				var xmlDoc = parser.parseFromString(responseStr, "text/xml");
				console.log(xmlDoc);
				var resp = xmlDoc.childNodes[0].children[0].innerHTML;
				M.toast({
					html: resp,
					classes: "red darken-2"
				});
				jaMostrouErro = true;
			}
		}
	};
	xhttp.send();
}
