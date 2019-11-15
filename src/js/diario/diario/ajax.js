const prefixo = "http://localhost:8080/app";

async function pegaTabela(link,parametros,isPost=false) {
    /*
    
        # Função para fazer requisição com o fetch, feita com o proposito de evitar repetição

        link: String             # String com o link a se fazer a requisição
        parametros: Object       # Objeto com os parametros a serem passado na requisição
        isPost: Boolean          # Boleano que define se o método de requisição é post (setado como false por padrão) 

    */

    let config = {
        method: isPost? "POST": "GET",
        credentials: "include"
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
    let resposta = null;
    const parser = new DOMParser(),
        doc = parser.parseFromString(xml_string, "text/xml");

    if (doc.querySelector("erro,sucesso")!=null){
        resposta = {};
        // As seguintes linhas só serão executadas caso a resposta seja um status (erro ou sucesso)

        // Variavel status é true caso o status seja sucesso e false se for erro
        let status = (doc.querySelector("erro") == null);
        resposta.status = status;

        // Já que causa é opcional
        if (doc.querySelector("erro > causa, sucesso > causa") != null) {
            let causa = doc.querySelector("erro > causa, sucesso > causa").innerHTML;
            resposta.causa = causa;
        }

        // Independentemente do status, sempre haverá uma mensagem
        
        let mensagem = doc.querySelector("erro > mensagem, sucesso > mensagem").innerHTML;
        resposta.mensagem = mensagem;
        
        if (output_status)
            alertarStatus(resposta);
    }

    const info = doc.children[0];

    
    
    if (info.querySelector(":not(erro):not(sucesso):not(mensagem):not(causa)")==null)
        return resposta;
    else if (info.children.length >= 1) 
        return [...info.children]; // Retorna vetor com todos os filhos
    else
        return null;
}

function geraElemento(query, args) {
    let template = document.querySelector(query).innerHTML;
    template = template.replace(/{{\1([^}]*)}}/g, (a, nome) => (nome in args) ? args[nome] : "");
    return [...$(template)];
}

async function requisicao(info, parametros, config={}) {
    if (info.constructor === String) {
        if (infos[info]) return requisicao(infos[info], parametros, config);
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
        analise = analiseXML(resposta, config.output!==false);

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

function formatarNumero(num, digitos) {
    if(typeof num === "string"){
        num = Number(num);
        if(digitos===undefined) return num;
    }

    let str = num + "";
    if (str.length < digitos) {
        let faltam = digitos - str.length;
        for (let i = 0; i < faltam; i++)
            str = "0" + str;
    }
    return str;
}

// Código baseado na primeira resposta do site: https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript
function dataFormatada(data) {
    let pedacos = data.split("-");
    pedacos = pedacos.map(x => parseInt(x));
    data = new Date(pedacos[0], pedacos[1] - 1, pedacos[2]);

    let dia = (data.getDate()).toString(), // tive que colocar o +1 por algum motivo que desconheço, mas sei que sem ele não funciona
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
}