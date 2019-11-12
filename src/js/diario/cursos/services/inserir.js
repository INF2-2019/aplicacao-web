function inserir(departamento, nome, horas, modalidade) {
	body = { departamento, nome, horas, modalidade }
	fetch(baseURL + 'inserir', {
		credentials: 'include',
		method: 'POST',
		body: new URLSearchParams(body),
		headers: new Headers({
			'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		})
	})
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(data => (retornaResposta(data)))
		.then(resposta => {
			if (resposta == "Inserido com sucesso.") {
				M.toast({ html: 'Adicionado com sucesso.', classes: 'utils sucesso-2 text-light-text' })
			} else {
				M.toast({ html: resposta, classes: 'utils erro-2 text-light-text' })
			}
		})
		.then(() => consultar())
		.then(() => limpaInputs('inserir'))
		.catch(error => console.error(error))

}
