let instances;
document.addEventListener('DOMContentLoaded', function() {
	const elems = document.querySelectorAll('.modal');
	instances = M.Modal.init(elems);
});

const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");

inputEl.onchange = function() {
	if(validaCpf(inputEl.value)) {
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

function validaCpf() {
	return /^[0-9]{11}$/.test(inputEl.value) || /^[0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[\-][0-9]{2}$/.test(inputEl.value);
}

function manipulaEnvio() {
	if(validaCpf()) {
		instances[0].open();
	} else {
		M.toast({ html: "CPF inválido", classes: "utils erro-2 text-light-text" });
	}
};

function transfere() {
	const servidor = "http://localhost:8080/app/";
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(xhr.response, "application/xml");
			const msg = doc.getElementsByTagName("mensagem")[0];
			if(this.status == 200) {
				if(msg) M.toast({ html: msg, classes: "utils sucesso-2 text-light-text" });
				else M.toast({ html: "Aluno transferido com sucesso", classes: "utils sucesso-2 text-light-text" });
			} else {
				if(msg) M.toast({ html: msg, classes: "utils erro-2 text-light-text" });
				else M.toast({ html: "Falha ao transferir aluno", classes: "utils erro-2 text-light-text" });
			}
		}
	};
	const cpf = parseInt(inputEl.value.replace(/\./g, "").replace(/\-/g, ""));
	const params = "?cpf=" + cpf;
	const url = servidor + "diario/transferencia/transfere" + params;
	xhr.open("POST", url, true);
	xhr.withCredentials = true;
	xhr.send();
}
