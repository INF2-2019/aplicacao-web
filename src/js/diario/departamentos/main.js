/*const servidor = "http://localhost:8080/app";
let deptos = [];

function consultaDepartamentos() {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(xhr.response, "application/xml");
			jsonDeptos(doc);
			criaTabela();
		}
	};
	xhr.open("GET", servidor  + "/diario/departamentos/consulta", true);
	xhr.send();
}

function info(id) {
	
}

function editar(id, nome, idCampi) {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(xhr.response, "application/xml");
			consultaDepartamentos();
		}
	};
	xhr.open("POST", servidor  + "/diario/departamentos/editar?id=" + id + "&id-campi=" + idCampi + "&nome=" + nome, true);
	xhr.send();
}

function deletar(id) {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(xhr.response, "application/xml");
			consultaDepartamentos();
		}
	};
	xhr.open("POST", servidor  + "/diario/departamentos/remove?id=" + id, true);
	xhr.send();
}

function modalAdicionar() {

}

function modalEditar(id) {

}

function jsonDeptos(doc) {
	deptos = [];
	const docDeptos = doc.getElementsByTagName('departamento');
	for(let docDepto of docDeptos) {
		const depto = {
			id:  docDepto.children[0].textContent,
			idCampi: docDepto.children[1].textContent,
			nome: docDepto.children[2].textContent
		};
		deptos.push(depto);
	}
}

function criaTabela() {
	let tbody = document.querySelector('tbody');
	tbody.innerHTML = "";
	for(let depto of deptos) {
		let tr = document.createElement("tr");
		tr.appendChild(celula(depto.nome));
		tr.appendChild(celula(depto.idCampi));
		tr.appendChild(celulaAcoes(depto.id));
		tbody.appendChild(tr);
	}
}

function celula(txt) {
	const td = document.createElement("td");
	const txtNode = document.createTextNode(txt);
	td.appendChild(txtNode);
	return td;
}

function celulaAcoes(id) {
	const td = document.createElement("td");
	td.appendChild(botaoAcao("info", "info", info, id));
	td.appendChild(botaoAcao("editar", "secondary-alt", modalEditar, id));
	td.appendChild(botaoAcao("deletar", "error", deletar, id));
	return td;
}

function botaoAcao(txt, color, func, id) {
	let botao = document.createElement("button");
	botao.classList.add("btn");
	botao.classList.add(color);
	botao.onclick = () => func(id);
	botao.innerText = txt.toUpperCase();
	return botao;
}

consultaDepartamentos();
*/

function jsonDeptos(doc) {
	const deptos = [];
	const docDeptos = doc.getElementsByTagName('departamento');
	for(let docDepto of docDeptos) {
		const depto = {
			id:  docDepto.children[0].textContent,
			idCampi: docDepto.children[1].textContent,
			nome: docDepto.children[2].textContent
		};
		deptos.push(depto);
	}
	return deptos;
}

Controller.consulta();