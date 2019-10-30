function Esvaziar() {
    var CamposCadOb = document.getElementsByClassName("obrigatorio-cadastro");
    var CCOsize = document.getElementsByClassName("obrigatorio-cadastro").length;
    var CamposEditOb = document.getElementsByClassName("obrigatorio-editar");
    var CEOsize = document.getElementsByClassName("obrigatorio-editar").length;
    var CamposEditRec = document.getElementsByClassName("recomendado-editar");
    var CERsize = document.getElementsByClassName("recomendado-editar").length;
    var foto = document.getElementById('foto');
    for(i=0;i<CCOsize;i++){
        CamposCadOb[i].value = "";
    }
    for(i=0;i<CEOsize;i++){
        CamposEditOb[i].value = "";
    }
    for(i=0;i<CERsize;i++){
        CamposEditRec[i].value = "";
    }
}

function verificaCamposCadastro() {
    var a = document.getElementsByClassName("obrigatorio-cadastro");
    var tam = document.getElementsByClassName("obrigatorio-cadastro").length;
    var CampoObrVazio = false
    for(i=0;i<tam;i++){
        if(a[i].value == null || a[i].value ==""){
            CampoObrVazio = true;
            break;
        }
    }
    if(CampoObrVazio){
        alert("Os campos com * são obrigatórios!");
    }
    else{
        inserir();
        var instance = M.Modal.getInstance(modal);
        instance.close();

    }
}

function verificaCamposEditar() {
    var a = document.getElementsByClassName("obrigatorio-editar");
    var tam = document.getElementsByClassName("obrigatorio-editar").length;
    var CampoObrVazio = false
    for(i=0;i<tam;i++){
        if(a[i].value == null || a[i].value ==""){
            CampoObrVazio = true;
            break;
        }
    }
    if(CampoObrVazio){
        alert("Os campos com * são obrigatórios!");
    }
    else verificaCamposRecEditar();
}
function verificaCamposRecEditar() {
    var b = document.getElementsByClassName("recomendado-editar");
    var tam2 = document.getElementsByClassName("recomendado-editar").length;
    var CampoRecVazio = false;
    for(i=0;i<tam2;i++){
        if(b[i].value == null || b[i].value ==""){
            CampoRecVazio = true;
            break;
        }
    }
    if(CampoRecVazio){
        if(confirm("Os campos em vazio não alterarão os valores antigos. ?")){

        }
        else{

        }
    }
}

document.getElementById("btConfirmaCadastro").addEventListener("click",verificaCamposCadastro);
document.getElementById("btConfirmaEditar").addEventListener("click",verificaCamposEditar);

function atribuirClasses() {
  for(i=0; i<document.getElementsByClassName("botaoAdicionar").length ; i++){
      document.getElementsByClassName("botaoAdicionar")[i].addEventListener("click",Esvaziar);
  }
  for(i=0; i<document.getElementsByClassName("botaoCancelar").length ; i++){
      document.getElementsByClassName("botaoCancelar")[i].addEventListener("click",Esvaziar);
  }
  for(i=0; i<document.getElementsByClassName("botaoEditar").length ; i++){
      document.getElementsByClassName("botaoEditar")[i].addEventListener("click",Esvaziar);
  }
  console.log("teste");
  console.log(document.getElementsByClassName("botaoEditar"));
}

function reformatDate(dateStr)
{
let dArr = dateStr.split("-");  // ex input "2010-01-18"
return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0]; //ex out: "18/01/2010"
}
