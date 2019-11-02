const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const toastEl = document.querySelector(".toast");

inputEl.onchange = function() {
	if(validaCpf(cpf)) {
		inputEl.style.borderColor = "#00C853";
	} else if(inputEl.value) {
		inputEl.style.borderColor = "#D32F2F";
	}
}

buttonEl.onclick = manipulaEnvio;
inputEl.onkeypress = e => {
	if(e.keyCode == 13)
		manipulaEnvio();
};

function validaCpf(cpf) {
	return /^[0-9]{11}$/.test(inputEl.value) || /^[0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[\-][0-9]{2}$/.test(inputEl.value);
}

function manipulaEnvio() {
	if(validaCpf(cpf)) {
		const cpf = parseInt(inputEl.value.replace(/\./g, "").replace(/\-/g, ""));
		transfere(cpf);
	} else {
		toastEl.innerHTML = "CPF inválido";
		toastEl.style.backgroundColor = "#D32F2F";
	}
};

function transfere(cpf) {
	const servidor = "http://localhost:8080/app/";
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(xhr.response, "application/xml");
			const msg = doc.getElementsByTagName("mensagem")[0];
			if(this.status == 200) {
				if(msg) avisaSucesso(msg);
				else avisaSucesso("Aluno transferido com sucesso");
			} else {
				if(msg) avisaErro(msg);
				else avisaErro("Falha ao transferir aluno");
			}
		}
	};
	const params = "?cpf=" + cpf;
	const url = servidor + "diario/transferencia/transfere" + params;
	xhr.open("POST", url, true);
	xhr.send();
}

function avisaSucesso(msg) {
	toastEl.innerHTML = msg;
	toastEl.style.backgroundColor = "#00C853";
}

function avisaErro(msg) {
	toastEl.innerHTML = msg;
	toastEl.style.backgroundColor = "#D32F2F";
}
