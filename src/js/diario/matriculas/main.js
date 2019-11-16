const baseURL = 'http://localhost:8080/app/diario/matriculas/';
let currentId;

function postFetch(url, data) {
	//console.log(""+new URLSearchParams(data))
	return fetch(url, {
			method: 'POST',
			body: new URLSearchParams(data),
			credentials: "include", // <-- Essa linha resolve o problema!
			mode: "no-cors", // <-- Essa linha é pra quem a primeira não resolver ou seja, o servl
			headers: new Headers({
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}),
		})
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
}

function nomeTurma(id) {
	return fetch('http://localhost:8080/app/diario/alunos/listar', {
			credentials: "include", // <-- Essa linha resolve o problema!
			mode: "no-cors" // <-- Essa linha é pra quem a primeira não resolver ou seja, o servl
		})
		.then(response => {
			return response.text()
		})
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			let cn = xml.querySelectorAll("aluno");
			for (let i = 0; i < cn.length; i++) {
				if (+cn[i].querySelector("id").innerHTML == +id) {
					return cn[i].querySelector("nome").innerHTML;
				}
			}
		})
		.catch(err => {
			console.error("Não foi possível pegar o nome do departamento. Erro: " + err)
			return id
		})
}

function nomeTurma2(id) {
	return fetch('http://localhost:8080/app/diario/disciplinas/consultar', {
			credentials: "include", // <-- Essa linha resolve o problema!
			mode: "no-cors" // <-- Essa linha é pra quem a primeira não resolver ou seja, o servl
		})
		.then(response => {
			return response.text()
		})
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			let cn = xml.querySelectorAll("disciplina");
			for (let i = 0; i < cn.length; i++) {
				if (cn[i].querySelector("id").innerHTML == id) {
					return cn[i].querySelector("nome").innerHTML;
				}
			}
		})
		.catch(err => {
			console.error("Não foi possível pegar o nome do departamento. Erro: " + err)
			return id
		})
}

function retornaResposta(xml) {
	//console.log(xml);
	let resposta = xml.childNodes[0].innerHTML;
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

	{
		const val = e.currentTarget.parentElement.parentElement.childNodes[2].innerHTML;
		$('#turma-atualizar2').find('option:contains(' + val + ')').prop('selected', true);
		$("#turma-atualizar2").formSelect();
	}

	document.querySelector("#nome-atualizar").value = e.currentTarget.parentElement.parentElement.childNodes[3].innerHTML; {
		const val = e.currentTarget.parentElement.parentElement.childNodes[4].innerHTML;
		$('#nome-atualizar2').find('option:contains(' + val + ')').prop('selected', true);
		$("#nome-atualizar2").formSelect();
	}
	M.updateTextFields();
})

$(document).on('click', '#adicionar-disciplina', e => {
	let turma = document.querySelector("#turma-inserir").value;
	let turma2 = document.querySelector("#turma-inserir2").value;
	let nome = document.querySelector("#nome-inserir").value;
	inserir(turma, turma2, nome);
})

$(document).on('click', '#atualizar-disciplina', e => {
	let turma = document.querySelector("#turma-atualizar").value;
	let turma2 = document.querySelector("#turma-atualizar2").value;
	let nome = document.querySelector("#nome-atualizar").value;
	let nome2 = document.querySelector("#nome-atualizar2").value;
	atualizar(turma, turma2, nome, nome2);
})

$("#search").on('keyup', () => pesquisarDisciplinas())
