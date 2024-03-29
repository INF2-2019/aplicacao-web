function inserir(idAlunos, idDisciplinas, ano) {
	let ids = [],
		tds = document.querySelectorAll(".id");
	for (let i = 0; i < tds.length; i++) {
		ids[i] = +tds[i].innerHTML;
	}
	ids.sort();
	let id = 1;
	for (let i = 0; i < ids.length; i++) {
		if (ids[i] == id) {
			id++;
		} else {
			break;
		}
	}
	postFetch(baseURL + 'inserir', {
			id,
			idAlunos,
			idDisciplinas,
			ano
		})
		.then(data => (retornaResposta(data)))
		.then(resposta => {
			if (resposta.indexOf("sucesso") != -1) {
				M.toast({
					html: 'Adicionado com sucesso.',
					classes: 'utils sucesso-2 text-light-text'
				})
			} else {
				M.toast({
					html: resposta,
					classes: 'utils erro-2 text-light-text'
				})
			}
		})
		.then(() => consultar())
		.then(() => limpaInputs())
		.catch(error => console.error(error));
	$("#turma-inserir").formSelect();
}
