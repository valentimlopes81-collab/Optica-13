# Fotos da secção Saldos

Esta pasta guarda as fotografias dos artigos da secção **Saldos / Liquidação**
do site.

---

## ⚠️ A secção Saldos está ESCONDIDA (até ter fotos reais)

Enquanto os artigos não tiverem fotos reais, a secção está **invisível na
navegação** e **não indexável** pelos motores de busca. **Nada foi apagado** —
as 231 páginas, os dados e as rotas continuam a funcionar (quem tiver o link
direto `/saldos` ou `/saldos/<slug>` ainda consegue abrir).

### Como REATIVAR tudo quando as fotos estiverem prontas

Procurar no projeto por **`SALDOS-OCULTO`** — marca todos os pontos a reverter:

1. **Menu desktop** — `src/App.tsx`: descomentar `// ["Saldos", "saldos"],`
   na nav do `Header`.
2. **Menu mobile** — `src/App.tsx`: descomentar `// ["Saldos", "saldos"],`
   no menu mobile do `Header`.
3. **Rodapé** — `src/App.tsx`: descomentar `// ["saldos", "Saldos"],`
   na lista de Navegação do `Footer`.
4. **Indexação (noindex)** — `src/App.tsx`: remover o bloco `SALDOS-OCULTO`
   dentro do `useEffect` das metas (o que mete `robots = noindex`).
5. **robots.txt** — `public/robots.txt`: remover as linhas
   `Disallow: /saldos` e `Disallow: /saldos/`.

Depois disto, `publicar` (build + deploy) e a secção volta a aparecer e a ser
indexável. Não é preciso mexer em `src/saldosData.js` nem nas páginas.

---

## Como substituir o placeholder pela foto real (SEM mexer em código)

Cada artigo da secção Saldos procura a sua foto por **código** nesta pasta:

```
public/fotos/saldos/<CODIGO>.jpg
```

O `<CODIGO>` é o código do artigo (o mesmo que aparece nos dados e no URL do
produto). Exemplos:

| Artigo                         | Código    | Ficheiro a colocar aqui        |
|--------------------------------|-----------|--------------------------------|
| ADIDAS AF20/00…                | `AR16344` | `public/fotos/saldos/AR16344.jpg` |
| CARRERA 5035/S…                | `OS12820` | `public/fotos/saldos/OS12820.jpg` |

**Passo único:** arrasta a foto para esta pasta com o nome
`<CODIGO>.jpg`. É tudo. Não é preciso editar nenhum ficheiro `.js`/`.tsx`.

- Enquanto o ficheiro `<CODIGO>.jpg` **não existir**, o site mostra
  automaticamente o placeholder `_placeholder.svg` ("Foto em breve").
- Assim que o ficheiro existir, o site passa a mostrar a foto real na próxima
  publicação/atualização.

> O nome do ficheiro tem de ser **exatamente** o código (maiúsculas incluídas)
> com a extensão `.jpg`. Se as tuas fotos forem `.png`/`.webp`, converte-as
> para `.jpg` ou avisa-nos para ajustar a extensão esperada.

## Onde vivem os dados dos 231 artigos

`src/saldosData.js` — gerado automaticamente a partir de `saldos_items.json`.
Aí podes também, campo a campo, preencher descrições e atributos
(material, cor, formato, estilo) que hoje aparecem como `[A REVER]`.

## Nota sobre marcas PREMIUM

As marcas premium (Chopard, Tom Ford, Prada, Fendi, Dolce & Gabbana,
Swarovski, Tag Heuer, Jil Sander, Victoria Beckham, Carolina Herrera,
Missoni, Moschino, Maxmara, Gianfranco Ferré, John Richmond, Escada)
**não fazem parte** desta secção pública e não devem ser adicionadas aqui.
