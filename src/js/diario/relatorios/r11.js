const t = document.querySelector("#r");
let sels = document.querySelectorAll("select");
const gen = document.querySelector("#gen");
const imp = document.querySelector("#imp");
let discs, idsEt;

function mostraBunitin(data) {
	return data.split("-").reverse().join("/");
}

function fete(p1, p2 = {}) {
	return fetch(p1, {
		...p2,
		credentials: "include", // <-- Essa linha resolve o problema!
		mode: "no-cors", // <-- Essa linha é pra quem a primeira não resolver ou seja, o servl
	});
}

function makeOption(sel, cont, value) {
	const opt = document.createElement("option");
	opt.innerHTML = cont;
	if (value != undefined) {
		opt.setAttribute("value", value);
	}
	sel.appendChild(opt);
}

function xmlToArray(v) {
	let ret = [];
	for (let i = 0; i < v.length; i++) {
		ret[i] = v[i].textContent;
	}
	return ret;
}
fete("http://localhost:8080/app/diario/disciplinas/consultar")
	.then(resposta => {
		return resposta.text();
	})
	.then(text => {
		let parser = new DOMParser();
		let xmlDisc = parser.parseFromString(text, "text/xml");
		//console.log(xmlDisc);
		discs = xmlDisc.querySelectorAll("disciplina");
		for (let i = 0; i < discs.length; i++) {
			makeOption(sels[0], getField(discs[i], "nome"), getField(discs[i], "id"));
		}
		M.FormSelect.init(document.querySelectorAll("select:first-child"));
		fete("http://localhost:8080/app/diario/etapas/consultar")
			.then(resposta => {
				return resposta.text();
			})
			.then(text => {
				let parser = new DOMParser();
				let xmlEt = parser.parseFromString(text, "text/xml");
				//console.log(xmlEt);
				idsEt = xmlToArray(xmlEt.querySelectorAll("id"));
				for (let i = 0; i < idsEt.length; i++) {
					makeOption(sels[1], idsEt[i]);
				}
				sels = M.FormSelect.init(document.querySelectorAll("select"));
			});
	});

function getField(node, field) {
	return node.querySelector(field).textContent;
}

async function gerar() {
	t.innerHTML = "";
	sels = M.FormSelect.init(document.querySelectorAll("select"));
	let et = sels[1].getSelectedValues()[0],
		disc = sels[0].getSelectedValues()[0];
	let ps = [];
	for (let i = 0; i < discs.length; i++) {
		await fete("http://localhost:8080/app/diario/diario/conteudo/consulta?disciplina=" + getField(discs[i], "id"))
			.then(resposta => {
				return resposta.text();
			})
			.then(text => {
				let parser = new DOMParser();
				let xmlCont = parser.parseFromString(text, "text/xml");
				//console.log(xmlCont);
				conts = xmlCont.querySelectorAll("conteudo");
				for (let j = 0; j < conts.length; j++) {
					if (getField(conts[j], "id-etapas") == et) {
						let p = document.createElement("p");
						let dt = getField(conts[j], "data")
						p.innerHTML = "<strong>" + mostraBunitin(dt) + ": </strong>" + getField(conts[j], "conteudos");
						p.dt = +new Date(dt);
						ps.push(p);
					}
				}
			});
	}
	ps.sort(function(a, b) {
		return a.dt - b.dt;
	});
	for (let i = 0; i < ps.length; i++) {
		t.appendChild(ps[i]);
	}
}
gen.addEventListener("click", gerar);
imp.addEventListener("click", async function(){
	await gerar();
	print();
});
