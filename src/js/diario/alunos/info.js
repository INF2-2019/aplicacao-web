let foto = document.querySelector("#foto2");
let id;
let vetInfo;

function listenerInfo(e) {
  id = (e.currentTarget.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
  consulta(id, foto);
}

function prepareInfo() {

  vetInfo = document.querySelectorAll(".botaoInfo");

  for (var i = 0; i < vetInfo.length; i++) {
    vetInfo[i].addEventListener("click", listenerInfo);
  }
}


function consulta(id, foto) {

let url = "http://localhost:8080/app/diario/alunos/consultar?id="+id;
fetch(url, { credentials: 'include' })
  .then(resposta => {
    return resposta.text();
  })
  .then(text => {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text, "text/xml");
    preencher(xmlDoc, foto);
  });
}

function preencher(doc, foto) {

  let camposInfo = document.querySelectorAll(".info");
  let lineItems = doc.getElementsByTagName("aluno")[0];
  for (let i = 0; i < camposInfo.length; i++) {
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
}


function formataStringData(data) {
  var dia  = data.split("/")[0];
  var mes  = data.split("/")[1];
  var ano  = data.split("/")[2];

  return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}


function stringToDate( aString )
{
    var dateArray = aString.split("/");
    return new Date(dateArray[2],dateArray[1]-1,dateArray[0]);
}

function dateToString( aDate )
{
    var date = aDate.getDate();
    date = (date > 9) ? date : "0"+date.toString();

    var month = aDate.getMonth()+1;
    month = (month > 9) ? month : "0"+month.toString();

    var year = aDate.getFullYear();


    return (date+"/"+month+"/"+year);
}
