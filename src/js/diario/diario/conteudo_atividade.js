let DISCIPLINA;

const stringEInteiro = numero => (/^\d+$/).test(numero);

const BARRA_PESQUISA = new URLSearchParams(window.location.search);
if (BARRA_PESQUISA.has("disciplina") && stringEInteiro(BARRA_PESQUISA.get("disciplina")))
    DISCIPLINA = Number(BARRA_PESQUISA.get("disciplina"));

const infos = {
    inserirAtividade:{
        link: "/diario/diario/conteudo/inserir",
        parametros_default:{
            disciplina: DISCIPLINA
        },
        queries:{
            inputs: "#inserir_atividade input"
        },
        ativadores: { evento: "click", query: "#submit_inserir_atividade" },
        callback: atualizarAtividade
    },
    inserirConteudo:{
        link: "/diario/diario/conteudo/inserir",
        parametros_default: {
            disciplina: DISCIPLINA,
            valor: 0.0
        },
        queries: {
            inputs: "#inserir_conteudo input"
        },
        ativadores: { evento: "click", query: "#submit_inserir_conteudo" },
        callback: atualizarConteudo
    },
    consultarConteudo:{
        link: "/diario/diario/conteudo/consulta",
        parametros_default: {
            tipo: "conteudo",
            disciplina: DISCIPLINA
        },
        queries: {
            holder: "#holder_conteudos",
            template: "#template_conteudos",
            alterar: "#modalAlteraConteudos"
        },
        callback: consultarConteudoPos
    },
    consultarAtividade: {
        link: "/diario/diario/conteudo/consulta",
        parametros_default: {
            tipo: "atividade",
            disciplina: DISCIPLINA
        },
        queries: {
            holder: "#holder_atividades",
            template: "#template_atividades",
            alterar: "#modalAlteraAtividade"
        },
        callback: consultarAtividadePos
    },
    consultarMatriculas: {
        link: "/diario/matriculas/listar",
        parametros_default: {
            idDisciplinas: DISCIPLINA
        },
        queries: {
            holder: ["#holder_notas_faltas", "#holder_faltas"],
            template: ["#template_nota_falta", "#template_falta"]
        },
        callback: consultarMatriculasPos
    },
    consultarAluno: {
        link: "/diario/alunos/consultar"
    },
    alterarAtividade: {
        link: "/diario/diario/conteudo/atualizar",
        parametros_default: {
            disciplina: DISCIPLINA
        },
        queries: {
            inputs: "#modalAlteraAtividade input"
        },
        ativadores: { evento: "click", query: "#submit_alterar_atividade" },
        callback: atualizarAtividade
    },
    alterarConteudo: {
        link: "/diario/diario/conteudo/atualizar",
        parametros_default: {
            disciplina: DISCIPLINA
        },
        queries: {
            inputs: "#modalAlteraConteudos input"
        },
        ativadores: { evento: "click", query: "#submit_alterar_conteudo" },
        callback: atualizarConteudo
    },
    deletarConteudo: {
        link: "/diario/diario/conteudo/deletar",
        callback: atualizarConteudo
    },
    deletarAtividade: {
        link: "/diario/diario/conteudo/deletar",
        callback: atualizarAtividade
    },
    lancaFalta: {
        link: "/diario/diario/diario/inserir",
        parametros_default: {
            tipo: "conteudo"
        }
    }, 
    lancaNota: {
        link: "/diario/diario/diario/inserir",
        parametros_default: {
            tipo: "atividade"
        }
    },
    consultaDiario:{
        link: "/diario/diario/diario/consulta"
    }
};

function alterarConteudo(info, pai){
    const modal = document.querySelector(info.queries.alterar);
    const inputs = modal.querySelectorAll("input");

    for(let input of inputs){
        let name = input.name;
        if(name in pai.dataset){
            if(input.type=="date"||input.type==="hidden") input.value = pai.dataset[name];
            else input.placeholder = pai.dataset[name];
        }
    }
}

function deletarConteudo(info, pai){
    let id = pai.dataset.id;

    if (window.confirm("Você tem certeza que deseja deletar o conteudo \""+pai.dataset.conteudo+"\"?\nUma vez deletado, não há mais volta."))
        requisicao("deletarConteudo",{id});
}

function deletarAtividade(info, pai) {
    let id = pai.dataset.id;

    if (window.confirm("Você tem certeza que deseja deletar a atividade \"" + pai.dataset.atividade + "\"?\nUma vez deletada, não há mais volta."))
        requisicao("deletarAtividade", { id });
}

function consultarConteudoPos(info,resposta_dom){
    let args;
    const holder = document.querySelector(info.queries.holder);
    holder.innerHTML = "";
    if (resposta_dom == null) return;
    
    for(let conteudosEl of resposta_dom){
        let conteudo = conteudosEl.querySelector("conteudos").innerHTML,
            etapa = conteudosEl.querySelector("id-etapas").innerHTML,
            data = conteudosEl.querySelector("data").innerHTML,
            id = conteudosEl.querySelector("id").innerHTML;

        consultaDiario(id);

        args = { 
            conteudo, 
            etapa, 
            id,
            data: dataFormatada(data),
            data_raw: data
        };

        let el = geraElemento(info.queries.template,args)[0];

        let botao_edit = el.querySelector(".edit"),
            botao_deletar = el.querySelector(".delete"),
            botao_lanca = el.querySelector(".falta");
        
        botao_edit.addEventListener("click", () => alterarConteudo(info, el));
        botao_deletar.addEventListener("click", () => deletarConteudo(info, el));
        botao_lanca.addEventListener("click", () => consultaDiarioConteudoFalta(info, el));

        holder.appendChild(el);

    }  
}

async function consultaDiarioConteudoFalta(info, el){
    let conteudo = el.dataset.id;

    const holder = document.querySelector(infos.consultarMatriculas.queries.holder[1]);
    holder.dataset.conteudo = conteudo;
}


const diarios = {}

async function consultaDiario(id){
    let conteudo = id;
    if (diarios[conteudo] == undefined) diarios[conteudo] = {};

    let objetoDiario = diarios[conteudo];

    let diarioEls = await requisicao("consultaDiario", { conteudo });
    if (diarioEls == null) return;

    for (let diarioEl of diarioEls) {
        let matricula = diarioEl.querySelector("id-matriculas").innerHTML,
            faltas = diarioEl.querySelector("faltas").innerHTML,
            nota = diarioEl.querySelector("nota").innerHTML;

        matricula = formatarNumero(matricula);

        objetoDiario[matricula] = {
            faltas,
            nota
        };
        
    }
}

function consultarAtividadePos(info, resposta_dom) {
    let args;
    const holder = document.querySelector(info.queries.holder);
    holder.innerHTML = "";
    if (resposta_dom==null)return;

    for (let conteudosEl of resposta_dom) {
        let atividade = conteudosEl.querySelector("conteudos").innerHTML,
            etapa = conteudosEl.querySelector("id-etapas").innerHTML,
            data = conteudosEl.querySelector("data").innerHTML,
            valor = conteudosEl.querySelector("valor").innerHTML,
            id = conteudosEl.querySelector("id").innerHTML;

        consultaDiario(id);

        args = {
            atividade,
            etapa,
            id,
            valor,
            data: (new Date(data)).toLocaleDateString(),
            data_raw: data
        };

        let el = geraElemento(info.queries.template, args)[0];

        let botao_edit = el.querySelector(".edit"),
            botao_deletar = el.querySelector(".delete"),
            botao_lanca = el.querySelector(".nota");

        botao_edit.addEventListener("click", () => alterarConteudo(info, el));
        botao_deletar.addEventListener("click", () => deletarAtividade(info, el));
        botao_lanca.addEventListener("click", () => consultaDiarioConteudoNota(info, el));

        holder.appendChild(el);
    }
}

function consultaDiarioConteudoNota(info, el) {
    let conteudo = el.dataset.id;

    const holder = document.querySelector(infos.consultarMatriculas.queries.holder[0]);
    holder.dataset.conteudo = conteudo;
}

async function consultarMatriculasPos(info, resposta_dom) {
    let args;
    const holders = [];
    for (let holder_query of info.queries.holder){
        const holder = document.querySelector(holder_query);
        holder.innerHTML = "";
        holders.push(holder);
    }

    if (resposta_dom == null) return;

    for (let matriculasEl of resposta_dom) {
        let matricula = matriculasEl.querySelector("id").innerHTML,
            idAluno = matriculasEl.querySelector("id-alunos").innerHTML;

        let alunoEl = await requisicao("consultarAluno",{id: idAluno}),
            nome="";

        for(let campo of alunoEl){
            if(campo.tagName=="nome")
                nome = campo.innerHTML;
        }

        args = {
            matricula: formatarNumero(matricula,11),
            nome
        };

        for(let i=0; i< holders.length; i++){
            const holder = holders[i];
            let template;
            if (info.queries.template.constructor == Array)
                template = info.queries.template[i];
            else
                template = info.queries.template;

            let el = geraElemento(template, args)[0];
            holder.appendChild(el);
        }  
    }
}

function atualizarAtividade(){
    requisicao("consultarAtividade");
}

function atualizarConteudo(){
    requisicao("consultarConteudo");
}

leInfos(infos);

requisicao("consultarConteudo");
requisicao("consultarAtividade");
requisicao("consultarMatriculas");

const botaoLancarNota = document.querySelector("#lancarNota");
const botaoLancarFalta = document.querySelector("#lancarFalta");

function lanca(link, query){
    const holder = document.querySelector(query);
    const campos = holder.querySelectorAll("tr");

    for (let campo of campos) {
        console.log(campo);

        let matricula = formatarNumero(campo.dataset.matricula),
            conteudo = holder.dataset.conteudo,
            config = { matricula, conteudo },
            falta = campo.querySelector("input[name=falta]").value,
            nota = campo.querySelector("input[name=nota]");

        if(nota!=null) nota = nota.value

        if (falta != "") config.falta = falta;
        if (!(nota == "" || nota == null )) config.nota = nota;

        console.log(config);


        requisicao(link, config);
    }
}

botaoLancarFalta.addEventListener("click",()=>{
    lanca("lancaFalta", infos.consultarMatriculas.queries.holder[1]);
});

botaoLancarNota.addEventListener("click", () => {
    lanca("lancaNota", infos.consultarMatriculas.queries.holder[0]);
});
