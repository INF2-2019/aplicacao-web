function consultaDeptos(reconsulta = false) {
	const xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.onreadystatechange = function() {
		if(this.readyState == 4) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(xhr.response, "application/xml");
			const msg = doc.getElementsByTagName("mensagem")[0];
			if(this.status == 200) {
				deptos = [];
				for(deptoEl of doc.getElementsByTagName("departamento")) {
					deptos.push({
						id: parseInt(deptoEl.children[0].textContent),
						campus: parseInt(deptoEl.children[1].textContent),
						nome: deptoEl.children[2].textContent,
						nomeCampi: deptoEl.children[3].textContent,
						cidade: deptoEl.children[4].textContent,
						uf: deptoEl.children[5].textContent
					});
				}
				atualizaTabela();
				if(!reconsulta){
				}
			} else {
				if(!reconsulta){
					if(msg) M.toast({ html: msg, classes: "utils erro-2 text-light-text" });
					else M.toast({ html: "Falha ao consultar departamentos", classes: "utils erro-2 text-light-text" });
				}
			}
		}
	};
	const url = "http://localhost:8080/app/diario/departamentos/consulta";
	xhr.open("GET", url, true);
	xhr.send();
}

function consultaCampi(){
	const xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.onreadystatechange = function() {
		if(this.readyState == 4) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(xhr.response, "application/xml");
			if(this.status == 200) {
				campi = [];
				for(campusEl of doc.getElementsByTagName("campi")) {
					campi.push({
						id: parseInt(campusEl.children[0].textContent),
						nome: campusEl.children[1].textContent,
						cidade: campusEl.children[2].textContent,
						uf: campusEl.children[3].textContent,
					});
				}
				colocarCampi();
			}
		}
	};
	const url = "http://localhost:8080/app/diario/campi/listar";
	xhr.open("GET", url, true);
	xhr.send();
}
