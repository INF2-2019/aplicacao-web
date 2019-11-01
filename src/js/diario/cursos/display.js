M.AutoInit();

function criaTabela(elementos) {
	elementos = elementos.childNodes[0].children;
	let tabela = document.createElement("table")
	tabela.classList.add("highlight")

	for (let i = 0; i < elementos.length; i++) {
		let linha = document.createElement("tr");
		for (let j = 0; j < elementos[i].children.length; j++) {
			let elemento = document.createElement("td")

			elemento.classList.add(elementos[i].children[j].nodeName)
			elemento.innerHTML = elementos[i].children[j].innerHTML

			linha.appendChild(elemento)
		}
		let colunaAcoes = document.createElement("td")

		let edit = document.createElement("a")
		edit.setAttribute("href", "#modal-atualizar")
		edit.classList = "btn-small utils alerta-2 editar modal-trigger"

		let iconEdit = document.createElement("i")
		iconEdit.classList = "material-icons small"
		iconEdit.innerHTML = "edit"

		edit.appendChild(iconEdit)
		colunaAcoes.appendChild(edit)

		let deletar = document.createElement("a")
		deletar.setAttribute("href", "#modal-atualizar")
		deletar.classList = "btn-small utils erro deletar modal-trigger"

		let iconDel = document.createElement("i")
		iconDel.classList = "material-icons small"
		iconDel.innerHTML = "delete_forever"

		deletar.appendChild(iconDel)
		colunaAcoes.appendChild(deletar)
		linha.appendChild(colunaAcoes)

		tabela.appendChild(linha)
	}

	let containerTabela = document.querySelector("#cursos");
	containerTabela.innerHTML = tabela.innerHTML;
}

function limpaInputs(inputType) {
	if (inputType == 'inserir') {
		document.querySelector("#departamento-inserir").value = '';
		document.querySelector("#nome-inserir").value = '';
		document.querySelector("#horas-inserir").value = '';
		document.querySelector("#modalidade-inserir").value = '';
	}
	else if (inputType == 'atualizar') {
		document.querySelector("#departamento-atualizar").value = '';
		document.querySelector("#nome-atualizar").value = '';
		document.querySelector("#horas-atualizar").value = '';
		document.querySelector("#modalidade-atualizar").value = '';
	}

	M.updateTextFields();
}

function pesquisarCursos() {
	let input = document.querySelector("#search");
	let filter = input.value.toUpperCase();
	let table = document.querySelector("#tabela-cursos");
	let tr = table.getElementsByTagName("tr");

	for (let i = 1; i < tr.length; i++) {
		// pega a coluna "Nome" da tabela
		let td = tr[i].children[2];
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
