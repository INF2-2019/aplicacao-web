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
	console.log(deptos);
	for(let depto of deptos){
		console.log(depto);
		let novarow = document.createElement("tr");
		for(let x = 0; x<3; x++){
			let novacell = document.createElement("td");
			let textnode = document.createTextNode(depto.children[x].textContent);
			novacell.appendChild(textnode)
			novarow.appendChild(novacell)
		}
		tabela.appendChild(novarow);
	}
}

consultaDepartamentos();
