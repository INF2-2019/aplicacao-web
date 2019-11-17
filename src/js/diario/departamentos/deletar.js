
function deleta() {
  const xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.onreadystatechange = function() {
		if(this.readyState == 4) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(xhr.response, "application/xml");
			const msg = doc.getElementsByTagName("mensagem")[0];
			if(this.status == 200) {
				if(msg) M.toast({ html: msg, classes: "utils sucesso-2 text-light-text" });
				else M.toast({ html: "Departamento removido com sucesso", classes: "utils sucesso-2 text-light-text" });
        consultaDeptos(true);
			} else {
				if(msg) M.toast({ html: msg, classes: "utils erro-2 text-light-text" });
				else M.toast({ html: "Falha ao remover departamento", classes: "utils erro-2 text-light-text" });
			}
		}
	};
	const url = "http://localhost:8080/app/diario/departamentos/remove";
	xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type',  'application/x-www-form-urlencoded; charset=UTF-8');
	xhr.send("id="+idAtual);
}
