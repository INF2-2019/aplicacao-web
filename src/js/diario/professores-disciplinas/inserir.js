function inserir(disci,prof) {
	let req = {};

	if (disci)
		req['id-disciplinas'] = disci
	if (prof)
		req['id-professores'] = prof;
	postFetch(baseURL + 'inserir', req)
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
		$("#Seleciona-add").prop('selected', true);
		$("#turma-inserir").formSelect();
}
