M.AutoInit();
let deptosConsultados;
const LABEL_ATRIBUTOS = 'class="primary-text text-lighten-1 short col s12" style="font-size:18px;"'
function criaTabela(elementos) {
	const tabela = document.createElement("table")
	deptosConsultados = 0
	elementos = elementos.childNodes[0].children
	tabela.classList.add("highlight")
	let emprestou;
	for (let i = 0; i < elementos.length; i++) {
		emprestou = true;
		const linha = document.createElement("tr");
		while(elementos[i].children[1].innerHTML.length != 11){
			elementos[i].children[1].innerHTML = '0' + elementos[i].children[1].innerHTML
		}
		if(elementos[i].children[5].innerHTML=="false"){
			emprestou = false
		}
		for (let j = 0; j < 4; j++) {
			const elemento = document.createElement("td")
			elemento.classList.add(elementos[i].children[j].nodeName)

			
				elemento.innerHTML = elementos[i].children[j].innerHTML
			

			linha.appendChild(elemento)
		}
		const colunaAcoes = document.createElement("td")

		const botaoEditar = criarBotaoEditar()
		const botaoDeletar = criarBotaoDeletar()
		const botaoInfo = criaBotaoinfo()
		let botaoEmprestar = null
		if(!emprestou)  botaoEmprestar = CriaBotaoEmprestar()

		colunaAcoes.appendChild(botaoEditar)
		colunaAcoes.appendChild(botaoDeletar)
		colunaAcoes.appendChild(botaoInfo)
		if(!emprestou) colunaAcoes.appendChild(botaoEmprestar)
	
		linha.appendChild(colunaAcoes)

		tabela.appendChild(linha)
	}
	containerTabela = document.querySelector("#disciplinas");
	containerTabela.innerHTML = tabela.innerHTML;
}

function criarBotaoEditar() {
	const edit = document.createElement("a")
	edit.setAttribute("href", "#modal-atualizar")
	edit.classList = "btn-small secondary editar modal-trigger"
	edit.style = "margin-right: 20px"

	/*const iconEdit = document.createElement("i")
	iconEdit.classList = "material-icons small"
	iconEdit.innerHTML = "edit"

	edit.appendChild(iconEdit)*/
	edit.appendChild(document.createTextNode("EDITAR"))
	return edit
}
function info(){
	let infoContainer = document.querySelector('#informacoes')
	infoContainer.innerHTML = ''
	fetch('http://localhost:8080/app/biblioteca/reservas/consultarporid?id=' +currentId)
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			var raiz = xml.firstElementChild;
			var elementos = raiz.children;
			var dados = elementos[0].children
			infoContainer.innerHTML += "<label " + LABEL_ATRIBUTOS + " id=\"idAluno\"> id: " + dados[0].textContent + "</label>";
			infoContainer.innerHTML += "<label " + LABEL_ATRIBUTOS + " id=\"idAluno\"> id-aluno: " + dados[1].textContent + "</label>";
			infoContainer.innerHTML += "<label " + LABEL_ATRIBUTOS + " id=\"idAcervo\"> id-acervo: " + dados[2].textContent + "</label>";
			infoContainer.innerHTML += "<label " + LABEL_ATRIBUTOS + " id=\"dataEmprestimo\"> Data da Reserva: " + dados[3].textContent + "</label>";
			infoContainer.innerHTML += "<label " + LABEL_ATRIBUTOS + " id=\"dataPrev\"> Tempo Espera: " + dados[4].textContent + " Dias</label>";
			infoContainer.innerHTML += "<label " + LABEL_ATRIBUTOS + " id=\"dataDev\"> emprestou: " + dados[5].textContent + "</label>";
		})
		.catch(err => {
			console.error("Não foi possível pegar o nome do departamento. Erro: " + err)
		})
	
}
function criarBotaoDeletar() {
	const deletar = document.createElement("a")
	deletar.setAttribute("href", "#modal-deletar")
	deletar.classList = "btn-small utils erro-2 deletar modal-trigger"
	deletar.appendChild(document.createTextNode("DELETAR"))
	return deletar
}
function criaBotaoinfo(){
	const info = document.createElement("a");
	info.setAttribute("href","#modal-info")
	info.classList = "btn-small utils erro-2 info modal-trigger"
	info.style = "margin-left: 20px"
	info.appendChild(document.createTextNode("INFO"))
	return info
}
function CriaBotaoEmprestar(params) {
	const emprestar = document.createElement("a");
	emprestar.classList = "btn-small  emprestar primary darker-4"
	emprestar.style = "margin-left: 20px"
	emprestar.appendChild(document.createTextNode("EMPRESTAR"))
	return emprestar
}
function limpaInputs(inputType) {
	if (inputType == 'inserir') {
		let aluno = document.querySelector("#aluno-inserir").value = '';
	let acervo = document.querySelector("#acervo-inserir").value = '';
	let dataEmprestimo = document.querySelector("#data-emprestimo-inserir").value = '';
	let dataPrev = document.querySelector("#data-previa-devolução-inserir").value = ''
	let dataDev = document.querySelector("#data-devolução-inserir").value = ''
	let multa = document.querySelector("#multa-inserir").value = ''
	}
	else if (inputType == 'atualizar') {
		let aluno = document.querySelector("#aluno-atualizar").value = '';
	let acervo = document.querySelector("#acervo-atualizar").value = '';
	let dataEmprestimo = document.querySelector("#data-emprestimo-atualizar").value = '';
	let dataPrev = document.querySelector("#data-previa-devolução-atualizar").value = ''
	let dataDev = document.querySelector("#data-devolução-atualizar").value = ''
	let multa = document.querySelector("#multa-atualizar").value = ''
	}

	M.updateTextFields();
}

function preencherInput() {
	fetch('http://localhost:8080/app/diario/alunos/listar')
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			console.log(xml);
			for (departamento of xml.getElementsByTagName('aluno')) {
				const id = departamento.getElementsByTagName("id")[0].innerHTML
				const nome = departamento.getElementsByTagName("nome")[0].innerHTML

				// cria novo option no select para inserir
				const inserirOption = $("<option>").attr("value", id).text(nome)
				$("#aluno-inserir").append(inserirOption)
				$("#aluno-inserir").formSelect()
				// cira novo option no select para atualizar
				const atualizarOption = $("<option>").attr("value", id).text(nome)
				$("#aluno-atualizar").append(atualizarOption)
				$("#aluno-atualizar").formSelect()
			}
		})
	
}

function pesquisarDisciplinas() {
	const input = document.querySelector("#search");
	const filter = input.value.toUpperCase();
	const table = document.querySelector("#tabela-disciplinas");
	const tr = table.getElementsByTagName("tr");

	for (let i = 1; i < tr.length; i++) {
		// pega a coluna "Nome" da tabela
		let td = tr[i].children[2];
		if (td) {
			let txtValue = td.innerHTML;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
}
