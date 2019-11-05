const paramNomes = ["id", "id-depto", "nome", "senha", "email", "titulacao"];
var endereco="http://localhost:8080/app/";
var method="GET";

function info(id){
    if(id == ""){
	window.alert("Insira ID");
	return;
    }

	let xhttp = new XMLHttpRequest();
	let url = endereco + "diario/professores/informacao?id=" + id;

	xhttp.open(method, url, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
                        var xml = (new DOMParser()).parseFromString(this.responseText, "application/xml");
			var raiz = xml.firstElementChild;
			if(raiz.nodeName == "erro") {
				window.alert(raiz.firstElementChild.textContent);
				return;
			}else{
                            var elementos = raiz.children;
                            let informacoes = document.getElementById("informacoes");
			informacoes.innerHTML = "";
			for(let i = 0; i < elementos.length; i++) {
				var dados = elementos[i].children;
				informacoes.innerHTML += "<label class=\"primary-text text-lighten-1 short col s12\" style=\"font-size:18px;\" id=\"id\"> SIAPE: " + dados[0].textContent + "</label>";
				informacoes.innerHTML += "<label class=\"primary-text text-lighten-1 short col s12\" style=\"font-size:18px;\" id=\"nome\"> Nome: " + dados[1].textContent + "</label>";
                                informacoes.innerHTML += "<label class=\"primary-text text-lighten-1 short col s12\" style=\"font-size:18px;\" id=\"idDepto\"> id-Depto: " + dados[2].textContent + "</label>";
                                informacoes.innerHTML += "<label class=\"primary-text text-lighten-1 short col s12\" style=\"font-size:18px;\" id=\"email\"> E-mail: " + dados[3].textContent + "</label>";
                                informacoes.innerHTML += "<label class=\"primary-text text-lighten-1 short col s12\" style=\"font-size:18px;\" id=\"titulacao\"> Titulação: " + dados[4].textContent + "</label>";
			}
                            //atualizarTabela();
                        }
		}
	};
	xhttp.send();
}

function deletar(id) {
	
	if(id == ""){
		window.alert("Insira ID");
		return;
	}

	let xhttp = new XMLHttpRequest();
	let url = endereco + "diario/professores/deletar?id=" + id;

	xhttp.open(method, url, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
                        var xml = (new DOMParser()).parseFromString(this.responseText, "application/xml");
			var raiz = xml.firstElementChild;
			if(raiz.nodeName == "erro") {
				window.alert(raiz.firstElementChild.textContent);
				return;
			}
                        else
                        {
                            atualizarTabela();
                        }
		}
	};
	xhttp.send();
}

function alterar() {
        
	let xhttp = new XMLHttpRequest();

	let url = endereco + "diario/professores/atualizar";
	let stringParams = "?";

	for(i in paramNomes) {
		let conteudo = document.getElementsByName(paramNomes[i])[0].value;
		if(conteudo == ""){
			window.alert("Preencha todos os campos para alterar");
			return;
		}
                if(stringParams.length==1)
                {//o primeiro parametro nao tem &
                    stringParams += paramNomes[i] + "=" + conteudo;
                }
                else
                {
                    stringParams += "&" + paramNomes[i] + "=" + conteudo;
                }
	}

	xhttp.open(method, url+stringParams, true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
                        var xml = (new DOMParser()).parseFromString(this.responseText, "application/xml");
			var raiz = xml.firstElementChild;
			if(raiz.nodeName == "erro") {
				window.alert(raiz.firstElementChild.textContent);
				return;
			}
                        else
                        {
                            atualizarTabela();
                        }
		}
	};
	xhttp.send();
}
