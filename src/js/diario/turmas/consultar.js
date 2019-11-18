function consultar() {
	postFetch(baseURL + 'consultar')
		.then(xml => criaTabela(xml))
}
