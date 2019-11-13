function adicionaResult(responseStatus,xmlResult){
var parser = new DOMParser();
var exibido = 0; //verifica se a mensagem de erro ja foi mostrada
//recebe resposta em XML e manipula o XML

    if(responseStatus === 200){
    var resp = xmlResult.childNodes[0]
    M.toast({
      html: resp,
      classes: "green darken-2"
    });
  }else if(responseStatus === 400){
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
}
}
