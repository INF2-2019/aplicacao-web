let ALUNO;

const stringEInteiro = numero => (/^\d+$/).test(numero);

const BARRA_PESQUISA = new URLSearchParams(window.location.search);
if (BARRA_PESQUISA.has("aluno") && stringEInteiro(BARRA_PESQUISA.get("aluno")))
    ALUNO = Number(BARRA_PESQUISA.get("aluno"));

const infos = {
    consultarDadosAluno:{
        link: "/diario/alunos/consultar",
        parametros_default: {
            id: ALUNO
        },
        queries: {
            holder: "#dados_aluno",
            template: "#template_aluno"
        },
        callback: consultarDadosAluno 
    }, 
    consultarMatriculas: {
        link: "/diario/matriculas/listar",
        parametros_default: {
            idAlunos: ALUNO
        },
        queries: {
            holder: "#holder_disciplinas",
            template: "#template_disciplina"
        },
        callback: consultarMatriculasPos
    }, 
    consultarConteudos:{
        link: "/diario/diario/conteudo/consulta"
    },
    consultarDiario: {
        link: "/diario/diario/diario/consulta"
    },
    consultarDisciplina: {
        link: "/diario/disciplinas/consultarporid"
    }
};

function consultarDadosAluno(info, resposta_dom) {
    let args;
    const holder = document.querySelector(info.queries.holder);
    holder.innerHTML = "";
    if (resposta_dom == null)
        return;

    // Essa medidas tiveram que ser tomadas devido a resposta diferênciada do "consultar aluno por id"
    let segurador = document.createElement("div");
    resposta_dom.forEach(el=>segurador.appendChild(el));
    let alunoEl = segurador;

    let id = alunoEl.querySelector("id").innerHTML,
        nome = alunoEl.querySelector("nome").innerHTML,
        email = alunoEl.querySelector("email").innerHTML,
        sexo = alunoEl.querySelector("sexo").innerHTML,
        nascimento = alunoEl.querySelector("nascimento").innerHTML;

    if (sexo == "M")
        sexo = "Masculino";
    else if (sexo == "F")
        sexo = "Feminino";
    else
        sexo = "Não Binário / Outro";


    args = {
        id,
        nome,
        email,
        sexo,
        nascimento
    };
    

    let els = geraElemento(info.queries.template, args);
    for (let el of els) {
        holder.appendChild(el);
    }

    requisicao("consultarMatriculas",{idAlunos: id});
}

async function consultarMatriculasPos(info, resposta_dom) {
    const holder = document.querySelector(info.queries.holder);
    holder.innerHTML = "";
    if (resposta_dom == null)
        return;

    console.log(resposta_dom);

    for (let matriculasEl of resposta_dom) {
        let matricula = matriculasEl.querySelector("id").innerHTML,
            id_disciplina = matriculasEl.querySelector("id-disciplinas").innerHTML;

        let disciplinaEl = await requisicao("consultarDisciplina",{id: id_disciplina});
        disciplinaEl = disciplinaEl[0];

        let nome = disciplinaEl.querySelector("nome").innerHTML;

        let conteudos = await requisicao("consultarConteudos", { disciplina: id_disciplina }),
            pontos_distribuidos = 0, nota_total =0, falta_total=0;

        for (let conteudo of conteudos) {
            let idConteudo= conteudo.querySelector("id").innerHTML,
                valor = conteudo.querySelector("valor").innerHTML;

            pontos_distribuidos += formatarNumero(valor);

            let diario = await requisicao("consultarDiario",{matricula, conteudo: idConteudo});
            if(diario==null) continue;
            diario = diario[0];
            console.log(diario);
            
            let faltas = diario.querySelector("faltas").innerHTML,
                nota = diario.querySelector("nota");
            
            falta_total += formatarNumero(faltas);
            
            if(nota!=null){
                nota = nota.innerHTML;
                nota_total += formatarNumero(nota);
            }

        }

        args = {
            id: id_disciplina,
            disciplina: nome,
            faltas: falta_total,
            nota: nota_total
        };

        console.log(args);
        

        let el = geraElemento(info.queries.template, args)[0];
        holder.appendChild(el);
    }
}

async function consultarConteudos(resposta_dom){

}


leInfos(infos);

requisicao("consultarDadosAluno");