function atualizar(idAlunos,idDisciplinas,ano,ativo) {
	let req = {id:currentId,idAlunos,idDisciplinas,ano,ativo};
	postFetch(baseURL + 'atualizar', req)
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
		.then(() => limpaInputs('atualizar'))
		.catch(error => console.error(error))
}
