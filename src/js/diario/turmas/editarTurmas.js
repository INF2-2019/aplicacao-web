function editarTurma(i) {
	if (editando[i]) {
		const s2 = tds[i][0].firstChild.value;
		tds[i][0].textContent = s2;
		m[i][0] = s2;
		sel = M.FormSelect.init(trs[i].querySelectorAll('select'))[0];
		const s = sel.getSelectedValues()[0];
		tds[i][1].innerHTML = s;
		m[i][1] = cursos.indexOf(s);
		edit[i].src = "edit.png";
		editando[i] = false;
		filtrar(i);
		fetch("http://localhost:8080/app/diario/turmas/alterar",{
			method: 'POST',
			headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
			body: "id=" + m[i][2] + "&idCursos=" + m[i][1] + "&nome=" + m[i][0]
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
			});
	}
	else {
		for (let j = 0; j < 2; j++) {
			let el;
			if (j == 1) {
				el = document.createElement("div");
				let v = tds[i][j].textContent;
				el.className = "input-field";
				const select = document.createElement("select");
				fillSelect(select);
				let option, opts = select.options;
				for (let k = 0; k < opts.length; k++) {
					if (opts[k].textContent == v) {
						option = opts[k];
						break;
					}
				}
				option.setAttribute("selected", "");
				el.appendChild(select);
				setTimeout(function () {
					sel = M.FormSelect.init(el.querySelectorAll('select'))[0];
				}, 0);
			}
			else {
				el = document.createElement("input");
				let txt = tds[i][j].innerHTML;
				if (j == 0) {
					setTimeout(function () {
						el.focus();
					}, 0);
				}
				el.value = txt;
			}
			tds[i][j].innerHTML = "";
			tds[i][j].appendChild(el);
		}
		edit[i].src = "ok.png";
		editando[i] = true;
	}
}
