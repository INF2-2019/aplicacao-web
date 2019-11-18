M.AutoInit();
var tabela = document.querySelector("#tabela");

function fazerTabela(doc){

    tabela.innerHTML="<tr><th>ID</th><th>Nome</th><th>Cidade</th><th>UF</th><th>Ações</th></tr>";


    var lineItems = doc.getElementsByTagName("campi");



    for (i = 0; i < (lineItems.length); i++) {


        var editar = document.createElement("a");
        editar.classList.add("btn");
        editar.classList.add("waves-effect");
        editar.classList.add("waves-light");
        editar.classList.add("btnAjuste-manutencao-campi");
        editar.classList.add("secondary");
        editar.classList.add("modal-trigger");
        editar.classList.add("botaoEditar");
        editar.href = "#modal-editar";
        editar.innerHTML = "EDITAR";
        var deletar = document.createElement("a");
        deletar.classList.add("btn");
        deletar.classList.add("waves-effect");
        deletar.classList.add("waves-light");
        deletar.classList.add("btnAjuste-manutencao-campi");
        deletar.classList.add("utils");
        deletar.classList.add("erro-2");
        deletar.classList.add("modal-trigger");
        deletar.classList.add("botaoDeletar");
        deletar.href = "#modal-deletar-manutencao-campi";
        deletar.innerHTML = "DELETAR";

        var coluna = document.createElement("tr");
        coluna.classList.add("row");
        var conteudo1 = document.createElement("td");
        conteudo1.innerHTML = lineItems[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
        var conteudo2 = document.createElement("td");
        conteudo2.innerHTML = lineItems[i].getElementsByTagName("nome")[0].childNodes[0].nodeValue;
        var conteudo3 = document.createElement("td");
        conteudo3.innerHTML = lineItems[i].getElementsByTagName("cidade")[0].childNodes[0].nodeValue;
        var conteudo4 = document.createElement("td");
      
        conteudo4.innerHTML = lineItems[i].getElementsByTagName("uf")[0].childNodes[0].nodeValue;

        var botoes = document.createElement("td");
        botoes.appendChild(editar);
        botoes.appendChild(deletar);

        coluna.appendChild(conteudo1);
        coluna.appendChild(conteudo2);
        coluna.appendChild(conteudo3);
        coluna.appendChild(conteudo4);

        coluna.appendChild(botoes);

        tabela.appendChild(coluna);


    }
    atribuirClasses();
    setTimeout(function(){ prepareDeletar(); }, 50);
    setTimeout(function(){ prepareEditar(); }, 50);
}

listar();

function listar() {
  let url = "http://localhost:8080/app/biblioteca/campi/listar";

  fetch(url, { credentials: 'include' })
    .then(resposta => {
      return resposta.text();
    })
    .then(text => {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(text, "text/xml");
      fazerTabela(xmlDoc);
    });
  }