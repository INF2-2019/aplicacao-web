$(document).ready(function(){
	$('.modal').modal();
	$('select').formSelect();
});

var linhaDeletada=null;
var idDeletado=null;
var linhaInfo=null;
var idInfo=null;

function linhaQueSeraDeletada(indice){
	linhaDeletada=indice;
	idDeletado=document.querySelectorAll("tr")[indice+1].children[2].textContent;
}

function chamaDeletar(){
	deletar(idDeletado);
}

function linhaQueSeraInformada(ind){
	linhaInfo=ind;
	idInfo=document.querySelectorAll("tr")[ind+1].children[2].textContent;
	info(idInfo);
}

function linhaQueSeraAlterada(ind){
	linhaAlterada=ind;
	idAlterado=document.querySelectorAll("tr")[ind+1].children[2].textContent;

	/*esssa primeira requisicao é so para obter as informações do que sera alterado e coloca-las nos inouts para facilitar a vida do usuario*/
	let xhttp1 = new XMLHttpRequest();
	xhttp1.open(method, endereco+"diario/professores/informacao?id="+idAlterado, true);
	xhttp1.onreadystatechange = function() {
		if(xhttp1.readyState === xhttp1.DONE && xhttp1.status === 200) {
			var xml1 = (new DOMParser()).parseFromString(this.responseText, "application/xml");
			var raiz1 = xml1.firstElementChild;
			if(raiz1.nodeName == "erro") {
					window.alert(raiz1.firstElementChild.textContent);
					return;
			}else{
				var elementos1 = raiz1.children;
				var dados1 = elementos1[0].children;
				document.getElementsByName(paramNomes[0])[0].value = dados1[0].textContent;
				document.getElementsByName(paramNomes[1])[0].value = dados1[1].textContent;
				document.getElementsByName(paramNomes[2])[0].value = dados1[2].textContent;
				document.getElementsByName(paramNomes[4])[0].value = dados1[3].textContent;
				document.getElementsByName(paramNomes[5])[0].value = dados1[4].textContent;
			}
		}
	}
	xhttp1.send();
}
