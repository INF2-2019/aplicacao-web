function status(doc) {
  var erro = doc.getElementsByTagName("erro");
  var sucesso = doc.getElementsByTagName("sucesso");
  if (erro.length > 0)
    alert(erro[0].getElementsByTagName("mensagem")[0].childNodes[0].nodeValue);
  else
    alert(sucesso[0].getElementsByTagName("mensagem")[0].childNodes[0].nodeValue);
  }
