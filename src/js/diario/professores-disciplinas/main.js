const baseURL = 'http://localhost:8080/app/diario/professoresdisciplinas/';
let currentId;
let idProf
let Siap;

function postFetch(url, data) {
	return fetch(url, {
		method: 'POST',
		credentials: "include",
		body: new URLSearchParams(data),
		headers: new Headers({
			'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}),
	})
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
}

function nomeTurma(id) {
	return fetch('http://localhost:8080/app/diario/disciplinas/consultarporid?id=' + id,{
		credentials: "include",
	})
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			//pega o nome do único departamento da consulta
			console.log(xml)
			return xml.getElementsByTagName("disciplina")[0].getElementsByTagName("nome")[0].innerHTML
		})
		.catch(err => {
			console.error("Não foi possível pegar o nome do departamento. Erro: " + err)
			return id
		})
}
function nomeProfessor(id) {
	return fetch('http://localhost:8080/app/diario/professores/consultar?id=' + id,{
		credentials: "include",
	})
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			//pega o nome do único departamento da consulta
			console.log(xml)
			return xml.getElementsByTagName("professor")[0].getElementsByTagName("nome")[0].innerHTML
		})
		.catch(err => {
			console.error("Não foi possível pegar o nome do departamento. Erro: " + err)
			return id
		})
}
function idDisciplina(nome){
	console.log(nome)
	return fetch('http://localhost:8080/app/diario/disciplinas/consultar?nome='+nome,{
		credentials: "include",
	})
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			//pega o nome do único departamento da consulta
			console.log(xml)
			console.log(nome)
			return xml.getElementsByTagName("disciplina")[0].getElementsByTagName("id")[0].innerHTML
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
	currentId = e.currentTarget.parentElement.parentElement.childNodes[1].innerHTML;
})

$(document).on('click', '.delete', e => {
	Siap = idDisciplina(currentId);
	Siap.then( res =>{

		deletar(res)
	})
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
	let disci = document.querySelector("#disciplina-inserir").value;
	let prof = document.querySelector("#professor-inserir").value;
	console.log(prof)
	inserir(disci, prof);
})



$("#search").on('keyup', () => pesquisarDisciplinas())
