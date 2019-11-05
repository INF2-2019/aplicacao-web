class Controller {

	static local = "http://localhost:8080/app/diario/departamentos/";

	static consulta() {
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				const parser = new DOMParser();
				const doc = parser.parseFromString(xhr.response, "application/xml");
				const erro = doc.getElementsByTagName("erro")[0];
				if(!erro) {
					const deptos = View.deptos(doc);
					Tabela.limpa();
					for(let depto of deptos) {
						Tabela.insere(depto);
					}
				} else {
					View.erro(erro);
				}
			}
		};
		const url = Controller.local + "consulta";
		xhr.open("GET", url, true);
		xhr.send();
	}

	static insere(depto) {
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				const parser = new DOMParser();
				const doc = parser.parseFromString(xhr.response, "application/xml");
				const sucesso = doc.getElementsByTagName("sucesso")[0],
					erro = doc.getElementsByTagName("erro")[0];
				if(sucesso)
					View.sucesso(sucesso);
				else
					View.erro(erro);
				Controller.consulta();
			}
		};
		const params = "?id-campi=" + depto.idCampi + "&nome=" + depto.nome;
		const url = Controller.local + "insere" + params;
		xhr.open("POST", url, true);
		xhr.send();
	}

	static atualiza(depto) {
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				const parser = new DOMParser();
				const doc = parser.parseFromString(xhr.response, "application/xml");
				const sucesso = doc.getElementsByTagName("sucesso")[0],
					erro = doc.getElementsByTagName("erro")[0];
				if(sucesso)
					View.sucesso(sucesso);
				else
					View.erro(erro);
				Controller.consulta();
			}
		};
		const params = "?id=" + depto.id + "&id-campi=" + depto.idCampi + "&nome=" + depto.nome;
		const url = Controller.local + "atualiza" + params;
		xhr.open("POST", url, true);
		xhr.send();
	}

	static remove(id) {
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				const parser = new DOMParser();
				const doc = parser.parseFromString(xhr.response, "application/xml");
				const sucesso = doc.getElementsByTagName("sucesso")[0],
					erro = doc.getElementsByTagName("erro")[0];
				if(sucesso)
					View.sucesso(sucesso);
				else
					View.erro(erro);
				Controller.consulta();
			}
		};
		const params = "?id=" + id;
		const url = Controller.local + "remove" + params;
		xhr.open("POST", url, true);
		xhr.send();
	}

}
