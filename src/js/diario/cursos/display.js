M.AutoInit();

function criaTabela(elementos) {
	elementos = elementos.childNodes[0].children;
	const tabela = document.createElement("table")
	tabela.classList.add("highlight")

	for (let i = 0; i < elementos.length; i++) {
		const linha = document.createElement("tr");
		for (let j = 0; j < elementos[i].children.length; j++) {
			const elemento = document.createElement("td")
			elemento.classList.add(elementos[i].children[j].nodeName)

			if (j == 1) {
				let nomeDepartamento = nomeDepto(elementos[i].children[j].innerHTML)
				nomeDepartamento.then(res => {
					elemento.innerHTML = res
					if (i == elementos.length - 1)
						containerTabela.innerHTML = tabela.innerHTML;
				})
			} else {
				elemento.innerHTML = elementos[i].children[j].innerHTML
			}

			linha.appendChild(elemento)
		}
		const colunaAcoes = document.createElement("td")

		const botaoEditar = criarBotaoEditar()
		const botaoDeletar = criarBotaoDeletar()

		colunaAcoes.appendChild(botaoEditar)
		colunaAcoes.appendChild(botaoDeletar)

		linha.appendChild(colunaAcoes)

		tabela.appendChild(linha)
	}

	const containerTabela = document.querySelector("#cursos");
	containerTabela.innerHTML = tabela.innerHTML;
}

function criarBotaoEditar() {
	const edit = document.createElement("a")
	edit.setAttribute("href", "#modal-atualizar")
	edit.classList = "btn-small utils alerta-2 editar modal-trigger"

	const iconEdit = document.createElement("i")
	iconEdit.classList = "material-icons small"
	iconEdit.innerHTML = "edit"

	edit.appendChild(iconEdit)
	return edit
}

function criarBotaoDeletar() {
	const deletar = document.createElement("a")
	deletar.setAttribute("href", "#modal-atualizar")
	deletar.classList = "btn-small utils erro deletar modal-trigger"

	const iconDel = document.createElement("i")
	iconDel.classList = "material-icons small"
	iconDel.innerHTML = "delete_forever"

	deletar.appendChild(iconDel)
	return deletar
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
	const input = document.querySelector("#search");
	const filter = input.value.toUpperCase();
	const table = document.querySelector("#tabela-cursos");
	const tr = table.getElementsByTagName("tr");

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
