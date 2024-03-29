const baseURL = 'http://localhost:8080/app/biblioteca/emprestimos/';
let currentId;

function postFetch(url, data) {
	return fetch(url, {
		credentials: "include", 
		method: 'POST',
		body: new URLSearchParams(data),
		headers: new Headers({
			'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}),
	})
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
}
function AcervoNome(id){
	return fetch('http://localhost:8080/app/biblioteca/acervo/consultar?id='+id,{
			credentials: "include",
		})
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			console.log(xml);
			let acervo = xml.getElementsByTagName('acervo')[0]
			let item = acervo.getElementsByTagName('item')[0]
			return item.getElementsByTagName("nome")[0].innerHTML

		})
}

function idNome(val) {
	return fetch('http://localhost:8080/app/biblioteca/alunos/consultar?id='+val, {
		credentials: "include",
	})
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			return xml.getElementsByTagName('aluno')[0].getElementsByTagName('nome')[0].innerHTML
		})
}

function retornaResposta(xml) {
	let resposta = xml.childNodes[0].children[0].innerHTML;
	return resposta
}
$(document).on('click','.info', e =>{
	e.preventDefault;
	currentId = e.currentTarget.parentElement.parentElement.childNodes[0].innerHTML;
	info()
})
$(document).on('click', '.deletar', e => {
	e.preventDefault;
	currentId = e.currentTarget.parentElement.parentElement.childNodes[0].innerHTML;
})
$(document).on('click', '.devolver', e => {
	e.preventDefault;
	currentId = e.currentTarget.parentElement.parentElement.childNodes[0].innerHTML;
	devolver()
})
$(document).on('click', '.editar', e => {
	e.preventDefault;
	currentId = e.currentTarget.parentElement.parentElement.childNodes[0].innerHTML;

	// colocar a opção no atual no select
	const val = e.currentTarget.parentElement.parentElement.childNodes[1].innerHTML;
	const valAc = e.currentTarget.parentElement.parentElement.childNodes[2].innerHTML;
	const id = e.currentTarget.parentElement.parentElement.childNodes[0].innerHTML;
	let nome = idNome(val)
	nome.then( valor =>{
	$('#aluno-atualizar').find('option:contains(' + valor + ')').prop('selected', true);
	$("#aluno-atualizar").formSelect();
	$('#acervo-atualizar').find('option:contains(' + valAc + ')').prop('selected', true);
	$("#acervo-atualizar").formSelect();
	fetch('http://localhost:8080/app/biblioteca/emprestimos/consultarporid?id=' +id , {
		credentials: "include",
	})
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			 document.querySelector("#data-emprestimo-atualizar").value =  xml.getElementsByTagName("emprestimo")[0].getElementsByTagName("data-emprestimo")[0].innerHTML
			 document.querySelector("#data-previa-devolução-atualizar").value = xml.getElementsByTagName("emprestimo")[0].getElementsByTagName("data-prev-devol")[0].innerHTML
			 document.querySelector("#data-devolução-atualizar").value =  xml.getElementsByTagName("emprestimo")[0].getElementsByTagName("data-devolucao")[0].innerHTML
			 document.querySelector("#multa-atualizar").value  =  xml.getElementsByTagName("emprestimo")[0].getElementsByTagName("multa")[0].innerHTML
		})
		.catch(err => {
			console.error("Não foi possível pegar o nome do departamento. Erro: " + err)
		})
	
	M.updateTextFields();
	})
})

$(document).on('click', '#adicionar-disciplina', e => {
	let aluno = document.querySelector("#aluno-inserir").value;
	let acervo = document.querySelector("#acervo-inserir").value;
	let dataEmprestimo = document.querySelector("#data-emprestimo-inserir").value;
	let dataPrev = document.querySelector("#data-previa-devolução-inserir").value
	let dataDev = document.querySelector("#data-devolução-inserir").value
	let multa = document.querySelector("#multa-inserir").value
	inserir(aluno, acervo, dataEmprestimo, dataPrev,dataDev,multa);
})

$(document).on('click', '#atualizar-disciplina', e => {
	let aluno = document.querySelector("#aluno-atualizar").value;
	let acervo = document.querySelector("#acervo-atualizar").value;
	let dataEmprestimo = document.querySelector("#data-emprestimo-atualizar").value;
	let dataPrev = document.querySelector("#data-previa-devolução-atualizar").value
	let dataDev = document.querySelector("#data-devolução-atualizar").value
	let multa = document.querySelector("#multa-atualizar").value
	atualizar(aluno, acervo, dataEmprestimo, dataPrev,dataDev,multa);
})

$("#search").on('keyup', () => pesquisarDisciplinas())
