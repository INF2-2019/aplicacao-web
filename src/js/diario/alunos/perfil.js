M.AutoInit();

$(".btVoltar").click(function(){
    window.history.back();
});

let idSessao; 
pegarId();
var link = "";


function pegarId() {
    let url = "http://localhost:8080/app/diario/cargo";
    fetch(url, { credentials: 'include' })
    .then(resposta => {
        return resposta.text();
    })
    .then(text => {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(text, "text/xml");
        if (xmlDoc.childNodes[0].childNodes[5].childNodes[0] != undefined) {
            let id = xmlDoc.childNodes[0].childNodes[5].childNodes[0].nodeValue;
            let foto = document.querySelector("#foto-perfil-aluno");
            consulta(id, foto);
            idSessao = id;
        }
    });
    
}


function loadFoto() {
    link = document.querySelector("#link").value;
    var output = document.getElementById('fotoAlterada-perfil-alunos');
    output.src = link;
}

let butAltFoto = document.querySelector("#salvar");


butAltFoto.addEventListener("click", function(e) {
    alterarFoto(link)
});

function alterarFoto(foto) {
    let url = "http://localhost:8080/app/diario/alunos/altfoto?id="+idSessao+"&foto="+foto;
    fetch(url, { credentials: 'include' })
    .then(resposta => {
        responseStatus = resposta.status;
        return resposta.text();
    })
    .then(text => {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(text, "text/xml");
        let foto = document.querySelector("#foto-perfil-aluno");
        consulta(idSessao, foto);
        adicionaResult(responseStatus, xmlDoc);
    });
}

function alterarSenha() {
    let senha = document.querySelector("#newsenha").value;
    let url = "http://localhost:8080/app/diario/alunos/senha?id="+idSessao+"&senha="+senha;
    fetch(url, { credentials: 'include' })
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








