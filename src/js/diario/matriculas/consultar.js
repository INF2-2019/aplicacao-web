function consultar() {
	postFetch(baseURL + 'listar',{},"GET")
		.then(xml => criaTabela(xml))
}
