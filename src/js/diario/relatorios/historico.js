var resposta = document.getElementById("recebeResposta");
var tabelaResp = document.getElementById("tabela-historico");
var cpf;
var cargo;
var idSessao;
var id;

function conecta() {
    if (cargo == "ADMIN") cpf = document.getElementById("cpf").value;
    else if (cargo == "ALUNO") cpf = id;
    resposta.innerHTML = "";

    var xhttp = new XMLHttpRequest(),
        method = "GET",
        url = "http://localhost:8080/app/diario/HistoricoEscolar?id=" + cpf;
    xhttp.open(method, url, true);
    xhttp.withCredentials = true;

    var parser = new DOMParser();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
            var responseStr = xhttp.responseText;
            var xmlDoc = parser.parseFromString(responseStr, "text/xml");

            var elementos = xmlDoc.childNodes[0].children;
            var nome = elementos[1].innerHTML;

            resposta.innerHTML += "<p>Aluno: " + nome + "</p>";

            while (cpf.length < 11) {
                cpf = "0" + cpf;
            }

            resposta.innerHTML += "<p>CPF: " + cpf + "</p>";

            tabelaResp.innerHTML += "<thead><th>Matrícula</th><th>Ano</th><th>Disciplina</th>" +
                "<th>Conteúdo</th><th>Faltas</th><th>Valor</th><th>Nota</th></thead>";
            tabelaResp.innerHTML += "<tbody>";

            console.log(elementos);
            console.log(elementos[2].children.length);

            for (let i = 0; i < (elementos[2].children.length); i++) {
                let row = "<tr>";

                for (let j = 0; j < (elementos[2].children[i].children.length); j++) {
                    let elemento = "<td>";
                    elemento += elementos[2].children[i].children[j].innerHTML;
                    elemento += "</td>";

                    row += elemento;
                }

                row += "</tr>";
                tabelaResp.innerHTML += row;
            }

            tabelaResp.innerHTML += "</tbody>";

        } else if (xhttp.status != 200) {
            var responseStr = xhttp.responseText;
            if (responseStr != "") {
                var xmlDoc = parser.parseFromString(responseStr, "text/xml");
                var resp = xmlDoc.childNodes[0].children[0].innerHTML;
                M.toast({
                    html: resp,
                    classes: "red darken-2"
                });
            }
        }
    };
    xhttp.send();

}

function ifAdm() {
    var form = document.createElement("div");
    form.setAttribute('id', "RecebeId");
    form.setAttribute('class', "input-field col s4");

    var inp = document.createElement("input");
    inp.setAttribute('type', "text");
    inp.setAttribute('name', "cpf");
    inp.setAttribute('id', "cpf")

    var label = document.createElement("label");
    label.setAttribute('for', "cpf");
    label.innerHTML = "CPF do Aluno";

    var botao = document.createElement("a");
    botao.setAttribute('class', "btn primary");
    botao.setAttribute('onclick', "conecta()");
    botao.innerHTML = "Busca Histórico";

    form.appendChild(inp);
    form.appendChild(label);
    form.appendChild(botao);

    resposta.appendChild(form);
}

function ifAluno() {
    conecta();
}

function getId() {
    let url = "http://localhost:8080/app/diario/cargo";
    fetch(url, { credentials: 'include' })
        .then(response => {
            return response.text();
        })
        .then(text => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(text, "text/xml");

            cargo = xmlDoc.childNodes[0].childNodes[3].innerHTML;

            if (xmlDoc.childNodes[0].childNodes[5].childNodes[0] != undefined) {
                id = xmlDoc.childNodes[0].childNodes[5].childNodes[0].nodeValue;
                idSessao = id;
            }

            if (cargo == "ALUNO") ifAluno();
            else if (cargo == "ADMIN") ifAdm();
		});

}

$("#imprimir").click(function(){
	window.print();
});
