function inserirTurma() {
	let tam = m.length;
	let id = m.length > 0 ? +m[m.length - 1][2] + 1 : 1;
	m.push(["", 0, id]);
	makeRow();
	fetch("http://localhost:8080/app/diario/turmas/inserir",{
		method: 'POST',
		headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
		body: "id=" + id + "&idCursos=0&nome="
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
				editarTurma(tam);
			}
		});
}
