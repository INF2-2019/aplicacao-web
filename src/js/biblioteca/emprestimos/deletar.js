function deletar() {
	fetch(baseURL + 'deletar?id=' + currentId)
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(xml => (retornaResposta(xml)))
		.then(resposta => {
			if (resposta == "Deletado com sucesso.") {
				M.toast({ html: resposta, classes: 'utils sucesso-2 text-light-text' })
			} else {
				M.toast({ html: resposta, classes: 'utils erro-2 text-light-text' })
			}
		}).then(() => consultar())
		.catch(err => console.log(err))
}
