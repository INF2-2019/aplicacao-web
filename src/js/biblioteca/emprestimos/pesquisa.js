let pesquisaval = 1;

$("#filtros").on('change', function(e){
	document.querySelector("#search").value= "";
	consulta();
	pesquisaval = $(this).val()
});

function pesquisa(){
let pesquisar = $("#search").val()
let linhas = document.querySelectorAll('tr');
	for (let i = 1; i < linhas.length; i++) {
	let valorLinha = linhas[i].childNodes[pesquisaval-1].innerHTML
		if(!valorLinha.includes(pesquisar)){
       linhas[i].classList.add("hide")
		}
		if(valorLinha.includes(pesquisar) && linhas[i].classList.contains("hide")){
			linhas[i].classList.remove("hide")
	 }
	}
}
