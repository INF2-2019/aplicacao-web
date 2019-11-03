var btConfirmaEditar;
let idParaEditar;
let vetEditar;

function listenerEdit(e) {
  idParaEditar = (e.currentTarget.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
  let inpCpf = document.querySelector("#cpf1");
  inpCpf.value=idParaEditar;
  preencherEmail(idParaEditar);
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
  let email = document.querySelector("#email1").value;
  let senha = document.querySelector("#senha1").value;
  let sexo = document.querySelector("#sexo1").value;
  let data = document.querySelector("#data1").value;
  let logradouro = document.querySelector("#logradouro1").value;
  let numero = document.querySelector("#number1").value;
  let complemento = document.querySelector("#comple1").value;
  let bairro = document.querySelector("#bairro1").value;
  let cidade = document.querySelector("#cidade1").value;
  let cep = document.querySelector("#cep1").value;
  let uf = document.querySelector("#uf1").value;
  //let foto = document.querySelector("#foto").value;
  let foto = "exemplodefoto";
  data = reformatDate(data.toString());
  let dataF;
  if (data == "undefined/undefined/")
    dataF = "";
  else dataF = data;
  let url = "http://localhost:8080/app/diario/alunos/alterar?id="+idParaEditar
  +"&nome="+nome
  +"&email="+email
  +"&senha="+senha
  +"&sexo="+sexo
  +"&nascimento="+dataF
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
      responseStatus = resposta.status;
      return resposta.text();
    })
    .then(text => {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(text, "text/xml");

    });
    setTimeout(function(){ listar(); }, 200);
    setTimeout(function(){ adicionaResult(responseStatus, xmlDoc); }, 200);
}

function preencherEmail(id) {
  let email = document.querySelector("#email1");

  let url = "http://localhost:8080/app/diario/alunos/consultar?id="+id;
  fetch(url)
    .then(resposta => {
      return resposta.text();
    })
    .then(text => {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(text, "text/xml");
    });

    setTimeout(function(){
      let lineItems = xmlDoc.getElementsByTagName("aluno")[0];
      email.value = lineItems.childNodes[2].childNodes[0].nodeValue;
    }, 100);

  }
