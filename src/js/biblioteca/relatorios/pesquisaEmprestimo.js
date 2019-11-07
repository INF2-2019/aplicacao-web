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

			linha.appendChild(coluna)
		}

		const colunaAcao = document.createElement('td')
		const botaoEditar = document.createElement('a')
		botaoEditar.setAttribute('href', '#modal-info')
		botaoEditar.classList = "btn utils-info secondary s12 m5 l2 lighten modal-trigger"
		botaoEditar.appendChild(document.createTextNode("Editar"))

		colunaAcao.appendChild(botaoEditar)
		linha.appendChild(colunaAcao)
		tbody.appendChild(linha)
	}

	tabelaContainer.innerHTML = tbody.innerHTML
}
