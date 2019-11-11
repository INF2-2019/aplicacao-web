const baseURL = 'http://localhost:8080/app/biblioteca/reservas/';
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


function idNome(val) {
	return fetch('http://localhost:8080/app/diario/alunos/consultar?id='+val)
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			console.log(xml);
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
$(document).on('click', '.emprestar', e => {
	e.preventDefault;
	currentId = e.currentTarget.parentElement.parentElement.childNodes[0].innerHTML;
	emprestar()
})
$(document).on('click', '.editar', e => {
	e.preventDefault;
	currentId = e.currentTarget.parentElement.parentElement.childNodes[0].innerHTML;

	// colocar a opção no atual no select
	console.log(e.currentTarget.parentElement.parentElement.childNodes[0])
	const val = e.currentTarget.parentElement.parentElement.childNodes[1].innerHTML;
	const id = e.currentTarget.parentElement.parentElement.childNodes[0].innerHTML;
	let nome = idNome(val)
	nome.then( valor =>{
		console.log(valor)
	$('#aluno-atualizar').find('option:contains(' + valor + ')').prop('selected', true);
	$("#aluno-atualizar").formSelect();
	$("#emprestou-atualizar")
	fetch('http://localhost:8080/app/biblioteca/reservas/consultarporid?id=' +id)
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			console.log(xml)
			let valorEmprestou;
			if(xml.getElementsByTagName("reserva")[0].getElementsByTagName("emprestou")[0].innerHTML == "false"){
				valorEmprestou = "Não"
			}else{
				valorEmprestou = "Sim"
			}
			$('#emprestou-atualizar').find('option:contains(' + valorEmprestou + ')').prop('selected', true);
			$("#emprestou-atualizar").formSelect();
			 document.querySelector("#acervo-atualizar").value = xml.getElementsByTagName("reserva")[0].getElementsByTagName("id-acervo")[0].innerHTML
			 document.querySelector("#data-reserva-atualizar").value =  xml.getElementsByTagName("reserva")[0].getElementsByTagName("data-reserva")[0].innerHTML
			 document.querySelector("#tempo-espera-atualizar").value = xml.getElementsByTagName("reserva")[0].getElementsByTagName("tempo-espera")[0].innerHTML
			 document.querySelector("#emprestou-atualizar").value =  xml.getElementsByTagName("reserva")[0].getElementsByTagName("emprestou")[0].innerHTML
			 
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
	let dataReserva = document.querySelector("#data-reserva-inserir").value;
	let tempoEspera = document.querySelector("#tempo-espera-inserir").value
	let emprestou = $('#emprestou-inserir').find(":selected").text();
	inserir(aluno, acervo, dataReserva, tempoEspera,emprestou);
})

$(document).on('click', '#atualizar-disciplina', e => {
	let aluno = document.querySelector("#aluno-atualizar").value;
	let acervo = document.querySelector("#acervo-atualizar").value;
	let dataReserva = document.querySelector("#data-reserva-atualizar").value;
	let tempoEspera = document.querySelector("#tempo-espera-atualizar").value
	let emprestou = $('#emprestou-atualizar').find(":selected").text();
	console.log(emprestou)
	atualizar(aluno, acervo, dataReserva, tempoEspera,emprestou);
})

$("#search").on('keyup', () => pesquisarDisciplinas())
