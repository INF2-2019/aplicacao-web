function inserir(turma, nome, horas) {
	postFetch(baseURL + 'inserir', { turma, nome, horas })
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
