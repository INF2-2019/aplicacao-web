const baseURL = 'http://localhost:8080/app/diario/disciplinas/';
let currentId;

function postFetch(url, data) {
	return fetch(url, {
		method: 'POST',
		body: new URLSearchParams(data),
		headers: new Headers({
			'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}),
	})
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
}

function nomeTurma(id) {
	return fetch('http://localhost:8080/app/diario/turmas/consultar?id=' + id)
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			//pega o nome do único departamento da consulta
			console.log(xml)
			return xml.getElementsByTagName("turma")[0].getElementsByTagName("nome")[0].innerHTML
		})
		.catch(err => {
			console.error("Não foi possível pegar o nome do departamento. Erro: " + err)
			return id
		})
}

function retornaResposta(xml) {
	let resposta = xml.childNodes[0].children[0].innerHTML;
	return resposta
}

$(document).on('click', '.deletar', e => {
	e.preventDefault;
	currentId = e.currentTarget.parentElement.parentElement.childNodes[0].innerHTML;
})

$(document).on('click', '.editar', e => {
	e.preventDefault;
	currentId = e.currentTarget.parentElement.parentElement.childNodes[0].innerHTML;

	// colocar a opção no atual no select
	const val = e.currentTarget.parentElement.parentElement.childNodes[1].innerHTML;
	$('#turma-atualizar').find('option:contains(' + val + ')').prop('selected', true);
	$("#turma-atualizar").formSelect();

	document.querySelector("#nome-atualizar").value = e.currentTarget.parentElement.parentElement.childNodes[2].innerHTML;
	document.querySelector("#horas-atualizar").value = e.currentTarget.parentElement.parentElement.childNodes[3].innerHTML;
	M.updateTextFields();
})

$(document).on('click', '#adicionar-disciplina', e => {
	let turma = document.querySelector("#turma-inserir").value;
	let nome = document.querySelector("#nome-inserir").value;
	let horas = document.querySelector("#horas-inserir").value;
	inserir(turma, nome, horas);
})

$(document).on('click', '#atualizar-disciplina', e => {
	let turma = document.querySelector("#turma-atualizar").value;
	let nome = document.querySelector("#nome-atualizar").value;
	let horas = document.querySelector("#horas-atualizar").value;
	atualizar(turma, nome, horas)
})

$("#search").on('keyup', () => pesquisarDisciplinas())
