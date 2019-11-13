const consultar = async () => {
	const DOM = new DOMParser()
	const res = await fetch(baseURL + '/emprestimos/consultar', {
		credentials: 'include'
	})
	const text = await res.text()

	return DOM.parseFromString(text, 'text/xml')
}

const montarTabela = (dados, numRelatorio = 4) => {
	let tabelaContainer

	if (numRelatorio == 4)
		tabelaContainer = document.querySelector('#atrasos')
	else if (numRelatorio == 5)
		tabelaContainer = document.querySelector('#multas')

	const tbody = document.createElement('tbody')

	for (dado of dados) {
		const linha = document.createElement('tr')

		// para cada key do objeto, cria uma nova coluna
		for (key of Object.keys(dado)) {
			if (key != 'dataDevolucaoMulta') {
				const coluna = document.createElement('td')

				if (key == 'dataEmprestimo') {
					// adiciona como data-devolucao do td a data de devolucao
					coluna.setAttribute('data-devolucao', dado.dataDevolucaoMulta)
				}

				coluna.appendChild(document.createTextNode(dado[key]))
				coluna.classList = key

				linha.appendChild(coluna)
			}
		}

		const colunaAcao = document.createElement('td')
		const botaoInfo = document.createElement('a')
		botaoInfo.setAttribute('href', '#modal-info')
		botaoInfo.classList = "btn utils info s12 m5 l2 modal-trigger informacoes"
		botaoInfo.appendChild(document.createTextNode("Info"))

		colunaAcao.appendChild(botaoInfo)
		linha.appendChild(colunaAcao)
		tbody.appendChild(linha)
	}

	tabelaContainer.innerHTML = tbody.innerHTML
}

const infoAtrasos = async () => {
	let atrasados = []
	const xml = await consultar()
	const emprestimos = xml.getElementsByTagName("emprestimo")

	for (emprestimo of emprestimos) {
		const atrasoObj = {
			id: emprestimo.children[0].innerHTML,
			idAluno: emprestimo.children[1].innerHTML,
			dataPrevista: new Date(emprestimo.children[4].innerHTML),
			dataDevolucao: new Date(emprestimo.children[5].innerHTML),
			diasAtrasado: 0,
		}

		// Ainda não devolveu
		if (atrasoObj.dataDevolucao.getTime() == 0) {
			// Se a data atual for maior que a data prevista
			const dataAtual = new Date();
			if (dataAtual > atrasoObj.dataPrevista) {
				atrasoObj.diasAtrasado = Math.ceil((dataAtual.getTime() - atrasoObj.dataPrevista.getTime()) / (1000 * 3600 * 24))
				delete atrasoObj.dataPrevista
				delete atrasoObj.dataDevolucao

				atrasados.push(atrasoObj)
			}
		}
	}

	montarTabela(atrasados, 4)
}

const infoMultas = async () => {
	let multados = []
	const xml = await consultar()
	const emprestimos = xml.getElementsByTagName("emprestimo")

	for (emprestimo of emprestimos) {
		const multasObj = {
			id: emprestimo.children[0].innerHTML,
			idAluno: emprestimo.children[1].innerHTML,
			dataEmprestimo: new Date(emprestimo.children[3].innerHTML),
			dataPrevista: new Date(emprestimo.children[4].innerHTML),
			dataDevolucaoMulta: new Date(emprestimo.children[5].innerHTML),
			multa: 0,
		}

		// Se já tiver entregado, e tiver atrasado o prazo
		if (multasObj.dataDevolucaoMulta.getTime() != 0 && multasObj.dataDevolucaoMulta > multasObj.dataPrevista) {
			delete multasObj.dataPrevista

			multasObj.dataDevolucaoMulta = formatarData(multasObj.dataDevolucaoMulta)
			multasObj.dataEmprestimo = formatarData(multasObj.dataEmprestimo)
			multasObj.multa = emprestimo.children[6].innerHTML

			multados.push(multasObj)
		}

	}

	montarTabela(multados, 5)
}

const formatarData = data => {
	const dia = data.getDate()
	const mes = data.getMonth() + 1
	const ano = data.getFullYear()
	return dia + "/" + mes + "/" + ano;
}

$(document).on('click', '.informacoes', e => {
	const id = $(e.target).closest('tr').find('.id')[0].innerHTML
	const idAluno = $(e.target).closest('tr').find('.idAluno')[0].innerHTML

	if (window.location.href.endsWith("relatorio4.html")) {
		const diasAtrasado = $(e.target).closest('tr').find('.diasAtrasado')[0].innerHTML

		$('#conteudo-info').text('')
		$('#conteudo-info').append(
			`
			<h4>Informações do atraso</h4>
			<h6><strong>ID do empréstimo</strong>: ${id}</h6>
			<h6><strong>CPF do aluno</strong>: ${idAluno}</h6>
			<h6><strong>Número de dias atualmente atrasado</strong>: ${diasAtrasado}</h6>
			`
		)
	} else {
		const dataEmprestimo = $(e.target).closest('tr').find('.dataEmprestimo')[0].innerHTML
		const dataDevolucao = $(e.target).closest('tr').find('.dataEmprestimo')[0].dataset.devolucao
		const valor = $(e.target).closest('tr').find('.multa')[0].innerHTML

		$('#modal-info .modal-content').text('')
		$('#modal-info .modal-content').append(
			`
			<h4>Informações da multa</h4>
			<h6><strong>ID do empréstimo</strong>: ${id}</h6>
			<h6><strong>CPF do aluno</strong>: ${idAluno}</h6>
			<h6><strong>Data do empréstimo</strong>: ${dataEmprestimo}</h6>
			<h6><strong>Data de devolução</strong>: ${dataDevolucao}</h6>
			<h6><strong>Valor da multa</strong>: R$${valor}</h6>
			`
		)
	}
})
