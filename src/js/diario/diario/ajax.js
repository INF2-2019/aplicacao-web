const prefixo = "http://localhost:8080/app";

async function pegaTabela(link,parametros,isPost=false) {
    /*
    
        # Função para fazer requisição com o fetch, feita com o proposito de evitar repetição

        link: String             # String com o link a se fazer a requisição
        parametros: Object       # Objeto com os parametros a serem passado na requisição
        isPost: Boolean          # Boleano que define se o método de requisição é post (setado como false por padrão) 

    */

    let config = {
        method: isPost? "POST": "GET"
    };

    if(isPost){ // Parametros para o metodo POST
        config.body = new URLSearchParams(parametros);
        config.headers = new Headers({ 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    } else { // Parametros para o metodo GET
        let query = [];
        for(let nome in parametros)
            query.push(nome+"="+parametros[nome]);
        link+= '?'+query.join("&");
    }

    let request = await fetch(link, config); 
    return request.text();
}

function alertarStatus({ status, mensagem, causa }) {
    let classe = status ? "sucesso" : "erro";
    M.toast({ html: mensagem, classes: classe });
    if (causa) console.log((status ? "SUCESSO" : "ERRO") + ": " + causa);
}

function analiseXML(xml_string, output_status = true) {
    let resposta = {};
    const parser = new DOMParser(),
        doc = parser.parseFromString(xml_string, "text/xml");

    // Se resposta não for um status
    if (doc.querySelector("info > erro, info > sucesso") == null) {
        const info = doc.querySelector("info");
        if (info.children.length >= 1)
            return [...info.children]; // Retorna vetor com todos os filhos
        else
            return null;
    }

    // As seguintes linhas só serão executadas caso a resposta seja um status (erro ou sucesso)

    // Variavel status é true caso o status seja sucesso e false se for erro
    let status = (doc.querySelector("info > erro") == null);
    resposta.status = status;

    // Já que causa é opcional
    if (doc.querySelector("info > * > causa") != null) {
        let causa = doc.querySelector("info > * > causa").innerHTML;
        resposta.causa = causa;
    }

    // Independentemente do status, sempre haverá uma mensagem
    let mensagem = doc.querySelector("info > * > mensagem").innerHTML;
    resposta.mensagem = mensagem;

    if (output_status)
        alertarStatus(resposta);

    return resposta;
}

function geraElemento(query, args) {
    let template = document.querySelector(query).innerHTML;
    template = template.replace(/{{\1([^}]*)}}/g, (a, nome) => (nome in args) ? args[nome] : "");
    return [...$(template)];
}

async function requisicao(info, parametros) {
    if (info.constructor === String) {
        if (infos[info]) return requisicao(infos[info], parametros);
        else return null;
    }

    if (info.alerta && !window.confirm(info.alert))
        return null;
    
    const link = info.link;
    let params = {},
        inputs;

    if (info.parametros_default)
        params = Object.assign(params, info.parametros_default);
    if(parametros)
        params = Object.assign(params, parametros);        

    if (info.queries && info.queries.inputs) {
        inputs = document.querySelectorAll(info.queries.inputs);
        inputs.forEach(input => input.value!=""? params[input.name] = input.value:undefined);
    }

    const resposta = await pegaTabela(prefixo + link, params),
        analise = analiseXML(resposta);

    if (analise && analise.status === true) { // Se deu certo
        if (inputs != undefined)
            inputs.forEach(input => input.value = ""); // Limpa os input
    }


    if (info.callback) {
        info.callback(info, analise);
    }
    return analise;
}

function setaAtivadorUnico(info_insere, info_ativador) {
    let elementos = document.querySelectorAll(info_ativador.query);
    for (let elemento of elementos)
        elemento.addEventListener(info_ativador.evento, () => requisicao(info_insere));
}

function leInfos(infos) {
    for (let nome in infos) {
        let info_insere = infos[nome];

        if (info_insere.ativadores) {
            let info_ativador = info_insere.ativadores;
            if (info_ativador.constructor == Object)
                setaAtivadorUnico(info_insere, info_ativador);
            else if (info_ativador.constructor == Array)
                info_ativador.forEach(i_a => setaAtivadorUnico(info_insere, i_a));
        }
    }
}