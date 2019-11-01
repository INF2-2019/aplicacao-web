M.AutoInit();

function criaTabela(elementos) {
	elementos = elementos.childNodes[0].children;
	let tabela = `<table class="highlight">`

	for (let i = 0; i < elementos.length; i++) {
		let linha = `<tr>`
		for (let j = 0; j < elementos[i].children.length; j++) {
			let elemento = "";

			elemento = `<td class=${elementos[i].children[j].nodeName}>`
			elemento += elementos[i].children[j].innerHTML
			elemento += `</td>`

			linha += elemento

		}
		linha +=
			`<td>` +
			`<a class="btn-small utils alerta-2 editar modal-trigger" href="#modal-atualizar" style="margin: 5pt"><i class="material-icons small">edit</i></a>` +
			`<a class="btn-small utils erro deletar modal-trigger" href="#modal-confirmar"><i class="material-icons small">delete_forever</i></a>` +
			`</td>`;
		tabela += linha
	}


	tabela += "</table>"
	let containerTabela = document.querySelector("#cursos");
	containerTabela.innerHTML = tabela;
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
