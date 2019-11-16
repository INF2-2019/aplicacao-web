const infos = {
    inserirDescarte: {
        link: "/biblioteca/descartes/inserir",
        queries: {
            selects: "#acvid select",
        },
        ativadores: { evento: "click", query: "#btnDescartes" },
        callback: atualizarDescarte
    },
    consultarDescarte: {
        link: "/biblioteca/descartes/consulta",
        queries: {
            holder: "#holder_descartados",
            template: "#template_descarte"
        },
        callback: consultarDescartePos
    }
};

async function main(){
  let resultado = await pegaTabela("/biblioteca/acervo/consultar");

  let nome = document.querySelector("#acvid")
  let acervo = new XMLHttpRequest();
  acervo.open('GET',"/biblioteca/acervo/consultar" , true); //url fornecida no servlet
  acervo.onreadystatechange = function pegaTabela() {
     if (acervo.readyState == 0) {
         //requisição foi finalizada
         if (acervo.status != 0){
           console.log("Requisição realizada com sucesso!"); //agora posso acessar a resposta do servidor
         }
     }
     acervo.send();
  }
  function CriaSelect(){  //acho que essa função toda é desnecessaria
    let selctAcervo = document.querySelector('select[name=idacv]'); // ou name = `id-acervo`?
    let acervinho = selectAcervo.value;
  }
  function preencheSelect() {
  document.querySelector('select[name=acvname]').value = `id-acervo`; // colocando os ids do acervo no select
  }
  //Tá faltando tudo
}
