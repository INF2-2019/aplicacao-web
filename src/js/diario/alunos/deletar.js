var btDeletar;
let idParaDeletar;
let vetDeletar;

function listenerDelet(e) {
  idParaDeletar = (e.currentTarget.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
}

function prepareDeletar() {

btDeletar = document.getElementById("delet");
btDeletar.addEventListener("click", deletar);


  vetDeletar = document.querySelectorAll(".botaoDeletar");

  for (var i = 0; i < vetDeletar.length; i++) {
    vetDeletar[i].addEventListener("click", listenerDelet, true);
  }
}


function deletar() {


let url = "http://localhost:8080/app/diario/alunos/deletar?id="+idParaDeletar;
fetch(url, { credentials: 'include' })
  .then(resposta => {
    responseStatus = resposta.status;
    return resposta.text();
  })
  .then(text => {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text, "text/xml");
    listar();
    adicionaResult(responseStatus, xmlDoc);
  });
}
