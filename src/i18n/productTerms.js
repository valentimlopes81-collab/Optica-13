/* ──────────────────────────────────────────────────────────────
   Tradução de ATRIBUTOS de produto (cor, material, estilo, formato,
   descrição de lente). Os valores vêm dos dados dos produtos só em
   Português e são compostos por termos que se repetem (ex. "Preto
   Brilhante (Lentes cinza degradé)"). Em vez de traduzir campo a campo,
   usamos um dicionário de termos/sub-frases (productTerms.json) e
   reconstruímos a string traduzida.

   NOTA: nomes e códigos de MARCA/MODELO (ex. "RAY-BAN RB2140") NÃO
   passam por aqui — mantêm-se iguais em todas as línguas.

   ⚠️ Traduções automáticas — rever por falante nativo antes de definitivo.
   Para corrigir/adicionar um termo: editar src/i18n/productTerms.json
   (chave = termo em pt minúsculas) e, se for um termo novo que apareça
   nos dados, correr a validação do gerador.
   ────────────────────────────────────────────────────────────── */
import TERMS from "./productTerms.json";

export function translateAttr(value, lng) {
  if (!value || lng === "pt" || !TERMS[lng]) return value;
  const dict = TERMS[lng];
  // Mantém os delimitadores "/", "(", ")" e traduz cada parte.
  return value
    .split(/([/()])/)
    .map((seg) => {
      if (seg === "/" || seg === "(" || seg === ")") return seg;
      const m = seg.match(/^(\s*)([\s\S]*?)(\s*)$/);
      const lead = m[1], core = m[2], trail = m[3];
      if (!core) return seg;
      const tr = dict[core.toLowerCase()];
      return lead + (tr || core) + trail;
    })
    .join("");
}

export default translateAttr;
