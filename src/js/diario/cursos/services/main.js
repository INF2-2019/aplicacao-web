const baseURL = 'http://localhost:8080/app/diario/cursos/';
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

function nomeDepto(id) {
	return fetch('http://localhost:8080/app/diario/departamentos/consulta?id=' + id)
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			//pega o nome do único departamento da consulta
			return xml.getElementsByTagName("departamento")[0].getElementsByTagName("nome")[0].innerHTML
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
	$('#departamento-atualizar').find('option:contains(' + val + ')').prop('selected', true);
	$("#departamento-atualizar").formSelect();

	document.querySelector("#nome-atualizar").value = e.currentTarget.parentElement.parentElement.childNodes[2].innerHTML;
	document.querySelector("#horas-atualizar").value = e.currentTarget.parentElement.parentElement.childNodes[3].innerHTML;
	document.querySelector("#modalidade-atualizar").value = e.currentTarget.parentElement.parentElement.childNodes[4].innerHTML;
	M.updateTextFields();
})

$(document).on('click', '#adicionar-curso', e => {
	let departamento = document.querySelector("#departamento-inserir").value;
	let nome = document.querySelector("#nome-inserir").value;
	let horas = document.querySelector("#horas-inserir").value;
	let modalidade = document.querySelector("#modalidade-inserir").value;
	inserir(departamento, nome, horas, modalidade);
})

$(document).on('click', '#atualizar-curso', e => {
	let departamento = document.querySelector("#departamento-atualizar").value;
	let nome = document.querySelector("#nome-atualizar").value;
	let horas = document.querySelector("#horas-atualizar").value;
	let modalidade = document.querySelector("#modalidade-atualizar").value;
	atualizar(departamento, nome, horas, modalidade)
})

$("#search").on('keyup', () => pesquisarCursos())
