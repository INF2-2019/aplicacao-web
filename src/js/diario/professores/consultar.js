const method = "GET";

atualizarTabela();

function atualizarTabela() {
	var xhttp = new XMLHttpRequest();

	url = "http://localhost:8080/app/diario/professores/consultar";

	xhttp.open(method, url, true);
	xhttp.onreadystatechange = function() {
		// Parte de mostrar os resultados passando de xml para tabela html
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var xml = (new DOMParser()).parseFromString(this.responseText, "text/xml");
			var elementos = xml.childNodes[0].children;
			if(elementos.length == 1) {
				document.getElementById("saida").innerHTML = "Ocorreu um erro: " + 
						elementos[0].children[1].innerHTML;
			}
			else {
				elementos = elementos[1].children;
				var tabela = "<table><thead><tr>";
				for(let cont = 0; cont < elementos[0].children.length; cont++) {
					let el = elementos[0].children[cont];
					tabela += "<th>" + el.nodeName + "</th>";
				}
				tabela += "</tr></thead><tbody>";
				for(let cont = 0; cont < elementos.length; cont++) {
					var elPai = elementos[cont].children;
					tabela += "<tr>";
					for(let c = 0; c < elPai.length; c++) {
						var elFilho = elPai[c];
						tabela += "<td>" + elFilho.textContent + "</td>";
					}
					tabela += "</tr>";
				}
				tabela += "</tbody>";
				document.getElementById("saida").innerHTML = tabela + "</table>";
			}
		}
	};
	xhttp.send();
}