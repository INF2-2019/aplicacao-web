const ENDERECO = "http://localhost:8080/app";
const ROTA = "/biblioteca/cargo";

let ul_dropdown;
let ul_itens;
let li_dropdown = [];
let li_itens = [];
let ul_funcoes;
let btn_autenticador;

function navADMIN() {
  ul_dropdown = document.getElementById("dropdown1");
	ul_itens = document.getElementById("navbars-itens");
	ul_funcoes = document.getElementById("nav-funcoes");
  btn_autenticador = document.getElementById("btn_autenticador");

  for(i=0;i<2;i++){
  	li_itens[i] = document.createElement("li");
  }
  li_itens[0].innerHTML = "<a href='../login-adm.html'>Login</a>";
  li_itens[1].innerHTML = "<a href='../transicao/adm.html'>Página Inicial</a>";
  $(".dropdown-trigger").dropdown();
  for(i=0;i<li_itens.length;i++){
  	ul_itens.insertBefore(li_itens[i],ul_funcoes);
  }

  for(i=0;i<6;i++){
  	li_dropdown[i] = document.createElement("li");
  }
  li_dropdown[0].innerHTML = "<a href='../acervo/index.html'>Acervos</a>";
  li_dropdown[1].innerHTML = "<a href='../alunos/index.html'>Aluno</a>";
  li_dropdown[2].innerHTML = "<a href='../campi/index.html'>Campi</a>";
  li_dropdown[3].innerHTML = "<a href='../descartes/index.html'>Descartes</a>";
  li_dropdown[4].innerHTML = "<a href='../emprestimos/index.html'>Empréstimos</a>";
  li_dropdown[5].innerHTML = "<a href='../reservas/index.html'>Reservas</a>";
  for(i=0;i<li_dropdown.length;i++){
  	ul_dropdown.appendChild(li_dropdown[i]);
  }

  if(btn_autenticador.text == "Acervo"){
    window.location.href = "adm.html";
  }
}

function navOPERADOR() {
	ul_dropdown = document.getElementById("dropdown1");
	ul_itens = document.getElementById("navbars-itens");
	ul_funcoes = document.getElementById("nav-funcoes");
  btn_autenticador = document.getElementById("btn_autenticador");

	for(i=0;i<2;i++){
		li_itens[i] = document.createElement("li");
	}
	li_itens[0].innerHTML = "<a href='../login-operador.html'>Login</a>";
	li_itens[1].innerHTML = "<a href='../transicao/operador.html'>Página Inicial</a>";
	$(".dropdown-trigger").dropdown();
	for(i=0;i<li_itens.length;i++){
		ul_itens.insertBefore(li_itens[i],ul_funcoes);
	}

	for(i=0;i<5;i++){
		li_dropdown[i] = document.createElement("li");
	}
	li_dropdown[0].innerHTML = "<a href='../acervo/index.html'>Acervo</a>";
	li_dropdown[1].innerHTML = "<a href='../alunos/index.html'>Alunos</a>";
	li_dropdown[2].innerHTML = "<a href='../descartes/index.html'>Descartes</a>";
	li_dropdown[3].innerHTML = "<a href='../emprestimos/index.html'>Empréstimos</a>";
	li_dropdown[4].innerHTML = "<a href='../reservas/index.html'>Reservas</a>";
	for(i=0;i<li_dropdown.length;i++){
		ul_dropdown.appendChild(li_dropdown[i]);
	}

  if(btn_autenticador.text == "Manutenção de acervo"){
    window.location.href = "operador.html";
  }
}

function cargoLogado() {
	$.ajax(ENDERECO+ROTA, {
		xhrFields: { withCredentials: true }
	})
	.then(response => {
		str = response.getElementsByTagName("cargo")[0];
		cargo = str.childNodes[0].nodeValue;
		if(cargo=="ADMIN")navADMIN();
		else if(cargo=="OPERADOR")navOPERADOR();
		else     window.location.href = "../../index.html";
	})
  //O catch está executando errado
	//.catch(error =>  alert("Erro de conexão ao servidor."));
}
