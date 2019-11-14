const METODO = "POST";
const ENDERECO = "http://localhost:38695/app";
const ROTA = "/diario/cargo";

let ul_dropdown;
let ul_itens;

function navCONVIDADO() {
    ul_dropdown = document.getElementById("dropdown1");
    ul_itens = document.getElementById("navbars-itens");

	let li_criado = document.createElement("li");
	li_criado.innerHTML = "<li><a href='#' >Perfil do Aluno</a></li>";
	ul_itens.appendChild(li_criado);
}

function cargoLogado() {
	$.ajax(ENDERECO+ROTA, {
		xhrFields: { withCredentials: true }
	})
	.then(
		function success(cargo) {
			str = new XMLSerializer().serializeToString(cargo.firstChild);
			if(str.substr("CONVIDADO")){
				navCONVIDADO();
			}
		},

		function fail() {
            return("erro");
		}
	);
}

$(".dropdown-trigger").dropdown();
