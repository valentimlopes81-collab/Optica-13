# Traduções / i18n (PT · EN · ES · FR · DE)

Suporte multi-língua do site, com **react-i18next** (a biblioteca padrão para
React/Create React App — este projeto não é Next.js).

## ⚠️ As traduções precisam de revisão por falante nativo

As traduções **EN, ES, FR e DE** foram **geradas automaticamente** e **devem ser
revistas por um falante nativo antes de serem consideradas definitivas** — em
especial **Alemão (de)** e **Francês (fr)**, onde um tom incorreto é muito
visível num site profissional. O Português (pt) é o texto original.

## Onde editar

- `src/i18n/locales/pt.json` — texto original (Português).
- `src/i18n/locales/{en,es,fr,de}.json` — traduções (mesmas chaves que o `pt`).

Para corrigir uma tradução, basta editar o valor da chave correspondente no
ficheiro da língua respetiva. As chaves têm de ser **iguais** em todos os
ficheiros.

## O que está traduzido (1ª fase)

Texto fixo de interface visível em todas as páginas:
menu/navegação, botões do cabeçalho, seletor de idioma, rodapé, **botões dos
slides** do carrossel, **assistente de chat** (saudação, balão, botões rápidos,
respostas, fallback), **rótulos e categorias** das listagens (Óculos de Sol /
Sunglasses / Gafas de sol / Lunettes de soleil / Sonnenbrille, Aros/Monturas…),
filtros, e os **rótulos** da ficha de produto (Material, Cor, Garantia, etc.).

## O que NÃO se traduz

- **Nomes e códigos de produto/marca** (ex. "RAY-BAN RB2140", "ADIDAS AR19163")
  — mantêm-se iguais em todas as línguas.
- Depoimentos de clientes (são citações reais).

## Pendente (2ª fase)

Prosa longa das páginas institucionais (Serviços, Vantagens, Sobre, Contactos,
Termos) e o texto gráfico embutido nas imagens dos slides (está "gravado" nas
imagens `front-*.webp` / `raybanmeta.webp`, por isso traduzi-lo implicaria novas
imagens por língua). Alguns valores de filtro (ex. "Acetato", "Quadrado")
também ficam para a 2ª fase.

## URLs por idioma

Português na raiz (`/`, `/saldos`, …); as outras línguas usam prefixo:
`/en/...`, `/es/...`, `/fr/...`, `/de/...`. O seletor de idioma no cabeçalho
muda de língua mantendo a página atual.
