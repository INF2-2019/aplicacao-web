function atualizar(turma, nome, horas) {
	let req = {};

	req.id = currentId;
	if (turma)
		req.turma = turma;
	if (nome)
		req.nome = nome;
	if (horas)
		req.horas = horas;


	postFetch(baseURL + 'atualizar', req)
		.then(data => (retornaResposta(data)))
		.then(resposta => {
			if (resposta == "Atualizado com sucesso.") {
				M.toast({ html: resposta, classes: 'utils sucesso-2 text-light-text' })
			} else {
				M.toast({ html: resposta, classes: 'utils erro-2 text-light-text' })
			}
		})
		.then(() => consultar())
		.then(() => limpaInputs('atualizar'))
		.catch(error => console.error(error))
}
