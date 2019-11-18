const baseURL = 'http://localhost:8080/app/diario/turmas/';
let currentId;

function postFetch(url, data={},m="POST") {
	//console.log(""+new URLSearchParams(data))
	let obj={
		method: m,
		credentials: "include", // <-- Essa linha resolve o problema!
		mode: "no-cors", // <-- Essa linha é pra quem a primeira não resolver ou seja, o servl
		headers: new Headers({
			'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}),
	};
        if(m=="POST") obj.body=new URLSearchParams(data);
	return fetch(url, obj)
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
}

function nomeTurma(id) {
	return postFetch('http://localhost:8080/app/diario/cursos/consultar',{},"GET")
		.then(xml => {
			let cn=xml.querySelectorAll("curso");
			for(let i=0; i<cn.length; i++){
				if(cn[i].querySelector("id").innerHTML==id){
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

	document.querySelector("#nome-atualizar").value = e.currentTarget.parentElement.parentElement.childNodes[2].innerHTML;
	M.updateTextFields();
})

$(document).on('click', '#adicionar-disciplina', e => {
	let turma = document.querySelector("#turma-inserir").value;
	let nome = document.querySelector("#nome-inserir").value;
	inserir(turma, nome);
})

$(document).on('click', '#atualizar-disciplina', e => {
	let turma = document.querySelector("#turma-atualizar").value;
	let nome = document.querySelector("#nome-atualizar").value;
	atualizar(turma, nome)
})

$("#search").on('keyup', () => pesquisarDisciplinas())
