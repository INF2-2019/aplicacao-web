class View {
    static numerolinhas = 0;
    static deptos(doc) {
        const deptos = [];
        const docDeptos = doc.getElementsByTagName('departamento');
        for(let docDepto of docDeptos) {
            const depto = {
                id:  docDepto.children[0].textContent,
                idCampi: docDepto.children[1].textContent,
                nome: docDepto.children[2].textContent
            };
            deptos.push(depto);
        }
        return deptos;
    }

    static linhaTabela(depto) {
        const tr = document.createElement("tr");
        View.numerolinhas++;
        tr.setAttribute("id", View.numerolinhas)
        tr.appendChild(View.celulaTexto(depto.nome));
        tr.appendChild(View.celulaTexto(depto.idCampi));
        tr.appendChild(View.celulaAcoes());
        return tr;
    }

    static celulaTexto(txt) {
        const td = document.createElement("td");
        const txtNode = document.createTextNode(txt);
        td.appendChild(txtNode);
        return td;
    }

    static celulaAcoes() {
        const td = document.createElement("td");
        td.appendChild(View.botaoInfo());
        td.appendChild(View.botaoEditar());
        td.appendChild(View.botaoDeletar());
        return td;
    }

    static botaoInfo() {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("modal-trigger");
        button.setAttribute("data-target", "modal-info");
        button.style.backgroundColor = "#00B0FF";
        button.style.margin = "0 5px";
        button.innerText = "INFO";
        return button;
    }

    static botaoEditar() {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("modal-trigger");
        button.setAttribute("id", View.numerolinhas)
        button.setAttribute("onclick", "Controller.editaDepto("+View.numerolinhas+")");
        button.setAttribute("data-target", "modal-editar");
        button.style.margin = "0 5px";
        button.innerText = "EDITAR";
        return button;
    }

    static botaoDeletar() {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.setAttribute("id", View.numerolinhas)
        button.setAttribute("onclick", "Controller.deletaDepto("+View.numerolinhas+")");
        button.style.backgroundColor = "#E53935";
        button.style.margin = "0 5px";
        button.innerText = "DELETAR";
        return button;
    }
}

    

