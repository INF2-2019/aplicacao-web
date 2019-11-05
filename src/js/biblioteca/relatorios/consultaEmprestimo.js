function consulta() {
	//cria conexão com o servlet consulta
	var xhttp = new XMLHttpRequest(),
		method = "GET",
		url = "http://localhost:8080/app/biblioteca/emprestimos/consultar";
	xhttp.open(method, url, true);
	var parser = new DOMParser();
	var divResposta = document.getElementById("resposta");

	//recebe resposta em XML e manipula o XML para criar a tabela
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
			var responseStr = xhttp.responseText;
			var xmlDoc = parser.parseFromString(responseStr, "text/xml");

			//cria tabela
            var tabela = "<table class=\"highlight centered responsive-table\">";
            tabela += "<thead><th>Id</th><th>Id do Aluno</th><th>Id da Obra</th><th>Data de Empréstimo</th><th>Data Prevista de Devolução</th><th>Data de Devolução</th><th>Multa</th></thead>";

            var elementos = xmlDoc.childNodes[0].children; //HTMLColletion etapa
            console.log(elementos);

            for(let i = 0; i < elementos.length; i++){
                let linha = "<tr>";
                
                for (let j = 0; j < (elementos[i].children.length); j++) {
                    let elemento = "";
                
                    if (j === 0) {
                        elemento = "<td data-id=\"" + elementos[i].children[j].innerHTML + "\">";
                    }
                    elemento = "<td>"
                    elemento += elementos[i].children[j].innerHTML; 
                    elemento += "</td>";
                    
                    linha += elemento;
                }
                

                linha += "</tr>"
                tabela += linha;
            }

            divResposta.innerHTML += tabela;
            
			

		} else if (xhttp.status === 400) {
			var responseStr = xhttp.responseText;
			if (responseStr != "") {
				var xmlDoc = parser.parseFromString(responseStr, "text/xml");
				var resp = xmlDoc.childNodes[0].children[0].innerHTML;
				M.toast({
					html: resp,
					classes: "red darken-2"
				});
			}
		}
	};
	xhttp.send();
}

document.getElementById('BotaoImprime').onclick = function() {
	let divResposta = document.getElementById("resposta");
	divResposta.style.paddingLeft = 0;
	divResposta.style.paddingRight = 0;
	window.print();
	divResposta.style.paddingLeft = "10%";
	divResposta.style.paddingRight = "10%";
};