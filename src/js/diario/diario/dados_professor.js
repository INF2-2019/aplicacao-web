let PROFESSOR;

const stringEInteiro = numero => (/^\d+$/).test(numero);

const BARRA_PESQUISA = new URLSearchParams(window.location.search);
if(BARRA_PESQUISA.has("professor") && stringEInteiro(BARRA_PESQUISA.get("professor")))
    PROFESSOR = Number(BARRA_PESQUISA.get("professor"));

const infos = {
    consultarDadosProfessor: {
        link: "/diario/professor/consultar",
        parametros_default: {
            professor: PROFESSOR
        },
        queries: {
            holder: "#dados_professor",
            template: "#template_professor"
        },
    }
}

function consultarDadosProfessor(info, resposta_dom) {
    let args;
    const holder = document.querySelector(info.queries.holder);
    holder.innerHTML = "";
    if (resposta_dom == null)
        return;

    for (let conteudosEl of resposta_dom) {
        let id = conteudosEl.querySelector("id").innerHTML,
            id_depto = conteudosEl.querySelector("id-depto").innerHTML,
            nome = conteudosEl.querySelector("nome").innerHTML,
            titulacao = conteudosEl.querySelector("titulacao").innerHTML;

        args = {
            id,
            id_depto,
            nome,
            titulacao
        };

        let el = geraElemento(info.queries.template, args)[0];

        holder.appendChild(el);
    }
}

leInfos(infos);

requisicao("consultarDadosProfessor");