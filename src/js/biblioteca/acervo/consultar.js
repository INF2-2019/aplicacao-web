const metodo = "GET";
const endereco = "http://localhost:8080/app/";

atualizarTabela();

function atualizarTabela() {
	var xhttp = new XMLHttpRequest();

	url = endereco + "biblioteca/acervo/consultar";

	xhttp.open(metodo, url, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var xml = (new DOMParser()).parseFromString(this.responseText, "application/xml");
			var raiz = xml.firstElementChild;
			if(raiz.nodeName == "erro") {
				console.error(raiz.firstElementChild.textContent);
				return;
			}

			var elementos = raiz.children;
			let tabelaCorpo = document.getElementsByTagName("tbody")[0];
			tabelaCorpo.innerHTML = "";
			for(let i = 0; i < elementos.length; i++) {
				var dados = elementos[i].children;
				linha = document.createElement("tr");
				linha.setAttribute('id', dados[0].textContent);
				linha.innerHTML += "<td>" + dados[0].textContent + "</td>";
				linha.innerHTML += "<td>" + dados[2].textContent + "</td>";
				linha.innerHTML += "<td>" + dados[3].textContent + "</td>";
				linha.innerHTML += "<td><a href=\"#modalInfo\" class=\"btn utils info editar modal-trigger\">INFO</a></td>";
				linha.innerHTML += "<td><a href=\"#modalAltera\" class=\"btn secondary editar modal-trigger\" >Editar</a></td>";
				linha.innerHTML += "<td><a href=\"#modalDeleta\" class=\"btn utils erro editar modal-trigger\" >Deletar</a></td>";
				tabelaCorpo.appendChild(linha);
			}

			document.getElementById('saida').innerHTML = "";
		}
	};
	xhttp.send();
}
