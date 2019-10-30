var modal = document.getElementById("modal-cadastro");
var btn = document.getElementById("botaoAdicionar");

function inserir() {
  let id = document.querySelector("#cpf").value;
  let nome = document.querySelector("#nome").value;
  let email = document.querySelector("#email").value;
  let senha = document.querySelector("#senha").value;
  let sexo = document.querySelector("#sexo").value;
  let data = document.querySelector("#data").value;
  let logradouro = document.querySelector("#logradouro").value;
  let numero = document.querySelector("#number").value;
  let complemento = document.querySelector("#comple").value;
  let bairro = document.querySelector("#bairro").value;
  let cidade = document.querySelector("#cidade").value;
  let cep = document.querySelector("#cep").value;
  let uf = document.querySelector("#uf").value;
  //let foto = document.querySelector("#foto").value;
  let foto = "exemplodefoto";
  data = reformatDate(data.toString());
  let url = "http://localhost:8080/app/diario/alunos/inserir?id="+id
  +"&nome="+nome
  +"&email="+email
  +"&senha="+senha
  +"&sexo="+sexo
  +"&nascimento="+data
  +"&logradouro="+logradouro+
  "&numero="+numero+
  "&complemento="+complemento+
  "&bairro="+bairro+
  "&cidade="+cidade+
  "&cep="+cep+
  "&uf="+uf+
  "&foto="+foto+"";
  fetch(url)
    .then(resposta => {
      return resposta.text();
    })
    .then(text => {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(text, "text/xml");
    });
    setTimeout(function(){ listar(); }, 200);
    setTimeout(function(){ status(xmlDoc); }, 200);
}
