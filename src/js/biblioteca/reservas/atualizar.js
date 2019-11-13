function atualizar(aluno, acervo, dataReserva, tempoEspera,emprestou) {
	let req = {};

	req.id = currentId;
	if (aluno)
		req['id-alunos'] = aluno
	if (acervo)
		req['id-acervo'] = acervo;
	if (dataReserva)
		req['data-reserva'] = dataReserva;
	if (tempoEspera)
		req['tempo-espera'] = tempoEspera;
		console.log(emprestou)
	if (emprestou){
		if(emprestou == "Sim") req['emprestou'] = "true";
		if(emprestou == "Não") req['emprestou'] = "false";
	}
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
