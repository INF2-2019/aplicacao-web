// Se pá depois eu passo isso pra um JSON, sem tempo irmão

const PARAMS_ACERVO = 	  ["id-campi", "nome", "tipo", "local", "ano", "editora", "paginas"];

const PARAMS_ACADEMICOS = [
	{
		paramNome:  "id-obra",
		exibNome:  "2º ID",
		tipo: "number",
		tamanho:  3
	},
	{
		paramNome:  "programa",
		exibNome:  "Programa",
		tipo: "text",
		tamanho:  4
	}
];

const PARAMS_LIVROS = [
	{
		paramNome:  "id-obra",
		exibNome:  "2º ID",
		tipo: "number",
		tamanho:  3
	},
	{
		paramNome:  "isbn",
		exibNome:  "ISBN",
		tipo: "number",
		tamanho:  4
	},
	{
		paramNome:  "edicao",
		exibNome:  "Edição",
		tipo: "number",
		tamanho:  3
	}
];

const PARAMS_MIDIAS = [
	{
		paramNome:  "id-obra",
		exibNome:  "2º ID",
		tipo: "number",
		tamanho:  3
	},
	{
		paramNome:  "subtipo",
		exibNome:  "Subtipo",
		tipo: "text",
		tamanho:  4,
		tipoInput: "select"
	},
	{
		paramNome:  "tempo",
		exibNome:  "Tempo",
		tipo: "time",
		tamanho:  3
	}
];

const PARAMS_PERIODICOS = [
	{
		paramNome:  "id-obra",
		exibNome:  "2º ID",
		tipo: "number",
		tamanho:  3
	},
	{
		paramNome:  "subtipo",
		exibNome:  "Subtipo",
		tipo: "text",
		tamanho:  4,
		tipoInput: "input"
	},
	{
		paramNome:  "periodicidade",
		exibNome:  "Periodicidade",
		tipo: "text",
		tamanho:  4
	},
	{
		paramNome:  "mes",
		exibNome:  "Mês",
		tipo: "text",
		tamanho:  3
	},
	{
		paramNome:  "volume",
		exibNome:  "Volume",
		tipo: "number",
		tamanho:  3
	},
	{
		paramNome:  "issn",
		exibNome:  "ISSN",
		tipo: "number",
		tamanho:  3
	}
];
