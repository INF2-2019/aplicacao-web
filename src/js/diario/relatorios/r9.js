let select = document.querySelector("select");
let span = document.querySelector("span");
function addOption(valor) {
    var option = new Option(valor, valor);
    select.add(option);
}

let idSessao;
let div= document.querySelector(".container");
let table = document.querySelector("table");
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
                if (xmlDoc.childNodes[0].childNodes[5].childNodes[0] != undefined && xmlDoc.childNodes[0].childNodes[3].childNodes[0].nodeValue == "PROFESSOR") {
                        let id = xmlDoc.childNodes[0].childNodes[5].childNodes[0].nodeValue;
                        consulta(id);
                        idSessao = id;
                } else if (xmlDoc.childNodes[0].childNodes[3].childNodes[0].nodeValue == "ADMIN") {

                    var profs = [];
                    let url = "http://localhost:8080/app/diario/professores/consultar";

                    fetch(url, { credentials: 'include' } )
                    .then(resposta => {
                        responseStatus = resposta.status;
                        return resposta.text();
                    })
                    .then(text => {
                        parser = new DOMParser();
                        xmlDoc = parser.parseFromString(text, "text/xml");
                        let numProfs = xmlDoc.childNodes[0].getElementsByTagName("professor").length;
                        for (let i = 0; i < numProfs; i++) {
                            let id = xmlDoc.getElementsByTagName("professor")[i].getElementsByTagName("id")[0];
                            profs.push(id.childNodes[0].nodeValue);
                            addOption(profs[i]);
                        }
                    });
                    span.classList.remove("oculto")
                    select.classList.add("sel");

                } else {
                    alert("Você não tem permissão para fazer isso");
                }
        });
        
}

function consulta(id) {
        let url = "http://localhost:8080/app/diario/relatorios/relatorio9?id="+id;
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
    let caption = document.createElement("caption");
    caption.innerHTML = "Professor: "+lineItems.childNodes[0].childNodes[1].childNodes[0].nodeValue;
    table.appendChild(caption);

    table.innerHTML+="<thead><tr><th>Curso</th><th>Disciplinas</th><th>Carga Horária</th></tr></thead>"

    let numCursos = lineItems.childNodes[0].childNodes[2].childNodes.length;
    let tbody = document.createElement("tbody");
    for (let i = 0; i < numCursos; i++) {
        let numDisciplinas = lineItems.childNodes[0].childNodes[2].childNodes[i].childNodes[1].childNodes.length;
        let nomeCurso ="<td rowspan='"+numDisciplinas+"'>"+lineItems.childNodes[0].childNodes[2].childNodes[i].childNodes[0].childNodes[0].nodeValue+"</td>";
        let tr = document.createElement("tr");
        tr.innerHTML += nomeCurso;
        for (j = 0; j <numDisciplinas;j++) {
            let dis = (lineItems.childNodes[0].childNodes[2].childNodes[i].childNodes[1].childNodes[j]);
            let nome = dis.childNodes[0].childNodes[0].nodeValue;
            let carga = dis.childNodes[1].childNodes[0].nodeValue;
            tr.innerHTML+="<td>"+nome+"</td>";
            tr.innerHTML+="<td>"+carga+" horas</td>";
            tbody.appendChild(tr);
            if (j+1 < numDisciplinas) {
                tr = document.createElement("tr");
            }
        }
    }
    table.appendChild(tbody);

    
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

function mudado() {
    table.innerHTML = "";
    if (select.value != "Selecione")
        consulta(select.value);
}

