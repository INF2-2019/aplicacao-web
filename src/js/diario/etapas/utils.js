M.AutoInit();

function recarrega() {
	location.reload();
}

function limpaInputs() {
	document.getElementById('adicionaAnoEtapa').value = "";
	document.getElementById('adicionaValorEtapa').value = "";
	document.getElementById('editaAno').value = "";
	document.getElementById('editaValor').value = "";
}

function toast(text, classe){
	M.toast({
		html: text,
		classes: classe
	});
}