const ENDERECO = "http://localhost:38695/app";
const ROTA = "/diario/cargo";

let ul_dropdown;
let ul_itens;
let li_dropdown = [];
let li_itens = [];
let ul_funcoes;

function navADMIN() {
    ul_dropdown = document.getElementById("dropdown1");
	ul_itens = document.getElementById("navbars-itens");
	ul_funcoes = document.getElementById("nav-funcoes");

	for(i=0;i<2;i++){
		li_itens[i] = document.createElement("li");
	}
	li_itens[0].innerHTML = "<a href='../login-adm.html'>Login</a>";
	li_itens[1].innerHTML = "<a href='../transicao/adm.html'>Página Inicial</a>";
	$(".dropdown-trigger").dropdown();
	for(i=0;i<li_itens.length;i++){
		ul_itens.insertBefore(li_itens[i],ul_funcoes);
	}

	for(i=0;i<8;i++){
		li_dropdown[i] = document.createElement("li");
	}
	li_dropdown[0].innerHTML = "<a href='../alunos/index.html'>Alunos</a>";
	li_dropdown[1].innerHTML = "<a href='../campi/index.html'>Campi</a>";
	li_dropdown[2].innerHTML = "<a href='../cursos/index.html'>Cursos</a>";
	li_dropdown[3].innerHTML = "<a href='../departamentos/index.html'>Departamentos</a>";
	li_dropdown[4].innerHTML = "<a href='../disciplinas/index.html'>Disciplinas</a>";
	li_dropdown[5].innerHTML = "<a href='../etapas/index.html'>Etapas</a>";
	li_dropdown[6].innerHTML = "<a href='../professores/index.html'>Professores</a>";
	li_dropdown[7].innerHTML = "<a href='../transferencia/index.html'>Transferência de alunos</a>";
	for(i=0;i<li_dropdown.length;i++){
		ul_dropdown.appendChild(li_dropdown[i]);
	}
}

function navALUNO() {
	ul_dropdown = document.getElementById("dropdown1");
	ul_itens = document.getElementById("navbars-itens");
	ul_funcoes = document.getElementById("nav-funcoes");

	for(i=0;i<2;i++){
		li_itens[i] = document.createElement("li");
	}
	li_itens[0].innerHTML = "<a href='../login-aluno.html'>Login</a>";
	li_itens[1].innerHTML = "<a href='../transicao/aluno.html'>Página Inicial</a>";
	$(".dropdown-trigger").dropdown();
	for(i=0;i<li_itens.length;i++){
		ul_itens.insertBefore(li_itens[i],ul_funcoes);
	}

	for(i=0;i<4;i++){
		li_dropdown[i] = document.createElement("li");
	}
	li_dropdown[0].innerHTML = "<a href='../relatorios/#'>Certificado de Escolaridade</a>";
	li_dropdown[1].innerHTML = "<a href='../diario/telainicialdiarioaluno.html'>Diário Escolar</a>";
	li_dropdown[2].innerHTML = "<a href='../relatorios/#'>Histórico Escolar</a>";
	li_dropdown[3].innerHTML = "<a href='../alunos/perfil.html'>Perfil do Aluno</a>";
	for(i=0;i<li_dropdown.length;i++){
		ul_dropdown.appendChild(li_dropdown[i]);
	}
}

function navPROFESSOR() {
	ul_dropdown = document.getElementById("dropdown1");
	ul_itens = document.getElementById("navbars-itens");
	ul_funcoes = document.getElementById("nav-funcoes");

	for(i=0;i<2;i++){
		li_itens[i] = document.createElement("li");
	}
	li_itens[0].innerHTML = "<a href='../login-professor.html'>Login</a>";
	li_itens[1].innerHTML = "<a href='../transicao/professor.html'>Página Inicial</a>";
	$(".dropdown-trigger").dropdown();
	for(i=0;i<li_itens.length;i++){
		ul_itens.insertBefore(li_itens[i],ul_funcoes);
	}

	for(i=0;i<2;i++){
		li_dropdown[i] = document.createElement("li");
	}
	li_dropdown[0].innerHTML = "<a href='../diario/telainicialdiarioprofessor.html'>Diário Escolar</a>";
	li_dropdown[1].innerHTML = "<a href='../professores/perfil.html'>Perfil do professor</a>";
	for(i=0;i<li_dropdown.length;i++){
		ul_dropdown.appendChild(li_dropdown[i]);
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
		else if(cargo=="ALUNO")navALUNO();
		else if(cargo=="PROFESSOR")navPROFESSOR();
		else return;
	})
	.catch(error => console.error(error));
}
