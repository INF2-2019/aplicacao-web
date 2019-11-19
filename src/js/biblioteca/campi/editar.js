M.AutoInit();
var btConfirmaEditar;
let idParaEditar;
let vetEditar;
let divS = document.querySelector("#divS");

function listenerEdit(e) {
  idParaEditar = (e.currentTarget.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML);
  let inpID = document.querySelector("#idEdit");
  let inpC = document.querySelector("#cidade1");
  let inpN = document.querySelector("#nome1");
  inpN.value = e.currentTarget.parentNode.previousSibling.previousSibling.previousSibling.innerHTML
  inpC.value = e.currentTarget.parentNode.previousSibling.previousSibling.innerHTML
  let val = e.currentTarget.parentNode.previousSibling.innerHTML;
  $('#uf1').find('option:contains('+val+')').prop('selected',true);
  $('#uf1').formSelect();
   inpID.value=idParaEditar;
   M.updateTextFields();
}

function prepareEditar() {

btConfirmaEditar = document.getElementById("btConfirmaEditar");
btConfirmaEditar.addEventListener("click", editar);


  vetEditar = document.querySelectorAll(".botaoEditar");

  for (var i = 0; i < vetEditar.length; i++) {
    vetEditar[i].addEventListener("click", listenerEdit);
  }
}


function editar() {

  let nome = document.querySelector("#nome1").value;
  let cidade = document.querySelector("#cidade1").value;
  let uf = document.querySelector("#uf1").value;
  let url = "http://localhost:8080/app/biblioteca/campi/alterar?id="+idParaEditar
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