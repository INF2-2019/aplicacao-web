function consulta() {
	//cria conexão com o servlet consulta
	let xmlResult;
	let responseStatus;
	 fetch("http://localhost:8080/app/biblioteca/emprestimos/consultar")
	 .then(function(response) {
		responseStatus = response.status;
		response.text()
		.then(function(result){
			xmlResult = result;
			criatabela(responseStatus,xmlResult);
		})
	})
}
	//recebe resposta em XML e manipula o XML para criar a tabela
	 function criatabela(responseStatus,xmlResult){
		 autentica();
		var parser = new DOMParser();
		var divResposta = document.getElementById("resposta");
		let adiciona = true;
		if (responseStatus === 200) {
			var xmlDoc = parser.parseFromString(xmlResult, "text/xml");
			//cria tabela
			var tabela = "<table class=\"highlight centered responsive-table\">";
			tabela += "<thead><th>Id</th><th>Id-aluno</th><th>Id-acervo</th><th>Ações</th></thead>";
			var elementos = xmlDoc.childNodes[0].children; //HTMLColletion etapa
			for (let i = 0; i < elementos.length; i++) {
				adiciona = true;
				let linha = "<tr>";
				for (let j = 0; j < 3; j++) {
					let elemento = "";
					if(elementos[i].children[5].innerHTML != "1970-01-01"){
						adiciona = false;
					}
					if (j === 0) {
						elemento = "<td data-id=\"" + elementos[i].children[j].innerHTML + "\">";
					} else {
						elemento = "<td>"
					}
					elemento += elementos[i].children[j].innerHTML; //id/ano/valor
					elemento += "</td>";
					linha += elemento;
				}
				linha += "<td><button name=\"EditarEtapa\" class=\"edita waves-effect waves-light btn-small modal-trigger  \" href=\"#EditaForm\" id=\"Edita\" >EDITAR</button>    ";
				linha += "<button class=\"deleta waves-effect waves-light btn-small modal-trigger \" href=\"#RemoveForm\" style=\"background-color:#D32F2F\">DELETAR</button>";
				linha += "<button   class=\" infoButton info waves-effect waves-light btn-small modal-trigger utils info \" href=\"#info\" >INFO</button>";
				if(adiciona){
				linha += "<button   class=\" devolve waves-effect waves-light btn-small modal-trigger  \" href=\"#DevolveForm\" >DEVOLVER</button></td>";
				}
				linha += "</tr>"
				tabela += linha;
			}
			tabela += "</table>";

			divResposta.innerHTML = tabela;

		} else if (responseStatus === 400) {
			if (xmlResult != "") {
				var xmlDoc = parser.parseFromString(xmlResult, "text/xml");
				var resp = xmlDoc.childNodes[0]
				M.toast({
					html: resp,
					classes: "red darken-2"
				});
			}
		}
}
