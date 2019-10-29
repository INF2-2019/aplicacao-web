let cursos = [],
	m = [];
cursos[0] = "Indefinido";
fetch("http://localhost:8080/app/diario/turmas/consultar")
	.then(resposta => {
		return resposta.text();
	})
	.then(text => {
		let parser = new DOMParser();
		let xml = parser.parseFromString(text, "text/xml");
		let t = xml.querySelector("turmas");
		if (t == null) {
			console.error(xml.querySelector("erro").textContent);
		}
		else {
			let ts = t.querySelectorAll("turma");
			for (let i = 0; i < ts.length; i++) {
				m[i] = [];
				let f = ["nome", "id-cursos"];
				for (let j = 0; j < 2; j++) {
					m[i][j] = ts[i].querySelector(f[j]).textContent;
				}
				m[i][2] = ts[i].querySelector("id").textContent;
			}
			fetch("http://localhost:8080/app/diario/cursos/consultar")
				.then(resposta => {
					return resposta.text();
				})
				.then(text => {
					let parser = new DOMParser();
					let xml = parser.parseFromString(text, "text/xml");
					let c = xml.querySelector("cursos");
					if (c == null) {
						console.error(xml.querySelector("erro").textContent);
					}
					else {
						let cs = c.querySelectorAll("curso");
						for (let i = 0; i < cs.length; i++) {
							let num = +cs[i].querySelector("id").textContent;
							cursos[num] = cs[i].querySelector("nome").textContent;
						}
						main();
					}
				});
		}
	});
