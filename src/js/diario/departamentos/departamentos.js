const servidor = "http://localhost:8080/app";

function consultaDepartamentos() {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(xhr.response, "application/xml");
			passaTabela(doc);
		}
	};
	xhr.open("POST", servidor  + "/diario/departamentos/consulta", true);
	xhr.send();
}

function passaTabela(doc) {
	let tabela = document.querySelector('tbody');
	let deptos = doc.getElementsByTagName('departamento');
	for(let depto of deptos){
		let novarow = document.createElement("tr");
		novarow.setAttribute("class", "criada");
		for(let x = 0; x<3; x++){
			let novacell = document.createElement("td");
			let textnode = document.createTextNode(depto.children[x].textContent);
			novacell.appendChild(textnode);
			novarow.appendChild(novacell);
		}
		tabela.appendChild(novarow);
	}
}

function addEditDelete() {
	let linhas = document.getElementsByClassName("criada");
	let newcell = document.createElement("td");
	let editBut = document.createElement("button");
	let delBut = document.createElement("button");
	editBut.innerHTML = "Editar";
	delBut.innerHTML = "Deletar";
	editBut.setAttribute("type", "button");
	delBut.setAttribute("type", "button");
	editBut.setAttribute("onclick", "editarDepto()");
	delBut.setAttribute("onclick", "deletarDepto()");
	editBut.setAttribute("id", "botaoEdit");
	delBut.setAttribute("id", "botaoDel");
	newcell.appendChild(editBut);
	newcell.appendChild(delBut);
	for (let linha of linhas) {
		linha.appendChild(newcell);
	}
	console.log(newcell);
}

function inserirDepto(){

}

function salvarDepto(){

}

function editarDepto() {

}

function deletarDepto() {

}

consultaDepartamentos();
addEditDelete();
