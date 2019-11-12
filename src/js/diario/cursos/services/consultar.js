function consultar() {
	let statusCode
	fetch(baseURL + 'consultar', { credentials: 'include' })
		.then(response => {
			statusCode = response.status
			return response.text()
		})
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => {
			if (statusCode != 403)
				criaTabela(xml)
			else
				M.toast({ html: "Você não tem permissão para visualizar este conteúdo", classes: 'utils erro-2 text-light-text' })
		})
}
