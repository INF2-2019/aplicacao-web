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

}