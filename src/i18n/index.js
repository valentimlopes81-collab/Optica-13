/* ──────────────────────────────────────────────────────────────
   i18n — suporte multi-língua (PT, EN, ES, FR, DE)
   ----------------------------------------------------------------
   Biblioteca: react-i18next (padrão para React/CRA).
   Português é o idioma por defeito (raiz do site). As outras línguas
   usam prefixo de URL: /en, /es, /fr, /de (ver App.tsx).

   ⚠️  AVISO: As traduções EN/ES/FR/DE foram geradas automaticamente e
   DEVEM SER REVISTAS POR UM FALANTE NATIVO antes de ficarem publicadas
   de forma definitiva — sobretudo Alemão (de) e Francês (fr), onde o
   tom é mais sensível num site profissional.

   Só se traduz texto fixo de interface. Nomes/códigos de modelo e de
   marca (ex. "RAY-BAN RB2140") NÃO se traduzem — mantêm-se iguais em
   todas as línguas. Textos longos das páginas institucionais ficam
   para uma 2ª fase.
   ────────────────────────────────────────────────────────────── */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt from "./locales/pt.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";

export const SUPPORTED_LANGS = ["pt", "en", "es", "fr", "de"];
export const DEFAULT_LANG = "pt";

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    de: { translation: de },
  },
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  supportedLngs: SUPPORTED_LANGS,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
