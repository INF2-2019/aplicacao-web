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
};

// Código baseado na primeira resposta do site: https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript
function dataFormatada(data){
    data = new Date(data);
    
    let dia  = (data.getDate()+1).toString(), // tive que colocar o +1 por algum motivo que desconheço, mas sei que sem ele não funciona
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}

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

        args = { 
            conteudo, 
            etapa, 
            id,
            data: dataFormatada(data),
            data_raw: data
        };

        let el = geraElemento(info.queries.template,args)[0];

        let botao_edit = el.querySelector(".edit"),
            botao_deletar = el.querySelector(".delete");
        
        botao_edit.addEventListener("click", () => alterarConteudo(info, el));
        botao_deletar.addEventListener("click", ()=> deletarConteudo(info, el));

        holder.appendChild(el);

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
            botao_deletar = el.querySelector(".delete");

        botao_edit.addEventListener("click", () => alterarConteudo(info, el));
        botao_deletar.addEventListener("click", () => deletarAtividade(info, el));

        holder.appendChild(el);
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
