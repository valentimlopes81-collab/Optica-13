# Fotos da secção Saldos

Esta pasta guarda as fotografias dos artigos da secção **Saldos / Liquidação**
do site.

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
