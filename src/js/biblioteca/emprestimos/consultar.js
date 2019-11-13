function consultar() {
	fetch(baseURL + 'consultar',{
		credentials: "include", 
	})
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml =>	criaTabela(xml))
}
