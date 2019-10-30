class Controller {

    static local = "http://localhost:8080/app/diario/departamentos/";

    static consulta() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(xhr.response, "application/xml");
                const deptos = View.deptos(doc);
                Tabela.limpa();
                for(let depto of deptos) {
                    Tabela.insere(depto);
                }
            }
        };
        const url = Controller.local + "consulta";
        xhr.open("GET", url, true);
        xhr.send();
    }

    static adicionarDepto(){
        const depto = {
            id: Tabela.tbody.children.length+1,
            idCampi: document.querySelector('#campus_input').value,
            nome: document.querySelector('#name_input').value
        };
        Tabela.insere(depto);
        const xhr = new XMLHttpRequest();
        const url = Controller.local + "insere";
        const enviado = "?id-campi="+depto.idCampi+"&nome="+depto.nome;
        xhr.open("GET", url + enviado, true);
        xhr.send();
    }
    
    static deletaDepto(id){
        const xhr = new XMLHttpRequest();
        const url = Controller.local + "remove";
        const enviado = "?id="+document.getElementById(id).getAttribute("Id");
        xhr.open("GET", url + enviado, true);
        xhr.send();
        Tabela.tbody.removeChild(document.getElementById(id));
    }
    static editaDepto(id){

    }

}
