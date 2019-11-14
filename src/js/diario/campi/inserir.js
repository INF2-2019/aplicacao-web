var modal = document.getElementById("modal-cadastro");
var btn = document.getElementById("botaoAdicionar");

function inserir() {
  let inpNome = document.querySelector("#nome");
  let inpCidade = document.querySelector("#cidade");
  let inpUf = document.querySelector("#uf");

  let nome = document.querySelector("#nome").value;
  let cidade = document.querySelector("#cidade").value;
  let uf = document.querySelector("#uf").value;

  let url = "http://localhost:8080/app/diario/campi/inserir?nome="+nome
  +"&cidade="+cidade
  +"&uf="+uf;
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
