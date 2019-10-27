class Tabela {

    static tbody = document.querySelector("tbody");

    static limpa() {
        Tabela.tbody.innerHTML = "";
    }

    static insere(depto) {
        Tabela.tbody.appendChild(View.linhaTabela(depto));
    }

}