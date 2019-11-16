var btConfirmaEditar;
let idParaEditar;
let vetEditar;

function listenerEdit(e) {
  idParaEditar = (e.currentTarget.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML);
  let inpID = document.querySelector("#idEdit");
  inpID.value=idParaEditar;
}

function prepareEditar() {

btConfirmaEditar = document.getElementById("btConfirmaEditar");
btConfirmaEditar.addEventListener("click", editar);


  vetEditar = document.querySelectorAll(".botaoEditar");

  for (var i = 0; i < vetEditar.length; i++) {
    vetEditar[i].addEventListener("click", listenerEdit, true);
  }
}


function editar() {

  let nome = document.querySelector("#nome1").value;
  let cidade = document.querySelector("#cidade1").value;
  let uf = document.querySelector("#uf1").value;
  let dataF;
  console.log(nome);
  console.log(cidade);
  console.log(uf);
  let url = "http://localhost:8080/app/diario/campi/alterar?id="+idParaEditar
  +"&nome="+nome+
  "&cidade="+cidade+
  "&uf="+uf
  fetch(url, { credentials: 'include' })
    .then(resposta => {
      responseStatus = resposta.status;
      return resposta.text();
    })
    .then(text => {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(text, "text/xml");
      adicionaResult(responseStatus, xmlDoc);
      listar();
    });

}
