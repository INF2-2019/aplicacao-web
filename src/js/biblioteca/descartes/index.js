async function pega_acervos(){
  const holder = document.querySelector("#acervos_disponiveis");

  let resultado = await pegaTabela(prefixo +"/biblioteca/acervo/consultar"),
      acervos = analiseXML(resultado);

  if(acervos!=null){
    for (let acervo of acervos) {
      let parametros = leParametrosXML(acervo),
        nome = parametros["nome"],
        id = parametros["id"];


      let el = $("<option value=\"" + id + "\"> " + nome + "</option>")[0];
      holder.appendChild(el);
    }
  }

  $("select").formSelect();
}