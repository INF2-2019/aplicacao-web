class View {

	static deptos(doc) {
		const deptos = [];
		const docDeptos = doc.getElementsByTagName('departamento');
		for(let docDepto of docDeptos) {
			const depto = {
				id:  parseInt(docDepto.children[0].textContent),
				idCampi: parseInt(docDepto.children[1].textContent),
				nome: docDepto.children[2].textContent
			};
			deptos.push(depto);
		}
		return deptos;
	}

	static linhaTabela(depto) {
		const tr = document.createElement("tr");
		tr.appendChild(View.celulaTexto(depto.nome));
		tr.appendChild(View.celulaTexto(depto.idCampi));
		tr.appendChild(View.celulaAcoes(depto.id));
		return tr;
	}

	static celulaTexto(txt) {
		const td = document.createElement("td");
		const txtNode = document.createTextNode(txt);
		td.appendChild(txtNode);
		return td;
	}

	static celulaAcoes(id) {
		const td = document.createElement("td");
		td.classList.add("right");
		td.appendChild(View.botaoEditar(id));
		td.appendChild(View.botaoExcluir(id));
		return td;
	}

	static botaoEditar(id) {
		const button = document.createElement("button");
		button.classList.add("btn");
		button.classList.add("modal-trigger");
		button.onclick = function() {
			idEditar = id;
		}
		button.setAttribute("data-target", "modal-editar");
		button.style.margin = "0 5px";
		button.innerText = "EDITAR";
		return button;
	}

	static botaoExcluir(id) {
		const button = document.createElement("button");
		button.classList.add("btn");
		button.onclick = function() {
			Controller.remove(id);
		}
		button.style.backgroundColor = "#E53935";
		button.style.margin = "0 5px";
		button.innerText = "EXCLUIR";
		return button;
	}

	static sucesso(doc) {
		const toast = document.querySelector("#toast");
		toast.style.backgroundColor = "#00E676";
		toast.innerHTML = doc.children[0].textContent;
	}

	static erro(doc) {
		const toast = document.querySelector("#toast");
		toast.style.backgroundColor = "#D32F2F";
		toast.innerHTML = doc.children[0].textContent;
	}

}
