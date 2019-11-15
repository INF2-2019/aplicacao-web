const tbody = document.querySelector("tbody");
let idAtual;
function atualizaTabela() {
	tbody.innerHTML = "";
	for(let depto of deptos) {
		const tr = document.createElement("tr");

		const id = document.createElement("td");
		id.innerHTML = depto.id;
		tr.appendChild(id);

		const nome = document.createElement("td");
		nome.innerHTML = depto.nome;
		tr.appendChild(nome);

		const campus = document.createElement("td");
		campus.innerHTML = depto.campus;
		tr.appendChild(campus);

		const acoes = document.createElement("td");
		acoes.appendChild(botaoEditar(depto.id));
		acoes.appendChild(botaoExcluir(depto.id));
		tr.appendChild(acoes);

		tbody.appendChild(tr);
	}
}

function botaoEditar(id) {
	const botao = document.createElement("a");
	botao.setAttribute("href", "#modal-atualizar");
	botao.classList = "btn-small secondary editar modal-trigger";
	botao.style = "margin-right: 20px";
	botao.setAttribute("onclick", "setId("+id+")")
	botao.innerHTML = "EDITAR";
	return botao;
}

function botaoExcluir(id) {
	const botao = document.createElement("a");
	botao.setAttribute("href", "#modal-deletar");
	botao.classList = "btn-small utils erro-2 deletar modal-trigger";
	botao.style = "margin-right: 20px";
	botao.setAttribute("onclick", "setId("+id+")");
	botao.innerHTML = "EXCLUIR";
	return botao;
}

function setId(id) {
	idAtual = id;
}
