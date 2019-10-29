const t = document.querySelector("#table");
const add = document.querySelector("#add");
const filtros = document.querySelectorAll("#filtros input,#filtros select");
const tds = [],
	trs = [];
const edit = [],
	del = [];
const editando = [];
let sel;

function fillSelect(select, def = "") {
	if (def != "") {
		const option = document.createElement("option");
		option.innerHTML = def;
		select.appendChild(option);
	}
	cursos.forEach((item, i) => {
		const option = document.createElement("option");
		option.innerHTML = item;
		select.appendChild(option);
	});
}

function makeRow() {
	let i = trs.length;
	trs[i] = document.createElement("div");
	editando[i] = false;
	t.appendChild(trs[i]);
	tds[i] = [];
	for (let j = 0; j < 2; j++) {
		tds[i][j] = document.createElement("div");
		tds[i][j].classList.add("td");
		trs[i].appendChild(tds[i][j]);
		if (j == 0) {
			tds[i][j].innerHTML = m[i][j];
		}
		else {
			let s = cursos[m[i][j]];
			if (s == undefined) {
				tds[i][j].innerHTML = "Indefinido";
				m[i][j] = 0;
			}
			else {
				tds[i][j].innerHTML = s;
			}
		}
	}
	const td = document.createElement("div");
	td.classList.add("td");
	trs[i].appendChild(td);
	const d = document.createElement("div");
	td.appendChild(d);
	edit[i] = document.createElement("img");
	d.appendChild(edit[i]);
	edit[i].src = "edit.png";
	edit[i].addEventListener("click", function () {
		editarTurma(edit.indexOf(this));
	});
	del[i] = document.createElement("img");
	d.appendChild(del[i]);
	del[i].src = "del.png";
	del[i].addEventListener("click", function () {
		removerTurma(del.indexOf(this));
	});
}

function main() {
	add.addEventListener("click", inserirTurma);
	for (let i = 0; i < m.length; i++) {
		makeRow();
	}
	for (let i = 0; i < filtros.length; i++) {
		filtros[i].addEventListener(i == 1 ? "change" : "input", filtrarTodas);
	}
	fillSelect(filtros[1], "Todos");
	M.FormSelect.init(document.querySelectorAll('select'));
}
