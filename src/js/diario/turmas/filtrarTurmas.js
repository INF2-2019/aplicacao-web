function relev(q, t) {
	q = q.toLowerCase();
	t = t.toLowerCase();
	if (q == t) {
		return 2;
	}
	else {
		let io = t.indexOf(q);
		if (io == 0) {
			return 1;
		}
		else {
			return 0;
		}
	}
}

function filtrar(j) {
	let r = 0;
	for (let k = 0; k < filtros.length; k++) {
		if (k == 1) {
			if (filtros[k].value != "Todos") {
				if (cursos[m[j][k]] != filtros[k].value) {
					r = -1;
					break;
				}
			}
		}
		else {
			if (filtros[k].value != "") {
				const r2 = relev(filtros[k].value, m[j][k]);
				if (r2 == 0) {
					r = -1;
					break;
				}
				r += r2;
			}
		}
	}
	if (r == -1) {
		trs[j].classList.add("oculto");
	}
	else {
		trs[j].classList.remove("oculto");
		trs[j].style.order = 1000 - r;
	}
}

function filtrarTodas() {
	for (let j = 0; j < m.length; j++) {
		filtrar(j);
	}
}
