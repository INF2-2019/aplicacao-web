function deletar() {
	let statusCode;
	fetch(baseURL + 'deletar?id=' + currentId, { credentials: 'include' })
		.then(response => {
			statusCode = response.status
			return response.text()
		})
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => (retornaResposta(xml)))
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
		}).then(() => consultar())
		.catch(err => console.error(err))
}
