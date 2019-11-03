
let id;
let vetInfo;

function listenerInfo(e) {
  id = (e.currentTarget.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
  consulta();
}

function prepareInfo() {

  vetInfo = document.querySelectorAll(".botaoInfo");

  for (var i = 0; i < vetInfo.length; i++) {
    vetInfo[i].addEventListener("click", listenerInfo);
  }
}


function consulta() {


let url = "http://localhost:8080/app/diario/alunos/consultar?id="+id;
fetch(url)
  .then(resposta => {
    return resposta.text();
  })
  .then(text => {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text, "text/xml");
  });
  setTimeout(function(){ preencher(xmlDoc); }, 100);
}

function preencher(doc) {
  let camposInfo = document.querySelectorAll(".info");
  let lineItems = doc.getElementsByTagName("aluno")[0];
  for (let i = 0; i < camposInfo.length; i++) {
    if (i ==3) {
      if (lineItems.childNodes[i].childNodes[0].nodeValue == "M")
        camposInfo[i].value= "Masculino";
      else
        camposInfo[i].value= "Feminino";
    } else if (i == 4) {
      camposInfo[i].value = formataStringData(lineItems.childNodes[i].childNodes[0].nodeValue);
    } else if (lineItems.childNodes[i].childNodes[0] != undefined)
      camposInfo[i].value = (lineItems.childNodes[i].childNodes[0].nodeValue);
  }
}


function formataStringData(data) {
  var dia  = data.split("/")[0];
  var mes  = data.split("/")[1];
  var ano  = data.split("/")[2];

  return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}
