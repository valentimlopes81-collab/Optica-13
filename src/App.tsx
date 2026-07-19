// @ts-nocheck
import { useState, useEffect, useRef, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import './global.css';
import {
  Glasses,
  Star,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Calendar,
  Award,
  Clock,
  X,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Filter,
  Search,
  ShoppingBag,
  Eye,
  MessageCircle,
  Send,
  ChevronDown,
  Minus,
  Plus,
  Heart,
  ZoomIn,
  Shield,
} from "lucide-react";

/* ── HELPERS ────────────────────────────────────────────────── */
function Img({ src, alt, className, style, priority = false }) {
  const [err, setErr] = useState(false);
  if (err)
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={style}
      >
        <span className="text-gray-400 text-xs">—</span>
      </div>
    );
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? "eager" : "lazy"} // Se for priority, carrega no segundo zero!
      decoding="async" // Evita engasgos no scroll
      onError={() => setErr(true)}
    />
  );
}

/* Anima um número a contar a partir de 0 quando entra no viewport */
function CountUp({ end, duration = 1500, className, style }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              setValue(Math.floor(progress * end));
              if (progress < 1) requestAnimationFrame(tick);
              else setValue(end);
            };
            requestAnimationFrame(tick);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {value}
    </span>
  );
}
/* ── SHOPIFY INTEGRATION ────────────────────────────────────── */

function ShopifyBuyButton({ productId }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      initShopify();
    } else {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      document.head.appendChild(script);
      script.onload = initShopify;
    }

    function initShopify() {
      if (buttonRef.current) {
         buttonRef.current.innerHTML = '';
      }

      // CRIAMOS O CLIENTE AQUI DENTRO (Resolve o erro do Console!)
      const client = window.ShopifyBuy.buildClient({
        domain: 'dqih6f-80.myshopify.com',
        storefrontAccessToken: 'a9c7a2f027b84643f7ede12707d4e285'
      });

      window.ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: productId,
          node: buttonRef.current,
          moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
          options: {
            product: {
              buttonDestination: 'checkout',
              contents: {
                img: false,
                title: false,
                price: false,
                options: true,
                quantity: false,
                button: true
              },
             text: {
                button: 'Adicionar ao Carrinho',
              },
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0',
                    'margin-bottom': '0'
                  },
                  'width': '100%',
                  'max-width': '100%'
                },
                button: {
                  'background-color': '#0056b3',
                  'color': '#ffffff',
                  'border-radius': '12px',
                  'font-family': 'Jost, sans-serif',
                  'font-weight': '600',
                  'font-size': '14px',
                  'padding': '16px 24px',
                  'width': '100%',
                  'max-width': '100%',
                  'letter-spacing': '0.025em',
                  ':hover': {
                    'background-color': '#004494'
                  }
                }
              }
            },
            cart: {
              text: {
                title: 'O seu carrinho',
                empty: 'O carrinho está vazio.',
                button: 'Finalizar Compra',
                total: 'Total'
              },
              styles: {
                button: {
                  'background-color': '#000000',
                  'border-radius': '12px',
                  'font-family': 'Jost, sans-serif',
                  'font-weight': '600'
                }
              }
            },
            toggle: {
              styles: {
                toggle: {
                  'background-color': '#000000',
                  ':hover': {
                    'background-color': '#333333'
                  }
                }
              }
            }
          }
        });
      });
    }
  }, [productId]);

  return <div ref={buttonRef} className="w-full"></div>;
}
/* ── DATA ───────────────────────────────────────────────────── */
const PRODUCTS = {
  men: [
    {
      id: 1,
      name: "Noir Signature",
      shopifyId: "15723698487670",
      rating: 4.7, 
      reviews: 149, 
      badge: "Premium",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato de alta qualidade com dobradiças OBE flexUno",
      color: "Preto Brilhante",
      style: "Intelectual / Sofisticado",
      shape: "Retangular",
      faceShape: ["round", "oval"],
      budget: "mid", 
      description:
        "A elegância no seu estado mais puro. O modelo Noir Signature da coleção MindTheLook by Vera Velosa é a escolha definitiva para quem procura um visual sofisticado e intelectual. Com armação em acetato preto brilhante e linhas retangulares sólidas, destaca-se pela sua presença marcante e conforto superior graças às dobradiças flexíveis OBE flexUno. Perfeito para equilibrar rostos redondos ou ovais, especialmente quando combinado com cores quentes.",
      image:
        "https://i.postimg.cc/Z0kfQyS1/P1023073.jpg",
       // NOVA LINHA PARA AS FOTOS EXTRA!
      gallery: [
        "https://i.postimg.cc/pyN0SnHf/P1023074.jpg",
        "https://i.postimg.cc/mhxdnFs7/P1023075.jpg",
        "https://i.postimg.cc/5jcPrFVw/P1023076.jpg",
        "https://i.postimg.cc/9z3xkqh9/P1023077.jpg",
        "https://i.postimg.cc/qvVYbWBv/P1023078.jpg"
      ],
    },
   {
              id: 2,
              name: "Ruby Fusion",
              shopifyId: "15721505358198",
              rating: 4.8,
              reviews: 142,
              brand: "MindTheLook",
              price: 139,
              material: "Acetato",
              color: "Vermelho",
              style: "Moderno",
              shape: "Quadrado",
              faceShape: ["round", "oval"],
              budget: "mid",
              description: "Onde a audácia encontra o equilíbrio. Frente em acetato vermelho translúcido oversized e hastes em azul profundo. Design MindTheLook by Vera Velosa, ideal para criar ângulos e definição no rosto.",
              image: "https://dqih6f-80.myshopify.com/cdn/shop/files/P1023047.jpg?v=1777653438&width=832",
     
     // NOVA LINHA PARA AS FOTOS EXTRA!
      gallery: [
        "https://i.postimg.cc/TY2RPLMN/P1023050.jpg",
        "https://i.postimg.cc/rmCkVcfB/P1023047.jpg"
      ],
     },
    {
      id: 3,
     name: "Ametista Harmony",
      shopifyId: "15723577016694",
      rating: 4.9,
      reviews: 87,
      brand: "MindTheLook",
      price: 139,
      material: "Acetato",
      color: "Transparente", // Coloquei transparente para funcionar com os filtros do site
      style: "Arrojado",
      shape: "Quadrado",
      faceShape: ["round", "oval"],
      budget: "mid",
      description: "Sofisticação arrojada em acetato translúcido lavanda com hastes em amarelo âmbar. Formato quadrado oversized retro e elegante, perfeito para equilibrar rostos redondos ou ovais. Design exclusivo by Vera Velosa (Made in Italy).",
      image: "https://i.postimg.cc/R0kDjfdD/P1023065.jpg",
      
      // NOVA LINHA PARA AS FOTOS EXTRA!
      gallery: [
        "https://i.postimg.cc/CxBpZbvQ/P1023066.jpg",
        "https://i.postimg.cc/kg03WDZz/P1023071.jpg",
        "https://i.postimg.cc/JzfVjtvs/P1023072.jpg"
         ],
     },
    {
      id: 4, 
      shopifyId: "15723736039798", 
      name: "Crystal Aura",
      rating: 4.9, 
      reviews: 128, 
      badge: "Nova Coleção",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato Translúcido e Metal Texturado",
      color: "Cristal / Dourado",
      style: "Elegante / Moderno",
      shape: "Cat-eye Suave",
      faceShape: ["round", "oval"],
      budget: "mid", 
      description:
        "Uma fusão perfeita de leveza e luxo. O modelo Crystal Aura destaca-se pela sua armação frontal translúcida que ilumina o rosto, complementada por hastes metálicas douradas com um acabamento texturado exclusivo. Este design cat-eye suave é ideal para elevar o estilo de rostos redondos ou ovais. Para um look radiante, combine-os com uma paleta de cores quentes que realce o brilho sofisticado do dourado.",
      image:"https://i.postimg.cc/nhXWLZdR/P1023080.jpg",

       // NOVA LINHA PARA AS FOTOS EXTRA!
      gallery: [
        "https://i.postimg.cc/y8DGNBff/P1023081.jpg",
        "https://i.postimg.cc/138dzPW7/P1023082.jpg",
        "https://i.postimg.cc/RZWY09P1/P1023084.jpg",
        "https://i.postimg.cc/sDD8t576/P1023085.jpg"
         ],     
    },
   {
  id: 5,
  shopifyId: "15723777851766",
  name: "Sky Apricot Fusion",
  rating: 4.9,
  reviews: 142,
  badge: "Novo",
  brand: "MindTheLook by Vera Velosa",
  price: 139,
  material: "Acetato Premium Translúcido",
  color: "Azul Aquamarine / Pêssego",
  style: "Contemporâneo / Vibrante",
  shape: "Geométrico Suave",
  faceShape: ["round", "oval"],
  budget: "mid",
  description: 
    "Uma fusão audaz da coleção MindTheLook. O modelo Sky Apricot Fusion combina a transparência do azul frontal com o calor das hastes em tom pêssego. Desenhado para favorecer rostos redondos e ovais, este par brilha intensamente quando acompanhado por uma paleta de cores quentes e solares.",
  image: "https://i.postimg.cc/bJmMJJj3/P1023086.jpg", 

      // NOVA LINHA PARA AS FOTOS EXTRA!
      gallery: [
        "https://i.postimg.cc/ZRwgRRhw/P1023087.jpg",
        "https://i.postimg.cc/Kz0Vzzyf/P1023088.jpg",
        "https://i.postimg.cc/1tvTttZH/P1023089.jpg",
        "https://i.postimg.cc/13FLHspX/P1023090.jpg"
         ],     
    },
    {
  id: 6,
  shopifyId: "15724018958710",
  name: "Aureum Navigator",
  rating: 4.9,
  reviews: 128,
  badge: "Premium",
  brand: "MindTheLook by Vera Velosa",
  price: 147,
  material: "Metal Dourado com Hastes Gravadas",
  color: "Dourado / Preto",
  style: "Clássico / Luxo",
  shape: "Aviador Retangular",
  faceShape: ["round", "oval"],
  budget: "mid",
  description: "O epítome do luxo clássico. O Aureum Navigator combina uma estrutura metálica dourada ultra-fina com detalhes gravados nas hastes e o selo de qualidade Made in Italy. Desenhado para conferir estrutura a rostos redondos e ovais, brilha intensamente quando coordenado com paletas de cores quentes e terrosas.",
  image: "https://i.postimg.cc/vBzjTwjZ/P1023115.jpg",

       // NOVA LINHA PARA AS FOTOS EXTRA!
      gallery: [
        "https://i.postimg.cc/26wJyNJz/P1023116.jpg",
        "https://i.postimg.cc/0Qf3j13P/P1023117.jpg",
        "https://i.postimg.cc/Ssr5Rb5m/P1023118.jpg",
        "https://i.postimg.cc/Yqy5QkS2/P1023119.jpg"
         ],     
},
    {
  id: 7,
  shopifyId: "15724037341558",
  name: "Midnight Edge",
  rating: 4.8,
  reviews: 167,
  badge: "Bestseller",
  brand: "MindTheLook by Vera Velosa",
  price: 149,
  material: "Acetato Bold com Detalhes Metálicos",
  color: "Preto Brilhante",
  style: "Urbano / Arrojado",
  shape: "Retangular Wayfarer",
  faceShape: ["round", "oval"],
  budget: "mid",
  description: "Pura autoridade de estilo. O modelo Midnight Edge destaca-se pela sua armação robusta em acetato preto e detalhes prateados icónicos. Ideal para estruturar rostos redondos ou ovais, este par da coleção MindTheLook é o complemento perfeito para um guarda-roupa de tons quentes e sofisticados.",
  image: "https://i.postimg.cc/Sx11wG99/P1023120.jpg",

      // NOVA LINHA PARA AS FOTOS EXTRA!
      gallery: [
        "https://i.postimg.cc/htZZH0md/P1023121.jpg",
        "https://i.postimg.cc/rwZZv94W/P1023122.jpg",
        "https://i.postimg.cc/9QggvB9Z/P1023123.jpg",
        "https://i.postimg.cc/NMHn8rLZ/P1023124.jpg"
         ],     
},
    {
  id: 8,
  shopifyId: "15724067225974",
  name: "Ivory Skyline",
  rating: 4.8,
  reviews: 142,
  badge: "Elegante",
  brand: "MindTheLook by Vera Velosa",
  price: 139,
  material: "Acetato Premium Bicolor",
  color: "Creme Marfim / Azul Marinho",
  style: "Moderno / Executivo",
  shape: "Retangular Suave",
  faceShape: ["round", "oval"],
  budget: "mid",
  description: "Sofisticação moderna com um toque clássico. O modelo Ivory Skyline combina a leveza do tom marfim com a sobriedade do azul marinho. Ideal para estruturar rostos redondos e ovais, esta peça da coleção MindTheLook destaca-se especialmente quando acompanhada por paletas de cores quentes e acessórios dourados.",
  image: "https://i.postimg.cc/t4yJ6hvW/P1023210.jpg",

      // NOVA LINHA PARA AS FOTOS EXTRA!
      gallery: [
        "https://i.postimg.cc/Vk1vtjZB/P1023211.jpg",
        "https://i.postimg.cc/CxY58jr4/P1023212.jpg",
        "https://i.postimg.cc/4xZycz26/P1023213.jpg",
        "https://i.postimg.cc/sfq3Ypx5/P1023214.jpg"
         ],      
},
    ],   // <--- AQUI FECHAS A LISTA "men"

  women: [ // <--- AQUI ABRES A LISTA "women"
  
   {
  id: 9,
  shopifyId: "15724125893418",
  name: "Navy Palette",
  rating: 4.9,
  reviews: 145,
  badge: "Original",
  brand: "MindTheLook by Vera Velosa",
  price: 139,
  material: "Acetato com Dobradiças OBE flexUno",
  color: "Azul Marinho / Mosaico Colorido",
  style: "Criativo / Executivo",
  shape: "Retangular",
  faceShape: ["round", "oval"],
  budget: "mid",
  description: "Onde a sobriedade encontra a expressão artística. O modelo Navy Palette combina uma frente clássica em azul profundo com hastes padronizadas em estilo mosaico. Desenhado para favorecer rostos redondos e ovais, este par da coleção MindTheLook ganha vida quando coordenado com paletas de cores quentes e acessórios vibrantes.",
  image: "https://i.postimg.cc/GtWrsd5R/P1023464-(1).jpg",
  gallery: [
    "https://i.postimg.cc/Y0GM9hbS/P1023465.jpg",
    "https://i.postimg.cc/wMygv70T/P1023466.jpg",
    "https://i.postimg.cc/XqG4JpQj/P1023467.jpg",
    "https://i.postimg.cc/7hGw6fmZ/P1023468.jpg"
  ],
},
    {
      id: 10,
      shopifyId: "15726320091510",
      name: "Havana Bold",
      rating: 4.8,
      reviews: 178,
      badge: "Clássico",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato Bold com Detalhes Prateados",
      color: "Tartaruga",
      style: "Retro / Intelectual",
      shape: "Retangular",
      faceShape: ["round", "oval"],
      budget: "mid",
      description: "Um clássico reinventado com ousadia. O Havana Bold destaca-se pela sua armação robusta em acetato padrão tartaruga e rebites prateados retro. Perfeito para estruturar rostos redondos ou ovais, este modelo versátil é um verdadeiro camaleão que se adapta a qualquer guarda-roupa, seja em tons terrosos ou cores vibrantes.",
      image: "https://i.postimg.cc/15bc425m/P1023417-(1).jpg", // Substituir pelos teus links se já os tiveres gerado no postimg
      gallery: [
        "https://i.postimg.cc/4NjbnqN3/P1023419.jpg",
        "https://i.postimg.cc/RV2QqyVv/P1023420.jpg",
        "https://i.postimg.cc/zX4S36XD/P1023421-(1).jpg"
      ],
    },
    /*
    {
      id: 11,
      shopifyId: "15726335263094",
      name: "Retro Circle Havana",
      rating: 4.9,
      reviews: 162,
      badge: "Vintage",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato Premium com Rebites Prateados",
      color: "Tartaruga",
      style: "Retro / Intelectual",
      shape: "Redondo",
      faceShape: ["square", "oval"],
      budget: "mid",
      description: "O charme intemporal do design vintage. O modelo Retro Circle Havana destaca-se pela sua armação redonda em padrão tartaruga e a clássica ponte em fechadura. Ideal para suavizar rostos quadrados ou retangulares, esta peça de forte personalidade é o complemento perfeito para coordenados em tons terrosos e quentes.",
      image: "https://i.postimg.cc/cH6c5nsQ/P1023397.jpg", // Lembra-te de trocar pelos teus links reais
      gallery: [
        "https://i.postimg.cc/gJrKBZYq/P1023398.jpg",
        "https://i.postimg.cc/HxjtPypw/P1023399.jpg",
        "https://i.postimg.cc/k4DyhbnN/P1023401.jpg"
      ],
    },
    */
    {
      id: 12,
      shopifyId: "15726347485558", // Atualizar depois com o ID do Shopify
      name: "Pantos Havana",
      rating: 4.8,
      reviews: 184,
      badge: "Clássico",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato Escuro com Dobradiças OBE flexUno",
      color: "Tartaruga",
      style: "Intelectual / Retro",
      shape: "Pantos Suave",
      faceShape: ["square", "oval"],
      budget: "mid",
      description: "A essência do estilo intelectual chic. O modelo Pantos Havana recupera o clássico formato arredondado, enriquecido por um padrão tartaruga profundo e distintos rebites prateados quadrados. Com dobradiças flexíveis para conforto extremo, este modelo é perfeito para suavizar rostos quadrados e combina brilhantemente com tons neutros, camel ou verde esmeralda.",
      image: "https://i.postimg.cc/c4WnvnVV/P1023391.jpg", // Substituir pelos teus links reais
      gallery: [
        "https://i.postimg.cc/fTs9V96r/P1023392.jpg",
        "https://i.postimg.cc/dtFyhyzH/P1023393.jpg",
        "https://i.postimg.cc/kXCb2bkj/P1023394.jpg",
        "https://i.postimg.cc/yYKZDZwp/P1023395.jpg"
      ],
    },
    {
      id: 13,
      shopifyId: "15726358167926",
      name: "Hexa Noir",
      rating: 4.8,
      reviews: 156, // Reviews entre 100 e 200, conforme pediste
      badge: "Tendência",
      brand: "MindTheLook by Vera Velosa",
      price: 149,
      material: "Metal Ultrafino",
      color: "Preto",
      style: "Minimalista / Moderno",
      shape: "Geométrico",
      faceShape: ["round", "oval"],
      budget: "mid",
      description: "Minimalismo com atitude arquitetónica. O modelo Hexa Noir apresenta uma estrutura metálica negra ultrafina com um formato geométrico moderno. Incrivelmente leve e com plaquetas ajustáveis, é a peça ideal para adicionar ângulos e definição a rostos redondos e ovais. Uma aposta segura para looks urbanos e sofisticados.",
      image: "https://i.postimg.cc/nztH3vKd/P1023385.jpg", // Substituir pelo teu link real
      gallery: [
        "https://i.postimg.cc/8c4PJj6R/P1023386.jpg",
        "https://i.postimg.cc/vThHgcVL/P1023387.jpg",
        "https://i.postimg.cc/6qc52yvV/P1023388.jpg",
        "https://i.postimg.cc/RhdV6NHL/P1023389.jpg"
      ],
    },
    {
      id: 14,
      shopifyId: "15726366392694", // Atualizar depois
      name: "Onyx Halo",
      rating: 4.9,
      reviews: 172,
      badge: "Elegante",
      brand: "MindTheLook by Vera Velosa",
      price: 149,
      material: "Metal Premium com Detalhe Joalharia",
      color: "Preto / Dourado",
      style: "Luxo / Clássico",
      shape: "Redondo",
      faceShape: ["square", "oval"],
      budget: "mid",
      description: "Uma verdadeira peça de joalharia para o olhar. O modelo Onyx Halo combina a leveza do metal dourado com um elegante contorno negro nas lentes e um detalhe geométrico sofisticado nas hastes. Ideal para suavizar rostos quadrados e perfeito para elevar qualquer look, harmonizando de forma divinal com acessórios dourados.",
      image: "https://i.postimg.cc/0231tYPn/P1023379.jpg", // Substituir pelos teus links reais
      gallery: [
        "https://i.postimg.cc/65SxHrtv/P1023380.jpg",
        "https://i.postimg.cc/bNMf6xpS/P1023381.jpg",
        "https://i.postimg.cc/fTFQHcD0/P1023382.jpg",
        "https://i.postimg.cc/J4gCTNMJ/P1023383.jpg"
      ],
    },
    {
      id: 15,
      shopifyId: "15726394835318", // Atualizar depois
      name: "Noir Heritage",
      rating: 4.8,
      reviews: 158,
      badge: "Clássico",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato Preto Brilhante",
      color: "Preto",
      style: "Retro / Intelectual",
      shape: "Pantos / Redondo",
      faceShape: ["square", "oval"],
      budget: "mid",
      description: "Um ícone que transcende tendências. O Noir Heritage em acetato preto brilhante recupera o formato vintage arredondado com a icónica ponte em fechadura e rebites prateados autênticos. Ideal para suavizar rostos quadrados ou retangulares, é a peça mais versátil da coleção, combinando na perfeição com qualquer paleta de cores ou estilo pessoal.",
      image: "https://i.postimg.cc/K8wLvHFz/P1023316.jpg", // Lembra-te de trocar pelos links reais do postimg
      gallery: [
        "https://i.postimg.cc/HkR5shHk/P1023317.jpg",
        "https://i.postimg.cc/0yFm2Bx2/P1023318.jpg",
        "https://i.postimg.cc/GmVYh5rp/P1023320.jpg"
      ],
    },
    {
      id: 16,
      shopifyId: "15726400438646", // Atualizar depois
      name: "Noir Magenta",
      rating: 4.8,
      reviews: 134,
      badge: "Criativo",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato com Bloco de Cor",
      color: "Preto / Magenta",
      style: "Moderno / Arrojado",
      shape: "Quadrado Suave",
      faceShape: ["round", "oval"],
      budget: "mid",
      description: "O clássico preto com uma surpresa de perfil. O modelo Noir Magenta apresenta uma frente sólida e elegante em acetato negro, complementada por hastes com um vibrante bloco de cor em magenta e bege. Ideal para estruturar rostos redondos ou ovais, é a escolha perfeita para quem gosta de detalhes únicos e cheios de atitude.",
      image: "https://i.postimg.cc/NMpjLKTV/P1023221.jpg", // Lembra-te de trocar pelos links reais
      gallery: [
        "https://i.postimg.cc/262S31vG/P1023222.jpg",
        "https://i.postimg.cc/50n2jXvm/P1023223.jpg",
        "https://i.postimg.cc/G2qm94YQ/P1023224.jpg",
        "https://i.postimg.cc/vB3ZD49t/P1023225.jpg"
      ],
    },
    {
    id: 17,
      shopifyId: "15726409941366", // Atualizar depois
      name: "Ocean Mosaic",
      rating: 4.8,
      reviews: 148,
      badge: "Vibrante",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato Premium",
      color: "Azul Mosaico",
      style: "Criativo / Moderno",
      shape: "Borboleta Suave",
      faceShape: ["round", "oval"],
      budget: "mid",
      description: "Uma afirmação de estilo e criatividade. O modelo Ocean Mosaic cativa com a sua frente num padrão vibrante de tons azuis e violetas, em perfeito equilíbrio com as hastes num azul profundo sólido. O formato borboleta suave levanta o olhar, sendo ideal para favorecer rostos redondos ou ovais. Uma peça de destaque para quem adora originalidade.",
      image: "https://i.postimg.cc/Kvgmhqqy/P1023226.jpg", // Substituir pelos teus links reais
      gallery: [
        "https://i.postimg.cc/YqmtBnXZ/P1023227.jpg",
        "https://i.postimg.cc/8PrTgKyx/P1023228.jpg",
        "https://i.postimg.cc/J4BRC6Td/P1023229.jpg",
        "https://i.postimg.cc/ZKyJz7fg/P1023230.jpg"
      ],
},
    {
      id: 18,
      shopifyId: "15726420296054", // Atualizar depois com o ID do Shopify
      name: "Havana Color Block",
      rating: 4.8,
      reviews: 142,
      badge: "Dinâmico",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato Premium com Detalhe de Cor",
      color: "Tartaruga / Vermelho e Azul",
      style: "Moderno / Casual Chic",
      shape: "Quadrado Suave",
      faceShape: ["round", "oval"],
      budget: "mid",
      description: "A reinvenção do clássico com energia moderna. O modelo Havana Color Block funde a elegância do acetato tartaruga escuro com um detalhe surpreendente nas hastes em blocos de cor vermelho e azul. Ideal para dar estrutura a rostos redondos e ovais, é a escolha perfeita para quem procura um look que transita na perfeição do escritório para o fim de semana.",
      image: "https://i.postimg.cc/CLYp9hqF/P1023233.jpg", // Lembra-te de trocar pelos links reais!
      gallery: [
        "https://i.postimg.cc/DyF3RvXh/P1023234.jpg",
        "https://i.postimg.cc/7YDrjH2y/P1023235.jpg",
        "https://i.postimg.cc/7YDrjH2r/P1023236.jpg",
        "https://i.postimg.cc/zX5Y4zg5/P1023237.jpg"
      ],
},
    {
      id: 19,
      shopifyId: "15726426489206", // Atualizar depois
      name: "Feline Noir",
      rating: 4.9,
      reviews: 165,
      badge: "Glamour",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato Bold Brilhante",
      color: "Preto",
      style: "Arrojado / Glamour",
      shape: "Cat-Eye",
      faceShape: ["round", "oval", "heart"],
      budget: "mid",
      description: "Puro glamour e feminilidade. O modelo Feline Noir destaca-se pelo seu formato olho de gato vincado em acetato preto espesso. Famoso por criar um efeito de 'lifting' no olhar, é a escolha perfeita para destacar as maçãs do rosto em rostos redondos, ovais ou coração. Uma armação de poder para mulheres com atitude.",
      image: "https://i.postimg.cc/m2dpVB3K/P1023276.jpg", // Substituir pelos teus links
      gallery: [
        "https://i.postimg.cc/Kv9pQx7H/P1023277.jpg",
        "https://i.postimg.cc/15W7Ms0W/P1023278.jpg",
        "https://i.postimg.cc/X721x4K1/P1023280.jpg",
        "https://i.postimg.cc/X721x4KQ/P1023281.jpg"
      ],
}, 
    {
      id: 20,
      gender: "", // Propriedade fantasma
      shopifyId: "15745550451062", // Atualizar depois
      name: "Havana Dynamic",
      rating: 4.8,
      reviews: 154,
      badge: "Dinâmico",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato Premium com Bloco de Cor",
      color: "Tartaruga / Vermelho e Azul",
      style: "Casual Chic / Moderno",
      shape: "Pantos",
      faceShape: ["square", "oval"],
      budget: "mid",
      description: "A fusão perfeita entre tradição e originalidade. O modelo Havana Dynamic apresenta uma frente clássica em tartaruga escuro, contrastando com hastes desportivas com blocos de cor em vermelho e azul. O seu formato arredondado é ideal para suavizar rostos quadrados ou retangulares. Uma aposta cheia de atitude para os seus looks casuais.",
      image: "https://i.postimg.cc/d0x9NMRs/1.jpg", // Substituir pelo link real
      gallery: [
        "https://i.postimg.cc/T1TD2CfD/1-1.png",
        "https://i.postimg.cc/FzGJY3HD/1-2.png",
        "https://i.postimg.cc/sxKZM7gK/1-3.png"
      ],
},
    {
      id: 21,
      gender: "", 
      shopifyId: "15745646461302", // Atualizar depois
      name: "Iconic Shadow",
      rating: 4.9,
      reviews: 192,
      badge: "Glamour",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato Premium",
      color: "Preto",
      style: "Glamour / Clássico",
      shape: "Cat-Eye",
      faceShape: ["round", "oval", "heart"],
      budget: "mid",
      description: "Glamour intemporal para o seu rosto. O modelo Iconic Shadow destaca-se pelo seu formato cat-eye arrojado em acetato preto de alta densidade e lentes em degradé. Um acessório indispensável que levanta o olhar e confere uma atitude poderosa. Ideal para rostos redondos, ovais ou coração.",
      image: "https://i.postimg.cc/FFWJjbxx/2.png", // Substituir pelos teus links reais
      gallery: [
        "https://i.postimg.cc/Bb6LrtJT/2-1.png",
        "https://i.postimg.cc/qq5h40Rg/2-2.png"
      ],
},
        {
      id: 22,
      gender: "", 
      shopifyId: "15745654096246", // Atualizar depois
      name: "Ultem Hexa",
      rating: 4.9,
      reviews: 141,
      badge: "Tecnologia",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Ultem (Material de Alta Performance)",
      color: "Preto",
      style: "Vanguardista / Minimalista",
      shape: "Hexagonal",
      faceShape: ["round", "oval"],
      budget: "mid",
      description: "A vanguarda da ótica ao seu dispor. O modelo Ultem Hexa é fabricado em material de tecnologia aeroespacial, garantindo uma leveza incomparável e flexibilidade extrema. O seu formato hexagonal moderno cria ângulos que definem rostos arredondados, enquanto a sua construção robusta oferece durabilidade superior. Uma escolha inteligente para quem não abdica de conforto e estilo.",
      image: "https://i.postimg.cc/YSz5vzFK/3.png", // Substituir pelo teu link real
      gallery: [
        "https://i.postimg.cc/7L4vPWf5/3-1.png",
        "https://i.postimg.cc/257s17Zx/3-2.png",
        "https://i.postimg.cc/MGmCnmBW/3-3.png",
        "https://i.postimg.cc/3RrPm0XV/3-4.png",
        "https://i.postimg.cc/FKVMYVL8/3-5.png"
      ],
},
        {
      id: 23,
      gender: "", 
      shopifyId: "15745666482550", // Atualizar depois
      name: "Vintage Cat-Havana",
      rating: 4.8,
      reviews: 139,
      badge: "Clássico",
      brand: "MindTheLook by Vera Velosa",
      price: 149,
      material: "Acetato Premium",
      color: "Tartaruga",
      style: "Retro / Glamour",
      shape: "Cat-Eye Estruturado",
      faceShape: ["round", "oval", "heart"],
      budget: "mid",
      description: "Glamour intemporal com um toque retro. O modelo Vintage Cat-Havana combina o icónico formato olho de gato com um padrão tartaruga rico e sofisticado. Desenhado para levantar o olhar e definir rostos redondos ou ovais, é uma peça de autor que alia conforto a uma presença inconfundível. Fabricado com a excelência do design italiano.",
      image: "https://i.postimg.cc/gjfWdcCQ/4.png", // Substituir pelos teus links reais
      gallery: [
        "https://i.postimg.cc/QCR3sN2q/4-1.png",
        "https://i.postimg.cc/KcVFtQ12/4-2.png",
        "https://i.postimg.cc/8k3DLw7G/4-3.png",
        "https://i.postimg.cc/8k3DLw7D/4-4.png"
      ],
},
       /* {
      id: 24,
      gender: "", 
      shopifyId: "15745681555830", // Atualizar depois com o ID do Shopify
      name: "Teal Horizon",
      rating: 4.8,
      reviews: 162,
      badge: "Statement",
      brand: "MindTheLook by Vera Velosa",
      price: 149,
      material: "Acetato Premium Bicolor",
      color: "Azul Petróleo / Mosaico",
      style: "Fashion / Arrojado",
      shape: "Cat-Eye",
      faceShape: ["round", "oval", "heart"],
      budget: "high",
      description: "Uma verdadeira peça de 'statement' para o seu olhar. O modelo Teal Horizon deslumbra com o seu formato cat-eye estruturado e um design bicolor único: topo em azul petróleo vibrante e base em padrão mosaico escuro. Criado para levantar a expressão facial, é o acessório ideal para transformar instantaneamente qualquer look num visual de alta moda.",
      image: "https://i.postimg.cc/fLVdgBD0/5.png", // Substituir pelo link real gerado
      gallery: [
        "https://i.postimg.cc/mDP968Bg/5-1.png",
        "https://i.postimg.cc/JnsXdPMD/5-2.png",
        "https://i.postimg.cc/638Z1Ytv/5-3.png"
      ],
},*/
   {
      id: 25, 
      gender: "", 
      shopifyId: "15751421690230", // Atualizar depois
      name: "Cosmic Noir (2-in-1)",
      rating: 4.9,
      reviews: 188,
      badge: "2-em-1",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato Premium com Clip-On Magnético",
      color: "Preto / Padrão Cósmico",
      style: "Prático / Glamour",
      shape: "Cat-Eye Bold",
      faceShape: ["round", "oval", "heart"],
      budget: "high",
      description: "Praticidade aliada ao glamour absoluto. O Cosmic Noir é um modelo 2-em-1: uma elegante armação cat-eye em preto sólido que se transforma instantaneamente nuns óculos de sol arrojados graças ao seu clip-on magnético com padrão de flocos brilhantes. O formato perfeito para criar um efeito 'lifting' no rosto, garantindo que está sempre pronta para qualquer ambiente.",
      image: "https://i.postimg.cc/65sxCkhx/6.png", // Substituir pelo link real
      gallery: [
        "https://i.postimg.cc/bNXf1793/6-2.png",
        "https://i.postimg.cc/7Yg89KKR/6-1.png",
        "https://i.postimg.cc/dtMcGbjN/6-3.png"
      ],
},
    /* {
      id: 26, // Substituir pelo ID correto na tua lista
      gender: "", 
      shopifyId: "15751425196406", // Atualizar depois
      name: "Ultem Havana (2-in-1)",
      rating: 4.9,
      reviews: 176,
      badge: "2-em-1",
      brand: "MindTheLook by Vera Velosa",
      price: 139, // Como é 2-em-1 e Ultem, sugeri o preço premium
      material: "Ultem Premium com Clip-On Magnético",
      color: "Tartaruga",
      style: "Prático / Clássico",
      shape: "Quadrado Oversize",
      faceShape: ["round", "oval"],
      budget: "high",
      description: "A inteligência do design em formato de óculos. Fabricado em ULTEM ultra-leve e flexível, o modelo Ultem Havana apresenta um formato quadrado oversize em padrão tartaruga. Graças ao seu clipe magnético integrado, transforma-se instantaneamente nuns sofisticados óculos de sol. Ideal para rostos redondos e ovais, é o derradeiro acessório para quem valoriza conforto e praticidade no dia a dia.",
      image: "https://i.postimg.cc/Yqyn1YHP/7.png", // Substituir pelo link real gerado
      gallery: [
        "https://i.postimg.cc/8PnKhMS3/7-2.png",
        "https://i.postimg.cc/RVbscKBk/7-1.png"
      ],
},*/
    {
      id: 27, // Confirma se é o 29 na tua lista
      gender: "", 
      shopifyId: "15751431225718", // Atualizar depois com o ID do Shopify
      name: "Pantos Flex Dark Havana",
      rating: 4.8,
      reviews: 147,
      badge: "Conforto",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato Premium com Dobradiças OBE flexUno",
      color: "Tartaruga Escuro",
      style: "Intelectual / Clássico",
      shape: "Pantos",
      faceShape: ["square", "oval"],
      budget: "mid",
      description: "O clássico desenhado para o conforto absoluto. O Pantos Flex Dark Havana combina o icónico formato arredondado com dobradiças OBE flexUno de alta flexibilidade, garantindo um ajuste perfeito sem pressão. Com o seu tom tartaruga profundo e detalhes prateados retro, é a escolha ideal para suavizar rostos quadrados e elevar o seu estilo diário com um toque intelectual.",
      image: "https://i.postimg.cc/nL592Vzr/8-2.png", // Substituir pelos teus links reais
      gallery: [
        "https://i.postimg.cc/MGXj1fWn/8.png"
      ],
},
    {
      id: 28, // Confirma se é o 30 na tua lista
      gender: "", 
      shopifyId: "15751439516022", // Atualizar depois
      name: "Urban Magenta",
      rating: 4.8,
      reviews: 132,
      badge: "Moderno",
      brand: "MindTheLook by Vera Velosa",
      price: 139,
      material: "Acetato Premium com Bloco de Cor",
      color: "Preto / Magenta",
      style: "Casual Chic / Moderno",
      shape: "Quadrado Arredondado",
      faceShape: ["square", "oval"],
      budget: "mid",
      description: "O clássico preto com um twist feminino. O modelo Urban Magenta apresenta uma frente suave em acetato negro, perfeitamente complementada por hastes com um detalhe em bloco de cor bege e magenta. Ideal para suavizar rostos quadrados ou retangulares, é a escolha certa para quem procura versatilidade diária com um toque de originalidade.",
      image: "https://i.postimg.cc/fLnmZTND/9.png", // Substituir pelos teus links reais
      gallery: [
        "https://i.postimg.cc/7680DYkD/9-1.png"
      ],
},
    {
      id: 29, // Confirma se é o 31 na tua lista
      gender: "", 
      shopifyId: "15751445217654", // Atualizar depois
      name: "Aero Gunmetal (2-in-1)",
      rating: 4.9,
      reviews: 185,
      badge: "2-em-1",
      brand: "MindTheLook by Vera Velosa",
      price: 149, // Preço premium sugerido para metal 2-em-1
      material: "Metal Premium com Clip-On Magnético",
      color: "Gunmetal (Cinza Escuro)",
      style: "Clássico / Piloto",
      shape: "Aviador",
      faceShape: ["square", "heart", "oval"],
      budget: "high",
      description: "O formato mais icónico do mundo com funcionalidade em dobro. O Aero Gunmetal apresenta o clássico design aviador de ponte dupla numa leve estrutura metálica cinza escuro. O seu prático clip-on magnético converte-o instantaneamente nuns óculos de sol cheios de atitude. Ideal para suavizar rostos quadrados e indispensável para quem valoriza um estilo intemporal e prático.",
      image: "https://i.postimg.cc/KzjSGFrq/10.png", // Substituir pelos teus links reais
      gallery: [
        "https://i.postimg.cc/fLynzZjG/10-2.png",
        "https://i.postimg.cc/ZRntbZFX/10-1.png",
        "https://i.postimg.cc/k4G3J9Fj/10-3.png"
      ],
},
    {
      id: 30, // Confirma se é o 32 na tua lista
      gender: "", 
      shopifyId: "15751451574646", // Atualizar depois
      name: "Navigator Silver (2-in-1)",
      rating: 4.8,
      reviews: 164,
      badge: "2-em-1",
      brand: "MindTheLook by Vera Velosa",
      price: 149, 
      material: "Metal Premium com Clip-On Magnético",
      color: "Prateado",
      style: "Moderno / Piloto",
      shape: "Retangular / Aviador",
      faceShape: ["round", "oval"],
      budget: "high",
      description: "A evolução do design clássico com a máxima versatilidade. O Navigator Silver apresenta uma estrutura metálica prateada com ponte dupla e linhas retangulares. Equipado com um prático clip-on magnético, passa de óculos de vista a óculos de sol num instante. A armação perfeita para adicionar estrutura a rostos redondos e ovais com muito estilo.",
      image: "https://i.postimg.cc/CLFtSwh7/11.png", // Substituir pelos teus links reais
      gallery: [
        "https://i.postimg.cc/yYV5s710/11-2.png",
        "https://i.postimg.cc/RVM84vSQ/11-1.png",
        "https://i.postimg.cc/QxXPhj8J/11-3.png"
      ],
},
    {
      id: 32, // Confirma se é o 34 na tua lista
      gender: "", 
      shopifyId: "15751458914678", // Atualizar depois com o ID do Shopify
      name: "Havana Sculpt Polarized",
      rating: 4.9,
      reviews: 210,
      badge: "Polarizado",
      brand: "MindTheLook by Vera Velosa",
      price: 139, // Ajusta para 139 se for esse o caso
      material: "Acetato Bold com Lentes Polarizadas",
      color: "Tartaruga Escuro",
      style: "Glamour / Statement",
      shape: "Cat-Eye Oversize",
      faceShape: ["round", "oval", "heart"],
      budget: "high",
      description: "Alta proteção e design escultural. Os óculos de sol Havana Sculpt destacam-se pelas suas lentes polarizadas premium, que eliminam o brilho e garantem uma visão nítida. A armação oversize em tartaruga escuro possui hastes espessas e geometricamente facetadas para uma presença inesquecível. O acessório definitivo para conduzir com estilo ou brilhar nos dias mais solarengos.",
      image: "https://i.postimg.cc/vTR4fPmh/13.png", // Substituir pelos teus links reais
      gallery: [
        "https://i.postimg.cc/hjQJJFK6/13-3.png",
        "https://i.postimg.cc/xCNkkr9B/13-1.png",
        "https://i.postimg.cc/Y0cvYXSX/13-2.png"
      ],
},
    {
      id: 33, // Confirma se é o 35 na tua lista
      gender: "", 
      shopifyId: "15751460094326", // Atualizar depois com o ID do Shopify
      name: "Noir Prestige",
      rating: 4.8,
      reviews: 156,
      badge: "Clássico",
      brand: "MindTheLook by Vera Velosa",
      price: 139, 
      material: "Acetato Premium",
      color: "Preto / Dourado",
      style: "Clássico / Minimalista",
      shape: "Retangular Suave",
      faceShape: ["round", "oval", "heart"],
      budget: "mid",
      description: "O clássico indispensável com um toque de luxo. O modelo Noir Prestige apresenta uma armação em acetato preto brilhante, elevada por um elegante traço dourado nas hastes. Com um formato retangular suave e incrivelmente versátil, é o acessório perfeito para estruturar o rosto e garantir um estilo sofisticado e intemporal em qualquer ocasião.",
      image: "https://i.postimg.cc/s2RHHzND/14.png", // Substituir pelos teus links reais
      gallery: [
        "https://i.postimg.cc/fbhqqsrV/14-1.png"
      ],
},
{
      id: 34, 
      gender: "Unisexo", 
      shopifyId: "15751463272822", 
      name: "Midnight Edge",
      rating: 4.9,
      reviews: 124,
      badge: "Best Seller",
      brand: "MindTheLook by Vera Velosa",
      price: 139, 
      material: "Acetato de Alta Densidade",
      color: "Preto Brilhante / Detalhes Prateados",
      style: "Urbano / Contemporâneo",
      shape: "Retangular (Flat-Top)",
      faceShape: ["round", "oval"],
      budget: "mid-high",
      description: "Redefina o seu estilo com o Midnight Edge, uma peça que funde a força do acetato de alta densidade com um design urbano inconfundível. Mais do que um acessório de visão, estes óculos são uma autêntica moldura de personalidade para o seu rosto.\n\n✨ Design de Impacto: Armação frontal robusta em preto brilhante, com um perfil flat-top geométrico, acentuada por detalhes metálicos em forma de seta.\n\n☁️ Conforto & Ergonometria: Desenhados para o ritmo da cidade, com hastes estudadas para um ajuste perfeito e conforto supremo.\n\n📐 Visagismo & Contraste: A silhueta retangular é a aliada perfeita para criar definição em rostos redondos ou ovais.\n\n🔥 Dica de Estilo: Combine o preto profundo com tons quentes (terracota, bordeaux ou castanho caramelo) para um visual magnético.",
      image: "https://i.postimg.cc/tTn59mfv/15.png", 
      gallery: [
        "https://i.postimg.cc/hjQrK3wy/15-1.png" 
      ],
},
    {
      id: 35, // Ajusta conforme a tua sequência
      gender: "Unisexo", 
      shopifyId: "15751465206134", 
      name: "Havana Azure",
      rating: 4.9,
      reviews: 112,
      badge: "Classic Twist",
      brand: "Vera Velosa by Trevi Coliseum",
      price: 145, 
      material: "Acetato Premium",
      color: "Tartaruga (Havana) / Lentes Azuis Degradé",
      style: "Clássico / Moderno / Coastal",
      shape: "Retangular (Flat-Top)",
      faceShape: ["round", "oval"],
      budget: "mid-high",
      description: "O clássico reinventado. O modelo Havana Azure equilibra a intemporalidade do padrão tartaruga com a ousadia contemporânea das lentes em degradé azul. Uma peça que evoca sofisticação costeira e atitude urbana, desenhada para quem aprecia detalhes que marcam a diferença.\n\n✨ Design de Impacto: A clássica armação em tom tartaruga ganha uma nova vida com lentes degradé em azul, criando um contraste visual único. Detalhes metálicos discretos nas hastes conferem o toque final de luxo.\n\n☁️ Conforto & Ergonometria: Estrutura robusta em acetato premium que garante durabilidade e um ajuste equilibrado, proporcionando conforto total para longas horas de utilização.\n\n📐 Visagismo & Estilo: O formato flat-top e retangular é a escolha ideal para adicionar estrutura e definição a rostos redondos ou ovais.\n\n🔥 Dica de Estilo: O Havana Azure brilha quando combinado com tons neutros como bege ou branco, deixando que o azul das lentes seja o ponto de cor do seu visual.",
      image: "https://i.postimg.cc/6pScFXb3/16.png", 
      gallery: [
        "https://i.postimg.cc/P5NK6xyw/16-1.png",
        "https://i.postimg.cc/3xW9LR1d/16-2.png"
      ],
},
 /*
    {
      id: 36, // Ajusta conforme a tua sequência
      gender: "Unisexo", 
      shopifyId: "15751467106678", 
      name: "Tortuga Horizon",
      rating: 4.9,
      reviews: 138,
      badge: "Best Seller",
      brand: "Vera Velosa by Trevi Coliseum",
      price: 145, 
      material: "Acetato Premium",
      color: "Tartaruga (Havana) / Lentes Azuis Degradé",
      style: "Clássico / Moderno / Coastal",
      shape: "Retangular Suave",
      faceShape: ["round", "oval", "heart"],
      budget: "mid-high",
      description: "Onde a tradição encontra o oceano. Os óculos Tortuga Horizon foram desenhados para quem valoriza a estética clássica do padrão Havana, mas não abdica de um apontamento de cor moderno e inconfundível. As lentes em degradé azul criam um contraste magnético.\n\n✨ Design de Impacto: A armação em acetato no clássico padrão tartaruga é elevada pela modernidade das lentes azuis em degradé, criando um contraste perfeito entre o vintage e o contemporâneo.\n\n☁️ Conforto & Ergonometria: Construídos com acetato de alta qualidade, garantem uma durabilidade excecional e um ajuste anatómico que abraça o rosto para conforto total.\n\n📐 Visagismo & Estilo: Com uma silhueta equilibrada, este modelo adapta-se com facilidade a diferentes traços faciais, proporcionando harmonia e definição extra.\n\n🔥 Dica de Estilo: Combine-os com tons neutros como branco ou bege. Deixe que o azul das lentes seja o destaque do seu visual.",
      image: "https://i.postimg.cc/v8km12jR/17.png", 
      gallery: [
        "https://i.postimg.cc/gcQ0wt7T/17-2.png",
        "https://i.postimg.cc/c12JKkzp/17-1.png",
        "https://i.postimg.cc/44q3K20r/17-3.png"
      ],
},
*/
   {
      id: 37, 
      gender: "Unisexo", 
      shopifyId: "15751468089718", 
      name: "Signature Curve",
      rating: 4.8,
      reviews: 84,
      badge: "Tech & Classic",
      brand: "Vera Velosa by Trevi Coliseum",
      price: 155, 
      material: "Acetato Premium",
      color: "Tartaruga (Havana)",
      style: "Intelectual / Clássico / Business",
      shape: "Arredondado (Pantos)",
      faceShape: ["square", "rectangular", "diamond"],
      budget: "mid-high",
      description: "A elegância encontra a inovação. O modelo Signature Curve é a definição de sofisticação intelectual. Com uma silhueta arredondada intemporal e o exclusivo padrão tartaruga, este modelo apresenta a tecnologia Plus Curve patenteada, garantindo uma ergonomia superior.\n\n✨ Design de Impacto: Uma armação de acetato com um padrão tartaruga profundo. O formato arredondado oferece um look vintage e erudito, elevando qualquer outfit.\n\n☁️ Conforto & Tecnologia: A engenharia Plus Curve garante um ajuste ideal, proporcionando leveza e estabilidade durante todo o dia.\n\n📐 Visagismo & Suavidade: O formato arredondado é o melhor aliado para rostos quadrados ou angulares, ajudando a suavizar os traços faciais.\n\n🔥 Dica de Estilo: Perfeitos para um look office-chic. Combina-os com peças estruturadas para um visual de autoridade e bom gosto.",
      image: "https://i.postimg.cc/QtS04W2s/18.png", 
      gallery: [
        "https://i.postimg.cc/fLM8fvrn/18-2.png",
        "https://i.postimg.cc/PxK238gs/18-1.png",
        "https://i.postimg.cc/PxK238gH/18-3.png"
      ],
}, 
{
      id: 38, // Ajusta conforme a tua sequência
      gender: "Feminino", 
      shopifyId: "15751468712310", 
      name: "Burgundy Muse",
      rating: 4.9,
      reviews: 98,
      badge: "Elegance",
      brand: "Vera Velosa by Trevi Coliseum",
      price: 145, 
      material: "Acetato de Alta Precisão",
      color: "Burgundy (Vinho Profundo)",
      style: "Elegante / Sofisticado / Cat-Eye",
      shape: "Cat-Eye Suave",
      faceShape: ["oval", "heart", "diamond"],
      budget: "mid-high",
      description: "Eleve a sua presença com o modelo Burgundy Muse, uma verdadeira declaração de estilo em tons profundos de vinho. Com uma silhueta cat-eye subtil e sofisticada, estes óculos foram desenhados para realçar a feminilidade e conferir um ar de autoridade e confiança ao seu olhar.\n\n✨ Design de Impacto: Armação num tom burgundy rico e profundo, com um formato cat-eye que equilibra elegância intemporal com traços modernos.\n\n☁️ Precisão Técnica: O acabamento Cold Mounting garante uma precisão de montagem superior, conferindo durabilidade e um acabamento impecável.\n\n📐 Efeito Lifting: O design da armação segue uma linha ascendente que ilumina o rosto, sendo o aliado perfeito para definir as maçãs do rosto e criar um efeito de lifting natural.\n\n🔥 Dica de Estilo: O acessório perfeito para transitar do escritório para um jantar especial. Combine com tons neutros para um visual de alto impacto.",
      image: "https://i.postimg.cc/L8MLP87F/19.png", 
      gallery: [
        "https://i.postimg.cc/sgR7WgLt/19-3.png",
        "https://i.postimg.cc/VkcntkTQ/19-1.png",
        "https://i.postimg.cc/rwLx4wH7/19-2.png"
      ],
},    
 {
      id: 39,
      gender: "Unisexo", 
      shopifyId: "15751469531510", 
      name: "Noir Essence",
      rating: 4.9,
      reviews: 142,
      badge: "Essential",
      brand: "Vera Velosa by Trevi Coliseum",
      price: 155, 
      material: "Acetato Premium",
      color: "Preto Brilhante",
      style: "Minimalista / Versátil / Elegante",
      shape: "Redondo Soft",
      faceShape: ["oval", "heart", "square"],
      budget: "mid-high",
      description: "A definição de luxo minimalista. O Noir Essence é o básico essencial, elevado ao patamar da sofisticação. Com uma silhueta clássica e equilibrada, este modelo foi desenhado para quem valoriza a simplicidade poderosa.\n\n✨ Design de Impacto: Armação em acetato preto de alto brilho com um design soft-round. Minimalista na forma, mas impactante na presença.\n\n☁️ Conforto & Ergonometria: Design ergonómico que garante um ajuste natural e leve para conforto durante todo o dia.\n\n📐 Visagismo & Versatilidade: O formato redondo suave cria harmonia e equilíbrio em vários tipos de rosto, incluindo ovais e quadrados.\n\n🔥 Dica de Estilo: A peça camaleão que combina com tudo. Do formal ao casual, é a escolha certa para quem não quer falhar.",
      image: "https://i.postimg.cc/wxmVZvSP/20.png", 
      gallery: [
        "https://i.postimg.cc/J7kqvn92/20-2.png",
        "https://i.postimg.cc/mZHwJD06/20-1.png",
        "https://i.postimg.cc/sfhcqXtn/20-3.png"
      ],
},   
    
    
  ],
};

/* ── OUTLET ─────────────────────────────────────────────────────
   Coleção Outlet: cada óculo pode ter "originalPrice" (preço antes do
   desconto) além de "price" (preço final, já com desconto). Quando
   originalPrice existir e for maior que price, o cartão e o modal
   mostram o preço antigo riscado + o preço com desconto + a etiqueta
   de poupança.
   "shopifyId" e "image"/"gallery" ainda têm marcadores SUBSTITUIR_* —
   atualizar assim que os produtos forem criados no Shopify. */
PRODUCTS.outlet = [
  {
    id: 40,
    name: "Polaroid Classic Aviator",
    shopifyId: "15802921189750",
    badge: "Outlet",
    brand: "Polaroid",
    price: 29,
    originalPrice: 97,
    material: "Metal",
    color: "Dourado (Lentes verde-escuras)",
    style: "Clássico / Intemporal",
    shape: "Aviador",
    faceShape: ["round", "oval"],
    budget: "mid",
    description: "Um verdadeiro ícone que nunca sai de moda. Esta armação estilo aviador em metal dourado combina leveza e durabilidade, garantindo um visual polido e versátil. Perfeitos para qualquer ocasião, elevam instantaneamente desde um look mais casual até um visual sofisticado.",
    image: "https://i.postimg.cc/TPbNczhW/1.png",
    gallery: [
      "https://i.postimg.cc/0NSXCTrw/1-1.png",
      "https://i.postimg.cc/zfh2ks3H/1-2.png"
    ],
  },
  {
    id: 41,
    name: "Oakley Urban Mirror",
    shopifyId: "15803057799542",
    badge: "Outlet",
    brand: "Oakley",
    price: 49,
    originalPrice: 140,
    material: "Injetado/Plástico",
    color: "Cinza Translúcido (Lentes espelhadas amarelas/douradas)",
    style: "Desportivo / Urbano",
    shape: "Retangular Suave",
    faceShape: ["round", "oval"],
    budget: "mid",
    description: "A fusão perfeita entre a performance desportiva e a estética urbana de streetwear. Com uma armação leve em cinza translúcido e lentes espelhadas vibrantes, estes óculos garantem um visual arrojado e moderno. Ideais para quem procura um conforto extremo sem abdicar de um estilo de alto impacto.",
    image: "https://i.postimg.cc/j5rg3MJ1/2.png",
    gallery: ["https://i.postimg.cc/mr9pSvhz/2-1.png", "https://i.postimg.cc/bvnVR7dV/2-2.png"],
  },
  {
    id: 42,
    name: "INVU Geometric Blue",
    shopifyId: "15803058159990",
    badge: "Outlet",
    brand: "INVU",
    price: 29,
    originalPrice: 72,
    material: "Metal",
    color: "Prateado (Lentes azuis lisas)",
    style: "Moderno / Ousado",
    shape: "Aviador Geométrico",
    faceShape: ["round", "oval"],
    budget: "mid",
    description: "Uma reinvenção moderna do clássico modelo aviador, destacando-se pelas suas linhas mais retas e angulares. A estrutura fina em metal prateado contrasta na perfeição com o tom vibrante das lentes azuis. Uma peça extremamente leve e cheia de personalidade para quem gosta de marcar a diferença nos dias de sol.",
    image: "https://i.postimg.cc/XJ0H1sym/3.png",
    gallery: ["https://i.postimg.cc/wBN4kC7K/3-1.png"],
  },
  {
    id: 43,
    name: "Nike EVO Aviator",
    shopifyId: "15803059274102",
    badge: "Outlet",
    brand: "Nike",
    price: 39,
    originalPrice: 129,
    material: "Metal e Injetado",
    color: "Gunmetal (Cinza Escuro) com detalhes Bege",
    style: "Desportivo / Urbano",
    shape: "Aviador Desportivo",
    faceShape: ["round", "oval"],
    budget: "mid",
    description: "O modelo Nike EVO funde a performance desportiva com o estilo do dia a dia. A sua armação leve em metal com formato aviador destaca-se pela barra superior contrastante e hastes ergonómicas, garantindo um ajuste seguro e confortável. É o acessório perfeito para quem tem um estilo de vida ativo mas não abdica de um visual urbano e moderno.",
    image: "https://i.postimg.cc/hjbCkVLP/4.png",
    gallery: ["https://i.postimg.cc/ZRh7swdC/4-1.png", "https://i.postimg.cc/ydXfM0m6/4-2.png"],
  },
  {
    id: 44,
    name: "Gant Classic Navigator",
    shopifyId: "15803059700086",
    badge: "Outlet",
    brand: "Gant",
    price: 43,
    originalPrice: 153,
    material: "Metal",
    color: "Dourado com acabamentos Bege/Azul escuro",
    style: "Casual Chic / Vintage",
    shape: "Navegador (Aviador Quadrado)",
    faceShape: ["round", "oval"],
    budget: "mid",
    description: "A sofisticação intemporal da Gant encontra o design vintage neste modelo estilo navegador. A elegante armação em metal dourado é realçada por uma barra superior marcante e lentes escuras, conferindo um ar refinado e estruturado ao rosto. Uma peça versátil e cheia de classe que complementa perfeitamente qualquer guarda-roupa, do casual ao formal.",
    image: "https://i.postimg.cc/fLjHGYcX/5.png",
    gallery: ["https://i.postimg.cc/V6B7xXqd/5-1.png", "https://i.postimg.cc/V6B7xXqr/5-2.png"],
  },
  {
    id: 46,
    name: "Cierzo Classic Square",
    shopifyId: "15803061961078",
    badge: "Outlet",
    brand: "Cierzo",
    price: 29,
    originalPrice: 99,
    material: "Injetado/Acetato",
    color: "Preto Brilhante (Lentes escuras)",
    style: "Clássico / Casual",
    shape: "Retangular Suave / Estilo Wayfarer",
    faceShape: ["round", "oval"],
    budget: "mid",
    description: "Um modelo essencial para o uso diário, combinando a versatilidade intemporal do preto brilhante com um formato retangular suave que favorece e equilibra a maioria dos rostos. Leves, ergonómicos e discretos, são a escolha perfeita para quem procura um estilo clássico e prático sem abdicar do conforto.",
    image: "https://i.postimg.cc/xj5xgyjR/7.png",
    gallery: ["https://i.postimg.cc/wMqWg32n/7-1.png", "https://i.postimg.cc/sxjns1Kd/7-2.png"],
  },
  {
    id: 47,
    name: "ONE Retro Double Bridge",
    shopifyId: "15803062878582",
    badge: "Outlet",
    brand: "ONE",
    price: 19,
    originalPrice: 69,
    material: "Metal",
    color: "Prateado e Preto (Lentes cinza-escuro)",
    style: "Retro / Alternativo",
    shape: "Redondo com Ponte Dupla",
    faceShape: ["square", "oval"],
    budget: "mid",
    description: "Inspirados na forte tendência retro, estes óculos redondos destacam-se pela sua ousada ponte dupla em metal. A estrutura fina que mistura os tons prateado e preto cria um visual alternativo e cheio de personalidade. Ideais para quem quer marcar a diferença com um acessório leve e de forte atitude urbana.",
    image: "https://i.postimg.cc/jqcgvQqG/8.png",
    gallery: ["https://i.postimg.cc/h4syMb42/8-1.png", "https://i.postimg.cc/tRkSDtRw/8-2.png"],
  },
  {
    id: 48,
    name: "Carrera Pantos Elegance",
    shopifyId: "15803063501174",
    badge: "Outlet",
    brand: "Carrera",
    price: 39,
    originalPrice: 140,
    material: "Metal e Injetado",
    color: "Preto Matte e Dourado (Lentes azul degradé)",
    style: "Sofisticado / Moderno",
    shape: "Redondo (Pantos) com Ponte Dupla",
    faceShape: ["square", "oval"],
    budget: "mid",
    description: "O modelo Carrera redefine a elegância contemporânea com este formato redondo e uma sofisticada ponte dupla em metal. A combinação premium da frente em preto matte com as hastes em tons dourado e bege, finalizada por lentes em azul degradé, confere um look luxuoso e inconfundível. Perfeitos para quem valoriza um design requintado com um toque marcadamente moderno.",
    image: "https://i.postimg.cc/HsPS1YyB/9.png",
    gallery: ["https://i.postimg.cc/8PCyYJjL/9-1.png", "https://i.postimg.cc/qMZmHJ3w/9-2.png"],
  },
  {
    id: 49,
    name: "Polaroid Gold Navigator",
    shopifyId: "15803064680822",
    badge: "Outlet",
    brand: "Polaroid",
    price: 29,
    originalPrice: 97,
    material: "Metal",
    color: "Dourado com ponteiras em Preto (Lentes castanhas)",
    style: "Clássico / Elegante",
    shape: "Navegador / Aviador",
    faceShape: ["round", "oval"],
    budget: "mid",
    description: "Este modelo clássico de formato navegador combina uma elegante estrutura fina em metal dourado com ponteiras contrastantes em preto para máximo conforto. As lentes em tom castanho suave oferecem um look polido e intemporal, sendo o acessório perfeito e versátil para elevar qualquer visual do dia a dia.",
    image: "https://i.postimg.cc/sgQTVkYN/10.png",
    gallery: [
      "https://i.postimg.cc/YqyXBrWd/10-1.png",
      "https://i.postimg.cc/X7D26jCR/10-2.png"
    ],
  },
  {
    id: 50,
    name: "Hally & Son Artisan Round",
    shopifyId: "15803065467254",
    badge: "Outlet",
    brand: "Hally & Son",
    price: 49,
    originalPrice: 149,
    material: "Metal trabalhado",
    color: "Dourado Envelhecido / Bronze (Lentes verde-suave)",
    style: "Vintage / Artesanal",
    shape: "Redondo com Ponte Dupla",
    faceShape: ["square", "oval"],
    budget: "mid",
    description: "Uma verdadeira obra de arte com estética vintage. Este modelo redondo de ponte dupla destaca-se pelos seus detalhes minuciosamente gravados no metal e pelas icónicas ponteiras circulares, uma assinatura da marca. Perfeitos para os amantes de design premium que procuram uma peça de luxo com pormenores únicos e refinados.",
    image: "https://i.postimg.cc/DwJx29QF/11.png",
    gallery: [
      "https://i.postimg.cc/htz2SkLw/11-1.png",
      "https://i.postimg.cc/6p2M9kVx/11-2.png"
    ],
  },
  {
    id: 51,
    name: "Carrera Matte Navy Pantos",
    shopifyId: "15803065893238",
    badge: "Outlet",
    brand: "Carrera",
    price: 33,
    originalPrice: 109,
    material: "Injetado e Metal",
    color: "Azul Marinho Matte (Lentes azul degradé)",
    style: "Desportivo Chic / Moderno",
    shape: "Redondo (Pantos) com Ponte Dupla",
    faceShape: ["square", "oval"],
    budget: "mid",
    description: "O equilíbrio ideal entre o estilo desportivo e a elegância urbana. Este modelo destaca-se pela sua armação contemporânea em azul marinho com acabamento matte, perfeitamente contrastada por uma moderna ponte dupla metálica. As lentes em azul degradé completam este design arrojado, garantindo um look marcante e cheio de atitude.",
    image: "https://i.postimg.cc/8z2tsZwF/12.png",
    gallery: [
      "https://i.postimg.cc/L8YxHckn/12-1.png",
      "https://i.postimg.cc/Dw9Bmx50/12-2.png"
    ],
  },
  {
    id: 52,
    name: "INVU Matte Ocean Square",
    shopifyId: "15803066286454",
    badge: "Outlet",
    brand: "INVU",
    price: 19,
    originalPrice: 59,
    material: "Injetado",
    color: "Azul Matte (Lentes cinza/azuladas)",
    style: "Casual / Desportivo",
    shape: "Retangular Suave / Estilo Wayfarer",
    faceShape: ["round", "oval"],
    budget: "mid",
    description: "Um clássico descontraído e reinventado para o dia a dia. Com uma armação leve em acabamento azul matte, este modelo garante um visual moderno e fácil de combinar. O seu design ergonómico proporciona um ajuste confortável, sendo a escolha ideal para quem procura praticidade com um toque subtil de cor.",
    image: "https://i.postimg.cc/bv1Ln1FH/13.png",
    gallery: ["https://i.postimg.cc/SxBDjgV7/13-1.png", "https://i.postimg.cc/sgkw1TK4/13-2.png"],
  },
  {
    id: 53,
    name: "Carrera Havana Retro Pantos",
    shopifyId: "15803066581366",
    badge: "Outlet",
    brand: "Carrera",
    price: 39,
    originalPrice: 139,
    material: "Acetato e Metal",
    color: "Tartaruga (Havana) com Barra Superior Preta (Lentes escuras)",
    style: "Retro / Sofisticado",
    shape: "Redondo (Pantos) com Ponte Dupla",
    faceShape: ["square", "oval"],
    budget: "mid",
    description: "A fusão perfeita entre a estética vintage e o design contemporâneo. Este modelo redondo destaca-se pelo seu padrão tartaruga clássico, contrastado por uma arrojada barra superior reta que confere forte personalidade ao rosto. Uma peça de luxo cheia de atitude, desenhada para elevar qualquer look urbano e sofisticado.",
    image: "https://i.postimg.cc/26mG73Pt/14.png",
    gallery: ["https://i.postimg.cc/R0wGtwbD/14-1.png", "https://i.postimg.cc/wBDFNDbr/14-2.png"],
  },
  {
    id: 54,
    name: "INVU Scarlet Cat-Eye",
    shopifyId: "15803067105654",
    badge: "Outlet",
    brand: "INVU",
    price: 19,
    originalPrice: 57,
    material: "Injetado",
    color: "Vermelho Brilhante (Lentes escuras)",
    style: "Arrojado / Feminino",
    shape: "Cat-Eye (Olho de Gato)",
    faceShape: ["round", "oval", "heart"],
    budget: "mid",
    description: "Para quem não tem medo de assumir o protagonismo, este modelo cat-eye em vermelho vibrante é a derradeira declaração de estilo. A sua silhueta feminina, espessa e arrojada, tem o poder de elevar qualquer visual básico a um nível de puro glamour. Uma peça statement irresistível que combina atitude inconfundível com a máxima proteção.",
    image: "https://i.postimg.cc/wvVVfgz1/15.png",
    gallery: ["https://i.postimg.cc/26mG73PM/15-1.png", "https://i.postimg.cc/NMYDkL3Q/15-2.png"],
  },
  {
    id: 55,
    name: "Hally & Son The Janis",
    shopifyId: "15803067597174",
    badge: "Outlet",
    brand: "Hally & Son",
    price: 59,
    originalPrice: 149,
    material: "Acetato",
    color: "Preto Brilhante (Lentes rosa translúcido)",
    style: "Retro / Extravagante",
    shape: "Redondo Ondulado (Formato Flor)",
    faceShape: ["square", "oval"],
    budget: "mid",
    description: "Uma peça de puro statement que capta a essência irreverente dos anos 60. Com uma armação preta de design ondulado único e lentes rosa translúcidas, o modelo \"The Janis\" não passa despercebido. É perfeito para festivais, looks criativos ou para quem adora expressar a sua individualidade através de um acessório extravagante e icónico.",
    image: "https://i.postimg.cc/1tHHCsSC/16.png",
    gallery: ["https://i.postimg.cc/wvVVfgzN/16-1.png", "https://i.postimg.cc/bJTTCpP0/16-2.png"],
  },
  {
    id: 56,
    name: "INVU Bold Cat-Eye",
    shopifyId: "15803068481910",
    badge: "Outlet",
    brand: "INVU",
    price: 19,
    originalPrice: 59,
    material: "Injetado",
    color: "Preto Brilhante (Lentes cinza-escuro)",
    style: "Feminino / Elegante",
    shape: "Cat-Eye (Olho de Gato) Grosso",
    faceShape: ["round", "oval", "heart"],
    budget: "mid",
    description: "A quintessência do charme feminino num formato inconfundível. Esta armação cat-eye robusta em preto brilhante oferece um look misterioso e sofisticado, ideal para estruturar o rosto e proporcionar um efeito lifting ao olhar. Um verdadeiro clássico de elegância, extremamente versátil e essencial em qualquer coleção.",
    image: "https://i.postimg.cc/qqvGWSMd/17.png",
    gallery: ["https://i.postimg.cc/PJ5M09fM/17-1.png", "https://i.postimg.cc/Zn5LX2Yg/17-2.png"],
  },
  {
    id: 57,
    name: "Victoria Beckham Havana Butterfly",
    shopifyId: "15803069006198",
    badge: "Outlet",
    brand: "Victoria Beckham",
    price: 83,
    originalPrice: 279,
    material: "Acetato Premium",
    color: "Tartaruga / Havana (Lentes castanho degradé)",
    style: "Luxo / Sofisticado",
    shape: "Borboleta / Cat-Eye Suave",
    faceShape: ["round", "oval", "heart"],
    budget: "high",
    description: "A definição de luxo contemporâneo com a assinatura inconfundível de Victoria Beckham. Este modelo em formato borboleta destaca-se pelo seu acetato maciço em padrão tartaruga rico e acabamentos de altíssima qualidade. Uma silhueta elegante e poderosa que adiciona um toque imediato de glamour e sofisticação a qualquer look.",
    image: "https://i.postimg.cc/d3N9F6LM/18.png",
    gallery: ["https://i.postimg.cc/nrh1Ngcn/18-1.png", "https://i.postimg.cc/d3V9gpts/18-2.png"],
  },
  {
    id: 58,
    name: "Victoria Beckham Tortoise Butterfly",
    shopifyId: "15803069432182",
    badge: "Outlet",
    brand: "Victoria Beckham",
    price: 83,
    originalPrice: 269,
    material: "Acetato",
    color: "Tartaruga (Havana) com detalhes Dourados (Lentes cinza degradé)",
    style: "Luxo / Elegante",
    shape: "Borboleta / Cat-Eye",
    faceShape: ["round", "oval", "heart"],
    budget: "high",
    description: "A essência do luxo e sofisticação. Este modelo Victoria Beckham em formato borboleta destaca-se pelo elegante acetato padrão tartaruga e requintados acabamentos texturizados em dourado nas charneiras. Uma peça de alta costura que confere um olhar poderoso, feminino e inegavelmente glamoroso.",
    image: "https://i.postimg.cc/Y0Dx7Rhf/19.png",
    gallery: ["https://i.postimg.cc/L5QVSDnt/19-1.png", "https://i.postimg.cc/rsZ9TjK5/19-2.png"],
  },
  {
    id: 59,
    name: "Victoria Beckham Soft Gradient Cat-Eye",
    shopifyId: "15803069956470",
    badge: "Outlet",
    brand: "Victoria Beckham",
    price: 73,
    originalPrice: 245,
    material: "Acetato",
    color: "Cinza/Toupeira Translúcido e Raiado (Lentes cinza degradé)",
    style: "Elegante / Contemporâneo",
    shape: "Cat-Eye Suave / Borboleta",
    faceShape: ["round", "oval", "heart"],
    budget: "high",
    description: "Um design refinado que combina formas femininas com um toque contemporâneo. A armação em acetato translúcido com subtis padrões raiados, complementada por detalhes luxuosos nas hastes, oferece uma elegância leve e moderna. É a peça premium ideal para iluminar e estruturar o rosto com máxima classe.",
    image: "https://i.postimg.cc/VsKgXfDw/20.png",
    gallery: ["https://i.postimg.cc/8cXbG4jd/20-1.png", "https://i.postimg.cc/L4xDj9Nd/20-2.png"],
  },
  {
    id: 60,
    name: "Ray-Ban Oval Classic",
    shopifyId: "15803070808438",
    badge: "Outlet",
    brand: "Ray-Ban",
    price: 89,
    originalPrice: 199,
    material: "Metal",
    color: "Dourado (Lentes verde clássico G-15)",
    style: "Vintage / Ícone",
    shape: "Oval",
    faceShape: ["round", "oval"],
    budget: "high",
    description: "O verdadeiro estilo retro encontra-se neste modelo oval da Ray-Ban. Com a sua armação fina em metal dourado e as icónicas lentes verdes, este é um clássico absoluto dos anos 70 que regressou para dominar o street style. Uma peça unissexo, extremamente leve e cheia de personalidade para quem respira cultura pop.",
    image: "https://i.postimg.cc/HW6zbYBY/21.png",
    gallery: ["https://i.postimg.cc/MZ9516dW/21-1.png"],
  },
  {
    id: 61,
    name: "INVU Oversized Glam",
    shopifyId: "15803071562102",
    badge: "Outlet",
    brand: "INVU",
    price: 23,
    originalPrice: 79,
    material: "Injetado",
    color: "Preto Brilhante com detalhe Dourado (Lentes cinza degradé)",
    style: "Glamour / Dia a Dia",
    shape: "Quadrado Oversized / Borboleta",
    faceShape: ["round", "oval"],
    budget: "mid",
    description: "Puro glamour num formato oversized. Esta armação preta brilhante de curvas femininas, acentuada por um subtil detalhe dourado na haste, garante uma presença marcante e sofisticada. Oferecendo a máxima cobertura e um estilo \"estrela de cinema\", é o acessório perfeito para elevar qualquer visual de forma acessível.",
    image: "https://i.postimg.cc/Hsj22qhJ/22.png",
    gallery: ["https://i.postimg.cc/2j0Gnk26/22-1.png", "https://i.postimg.cc/Gh9QQW5h/22-2.png"],
  },
  {
    id: 62,
    name: "Havaianas Bold Cat-Eye",
    shopifyId: "15803072643446",
    badge: "Outlet",
    brand: "Havaianas",
    price: 29,
    originalPrice: 75,
    material: "Injetado (com textura em relevo)",
    color: "Preto (Lentes cinza degradé)",
    style: "Descontraído / Tropical Chic",
    shape: "Cat-Eye / Borboleta",
    faceShape: ["round", "oval", "heart"],
    budget: "mid",
    description: "Este modelo cat-eye feminino da Havaianas traz a energia e a leveza do verão para qualquer estação. Com uma armação preta marcante e hastes texturizadas inspiradas no famoso padrão das solas da marca, oferece um look descontraído mas cheio de atitude. As lentes em degradé completam esta peça versátil e essencial para os dias de sol.",
    image: "https://i.postimg.cc/sD1cckN4/23.png",
    gallery: ["https://i.postimg.cc/xTqRRw4N/23-1.png", "https://i.postimg.cc/65T00kmG/23-2.png"],
  },
  {
    id: 63,
    name: "Polaroid Navy Butterfly",
    shopifyId: "15803073298806",
    badge: "Outlet",
    brand: "Polaroid",
    price: 39,
    originalPrice: 97,
    material: "Injetado e Metal",
    color: "Azul Marinho (Lentes cinza-escuro)",
    style: "Elegante / Dia a Dia",
    shape: "Borboleta / Cat-Eye Suave",
    faceShape: ["round", "oval", "heart"],
    budget: "mid",
    description: "A elegância encontra a funcionalidade absoluta neste modelo Polaroid num sofisticado tom azul marinho. A sua silhueta feminina em formato borboleta é complementada por hastes finas em metal, garantindo um visual requintado e extremamente leve. Uma escolha perfeita para o uso diário, oferecendo proteção e um design que combina com qualquer look.",
    image: "https://i.postimg.cc/fTFvg8GC/24-1.png",
    gallery: ["https://i.postimg.cc/gk5KBgC1/24-2.png"],
  },
  {
    id: 64,
    name: "Polaroid Berry Glam",
    shopifyId: "15803074937206",
    badge: "Outlet",
    brand: "Polaroid",
    price: 31,
    originalPrice: 79,
    material: "Injetado",
    color: "Magenta / Berry (Lentes cinza-escuro)",
    style: "Vibrante / Moderno",
    shape: "Quadrado Suave / Cat-Eye",
    faceShape: ["round", "oval", "heart"],
    budget: "mid",
    description: "Dê um toque de cor e ousadia ao seu visual com este modelo vibrante em tom magenta/berry. Com um formato quadrado de linhas ascendentes que alongam o olhar e elegantes detalhes dourados nos cantos, esta armação alia feminilidade a uma estética moderna. Um acessório cheio de personalidade que destaca o rosto e garante o conforto visual característico da Polaroid.",
    image: "https://i.postimg.cc/Z5dLkrm1/25.png",
    gallery: ["https://i.postimg.cc/ZKgLDfkt/25-1.png", "https://i.postimg.cc/5NGmkPc1/25-2.png"],
  },
  {
    id: 65,
    name: "Polaroid Chunky Cream",
    shopifyId: "15803077067126",
    badge: "Outlet",
    brand: "Polaroid",
    price: 39,
    originalPrice: 109,
    material: "Injetado/Acetato",
    color: "Creme / Bege com detalhes Dourados (Lentes castanhas)",
    style: "Fashion / Audaz",
    shape: "Quadrado Oversized / Chunky",
    faceShape: ["round", "oval"],
    budget: "mid",
    description: "Uma verdadeira afirmação de estilo. Este modelo Polaroid destaca-se pela sua armação chunky (grossa) num elegante tom creme, perfeitamente realçada por luxuosos detalhes dourados nas charneiras. Com o seu formato quadrado oversized, é a peça ideal para quem procura um look fashionista, moderno e cheio de atitude.",
    image: "https://i.postimg.cc/dVy9M8vL/27.png",
    gallery: ["https://i.postimg.cc/dVy9M8vK/27-1.png", "https://i.postimg.cc/qv3Gf80v/27-2.png"],
  },
  {
    id: 66,
    name: "Ana Hickmann Blush Butterfly",
    shopifyId: "15803078771062",
    badge: "Outlet",
    brand: "Ana Hickmann",
    price: 59,
    originalPrice: 137,
    material: "Acetato Translúcido",
    color: "Rosa Blush / Nude (Lentes castanhas degradé)",
    style: "Elegante / Feminino",
    shape: "Quadrado Suave / Borboleta",
    faceShape: ["round", "oval", "heart"],
    budget: "mid",
    description: "A personificação da elegância feminina num design contemporâneo. Com uma belíssima armação em acetato translúcido cor-de-rosa blush e hastes elegantemente trabalhadas, este modelo ilumina o rosto e confere um toque de romance moderno. O formato borboleta suave garante um ajuste lisonjeiro, tornando-o num acessório de luxo perfeito para qualquer ocasião.",
    image: "https://i.postimg.cc/2SZxp4mW/28.png",
    gallery: ["https://i.postimg.cc/JzkQwbmy/28-1.png", "https://i.postimg.cc/T3Dc8rGL/28-2.png"],
  },
  {
    id: 67,
    name: "Polaroid Bold Square",
    shopifyId: "15803080868214",
    badge: "Outlet",
    brand: "Polaroid",
    price: 39,
    originalPrice: 97,
    material: "Injetado",
    color: "Preto Brilhante com detalhe Prateado (Lentes cinza-escuro)",
    style: "Moderno / Urbano",
    shape: "Quadrado / Retangular Bold",
    faceShape: ["round", "oval"],
    budget: "mid",
    description: "Uma abordagem moderna e estruturada ao formato quadrado clássico. Este modelo em preto brilhante apresenta uma armação espessa de linhas arrojadas, acentuada por um detalhe metálico discreto nas hastes. É um acessório indispensável, extremamente versátil e de forte atitude urbana, que complementa com facilidade qualquer guarda-roupa.",
    image: "https://i.postimg.cc/W4cwshbq/29.png",
    gallery: ["https://i.postimg.cc/wBYQ97Tt/29-1.png"],
  },
  {
    id: 68,
    name: "Tom Ford Elegant Butterfly",
    shopifyId: "15803082408310",
    badge: "Outlet",
    brand: "Tom Ford",
    price: 79,
    originalPrice: 263,
    material: "Acetato",
    color: "Preto com hastes em Tartaruga (Lentes degradé)",
    style: "Luxo / Sofisticado",
    shape: "Borboleta / Cat-Eye",
    faceShape: ["round", "oval", "heart"],
    budget: "high",
    description: "A personificação do luxo contemporâneo com o inconfundível detalhe metálico em \"T\" nas charneiras. Esta elegante armação em formato borboleta funde a frente em preto clássico com hastes ricas em padrão tartaruga, criando um contraste perfeito. Uma peça de alta-costura que confere um olhar poderoso, feminino e extremamente glamoroso.",
    image: "https://i.postimg.cc/25N7CV8n/30.png",
    gallery: ["https://i.postimg.cc/JhC5RG4J/30-1.png"],
  },
  {
    id: 69,
    name: "Prada Color Block Cat-Eye",
    shopifyId: "15803084243318",
    badge: "Outlet",
    brand: "Prada",
    price: 59,
    originalPrice: 221,
    material: "Acetato",
    color: "Preto com hastes Azul Marinho e Vermelho (Lentes cinza degradé)",
    style: "Alta Moda / Statement",
    shape: "Cat-Eye Oversized",
    faceShape: ["round", "oval", "heart"],
    budget: "high",
    description: "Uma verdadeira afirmação de estilo avant-garde e exclusividade. Este arrojado modelo Prada destaca-se pela imponente frente preta em formato cat-eye e pelas icónicas hastes em color block com o logotipo clássico da marca em destaque. O acessório perfeito para mulheres que procuram uma peça arrojada, luxuosa e que definitivamente não passa despercebida.",
    image: "https://i.postimg.cc/QMgkChHR/31.png",
    gallery: ["https://i.postimg.cc/mrWyTt2q/31-1.png", "https://i.postimg.cc/FKbgzN78/31-2.png"],
  },
];

/* Cores usadas na bolinha do cartão de produto e nos swatches do filtro */
const COLOR_SWATCHES = {
  "Preto": "#1a1a1a",
  "Tartaruga": "#92400e",
  "Azul": "#1e3a8a",
  "Dourado": "#c9a84c",
  "Prateado": "#9ca3af",
  "Transparente": "#dbeafe",
  "Vermelho": "#dc2626",
  "Burgundy": "#681329",
  "Cristal": "#f0f9ff",
};

/* === ORGANIZADOR DE PRODUTOS AUTOMÁTICO (ATUALIZADO) === */
const ALL_PRODUCTS = [...PRODUCTS.men, ...PRODUCTS.women];

// Homem (Exclusivos + Unissexo)
PRODUCTS.men = ALL_PRODUCTS.filter(p => 
  [1, 6, 7, 10, 11, 12, 15, 18, 20, 27, 29, 30, 34, 35, 37, 39].includes(p.id)
);

// Mulher (Exclusivos + Unissexo)
PRODUCTS.women = ALL_PRODUCTS.filter(p => 
  [2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 32, 33, 34, 35, 36, 38].includes(p.id)
);

// Garantir que os produtos têm a tag de género para o Quiz funcionar
// (derivado das próprias listas Homem/Mulher acima, para nunca desalinhar)
const menIds = new Set(PRODUCTS.men.map(p => p.id));
const womenIds = new Set(PRODUCTS.women.map(p => p.id));
ALL_PRODUCTS.forEach(p => {
  const isMan = menIds.has(p.id);
  const isWoman = womenIds.has(p.id);

  if (isMan && isWoman) p.gender = "Unisexo";
  else if (isMan) p.gender = "Masculino";
  else p.gender = "Feminino";
});

// Outlet: género atribuído por id (peças clássicas/unissexo vs. femininas -
// cat-eye, borboleta e outras formas claramente femininas na descrição)
const outletFeminineIds = new Set([54, 55, 56, 57, 58, 59, 61, 62, 63, 64, 65, 66, 68, 69]);
PRODUCTS.outlet.forEach(p => {
  p.gender = outletFeminineIds.has(p.id) ? "Feminino" : "Unisexo";
});

// Lista usada pelo Quiz: inclui Homem + Mulher + Outlet, para os saldos
// entrarem nas recomendações finais
const QUIZ_PRODUCTS = [...ALL_PRODUCTS, ...PRODUCTS.outlet];

/* ── ICONS ──────────────────────────────────────────────────── */
const OptometryIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
    <circle
      cx="32"
      cy="32"
      r="28"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.25"
    />
    <path
      d="M32 18v28M18 32h28"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="32" cy="32" r="9" stroke="currentColor" strokeWidth="2.5" />
    <path
      d="M24 24l-7-7M40 24l7-7M24 40l-7 7M40 40l7 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const LensIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
    <ellipse
      cx="32"
      cy="32"
      rx="22"
      ry="17"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.25"
    />
    <ellipse
      cx="32"
      cy="32"
      rx="15"
      ry="12"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <circle
      cx="32"
      cy="32"
      r="5"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M32 20v-5M32 44v5M17 32h-5M47 32h5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const CardIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
    <rect
      x="12"
      y="18"
      width="40"
      height="28"
      rx="4"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.25"
    />
    <rect
      x="16"
      y="22"
      width="32"
      height="20"
      rx="2"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <circle cx="26" cy="31" r="3.5" stroke="currentColor" strokeWidth="2" />
    <path
      d="M34 28h8M34 32h8M34 36h8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M20 38h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const FaceIcons = {
  oval: () => (
    <svg viewBox="0 0 80 100" className="w-full h-full" fill="none">
      <ellipse
        cx="40"
        cy="50"
        rx="28"
        ry="42"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="currentColor"
        opacity="0.08"
      />
      <circle cx="28" cy="42" r="2.5" fill="currentColor" />
      <circle cx="52" cy="42" r="2.5" fill="currentColor" />
      <path
        d="M28 65 Q40 72 52 65"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  round: () => (
    <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
      <circle
        cx="40"
        cy="40"
        r="32"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="currentColor"
        opacity="0.08"
      />
      <circle cx="29" cy="36" r="2.5" fill="currentColor" />
      <circle cx="51" cy="36" r="2.5" fill="currentColor" />
      <path
        d="M29 54 Q40 60 51 54"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  square: () => (
    <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
      <rect
        x="12"
        y="12"
        width="56"
        height="56"
        rx="6"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="currentColor"
        opacity="0.08"
      />
      <circle cx="29" cy="34" r="2.5" fill="currentColor" />
      <circle cx="51" cy="34" r="2.5" fill="currentColor" />
      <path
        d="M29 52 Q40 58 51 52"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  heart: () => (
    <svg viewBox="0 0 80 100" className="w-full h-full" fill="none">
      <path
        d="M40 20 L14 44 L24 78 L40 90 L56 78 L66 44 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="currentColor"
        opacity="0.08"
      />
      <circle cx="29" cy="48" r="2.5" fill="currentColor" />
      <circle cx="51" cy="48" r="2.5" fill="currentColor" />
      <path
        d="M29 65 Q40 71 51 65"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

/* ── WHATSAPP ───────────────────────────────────────────────── */
function WhatsAppBtn({ product }) {
  const message = product
    ? `Olá! Estou a ver o modelo ${product.name} (€${product.price}) no site e gostava de fazer uma reserva/saber mais.`
    : `Olá! Gostaria de saber mais sobre os vossos serviços.`;

  const encodedMessage = encodeURIComponent(message);

  return (
    <a
      href={`https://wa.me/351934421310?text=${encodedMessage}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl pulse-gold transition-transform hover:scale-110"
      style={{ background: "#25D366" }}
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.087.536 4.047 1.477 5.754L0 24l6.395-1.477A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-5.006-1.375l-.359-.215-3.724.977.995-3.635-.234-.374A9.793 9.793 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
      </svg>
    </a>
  );
}

/* ── EXIT INTENT POPUP ──────────────────────────────────────── */
function ExitPopup({ onClose }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setSubscribeError(false);
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: new URLSearchParams({
          'g': 'XUnUvX', // Teu List ID
          'email': email,
          '$fields': '$source',
          '$source': 'Site Optica 13'
        })
      };

      const res = await fetch('https://manage.kmail-lists.com/ajax/subscriptions/subscribe', options);
      if (!res.ok) throw new Error(`Klaviyo respondeu ${res.status}`);
      setSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Erro ao subscrever:", error);
      setSubscribeError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(10,20,15,0.85)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="relative rounded-2xl overflow-hidden max-w-3xl w-full fade-up flex flex-col md:flex-row shadow-2xl"
        style={{ background: "var(--cream)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: "white",
            color: "var(--forest)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <X size={16} />
        </button>

        <div className="hidden md:block md:w-5/12 relative">
          <Img
            src="https://i.postimg.cc/hPPJYq5r/carta-Conduc-1-1024x540.jpg"
            alt="Óculos Premium"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <p className="text-white font-display text-2xl font-medium leading-tight">
              A visão perfeita
              <br />
              está à sua espera.
            </p>
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
          {subscribed ? (
            <div className="text-center fade-up">
              <div
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
                style={{ background: "#e8f5ee" }}
              >
                <CheckCircle size={40} style={{ color: "#16a34a" }} />
              </div>
              <h3 className="font-display text-3xl font-semibold mb-3" style={{ color: "var(--forest)" }}>
                Desconto Garantido!
              </h3>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "#555" }}>
                Enviámos o seu cupão exclusivo de <strong>20% de desconto</strong> para a sua caixa de entrada.
              </p>
              <button
                onClick={onClose}
                className="btn-forest w-full py-4 rounded-xl font-semibold text-sm tracking-wide shadow-lg"
              >
                Continuar a explorar
              </button>
            </div>
          ) : (
            <div className="fade-up">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: "var(--gold)" }}>
                Oferta Exclusiva
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-semibold mb-4 leading-tight" style={{ color: "var(--forest)" }}>
                Não saia de mãos a abanar.
              </h3>
              <p className="text-sm sm:text-base mb-6 leading-relaxed" style={{ color: "#555" }}>
                Registe o seu email e receba instantaneamente <strong>20% de desconto</strong>.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <input
                  type="email"
                  placeholder="Introduza o seu melhor e-mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border-2 text-sm outline-none text-black"
                  style={{ borderColor: "var(--mist)", background: "white" }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-forest w-full py-4 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {submitting ? "A processar..." : <>Quero os meus 20% <ArrowRight size={16} /></>}
                </button>
                {subscribeError && (
                  <p className="text-xs text-center" style={{ color: "#c0392b" }}>
                    Não foi possível registar o seu e-mail agora. Tente novamente.
                  </p>
                )}
              </form>

              <button
                onClick={onClose}
                className="mt-6 text-xs w-full text-center block underline"
                style={{ color: "#999" }}
              >
                Não, obrigado. Prefiro pagar o preço inteiro.
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
/* ── COOKIE BANNER (LEGALIZADO RGPD) ──────────────────────────── */
function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookies_optica13")) {
      setShow(true);
    }
  }, []);

  const handleCookies = (type) => {
    localStorage.setItem("cookies_optica13", type); // Guarda se foi "all" ou "essential"
    setShow(false);
  };

  if (!show) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[300] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 fade-up shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
      style={{ background: "white", borderTop: "1px solid var(--mist)" }}
    >
      <div className="text-sm" style={{ color: "#555" }}>
        <p>
          <strong style={{ color: "var(--forest)" }}>Usamos cookies 🍪</strong><br/>
          Utilizamos cookies para melhorar a sua experiência, personalizar conteúdos e analisar tráfego. Pode aceitar todos ou apenas os estritamente necessários.
        </p>
      </div>
      <div className="flex gap-3 w-full sm:w-auto flex-shrink-0">
        <button 
          onClick={() => handleCookies("essential")} 
          className="btn-outline-forest w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm"
        >
          Apenas Essenciais
        </button>
        <button 
          onClick={() => handleCookies("all")} 
          className="btn-forest w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-sm"
        >
          Aceitar Todos
        </button>
      </div>
    </div>
  );
}

/* ── PRODUCT MODAL ──────────────────────────────────────────── */
function ProductModal({ product, onClose, onAdd, onBook }) {
  const [activeImage, setActiveImage] = useState(product?.image);

  // Fotos do Outlet têm fundo cinza (não branco puro), por isso o
  // truque do mix-blend-multiply (que "corta" fundos brancos) fica
  // enevoado nelas — desativa-se para produtos com originalPrice.
  const plainPhoto = !!product?.originalPrice;

  // Junta a foto de capa com as fotos extra
  const allImages = product?.gallery ? [product.image, ...product.gallery] : [product?.image];

  // Quando o produto abre, garante que a imagem principal volta à 1ª
  useEffect(() => {
    if (product) setActiveImage(product.image);
  }, [product]);

  // ROTAÇÃO AUTOMÁTICA DAS IMAGENS
  useEffect(() => {
    if (!product || allImages.length <= 1) return;
    
    const timer = setInterval(() => {
      setActiveImage((current) => {
        const currentIndex = allImages.indexOf(current);
        const nextIndex = (currentIndex + 1) % allImages.length;
        return allImages[nextIndex];
      });
    }, 3500); // Muda a imagem a cada 3.5 segundos

    return () => clearInterval(timer);
  }, [product?.id]);

  if (!product) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[350] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(10,20,15,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-6xl rounded-t-3xl sm:rounded-3xl overflow-hidden fade-up flex flex-col relative shadow-2xl"
        style={{ background: "var(--cream)", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de Fechar flutuante em mobile */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-lg"
          style={{ color: "var(--forest)" }}
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto scrollbar-hide">
          {/* Lado da Imagem com Galeria */}
          <div className="w-full md:w-1/2 flex flex-col" style={{ background: "var(--mist)" }}>
            {/* Foto Grande Ativa */}
            <div className="relative img-zoom flex-1 h-[350px] md:h-auto min-h-[300px]">
              <Img
                src={activeImage}
                alt={product.name}
                className={`w-full h-full object-cover absolute inset-0 transition-all duration-500 ease-in-out ${plainPhoto ? "" : "mix-blend-multiply"}`}
              />
            </div>
            
            {/* Barra de Miniaturas (Com Scroll Ativo) */}
            {allImages.length > 1 && (
              <div 
                className="flex gap-4 p-5 overflow-x-auto bg-white border-t snap-x" 
                style={{ borderColor: "var(--mist)", scrollBehavior: "smooth" }}
              >
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 flex-shrink-0 snap-center rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === img ? "border-black opacity-100 shadow-md scale-105" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                    style={{ background: "var(--mist)" }}
                  >
                    <Img src={img} alt={`Galeria ${idx + 1}`} className={`w-full h-full object-cover ${plainPhoto ? "" : "mix-blend-multiply"}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lado da Informação */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col bg-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p
                  className="text-xs font-bold tracking-widest uppercase mb-2"
                  style={{ color: "var(--gold)" }}
                >
                  {product.brand}
                </p>
                <h2
                  className="font-display text-4xl md:text-5xl font-semibold"
                  style={{ color: "var(--forest)", lineHeight: 1.1 }}
                >
                  {product.name}
                </h2>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide mt-3 px-3 py-1.5 rounded-full"
                    style={{ background: "#fef2f2", color: "#b91c1c" }}
                  >
                    🔥 Edição limitada · sem reposição de stock
                  </p>
                )}
              </div>
              {/* Botão de Fechar no PC */}
              <button
                onClick={onClose}
                className="hidden md:flex w-11 h-11 rounded-full items-center justify-center flex-shrink-0 ml-4 transition-colors hover:bg-gray-100"
                style={{ background: "var(--mist)", color: "var(--forest)" }}
              >
                <X size={18} />
              </button>
            </div>

            <p
              className="font-display text-4xl md:text-5xl font-light mb-6 flex items-baseline gap-3 flex-wrap"
              style={{ color: "var(--forest)" }}
            >
              <span>€{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-xl font-normal line-through" style={{ color: "#aaa" }}>
                    €{product.originalPrice}
                  </span>
                  <span
                    className="text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full text-white"
                    style={{ background: "#dc2626" }}
                  >
                    -{Math.round(100 - (product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </p>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-sm font-bold mb-6 -mt-4" style={{ color: "#16a34a" }}>
                Poupa €{product.originalPrice - product.price} nesta compra
              </p>
            )}

            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#555" }}
            >
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                ["Material", product.material],
                ["Cor", product.color],
                ["Formato", product.shape],
                ["Estilo", product.style],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="p-4 rounded-2xl border"
                  style={{
                    background: "var(--cream-dark)",
                    borderColor: "var(--mist)",
                  }}
                >
                  <p
                    className="text-[11px] font-bold uppercase tracking-wider mb-1"
                    style={{ color: "#888" }}
                  >
                    {k}
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--forest)" }}
                  >
                    {v}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <p
                className="text-[11px] font-bold uppercase tracking-wider mb-3"
                style={{ color: "#888" }}
              >
                Rostos recomendados
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.faceShape.map((f) => (
                  <span
                    key={f}
                    className="text-xs px-4 py-1.5 rounded-full font-bold capitalize shadow-sm border"
                    style={{
                      background: "#f0fdf4",
                      color: "#166534",
                      borderColor: "#bbf7d0",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust Section */}
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl border bg-gray-50 border-gray-100">
                <Award size={20} style={{ color: "var(--gold)" }} />
                <p
                  className="text-xs font-semibold leading-tight"
                  style={{ color: "#555" }}
                >
                  Garantia de
                  <br />2 anos
                </p>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl border bg-gray-50 border-gray-100">
                <Shield size={20} style={{ color: "var(--gold)" }} />
                <p
                  className="text-xs font-semibold leading-tight"
                  style={{ color: "#555" }}
                >
                  Devolução
                  <br />
                  em 30 dias
                </p>
              </div>
            </div>

            {/* Consulta gratuita — o maior diferenciador de comprar óculos graduados na Óptica 13 */}
            <div
              className="mb-8 flex items-center gap-3 p-4 rounded-xl border"
              style={{ background: "#eff6ff", borderColor: "#bfdbfe" }}
            >
              <Sparkles size={20} className="flex-shrink-0" style={{ color: "var(--gold)" }} />
              <p className="text-xs font-semibold leading-snug" style={{ color: "#1e3a8a" }}>
                Precisa de lentes graduadas? A consulta de optometria é <strong>gratuita</strong> ao fazer os seus óculos na Óptica 13.
              </p>
            </div>

            <div className="mt-auto sticky bottom-0 bg-white pt-3 pb-1 space-y-3">
              {/* Botão Oficial do Shopify */}
              <ShopifyBuyButton productId={product.shopifyId} />

              <button
                onClick={onBook}
                className="btn-outline-forest w-full py-4 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Calendar size={18} /> Reservar na Loja
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── BOOKING MODAL (COM SÁBADOS) ────────────────────────────── */
/* ── BOOKING MODAL (COM NOTIFICAÇÃO REAL) ────────────────────────────── */
function BookingModal({ isOpen, onClose, service }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [clientData, setClientData] = useState({ name: "", phone: "", email: "" });
  const [month, setMonth] = useState(new Date());
  const [confirmed, setConfirmed] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  // CONFIGURAÇÃO EMAILJS (Já preenchido com os teus dados)
  const SERVICE_ID = "service_jd2hmsh";
  const TEMPLATE_ID = "template_5wkk8d9";
  const PUBLIC_KEY = "r1iXXbQSD6eraiqvx";

  const handleFinalConfirm = async () => {
    setIsSending(true);
    setSendError(false);

    const templateParams = {
      name: clientData.name,
      phone: clientData.phone,
      service: service,
      email: clientData.email,
      date: selectedDate ? new Intl.DateTimeFormat("pt-PT").format(selectedDate) : "",
      time: selectedTime,
    };

    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: templateParams
        })
      });
      if (!res.ok) throw new Error(`EmailJS respondeu ${res.status}`);
      setConfirmed(true);
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      setSendError(true);
    } finally {
      setIsSending(false);
    }
  };

  const reset = () => {
    setStep(1); setSelectedDate(null); setSelectedTime(null);
    setClientData({ name: "", phone: "", email: "" }); setConfirmed(false);
  };

  if (!isOpen) return null;

  // Variáveis para o Calendário
  const today = new Date();
  const { daysInMonth, startDay } = (() => {
    const y = month.getFullYear(), m = month.getMonth();
    return { daysInMonth: new Date(y, m + 1, 0).getDate(), startDay: new Date(y, m, 1).getDay() };
  })();
  const slotsSemana = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];
  const slotsSabado = ["10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
  const currentSlots = selectedDate && selectedDate.getDay() === 6 ? slotsSabado : slotsSemana;

  return (
    <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(10,20,15,0.85)", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div className="relative rounded-2xl overflow-hidden max-w-3xl w-full fade-up flex flex-col shadow-2xl" style={{ background: "var(--cream)", maxHeight: "90vh" }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: "var(--mist)" }}>
          <div>
            <p className="font-display text-2xl font-semibold" style={{ color: "var(--forest)" }}>
              {confirmed ? "Marcação Confirmada" : `Agendar ${service}`}
            </p>
            {!confirmed && <p className="text-xs mt-1 text-gray-400">Passo {step} de 4</p>}
          </div>
          <button onClick={() => { reset(); onClose(); }} className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100"><X size={18} /></button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto scrollbar-hide">
          {confirmed ? (
            <div className="text-center py-8 fade-up">
              <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6" style={{ background: "#e8f5ee" }}>
                <CheckCircle size={40} style={{ color: "#16a34a" }} />
              </div>
              <p className="font-display text-3xl font-semibold mb-2" style={{ color: "var(--forest)" }}>Tudo Pronto!</p>
              <p className="text-sm mb-8 text-gray-500">A sua marcação para {selectedTime} de {selectedDate?.toLocaleDateString()} foi confirmada. Verifique o seu e-mail!</p>
              <button onClick={() => { reset(); onClose(); }} className="btn-forest px-10 py-4 rounded-xl font-bold text-sm w-full">Voltar à Loja</button>
            </div>
          ) : step === 1 ? (
            /* Passo 1: Calendário */
            <div className="fade-up">
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))} disabled={month.getMonth() === today.getMonth()} className="p-2 bg-gray-100 rounded-lg disabled:opacity-30"><ChevronRight size={16} className="rotate-180" /></button>
                <p className="font-bold capitalize">{new Intl.DateTimeFormat("pt-PT", { month: "long", year: "numeric" }).format(month)}</p>
                <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))} className="p-2 bg-gray-100 rounded-lg"><ChevronRight size={16} /></button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => <div key={d} className="text-center text-[10px] font-bold uppercase text-gray-400">{d}</div>)}
                {Array(startDay).fill(0).map((_, i) => <div key={i} />)}
                {Array(daysInMonth).fill(0).map((_, i) => {
                  const day = i + 1;
                  const d = new Date(month.getFullYear(), month.getMonth(), day);
                  const disabled = d < today.setHours(0,0,0,0) || d.getDay() === 0;
                  const isSel = selectedDate?.toDateString() === d.toDateString();
                  return (
                    <button key={day} onClick={() => setSelectedDate(d)} disabled={disabled} className={`aspect-square rounded-xl text-sm font-bold transition-all ${isSel ? 'bg-black text-white' : disabled ? 'opacity-10' : 'hover:bg-gray-100'}`}>
                      {day}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setStep(2)} disabled={!selectedDate} className="btn-forest w-full py-4 rounded-xl font-bold mt-8 disabled:opacity-40">Continuar</button>
            </div>
          ) : step === 2 ? (
            /* Passo 2: Horas */
            <div className="fade-up">
              <div className="grid grid-cols-3 gap-3">
                {currentSlots.map(t => (
                  <button key={t} onClick={() => setSelectedTime(t)} className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${selectedTime === t ? 'border-black bg-black text-white' : 'border-gray-100'}`}>{t}</button>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(1)} className="btn-outline-forest flex-1 py-4 rounded-xl font-bold">Voltar</button>
                <button onClick={() => setStep(3)} disabled={!selectedTime} className="btn-forest flex-1 py-4 rounded-xl font-bold disabled:opacity-40">Continuar</button>
              </div>
            </div>
          ) : step === 3 ? (
            /* Passo 3: Dados */
            <div className="fade-up space-y-4">
              <input type="text" placeholder="Nome Completo" value={clientData.name} onChange={e => setClientData({...clientData, name: e.target.value})} className="w-full px-5 py-4 rounded-xl border-2 outline-none focus:border-black" />
              <input type="tel" placeholder="Telemóvel" value={clientData.phone} onChange={e => setClientData({...clientData, phone: e.target.value})} className="w-full px-5 py-4 rounded-xl border-2 outline-none focus:border-black" />
              <input type="email" placeholder="E-mail" value={clientData.email} onChange={e => setClientData({...clientData, email: e.target.value})} className="w-full px-5 py-4 rounded-xl border-2 outline-none focus:border-black" />
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(2)} className="btn-outline-forest flex-1 py-4 rounded-xl font-bold">Voltar</button>
                <button onClick={() => setStep(4)} disabled={!clientData.name || !clientData.phone} className="btn-forest flex-1 py-4 rounded-xl font-bold">Continuar</button>
              </div>
            </div>
          ) : (
            /* Passo 4: Resumo Final */
            <div className="fade-up">
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Resumo da Marcação</p>
                <div className="space-y-3">
                  <div className="flex justify-between"><span>Data</span><span className="font-bold">{selectedDate?.toLocaleDateString()}</span></div>
                  <div className="flex justify-between"><span>Hora</span><span className="font-bold">{selectedTime}</span></div>
                  <div className="flex justify-between"><span>Cliente</span><span className="font-bold">{clientData.name}</span></div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="btn-outline-forest flex-1 py-4 rounded-xl font-bold">Voltar</button>
                <button
                  onClick={handleFinalConfirm}
                  disabled={isSending}
                  className="btn-forest flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSending ? "A enviar..." : <><CheckCircle size={18} /> Confirmar Marcação</>}
                </button>
              </div>
              {sendError && (
                <p className="text-xs mt-4 text-center" style={{ color: "#c0392b" }}>
                  Não foi possível enviar o pedido de marcação. Ligue-nos para 934 421 310 ou tente novamente.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE COMPONENTS (Header, Footer, and routed pages)
   Module-scope so identities stay stable across MainLayout re-renders
   ══════════════════════════════════════════════════════════════ */
  /* HEADER */
  const Header = ({ page, setPage, openBook }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 12);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
      <header
        className={`header-shell fixed top-0 left-0 right-0 z-50 backdrop-blur-xl ${scrolled ? "header-scrolled" : ""}`}
        style={{
          background: "rgba(255,255,255,0.92)",
          borderBottom: "1px solid var(--mist)",
        }}
      >
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all ${scrolled ? "py-3" : "py-4"}`}>
          <button
            onClick={() => setPage("home")}
            className="flex items-center transition-transform hover:scale-105"
          >
            <img
              src="https://i.postimg.cc/266k26gS/Logo-Optica13-preto-1.png"
              alt="Logo Óptica 13"
              className="h-10 w-auto"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {[
              ["Serviços", "services"],
              ["Vantagens", "vantagens"],
              ["MindTheLook", "mindthelook"],
              ["Outlet", "outlet"],
              ["Sobre Nós", "about"],
              ["Contactos", "contact"],
            ].map(([label, p]) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`relative font-medium transition-all hover:opacity-100 ${
                  page === p ? "opacity-100" : "opacity-60"
                }`}
                style={{ color: page === p ? "var(--gold)" : "var(--forest)" }}
              >
                {label}
                {p === "outlet" && (
                  <span
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-white whitespace-nowrap shadow-sm"
                    style={{ background: "#dc2626", fontSize: "9px", fontWeight: 800, lineHeight: 1 }}
                  >
                    até -70%
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={() => setPage("quiz")}
              className="flex items-center gap-1 font-medium transition-all hover:opacity-100 opacity-60"
              style={{ color: "var(--forest)" }}
            >
              <Sparkles size={14} style={{ color: "var(--gold)" }} /> Quiz de
              Estilo
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
             onClick={() => openBook("Consulta de Optometria")}
              className="hidden sm:flex btn-forest px-5 py-2.5 rounded-xl text-sm font-semibold items-center gap-2"
            >
              <Calendar size={14} /> Agendar Exame
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all"
            >
              {mobileMenuOpen ? <X size={18} /> : <Filter size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden border-t"
            style={{ background: "white", borderColor: "var(--mist)" }}
          >
            <div className="px-6 py-4 space-y-2">
              {[
                ["Serviços", "services"],
                ["Vantagens", "vantagens"],
                ["MindTheLook", "mindthelook"],
                ["Outlet", "outlet"],
                ["Sobre Nós", "about"],
                ["Contactos", "contact"],
              ].map(([label, p]) => (
                <button
                  key={p}
                  onClick={() => {
                    setPage(p);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 rounded-xl font-medium transition-all"
                  style={{
                    background: page === p ? "var(--mist)" : "transparent",
                    color: page === p ? "var(--gold)" : "var(--forest)",
                  }}
                >
                  {label}
                  {p === "outlet" && (
                    <span
                      className="px-1.5 py-0.5 rounded-full text-white whitespace-nowrap"
                      style={{ background: "#dc2626", fontSize: "10px", fontWeight: 800, lineHeight: 1 }}
                    >
                      até -70%
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={() => {
                  setPage("quiz");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2"
                style={{ color: "var(--forest)" }}
              >
                <Sparkles size={14} style={{ color: "var(--gold)" }} /> Quiz de
                Estilo
              </button>
              <button
                onClick={() => {
                  openBook();
                  setMobileMenuOpen(false);
                }}
                className="btn-forest w-full px-4 py-3 rounded-xl text-sm font-semibold mt-4 flex items-center justify-center gap-2"
              >
                <Calendar size={14} /> Agendar Exame
              </button>
            </div>
          </div>
        )}
      </header>
    );
  };
  /* FOOTER */
  const Footer = ({ setPage }) => (
    <footer className="py-16" style={{ background: "var(--slate)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Usamos 5 colunas para caber tudo bem */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* 1. Logotipo e ERS */}
<div className="lg:col-span-2">
  <div className="flex items-center gap-3 mb-5">
    <img 
      src="https://i.postimg.cc/266k26gS/Logo-Optica13-preto-1.png" 
      alt="Logo Óptica 13" 
      className="h-10 w-auto" 
      style={{ filter: "brightness(0) invert(1)" }} // <--- A MAGIA PARA O TORNAR BRANCO
    />
  </div>
            <p
              className="text-sm leading-relaxed mb-3 max-w-sm"
              style={{ color: "rgba(250,247,242,0.45)" }}
            >
              Cuidamos da sua visão com tecnologia de ponta e profissionalismo.
            </p>
            <p className="text-xs font-semibold text-gray-500">
              Nº Registo ERS: E131391| NIF: 501687459
            </p>
          </div>

          {/* 2. Navegação */}
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: "var(--gold)" }}
            >
              Navegação
            </p>
            <ul className="space-y-3">
              {[
                ["services", "Serviços"],
                ["vantagens", "Vantagens"],
                ["mindthelook", "MindTheLook"],
                ["outlet", "Outlet"],
                ["quiz", "Quiz de Estilo"],
                ["contact", "Contactos"],
              ].map(([p, l]) => (
                <li key={p}>
                  <button
                    onClick={() => setPage(p)}
                    className="text-sm transition-all"
                    style={{ color: "rgba(250,247,242,0.5)" }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                    onMouseLeave={(e) =>
                      (e.target.style.color = "rgba(250,247,242,0.5)")
                    }
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contactos e Horário */}
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: "var(--gold)" }}
            >
              Contactos
            </p>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(250,247,242,0.5)" }}>
              <li className="flex items-start gap-2">
                <Phone size={14} className="mt-1 flex-shrink-0" style={{ color: "var(--gold)" }} />
                <span>
                  214 578 119
                  <br />
                  934 421 310
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 flex-shrink-0" style={{ color: "var(--gold)" }} />
                <span>
                  Sede: R. 31 de Janeiro 8-B
                  <br />
                  2775-295 Parede
                </span>
              </li>
              <li className="flex items-start gap-2 mt-4 pt-4 border-t border-gray-800">
                <Clock size={14} className="mt-1 flex-shrink-0" style={{ color: "var(--gold)" }} />
                <span>
                  Dias Úteis: 9:30 – 19:30
                  <br />
                  Sáb: 9h30–13h30 / 15h–18h
                </span>
              </li>
            </ul>
          </div>

          {/* 4. Informação Legal (Novo) */}
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: "var(--gold)" }}
            >
              Legal
            </p>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(250,247,242,0.5)" }}>
              <li>
                <button onClick={() => setPage("terms")} className="hover:text-white transition-colors">
                  Termos e Privacidade
                </button>
              </li>
            </ul>

            <p className="text-[10px] mt-6 leading-tight" style={{ color: "rgba(250,247,242,0.4)" }}>
              Em caso de litígio, o consumidor pode recorrer ao Centro de Arbitragem de Conflitos de Consumo de Lisboa (CACCL). Mais informações em www.consumidor.pt.
            </p>

            <a
              href="https://www.livroreclamacoes.pt/"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 transition-transform hover:scale-105"
            >
              <img
                src="https://www.livroreclamacoes.pt/Autenticacao_CC/img/logo-livro-reclamacoes.svg"
                alt="Livro de Reclamações Eletrónico"
                className="h-8 bg-white p-1 rounded"
              />
            </a>
          </div>
        </div>

        {/* Direitos de Autor */}
        <div
          className="border-t pt-8 text-center text-xs"
          style={{
            borderColor: "rgba(250,247,242,0.08)",
            color: "rgba(250,247,242,0.25)",
          }}
        >
          © 2026 Óptica 13 · Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
  /* TESTIMONIALS CAROUSEL */
  const TestimonialsSection = () => {
    const [active, setActive] = useState(0);
    const [fading, setFading] = useState(false);
    const goToTestimonial = (i) => {
      if (i === active) return;
      setFading(true);
      setTimeout(() => {
        setActive(i);
        setFading(false);
      }, 300);
    };
    const testimonials = [
      {
        name: "Luís Correia Tavares",
        text: "Foi uma novidade para mim saber que à parte dos óculos existem outras informações que são muito úteis, como saber quais são as cores que combinam melhor contigo e eu nunca tinha dado importância a isso e aqui com esse serviço que oferecem acaba por ser muito mais direcionado, porque formula um padrão de necessidades e aquilo que te fica bem, sendo que por vezes aquilo que nos fica melhor não é aquilo que nós mais gostamos!",
      },
      {
        name: "Maria dos Prazeres",
        text: "Eu encontrei a Óptica 13 por mero acaso, mas rapidamente me apercebi que as pessoas da Óptica são fantásticas. Daí ficámos, além da utilização de óculos, amigos. Conheço os mais jovens da ótica desde pequenos, portanto há uma afinidade pelo facto de os conhecer. Portanto, estou satisfeita e é evidente que não quero mudar de loja, nem de atendimento",
      },
      {
        name: "Avelino Cruz",
        text: "Sou cliente da Óptica 13 há 34 anos! Gosto das pessoas, da qualidade do produto e da seriedade, que é, acima de tudo, o que eu aprecio. Confio plenamente nas pessoas, porque mantêm os meus olhos em boas condições! Tenho recomendado a ótica a várias pessoas e algumas delas já têm vindo cá!",
      },
    ];

    return (
      <section className="py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto px-6 fade-up">
          <div
            className="bg-white rounded-3xl p-8 md:p-14 shadow-sm border relative"
            style={{ borderColor: "var(--mist)" }}
          >
            <h2
              className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ color: "var(--forest)" }}
            >
              O que é que os nossos
              <br />
              clientes dizem sobre a<br />
              Óptica 13?
            </h2>

            {/* ADICIONADO: 5 Estrelas */}
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={24}
                  fill="var(--gold)"
                  style={{ color: "var(--gold)" }}
                />
              ))}
            </div>

            <div className={`min-h-[220px] sm:min-h-[160px] flex items-center testimonial-fade ${fading ? "testimonial-fading" : ""}`}>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: "#666" }}
              >
                {testimonials[active].text}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mt-10">
              {/* Nome e Avatar */}
              <div
                className={`flex items-center gap-4 bg-gray-50 pr-6 rounded-full border w-fit testimonial-fade ${fading ? "testimonial-fading" : ""}`}
                style={{ borderColor: "var(--mist)" }}
              >
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm">
                  {/* Ícone de utilizador igual à tua imagem */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span
                  className="font-bold text-base md:text-lg tracking-wide"
                  style={{ color: "var(--forest)" }}
                >
                  {testimonials[active].name}
                </span>
              </div>

              {/* Bolinhas / Controlos */}
              <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToTestimonial(i)}
                  className={`h-3 transition-all ${
                    active === i
                      ? "w-8 rounded-full border-2 border-black"
                      : "w-3 rounded-full bg-gray-600 hover:bg-black"
                  }`}
                  style={{ background: active === i ? "transparent" : "" }}
                  aria-label={`Ver testemunho ${i + 1}`}
                />
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
 /* HOME PAGE (COM CARROSSEL) */
  const HomePage = ({ setPage, openBook, setSelectedProduct }) => {
    // 1. Definir os Slides do Carrossel
    const slides = [
      {
        id: 1,
        tag: "Oferta: Consulta Gratuita esta semana",
        titlePt1: "A sua visão,",
        titlePt2: "a nossa ",
        titleHighlight: "missão",
        desc: "Exames de optometria gratuitos. Marcas premium. Tecnologia de ponta. Tudo num só lugar.",
        btn1Text: "Marcar Exame Gratuito",
        btn1Action: () => openBook("Consulta de Optometria"),
        img: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&h=800&fit=crop",
      },
      {
        id: 2,
        tag: "Coleção MindTheLook",
        titlePt1: "A coleção que",
        titlePt2: "veste o seu ",
        titleHighlight: "estilo",
        desc: "Armações e óculos de sol premium, para homem e mulher. Descubra o modelo perfeito na nossa coleção MindTheLook.",
        btn1Text: "Ver Coleção MindTheLook",
        btn1Action: () => setPage("mindthelook"),
        img: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&h=800&fit=crop",
      },
      {
        id: 3,
        tag: "Outlet: até 70% de desconto",
        titlePt1: "Estilo premium,",
        titlePt2: "a preços ",
        titleHighlight: "imperdíveis",
        desc: "30 modelos exclusivos com desconto direto. Stock limitado — não perca a sua oportunidade.",
        btn1Text: "Ver Outlet",
        btn1Action: () => setPage("outlet"),
        img: "https://i.postimg.cc/QMgkChHR/31.png",
      }
    ];

    // 2. Estado para controlar o slide ativo
    const [currentSlide, setCurrentSlide] = useState(0);

    // 3. Efeito para auto-play (muda a cada 6 segundos)
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 6000);
      return () => clearInterval(timer);
    }, [slides.length]);

    // Funções para os botões manuais
    const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
      <div>
        {/* Hero Carrossel */}
        <section className="relative hero-bg pt-32 pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            {/* O Contentor do Slide Ativo */}
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
              
              {/* Lado Esquerdo (Texto) */}
              <div className="text-white" key={`text-${currentSlide}`}>
                <button 
                  onClick={slides[currentSlide].btn1Action}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 fade-up transition-all hover:scale-105 cursor-pointer" 
                  style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}
                >
                  <span className="text-base">✨</span>
                  <span className="text-xs font-bold tracking-wide uppercase" style={{ color: "var(--gold)" }}>
                    {slides[currentSlide].tag}
                  </span>
                </button>
                <h1
                  className="font-display mb-6 fade-up-1"
                  style={{ fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 1.1 }}
                >
                  {slides[currentSlide].titlePt1}
                  <br />{slides[currentSlide].titlePt2} <em style={{ color: "var(--gold)" }}>{slides[currentSlide].titleHighlight}</em>
                </h1>
                <p
                  className="text-lg mb-8 opacity-90 fade-up-2"
                  style={{ maxWidth: 480 }}
                >
                  {slides[currentSlide].desc}
                </p>
                <div className="flex flex-wrap gap-4 fade-up-3">
                  <button
                    onClick={slides[currentSlide].btn1Action}
                    className="bg-white px-8 py-4 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-2xl transition-all hover:scale-105"
                    style={{ color: "var(--forest)" }}
                  >
                    {slides[currentSlide].btn1Text}
                  </button>
                  <button
                    onClick={() => setPage("mindthelook")}
                    className="border-2 border-white px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all hover:bg-white hover:text-black"
                  >
                    Ver Coleções
                  </button>
                </div>
              </div>

              {/* Lado Direito (Imagem) - SEM O SELO DOS 15% */}
              <div className="relative fade-up-2" key={`img-${currentSlide}`}>
                <div className="aspect-square rounded-3xl overflow-hidden img-zoom">
                  <Img
                    src={slides[currentSlide].img}
                    alt="Slide"
                    className="w-full h-full object-cover"
                    priority={true} 
                  />
                </div>
              </div>

            </div>

            {/* Controlos do Carrossel (Setas e Bolinhas) */}
            <div className="flex items-center gap-6 mt-12">
              <div className="flex gap-2">
                <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                  <ChevronRight size={18} className="rotate-180" />
                </button>
                <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 transition-all rounded-full ${currentSlide === idx ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ... Restante código da HomePage (Services, etc) ... */}
        
        {/* Services */}
        <section className="py-24" style={{ background: "var(--cream)" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "var(--gold)" }}
              >
                Serviços Premium
              </p>
              <h2
                className="font-display mb-4"
                style={{
                  fontSize: "clamp(2rem,4vw,3rem)",
                  color: "var(--forest)",
                }}
              >
                Tudo o que precisa para <em>ver melhor</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  Icon: OptometryIcon,
                  title: "Optometria",
                  desc: "Exames completos com tecnologia de última geração. Gratuitos na compra de óculos.",
                },
                {
                  Icon: LensIcon,
                  title: "Contactologia",
                  desc: "Adaptação personalizada de lentes de contacto para o seu conforto máximo.",
                },
                {
                  Icon: CardIcon,
                  title: "Certificados de Condução",
                  desc: "Exames oficiais rápidos e sem complicações. Agende já o seu.",
                },
              ].map(({ Icon, title, desc }, i) => (
                <div
                  key={i}
                  className={`card-hover p-8 rounded-2xl bg-white border fade-up-${
                    i + 1
                  }`}
                  style={{ borderColor: "var(--mist)" }}
                >
                  <div
                    className="w-16 h-16 mb-6"
                    style={{ color: "var(--forest)" }}
                  >
                    <Icon />
                  </div>
                  <h3
                    className="font-display text-2xl font-semibold mb-3"
                    style={{ color: "var(--forest)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#666" }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONSULTORIA DE IMAGEM */}
        <section className="py-24" style={{ background: "var(--cream)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Lado da Imagem */}
              <div
                className="order-2 lg:order-1 rounded-3xl overflow-hidden img-zoom shadow-2xl relative"
                style={{ height: "550px" }}
              >
                <Img
                  src="https://images.unsplash.com/photo-1582142407894-ec85a1260a46?w=800&h=1000&fit=crop"
                  alt="Consultoria de Imagem"
                  className="w-full h-full object-cover"
                />
                {/* Etiqueta flutuante na imagem */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg border border-white/50 max-w-[250px] fade-up-2">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        fill="var(--gold)"
                        style={{ color: "var(--gold)" }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium italic text-gray-700">
                    "Ajudaram-me a descobrir as cores e formatos que realmente me
                    favorecem. Serviço 5 estrelas!"
                  </p>
                </div>
              </div>

              {/* Lado do Texto */}
              <div className="order-1 lg:order-2 fade-up-1">
                <span
                  className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6"
                  style={{
                    background: "rgba(201,168,76,0.15)",
                    color: "var(--gold)",
                  }}
                >
                  Atendimento Premium
                </span>
                <h2
                  className="font-display text-4xl md:text-5xl font-semibold mb-6 leading-tight"
                  style={{ color: "var(--forest)" }}
                >
                  Consultoria de <br />
                  <em style={{ color: "var(--gold)" }}>Imagem Especializada</em>
                </h2>
                <p
                  className="text-base leading-relaxed mb-10"
                  style={{ color: "#666" }}
                >
                  Não vendemos apenas óculos. Acreditamos que a sua armação é a
                  moldura do seu rosto. A nossa equipa utiliza técnicas de
                  visagismo para identificar os modelos que melhor harmonizam com
                  os seus traços, tom de pele e estilo de vida.
                </p>

                <div className="space-y-6 mb-10">
                  {[
                    {
                      icon: Eye,
                      title: "Análise Facial",
                      text: "Estudo detalhado do formato e proporções do seu rosto.",
                    },
                    {
                      icon: Sparkles,
                      title: "Coloração Pessoal",
                      text: "Identificação dos tons (quentes ou frios) que iluminam o seu olhar.",
                    },
                    {
                      icon: Award,
                      title: "Curadoria de Marcas",
                      text: "Seleção personalizada dentro do nosso portefólio premium.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                        style={{
                          background: "var(--cream-dark)",
                          border: "1px solid var(--mist)",
                        }}
                      >
                        <item.icon size={20} style={{ color: "var(--gold)" }} />
                      </div>
                      <div>
                        <p
                          className="font-semibold text-sm mb-1"
                          style={{ color: "var(--forest)" }}
                        >
                          {item.title}
                        </p>
                        <p className="text-xs" style={{ color: "#888" }}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => openBook("Consultoria de Imagem")}
                    className="btn-forest px-8 py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1 transition-transform"
                  >
                    <Calendar size={16} /> Agendar Consultoria
                  </button>
                  <button
                    onClick={() => setPage("quiz")}
                    className="btn-outline-forest px-8 py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:-translate-y-1 transition-transform"
                  >
                    <Glasses size={16} /> Fazer Quiz Virtual
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CTA */}
        <section className="py-20" style={{ background: "var(--cream-dark)" }}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Award
              size={48}
              className="mx-auto mb-6"
              style={{ color: "var(--gold)" }}
            />
            <h2
              className="font-display mb-4"
              style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--forest)" }}
            >
              Exame de Vista <em style={{ color: "var(--gold)" }}>Gratuito</em>
            </h2>
            <p className="text-lg mb-8" style={{ color: "#666" }}>
             Agende a sua consulta de optometria com os nossos especialistas. O exame é totalmente gratuito na compra dos seus novos óculos ou caso não leve prescrição.
            </p>
            <button
              onClick={() => openBook("Consulta de Optometria")}
              className="btn-forest px-10 py-4 rounded-xl font-semibold text-sm tracking-wide inline-flex items-center gap-2 shadow-lg"
            >
              <Calendar size={16} /> Marcar Agora
            </button>
          </div>
        </section>
        {/* MAIS VENDIDOS */}
        <section className="py-20" style={{ background: "white" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: "var(--gold)" }}
                >
                  Coleção
                </p>
                <h2
                  className="font-display text-4xl font-medium"
                  style={{ color: "var(--forest)" }}
                >
                  Os <em>Mais Vendidos</em>
                </h2>
              </div>
              <div className="hidden sm:flex gap-3">
                <button
                  onClick={() => setPage("mindthelook?genero=homem")}
                  className="btn-outline-forest px-5 py-2.5 rounded-xl text-sm font-semibold"
                >
                  Homem
                </button>
                <button
                  onClick={() => setPage("mindthelook?genero=mulher")}
                  className="btn-outline-forest px-5 py-2.5 rounded-xl text-sm font-semibold"
                >
                  Mulher
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                PRODUCTS.men[0],
                PRODUCTS.men[3],
                PRODUCTS.women[0],
                PRODUCTS.women[2],
              ].map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className="cursor-pointer card-hover rounded-2xl overflow-hidden group"
                  style={{ border: "1px solid var(--mist)" }}
                >
                  <div
                    className="aspect-square img-zoom"
                    style={{ background: "#f5f4f0" }}
                  >
                    <Img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <p
                      className="text-xs font-semibold tracking-wide mb-0.5"
                      style={{ color: "var(--gold)" }}
                    >
                      {p.brand}
                    </p>
                    <p className="font-semibold text-sm mb-1">{p.name}</p>
                    <p
                      className="font-display text-lg font-semibold"
                      style={{ color: "var(--forest)" }}
                    >
                      €{p.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Testemunhos */}
        <TestimonialsSection />
      </div>
    );
  };
  /* SERVICES PAGE */
  const ServicesPage = ({ openBook, setPage }) => {
    const servicesData = [
      {
        title: "Consultas de Optometria",
        text: (
          <>
            <p className="mb-4">
              O Optometrista é um profissional da área da saúde, treinado para
              identificar a existência de patologias oculares ou problemas
              sensoriais através de equipamentos oftalmológicos sem o recurso a
              medicamentos ou técnicas invasivas. Estas consultas visam
              identificar algum defeito de visão e corrigi-lo ou encaminhá-lo
              para um Oftalmologista, dependendo da patologia detetada.{" "}
              <strong>
               A consulta é totalmente gratuita se fizer os seus óculos connosco ou se não necessitar de levar a prescrição médica. Caso pretenda levar a sua receita consigo, o exame tem o valor de 50€.
              </strong>
            </p>
            <p className="mb-6">
              A Óptica 13 dispõe de tecnologia avançada e de um Optometrista
              credenciado para que possa efetuar com segurança o seu exame de
              visão. Assim, se começou com dificuldades em ver com as suas
              lentes ou sente algum tipo de desconforto, dores de cabeça e
              cansaço marque uma consulta de Optometria no nosso espaço.
            </p>
            <div
              className="p-5 rounded-xl border border-gray-200 mb-6"
              style={{ background: "var(--cream-dark)" }}
            >
              <h4
                className="font-semibold text-lg mb-3 flex items-center gap-2"
                style={{ color: "var(--forest)" }}
              >
                <Sparkles size={18} style={{ color: "var(--gold)" }} /> Método
                três passos: Os melhores óculos para si!
              </h4>
              <p className="mb-3 text-sm">
                Esta é uma técnica infalível para escolher os melhores óculos,
                engloba:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={14}
                    className="mt-1 flex-shrink-0"
                    style={{ color: "var(--gold)" }}
                  />{" "}
                  Teste de cores de rosto
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={14}
                    className="mt-1 flex-shrink-0"
                    style={{ color: "var(--gold)" }}
                  />{" "}
                  Análise de Estilo(s)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={14}
                    className="mt-1 flex-shrink-0"
                    style={{ color: "var(--gold)" }}
                  />{" "}
                  Observação do desenho do rosto e ponderação técnica sobre os
                  dados do cliente.
                </li>
              </ul>
            </div>
          </>
        ),
       img: "https://i.postimg.cc/KjLFzDfn/newarta-eye-care-5016078-1920.jpg",
        actionLabel: "Agendar Consulta",
        actionFn: () => openBook("Consulta de Optometria"),
      },
      {
        title: "Atestado Médico (Cartas de Condução)",
        text: (
          <>
            <p className="mb-4">
              Vai renovar a sua carta de condução? Na Óptica 13, realizamos o
              exame de aptidão visual necessário para garantir que cumpre todos
              os requisitos legais de segurança rodoviária.
            </p>
            <p className="mb-4">
              De acordo com a legislação em vigor (RGIC), avaliamos parâmetros
              fundamentais como a acuidade visual, campo visual e visão
              cromática. No final, emitimos o relatório técnico necessário para
              que o seu médico possa submeter o Atestado Médico Eletrónico junto
              do IMT.
            </p>
            <p
              className="font-semibold mb-3 mt-6"
              style={{ color: "var(--forest)" }}
            >
              O que avaliamos:
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--gold)" }}
                />{" "}
                Acuidade visual binocular (com e sem correção)
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--gold)" }}
                />{" "}
                Campo visual e visão periférica
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--gold)" }}
                />{" "}
                Teste de cores e sensibilidade ao contraste
              </li>
            </ul>
            <p className="text-sm bg-white p-4 rounded-lg border font-medium">
              Ligue{" "}
              <a
                href="tel:+351934421310"
                className="font-bold hover:underline transition-all"
                style={{ color: "var(--gold)" }}
              >
                934 421 310
              </a>{" "}
              ou agende online abaixo.
            </p>
          </>
        ),
        img: "https://i.postimg.cc/xd7WzbXY/maximilianovich-doctor-5710159-1920.jpg",
        actionLabel: "Marcar Exame",
       actionFn: () => openBook("Exame Carta de Condução"),
      },
      {
        title: "Consultas de Contactologia",
        text: (
          <>
            <p className="mb-6">
              Seja utilizador habitual de lentes de contacto ou a experimentar
              pela primeira vez, o serviço de Contactologia disponibiliza-lhe
              ajuda e acompanhamento em todas as questões ligadas ao uso de
              lentes de contacto.
            </p>
            <p
              className="font-semibold mb-4"
              style={{ color: "var(--forest)" }}
            >
              O serviço proporciona:
            </p>
            <ul className="space-y-3 mb-6 text-sm bg-white p-5 rounded-xl border border-gray-100">
              <li className="flex items-start gap-2">
                <CheckCircle
                  size={16}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "var(--forest)" }}
                />{" "}
                Análise visual e de adaptação aos vários materiais
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle
                  size={16}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "var(--gold)" }}
                />{" "}
                <strong>Oferta do 1º par de lentes</strong>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle
                  size={16}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "var(--forest)" }}
                />{" "}
                Soluções para correção da visão a uma só distância ou várias
                (perto e longe)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle
                  size={16}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "var(--gold)" }}
                />{" "}
                <strong>Oferta de consultas periódicas</strong> de
                acompanhamento ao fidelizar-se
              </li>
            </ul>
          </>
        ),
        img: "https://i.postimg.cc/MZySsB2x/Contactologia-1-300x300.png",
        actionLabel: "Agendar Consulta",
        actionFn: () => openBook("Consulta de Contactologia"),
      },
      {
        title: "Aconselhamento Personalizado",
        text: (
          <>
            <p className="mb-4">
              O rosto funciona como a nossa "montra", é a primeira informação a
              ser absorvida por aqueles com quem interagimos. Por isso, a
              escolha da armação certa é muito importante. Embora para uns, os
              óculos possam ser apenas um acessório, para muitos são uma
              necessidade permanente.
            </p>
            <p className="mb-6">
              Ao longo de todos os nossos anos de experiência, temos aconselhado
              muitos clientes na escolha das armações, mas tendo como principais
              preocupações as questões técnicas e de adaptação ao tipo de rosto,
              garantindo que assenta corretamente no nariz.
            </p>
            <p
              className="font-semibold mb-3"
              style={{ color: "var(--forest)" }}
            >
              Ao optar por este serviço, oferecemos-lhe:
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-start gap-2">
                <div
                  className="w-1.5 h-1.5 mt-1.5 rounded-full"
                  style={{ background: "var(--gold)" }}
                />{" "}
                <strong>Teste de Cores</strong> (paleta correspondente,
                maquilhagem, acessórios, cabelo)
              </li>
              <li className="flex items-start gap-2">
                <div
                  className="w-1.5 h-1.5 mt-1.5 rounded-full"
                  style={{ background: "var(--gold)" }}
                />{" "}
                <strong>Análise de Estilos</strong>
              </li>
              <li className="flex items-start gap-2">
                <div
                  className="w-1.5 h-1.5 mt-1.5 rounded-full"
                  style={{ background: "var(--gold)" }}
                />{" "}
                <strong>Análise de Formato do Rosto</strong>
              </li>
            </ul>
          </>
        ),
        img: "https://i.postimg.cc/9FR1DNGD/v2-watermarked-a55f23c6-8639-4f5f-b6ac-ee188e16a20b.jpg",
        actionLabel: "Fazer Quiz Virtual",
        actionFn: () => setPage("quiz"),
      },
      {
        title: "Ótica ao Domicílio",
        text: (
          <>
            <p className="mb-6 text-lg">
              Resolvemos em sua casa tudo o que estiver relacionado com os seus
              óculos.
            </p>
            <p
              className="font-semibold mb-4"
              style={{ color: "var(--forest)" }}
            >
              Num raio de 20km deslocamo-nos para os diversos serviços:
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Glasses size={14} />
                </div>
                <span className="text-sm font-medium">Consertos de óculos</span>
              </div>
              <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag size={14} />
                </div>
                <span className="text-sm font-medium">Aquisição de Lentes</span>
              </div>
              <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={14} />
                </div>
                <span className="text-sm font-medium">Entregas seguras</span>
              </div>
              <div className="p-4 rounded-xl border border-gold/30 bg-blue-50/50 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} style={{ color: "var(--gold)" }} />
                </div>
                <span className="text-sm font-bold text-blue-900">
                  Deslocação Gratuita
                </span>
              </div>
            </div>
          </>
        ),
        img: "https://i.postimg.cc/ZYPGPhpn/Otica-ao-domicilio-300x300.png",
        actionLabel: "Contactar-nos",
        actionFn: () => setPage("contact"),
      },
      {
        title: "Medição de Tensão Ocular",
        text: (
          <>
            <p className="mb-4">
              Tal como a tensão arterial, também a nossa saúde ocular é objeto
              de medida. Designado por tonometria, o controlo da pressão
              intraocular permite prevenir doenças oculares como o Glaucoma e é
              fundamental para o tratamento desta doença.
            </p>
            <p className="mb-4">
              Trata-se de um exame muito simples, indolor e com cerca de 2
              minutos de duração para ambos os olhos.
            </p>
            <p className="mb-6">
              Se sentir algum desconforto na vista tal como picadas, vermelhidão
              ou dor, visite-nos que os nossos técnicos especializados medirão
              de imediato a sua tensão ocular.
            </p>
            <div
              className="p-5 rounded-xl border-l-4"
              style={{
                background: "var(--cream-dark)",
                borderColor: "var(--gold)",
              }}
            >
              <p
                className="font-bold text-sm"
                style={{ color: "var(--forest)" }}
              >
                Na Óptica 13 disponibilizamos o serviço de medição da pressão
                intraocular gratuitamente a todos os nossos clientes.
              </p>
            </div>
          </>
        ),
        img: "https://i.postimg.cc/RZh2z687/Medicao-de-tensao-ocular-300x300.png",
        actionLabel: "Visitar Loja",
        actionFn: () => setPage("contact"),
      },
    ];

    return (
      <div
        className="pt-28 pb-24 min-h-screen"
        style={{ background: "var(--cream)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 fade-up">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--gold)" }}
            >
              O Nosso Cuidado
            </p>
            <h1
              className="font-display mb-6"
              style={{
                fontSize: "clamp(2.5rem,5vw,4rem)",
                color: "var(--forest)",
                lineHeight: 1.1,
              }}
            >
              Soluções <em>Completas</em>
              <br />
              para a Sua Visão
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#666" }}>
              Descubra todos os serviços especializados que a nossa equipa
              preparou para si, sempre com a máxima qualidade e atenção ao
              detalhe.
            </p>
          </div>

          <div className="space-y-24">
            {servicesData.map((srv, idx) => (
              <div
                key={idx}
                className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center fade-up-1"
              >
                {/* Lado da Imagem (Muda de lado dependendo se o índice é par ou ímpar) */}
                <div
                  className={`relative rounded-3xl overflow-hidden shadow-xl h-[400px] lg:h-[550px] img-zoom ${
                    idx % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Img
                    src={srv.img}
                    alt={srv.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-[12px] border-white/10 rounded-3xl pointer-events-none"></div>
                </div>

                {/* Lado do Texto */}
                <div className={`${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h2
                    className="font-display text-3xl lg:text-4xl font-semibold mb-6"
                    style={{ color: "var(--forest)" }}
                  >
                    {srv.title}
                  </h2>
                  <div
                    className="text-base leading-relaxed"
                    style={{ color: "#555" }}
                  >
                    {srv.text}
                  </div>
                  <button
                    onClick={srv.actionFn}
                    className="mt-8 btn-forest px-8 py-4 rounded-xl font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-transform hover:-translate-y-1"
                  >
                    {srv.actionLabel} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  /* COLLECTION PAGE (MEN/WOMEN) */
  const CollectionPage = ({ products: productsProp, title, eyebrow, showDiscount, showGenderFilter, setSelectedProduct }) => {
    const [filters, setFilters] = useState({
      material: "",
      color: "",
      style: "",
      shape: "",
    });
    const [search, setSearch] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const genderFilter = searchParams.get("genero") || "";
    const setGenderFilter = (value) => {
      const next = new URLSearchParams(searchParams);
      if (value) next.set("genero", value);
      else next.delete("genero");
      setSearchParams(next, { replace: true });
    };

    const products = productsProp;
    const filtered = useMemo(() => {
      return products.filter((p) => {
        if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
        if (filters.material && !p.material.toLowerCase().includes(filters.material.toLowerCase())) return false;
        if (filters.style && !p.style.toLowerCase().includes(filters.style.toLowerCase())) return false;

        if (genderFilter === "homem" && !(p.gender === "Masculino" || p.gender === "Unisexo")) return false;
        if (genderFilter === "mulher" && !(p.gender === "Feminino" || p.gender === "Unisexo")) return false;

        if (filters.color) {
          const c = filters.color.toLowerCase();
          const pc = p.color.toLowerCase();
          if (c === "transparente" && !(pc.includes("transparente") || pc.includes("cristal"))) return false;
          else if (c === "vermelho" && !(pc.includes("vermelho") || pc.includes("burgundy") || pc.includes("vinho"))) return false;
          else if (c !== "transparente" && c !== "vermelho" && !pc.includes(c)) return false;
        }

        if (filters.shape) {
          const s = filters.shape.toLowerCase();
          const ps = p.shape.toLowerCase();
          if (s === "redondo" && !(ps.includes("redondo") || ps.includes("pantos"))) return false;
          else if (s === "cat-eye" && !(ps.includes("cat-eye") || ps.includes("borboleta"))) return false;
          else if (s !== "redondo" && s !== "cat-eye" && !ps.includes(s)) return false;
        }
        return true;
      });
    }, [products, search, filters, genderFilter]);

    const activeFilterCount = [filters.material, filters.color, filters.style, filters.shape].filter(Boolean).length;
    const activeChips = [
      ...(search ? [{ key: "search", label: `"${search}"`, clear: () => setSearch("") }] : []),
      ...(genderFilter ? [{ key: "genero", label: genderFilter === "homem" ? "Homem" : "Mulher", clear: () => setGenderFilter("") }] : []),
      ...(filters.material ? [{ key: "material", label: filters.material, clear: () => setFilters({ ...filters, material: "" }) }] : []),
      ...(filters.color ? [{ key: "color", label: filters.color, clear: () => setFilters({ ...filters, color: "" }) }] : []),
      ...(filters.style ? [{ key: "style", label: filters.style, clear: () => setFilters({ ...filters, style: "" }) }] : []),
      ...(filters.shape ? [{ key: "shape", label: filters.shape, clear: () => setFilters({ ...filters, shape: "" }) }] : []),
    ];

    const FilterPanel = ({ isMobile }) => {
      const pillGroup = (label, field, options) => (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#888" }}>
            {label}
          </p>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
              const active = filters[field] === opt;
              return (
                <button
                  key={opt || "all"}
                  type="button"
                  onClick={() => setFilters({ ...filters, [field]: opt })}
                  className="px-4 py-2 rounded-full text-xs font-semibold border-2 transition-all hover:-translate-y-0.5"
                  style={{
                    borderColor: active ? "var(--forest)" : "var(--mist)",
                    background: active ? "var(--forest)" : "white",
                    color: active ? "white" : "#555",
                  }}
                >
                  {opt || "Todos"}
                </button>
              );
            })}
          </div>
        </div>
      );

      const colorOptions = ["Preto", "Tartaruga", "Azul", "Dourado", "Prateado", "Transparente", "Vermelho"];

      return (
        <div className={isMobile ? "p-6" : ""}>
          <div className="space-y-7">
            {pillGroup("Material", "material", ["", "Acetato", "Metal", "Ultem"])}

            {/* Cor Dominante — swatches com a cor real, em vez de uma lista de texto */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#888" }}>
                Cor Dominante
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, color: "" })}
                  className="px-4 py-2 rounded-full text-xs font-semibold border-2 transition-all hover:-translate-y-0.5"
                  style={{
                    borderColor: filters.color === "" ? "var(--forest)" : "var(--mist)",
                    background: filters.color === "" ? "var(--forest)" : "white",
                    color: filters.color === "" ? "white" : "#555",
                  }}
                >
                  Todas
                </button>
                {colorOptions.map((c) => {
                  const active = filters.color === c;
                  const isLight = ["Transparente", "Prateado"].includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setFilters({ ...filters, color: c })}
                      title={c}
                      aria-label={c}
                      className="relative w-9 h-9 rounded-full transition-transform hover:scale-110 flex-shrink-0"
                      style={{
                        background: COLOR_SWATCHES[c],
                        boxShadow: active
                          ? "0 0 0 2px white, 0 0 0 4px var(--forest)"
                          : "0 0 0 2px white, 0 0 0 1px var(--mist)",
                      }}
                    >
                      {active && (
                        <CheckCircle
                          size={16}
                          className="absolute inset-0 m-auto"
                          style={{ color: isLight ? "var(--forest)" : "white" }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {pillGroup("Estilo", "style", ["", "Clássico", "Moderno", "Intelectual", "Arrojado", "Glamour", "Casual"])}
            {pillGroup("Formato", "shape", ["", "Retangular", "Quadrado", "Redondo", "Cat-Eye", "Aviador", "Geométrico"])}

            {isMobile && (
              <button
                onClick={() => setDrawerOpen(false)}
                className="btn-forest w-full py-3 rounded-xl font-semibold text-sm"
              >
                Aplicar Filtros
              </button>
            )}
          </div>
        </div>
      );
    };

    return (
      <div
        className="pt-28 pb-24 min-h-screen"
        style={{ background: "var(--cream)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--gold)" }}
            >
              {eyebrow || "Coleção"}
            </p>
            <h1
              className="font-display mb-6"
              style={{
                fontSize: "clamp(2.5rem,5vw,4rem)",
                color: "var(--forest)",
              }}
            >
              {title || <>Óculos <em>Premium</em></>}
            </h1>

            {/* Filtro de Género — em destaque, porque muitos modelos servem para ambos */}
            {showGenderFilter && (
              <div className="flex gap-2 mb-5">
                {[["", "Todos"], ["homem", "Homem"], ["mulher", "Mulher"]].map(([value, label]) => {
                  const active = genderFilter === value;
                  return (
                    <button
                      key={value || "todos"}
                      type="button"
                      onClick={() => setGenderFilter(value)}
                      className="px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all hover:-translate-y-0.5"
                      style={{
                        borderColor: active ? "var(--forest)" : "var(--mist)",
                        background: active ? "var(--forest)" : "white",
                        color: active ? "white" : "#555",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Search & Filter Toggle */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  style={{ color: "#888" }}
                />
                <input
                  type="text"
                  placeholder="Pesquisar por marca ou modelo..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors"
                  style={{ borderColor: "var(--mist)" }}
                />
              </div>
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden btn-outline-forest px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 relative"
              >
                <Filter size={16} /> Filtros
                {activeFilterCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: "var(--gold)" }}
                  >
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Filtros ativos */}
            {activeChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {activeChips.map((chip) => (
                  <span
                    key={chip.key}
                    className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: "var(--cream-dark)", border: "1px solid var(--mist)", color: "var(--forest)" }}
                  >
                    {chip.label}
                    <button
                      type="button"
                      onClick={chip.clear}
                      className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
                      aria-label={`Remover filtro ${chip.label}`}
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => { setSearch(""); setFilters({ material: "", color: "", style: "", shape: "" }); setGenderFilter(""); }}
                  className="text-xs font-semibold underline"
                  style={{ color: "#888" }}
                >
                  Limpar tudo
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div
                className="sticky top-28 p-6 rounded-2xl border overflow-y-auto"
                style={{
                  background: "white",
                  borderColor: "var(--mist)",
                  maxHeight: "calc(100vh - 8rem)",
                }}
              >
                <p className="font-display text-xl font-semibold mb-6" style={{ color: "var(--forest)" }}>Filtros</p>
                <FilterPanel isMobile={false} />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <p className="text-sm mb-6" style={{ color: "#666" }}>
                {filtered.length}{" "}
                {filtered.length === 1 ? "produto" : "produtos"}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className="card-hover rounded-2xl overflow-hidden bg-white border cursor-pointer"
                    style={{ borderColor: "var(--mist)" }}
                    onClick={() => setSelectedProduct(p)}
                  >
                    <div className="relative">
                      {p.badge && (
                        <div
                          className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-md"
                          style={{
                            background:
                              p.badge === "Best Seller"
                                ? "#0056b3"
                                : p.badge === "Novo" || p.badge === "Nova Coleção"
                                ? "#7c3aed"
                                : "#16a34a",
                          }}
                        >
                          {p.badge === "Best Seller"
                            ? "⭐ "
                            : p.badge === "Novo" || p.badge === "Nova Coleção"
                            ? "✦ "
                            : "🔥 "}
                          {p.badge}
                        </div>
                      )}
                      {showDiscount && p.originalPrice && p.originalPrice > p.price && (
                        <div
                          className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-md"
                          style={{ background: "#dc2626" }}
                        >
                          -{Math.round(100 - (p.price / p.originalPrice) * 100)}%
                        </div>
                      )}
                      <div
                        className="aspect-square overflow-hidden img-zoom"
                        style={{ background: "#f5f4f0" }}
                      >
                        <Img
                          src={p.image}
                          alt={p.name}
                          className={`w-full h-full object-cover ${showDiscount ? "" : "mix-blend-multiply"}`}
                        />
                      </div>
                    </div>

                    <div className="p-5">
                      <p
                        className="text-xs font-semibold uppercase tracking-wide mb-1 truncate"
                        style={{ color: "var(--gold)" }}
                      >
                        {p.brand}
                      </p>
                      <p className="font-semibold mb-1 truncate">{p.name}</p>
                      <div className="flex items-center gap-2 mb-3">
                        {(() => {
                          // Procura a cor que mais se aproxima no mapa para a bolinha
                          let dotColor = "#ccc";
                          Object.keys(COLOR_SWATCHES).forEach(key => {
                            if (p.color.toLowerCase().includes(key.toLowerCase())) dotColor = COLOR_SWATCHES[key];
                          });

                          return (
                            <>
                              <div
                                className="w-4 h-4 rounded-full border border-gray-200 shadow-sm flex-shrink-0"
                                style={{ background: dotColor }}
                                title={p.color}
                              />
                              <span
                                className="text-[11px] font-medium truncate"
                                style={{ color: "#888" }}
                              >
                                {p.color}
                              </span>
                            </>
                          );
                        })()}
                      </div>
                      <div
                        className="font-display text-2xl font-semibold"
                        style={{ color: "var(--forest)" }}
                      >
                        {showDiscount && p.originalPrice && p.originalPrice > p.price ? (
                          <>
                            <span className="inline-flex items-baseline gap-2">
                              <span>€{p.price}</span>
                              <span className="text-sm font-normal line-through" style={{ color: "#aaa" }}>
                                €{p.originalPrice}
                              </span>
                            </span>
                            <p className="text-xs font-bold mt-0.5" style={{ color: "#16a34a" }}>
                              Poupa €{p.originalPrice - p.price}
                            </p>
                          </>
                        ) : (
                          <>€{p.price}</>
                        )}
                        {p.rating && (
                          <div className="flex items-center gap-1.5 mb-1 mt-1">
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <svg
                                  key={s}
                                  viewBox="0 0 12 12"
                                  className="w-3 h-3"
                                  fill={
                                    s <= Math.round(p.rating)
                                      ? "#c9a84c"
                                      : "#e2e8f0"
                                  }
                                >
                                  <path d="M6 0l1.8 3.6L12 4.2l-3 2.9.7 4.1L6 9.1l-3.7 2.1.7-4.1L0 4.2l4.2-.6z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs" style={{ color: "#888" }}>
                              ({p.reviews})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border" style={{ borderColor: "var(--mist)" }}>
                  <Search size={40} className="mx-auto mb-4 opacity-20" />
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "var(--forest)" }}>Sem resultados</h3>
                  <p className="text-sm" style={{ color: "#888" }}>
                    Nenhum modelo encontrado com essa combinação exata de filtros.
                  </p>
                  <button onClick={() => { setSearch(""); setFilters({ material: "", color: "", style: "", shape: "" }); setGenderFilter(""); }} className="mt-6 btn-outline-forest px-6 py-2 rounded-xl text-sm font-semibold">
                    Limpar Filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {drawerOpen && (
          <>
            <div
              className="modal-backdrop fixed inset-0 z-[80] lg:hidden"
              style={{
                background: "rgba(10,20,15,0.5)",
                backdropFilter: "blur(4px)",
              }}
              onClick={() => setDrawerOpen(false)}
            />
            <div
              className="fixed top-0 left-0 h-full w-80 z-[90] lg:hidden slide-right overflow-y-auto"
              style={{ background: "white" }}
            >
              <div
                className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10"
                style={{ borderColor: "var(--mist)" }}
              >
                <p className="font-display text-xl font-semibold">Filtros</p>
                <button onClick={() => setDrawerOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <X size={16} />
                </button>
              </div>
              <FilterPanel isMobile={true} />
            </div>
          </>
        )}
      </div>
    );
  };
 /* QUIZ REFINADO - PT-PT */
  const QuizPage = ({ onSelectProduct }) => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
      type: "",
      gender: "",
      style: "",      // Novo: Vibe/Estilo
      colors: [],
      materials: [],
      size: "",
      usage: "",      // Novo: Rotina
    });
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [resultEmail, setResultEmail] = useState("");
    const [sendingResults, setSendingResults] = useState(false);
    const [resultsSent, setResultsSent] = useState(false);
    const [resultsSendError, setResultsSendError] = useState(false);

  const normalizeText = (text) => {
    if (!text) return "";
    return String(text).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const answerSingle = (field, value) => {
    const newAnswers = { ...answers, [field]: value };
    setAnswers(newAnswers); 

    setTimeout(() => {
      // A pergunta 7 (rotina diária) só faz sentido para óculos graduados —
      // para óculos de sol salta-se diretamente para os resultados.
      if (step === 7 || (step === 6 && newAnswers.type === "Óculos de sol")) {
        finishQuiz(newAnswers);
      } else {
        setStep(step + 1);
        window.scrollTo(0, 0);
      }
    }, 300);
  };

  const toggleMulti = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

 const finishQuiz = (finalAnswers) => {
    const activeAnswers = finalAnswers || answers;
    
    setStep(9);
    window.scrollTo(0, 0);

    setTimeout(() => {
      try {
        const scoredProducts = QUIZ_PRODUCTS.map(p => {
          let score = 0;
          
          const pName = normalizeText(p.name);
          const pDesc = normalizeText(p.description);
          const pBadge = normalizeText(p.badge);
          const pColor = normalizeText(p.color);

          // 0. TIPO DE ÓCULOS (O MAIS IMPORTANTE DE TODOS)
          const isSunglass = pName.includes("sun") || pName.includes("2-in-1") || pBadge.includes("polarizado") || pBadge.includes("2-em-1") || pDesc.includes("oculos de sol") || pColor.includes("lentes");
          const is2in1 = pName.includes("2-in-1"); // 2 em 1 serve para ambos os casos!

          if (activeAnswers.type === "Óculos de sol") {
              if (isSunglass) score += 50; // Super bónus se for de sol
              else score -= 1000; // Elimina imediatamente armações normais
          } else if (activeAnswers.type === "Óculos graduados") {
              if (!isSunglass || is2in1) score += 50; // Super bónus para graduados normais ou 2-em-1
              else score -= 1000; // Elimina imediatamente óculos de sol puros
          }

          // 1. Estilo (Vibe)
          const pStyle = normalizeText(p.style);
          const aStyle = normalizeText(activeAnswers.style);
          if (aStyle && pStyle.includes(aStyle)) score += 5;
          
          // 2. Cor
          if (activeAnswers.colors && activeAnswers.colors.length > 0 && p.color) {
            if (activeAnswers.colors.some(c => pColor.includes(normalizeText(c)))) score += 4;
          }
          
          // 3. Material
          if (activeAnswers.materials && p.material) {
            const matStr = normalizeText(activeAnswers.materials);
            const pMat = normalizeText(p.material);
            if (pMat.includes(matStr)) score += 3;
          }
          
          // 4. Tamanho
          const pShape = normalizeText(p.shape);
          if (activeAnswers.size === "Largo" && pShape.includes("oversize")) score += 3;
          if (activeAnswers.size === "Estreito" && !pShape.includes("oversize")) score += 1;
          
          // 5. Rotina Diária
          if (activeAnswers.usage === "Trabalho/Escritório" && (pStyle.includes("executivo") || pStyle.includes("intelectual"))) score += 2;
          if (activeAnswers.usage === "Uso diário (todo o dia)" && pDesc.includes("conforto")) score += 2;
          if (activeAnswers.usage === "Condução/Lazer" && (isSunglass || pBadge.includes("polarizado"))) score += 3;

          // 6. Bloqueio de Género
          let isCorrectGender = false;
          if (activeAnswers.gender === "Senhora" && (p.gender === "Feminino" || p.gender === "Unisexo")) isCorrectGender = true;
          if (activeAnswers.gender === "Homem" && (p.gender === "Masculino" || p.gender === "Unisexo")) isCorrectGender = true;
          
          if (!isCorrectGender) score -= 1000; 

          // 7. Fator Sorte (desempate para óculos com a mesma nota)
          score += Math.random() * 0.5;

          return { ...p, score };
        });
        
        // Fica apenas com os que não foram desclassificados
        const topMatches = scoredProducts
          .filter(p => p.score > 0)
          .sort((a, b) => b.score - a.score);
        
        // Fallback super seguro: se algo falhar, dá pelo menos a categoria certa (Sol ou Graduado)
        const fallbackMatches = QUIZ_PRODUCTS.filter(p => {
            const pName = normalizeText(p.name);
            const pDesc = normalizeText(p.description);
            const isSun = pName.includes("sun") || pName.includes("2-in-1") || pDesc.includes("oculos de sol") || normalizeText(p.color).includes("lentes");
            
            const genderMatch = activeAnswers.gender === "Senhora" ? (p.gender === "Feminino" || p.gender === "Unisexo") : (p.gender === "Masculino" || p.gender === "Unisexo");
            const typeMatch = activeAnswers.type === "Óculos de sol" ? isSun : (!isSun || pName.includes("2-in-1"));
            
            return genderMatch && typeMatch;
        }).sort(() => 0.5 - Math.random());

        setResults(topMatches.length >= 3 ? topMatches.slice(0, 3) : fallbackMatches.slice(0, 3));
        setStep(10);
      } catch (error) {
        console.error("Erro no quiz:", error);
        setStep(10);
      }
    }, 800);
  };
  const reset = () => {
    setStep(1);
    setAnswers({ type: "", gender: "", style: "", colors: [], materials: [], size: "", usage: "" });
    setResults([]);
    setResultEmail("");
    setResultsSent(false);
    setResultsSendError(false);
    window.scrollTo(0, 0);
  };

  const handleSendResults = async () => {
    if (!resultEmail) return;
    setSendingResults(true);
    setResultsSendError(false);
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_jd2hmsh',
          template_id: 'template_5wkk8d9',
          user_id: 'r1iXXbQSD6eraiqvx',
          template_params: {
            name: resultEmail,
            email: resultEmail,
            service: `Resultados do Quiz de Estilo: ${results.map(p => `${p.name} (€${p.price})`).join(', ')}`,
          },
        }),
      });
      if (!res.ok) throw new Error(`EmailJS respondeu ${res.status}`);
      setResultsSent(true);
    } catch (err) {
      console.error("Erro ao enviar resultados do quiz:", err);
      setResultsSendError(true);
    } finally {
      setSendingResults(false);
    }
  };

    const totalSteps = answers.type === "Óculos de sol" ? 6 : 7;

    return (
      <div className="pt-28 pb-24 min-h-screen" style={{ background: "#f8f9fa" }}>
        <div className="max-w-4xl mx-auto px-6">
          {step <= totalSteps && (
            <div className="text-center mb-10 fade-up">
              <p className="text-xs font-bold mb-4" style={{ color: "#888" }}>{step} de {totalSteps}</p>

              {step === 1 && <h1 className="font-display text-4xl font-medium" style={{ color: "var(--forest)" }}>Que tipo de óculos procura?</h1>}
              {step === 2 && <h1 className="font-display text-4xl font-medium" style={{ color: "var(--forest)" }}>Para quem são os óculos?</h1>}
              {step === 3 && <h1 className="font-display text-4xl font-medium" style={{ color: "var(--forest)" }}>Que imagem pretende transmitir?</h1>}
              {step === 4 && <h1 className="font-display text-4xl font-medium" style={{ color: "var(--forest)" }}>Quais as cores que mais gosta?</h1>}
              {step === 5 && <h1 className="font-display text-4xl font-medium" style={{ color: "var(--forest)" }}>Qual o material de eleição?</h1>}
              {step === 6 && <h1 className="font-display text-4xl font-medium" style={{ color: "var(--forest)" }}>Qual o tamanho ideal para si?</h1>}
              {step === 7 && <h1 className="font-display text-4xl font-medium" style={{ color: "var(--forest)" }}>Qual a sua rotina diária?</h1>}
            </div>
          )}

          <div className="max-w-2xl mx-auto fade-up-1">
            {step === 1 && (
              <div className="grid gap-4">
                {["Óculos graduados", "Óculos de sol"].map(v => (
                  <button key={v} onClick={() => answerSingle("type", v)} className="bg-white p-6 rounded-2xl border text-left font-semibold hover:border-black transition-all">{v}</button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4">
                {["Senhora", "Homem"].map(v => (
                  <button key={v} onClick={() => answerSingle("gender", v)} className="bg-white p-6 rounded-2xl border text-left font-semibold hover:border-black transition-all">{v}</button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4">
                {["Clássico", "Moderno", "Arrojado", "Minimalista"].map(v => (
                  <button key={v} onClick={() => answerSingle("style", v)} className="bg-white p-6 rounded-2xl border text-left font-semibold hover:border-black transition-all">{v}</button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="grid grid-cols-2 gap-4">
                {["Preto", "Tartaruga", "Azul", "Dourado", "Transparente"].map(v => (
                  <button key={v} onClick={() => toggleMulti("colors", v)} className={`p-6 rounded-2xl border text-center font-semibold transition-all ${answers.colors.includes(v) ? 'bg-black text-white' : 'bg-white'}`}>{v}</button>
                ))}
                <button onClick={nextStep} className="btn-forest col-span-2 mt-4 py-4 rounded-xl font-bold text-base tracking-wide">Continuar</button>
              </div>
            )}

            {step === 5 && (
              <div className="grid gap-4">
                {["Acetato", "Metal", "Ultem"].map(v => (
                  <button key={v} onClick={() => answerSingle("materials", v)} className="bg-white p-6 rounded-2xl border text-left font-semibold hover:border-black transition-all">{v}</button>
                ))}
              </div>
            )}

            {step === 6 && (
              <div className="grid gap-4">
                {["Estreito", "Médio", "Largo"].map(v => (
                  <button key={v} onClick={() => answerSingle("size", v)} className="bg-white p-6 rounded-2xl border text-left font-semibold hover:border-black transition-all">{v}</button>
                ))}
              </div>
            )}

            {step === 7 && (
              <div className="grid gap-4">
                {["Trabalho/Escritório", "Uso diário (todo o dia)", "Condução/Lazer", "Apenas leitura"].map(v => (
                  <button key={v} onClick={() => answerSingle("usage", v)} className="bg-white p-6 rounded-2xl border text-left font-semibold hover:border-black transition-all">{v}</button>
                ))}
              </div>
            )}

            {step === 9 && <div className="text-center py-20 font-display text-2xl">A analisar o seu perfil...</div>}

      {step === 10 && (
  <div className="fade-up text-center p-6">
    <h2 className="text-3xl font-bold mb-8">As nossas sugestões para si:</h2>
    
    <div className="grid md:grid-cols-3 gap-6 mb-10">
      {results.map(p => (
        <div 
          key={p.id} 
          className="bg-white p-4 rounded-xl border cursor-pointer hover:border-black transition-all" 
          onClick={() => onSelectProduct(p)}
        >
          <div className="relative">
            <Img src={p.image} className="w-full h-40 object-cover mb-4 rounded-lg" />
            {p.originalPrice > p.price && (
              <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">Outlet</span>
            )}
          </div>
          <p className="font-bold">{p.name}</p>
          {p.originalPrice > p.price ? (
            <p className="text-sm font-semibold">
              <span className="line-through text-gray-400 mr-2">{p.originalPrice}€</span>
              <span style={{ color: "#c0392b" }}>{p.price}€</span>
            </p>
          ) : (
            <p className="text-sm font-semibold">{p.price}€</p>
          )}
        </div>
      ))}
    </div>

    {/* E-mail opcional - Removido o "required" */}
    <div className="bg-gray-50 p-6 rounded-2xl border max-w-sm mx-auto">
      <p className="font-semibold mb-3 text-sm">Guardar estes resultados por e-mail (opcional):</p>
      {resultsSent ? (
        <p className="text-sm font-semibold" style={{ color: "var(--forest)" }}>Resultados enviados! Verifique o seu e-mail.</p>
      ) : (
        <>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="O seu e-mail"
              value={resultEmail}
              onChange={(e) => setResultEmail(e.target.value)}
              className="p-3 border rounded-xl flex-1 outline-none"
            />
            <button
              onClick={handleSendResults}
              disabled={sendingResults || !resultEmail}
              className="bg-black text-white px-4 py-3 rounded-xl font-bold text-sm disabled:opacity-50"
            >
              {sendingResults ? "..." : "Enviar"}
            </button>
          </div>
          {resultsSendError && (
            <p className="text-xs mt-2" style={{ color: "#c0392b" }}>
              Não foi possível enviar agora. Tente novamente.
            </p>
          )}
        </>
      )}
    </div>
    
    <button onClick={reset} className="mt-8 underline text-sm text-gray-500">Refazer Quiz</button>
  </div>
)}
          </div>
        </div>
      </div>
    );
  };
   /* VANTAGENS PAGE */
  const VantagensPage = () => {
    const [showSeguros, setShowSeguros] = useState(false);

    return (
      <div
        className="pt-28 pb-24 min-h-screen"
        style={{ background: "var(--cream)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 fade-up">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--gold)" }}
            >
              Benefícios Exclusivos
            </p>
            <h1
              className="font-display mb-6"
              style={{
                fontSize: "clamp(2.5rem,5vw,4rem)",
                color: "var(--forest)",
                lineHeight: 1.1,
              }}
            >
              Oferecemos-lhe <em>Mais!</em>
            </h1>
            <p
              className="text-lg mx-auto"
              style={{ color: "#666", maxWidth: 600 }}
            >
              Na Óptica 13, a sua satisfação vai além da visão perfeita.
              Descubra todas as comodidades e facilidades financeiras que
              criámos a pensar em si.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 fade-up-1">
            {[
              {
                icon: Shield,
                title: "IO Segurança",
                desc: "Os seus óculos protegidos contra acidentes, quebras, furtos e roubos. Cobertura válida em Portugal e no estrangeiro.",
                highlight: "Desde 19,99€/ano (Até 2000€)",
                img: "https://i.postimg.cc/QdKSbpw9/Post-240x300.jpg",
              },
              {
                icon: Calendar,
                title: "Cofidis Pay",
                desc: "Uma solução de pagamentos 100% digital e segura. Controle as suas despesas com total flexibilidade e sem burocracias.",
                highlight: "Até 12x Sem Juros",
                img: "https://i.postimg.cc/nrLGQ7q0/Cofidis-Pay-600x341.png",
              },
              {
                icon: MapPin,
                title: "Óptica ao Domicílio",
                desc: "Deslocamo-nos para consertos de óculos, aquisição de lentes e aros ou entregas, num raio de 20km da nossa loja.",
                highlight: "Deslocação Gratuita",
                img: "https://i.postimg.cc/ZYPGPhpn/Otica-ao-domicilio-300x300.png",
              },
              {
                icon: Award,
                title: "Acordos e Protocolos",
                desc: "Trabalhamos em parceria com as principais seguradoras. Comparticipação direta na loja ou condições exclusivas de desconto.",
                highlight: "Mais de 15 Entidades Parceiras",
                img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
                isAction: true, // Identifica que este cartão tem um botão especial
              },
              {
                icon: Sparkles,
                title: "Open Day Mensal",
                desc: "No primeiro sábado de cada mês, oferecemos descontos imperdíveis e consultoria de imagem (método de 3 passos).",
                highlight: "Até 40% Sol | 30% Armações",
                img: "https://i.postimg.cc/HnKXcNYC/6-600x338.png",
              },
              {
                icon: Phone,
                title: "App Óptica 13",
                desc: "A nossa aplicação tem tudo: Loja online, marcação de consultas, cartão de fidelização e sistema de Cashback.",
                isApp: true,
                playStore: "https://play.google.com/store/apps/details?id=com.optica13.opticae&pli=1",
                appStore: "https://apps.apple.com/sa/app/%C3%B3ptica-13/id1580926491",
                img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&h=400&fit=crop",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="rounded-2xl flex flex-col card-hover overflow-hidden relative"
                style={{ background: "white", border: "1px solid var(--mist)" }}
              >
                <div
                  className="h-48 relative img-zoom overflow-hidden"
                  style={{ background: "var(--mist)" }}
                >
                  <Img
                    src={v.img}
                    alt={v.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg">
                    <v.icon size={20} style={{ color: "var(--gold)" }} />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3
                    className="font-display text-2xl font-semibold mb-2"
                    style={{ color: "var(--forest)" }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-6 flex-1"
                    style={{ color: "#666" }}
                  >
                    {v.desc}
                  </p>

                {v.isAction ? (
                    <button
                      onClick={() => setShowSeguros(true)}
                      className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider mt-auto transition-all shadow-md flex items-center justify-center gap-2"
                      style={{ background: "var(--gold)", color: "white" }}
                    >
                      Ver Seguros e Acordos <ChevronRight size={14} />
                    </button>
                  ) : v.isApp ? (
                    <div className="flex gap-2 mt-auto">
                      <a
                        href={v.playStore}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-3 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-transform shadow-lg flex items-center justify-center hover:-translate-y-1"
                        style={{ background: "black", color: "white" }}
                      >
                        Play Store
                      </a>
                      <a
                        href={v.appStore}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-3 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-transform shadow-lg flex items-center justify-center hover:-translate-y-1"
                        style={{ background: "black", color: "white" }}
                      >
                        App Store
                      </a>
                    </div>
                  ) : (
                    <div
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold w-fit mt-auto"
                      style={{ background: "#e8f5ee", color: "var(--forest)" }}
                    >
                      <CheckCircle size={14} style={{ color: "var(--gold)" }} />
                      {v.highlight}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Estacionamento Banner */}
          <div
            className="mt-16 rounded-3xl overflow-hidden relative fade-up-2 shadow-2xl"
            style={{ background: "var(--forest)" }}
          >
            <div
              className="absolute inset-0 opacity-25"
              style={{
                background:
                  "radial-gradient(circle at right, var(--gold), transparent 70%)",
              }}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-0">
              <div className="p-10 md:p-16 flex-1 text-white text-center md:text-left">
                <h2 className="font-display text-4xl md:text-5xl font-semibold mb-5 leading-tight">
                  Estacionamento
                  <br />
                  <em style={{ color: "var(--gold)" }}>Gratuito</em>
                </h2>
                <p className="opacity-90 leading-relaxed text-base mb-8 max-w-xl">
                  O seu conforto é a nossa prioridade. Oferecemos estacionamento
                  gratuito na <strong>Garagem Plátano</strong>, a apenas 200
                  metros da nossa ótica. Venha visitar-nos sem preocupações!
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=R.+Cap.+Leitão+344,+2775-275+Parede"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex px-8 py-4 rounded-xl font-semibold text-sm items-center gap-2 shadow-lg transition-transform hover:scale-105"
                >
                  <MapPin size={16} /> Abrir no Google Maps
                </a>
              </div>
              <div className="w-full md:w-2/5 h-64 md:h-[420px] relative overflow-hidden flex-shrink-0">
                <Img
                  src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&h=800&fit=crop"
                  alt="Estacionamento Garagem Plátano"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* MODAL DE SEGUROS E PROTOCOLOS */}
        {showSeguros && (
          <div
            className="modal-backdrop fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{
              background: "rgba(10,20,15,0.85)",
              backdropFilter: "blur(8px)",
            }}
            onClick={() => setShowSeguros(false)}
          >
            <div
              className="relative rounded-2xl overflow-hidden max-w-2xl w-full fade-up flex flex-col"
              style={{ background: "var(--cream)", maxHeight: "90vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10"
                style={{ borderColor: "var(--mist)" }}
              >
                <h2
                  className="font-display text-2xl font-semibold"
                  style={{ color: "var(--forest)" }}
                >
                  Seguros e Protocolos
                </h2>
                <button
                  onClick={() => setShowSeguros(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-gray-100"
                  style={{ background: "var(--mist)" }}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 md:p-10 overflow-y-auto scrollbar-hide">
                {/* Acordos Diretos */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield size={24} style={{ color: "var(--gold)" }} />
                    <h3
                      className="font-display text-2xl font-semibold"
                      style={{ color: "var(--forest)" }}
                    >
                      Acordos Diretos
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "#555" }}
                  >
                    A Óptica 13 dispõe de acordos diretos(*) com as seguintes
                    entidades.{" "}
                    <strong>A comparticipação é direta na loja</strong>, ou
                    seja, o benefício do seguro é imediatamente retirado no ato
                    da compra.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      "Advancecare",
                      "Victória",
                      "Future Health Care",
                      "Tranquilidade",
                      "Allianz",
                      "BES Seguros",
                      "Ageas",
                      "Lusitânia Seguros",
                      "Açoreana Seguros",
                      "Médis",
                      "CGD",
                    ].map((seg) => (
                      <span
                        key={seg}
                        className="px-4 py-2 rounded-lg text-xs font-bold border shadow-sm"
                        style={{
                          borderColor: "var(--mist)",
                          color: "var(--forest)",
                          background: "white",
                        }}
                      >
                        {seg}
                      </span>
                    ))}
                  </div>
                  <p
                    className="text-[11px] leading-tight"
                    style={{ color: "#999" }}
                  >
                    (*) O desconto direto do benefício depende das condições da
                    apólice contratada com a sua entidade seguradora. Informe-se
                    sobre as condições da mesma.
                  </p>
                </div>

                <div
                  className="w-full h-px mb-10"
                  style={{ background: "var(--mist)" }}
                ></div>

                {/* Protocolos de Desconto */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Award size={24} style={{ color: "var(--gold)" }} />
                    <h3
                      className="font-display text-2xl font-semibold"
                      style={{ color: "var(--forest)" }}
                    >
                      Protocolos de Desconto
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "#555" }}
                  >
                    A Óptica 13 tem também protocolos de desconto com várias
                    entidades associadas, garantindo-lhe:
                  </p>
                  <ul
                    className="space-y-3 mb-6 p-5 rounded-xl border"
                    style={{
                      background: "#f8f9fa",
                      borderColor: "var(--mist)",
                    }}
                  >
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: "var(--gold)" }}
                      />
                      <span>
                        <strong>10% de desconto</strong> em lentes de contacto e
                        produtos de contactologia.
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: "var(--gold)" }}
                      />
                      <span>
                        <strong>15% de desconto</strong> em óculos de sol.
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: "var(--gold)" }}
                      />
                      <span>
                        <strong>20% de desconto</strong> em óculos graduados.
                      </span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      "Medicare",
                      "Multicare",
                      "ADM",
                      "SAMS",
                      "ACP",
                      "SAD GNR",
                      "ADSE",
                    ].map((seg) => (
                      <span
                        key={seg}
                        className="px-4 py-2 rounded-lg text-xs font-bold border shadow-sm"
                        style={{
                          borderColor: "var(--mist)",
                          color: "var(--forest)",
                          background: "white",
                        }}
                      >
                        {seg}
                      </span>
                    ))}
                  </div>
                  <p
                    className="text-[11px] leading-tight"
                    style={{ color: "#999" }}
                  >
                    (Descontos não acumuláveis com outras promoções, campanhas
                    ou descontos em vigor).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  /* ABOUT PAGE */
  const AboutPage = ({ setPage }) => (
    <div
      className="pt-28 pb-24 min-h-screen"
      style={{ background: "var(--cream)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabeçalho */}
        <div className="text-center mb-20 fade-up">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--gold)" }}
          >
            Quem Somos
          </p>
          <h1
            className="font-display mb-6"
            style={{
              fontSize: "clamp(2.5rem,5vw,4rem)",
              color: "var(--forest)",
              lineHeight: 1.1,
            }}
          >
            A Óptica 13
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#666" }}
          >
            A Óptica 13 reúne um espaço dedicado aos serviços óticos e de imagem
            desde 1986, na típica vila da Parede.
          </p>
        </div>

        {/* História e Valores */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 fade-up-1">
          {/* Lado da Imagem com Selo */}
          <div className="relative">
            <div
              className="rounded-3xl overflow-hidden shadow-2xl img-zoom"
              style={{ height: "550px" }}
            >
              <Img
                src="https://i.postimg.cc/9QfMy0qS/DSC2432-scaled.jpg"
                alt="Interior da Óptica 13"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Selo Desde 1986 */}
            <div
              className="absolute -bottom-8 -right-4 md:-right-8 w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white"
              style={{ background: "var(--gold)", color: "white" }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest opacity-90 mb-1">
                Desde
              </span>
              <CountUp end={1986} className="font-display text-4xl font-bold" />
            </div>
          </div>

          {/* Lado do Texto */}
          <div>
            <h2
              className="font-display text-3xl font-semibold mb-6"
              style={{ color: "var(--forest)", lineHeight: 1.2 }}
            >
              A sua satisfação é a nossa prioridade.
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "#555" }}
            >
              Para os que trabalham neste projeto, o importante é que os
              clientes se sintam bem no espaço e recebam o carinho e a boa
              disposição desta equipa empenhada na satisfação das suas
              expectativas.
            </p>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "#555" }}
            >
              E, para tornar a sua visita mais agradável, oferecemos-lhe algumas
              comodidades como estacionamento gratuito e um pequeno espaço
              infantil. Conheça o nosso espaço e a nossa simpática equipa.
              Esperamos por si!
            </p>

            {/* Missão e Visão em Colunas */}
            <div
              className="grid sm:grid-cols-2 gap-8 pt-8 border-t"
              style={{ borderColor: "var(--mist)" }}
            >
              <div>
                <h3
                  className="font-bold text-base mb-4 flex items-center gap-2"
                  style={{ color: "var(--forest)" }}
                >
                  <Star size={16} style={{ color: "var(--gold)" }} /> A nossa
                  Missão
                </h3>
                <ul className="space-y-3 text-sm" style={{ color: "#666" }}>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="flex-shrink-0"
                      style={{ color: "var(--gold)" }}
                    />{" "}
                    Comodidade ao cliente
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="flex-shrink-0"
                      style={{ color: "var(--gold)" }}
                    />{" "}
                    Visão e conforto
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="flex-shrink-0"
                      style={{ color: "var(--gold)" }}
                    />{" "}
                    Cuidado personalizado
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="flex-shrink-0"
                      style={{ color: "var(--gold)" }}
                    />{" "}
                    Inovar e satisfazer
                  </li>
                </ul>
              </div>
              <div>
                <h3
                  className="font-bold text-base mb-4 flex items-center gap-2"
                  style={{ color: "var(--forest)" }}
                >
                  <Eye size={16} style={{ color: "var(--gold)" }} /> A nossa
                  Visão
                </h3>
                <ul className="space-y-3 text-sm" style={{ color: "#666" }}>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="flex-shrink-0"
                      style={{ color: "var(--gold)" }}
                    />{" "}
                    Excelência em saúde ocular
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="flex-shrink-0"
                      style={{ color: "var(--gold)" }}
                    />{" "}
                    Cliente como prioridade
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="flex-shrink-0"
                      style={{ color: "var(--gold)" }}
                    />{" "}
                    Acessibilidade para todos
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="flex-shrink-0"
                      style={{ color: "var(--gold)" }}
                    />{" "}
                    Tecnologia de ponta
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Secção da Equipa */}
        <div
          className="bg-white rounded-3xl p-8 md:p-16 border shadow-sm fade-up-2 text-center relative overflow-hidden"
          style={{ borderColor: "var(--mist)" }}
        >
          {/* Decoração de fundo */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 pointer-events-none"
            style={{
              background: "var(--gold)",
              transform: "translate(30%, -30%)",
            }}
          ></div>

          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4 relative z-10"
            style={{ color: "var(--gold)" }}
          >
            A Nossa Equipa
          </p>
          <h2
            className="font-display text-3xl md:text-4xl font-semibold mb-10 max-w-3xl mx-auto relative z-10"
            style={{ color: "var(--forest)", lineHeight: 1.3 }}
          >
            Temos <CountUp end={38} /> anos de especialização na ótica, totalmente focados em
            satisfazer as suas necessidades.
          </h2>

          <div
            className="mt-8 rounded-2xl overflow-hidden mx-auto shadow-lg border relative z-10"
            style={{ maxWidth: "800px", borderColor: "var(--mist)" }}
          >
            {/* NOTA: Substituir o SRC desta imagem pelo URL da fotografia real da vossa equipa */}
            <Img
              src="https://i.postimg.cc/vmz3kPmW/Equipa-Optica13-r2p8lpvixuoy0zmplkvnvhdg2jia66ckxheqrzn9tc.jpg"
              alt="Equipa Óptica 13"
              className="w-full h-auto object-cover"
              style={{ maxHeight: "500px" }}
            />
          </div>

          <div className="mt-12 relative z-10">
            <button
              onClick={() => setPage("contact")}
              className="btn-forest px-10 py-4 rounded-xl font-semibold text-sm tracking-wide inline-flex items-center gap-2 shadow-xl hover:-translate-y-1 transition-transform"
            >
              Entre Em Contacto
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* CONTACT */
  const ContactPage = ({ openBook }) => {
    const [form, setForm] = useState({
      name: "",
      email: "",
      phone: "",
      msg: "",
    });
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState(false);

    const handleSend = async () => {
      if (!form.name || !form.email || !form.msg) return;
      setSending(true);
      setSendError(false);
      try {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: 'service_jd2hmsh',
            template_id: 'template_5wkk8d9',
            user_id: 'r1iXXbQSD6eraiqvx',
            template_params: {
              name: form.name,
              email: form.email,
              phone: form.phone,
              service: `Mensagem de contacto do site: ${form.msg}`,
            },
          }),
        });
        if (!res.ok) throw new Error(`EmailJS respondeu ${res.status}`);
        setSent(true);
      } catch (err) {
        console.error("Erro ao enviar mensagem de contacto:", err);
        setSendError(true);
      } finally {
        setSending(false);
      }
    };

    return (
      <div
        className="pt-28 pb-24 min-h-screen"
        style={{ background: "var(--cream)" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--gold)" }}
          >
            Contactos
          </p>
          <h1
            className="font-display mb-12"
            style={{
              fontSize: "clamp(2.5rem,5vw,4rem)",
              color: "var(--forest)",
            }}
          >
            Fale <em>Connosco</em>
          </h1>
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <div className="space-y-5 mb-10">
                {[
                  [
                    Phone,
                    "Contactos Telefónicos",
                    "Fixo: 214 578 119\nMóvel: 934 421 310",
                  ],
                  [Mail, "Email", "info@optica13.com"],
                  [
                    MapPin,
                    "As nossas lojas",
                    "Sede: Rua 31 de Janeiro 8-B, 2775-295 Parede\n\nLoja 2: Rua José Relvas 105-B, 2775-222 Parede",
                  ],
                  [
                    Clock,
                    "Horário",
                    "Dias Úteis: 9:30 – 19:30\nSábados: 9h30–13h30 / 15h00–18h00",
                  ],
                ].map(([Icon, l, v]) => (
                  <div
                    key={l}
                    className="flex items-start gap-4 p-5 rounded-xl"
                    style={{
                      background: "white",
                      border: "1px solid var(--mist)",
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "#e8f5ee" }}
                    >
                      <Icon size={18} style={{ color: "var(--forest)" }} />
                    </div>
                    <div>
                      <p
                        className="text-xs uppercase tracking-wide mb-0.5"
                        style={{ color: "#aaa" }}
                      >
                        {l}
                      </p>
                      <p className="text-sm font-semibold whitespace-pre-line">
                        {v}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => openBook("Consulta de Optometria")}
                className="btn-forest w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Calendar size={15} /> Agendar Consulta Gratuita
              </button>
            </div>
            <div
              className="rounded-2xl p-8"
              style={{ background: "white", border: "1px solid var(--mist)" }}
            >
              {sent ? (
                <div className="text-center py-10">
                  <CheckCircle
                    size={40}
                    className="mx-auto mb-4"
                    style={{ color: "var(--forest)" }}
                  />
                  <p
                    className="font-display text-2xl font-semibold mb-2"
                    style={{ color: "var(--forest)" }}
                  >
                    Mensagem enviada!
                  </p>
                  <p className="text-sm" style={{ color: "#666" }}>
                    Responderemos em menos de 24 horas.
                  </p>
                </div>
              ) : (
                <>
                  <p
                    className="font-display text-2xl font-semibold mb-6"
                    style={{ color: "var(--forest)" }}
                  >
                    Enviar mensagem
                  </p>
                  <div className="space-y-4">
                    {[
                      ["text", "Nome", "name"],
                      ["email", "Email", "email"],
                      ["tel", "Telefone", "phone"],
                    ].map(([t, p, k]) => (
                      <input
                        key={k}
                        type={t}
                        placeholder={p}
                        value={form[k]}
                        onChange={(e) =>
                          setForm({ ...form, [k]: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl text-sm border-2 transition-all"
                        style={{
                          borderColor: "var(--mist)",
                          fontFamily: "Jost,sans-serif",
                        }}
                      />
                    ))}
                    <textarea
                      placeholder="Mensagem"
                      rows={4}
                      value={form.msg}
                      onChange={(e) =>
                        setForm({ ...form, msg: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-xl text-sm border-2 transition-all resize-none"
                      style={{
                        borderColor: "var(--mist)",
                        fontFamily: "Jost,sans-serif",
                      }}
                    />
                    <button
                      onClick={handleSend}
                      disabled={sending || !form.name || !form.email || !form.msg}
                      className="btn-forest w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send size={15} /> {sending ? "A enviar..." : "Enviar Mensagem"}
                    </button>
                    {sendError && (
                      <p className="text-xs mt-3 text-center" style={{ color: "#c0392b" }}>
                        Não foi possível enviar agora. Ligue-nos para 934 421 310 ou tente novamente.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* MAPA INTERATIVO */}
          <div className="mt-16">
            <h2
              className="font-display text-3xl font-semibold mb-6"
              style={{ color: "var(--forest)" }}
            >
              Visite-nos
            </h2>
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ height: "400px", background: "var(--forest)" }}
            >
              <iframe
                title="Mapa Optica 13 Parede"
                src="https://maps.google.com/maps?q=R.%2031%20de%20Janeiro%208%20B%202775-295%20Parede&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter:
                    "grayscale(1) invert(0.9) contrast(1.2) brightness(0.95)",
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=R.+31+de+Janeiro+8+B,+2775-295+Parede"
                target="_blank"
                rel="noreferrer"
                className="btn-forest px-6 py-4 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg"
              >
                <MapPin size={16} /> Abrir no Google Maps
              </a>
              <a
                href="https://waze.com/ul?q=Rua+31+de+Janeiro+8+B+Parede"
                target="_blank"
                rel="noreferrer"
                className="btn-gold px-6 py-4 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg"
              >
                <MapPin size={16} /> Abrir no Waze
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
 /* TERMS & PRIVACY PAGE */
  const TermsPage = () => (
    <div className="pt-28 pb-24 min-h-screen" style={{ background: "var(--cream)" }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 fade-up">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
            Informação Legal
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6" style={{ color: "var(--forest)" }}>
            Termos e Políticas
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border shadow-sm fade-up-1" style={{ borderColor: "var(--mist)" }}>
          <div className="prose prose-sm md:prose-base max-w-none text-gray-600">
            
            {/* 1. TERMOS E CONDIÇÕES */}
            <h3 className="text-black font-bold mb-4 text-xl">1. Termos e Condições Gerais</h3>
            <p className="mb-4 text-sm">
              Bem-vindo à loja online da Óptica 13. Ao aceder e utilizar este site, o utilizador concorda em vincular-se aos presentes Termos e Condições.
            </p>
            <p className="mb-8 text-sm">
              Todos os preços indicados incluem IVA à taxa legal em vigor em Portugal. A Óptica 13 reserva-se o direito de alterar os preços a qualquer momento. Comercializamos exclusivamente óculos de sol e armações não graduadas através do nosso portal online. Para serviços de optometria e aquisição de lentes graduadas, o cliente deverá agendar uma visita às nossas lojas físicas.
            </p>

            {/* 2. POLÍTICA DE PRIVACIDADE (RGPD) */}
            <h3 className="text-black font-bold mb-4 text-xl">2. Política de Privacidade (RGPD)</h3>
            <p className="mb-4 text-sm">
              A sua privacidade é fundamental para a Óptica 13. Comprometemo-nos a proteger os seus dados pessoais de acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD).
            </p>
            <ul className="list-disc pl-5 mb-8 text-sm space-y-2">
              <li><strong>Recolha e Uso:</strong> Recolhemos apenas os dados estritamente necessários para o envio da sua encomenda (nome, morada, telefone). Os seus dados não serão vendidos ou cedidos a terceiros, exceto à transportadora responsável pela entrega.</li>
              <li><strong>Os Seus Direitos:</strong> Tem o direito de solicitar o acesso, retificação ou apagamento dos seus dados pessoais a qualquer momento, através do e-mail info@optica13.com.</li>
            </ul>

            {/* 3. POLÍTICA DE ENVIOS */}
            <h3 className="text-black font-bold mb-4 text-xl">3. Política de Envios e Entregas</h3>
            <p className="mb-4 text-sm">
              As encomendas são processadas e expedidas no prazo de 3 a 5 dias úteis após a confirmação do pagamento.
            </p>
            <ul className="list-disc pl-5 mb-8 text-sm space-y-2">
              <li><strong>Portugal Continental:</strong> Entregas via transportadora expresso, com prazo estimado de 3 a 5 dias úteis após expedição.</li>
              <li><strong>Ilhas (Açores e Madeira):</strong> Entregas via CTT Expresso, com prazo estimado de 3 a 5 dias úteis.</li>
              <li>Em caso de rutura de stock que atrase o envio, o cliente será imediatamente contactado para escolher entre aguardar a reposição ou o reembolso integral.</li>
            </ul>

            {/* 4. POLÍTICA DE DEVOLUÇÕES */}
            <h3 className="text-black font-bold mb-4 text-xl">4. Política de Devoluções</h3>
            <p className="mb-4 text-sm">
              De acordo com o Direito de Livre Resolução (Decreto-Lei n.º 24/2014), o consumidor dispõe de um prazo de <strong>14 dias seguidos</strong>, a contar da data de receção do produto, para efetuar a devolução da sua encomenda online, sem necessidade de indicar o motivo.
            </p>
            <ul className="list-disc pl-5 mb-4 text-sm space-y-2">
              <li>O artigo deve ser devolvido na sua embalagem original, sem sinais de uso, acompanhado de todos os acessórios originais (estojos, panos) e fatura.</li>
              <li>Os custos de envio da devolução ficam a cargo do cliente, salvo em caso de defeito de fabrico ou erro no envio por parte da Óptica 13.</li>
            </ul>
            <p className="text-sm">
              Para iniciar uma devolução, contacte a nossa equipa através do e-mail info@optica13.com. O reembolso será processado no prazo máximo de 14 dias após a verificação dos artigos devolvidos, utilizando o mesmo método de pagamento da compra original.
            </p>

          </div>
        </div>
      </div>
    </div>
  );

/* ── SEO: título e meta description por página ─────────────── */
const PAGE_META = {
  home: {
    title: "Óptica 13 | Especialistas na sua Visão",
    description: "Na Óptica 13 na Parede cuidamos da sua visão. Marque a sua consulta gratuita, descubra a nossa coleção premium e aproveite os nossos descontos exclusivos.",
  },
  services: {
    title: "Serviços | Óptica 13",
    description: "Optometria, contactologia, certificados de condução e mais. Conheça os serviços especializados da Óptica 13 na Parede.",
  },
  vantagens: {
    title: "Vantagens e Benefícios | Óptica 13",
    description: "Seguros, pagamentos facilitados, ótica ao domicílio e outras vantagens exclusivas para os clientes da Óptica 13.",
  },
  mindthelook: {
    title: "Coleção MindTheLook | Óptica 13",
    description: "Descubra a coleção MindTheLook na Óptica 13. Armações e óculos de sol premium para homem e mulher, das melhores marcas.",
  },
  outlet: {
    title: "Outlet | Óptica 13",
    description: "Óculos premium com desconto na Óptica 13. Modelos de coleções anteriores com preços de saldo, por tempo limitado.",
  },
  quiz: {
    title: "Quiz de Estilo | Óptica 13",
    description: "Não sabe quais os óculos que lhe ficam melhor? Faça o nosso quiz interativo e descubra o seu par perfeito em minutos.",
  },
  about: {
    title: "Sobre Nós | Óptica 13",
    description: "Conheça a Óptica 13, na vila da Parede desde 1986. A nossa história, missão e equipa dedicada à sua visão.",
  },
  contact: {
    title: "Contactos | Óptica 13",
    description: "Contacte a Óptica 13 na Parede. Telefone, morada, horário e formulário de contacto.",
  },
  terms: {
    title: "Termos e Privacidade | Óptica 13",
    description: "Termos e condições, política de privacidade, envios e devoluções da Óptica 13.",
  },
};

/* ══════════════════════════════════════════════════════════════
   MAIN APP COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname.replace("/", "") || "home";
  const setPage = (newPage) => {
    navigate(newPage === "home" ? "/" : "/" + newPage);
  };

  const [booking, setBooking] = useState(false);
  const [bookingService, setBookingService] = useState("Consulta Geral");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [exitIntent, setExitIntent] = useState(false);
  const exitShown = useRef(false);

  // NOVO CÓDIGO AQUI: Faz o scroll para o topo quando a página muda (Atualizado para o Router)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Atualiza o <title> e a meta description por página, para SEO e partilhas
  useEffect(() => {
    const meta = PAGE_META[page] || PAGE_META.home;
    document.title = meta.title;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", meta.description);
  }, [page]);

  // Scroll-reveal: anima .fade-up/.fade-up-1..4 só quando entram no viewport,
  // em vez de na montagem (o que os fazia "gastar-se" fora de vista).
  // Um MutationObserver apanha elementos que aparecem depois (troca de página, modais).
  useEffect(() => {
    const REVEAL_SELECTOR = ".fade-up, .fade-up-1, .fade-up-2, .fade-up-3, .fade-up-4";
    const observed = new WeakSet();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    const observeWithin = (root) => {
      root.querySelectorAll?.(REVEAL_SELECTOR).forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          io.observe(el);
        }
      });
    };

    observeWithin(document);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches?.(REVEAL_SELECTOR) && !observed.has(node)) {
            observed.add(node);
            io.observe(node);
          }
          observeWithin(node);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

 useEffect(() => {
    // 1. Gatilho de Saída (Para Computador)
    const h = (e) => {
      if (e.clientY <= 10 && !exitShown.current) {
        exitShown.current = true;
        setExitIntent(true);
      }
    };
    document.addEventListener("mouseout", h);

    // 2. Gatilho de Tempo - 12 Segundos (Para Telemóvel e Computador)
    const timer = setTimeout(() => {
      if (!exitShown.current) {
        exitShown.current = true;
        setExitIntent(true);
      }
    }, 12000);

    // 3. Limpeza de memória do React
    return () => {
      document.removeEventListener("mouseout", h);
      clearTimeout(timer);
    };
  }, []);

const openBook = (service = "Consulta Geral") => {
    setBookingService(service); // O site guarda o nome do serviço
    setBooking(true);
    setExitIntent(false);
  };
  const addToCart = (p) => {
    const ex = cart.find((x) => x.id === p.id);
    if (ex)
      setCart(cart.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x)));
    else setCart([...cart, { ...p, qty: 1 }]);
  };
  const removeFromCart = (id) => setCart(cart.filter((x) => x.id !== id));
  const updateQty = (id, q) => {
    if (q < 1) removeFromCart(id);
    else setCart(cart.map((x) => (x.id === id ? { ...x, qty: q } : x)));
  };

  return (
    <>
      <div
        className="min-h-screen"
        style={{ background: "var(--cream)", fontFamily: "Jost, sans-serif" }}
      >
       
        <Header page={page} setPage={setPage} openBook={openBook} />
        <div key={location.pathname} className="page-transition">
          <Routes>
            <Route path="/" element={<HomePage setPage={setPage} openBook={openBook} setSelectedProduct={setSelectedProduct} />} />
            <Route path="/services" element={<ServicesPage openBook={openBook} setPage={setPage} />} />
            <Route path="/vantagens" element={<VantagensPage />} />
            <Route
              path="/mindthelook"
              element={
                <CollectionPage
                  products={ALL_PRODUCTS}
                  title={<>Coleção <em>MindTheLook</em></>}
                  eyebrow="Coleção Assinatura"
                  showGenderFilter={true}
                  setSelectedProduct={setSelectedProduct}
                />
              }
            />
            <Route
              path="/outlet"
              element={
                <CollectionPage
                  products={PRODUCTS.outlet}
                  title="Outlet"
                  eyebrow="Saldos"
                  showDiscount={true}
                  showGenderFilter={true}
                  setSelectedProduct={setSelectedProduct}
                />
              }
            />
            <Route path="/men" element={<Navigate to="/mindthelook?genero=homem" replace />} />
            <Route path="/women" element={<Navigate to="/mindthelook?genero=mulher" replace />} />
            <Route path="/quiz" element={<QuizPage onSelectProduct={setSelectedProduct} />} />
            <Route path="/about" element={<AboutPage setPage={setPage} />} />
            <Route path="/contact" element={<ContactPage openBook={openBook} />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </div>
        <BookingModal 
          isOpen={booking} 
          onClose={() => setBooking(false)} 
          service={bookingService}
          />
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAdd={addToCart}
            onBook={() => {
              const productName = selectedProduct.name;
              setSelectedProduct(null);
              openBook(`Reserva de "${productName}" na Loja`);
            }}
          />
        )}
        {exitIntent && (
          <ExitPopup
            onBook={() => {
              setExitIntent(false);
              openBook();
            }}
            onClose={() => setExitIntent(false)}
          />
        )}

        <Footer setPage={setPage} />
        <WhatsAppBtn />
        <CookieBanner />
        <Analytics />
      </div>
    </>
  );
}
