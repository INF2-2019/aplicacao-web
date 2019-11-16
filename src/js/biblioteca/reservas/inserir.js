function inserir(aluno, acervo, dataReserva, tempoEspera,emprestou) {


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
		$("#aluno-inserir").formSelect();
}
