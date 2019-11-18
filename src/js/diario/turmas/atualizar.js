function atualizar(turma, nome) {
	let req = {};

	req.id = currentId;
	if (turma)
		req.idCursos = turma;
	if (nome)
		req.nome = nome;

	postFetch(baseURL + 'alterar', req)
		.then(data => (retornaResposta(data)))
		.then(resposta => {
                    console.log(resposta);
			if (resposta.indexOf("sucesso")!=-1) {
				M.toast({ html: resposta, classes: 'utils sucesso-2 text-light-text' })
			} else {
				M.toast({ html: resposta, classes: 'utils erro-2 text-light-text' })
			}
		})
		.then(() => consultar())
		.catch(error => console.error(error))
}
