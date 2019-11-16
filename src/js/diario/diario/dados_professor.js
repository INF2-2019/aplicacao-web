let PROFESSOR;

const stringEInteiro = numero => (/^\d+$/).test(numero);

const BARRA_PESQUISA = new URLSearchParams(window.location.search);
if(BARRA_PESQUISA.has("professor") && stringEInteiro(BARRA_PESQUISA.get("professor")))
    PROFESSOR = Number(BARRA_PESQUISA.get("professor"));

const infos = {
    consultarDadosProfessor: {
        link: "/diario/professores/consultar",
        parametros_default: {
            professor: PROFESSOR
        },
        queries: {
            holder: "#dados_professor",
            template: "#template_professor"
        },
        callback: consultarDadosProfessor 
    }, 
    consultarDisciplinaProfessor: {
        link: "/diario/professoresdisciplinas/consultar",
        parametros_default: {
            "id-professores": PROFESSOR
        },
        callback: consultarDisciplinaProfessor
    },
    consultarDisciplina: {
        link: "/diario/disciplinas/consultarporid",
        parametros_default: {},
        queries: {
            holder: "#holder_diario",
            template: "#template_disciplinas"
        },
        callback: consultarDisciplina
    }
}

function consultarDadosProfessor(info, resposta_dom) {
    let args;
    const holder = document.querySelector(info.queries.holder);
    holder.innerHTML = "";
    if (resposta_dom == null)
        return;
    console.log(resposta_dom);
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

        console.log(args);

        let els = geraElemento(info.queries.template, args);
        for(let el of els){
            holder.appendChild(el);
        }
    }
}

function consultarDisciplinaProfessor(info, resposta_dom) {
    if (resposta_dom == null)
        return;
    

    for (let disciplinaProfessorEl of resposta_dom) {
        let id_prof = disciplinaProfessorEl.querySelector("id-professores").innerHTML,
            id_disc = disciplinaProfessorEl.querySelector("id-disciplinas").innerHTML;

        requisicao("consultarDisciplina",{id: id_disc});
    }
}

function consultarDisciplina(info, resposta_dom) {
    let args;
    const holder = document.querySelector(info.queries.holder);
    if (holder.querySelectorAll("tr > td").length>1 && holder.querySelectorAll("tr > td")[1].innerHTML=="AULA DE PEBOLIM")
        holder.innerHTML = "";
    if (resposta_dom == null)
        return;


    for (let disciplinaProfessorEl of resposta_dom) {
        let id_turma = disciplinaProfessorEl.querySelector("id-turmas").innerHTML,
            nome = disciplinaProfessorEl.querySelector("nome").innerHTML,
            horaria = disciplinaProfessorEl.querySelector("carga-horaria-min").innerHTML,
            id = disciplinaProfessorEl.querySelector("id").innerHTML;

        args = {
            carga_horaria: horaria,
            turma: id_turma,
            disciplina: nome,
            id
        };

        console.log(args);

        let els = geraElemento(info.queries.template, args);
        for (let el of els) {
            holder.appendChild(el);
        }
    }
}


leInfos(infos);

requisicao("consultarDadosProfessor");
requisicao("consultarDisciplinaProfessor");