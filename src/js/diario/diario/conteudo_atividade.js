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
        callback: atualizarAtividade,
        post: true
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
        callback: atualizarConteudo,
        post: true
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
        callback: gerarListaDiario
    },
    consultarEtapas: {
        link: "diario/etapas/consultaretapas",
        queries: {
            holder: ["#holder_etapas_lanca_atividade", "#holder_etapas_lanca_conteudo", "#holder_etapas_altera_atividade", "#holder_etapas_altera_conteudo"],
            template: ["#template-etapas"]
        },
        callback: gerarListaEtapas
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
        callback: atualizarAtividade,
        post: true
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
        callback: atualizarConteudo,
        post: true
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
        },
        post: true
    }, 
    lancaNota: {
        link: "/diario/diario/diario/inserir",
        parametros_default: {
            tipo: "atividade"
        },
        post: true
    },
    consultaDiario:{
        link: "/diario/diario/diario/consulta"/*,
        post: true*/
    }
};

// Ao clicar no botão de editar conteudo, coloca os valores no placeholder
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



/* - - -  Conteudos da disciplina - - - */

const CONTEUDOS = {}

// Pega conteudos da disciplina
function consultarConteudoPos(info,resposta_dom){
    const holder = document.querySelector(info.queries.holder);
    holder.innerHTML = "";
    if (resposta_dom == null) return;
    
    for(let conteudosEl of resposta_dom){
        const parametros = leParametrosXML(conteudosEl);
        let id = parametros["id"];

        consultaDiario({id});

        let args = {
            conteudo: parametros["conteudos"],
            etapa: parametros["id-etapas"],
            id,
            data: dataFormatada(parametros["data"]),
            data_raw: parametros["data"]
        };

        CONTEUDOS[id] = Object.assign({},args);

        let el = geraConteudoEl(args, info);
        holder.appendChild(el);
    }  
}
// Gera conteudo da disciplina
function geraConteudoEl(args, info){
    const TEMPLATE_QUERY = infos.consultarConteudo.queries.template; 
    let el = geraElemento(TEMPLATE_QUERY, args)[0];

    let botao_edit = el.querySelector(".edit"),
        botao_deletar = el.querySelector(".delete"),
        botao_lanca = el.querySelector(".falta");

    botao_edit.addEventListener("click", () => alterarConteudo(info, el));
    botao_deletar.addEventListener("click", () => deletarConteudo(info, el));
    botao_lanca.addEventListener("click", () => consultaDiarioConteudoFalta(info, el));
    
    return el;
}
// Chama o consultar conteudo
function atualizarConteudo() {
    requisicao("consultarConteudo");
}

async function consultaDiarioConteudoFalta(info, el){
    let conteudo = el.dataset.id;

    const holder = document.querySelector(infos.consultarMatriculas.queries.holder[1]);
    holder.dataset.conteudo = conteudo;

    mostraDiario("#holder_faltas",conteudo);
}

// Pergunta se usuário tem certeza que quer deletar e deleta
function deletarConteudo(info, pai) {
    let id = pai.dataset.id;

    if (window.confirm("Você tem certeza que deseja deletar o conteudo \"" + pai.dataset.conteudo + "\"?\nUma vez deletado, não há mais volta."))
        requisicao("deletarConteudo", { id });
}



/* - - -  Atividades da disciplina - - - */

const ATIVIDADES = {};

// Pega atividades da disciplina
function consultarAtividadePos(info, resposta_dom) {
    const holder = document.querySelector(info.queries.holder);
    holder.innerHTML = "";
    if (resposta_dom == null) return;

    for (let conteudosEl of resposta_dom) {
        let parametros = leParametrosXML(conteudosEl);

        let id = parametros["id"],
            valor = parametros["valor"];

        consultaDiario({id, valor});

        let args = {
            atividade: parametros["conteudos"],
            etapa: parametros["id-etapas"],
            id,
            valor: valor,
            data: dataFormatada(parametros["data"]),
            data_raw: parametros["data"]
        };

        ATIVIDADES[id] = Object.assign({},args);

        let el = geraAtividadeEl(args, info);

        holder.appendChild(el);
    }
}

// Gera atividade da disciplina
function geraAtividadeEl(args, info){
    let el = geraElemento(infos.consultarAtividade.queries.template, args)[0];

    let botao_edit = el.querySelector(".edit"),
        botao_deletar = el.querySelector(".delete"),
        botao_lanca = el.querySelector(".nota");

    botao_edit.addEventListener("click", () => alterarConteudo(info, el));
    botao_deletar.addEventListener("click", () => deletarAtividade(info, el));
    botao_lanca.addEventListener("click", () => consultaDiarioConteudoNota(info, el));

    return el;
}

// Chama o consultar atividade
function atualizarAtividade() {
    requisicao("consultarAtividade");
}

function consultaDiarioConteudoNota(info, el) {
    let conteudo = el.dataset.id;

    const holder = document.querySelector(infos.consultarMatriculas.queries.holder[0]);
    holder.dataset.conteudo = conteudo;

    mostraDiario("#holder_notas_faltas",conteudo);
}

// Pergunta se usuário tem certeza que quer deletar e deleta
function deletarAtividade(info, pai) {
    let id = pai.dataset.id;

    if (window.confirm("Você tem certeza que deseja deletar a atividade \"" + pai.dataset.atividade + "\"?\nUma vez deletada, não há mais volta."))
        requisicao("deletarAtividade", { id });
}



/* - - - - - - Diario - - - - - - */

const DIARIOS = {}

async function consultaDiario({id,valor}){
    
    let conteudo = id;
    if (DIARIOS[conteudo] == undefined) DIARIOS[conteudo] = {};
    
    let objetoDiario = DIARIOS[conteudo];
    
    let diarioEls = await requisicao("consultaDiario", { conteudo });
    if (diarioEls == null) return;

    for (let diarioEl of diarioEls) {
        let parametros = leParametrosXML(diarioEl);
        let args = {
            matricula: formatarNumero(parametros["id-matriculas"]),
            faltas: parseInt(parametros["faltas"]),
            nota: parametros["nota"]
        };
        
        if(valor) args.valor = Number(valor);

        objetoDiario[args.matricula] = args;
        
    }
}


function mostraDiario(query, id_conteudo) {
    const holder = document.querySelector(query);

    const linhas = holder.querySelectorAll("tr[data-matricula]");
    

    for(let linha of linhas){
        let matricula = linha.dataset.matricula,
            diario = DIARIOS[id_conteudo][matricula];

        
        const falta = linha.querySelector("input[name=falta]"),
            nota = linha.querySelector("input[name=nota]");
        
        falta.value = diario? diario.faltas: "";
        
        if(nota!=null){
            nota.value = diario ? diario.nota : ""; 

            if(ATIVIDADES[id_conteudo])
                nota.max = ATIVIDADES[id_conteudo].valor;
        }

    }
}



/* - - - - - - Matriculas - - - - - - */

const MATRICULAS = new Map();

async function gerarListaDiario(info, resposta_dom){
    let args;
    const holders = [];
    for (let holder_query of infos.consultarMatriculas.queries.holder){
        const holder = document.querySelector(holder_query);
        holder.innerHTML = "";
        holders.push(holder);
    }

    if (resposta_dom == null) return;

    for (let matriculasEl of resposta_dom) {
        let parametros = leParametrosXML(matriculasEl);

        let matricula = parametros["id"],
            idAluno = parametros["id-alunos"];

        let alunoEl = await requisicao("consultarAluno",{id: idAluno});
        parametros = leParametrosXML(alunoEl);
        let nome = parametros["nome"];

        args = {
            matricula: formatarNumero(matricula,11),
            matricula_raw: matricula,
            nome
        };

        MATRICULAS.set(matricula,nome);

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

/* - - - - - - Etapas - - - - - - */
function consultarEtapasPos(info, resposta_dom) {
    const holder = document.querySelector(info.queries.holder);
    holder.innerHTML = "";
    if (resposta_dom == null) return;

    for (let conteudosEl of resposta_dom) {
        let parametros = leParametrosXML(conteudosEl);

        let id_etapa = parametros["id"];

        //CRIA UMA OPTION COM O VALOR DA ETAPA E O NÚMERO DA ETAPA
        let el = "<option value=" + id_etapa + " \"> " + id-etapa + "</option>";

        holder.appendChild(el);
    }
}


/* Main */

leInfos(infos);

requisicao("consultarConteudo");
requisicao("consultarAtividade");
requisicao("consultarMatriculas");

const botaoLancarNota = document.querySelector("#lancarNota");
const botaoLancarFalta = document.querySelector("#lancarFalta");

async function lanca(link, query){
    const holder = document.querySelector(query);
    const campos = holder.querySelectorAll("tr");
    let atualizar_no_final = false;
    
    

    for (let campo of campos) {
        console.log(campo);

        let matricula = formatarNumero(campo.dataset.matricula),
            conteudo = formatarNumero(holder.dataset.conteudo),
            diario = DIARIOS[conteudo][matricula],
            config = { matricula, conteudo },
            falta = campo.querySelector("input[name=falta]").value,
            nota = campo.querySelector("input[name=nota]");
        
        let teve_alteracao = false;

        if (falta != ""){
            if (!diario || Number(falta) != diario.faltas){
                config.falta = falta;
                teve_alteracao = true;
            }
        }
        if (!(nota == "" || nota == null)){
            if (!diario || Number(nota.value) != Number(diario.nota)){
                config.nota = nota.value;
                teve_alteracao = true;
            }
        }


        
        if(teve_alteracao){
            console.log(config);
            let res = await requisicao(link, config);
            if(res.status){
                atualizar_no_final = true;
            }
        }
    }


    if (atualizar_no_final){
        let conteudo = formatarNumero(holder.dataset.conteudo);
        consultaDiario({id: conteudo});
    }
}

botaoLancarFalta.addEventListener("click",()=>{
    lanca("lancaFalta", infos.consultarMatriculas.queries.holder[1]);
});

botaoLancarNota.addEventListener("click", () => {
    lanca("lancaNota", infos.consultarMatriculas.queries.holder[0]);
});
