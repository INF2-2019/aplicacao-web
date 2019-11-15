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
		campus.innerHTML = depto.nomeCampi;
		tr.appendChild(campus);

		const cidade = document.createElement("td");
		cidade.innerHTML = depto.cidade;
		tr.appendChild(cidade);
		
		const uf = document.createElement("td");
		uf.innerHTML = depto.uf;
		tr.appendChild(uf);

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

function filtrarTabela(){

  	input = document.getElementById("search");
  	filtro = input.value.toUpperCase();
  	tabela = document.getElementById("tabela-departamentos");
  	tr = tabela.getElementsByTagName("tr");
	
  	for (i = 0; i < tr.length; i++) {
		id = tr[i].getElementsByTagName("td")[0];
		nome = tr[i].getElementsByTagName("td")[1];
		campus = tr[i].getElementsByTagName("td")[2];
		cidade = tr[i].getElementsByTagName("td")[3];
		uf = tr[i].getElementsByTagName("td")[4];
    	if (id) {
		  idConteudo = id.textContent || id.innerText;
		  nomeConteudo = nome.textContent || nome.innerText;
	      campusConteudo = campus.textContent || campus.innerText;
	      cidadeConteudo = cidade.textContent || cidade.innerText;
	      ufConteudo = uf.textContent || uf.innerText;

    	  if (idConteudo.toUpperCase().indexOf(filtro) > -1 || nomeConteudo.toUpperCase().indexOf(filtro) > -1 || campusConteudo.toUpperCase().indexOf(filtro) > -1 || cidadeConteudo.toUpperCase().indexOf(filtro) > -1 || ufConteudo.toUpperCase().indexOf(filtro) > -1) {
	        tr[i].style.display = "";
    	  } else {
        	tr[i].style.display = "none";
	      }
    	}
	}
	
}

