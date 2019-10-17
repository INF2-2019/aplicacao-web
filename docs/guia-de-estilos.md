# Guia de Estilos

Só pra lembrar, ela não está muito bem feita, mas deve da pra entender...

## Links

- [Projeto no Figma](https://www.figma.com/file/Fsj2sBRsuzV7IB6XUHHjKv/Trabalho-Final-INF2?node-id=0%3A1)
  - Um projeto no Figma onde adicionarei as telas solicitadas
  - Nele temos também: tabelas de cores, alguns componentes (crescendo) e tipografia (em breve)
- [Material.io](https://material.io)
- [Materialize](https://materializecss.com/)

---

## Tipografia

O projeto irá girar em torno da fonte `Montserrat`.

Links: [GitHub](https://github.com/JulietaUla/Montserrat) e [Google Fonts](https://fonts.google.com/specimen/Montserrat).
PS: Passem no GitHub dela e deixem uma ⭐️se gostaram.

### Tamanhos

É recomendado o uso dos tamanhos padrão do framework css utilizado, `Materialize`, ou múltiplos de `2pt` começando a partir dos `14pt`.

### Pesos

Façam uso dos pesos `light`, `regular` e `bold`. As demais não se adequam a nenhum caso de uso previsto, porém podem comunicar à um líder/gerente do projeto caso veja um caso em que outro peso se adequa.

---

## Cores

Foi escolhida uma tabela de cores complementares. Por que? Porque foi a primeira que foi pensada, além do mais ela é uma das mais simples de trabalhar.

### As cores

- Primária: `#29A58C`
- Primária Alt.: `#1C9980`
- Secundaria: `#2C46A5`
- Secundaria Alt.: `#1C3799`
- Terciária / Inativos: `#D8D7D5` \*_Ainda em decisão, pode vir a ser uma opacidade do branco_\*
- Plano de Fundo: `#1F2524`
- Texto Claro: `#FDFBF9`
- Texto Escuro: `#090909`

![Cores](assets/Pallet.png)

#### Cores de Utilidade

- Alerta: `#FDD835`
- Alerta-2: `#FBC02D`
- Erro: `#E53935`
- Erro-2: `#D32F2F`
- Info: `#00B0FF`
- Info-2: `#0091EA`
- Sucesso: `#00E676`
- Sucesso-2: `#00C853`

![Cores de Utilidade](<assets/Util colors.png>)

### Contraste

Garantam que o contraste entre texto e plano de fundo sejam suficiente, 15.8:1.  
Como testar de maneira fácil: veja se dá pra ler com facilidade.

### As tonalidades

Estão disponibilizadas diversas tonalidades das cores primária e secundária, elas podem ser vistas no link do Figma. Ou nos arquivos `CSS`.

Notem que as cores alternativas são uma versão uma tonalidade mais escuras em relação às originais. _(Isso não é regra e pode vir a mudar)_.

![Cores Primárias](<assets/Primary color.png>)
![Cores Secúndarias](<assets/Secondary color.png>)

---

## Espaçamento

O espaçamento será de múltiplos de `4pt`, escalando de `0` até onde precisar.

---

## Conversões

A únidade `pt` pode ser escalada para `css` por meio da proporção `4pt = 0.25rem`.
