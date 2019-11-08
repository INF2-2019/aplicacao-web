const consultar = async () => {
	const DOM = new DOMParser()
	const res = await fetch(baseURL + '/descartes/consulta')
	const text = await res.text()

	return DOM.parseFromString(text, 'text/xml')
}

const infoDescartes = async () => {
	const xml = await consultar()
	const descartados = xml.getElementsByTagName("descartes")

	montarTabela(descartados)
}

const montarTabela = descartes => {
	const tabelaContainer = document.querySelector("#descartes")
	const tbody = document.createElement('tbody')

	// para cada elemento do xml
	for (descarte of descartes) {
		const linha = document.createElement('tr')
		// Percorrer por cada propriedade de um elemento descartado
		let dataset = []
		for (let i = 0; i < descarte.children.length; i++) {
			const coluna = document.createElement('td')
			let filhoAtual = descarte.children[i].innerHTML

			if (i == 1) {
				// Segundo propriedade de um descarte e uma data
				filhoAtual = formatarData(new Date(filhoAtual))
				coluna.appendChild(document.createTextNode(filhoAtual))
				coluna.classList = 'data'

				linha.appendChild(coluna) // adiciona na linha
				dataset = []
			} else if (i == 2) {
				// Motivo (indice 2) nao aparece na tabela, fica como dataset
				dataset.push(filhoAtual)
			} else {
				// propriedade 0 e 1 aparecem normalmente
				if (dataset.length != 0) {
					coluna.setAttribute('data-motivo', dataset)
				}
				coluna.appendChild(document.createTextNode(filhoAtual))
				coluna.classList = i == 0 ? 'acervo' : 'operador'

				linha.appendChild(coluna) // adiciona na linha
				dataset = []
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

const formatarData = data => {
	const dia = data.getDate()
	const mes = data.getMonth() + 1
	const ano = data.getFullYear()
	return dia + "/" + mes + "/" + ano;
}

$(document).on('click', '.informacoes', e => {
	const idAcervo = $(e.target).closest('tr').find('.acervo')[0].innerHTML
	const dataDescarte = $(e.target).closest('tr').find('.data')[0].innerHTML
	const operador = $(e.target).closest('tr').find('.operador')[0].innerHTML
	const motivo = $(e.target).closest('tr').find('.operador')[0].dataset.motivo

	$('#modal-info .modal-content').text('')
	$('#modal-info .modal-content').append(
		`
		<h4>Informações do descarte</h4>
		<h6>ID do acervo: ${idAcervo}</h6>
		<h6>Data de descarte: ${dataDescarte}</h6>
		<h6>Operador: ${operador}</h6>
		<h6>Motivo do descarte: ${motivo}</h6>
		`
	)
})
