function insere() {
  if(document.querySelector('#campus-inserir').value == "-1"){
    M.toast({ html: "Campus é obrigatório", classes: "utils erro-2 text-light-text" });
    return;
  }
  const xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.onreadystatechange = function() {
		if(this.readyState == 4) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(xhr.response, "application/xml");
			const msg = doc.getElementsByTagName("mensagem")[0];
			if(this.status == 200) {
				if(msg) M.toast({ html: msg, classes: "utils sucesso-2 text-light-text" });
				else M.toast({ html: "Departamento inserido com sucesso", classes: "utils sucesso-2 text-light-text" });
        consultaDeptos(true);
			} else {
				if(msg) M.toast({ html: msg, classes: "utils erro-2 text-light-text" });
				else M.toast({ html: "Falha ao inserir departamento", classes: "utils erro-2 text-light-text" });
			}
		}
	};
	const url = "http://localhost:8080/app/diario/departamentos/insere";
	xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type',  'application/x-www-form-urlencoded; charset=UTF-8');
	xhr.send("id-campi="+document.querySelector('#campus-inserir').value+"&nome="+document.querySelector('#nome-inserir').value);
}
