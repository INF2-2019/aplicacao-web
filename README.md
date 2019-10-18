# Aplicação Web

Esse repositório é dedicado à parte de `front-end` web da aplicação a ser desenvolvida.

## Aviso

Esse repositório tem afazeres globais, caso queira ajudar verifique o [`TO-DO`](TO-DO.md).

## Instruções para IDEs e Editores recomendados

Esse projeto é bem simples, o editor/IDE que você usar deve ser o de sua preferência, de qualquer forma deixarei algumas sugestões.

### Plugins e Configurações

Recomendo instalar o `EditorConfig` na sua IDE ou editor. [Instalação](https://inf2-2019.github.io/help/editorconfig/).

Caso não queira seguem as definições que você deve usar:

- Indentação por `TAB`
- Charset `UTF-8`
- Fim de linha `LF`
- Uma linha em branco no fim de cada arquivo
- Remoção automática de espaços no fim da linha

#### `.editorconfig`

```ini
root = true

[*]
indent_style = tab
charset = utf-8
trim_trailing_whitespace = true
end_of_line = lf
insert_final_newline = true
```

### IDEs e Editores recomendados

- VSCode
- Atom
- Sublime Text
- VIM
- Gedit
- Notepad++
- WebStorm
- etc.

## Como _buildar_ o projeto

O projeto ~~ainda~~ não foi portado para o WebPack, portanto basta rodar um servidor em cima da pasta src.

### Como buildar o SASS, `.scss`

Caso você tenha que fazer uma mudança no tema do Materialize, edite os arquivos `.scss`, caso contrário crie um `.css` a parte.

Para buildar o SASS você vai precisar:

- Do compilador do SASS
  - Uma das formas de instalar é pelo comando `npm i -g sass` ou `yarn global add sass`
- Usar o seguinte comando na pasta `src/css`: `sass _sass/materialize/materialize.scss materialize.css`

## Sobre a estilização

Os padrões de estilização podem ser encontrados na [Guia de Estilos](docs/guia-de-estilos.md)

## Bibliotecas e frameworks

- [Materialize CSS](https://materializecss.com/)

## Documentações e links úteis

Tutorial de Materialize: [aqui](https://www.youtube.com/playlist?list=PLwXQLZ3FdTVGJxKF3ShplF8nMuuxldlEk)
