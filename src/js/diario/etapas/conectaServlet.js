function consulta() {
	//cria conexão com o servlet consulta
	var xhttp = new XMLHttpRequest(),
		method = "GET",
		url = "http://localhost:8080/app/diario/etapas/consultar";
	xhttp.open(method, url, true);
	var parser = new DOMParser();
	var divResposta = document.getElementById("resposta");

	//recebe resposta em XML e manipula o XML para criar a tabela
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var responseStr = xhttp.responseText;
			var xmlDoc = parser.parseFromString(responseStr, "text/xml");
			//cria tabela
			var tabela = "<table class=\"highlight centered responsive-table\">";
			tabela += "<thead><th>Id</th><th>Ano</th><th>Valor</th><th>Ações</th></thead>";
			var elementos = xmlDoc.childNodes[0].children; //HTMLColletion etapa
			for (let i = 0; i < elementos.length; i++) {
				let linha = "<tr>";
				for (let j = 0; j < elementos[i].children.length; j++) {
					let elemento = "";
					if (j === 0) {
						elemento = "<td data-id=\"" + elementos[i].children[j].innerHTML + "\">";
					} else {
						elemento = "<td>"
					}
					elemento += elementos[i].children[j].innerHTML; //id/ano/valor
					elemento += "</td>";
					linha += elemento;
				}
				linha += "<td><button name=\"EditarEtapa\" class=\"edita waves-effect waves-light btn-small modal-trigger material-icons\" href=\"#EditaForm\" id=\"Edita\" >edit</button>    ";
				linha += "<button class=\"deleta waves-effect waves-light btn-small modal-trigger material-icons\" href=\"#RemoveForm\" style=\"background-color:#D32F2F\">delete_forever</button></td>";
				linha += "</tr>"
				tabela += linha;
			}
			tabela += "</table>";

			divResposta.innerHTML = tabela;

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

function consultaParametro(){
    //cria conexão com o servlet consulta
	var xhttp = new XMLHttpRequest(),
		method = "GET",
		url = "http://localhost:8080/app/diario/etapas/consultar?id=" + document.getElementById('idConsulta').value + '&ano=' + document.getElementById('anoConsulta').value + '&valor=' + document.getElementById('valorConsulta').value;
	xhttp.open(method, url, true);
	var parser = new DOMParser();
        var divResposta = document.getElementById("resposta");

	//recebe resposta em XML e manipula o XML para criar a tabela
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			divResposta.innerHTML = "";
                        var responseStr = xhttp.responseText;
			var xmlDoc = parser.parseFromString(responseStr, "text/xml");
			//cria tabela
			var tabela = "<table class=\"highlight centered responsive-table\">";
			tabela += "<thead><th>Id</th><th>Ano</th><th>Valor</th><th>Ações</th></thead>";
			var elementos = xmlDoc.childNodes[0].children; //HTMLColletion etapa
			for (let i = 0; i < elementos.length; i++) {
				let linha = "<tr>";
				for (let j = 0; j < elementos[i].children.length; j++) {
					let elemento = "";
					if (j === 0) {
						elemento = "<td data-id=\"" + elementos[i].children[j].innerHTML + "\">";
					} else {
						elemento = "<td>"
					}
					elemento += elementos[i].children[j].innerHTML; //id/ano/valor
					elemento += "</td>";
					linha += elemento;
				}
				linha += "<td><button name=\"EditarEtapa\" class=\"edita waves-effect waves-light btn-small modal-trigger material-icons\" href=\"#EditaForm\" id=\"Edita\" >edit</button>    ";
				linha += "<button class=\"deleta waves-effect waves-light btn-small modal-trigger material-icons\" href=\"#RemoveForm\" style=\"background-color:#D32F2F\">delete_forever</button></td>";
				linha += "</tr>"
				tabela += linha;
			}
			tabela += "</table>";

			divResposta.innerHTML = tabela;

                        
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

function adiciona() {
	//cria conexão com o servlet adiciona
	var xhttp = new XMLHttpRequest(),
		method = "GET",
		url = "http://localhost:8080/app/diario/etapas/inserir?ano=" + document.getElementById('AdicionaAnoEtapa').value + '&valor=' + document.getElementById('AdicionaValorEtapa').value;
	xhttp.open(method, url, true);
	var parser = new DOMParser();
	var exibido = 0; //verifica se a mensagem de erro ja foi mostrada

	//recebe resposta em XML e manipula o XML
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var responseStr = xhttp.responseText;
			var xmlDoc = parser.parseFromString(responseStr, "text/xml");
			var resp =  xmlDoc.childNodes[0].children[0].innerHTML;
			M.toast({
				html: resp,
				classes: "utils sucesso-2"
			});
		} else if (xhttp.status === 400) {
			var responseStr = xhttp.responseText;
			if (responseStr != "") {
				var xmlDoc = parser.parseFromString(responseStr, "text/xml");
				var resp = xmlDoc.childNodes[0].children[0].innerHTML;
				if (exibido === 0) {
					M.toast({
						html: resp,
						classes: "red darken-2"
					});
					exibido += 1;
				}
			}
		}
	};
	xhttp.send();

	//limpa inputs
	limpaInputs();
	//atualiza a tabela
	setTimeout(consulta, 10);
}

//pega o id a ser passado para deletar
var id = -1;
$(document).on('click', '.deleta', function (e) {
	e.preventDefault;
	id = $(this).closest('tr').find('td[data-id]').data('id');
});

function deleta() {
	//cria conexão com o servlet deleta
	var xhttp = new XMLHttpRequest(),
		method = "GET",
		url = "http://localhost:8080/app/diario/etapas/deletar?id=" + id;
	xhttp.open(method, url, true);
	var parser = new DOMParser();

	//recebe resposta em XML e manipula o XML
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var responseStr = xhttp.responseText;
			var xmlDoc = parser.parseFromString(responseStr, "text/xml");
			var resp = xmlDoc.childNodes[0].children[0].innerHTML;
			M.toast({
				html: resp,
				classes: "utils sucesso-2"
			});
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

	//atualiza a tabela
	setTimeout(consulta, 10);
}


//pega o id a ser passado para atualizar
$(document).on('click', '.edita', function (e) {
	e.preventDefault;
	id = $(this).closest('tr').find('td[data-id]').data('id');
});

function atualiza() {
	//cria conexão com o servlet atualiza
	var xhttp = new XMLHttpRequest(),
		method = "GET",
		url = "http://localhost:8080/app/diario/etapas/atualizar?id=" + id + "&ano=" + document.getElementById('editaAno').value + '&valor=' + document.getElementById('editaValor').value;
	xhttp.open(method, url, true);
	var parser = new DOMParser();
	var exibido = 0;
        var resp;

	//recebe resposta em XML e manipula o XML
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var responseStr = xhttp.responseText;
			var xmlDoc = parser.parseFromString(responseStr, "text/xml");
			resp = xmlDoc.childNodes[0].children[0].innerHTML;
			M.toast({
				html: resp,
				classes: "utils sucesso-2"
			});
			// div.innerHTML = resp;
		} else if (xhttp.status === 400) {
			var responseStr = xhttp.responseText;
			if (responseStr != "") {
				var xmlDoc = parser.parseFromString(responseStr, "text/xml");
				resp = xmlDoc.childNodes[0].children[0].innerHTML;
				if (exibido === 0) {
					M.toast({
						html: resp,
						classes: "red darken-2"
					});
					exibido += 1;
				}
			}
		}
	};
	xhttp.send();

	// limpa inputs
	limpaInputs();
	//atualiza a tabela
        setTimeout(consulta, 10);
}

function recarrega() {
	location.reload();
}

function limpaInputs() {
	document.getElementById('AdicionaAnoEtapa').value = "";
	document.getElementById('AdicionaValorEtapa').value = "";
	document.getElementById('editaAno').value = "";
	document.getElementById('editaValor').value = "";
}
