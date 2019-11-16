const t = document.querySelector("#t");
let sel = document.querySelector("select");
const gen = document.querySelector("#gen");
const imp = document.querySelector("#imp");
const thead = document.querySelector(".head");

function fete(p1, p2 = {}) {
	return fetch(p1, {
		...p2,
		credentials: "include", // <-- Essa linha resolve o problema!
		mode: "no-cors", // <-- Essa linha é pra quem a primeira não resolver ou seja, o servl
	});
}

function add(r, tx) {
	const c = document.createElement("div");
	c.className = "row valign-wrapper";
	c.innerHTML = tx;
	r.appendChild(c);
}

function makeRow(disc, ns) {
	const r = document.createElement("div");
	r.className = "row";
	add(r, disc);
	let soma = 0;
	Object.entries(ns).forEach(function([naoentendioqueissofaz, t]) {
		soma += +t;
		add(r, t);
	});
	add(r, soma);
	t.appendChild(r);
}
//INSERT INTO `alunos`(`id`, `nome`, `email`, `senha`, `sexo`, `nascimento`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `cep`, `uf`, `foto`) VALUES (1,'a','b','c','m','20120618','f',2,'g','h','i',3,'j','k')
function makeOption(sel, cont, value) {
	const opt = document.createElement("option");
	opt.innerHTML = cont;
	if (value != undefined) {
		opt.setAttribute("value", value);
	}
	sel.appendChild(opt);
}

function getField(node, field) {
	return node.querySelector(field).textContent;
}
let als, mats, discs, ets, nsPadrao = {},
	htmlInic, dia;
fete("http://localhost:8080/app/diario/alunos/listar")
	.then(resposta => {
		return resposta.text();
	})
	.then(text => {
		let parser = new DOMParser();
		let xals = parser.parseFromString(text, "text/xml");
		als = xals.querySelectorAll("aluno");
		for (let i = 0; i < als.length; i++) {
			makeOption(sel, getField(als[i], "nome"), getField(als[i], "id"));
		}
		fete("http://localhost:8080/app/diario/matriculas/listar").then(resposta => {
			return resposta.text();
		}).then(text => {
			let parser = new DOMParser();
			let xmats = parser.parseFromString(text, "text/xml");
			mats = xmats.querySelectorAll("matricula");
			fete("http://localhost:8080/app/diario/disciplinas/consultar").then(resposta => {
				return resposta.text();
			}).then(text => {
				let parser = new DOMParser();
				let xdiscs = parser.parseFromString(text, "text/xml");
				discs = xdiscs.querySelectorAll("disciplina");
				fete("http://localhost:8080/app/diario/etapas/consultar").then(resposta => {
					return resposta.text();
				}).then(text => {
					let parser = new DOMParser();
					let xets = parser.parseFromString(text, "text/xml");
					ets = xets.querySelectorAll("etapa");
					fete("http://localhost:8080/app/diario/diario/diario/consulta").then(resposta => {
						return resposta.text();
					}).then(text => {
						let parser = new DOMParser();
						let xdia = parser.parseFromString(text, "text/xml");
						dia = xdia.querySelectorAll("diario");
						sel = M.FormSelect.init(document.querySelectorAll("select"))[0];
						for (let i = 0; i < ets.length; i++) {
							let id = getField(ets[i], "id");
							add(thead, "Etapa " + id);
							nsPadrao[id] = 0;
						}
						add(thead, "Total");
						htmlInic = t.innerHTML;
					});
				});
			});
		});
	});

function xmlToArray(v) {
	let ret = [];
	for (let i = 0; i < v.length; i++) {
		ret[i] = v[i].textContent;
	}
	return ret;
}
async function gerar() {
	if (!sel.getSelectedValues) {
		return;
	}
	t.innerHTML = htmlInic;
	sel = M.FormSelect.init(document.querySelectorAll("select"))[0];
	let idAl = "" + +sel.getSelectedValues()[0];
	let nmsDisc = [],
		notas = [];
	for (let i = 0; i < mats.length; i++) {
		let id = getField(mats[i], "id-alunos");
		if (id == idAl) {
			let idm = getField(mats[i], "id-disciplinas");
			for (let j = 0; j < discs.length; j++) {
				let idd = getField(discs[j], "id");
				if (idd == idm) {
					nmsDisc.push(getField(discs[j], "nome"));
					let ns = {
						...nsPadrao
					};
					await fetch("http://localhost:8080/app/diario/diario/conteudo/consulta?disciplina=" + idm)
						.then(resposta => {
							return resposta.text();
						})
						.then(text => {
							let parser = new DOMParser();
							let xatvs = parser.parseFromString(text, "text/xml");
							let atvs = xatvs.querySelectorAll("info>conteudo");
							for (let k = 0; k < atvs.length; k++) {
								let ia = getField(atvs[k], "id");
								for (let l = 0; l < dia.length; l++) {
									if (getField(dia[l], "id-conteudos") == ia) {
										let x = getField(atvs[k], "id-etapas");
										ns[x] += +getField(dia[l], "nota");
									}
								}
							}
							notas.push(ns);
						});
				}
			}
		}
	}
	for (let i = 0; i < nmsDisc.length; i++) {
		makeRow(nmsDisc[i], notas[i]);
	}
}
gen.addEventListener("click", gerar);
imp.addEventListener("click", async function(){
	await gerar();
	print();
});
