const tbody = document.querySelector("tbody");

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
		acoes.appendChild(botaoEditar());
		acoes.appendChild(botaoExcluir());
		tr.appendChild(acoes);

		tbody.appendChild(tr);
	}
}

function botaoEditar() {
	const botao = document.createElement("a");
	botao.setAttribute("href", "#modal-atualizar");
	botao.classList = "btn-small secondary editar modal-trigger";
	botao.style = "margin-right: 20px";
	botao.innerHTML = "EDITAR";
	return botao;
}

function botaoExcluir() {
	const botao = document.createElement("a");
	botao.setAttribute("href", "#modal-deletar");
	botao.classList = "btn-small utils erro-2 deletar modal-trigger";
	botao.style = "margin-right: 20px";
	botao.innerHTML = "EXCLUIR";
	return botao;
}

function filtrarTabela(){
	
	console.log("AAAAAA")

  	input = document.getElementById("search");
  	filtro = input.value.toUpperCase();
  	tabela = document.getElementById("tabela-departamentos");
  	tr = tabela.getElementsByTagName("tr");
	
  	for (i = 0; i < tr.length; i++) {
		id = tr[i].getElementsByTagName("td")[0];
		nome = tr[i].getElementsByTagName("td")[1];
		campus = tr[i].getElementsByTagName("td")[2];
    	if (id) {
		  idConteudo = id.textContent || id.innerText;
		  nomeConteudo = nome.textContent || nome.innerText;
	      campusConteudo = campus.textContent || campus.innerText;

    	  if (idConteudo.toUpperCase().indexOf(filtro) > -1 || nomeConteudo.toUpperCase().indexOf(filtro) > -1 || campusConteudo.toUpperCase().indexOf(filtro) > -1) {
	        tr[i].style.display = "";
    	  } else {
        	tr[i].style.display = "none";
	      }
    	}
	}
	
}