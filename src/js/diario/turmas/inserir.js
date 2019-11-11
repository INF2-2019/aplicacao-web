function inserir(idCursos, nome) {
	let ids=[],tds=document.querySelectorAll(".id");
	for(let i=0; i<tds.length; i++){
		ids[i]=+tds[i].innerHTML;
	}
	ids.sort();
 	let id=1;
	for(let i=0; i<ids.length; i++){
		if(ids[i]==id){
        		id++;
		}
		else{
			break;
		}
    	}
	postFetch(baseURL + 'inserir',{id,idCursos, nome})
		.then(data => (retornaResposta(data)))
		.then(resposta => {
                    console.log(resposta);
			if (resposta.indexOf("sucesso")!=-1) {
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
