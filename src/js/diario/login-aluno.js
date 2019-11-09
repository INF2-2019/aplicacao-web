function validar() {
    let cpf = document.querySelector("#cpf").value;
    let senha = document.querySelector("#senha").value;
    let url = "http://localhost:8080/app/diario/alunos/logar?id="+cpf+"&senha="+senha;
    fetch(url)
      .then(resposta => {
        responseStatus = resposta.status;
        return resposta.text();
      })
      .then(text => {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(text, "text/xml");
        adicionaResult(responseStatus, xmlDoc);
      });
  
  }
  
  function adicionaResult(responseStatus,xmlResult){
  var parser = new DOMParser();
  var exibido = 0; //verifica se a mensagem de erro ja foi mostrada
  //recebe resposta em XML e manipula o XML
  
    if(responseStatus != 200){
      if (xmlResult != "") {
        var resp = xmlResult.childNodes[0];
        if (exibido === 0) {
          M.toast({
            html: resp,
            classes: "red darken-2"
          });
          exibido += 1;
        }
      }
    } else {
      //codigo para redirecionar
    }
  }