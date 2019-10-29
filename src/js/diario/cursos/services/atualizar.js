function atualizar(departamento, nome, horas, modalidade) {
	let req = {};

	req.id = currentId;
	if (departamento)
		req.departamento = departamento;
	if (nome)
		req.nome = nome;
	if (horas)
		req.horas = horas;
	if (modalidade)
		req.modalidade = modalidade;

	console.log(req)
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
