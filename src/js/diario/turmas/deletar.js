function deletar() {
	postFetch(baseURL + 'deletar?id=' + currentId,{},"GET")
		.then(xml => (retornaResposta(xml)))
		.then(resposta => {
			if (resposta.indexOf("sucesso")!=-1) {
				M.toast({ html: resposta, classes: 'utils sucesso-2 text-light-text' })
			} else {
				M.toast({ html: resposta, classes: 'utils erro-2 text-light-text' })
			}
		}).then(() => consultar())
		.catch(err => console.log(err))
}
