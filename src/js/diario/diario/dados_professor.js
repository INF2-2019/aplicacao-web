const infos = {
    consultarDadosProfessor: {
        link: "/diario/professores/consultar",
        parametros_default: {
            id: -1
        },
        queries: {
            holder: "#dados_professor",
            template: "#template_professor"
        },
        callback: consultarDadosProfessor 
    }, 
    consultarDisciplinaProfessor: {
        link: "/diario/professoresdisciplinas/consultar",
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
    }, 
    consultarTurma: {
        link: "/diario/turmas/consultar",
        parametros_default: {}
    }
}



function consultarDadosProfessor(info, resposta_dom) {
    let args;
    const holder = document.querySelector(info.queries.holder);
    holder.innerHTML = "";
    if (resposta_dom == null)
        return;
    console.log(resposta_dom);
    if(resposta_dom.length>1)
        return;

    let professorEl = resposta_dom[0];

    let id = professorEl.querySelector("id").innerHTML,
    id_depto = professorEl.querySelector("id-depto").innerHTML,
    nome = professorEl.querySelector("nome").innerHTML,
    titulacao = professorEl.querySelector("titulacao").innerHTML;

    if(titulacao=="M")
            titulacao = "Mestre";
    else if(titulacao=="E")
            titulacao = "Especialista";
    else if(titulacao=="D")
            titulacao = "Doutor";
    else if(titulacao=="G")
            titulacao = "Graduado";

    args = {
        id: formatarNumero(id,9),
        id_depto,
        nome,
        titulacao
    };

    let els = geraElemento(info.queries.template, args);
    for(let el of els){
        holder.appendChild(el);
    }

    requisicao("consultarDisciplinaProfessor",{"id-professores": id});
    
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

async function consultarDisciplina(info, resposta_dom) {
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

        let turma_dom = await requisicao("consultarTurma",{id:id_turma});
        if(turma_dom==null)return;
        
        let turma;
        if(turma_dom[0].querySelector("nome")!=null)
            turma = turma_dom[0].querySelector("nome").innerHTML;
        else
            break;

        args = {
            carga_horaria: horaria,
            turma,
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