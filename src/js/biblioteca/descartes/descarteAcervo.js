const infos = {
    inserirDescarte: {
        link: "/biblioteca/descartes/inserir",
        queries: {
            inputs: "#modalDescartes input, #modalDescartes textarea"
        },
        ativadores: { evento: "click", query: "#submit_inserir_descarte" },
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

// Código baseado na primeira resposta do site: https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript
function dataFormatada(data) {
    data = new Date(data);

    let dia = (data.getDate() + 1).toString(), // tive que colocar o +1 por algum motivo que desconheço, mas sei que sem ele não funciona
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
}

function atualizarDescarte(){
    requisicao("consultarDescarte");
}

function consultarDescartePos(info, resposta_dom) {
    let args;
    const holder = document.querySelector(info.queries.holder);
    holder.innerHTML = "";
    if (resposta_dom == null) return;

    for (let conteudosEl of resposta_dom) {
        let acervo = conteudosEl.querySelector("id-acervo").innerHTML,
            motivacao = conteudosEl.querySelector("motivos").innerHTML,
            operador = conteudosEl.querySelector("operador").innerHTML,
            data = conteudosEl.querySelector("data-descarte").innerHTML;

        args = {
            acervo,
            motivacao,
            operador,
            data: dataFormatada(data),
            data_raw: data
        };

        let el = geraElemento(info.queries.template, args)[0];
        holder.appendChild(el);

    }
}

leInfos(infos);

requisicao("consultarDescarte");