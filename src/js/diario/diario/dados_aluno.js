let ALUNO;

const stringEInteiro = numero => (/^\d+$/).test(numero);

const BARRA_PESQUISA = new URLSearchParams(window.location.search);
if (BARRA_PESQUISA.has("aluno") && stringEInteiro(BARRA_PESQUISA.get("aluno")))
    ALUNO = Number(BARRA_PESQUISA.get("aluno"));

const infos = {
    consultarDadosAluno:{
        link: "/diario/alunos/consultar",
        queries: {
            holder: "#dados_aluno",
            template: "#template_aluno"
        },
        callback: consultarDadosAluno 
    }, 
    consultarMatriculas: {
        link: "/diario/matriculas/listar",
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
    },
    consultaCargoLogado:{
        link: "/diario/cargo"
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

const DISCIPLINAS = {
    
};

async function consultarMatriculasPos(info, resposta_dom) {
    const holder = document.querySelector(info.queries.holder);
    holder.innerHTML = "";
    if (resposta_dom == null)
        return;

    for (let matriculasEl of resposta_dom) {
        let matricula = matriculasEl.querySelector("id").innerHTML,
            id_disciplina = matriculasEl.querySelector("id-disciplinas").innerHTML;

        let disciplinaEl = await requisicao("consultarDisciplina",{id: id_disciplina});
        disciplinaEl = disciplinaEl[0];

        let nome = disciplinaEl.querySelector("nome").innerHTML;

        DISCIPLINAS[id_disciplina] = {atividades:[],conteudos:[]};

        let conteudos = await requisicao("consultarConteudos", { disciplina: id_disciplina }),
            pontos_distribuidos = 0, nota_total =0, falta_total=0;

        for (let conteudo of conteudos) {
            let idConteudo= conteudo.querySelector("id").innerHTML,
                valor = conteudo.querySelector("valor").innerHTML,
                data = conteudo.querySelector("data").innerHTML,
                nome = conteudo.querySelector("conteudos").innerHTML;

            valor = formatarNumero(valor);
            if(valor==0){
                DISCIPLINAS[id_disciplina].conteudos.push({nome,data});
            }

            pontos_distribuidos += valor;

            let diario = await requisicao("consultarDiario",{matricula, conteudo: idConteudo});
            if(diario==null) continue;
            diario = diario[0];
            
            let faltas = diario.querySelector("faltas").innerHTML,
                nota = diario.querySelector("nota");
            
            
            falta_total += formatarNumero(faltas);
            
            if(nota!=null && valor>0){
                nota = nota.innerHTML;
                nota_total += formatarNumero(nota);
                DISCIPLINAS[id_disciplina].atividades.push({ nome, valor, nota });
            }

        }

        args = {
            id: id_disciplina,
            disciplina: nome,
            faltas: falta_total,
            nota: nota_total
        };
        

        let el = geraElemento(info.queries.template, args)[0],
            botaoConteudos = el.querySelector(".conteudos"),
            botaoAtividades = el.querySelector(".atividades");

        botaoConteudos.addEventListener("click", () => geraConteudos(id_disciplina));
        botaoAtividades.addEventListener("click", () => geraAtividades(id_disciplina));

        holder.appendChild(el);
    }
}

function geraConteudos(id_disciplina){
    let conteudos = DISCIPLINAS[id_disciplina].conteudos;
    const holder = document.querySelector("#holder_conteudos");
    const template = "#template_conteudo";

    holder.innerHTML="";

    for(let conteudo of conteudos){
        let args = {
            nome: conteudo.nome,
            data: dataFormatada(conteudo.data).slice(0, -5)
        };

        let el = geraElemento(template, args)[0];
        holder.appendChild(el);
    }
}

function geraAtividades(id_disciplina) {
    let atividades = DISCIPLINAS[id_disciplina].atividades;
    const holder = document.querySelector("#holder_atividades");
    const template = "#template_atividade";

    holder.innerHTML = "";

    for (let atividade of atividades) {
        let el = geraElemento(template,atividade)[0];
        holder.appendChild(el);
    }
}


leInfos(infos);

async function main(){
    let cargo = await requisicao("consultaCargoLogado",{},{output: false});
    let holder = document.createElement("div");
    holder.append(...cargo);
    
    let qual = holder.querySelector("cargo").innerHTML,
        id = holder.querySelector("id").innerHTML;
    
    if(qual=="ALUNO")
        requisicao("consultarDadosAluno", { id});
    else
        requisicao("consultarDadosAluno", { id: ALUNO });

}

main();