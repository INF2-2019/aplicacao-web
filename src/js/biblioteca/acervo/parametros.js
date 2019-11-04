const PARAMS_ACERVO = 	  ["id-campi", "nome", "tipo", "local", "ano", "editora", "paginas"];

const PARAMS_ACADEMICOS = [
	{
		paramNome:  "id-obra",
		exibNome:  "Id da obra",
		tipo: "number",
		tamanho:  2
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
		exibNome:  "Id da obra",
		tipo: "number",
		tamanho:  2
	},
	{
		paramNome:  "isbn",
		exibNome:  "Código ISBN",
		tipo: "number",
		tamanho:  3
	},
	{
		paramNome:  "edicao",
		exibNome:  "Edição",
		tipo: "number",
		tamanho:  2
	}
];

const PARAMS_MIDIAS = [
	{
		paramNome:  "id-obra",
		exibNome:  "Id da obra",
		tipo: "number",
		tamanho:  2
	},
	{
		paramNome:  "subtipo",
		exibNome:  "Subtipo",
		tipo: "text",
		tamanho:  4
	},
	{
		paramNome:  "tempo",
		exibNome:  "Tempo",
		tipo: "time",
		tamanho:  2
	}
];

const PARAMS_PERIODICOS = [
	{
		paramNome:  "id-obra",
		exibNome:  "Id da obra",
		tipo: "number",
		tamanho:  2
	},
	{
		paramNome:  "subtipo",
		exibNome:  "Subtipo",
		tipo: "text",
		tamanho:  4
	},
	{
		paramNome:  "periodicidade",
		exibNome:  "Periodicidade",
		tipo: "text",
		tamanho:  4
	},
	{
		paramNome:  "mes",
		exibNome:  "Mês de lançamento",
		tipo: "text",
		tamanho:  3
	},
	{
		paramNome:  "volume",
		exibNome:  "Volume",
		tipo: "number",
		tamanho:  2
	},
	{
		paramNome:  "issn",
		exibNome:  "Código ISSN",
		tipo: "number",
		tamanho:  3
	}
];