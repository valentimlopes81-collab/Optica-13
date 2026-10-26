# Secção Saldos

A secção **Saldos / Liquidação** (`/saldos`) é uma **lista editorial sem
fotografias**: os 231 artigos são modelos de coleções anteriores, muitos já
descontinuados pelos fornecedores, pelo que não há (nem vai haver) foto de cada
um. Por isso a página **não** usa grelha de produto com imagem — apresenta uma
lista agrupada por marca, e a ação de cada artigo é **"Reservar para ver em
loja"** (reaproveita a marcação já existente), nunca uma compra direta.

## Onde está o quê

- **Dados** — `src/saldosData.js` (gerado de `saldos_items.json`, 231 artigos,
  sem marcas premium). Campos `image`/`color`/etc. existem mas não são usados na
  lista; podem ser preenchidos campo a campo no futuro se se quiser.
- **Listagem** — componente `SaldosPage` em `src/App.tsx` (lista por marca +
  separador de categoria Aros/Óculos de Sol + pesquisa por marca/modelo).
- **Página de produto** — `/saldos/<slug>` continua a funcionar (abre o template
  de produto, também **sem área de foto** para artigos de saldos), apenas com
  botão "Reservar para ver em loja".

## Estado: VISÍVEL e indexável

A secção está no menu (desktop/mobile) e no rodapé, e é indexável pelos motores
de busca (sem `noindex`; `robots.txt` permite tudo).

## Fotos (opcional, não necessário)

Esta pasta e o placeholder `_placeholder.svg` deixaram de ser usados na listagem.
Se algum dia se quiser mostrar foto de um artigo específico, pode colocar-se
`public/fotos/saldos/<CODIGO>.jpg` e voltar a ativar a área de imagem — mas, por
decisão de negócio, a lista funciona assumidamente sem fotos.
