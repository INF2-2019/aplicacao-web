var modal = document.getElementById("modal-cadastro");
var btn = document.getElementById("botaoAdicionar");

function loadFoto() {
  var link = document.querySelector("#fototext").value;
  var output = document.getElementById('foto');
  output.src = link;
  $("#foto").on('error', function() {fotoBasica(output) });
}

function loadFoto2() {
  var link = document.querySelector("#fototext3").value;
  var output = document.getElementById('foto3');
  output.src = link;
  $("#foto3").on('error', function() {fotoBasica(output) });
}

document.querySelector("#botao-manutencao-campi").addEventListener("click", function() {fotoBasica(document.querySelector("#foto"))});

function fotoBasica(output) {
    setTimeout(function() {output.src = "https://uploads.metropoles.com/wp-content/uploads/2019/08/05090905/perfilsemfoto.jpg";}, 30);

}

var loadFile = function(event) {
    var output = document.getElementById('foto');
     output.src = URL.createObjectURL(event.target.files[0]);
};

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
    foto.src = "";
}

function verificaCamposCadastro() {
    var a = document.getElementsByClassName("obrigatorio-cadastro");
    var tam = document.getElementsByClassName("obrigatorio-cadastro").length;
    var CampoObrVazio = false
    for(i=0;i<tam;i++){
        if(a[i].value === null || a[i].value ===""){
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


document.getElementById("btConfirmaCadastro").addEventListener("click",verificaCamposCadastro);

for(i=0; i<document.getElementsByClassName("botaoAdicionar").length ; i++){
    document.getElementsByClassName("botaoAdicionar")[i].addEventListener("click",Esvaziar);
}
for(i=0; i<document.getElementsByClassName("botaoCancelar").length ; i++){
    document.getElementsByClassName("botaoCancelar")[i].addEventListener("click",Esvaziar);
}
for(i=0; i<document.getElementsByClassName("botaoEditar").length ; i++){
    document.getElementsByClassName("botaoEditar")[i].addEventListener("click",Esvaziar);
}

function reformatDate(dateStr)
{
let dArr = dateStr.split("-");  // ex input "2010-01-18"
return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0]; //ex out: "18/01/2010"
}
