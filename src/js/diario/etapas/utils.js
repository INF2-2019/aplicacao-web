M.AutoInit();

function recarrega() {
	location.reload();
}

function limpaInputs() {
	document.getElementById('adicionaAnoEtapa').value = "";
	document.getElementById('adicionaValorEtapa').value = "";
	document.getElementById('editaAno').value = "";
	document.getElementById('editaValorEtapa').value = "";
}

function toast(text, classe) {
	M.toast({
		html: text,
		classes: classe
	});
}

var valorX;

function verificaValor(id, valor) {
	var soma = getSoma();
	var input = document.getElementById(id);
	var valorInput = parseInt(input.value);

	valor = parseInt(valor);

	if (id == "adicionaValorEtapa") {
		if ((soma + valorInput) > 100 && soma < 100) {
			window.alert("O valor da soma das etapas deve ser menor ou igual a 100. Insira um valor menor que " + (100 - soma) + ". Valor inserido: " + valorInput + ".");
		}
	} else if (id == "editaValorEtapa") {
		if ((soma + valor) > 100 && soma < 100) {
			window.alert("O valor da soma das etapas deve ser menor ou igual a 100. Insira um valor menor que " + (100 - soma) + ". Valor inserido: " + valorInput + ".");
		}
	}

}

function pegaValor(linha) {
	valorX = parseFloat(linha.children[2].innerHTML);
	console.log(valorX);

	var xxx = document.getElementById("editaValorEtapa");
	xxx.value = valorX;
	M.updateTextFields();
}