function inserir(aluno, acervo, dataEmprestimo, dataPrev,dataDev,multa) {


	let req = {};

	req.id = currentId;
	if (aluno)
		req['id-alunos'] = aluno
	if (acervo)
		req['id-acervo'] = acervo;
	if (dataEmprestimo)
		req['data-emprestimo'] = dataEmprestimo;
	if (dataPrev)
		req['data-prev-devol'] = dataPrev;
	if (dataDev)
		req['data-devolucao'] = dataDev;
	if (multa)
		req['multa'] = multa;

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
