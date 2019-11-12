function inserir(departamento, nome, horas, modalidade) {
	let statusCode
	let body = { departamento, nome, horas, modalidade }
	fetch(baseURL + 'inserir', {
		credentials: 'include',
		method: 'POST',
		body: new URLSearchParams(body),
		headers: new Headers({
			'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		})
	})
		.then(response => {
			statusCode = response.status
			return response.text()
		})
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(data => (retornaResposta(data)))
		.then(resposta => {
			if (statusCode == 200) {
				M.toast({ html: resposta, classes: 'utils sucesso-2 text-light-text' })
			} else {
				if (statusCode == 403) {
					M.toast({ html: "Você não tem permissão para fazer esta ação", classes: 'utils erro-2 text-light-text' })
				} else {
					M.toast({ html: resposta, classes: 'utils erro-2 text-light-text' })
				}
			}
		})
		.then(() => consultar())
		.then(() => limpaInputs('inserir'))
		.catch(error => console.error(error))

}
