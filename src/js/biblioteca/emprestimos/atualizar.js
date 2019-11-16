function atualizar(aluno, acervo, dataEmprestimo, dataPrev,dataDev,multa) {
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
