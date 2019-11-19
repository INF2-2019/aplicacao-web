M.AutoInit();

let nome;
let email;
let usuario;
let senha;

function cancelar(){
	document.location.reload(true);
}

function cadastrar(){
	nome = document.getElementById("nome").value;
	email = document.getElementById("email").value;
	usuario = document.getElementById("usuario").value;
	senha = document.getElementById("senha").value;
	salvar();
}

function salvar() {
	$.ajax(ENDERECO+"/biblioteca/admin/cadastrar", {
		data : {
			nome : nome,
			usuario : usuario,
			email : email,
			senha : senha
		},
		method : "POST",
		xhrFields: { withCredentials: true }
	})
	.then(response => {
		M.toast({ html: "Sucesso", classes: "utils sucesso-2 text-light-text" });
	})
	.catch(error => alert("Impossível fazer o cadastro"));
}
