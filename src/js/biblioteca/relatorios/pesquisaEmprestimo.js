const consultar = async () => {
	const DOM = new DOMParser()
	const res = await fetch(baseURL + '/emprestimos/consultar')
	const text = await res.text()

	return DOM.parseFromString(text, 'text/xml')
}

const infoAtrasos = async () => {
	let atrasados = []
	const xml = await consultar()
	const emprestimos = xml.getElementsByTagName("emprestimo")

	for (emprestimo of emprestimos) {
		const emprestimoObj = {
			id: emprestimo.children[0].innerHTML,
			idAluno: emprestimo.children[1].innerHTML,
			dataPrevista: new Date(emprestimo.children[4].innerHTML),
			dataDevolucao: new Date(emprestimo.children[5].innerHTML),
			diasAtrasado: 0,
		}

		// Ainda não devolveu
		if (emprestimoObj.dataDevolucao.getTime() == 0) {
			// Se a data atual for maior que a data prevista
			const dataAtual = new Date();
			if (dataAtual > emprestimoObj.dataPrevista) {
				emprestimoObj.diasAtrasado = Math.ceil((dataAtual.getTime() - emprestimoObj.dataPrevista.getTime()) / (1000 * 3600 * 24))
				delete emprestimoObj.dataPrevista
				delete emprestimoObj.dataDevolucao

				atrasados.push(emprestimoObj)
			}
		}
	}

	montarTabela(atrasados)
}

const montarTabela = dados => {
	const tabelaContainer = document.querySelector('#atrasos')
	const tbody = document.createElement('tbody')

	for (atraso of dados) {
		const linha = document.createElement('tr')

		// para cada key do objeto, cria uma nova coluna
		for (key of Object.keys(atraso)) {
			const coluna = document.createElement('td')
			coluna.appendChild(document.createTextNode(atraso[key]))
			coluna.classList = key

			linha.appendChild(coluna)
		}

		const colunaAcao = document.createElement('td')
		const botaoEditar = document.createElement('a')
		botaoEditar.setAttribute('href', '#modal-info')
		botaoEditar.classList = "btn utils info s12 m5 l2 modal-trigger editar"
		botaoEditar.appendChild(document.createTextNode("Info"))

		colunaAcao.appendChild(botaoEditar)
		linha.appendChild(colunaAcao)
		tbody.appendChild(linha)
	}

	tabelaContainer.innerHTML = tbody.innerHTML
}

$(document).on('click', '.editar', e => {
	const id = $(e.target).closest('tr').find('.id')[0].innerHTML;
	const idAluno = $(e.target).closest('tr').find('.idAluno')[0].innerHTML;
	const diasAtrasado = $(e.target).closest('tr').find('.diasAtrasado')[0].innerHTML;

	$('#conteudo-info').text('')
	$('#conteudo-info').append(`<h4>Informações do atraso</h4>`)
	$('#conteudo-info').append(`<h6>ID do empréstimo: <strong>${id}</strong></h6>`)
	$('#conteudo-info').append(`<h6>CPF do aluno: <strong>${idAluno}</strong></h6>`)
	$('#conteudo-info').append(`<h6>Número de dias atualmente atrasado: <strong>${diasAtrasado}</strong></h6>`)
})
