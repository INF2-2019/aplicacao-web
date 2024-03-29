# Marerialize

Como já foi explicitado várias vezes, utilizaremos o framework de `css` `materialize`. Porém está sendo usada uma build adaptada com algumas modificações.

Documentação do Materialize: [aqui](https://materializecss.com/)

## O que mudou

Foram adicionadas as cores do projeto no `css` e, obviamente, foram alteradas as cores padrão dos componentes e textos do `materialize`.

## **Novo**

```scss
.margin-0 {
	margin: 0;
}

.margin-v {
	margin-top: auto;
	margin-bottom: auto;
}

.margin-h {
	margin-left: auto;
	margin-right: auto;
}

.full-height {
	height: 100%;
}

.full-width {
	width: 100%;
}

.resp-flex {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;

	@media #{$medium-and-down} {
		flex-direction: column;
		align-items: center;
	}
}
```

## As classes

Eu poderia ir escrevendo classe a classe aqui, porém `não`, como elas seguem o padrão do materialize só irei colocar as adições.

### Cores principais

#### Primária e variações

![imagem](<assets/Primary color classes.svg>)

#### Secundária e variações

![imagem](<assets/Secondary color classes.svg>)

#### Demais cores

![imagem](<assets/Other colors classes.svg>)

## Código adicionado

O código adicionado está na pasta `src/css/_sass/materialize`
