const method = "GET";
const endereco = "http://localhost:8080/app/";

atualizarTabela();

function atualizarTabela() {
	var xhttp = new XMLHttpRequest();

	url = endereco + "diario/professores/consultar";

	xhttp.open(method, url, true);
	xhttp.onreadystatechange = function() {
		// Mostrar os resultados passando de xml para tabela html
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var xml = (new DOMParser()).parseFromString(this.responseText, "application/xml");
			var raiz = xml.firstElementChild;
			if(raiz.nodeName == "erro") {
				document.getElementById("saida").innerHTML = raiz.firstElementChild.textContent;
				return;
			}

			var elementos = raiz.children;
			let tabelaCorpo = document.getElementsByTagName("tbody")[0];
			tabelaCorpo.innerHTML = "";
			for(let i = 0; i < elementos.length; i++) {
				var dados = elementos[i].children;
				linha = document.createElement("tr");
				linha.innerHTML += "<td>" + dados[2].textContent + "</td>";
				linha.innerHTML += "<td>" + dados[1].textContent + "</td>";
				linha.innerHTML += "<td>" + dados[0].textContent + "</td>";
				linha.innerHTML += "<td><a href=\"#modalInfo\" class=\"btn utils info editar modal-trigger\">INFO</a></td>";
				linha.innerHTML += "<td><a href=\"#modalAltera\" class=\"btn secondary editar modal-trigger\" >Editar</a></td>";
				linha.innerHTML += "<td><a href=\"#modalDeleta\" class=\"btn utils erro editar modal-trigger\" >Deletar</a></td>";
				tabelaCorpo.appendChild(linha);
			}
		}
	};
	xhttp.send();
}
