var btConfirmaEditar;
let idParaEditar;
let vetEditar;

function listenerEdit(e) {
  var foto = document.querySelector("#foto3");
  idParaEditar = (e.currentTarget.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
  let url = "http://localhost:8080/app/diario/alunos/consultar?id="+idParaEditar;
  fetch(url, { credentials: 'include' })
  .then(resposta => {
    return resposta.text();
  })
  .then(text => {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text, "text/xml");
    preencherEdit(xmlDoc, foto);
    let inpCpf = document.querySelector("#cpf1");
    inpCpf.value=idParaEditar;
  });
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
  let foto = document.querySelector("#fototext3").value;
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

function preencherEdit(doc, foto) {
  let camposInfo = document.querySelectorAll(".recomendado-editar");
  let lineItems = doc.getElementsByTagName("aluno")[0];
  for (let i = 1; i < camposInfo.length; i++) {
    if (i ==3) {
      if (lineItems.childNodes[i].childNodes[0].nodeValue == "M")
        camposInfo[i].value= "Masculino";
      else
        camposInfo[i].value= "Feminino";
    } else if (i == 4) {
      let a = lineItems.childNodes[i].childNodes[0].nodeValue;
      var resultDate = stringToDate(a);
      resultDate.setDate( resultDate.getDate()+1 );
      var result = dateToString( resultDate );
      camposInfo[i].value = formataStringData(result);
    } else if (lineItems.childNodes[i].childNodes[0] != undefined)
      camposInfo[i].value = (lineItems.childNodes[i].childNodes[0].nodeValue);
  }
  foto.src=camposInfo[(camposInfo.length)-1].value;
  $("#foto3").on('error', function() {fotoBasica(foto) });
  }