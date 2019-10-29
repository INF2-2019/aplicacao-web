function removerTurma(i) {
	fetch("http://localhost:8080/app/diario/turmas/deletar",{
		method: 'POST',
		headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
		body: "id="+m[i][2]
	})
		.then(resposta => {
			return resposta.text();
		})
		.then(text => {
			let parser = new DOMParser();
			let xml = parser.parseFromString(text, "text/xml");
			let t = xml.querySelector("erro");
			if (t != null) {
				console.error(t.textContent);
			}
			else {
				trs[i].remove();
				edit.splice(i, 1);
				editando.splice(i, 1);
				del.splice(i, 1);
				m.splice(i, 1);
				tds.splice(i, 1);
				trs.splice(i, 1);
			}
		});
}
