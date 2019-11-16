function consultar() {
	fetch(baseURL + 'listar')
		.then(response => response.text? response.text(): response)
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => criaTabela(xml))
}
