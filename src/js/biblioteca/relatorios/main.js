const baseURL = 'http://localhost:8080/app/biblioteca'

// inicializa JS do materialize
M.AutoInit()

document.getElementById('BotaoImprime').addEventListener('click', () => {
	let divResposta = document.getElementById("printable");
	divResposta.style.paddingLeft = 0;
	divResposta.style.paddingRight = 0;
	window.print();
	divResposta.style.paddingLeft = "10%";
	divResposta.style.paddingRight = "10%";
});
