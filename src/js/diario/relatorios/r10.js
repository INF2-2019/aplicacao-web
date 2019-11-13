const t = document.querySelector("#t");
let sel = document.querySelector("select");
const btn = document.querySelector("button");
const thead=document.querySelector(".head");
function fete(p1, p2 = {}) {
	return fetch(p1, {
		...p2,
		credentials: "include", // <-- Essa linha resolve o problema!
		mode: "no-cors", // <-- Essa linha é pra quem a primeira não resolver ou seja, o servl
	});
}
function add(r,tx) {
        const c = document.createElement("div");
        c.className = "row valign-wrapper";
        c.innerHTML = tx;
        r.appendChild(c);
}
function makeRow(disc, ns) {
	const r = document.createElement("div");
	r.className = "row";
	add(r,disc);
	let soma = 0;
	Object.entries(ns).forEach(function([naoentendioqueissofaz,t]) {
            soma += +t;
            add(r,t);
        });
	add(r,soma);
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
let als, mats, atvs,discs,ets,nsPadrao={},htmlInic;
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
                        mats=xmats.querySelectorAll("matricula");
			fete("http://localhost:8080/app/diario/diario/conteudos/consulta?especifico=atividade").then(resposta => {
				return resposta.text();
			}).then(text => {
				let parser = new DOMParser();
				let xatvs = parser.parseFromString(text, "text/xml");
                                atvs=xatvs.querySelectorAll("info>conteudos");
                                fete("http://localhost:8080/app/diario/disciplinas/consultar").then(resposta => {
				return resposta.text();
			}).then(text => {
				let parser = new DOMParser();
				let xdiscs = parser.parseFromString(text, "text/xml");
                                discs=xdiscs.querySelectorAll("disciplina");
                                fete("http://localhost:8080/app/diario/etapas/consultar").then(resposta => {
				return resposta.text();
			}).then(text => {
				let parser = new DOMParser();
				let xets = parser.parseFromString(text, "text/xml");
                                ets=xets.querySelectorAll("etapa");
                                fete("http://localhost:8080/app/diario/diario/diario/consultar").then(resposta => {
				return resposta.text();
			}).then(text => {
				let parser = new DOMParser();
				let xets = parser.parseFromString(text, "text/xml");
                                ets=xets.querySelectorAll("etapa");
				sel=M.FormSelect.init(document.querySelectorAll("select"))[0];
                                for(let i=0; i<ets.length; i++){
                                    let id=getField(ets[i],"id");
                                    add(thead,"Etapa "+id);
                                    nsPadrao[id]=0;
                                }
                                add(thead,"Total");
                                htmlInic=t.innerHTML;
			});
			});
			});
			});
		});
	});
function xmlToArray(v){
    let ret=[];
    for(let i=0; i<v.length; i++){
        ret[i]=v[i].textContent;
    }
    return ret;
}
btn.addEventListener("click", function() {
    if(!sel.getSelectedValues){
        return;
    }
    t.innerHTML=htmlInic;
    sel=M.FormSelect.init(document.querySelectorAll("select"))[0];
    let idAl=""+ +sel.getSelectedValues()[0];
    let nmsDisc=[],notas=[];
    for(let i=0; i<mats.length; i++){
        let id=getField(mats[i],"id-alunos");
        if(id==idAl){
            let idm=getField(mats[i],"id-disciplinas");
            for(let j=0; j<discs.length; j++){
                let idd=getField(discs[j],"id");
                if(idd==idm){
                    nmsDisc.push(getField(discs[j],"nome"));
                    let ns={...nsPadrao};
                    for(let k=0; k<atvs.length; k++){
                        if(getField(atvs[k],"id-disciplinas")==idm){
                            let x=getField(atvs[k],"id-etapas");
                            //melhorar
                            ns[x]+=+getField(atvs[k],"valor");
                        }
                    }
                    notas.push(ns);
                }
            }
        }
    }
    for(let i=0; i<nmsDisc.length; i++){
        makeRow(nmsDisc[i],notas[i]);
    }
});
