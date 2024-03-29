M.AutoInit();
let deptosConsultados = 0;

async function criaTabela(elementos) {
	//console.log(elementos);
	let containerTabela = document.querySelector("#disciplinas");
	const tabela = document.createElement("table")
	elementos = elementos.childNodes[0].children
	tabela.classList.add("highlight")

	for (let i = 0; i < elementos.length; i++) {
		const linha = document.createElement("tr");
		for (let j = 0; j < elementos[i].children.length; j++) {
			const elemento = document.createElement("td")
			elemento.classList.add(elementos[i].children[j].nodeName)

			if (j == 1) {
				let nomeDepartamento = nomeTurma(elementos[i].children[j].innerHTML)
				await nomeDepartamento.then(res => {
					elemento.innerHTML = res
				})
			} else if (j == 2) {
				let nomeDepartamento = nomeTurma2(elementos[i].children[j].innerHTML)
				await nomeDepartamento.then(res => {
					elemento.innerHTML = res
					deptosConsultados++
					// se for o último a carregar, recarrega o conteudo da tabela com os nomes dos deptos.
					if (deptosConsultados == elementos.length)
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
	containerTabela.innerHTML = tabela.innerHTML;
}

function criarBotaoEditar() {
	const edit = document.createElement("a")
	edit.setAttribute("href", "#modal-atualizar")
	edit.classList = "btn-small secondary editar modal-trigger"
	edit.style = "margin-right: 20px"

	/*const iconEdit = document.createElement("i")
	iconEdit.classList = "material-icons small"
	iconEdit.innerHTML = "edit"

	edit.appendChild(iconEdit)*/
	edit.appendChild(document.createTextNode("EDITAR"))
	return edit
}

function criarBotaoDeletar() {
	const deletar = document.createElement("a")
	deletar.setAttribute("href", "#modal-deletar")
	deletar.classList = "btn-small utils erro-2 deletar modal-trigger"
	deletar.appendChild(document.createTextNode("DELETAR"))
	return deletar
}

function limpaInputs() {
	document.querySelector("#turma-inserir").value = '';
	document.querySelector("#nome-inserir").value = '';
	document.querySelector("#turma-inserir2").value = '';
	M.updateTextFields();
	$("#turma-inserir").formSelect();
	$("#turma-inserir2").formSelect();
}

function preencherInput() {
	postFetch('http://localhost:8080/app/diario/alunos/listar',{},"GET")
		.then(xml => {
			for (departamento of xml.getElementsByTagName('aluno')) {
				const id = departamento.getElementsByTagName("id")[0].innerHTML
				const nome = departamento.getElementsByTagName("nome")[0].innerHTML

				// cria novo option no select para inserir
				const inserirOption = $("<option>").attr("value", id).text(nome)
				$("#turma-inserir").append(inserirOption)
				$("#turma-inserir").formSelect()
				// cira novo option no select para atualizar
				const atualizarOption = $("<option>").attr("value", id).text(nome)
				$("#turma-atualizar").append(atualizarOption)
				$("#turma-atualizar").formSelect()
			}
		})
	postFetch('http://localhost:8080/app/diario/disciplinas/consultar',{},"GET")
		.then(xml => {
			for (departamento of xml.getElementsByTagName('disciplina')) {
				const id = departamento.getElementsByTagName("id")[0].innerHTML
				const nome = departamento.getElementsByTagName("nome")[0].innerHTML

				// cria novo option no select para inserir
				const inserirOption = $("<option>").attr("value", id).text(nome)
				$("#turma-inserir2").append(inserirOption)
				$("#turma-inserir2").formSelect()
				// cira novo option no select para atualizar
				const atualizarOption = $("<option>").attr("value", id).text(nome)
				$("#turma-atualizar2").append(atualizarOption)
				$("#turma-atualizar2").formSelect()
			}
		})
}

function pesquisarDisciplinas() {
	const input = document.querySelector("#search");
	const filter = input.value.toUpperCase();
	const table = document.querySelector("#tabela-disciplinas");
	const tr = table.getElementsByTagName("tr");

	for (let i = 1; i < tr.length; i++) {
		// pega a coluna "Nome" da tabela
		let td = tr[i].children[0];
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
