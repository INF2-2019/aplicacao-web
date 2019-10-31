const deptos = Controller.consulta();

document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.modal');
	var instances = M.Modal.init(elems);
});

document.querySelector("#modal-adicionar button").onclick = function() {
	const depto = {
		nome: document.querySelector("#adicionar-nome").value,
		idCampi: document.querySelector("#adicionar-id-campi").value
	}
	Controller.insere(depto);
	document.querySelector("#adicionar-nome").value = "";
	document.querySelector("#adicionar-id-campi").value = "";
}

let idEditar;

document.querySelector("#modal-editar button").onclick = function() {
	const depto = {
		id: idEditar,
		nome: document.querySelector("#editar-nome").value,
		idCampi: document.querySelector("#editar-id-campi").value
	}
	Controller.atualiza(depto);
	document.querySelector("#editar-nome").value = "";
	document.querySelector("#editar-id-campi").value = "";
}