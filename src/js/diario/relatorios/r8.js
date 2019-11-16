/* global M*/


let idSessao;
let tabela = document.querySelector("table");
pegarId();
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
                        consulta(id);
                        idSessao = id;
                } else {
                        alert("Nenhum aluno está logado");
                }
        });
        
}

function consulta(id) {
        let url = "http://localhost:8080/app/diario/relatorios/relatorio8?id="+id;
        fetch(url, { credentials: 'include' } )
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


function atualizaTabela(lineItems) {
    let nome = document.querySelector("#certificado-nome");
    nome.value = lineItems.getElementsByTagName("mensagem")[0].childNodes[0].nodeValue;
};

$("#imprimir").click(function(){
    window.print();
});

function adicionaResult(responseStatus,xmlResult){
        var parser = new DOMParser();
        var exibido = 0; //verifica se a mensagem de erro ja foi mostrada
        //recebe resposta em XML e manipula o XML
                if(xmlResult.getElementsByTagName("erro").length === 0){
                        atualizaTabela(xmlResult);
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

