// @ts-nocheck
import { useState, useEffect, useRef } from "react";
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

/* ── FONT INJECTION ─────────────────────────────────────────── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600;700&display=swap');
    :root {
      --cream: #ffffff;      /* Fundo Principal: Branco Puro */
      --cream-dark: #f8f9fa; /* Fundo Secundário: Cinza super claro */
      --forest: #000000;     /* Elementos Principais: Preto */
      --forest-light: #333333;/* Cinza Escuro */
      --gold: #0056b3;       /* Destaque: Azul Premium / Azul Óptica */
      --gold-light: #3385ff; /* Azul mais vibrante para hovers */
      --slate: #0f172a;      /* Rodapé: Preto meio azulado escuro */
      --mist: #e2e8f0;       /* Bordas e Caixas: Cinza claro elegante */
      --text: #1e293b;       /* Texto: Cinza quase preto para não cansar a vista */
    }
    * { box-sizing: border-box; }
    body { font-family: 'Jost', sans-serif; background: var(--cream); color: var(--text); margin: 0; }
    .font-display { font-family: 'Jost', sans-serif; letter-spacing: -0.02em; }
    .bg-cream { background-color: var(--cream); }
    .bg-forest { background-color: var(--forest); }
    .text-forest { color: var(--forest); }
    .text-gold { color: var(--gold); }
    .border-gold { border-color: var(--gold); }
    .border-forest { border-color: var(--forest); }

    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes slideInRight { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes pulse-gold { 0%,100% { box-shadow: 0 0 0 0 rgba(0,86,179,0.4); } 50% { box-shadow: 0 0 0 12px rgba(0,86,179,0); } }
    @keyframes spin { to { transform: rotate(360deg); } }

    .fade-up { animation: fadeUp 0.7s ease forwards; }
    .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
    .fade-up-2 { animation: fadeUp 0.7s 0.25s ease both; }
    .fade-up-3 { animation: fadeUp 0.7s 0.4s ease both; }
    .fade-up-4 { animation: fadeUp 0.7s 0.55s ease both; }
    .slide-right { animation: slideInRight 0.5s ease forwards; }
    .animate-marquee { animation: marquee 28s linear infinite; }
    .animate-spin-slow { animation: spin 1s linear infinite; }
    .pulse-gold { animation: pulse-gold 2s infinite; }

    .hero-bg {
      background: linear-gradient(135deg, #000000 0%, #1a1a1a 40%, #002244 100%);
    }
    .gold-gradient { background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%); background-size: 200% 100%; }
    .card-hover { transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94); }
    .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.08); }
    input:focus, select:focus, textarea:focus { outline: none; border-color: var(--gold) !important; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .drawer-open { transform: translateX(0) !important; }
    .img-zoom { overflow: hidden; }
    .img-zoom img { transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
    .img-zoom:hover img { transform: scale(1.08); }
    .btn-forest { background: var(--forest); color: white; border: 2px solid var(--forest); transition: all 0.3s; }
    .btn-forest:hover { background: transparent; color: var(--forest); }
    .btn-gold { background: var(--gold); color: white; border: 2px solid var(--gold); transition: all 0.3s; }
    .btn-gold:hover { background: transparent; color: var(--gold); }
    .btn-outline-forest { background: transparent; color: var(--forest); border: 2px solid var(--forest); transition: all 0.3s; }
    .btn-outline-forest:hover { background: var(--forest); color: white; }
  `}</style>
);

/* ── HELPERS ────────────────────────────────────────────────── */
function Img({ src, alt, className, style }) {
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
      onError={() => setErr(true)}
    />
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
              buttonDestination: 'cart',
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
                button: {
                  'background-color': '#0056b3',
                  'color': '#ffffff',
                  'border-radius': '12px',
                  'font-family': 'Jost, sans-serif',
                  'font-weight': '600',
                  'font-size': '14px',
                  'padding': '16px 24px',
                  'width': '100%',
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
      shopifyId: "15712441500022",
      name: "Aviator Classic",
      rating: 4.8,
      reviews: 234,
      badge: "Bestseller",
      brand: "Ray-Ban",
      price: 189,
      material: "Metal",
      color: "Dourado",
      style: "Clássico",
      shape: "Aviador",
      faceShape: ["oval", "square", "heart"],
      budget: "mid",
      description:
        "O ícone intemporal que define gerações, com armação em metal dourado de alta qualidade que combina elegância atemporal e durabilidade excepcional. Perfeito para quem procura um visual sofisticado e clássico que nunca sai de moda.",
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop",
    },
    {
      id: 2,
      name: "Wayfarer Noir",
      shopifyId: "ID_PENDENTE",
      rating: 4.6,
      reviews: 189,
      brand: "Ray-Ban",
      price: 165,
      material: "Acetato",
      color: "Preto",
      style: "Clássico",
      shape: "Quadrado",
      faceShape: ["round", "oval"],
      budget: "mid",
      description:
        "Design revolucionário em acetato premium preto que se tornou sinónimo de estilo rebelde e confiante. A escolha perfeita para quem valoriza a tradição com um toque contemporâneo e conforto incomparável durante todo o dia.",
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
    },
    {
      id: 3,
      name: "Sport Pro",
      shopifyId: "ID_PENDENTE",
      rating: 4.7,
      reviews: 98,
      brand: "Oakley",
      price: 215,
      material: "Titânio",
      color: "Preto",
      style: "Desportivo",
      shape: "Quadrado",
      faceShape: ["square", "oval"],
      budget: "premium",
      description:
        "Engenharia de precisão em titânio ultra-leve, concebida para performance máxima sem comprometer o estilo urbano moderno. Resistência excecional e conforto superior para o homem ativo que exige o melhor em tecnologia óptica.",
      image:
        "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=600&fit=crop",
    },
    {
      id: 4,
      name: "Round Vintage",
      shopifyId: "ID_PENDENTE",
      rating: 4.9,
      reviews: 312,
      badge: "Staff Pick",
      brand: "Persol",
      price: 295,
      material: "Acetato",
      color: "Tartaruga",
      style: "Clássico",
      shape: "Redondo",
      faceShape: ["square", "heart"],
      budget: "premium",
      description:
        "Sofisticação italiana artesanal em acetato tartaruga que evoca o charme intelectual das décadas passadas. Cada par é uma obra de arte única, oferecendo um caráter distinto e um conforto luxuoso que só a tradição Persol consegue entregar.",
      image:
        "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=600&fit=crop",
    },
    {
      id: 5,
      shopifyId: "ID_PENDENTE",
      name: "Wire Minimal",
      rating: 4.8,
      reviews: 76,
      brand: "Lindberg",
      price: 420,
      material: "Titânio",
      color: "Prateado",
      style: "Discreto",
      shape: "Redondo",
      faceShape: ["oval", "round"],
      budget: "premium",
      description:
        "O epítome da elegância minimalista escandinava, com armação em titânio prateado tão leve que se esquece que a está a usar. Design sem parafusos e acabamento impecável para quem aprecia a beleza da simplicidade refinada.",
      image:
        "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=600&fit=crop",
    },
    {
      id: 6,
      shopifyId: "ID_PENDENTE",
      name: "Bold Square",
      rating: 4.5,
      reviews: 143,
      badge: "Novo",
      brand: "Tom Ford",
      price: 380,
      material: "Acetato",
      color: "Preto",
      style: "Arrojado",
      shape: "Quadrado",
      faceShape: ["round", "oval"],
      budget: "premium",
      description:
        "Declaração de confiança absoluta em acetato preto com linhas arquitetónicas que definem o luxo contemporâneo. Para o homem que não tem medo de ser notado e aprecia a excelência em cada detalhe, da construção ao acabamento.",
      image:
        "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600&h=600&fit=crop",
    },
    {
      id: 7,
      shopifyId: "ID_PENDENTE",
      name: "Clear Frame",
      rating: 4.4,
      reviews: 201,
      brand: "Warby Parker",
      price: 85,
      material: "Acetato",
      color: "Transparente",
      style: "Discreto",
      shape: "Redondo",
      faceShape: ["oval", "heart"],
      budget: "low",
      description:
        "Frescura moderna em acetato transparente que oferece um visual leve e descontraído sem sacrificar qualidade. Ideal para quem procura um estilo contemporâneo versátil com excelente relação qualidade-preço.",
      image:
        "https://images.unsplash.com/photo-1622428051623-4c0b0c5d71e1?w=600&h=600&fit=crop",
    },
    {
      id: 8,
      shopifyId: "ID_PENDENTE",
      name: "Navigator Gold",
      rating: 4.7,
      reviews: 88,
      brand: "Carrera",
      price: 245,
      material: "Metal",
      color: "Dourado",
      style: "Desportivo",
      shape: "Aviador",
      faceShape: ["square", "oval"],
      budget: "premium",
      description:
        "Legado do automobilismo de competição em metal dourado premium que combina herança desportiva com elegância refinada. Design aerodinâmico e construção robusta para quem vive a vida na linha da frente.",
      image:
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=600&fit=crop",
    },
  ],
  women: [
    {
      id: 9,
      shopifyId: "ID_PENDENTE",
      name: "Cat Eye Luxe",
      rating: 4.9,
      reviews: 267,
      badge: "Bestseller",
      brand: "Gucci",
      price: 340,
      material: "Acetato",
      color: "Tartaruga",
      style: "Arrojado",
      shape: "Cat-Eye",
      faceShape: ["round", "square"],
      budget: "premium",
      description:
        "Glamour italiano em estado puro com acetato tartaruga que celebra a feminilidade audaciosa e sofisticada. Cada curva é pensada para realçar a elegância natural, oferecendo um visual icónico que transcende tendências passageiras.",
      image:
        "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600&h=600&fit=crop",
    },
    {
      id: 10,
      shopifyId: "ID_PENDENTE",
      name: "Butterfly Rose",
      rating: 4.7,
      reviews: 154,
      brand: "Prada",
      price: 295,
      material: "Acetato",
      color: "Preto",
      style: "Clássico",
      shape: "Cat-Eye",
      faceShape: ["oval", "heart"],
      budget: "premium",
      description:
        "Delicadeza e força combinadas em acetato preto premium com linhas suaves que acentuam traços femininos com subtileza. O equilíbrio perfeito entre sofisticação clássica e modernidade para a mulher contemporânea e confiante.",
      image:
        "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=600&fit=crop",
    },
    {
      id: 11,
      shopifyId: "ID_PENDENTE",
      name: "Round Chic",
      rating: 4.8,
      reviews: 203,
      badge: "Staff Pick",
      brand: "Chanel",
      price: 450,
      material: "Metal",
      color: "Dourado",
      style: "Clássico",
      shape: "Redondo",
      faceShape: ["square", "heart"],
      budget: "premium",
      description:
        "A essência do luxo parisiense em metal dourado com acabamento impecável que define elegância sem esforço. Artesanato francês de excelência para quem reconhece que o verdadeiro luxo está nos detalhes mais subtis.",
      image:
        "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=600&fit=crop",
    },
    {
      id: 12,
      shopifyId: "ID_PENDENTE",
      name: "Clear Cat",
      rating: 4.6,
      reviews: 91,
      brand: "Céline",
      price: 380,
      material: "Acetato",
      color: "Transparente",
      style: "Discreto",
      shape: "Cat-Eye",
      faceShape: ["round", "oval"],
      budget: "premium",
      description:
        "Minimalismo refinado em acetato transparente que redefine a elegância discreta com um toque de sofisticação parisiense. Leveza visual e conforto absoluto para a mulher que valoriza o estilo atemporal e a qualidade irrepreensível.",
      image:
        "https://images.unsplash.com/photo-1622428051623-4c0b0c5d71e1?w=600&h=600&fit=crop",
    },
    {
      id: 13,
      shopifyId: "ID_PENDENTE",
      name: "Square Bold",
      rating: 4.5,
      reviews: 178,
      brand: "Dior",
      price: 420,
      material: "Acetato",
      color: "Preto",
      style: "Arrojado",
      shape: "Quadrado",
      faceShape: ["round", "oval"],
      budget: "premium",
      description:
        "Poder e feminilidade em harmonia perfeita através de linhas arquitetónicas em acetato preto que comandam atenção. Para a mulher moderna que lidera com confiança e não compromete quando se trata de estilo e qualidade.",
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
    },
    {
      id: 14,
      shopifyId: "ID_PENDENTE",
      name: "Aviator Slim",
      rating: 4.7,
      reviews: 220,
      brand: "Ray-Ban",
      price: 189,
      material: "Metal",
      color: "Dourado",
      style: "Clássico",
      shape: "Aviador",
      faceShape: ["oval", "heart"],
      budget: "mid",
      description:
        "Versão feminina do clássico aviador em metal dourado com proporções delicadamente ajustadas para rostos mais finos. Estilo intemporal com um toque de glamour vintage que complementa qualquer ocasião com elegância natural.",
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop",
    },
    {
      id: 15,
      shopifyId: "ID_PENDENTE",
      name: "Wire Delicate",
      rating: 4.8,
      reviews: 65,
      brand: "Lindberg",
      price: 390,
      material: "Titânio",
      color: "Prateado",
      style: "Discreto",
      shape: "Redondo",
      faceShape: ["oval", "square"],
      budget: "premium",
      description:
        "Elegância etérea escandinava em titânio prateado ultra-fino que praticamente desaparece no rosto. Conforto celestial e design atemporal para quem prefere que a sua personalidade brilhe mais do que os acessórios.",
      image:
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=600&fit=crop",
    },
    {
      id: 16,
      shopifyId: "ID_PENDENTE",
      name: "Tortoise Classic",
      rating: 4.3,
      reviews: 312,
      brand: "Oliver Peoples",
      price: 95,
      material: "Acetato",
      color: "Tartaruga",
      style: "Clássico",
      shape: "Redondo",
      faceShape: ["square", "heart"],
      budget: "low",
      description:
        "Charme atemporal em acetato tartaruga com padrões únicos que celebram a individualidade com preço acessível. Qualidade artesanal e design clássico para quem procura estilo autêntico sem o peso do luxo ostensivo.",
      image:
        "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=600&fit=crop",
    },
  ],
};

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

//* ── EXIT INTENT POPUP ──────────────────────────────────────── */
function ExitPopup({ onClose }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui no futuro faria a ligação à base de dados (Mailchimp, Klaviyo, etc)
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
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

        {/* Lado da Imagem (Escondido em ecrãs muito pequenos, visível em tablets/PCs) */}
        <div className="hidden md:block md:w-5/12 relative">
          <Img
            src="https://images.unsplash.com/photo-1590846123010-8566a7b7a213?w=800&h=1000&fit=crop"
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

        {/* Lado do Conteúdo */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
          {submitted ? (
            <div className="text-center fade-up">
              <div
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
                style={{ background: "#e8f5ee" }}
              >
                <CheckCircle size={40} style={{ color: "var(--gold)" }} />
              </div>
              <h3
                className="font-display text-3xl font-semibold mb-3"
                style={{ color: "var(--forest)" }}
              >
                Desconto Garantido!
              </h3>
              <p
                className="text-base mb-6 leading-relaxed"
                style={{ color: "#555" }}
              >
                Enviámos o seu cupão exclusivo de{" "}
                <strong>10% de desconto</strong> para a caixa de entrada de{" "}
                <em>{email}</em>.
              </p>
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-left mb-8">
                <p className="font-semibold mb-1 flex items-center gap-2">
                  <Sparkles size={14} style={{ color: "var(--gold)" }} />{" "}
                  Lembrete:
                </p>
                <p style={{ color: "#666" }}>
                  Ao utilizar o seu desconto numa armação (online ou na nossa
                  ótica física), a sua{" "}
                  <strong>Consulta de Optometria é 100% gratuita</strong>!
                </p>
              </div>
              <button
                onClick={onClose}
                className="btn-forest w-full py-4 rounded-xl font-semibold text-sm tracking-wide shadow-lg transition-transform hover:-translate-y-1"
              >
                Continuar a explorar
              </button>
            </div>
          ) : (
            <div className="fade-up">
              <span
                className="text-xs font-bold uppercase tracking-widest mb-3 block"
                style={{ color: "var(--gold)" }}
              >
                Oferta Exclusiva
              </span>
              <h3
                className="font-display text-3xl sm:text-4xl font-semibold mb-4 leading-tight"
                style={{ color: "var(--forest)" }}
              >
                Não saia de mãos a abanar.
              </h3>
              <p
                className="text-sm sm:text-base mb-6 leading-relaxed"
                style={{ color: "#555" }}
              >
                Registe o seu email e receba instantaneamente{" "}
                <strong>10% de desconto</strong> na sua próxima compra.
              </p>

              <div
                className="flex items-start gap-3 p-4 rounded-xl mb-8 border border-green-100"
                style={{ background: "#f0fdf4" }}
              >
                <Award
                  size={24}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#16a34a" }}
                />
                <p
                  className="text-sm leading-snug"
                  style={{ color: "#166534" }}
                >
                  <strong>Bónus:</strong> Na compra de qualquer modelo,
                  oferecemos-lhe o acesso direto a uma{" "}
                  <strong>consulta de optometria gratuita</strong>.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Introduza o seu melhor e-mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border-2 text-sm transition-all focus:ring-4 outline-none"
                  style={{
                    borderColor: "var(--mist)",
                    background: "white",
                  }}
                />
                <button
                  type="submit"
                  className="btn-forest w-full py-4 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-1"
                >
                  Quero os meus 10% <ArrowRight size={16} />
                </button>
              </form>
              <button
                onClick={onClose}
                className="mt-6 text-xs w-full text-center block underline transition-colors"
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
/* ── COOKIE BANNER ──────────────────────────────────────────── */
function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Verifica se o cliente já aceitou antes
    if (!localStorage.getItem("cookies_optica13")) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookies_optica13", "true");
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
          Utilizamos cookies para melhorar a sua experiência de navegação, personalizar conteúdos e analisar o nosso tráfego. Ao continuar a navegar, concorda com a nossa Política de Privacidade.
        </p>
      </div>
      <div className="flex gap-3 w-full sm:w-auto flex-shrink-0">
        <button 
          onClick={acceptCookies} 
          className="btn-forest w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-sm"
        >
          Aceitar Todos
        </button>
      </div>
    </div>
  );
}

/* ── CART DRAWER (COM CHECKOUT VISUAL) ───────────────────────── */
function CartDrawer({ cart, onClose, onRemove, onQty, onBook }) {
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Carrinho, 2: Pagamento, 3: Sucesso
  const [paymentMethod, setPaymentMethod] = useState("");
  const [mbwayPhone, setMbwayPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simula o tempo de processamento do banco (2 segundos)
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep(3);
    }, 2000);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[80]"
        style={{
          background: "rgba(10,20,15,0.5)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      />
      <div
        className="fixed top-0 right-0 h-full w-full sm:w-[420px] z-[90] flex flex-col slide-right"
        style={{ background: "var(--cream)" }}
      >
        {/* Cabeçalho do Carrinho */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: "var(--mist)" }}
        >
          <div>
            <p
              className="font-display text-2xl font-semibold"
              style={{ color: "var(--forest)" }}
            >
              {checkoutStep === 1
                ? "O Seu Carrinho"
                : checkoutStep === 2
                ? "Pagamento"
                : "Encomenda Confirmada"}
            </p>
            {checkoutStep === 1 && (
              <p className="text-xs mt-0.5" style={{ color: "#888" }}>
                {cart.length} {cart.length === 1 ? "artigo" : "artigos"}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-gray-200"
            style={{ background: "var(--mist)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* PASSO 1: Lista do Carrinho */}
        {checkoutStep === 1 && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag size={40} className="mx-auto mb-4 opacity-20" />
                  <p className="text-sm" style={{ color: "#888" }}>
                    Carrinho vazio
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div
                      className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                      style={{ background: "var(--mist)" }}
                    >
                      <Img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-semibold mb-0.5"
                        style={{ color: "var(--gold)" }}
                      >
                        {item.brand}
                      </p>
                      <p className="font-semibold text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#888" }}>
                        {item.material} · {item.color}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onQty(item.id, item.qty - 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center"
                            style={{ background: "var(--mist)" }}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-semibold w-4 text-center">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => onQty(item.id, item.qty + 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center"
                            style={{ background: "var(--mist)" }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p
                          className="font-display text-lg font-semibold"
                          style={{ color: "var(--forest)" }}
                        >
                          €{item.price * item.qty}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="opacity-30 hover:opacity-70 transition-opacity mt-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div
                className="p-6 border-t space-y-3"
                style={{ borderColor: "var(--mist)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">Total a pagar</p>
                  <p
                    className="font-display text-2xl font-semibold"
                    style={{ color: "var(--forest)" }}
                  >
                    €{total}
                  </p>
                </div>
                <button
                  onClick={() => setCheckoutStep(2)}
                  className="btn-forest w-full py-4 rounded-xl font-semibold tracking-wide text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  Finalizar Compra
                </button>
                <button
                  onClick={onBook}
                  className="btn-outline-forest w-full py-3 rounded-xl font-semibold text-sm"
                >
                  Prefiro reservar e pagar na Loja
                </button>
              </div>
            )}
          </>
        )}

        {/* PASSO 2: Simulação de Pagamento */}
        {checkoutStep === 2 && (
          <div className="flex-1 p-6 flex flex-col">
            <button
              onClick={() => setCheckoutStep(1)}
              className="mb-6 text-xs font-semibold flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity text-gray-600"
            >
              <ChevronRight size={14} className="rotate-180" /> Voltar ao
              carrinho
            </button>

            <p className="text-sm font-semibold mb-4">
              Escolha o método de pagamento:
            </p>
            <div className="space-y-3 mb-8">
              {/* Opção MB Way */}
              <label
                className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "mbway"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="mbway"
                    checked={paymentMethod === "mbway"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">MB WAY</p>
                    <p className="text-xs opacity-60">
                      Pagamento instantâneo via telemóvel
                    </p>
                  </div>
                </div>
                {paymentMethod === "mbway" && (
                  <input
                    type="tel"
                    placeholder="Número de telemóvel"
                    value={mbwayPhone}
                    onChange={(e) => setMbwayPhone(e.target.value)}
                    className="mt-3 px-4 py-2 rounded-lg border-2 text-sm"
                    style={{ borderColor: "var(--mist)" }}
                  />
                )}
              </label>

              {/* Opção Multibanco */}
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "multibanco"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="multibanco"
                  checked={paymentMethod === "multibanco"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Multibanco</p>
                  <p className="text-xs opacity-60">
                    Receba referência por email
                  </p>
                </div>
              </label>

              {/* Opção Cartão */}
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Cartão de Crédito/Débito
                  </p>
                  <p className="text-xs opacity-60">Visa, Mastercard, Amex</p>
                </div>
              </label>
            </div>

            <div className="mt-auto">
              <div
                className="flex items-center justify-between mb-4 pb-4 border-t pt-4"
                style={{ borderColor: "var(--mist)" }}
              >
                <p className="text-sm font-semibold">Total</p>
                <p
                  className="font-display text-2xl font-semibold"
                  style={{ color: "var(--forest)" }}
                >
                  €{total}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                disabled={!paymentMethod || isProcessing}
                className="btn-forest w-full py-4 rounded-xl font-semibold text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin-slow">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    </div>
                    Processando...
                  </>
                ) : (
                  "Confirmar Pagamento"
                )}
              </button>
            </div>
          </div>
        )}

        {/* PASSO 3: Sucesso */}
        {checkoutStep === 3 && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{ background: "#dcfce7" }}
            >
              <CheckCircle size={40} style={{ color: "#16a34a" }} />
            </div>
            <p
              className="font-display text-3xl font-semibold mb-2"
              style={{ color: "var(--forest)" }}
            >
              Encomenda Confirmada!
            </p>
            <p className="text-sm mb-2" style={{ color: "#666" }}>
              Receberá um email de confirmação em breve.
            </p>
            <p className="text-xs mb-8" style={{ color: "#999" }}>
              Número da encomenda: #OP{Math.floor(Math.random() * 100000)}
            </p>
            <button
              onClick={onClose}
              className="btn-forest px-8 py-3 rounded-xl font-semibold text-sm tracking-wide"
            >
              Voltar à Loja
            </button>
          </div>
        )}
      </div>
    </>
  );
}
/* ── PRODUCT MODAL ──────────────────────────────────────────── */
function ProductModal({ product, onClose, onAdd, onBook }) {
  if (!product) return null;
  return (
    <div
      className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-6"
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
          {/* Lado da Imagem: Maior (metade do ecrã no PC) e mais alta */}
          <div
            className="w-full md:w-1/2 flex-shrink-0 img-zoom relative"
            style={{ background: "var(--mist)", minHeight: "350px" }}
          >
            <Img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover md:absolute md:inset-0"
            />
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
              className="font-display text-4xl md:text-5xl font-light mb-6"
              style={{ color: "var(--forest)" }}
            >
              €{product.price}
            </p>

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
            <div className="mb-8 grid grid-cols-2 gap-4">
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

           <div className="mt-auto space-y-3">
              {/* Botão Oficial do Shopify (Teste com Ray-Ban) */}
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
function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [clientData, setClientData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [month, setMonth] = useState(new Date());
  const [confirmed, setConfirmed] = useState(false);

  // Definição dos horários
  const slotsSemana = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
  ];
  const slotsSabado = [
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  const today = new Date();
  const { daysInMonth, startDay } = (() => {
    const y = month.getFullYear(),
      m = month.getMonth();
    return {
      daysInMonth: new Date(y, m + 1, 0).getDate(),
      startDay: new Date(y, m, 1).getDay(),
    };
  })();

  const monthLabel = new Intl.DateTimeFormat("pt-PT", {
    month: "long",
    year: "numeric",
  }).format(month);
  const dateLabel = selectedDate
    ? new Intl.DateTimeFormat("pt-PT", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(selectedDate)
    : "";
  const isCurMonth =
    month.getMonth() === today.getMonth() &&
    month.getFullYear() === today.getFullYear();

  // Descobrir que slots mostrar
  const currentSlots =
    selectedDate && selectedDate.getDay() === 6 ? slotsSabado : slotsSemana;

  const reset = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setClientData({ name: "", phone: "", email: "" });
    setConfirmed(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(10,20,15,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative rounded-2xl overflow-hidden max-w-3xl w-full fade-up"
        style={{ background: "var(--cream)", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-6 border-b flex items-center justify-between"
          style={{ borderColor: "var(--mist)" }}
        >
          <div>
            <p
              className="font-display text-2xl font-semibold"
              style={{ color: "var(--forest)" }}
            >
              {confirmed
                ? "Marcação Confirmada"
                : step === 1
                ? "Escolha a Data"
                : step === 2
                ? "Escolha a Hora"
                : step === 3
                ? "Dados de Contacto"
                : "Confirmação"}
            </p>
            {!confirmed && (
              <p className="text-xs mt-1" style={{ color: "#888" }}>
                Passo {step} de 4
              </p>
            )}
          </div>
          <button
            onClick={() => {
              reset();
              onClose();
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "var(--mist)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 140px)" }}
        >
          {confirmed ? (
            <div className="text-center py-8">
              <div
                className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6"
                style={{ background: "#dcfce7" }}
              >
                <CheckCircle size={40} style={{ color: "#16a34a" }} />
              </div>
              <p
                className="font-display text-3xl font-semibold mb-2"
                style={{ color: "var(--forest)" }}
              >
                Tudo Pronto!
              </p>
              <p className="text-sm mb-1" style={{ color: "#666" }}>
                A sua marcação foi confirmada para:
              </p>
              <p className="font-semibold mb-1 capitalize">
                {dateLabel} às {selectedTime}
              </p>
              <p className="text-xs mb-8" style={{ color: "#999" }}>
                Receberá um email de confirmação em breve.
              </p>
              <button
                onClick={() => {
                  reset();
                  onClose();
                }}
                className="btn-forest px-8 py-3 rounded-xl font-semibold text-sm tracking-wide"
              >
                Fechar
              </button>
            </div>
          ) : step === 1 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() =>
                    setMonth(
                      new Date(month.getFullYear(), month.getMonth() - 1)
                    )
                  }
                  disabled={isCurMonth}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                  style={{ background: "var(--mist)" }}
                >
                  <ChevronRight size={16} className="rotate-180" />
                </button>
                <p className="font-semibold capitalize">{monthLabel}</p>
                <button
                  onClick={() =>
                    setMonth(
                      new Date(month.getFullYear(), month.getMonth() + 1)
                    )
                  }
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "var(--mist)" }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs font-semibold py-2"
                    style={{ color: "#888" }}
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array(startDay)
                  .fill(0)
                  .map((_, i) => (
                    <div key={`e-${i}`} />
                  ))}
                {Array(daysInMonth)
                  .fill(0)
                  .map((_, i) => {
                    const day = i + 1;
                    const d = new Date(
                      month.getFullYear(),
                      month.getMonth(),
                      day
                    );
                    const dow = d.getDay();
                    const isPast = d < today.setHours(0, 0, 0, 0);
                    const isSunday = dow === 0;
                    const isSelected =
                      selectedDate &&
                      d.toDateString() === selectedDate.toDateString();
                    const disabled = isPast || isSunday;
                    return (
                      <button
                        key={day}
                        onClick={() => !disabled && setSelectedDate(d)}
                        disabled={disabled}
                        className={`aspect-square rounded-xl text-sm font-semibold transition-all ${
                          isSelected
                            ? "text-white"
                            : disabled
                            ? "opacity-20 cursor-not-allowed"
                            : "hover:bg-gray-100"
                        }`}
                        style={
                          isSelected
                            ? { background: "var(--forest)" }
                            : { background: "transparent" }
                        }
                      >
                        {day}
                      </button>
                    );
                  })}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedDate}
                  className="btn-forest px-6 py-3 rounded-xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </>
          ) : step === 2 ? (
            <>
              <p className="text-sm mb-4 capitalize">
                <strong>Data:</strong> {dateLabel}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {currentSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-3 rounded-xl text-sm font-semibold transition-all ${
                      selectedTime === t ? "text-white" : "hover:bg-gray-100"
                    }`}
                    style={
                      selectedTime === t
                        ? { background: "var(--forest)" }
                        : { background: "var(--mist)" }
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="btn-outline-forest px-6 py-3 rounded-xl font-semibold text-sm"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedTime}
                  className="btn-forest flex-1 px-6 py-3 rounded-xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </>
          ) : step === 3 ? (
            <>
              <div className="space-y-4">
                {[
                  ["text", "Nome Completo", "name"],
                  ["tel", "Telefone", "phone"],
                  ["email", "Email", "email"],
                ].map(([t, p, k]) => (
                  <input
                    key={k}
                    type={t}
                    placeholder={p}
                    value={clientData[k]}
                    onChange={(e) =>
                      setClientData({ ...clientData, [k]: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl text-sm border-2 transition-all"
                    style={{
                      borderColor: "var(--mist)",
                      fontFamily: "Jost,sans-serif",
                    }}
                  />
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="btn-outline-forest px-6 py-3 rounded-xl font-semibold text-sm"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={
                    !clientData.name || !clientData.phone || !clientData.email
                  }
                  className="btn-forest flex-1 px-6 py-3 rounded-xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </>
          ) : (
            <>
              <div
                className="rounded-xl p-6 mb-6"
                style={{ background: "var(--cream-dark)" }}
              >
                <p
                  className="text-xs uppercase tracking-wide mb-4"
                  style={{ color: "#888" }}
                >
                  Resumo da Marcação
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#666" }}>Data:</span>
                    <strong className="capitalize">{dateLabel}</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#666" }}>Hora:</span>
                    <strong>{selectedTime}</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#666" }}>Nome:</span>
                    <strong>{clientData.name}</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#666" }}>Telefone:</span>
                    <strong>{clientData.phone}</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#666" }}>Email:</span>
                    <strong>{clientData.email}</strong>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="btn-outline-forest px-6 py-3 rounded-xl font-semibold text-sm"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setConfirmed(true)}
                  className="btn-forest flex-1 px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <CheckCircle size={16} /> Confirmar Marcação
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN APP COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [booking, setBooking] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [exitIntent, setExitIntent] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const exitShown = useRef(false);

  useEffect(() => {
    const h = (e) => {
      if (e.clientY <= 10 && !exitShown.current) {
        exitShown.current = true;
        setExitIntent(true);
      }
    };
    document.addEventListener("mouseout", h);
    return () => document.removeEventListener("mouseout", h);
  }, []);

  const openBook = () => {
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

  /* HEADER */
  const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          background: "rgba(255,255,255,0.92)",
          borderBottom: "1px solid var(--mist)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
              style={{ background: "var(--forest)" }}
            >
              <Glasses size={18} className="text-white" />
            </div>
            <span
              className="font-display text-2xl font-semibold"
              style={{ color: "var(--forest)" }}
            >
              Óptica <span style={{ color: "var(--gold)" }}>13</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {[
              ["Serviços", "services"],
              ["Vantagens", "vantagens"],
              ["Homem", "men"],
              ["Mulher", "women"],
              ["Sobre Nós", "about"],
              ["Contactos", "contact"],
            ].map(([label, p]) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`font-medium transition-all hover:opacity-100 ${
                  page === p ? "opacity-100" : "opacity-60"
                }`}
                style={{ color: page === p ? "var(--gold)" : "var(--forest)" }}
              >
                {label}
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
              onClick={() => setCartOpen(true)}
              className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all"
            >
              <ShoppingBag size={18} />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                  style={{ background: "var(--gold)" }}
                >
                  {cart.reduce((s, i) => s + i.qty, 0)}
                </span>
              )}
            </button>
            <button
              onClick={openBook}
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
                ["Homem", "men"],
                ["Mulher", "women"],
                ["Sobre Nós", "about"],
                ["Contactos", "contact"],
              ].map(([label, p]) => (
                <button
                  key={p}
                  onClick={() => {
                    setPage(p);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-xl font-medium transition-all"
                  style={{
                    background: page === p ? "var(--mist)" : "transparent",
                    color: page === p ? "var(--gold)" : "var(--forest)",
                  }}
                >
                  {label}
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
  const Footer = () => (
    <footer className="py-16" style={{ background: "var(--slate)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Usamos 5 colunas para caber tudo bem */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* 1. Logotipo e ERS */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--forest)" }}
              >
                <Glasses size={18} style={{ color: "var(--gold)" }} />
              </div>
              <span className="font-display text-xl font-semibold text-white">
                Óptica <span style={{ color: "var(--gold)" }}>13</span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-3 max-w-sm"
              style={{ color: "rgba(250,247,242,0.45)" }}
            >
              Cuidamos da sua visão com tecnologia de ponta e profissionalismo.
            </p>
            <p className="text-xs font-semibold text-gray-500">
              Nº Registo ERS: E131391
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
                ["men", "Coleção Homem"],
                ["women", "Coleção Mulher"],
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
                  2775 Parede
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
              className="font-display text-4xl md:text-5xl font-bold mb-10 leading-tight"
              style={{ color: "var(--forest)" }}
            >
              O que é que os nossos
              <br />
              clientes dizem sobre a<br />
              Óptica 13?
            </h2>

            <div className="min-h-[220px] sm:min-h-[160px] flex items-center">
              <p
                className="text-base md:text-lg leading-relaxed transition-opacity duration-500"
                style={{ color: "#666" }}
              >
                {testimonials[active].text}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mt-10">
              {/* Nome e Avatar */}
              <div
                className="flex items-center gap-4 bg-gray-50 pr-6 rounded-full border w-fit"
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
                    onClick={() => setActive(i)}
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
  /* HOME PAGE */
  const HomePage = () => (
    <div>
      {/* Hero */}
      <section className="relative hero-bg pt-32 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-white">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4 fade-up"
              style={{ color: "var(--gold)" }}
            >
              Desde 1986
            </p>
            <h1
              className="font-display mb-6 fade-up-1"
              style={{ fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 1.1 }}
            >
              A sua visão,
              <br />a nossa <em style={{ color: "var(--gold)" }}>missão</em>
            </h1>
            <p
              className="text-lg mb-8 opacity-90 fade-up-2"
              style={{ maxWidth: 480 }}
            >
              Exames de optometria gratuitos. Marcas premium. Tecnologia de
              ponta. Tudo num só lugar.
            </p>
            <div className="flex flex-wrap gap-4 fade-up-3">
              <button
                onClick={openBook}
                className="bg-white px-8 py-4 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-2xl transition-all hover:scale-105"
                style={{ color: "var(--forest)" }}
              >
                <Calendar size={16} /> Marcar Exame Gratuito
              </button>
              <button
                onClick={() => setPage("men")}
                className="border-2 border-white px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all hover:bg-white hover:text-black"
              >
                Ver Coleções
              </button>
            </div>
          </div>
          <div className="relative fade-up-2">
            <div className="aspect-square rounded-3xl overflow-hidden img-zoom">
              <Img
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&h=800&fit=crop"
                alt="Óculos premium"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-6 -left-6 w-40 h-40 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{ background: "var(--gold)" }}
            >
              <div className="text-center text-white">
                <p className="font-display text-5xl font-bold">+39</p>
                <p className="text-xs uppercase tracking-wider">Anos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                desc: "Exames completos com tecnologia de última geração. Totalmente gratuitos.",
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
                  onClick={openBook}
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
            Agende a sua consulta de optometria sem qualquer custo. Rápido,
            profissional e sem compromisso.
          </p>
          <button
            onClick={openBook}
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
                onClick={() => setPage("men")}
                className="btn-outline-forest px-5 py-2.5 rounded-xl text-sm font-semibold"
              >
                Homem
              </button>
              <button
                onClick={() => setPage("women")}
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

  /* SERVICES PAGE */
  const ServicesPage = () => {
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
                Se optar pelos nossos serviços para a escolha dos seus óculos, a
                consulta é oferta.
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
        img: "https://images.unsplash.com/photo-1589821540306-0391ab1a1200?w=800&h=800&fit=crop",
        actionLabel: "Agendar Consulta",
        actionFn: openBook,
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
        img: "https://images.unsplash.com/photo-1506465487777-628a8d16eb95?w=800&h=800&fit=crop",
        actionLabel: "Marcar Exame",
        actionFn: openBook,
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
        img: "https://images.unsplash.com/photo-1512803362140-5e364ed8a719?w=800&h=800&fit=crop",
        actionLabel: "Agendar Consulta",
        actionFn: openBook,
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
        img: "https://images.unsplash.com/photo-1556306535-38febf6cdbe4?w=800&h=800&fit=crop",
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
        img: "https://images.unsplash.com/photo-1615592389070-bcc97e050475?w=800&h=800&fit=crop",
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
        img: "https://images.unsplash.com/photo-1576092762791-dd9e2220bac1?w=800&h=800&fit=crop",
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
  const CollectionPage = ({ gender }) => {
    const [filters, setFilters] = useState({
      material: "",
      priceRange: "",
      color: "",
      style: "",
      shape: "",
    });
    const [search, setSearch] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const products = PRODUCTS[gender];
    const filtered = products.filter((p) => {
      if (
        search &&
        !p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.brand.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (filters.material && p.material !== filters.material) return false;
      if (filters.color && p.color !== filters.color) return false;
      if (filters.style && p.style !== filters.style) return false;
      if (filters.shape && p.shape !== filters.shape) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split("-").map(Number);
        if (p.price < min || (max && p.price > max)) return false;
      }
      return true;
    });

    const FilterPanel = ({ isMobile }) => (
      <div className={isMobile ? "p-6" : ""}>
        <div className="space-y-6">
          {/* Material */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-3"
              style={{ color: "#888" }}
            >
              Material
            </p>
            <div className="space-y-2">
              {["", "Metal", "Acetato", "Titânio"].map((m) => (
                <label
                  key={m}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={isMobile ? "material-mobile" : "material"}
                    checked={filters.material === m}
                    onChange={() => setFilters({ ...filters, material: m })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{m || "Todos"}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Preço */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-3"
              style={{ color: "#888" }}
            >
              Preço
            </p>
            <div className="space-y-2">
              {[
                ["", "Todos"],
                ["0-100", "Até €100"],
                ["100-200", "€100 - €200"],
                ["200-300", "€200 - €300"],
                ["300-999", "Mais de €300"],
              ].map(([range, label]) => (
                <label
                  key={range}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={isMobile ? "price-mobile" : "price"}
                    checked={filters.priceRange === range}
                    onChange={() =>
                      setFilters({ ...filters, priceRange: range })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cor */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-3"
              style={{ color: "#888" }}
            >
              Cor
            </p>
            <div className="space-y-2">
              {[
                "",
                "Preto",
                "Dourado",
                "Prateado",
                "Transparente",
                "Tartaruga",
              ].map((c) => (
                <label
                  key={c}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={isMobile ? "color-mobile" : "color"}
                    checked={filters.color === c}
                    onChange={() => setFilters({ ...filters, color: c })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{c || "Todos"}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Estilo */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-3"
              style={{ color: "#888" }}
            >
              Estilo
            </p>
            <div className="space-y-2">
              {["", "Clássico", "Desportivo", "Discreto", "Arrojado"].map(
                (s) => (
                  <label
                    key={s}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={isMobile ? "style-mobile" : "style"}
                      checked={filters.style === s}
                      onChange={() => setFilters({ ...filters, style: s })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{s || "Todos"}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Formato */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-3"
              style={{ color: "#888" }}
            >
              Formato
            </p>
            <div className="space-y-2">
              {gender === "men"
                ? ["", "Aviador", "Quadrado", "Redondo"].map((sh) => (
                    <label
                      key={sh}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={isMobile ? "shape-mobile" : "shape"}
                        checked={filters.shape === sh}
                        onChange={() => setFilters({ ...filters, shape: sh })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{sh || "Todos"}</span>
                    </label>
                  ))
                : ["", "Cat-Eye", "Redondo", "Quadrado", "Aviador"].map(
                    (sh) => (
                      <label
                        key={sh}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={isMobile ? "shape-mobile" : "shape"}
                          checked={filters.shape === sh}
                          onChange={() => setFilters({ ...filters, shape: sh })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{sh || "Todos"}</span>
                      </label>
                    )
                  )}
            </div>
          </div>

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
              Coleção {gender === "men" ? "Homem" : "Mulher"}
            </p>
            <h1
              className="font-display mb-6"
              style={{
                fontSize: "clamp(2.5rem,5vw,4rem)",
                color: "var(--forest)",
              }}
            >
              Óculos <em>Premium</em>
            </h1>

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
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 text-sm"
                  style={{ borderColor: "var(--mist)" }}
                />
              </div>
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden btn-outline-forest px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2"
              >
                <Filter size={16} /> Filtros
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div
                className="sticky top-28 p-6 rounded-2xl border"
                style={{ background: "white", borderColor: "var(--mist)" }}
              >
                <p className="font-semibold mb-4">Filtros</p>
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
                              p.badge === "Staff Pick"
                                ? "#0056b3"
                                : p.badge === "Novo"
                                ? "#7c3aed"
                                : "#16a34a",
                          }}
                        >
                          {p.badge === "Staff Pick"
                            ? "⭐ "
                            : p.badge === "Novo"
                            ? "✦ "
                            : "🔥 "}
                          {p.badge}
                        </div>
                      )}
                      <div
                        className="aspect-square overflow-hidden img-zoom"
                        style={{ background: "#f5f4f0" }}
                      >
                        <Img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover mix-blend-multiply"
                        />
                      </div>
                    </div>

                    <div className="p-5">
                      <p
                        className="text-xs font-semibold uppercase tracking-wide mb-1"
                        style={{ color: "var(--gold)" }}
                      >
                        {p.brand}
                      </p>
                      <p className="font-semibold mb-1">{p.name}</p>
                      <div className="flex items-center gap-2 mb-3">
                        {(() => {
                          const colorMap = {
                            Preto: "#1a1a1a",
                            Dourado: "#c9a84c",
                            Prateado: "#9ca3af",
                            Transparente: "#dbeafe",
                            Tartaruga: "#92400e",
                          };
                          return (
                            <>
                              <div
                                className="w-4 h-4 rounded-full border border-gray-200 shadow-sm flex-shrink-0"
                                style={{
                                  background: colorMap[p.color] || "#ccc",
                                }}
                                title={p.color}
                              />
                              <span
                                className="text-xs font-medium"
                                style={{ color: "#888" }}
                              >
                                {p.color} · {p.material}
                              </span>
                            </>
                          );
                        })()}
                      </div>
                      <p
                        className="font-display text-2xl font-semibold"
                        style={{ color: "var(--forest)" }}
                      >
                        €{p.price}
                        {p.rating && (
                          <div className="flex items-center gap-1.5 mb-1">
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
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <Search size={40} className="mx-auto mb-4 opacity-20" />
                  <p className="text-sm" style={{ color: "#888" }}>
                    Nenhum produto encontrado com estes filtros.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {drawerOpen && (
          <>
            <div
              className="fixed inset-0 z-[80] lg:hidden"
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
                className="p-6 border-b flex items-center justify-between"
                style={{ borderColor: "var(--mist)" }}
              >
                <p className="font-semibold">Filtros</p>
                <button onClick={() => setDrawerOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <FilterPanel isMobile={true} />
            </div>
          </>
        )}
      </div>
    );
  };

  /* QUIZ */
  const QuizPage = () => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
      type: "",
      gender: "",
      shapes: [],
      colors: [],
      materials: [],
      size: "",
      contacts: "",
      email: "",
      optIn: true,
    });
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    const answerSingle = (field, value) => {
      setAnswers({ ...answers, [field]: value });
      setTimeout(() => {
        setStep(step + 1);
        window.scrollTo(0, 0);
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

    const finishQuiz = (e) => {
      if (e) e.preventDefault();
      setLoading(true);
      setStep(9); // Loading Step
      window.scrollTo(0, 0);
      setTimeout(() => {
        // Simple filter for the prototype to show results
        const pool =
          answers.gender === "men"
            ? PRODUCTS.men
            : answers.gender === "women"
            ? PRODUCTS.women
            : [...PRODUCTS.men, ...PRODUCTS.women];
        setResults(pool.slice(0, 3));
        setLoading(false);
        setStep(10); // Results Step
      }, 2000);
    };

    const reset = () => {
      setStep(1);
      setAnswers({
        type: "",
        gender: "",
        shapes: [],
        colors: [],
        materials: [],
        size: "",
        contacts: "",
        email: "",
        optIn: true,
      });
      setResults([]);
      window.scrollTo(0, 0);
    };

    return (
      <div
        className="pt-28 pb-24 min-h-screen"
        style={{ background: "#f8f9fa" }}
      >
        <div className="max-w-4xl mx-auto px-6">
          {step <= 8 && (
            <div className="text-center mb-10 fade-up">
              <p className="text-xs font-bold mb-4" style={{ color: "#888" }}>
                {step} de 8
              </p>

              {step === 1 && (
                <h1
                  className="font-display text-4xl font-medium"
                  style={{ color: "var(--forest)" }}
                >
                  O que você está procurando?
                </h1>
              )}
              {step === 2 && (
                <h1
                  className="font-display text-4xl font-medium"
                  style={{ color: "var(--forest)" }}
                >
                  O que você está procurando?
                </h1>
              )}
              {step === 3 && (
                <>
                  <h1
                    className="font-display text-4xl font-medium mb-2"
                    style={{ color: "var(--forest)" }}
                  >
                    De quais formatos você gosta?
                  </h1>
                  <p className="text-sm text-gray-500">
                    Escolha quantos quiser
                  </p>
                </>
              )}
              {step === 4 && (
                <>
                  <h1
                    className="font-display text-4xl font-medium mb-2"
                    style={{ color: "var(--forest)" }}
                  >
                    De quais cores você gosta?
                  </h1>
                  <p className="text-sm text-gray-500">
                    Escolha quantas quiser
                  </p>
                </>
              )}
              {step === 5 && (
                <>
                  <h1
                    className="font-display text-4xl font-medium mb-2"
                    style={{ color: "var(--forest)" }}
                  >
                    De quais materiais você gosta?
                  </h1>
                  <p className="text-sm text-gray-500">
                    Escolha quantos quiser
                  </p>
                </>
              )}
              {step === 6 && (
                <>
                  <h1
                    className="font-display text-4xl font-medium mb-2"
                    style={{ color: "var(--forest)" }}
                  >
                    Qual é o tamanho estimado da sua cabeça?
                  </h1>
                  <p className="text-sm text-gray-500">Por favor, escolha um</p>
                </>
              )}
              {step === 7 && (
                <h1
                  className="font-display text-4xl font-medium"
                  style={{ color: "var(--forest)" }}
                >
                  Você também usa lentes de contato?
                </h1>
              )}
              {step === 8 && (
                <>
                  <h1
                    className="font-display text-4xl font-medium mb-4"
                    style={{ color: "var(--forest)" }}
                  >
                    Salvar resultados do quiz para mais tarde
                  </h1>
                  <p className="text-sm text-gray-600 max-w-lg mx-auto">
                    Nós lhe enviaremos os resultados do quiz e você receberá
                    atualizações sobre novas armações, novas lojas e muito mais!
                  </p>
                </>
              )}
            </div>
          )}

          <div className="max-w-3xl mx-auto fade-up-1">
            {step === 1 && (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                  {[
                    [
                      "eyeglasses",
                      "Óculos de grau",
                      <Glasses size={48} strokeWidth={1.5} />,
                    ],
                    [
                      "sunglasses",
                      "Óculos de sol",
                      <Eye size={48} strokeWidth={1.5} />,
                    ],
                  ].map(([v, l, icon]) => (
                    <button
                      key={v}
                      onClick={() => answerSingle("type", v)}
                      className="bg-white p-12 rounded-xl border hover:border-gray-400 transition-all flex flex-col items-center justify-center gap-6 shadow-sm"
                      style={{
                        borderColor: "var(--mist)",
                        color: "var(--forest)",
                      }}
                    >
                      <div style={{ color: "var(--gold)" }}>{icon}</div>
                      <span className="font-semibold text-lg">{l}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={nextStep}
                  className="px-8 py-3 rounded-full border text-sm font-semibold transition-all hover:bg-gray-100"
                  style={{ borderColor: "var(--mist)", color: "var(--forest)" }}
                >
                  Não tenho certeza. Vamos pular.
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                  {[
                    ["women", "Estilos femininos"],
                    ["men", "Estilos masculinos"],
                  ].map(([v, l]) => (
                    <button
                      key={v}
                      onClick={() => answerSingle("gender", v)}
                      className="bg-white p-14 rounded-xl border hover:border-gray-400 transition-all flex flex-col items-center justify-center shadow-sm"
                      style={{
                        borderColor: "var(--mist)",
                        color: "var(--forest)",
                      }}
                    >
                      <span className="font-semibold text-lg">{l}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={nextStep}
                  className="px-10 py-3 rounded-full border text-sm font-semibold transition-all hover:bg-gray-100"
                  style={{ borderColor: "var(--mist)", color: "var(--forest)" }}
                >
                  Sem preferência
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mb-8">
                  {[
                    "Quadrado",
                    "Retangular",
                    "Redondo",
                    "Gatinho",
                    "Aviador",
                  ].map((v) => {
                    const isSel = answers.shapes.includes(v);
                    return (
                      <button
                        key={v}
                        onClick={() => toggleMulti("shapes", v)}
                        className="bg-white p-6 rounded-xl border transition-all flex flex-col items-center justify-center shadow-sm relative overflow-hidden"
                        style={{
                          borderColor: isSel ? "var(--gold)" : "var(--mist)",
                          color: "var(--forest)",
                        }}
                      >
                        {isSel && (
                          <div
                            className="absolute inset-0 opacity-10"
                            style={{ background: "var(--gold)" }}
                          />
                        )}
                        <div
                          className="h-16 flex items-center justify-center mb-2 relative z-10"
                          style={{ color: isSel ? "var(--gold)" : "#ccc" }}
                        >
                          <Glasses size={40} />
                        </div>
                        <span className="font-semibold relative z-10">{v}</span>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={nextStep}
                  className={`px-10 py-3 rounded-full text-sm font-semibold transition-all ${
                    answers.shapes.length > 0
                      ? "text-white"
                      : "border hover:bg-gray-100"
                  }`}
                  style={{
                    background:
                      answers.shapes.length > 0 ? "var(--gold)" : "transparent",
                    borderColor:
                      answers.shapes.length > 0 ? "transparent" : "var(--mist)",
                    color:
                      answers.shapes.length > 0 ? "white" : "var(--forest)",
                  }}
                >
                  {answers.shapes.length > 0 ? "Continuar" : "Sem preferência"}
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
                  {[
                    [
                      "Cores",
                      "radial-gradient(circle, #ef4444, #3b82f6, #22c55e)",
                    ],
                    ["Neutros", "#d6d3d1"],
                    ["Preto", "#000000"],
                    ["Tartaruga", "linear-gradient(45deg, #78350f, #d97706)"],
                    [
                      "Dois tons",
                      "linear-gradient(to bottom, #1f2937 50%, #d1d5db 50%)",
                    ],
                    ["Cristais", "#f0f9ff"],
                    ["Ouro", "#fbbf24"],
                    ["Prata", "#9ca3af"],
                  ].map(([v, bg]) => {
                    const isSel = answers.colors.includes(v);
                    return (
                      <button
                        key={v}
                        onClick={() => toggleMulti("colors", v)}
                        className="bg-white p-5 rounded-xl border transition-all flex items-center justify-center gap-3 shadow-sm relative overflow-hidden"
                        style={{
                          borderColor: isSel ? "var(--gold)" : "var(--mist)",
                          color: "var(--forest)",
                        }}
                      >
                        {isSel && (
                          <div
                            className="absolute inset-0 opacity-10"
                            style={{ background: "var(--gold)" }}
                          />
                        )}
                        <div
                          className="w-6 h-6 rounded-full shadow-inner relative z-10 border border-gray-200"
                          style={{ background: bg }}
                        />
                        <span className="font-semibold text-sm relative z-10">
                          {v}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={nextStep}
                  className={`px-10 py-3 rounded-full text-sm font-semibold transition-all ${
                    answers.colors.length > 0
                      ? "text-white"
                      : "border hover:bg-gray-100"
                  }`}
                  style={{
                    background:
                      answers.colors.length > 0 ? "var(--gold)" : "transparent",
                    borderColor:
                      answers.colors.length > 0 ? "transparent" : "var(--mist)",
                    color:
                      answers.colors.length > 0 ? "white" : "var(--forest)",
                  }}
                >
                  {answers.colors.length > 0 ? "Continuar" : "Sem preferência"}
                </button>
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
                  {["Acetato", "Metal", "Misto"].map((v) => {
                    const isSel = answers.materials.includes(v);
                    return (
                      <button
                        key={v}
                        onClick={() => toggleMulti("materials", v)}
                        className="bg-white p-8 rounded-xl border transition-all flex flex-col items-center justify-center shadow-sm relative overflow-hidden"
                        style={{
                          borderColor: isSel ? "var(--gold)" : "var(--mist)",
                          color: "var(--forest)",
                        }}
                      >
                        {isSel && (
                          <div
                            className="absolute inset-0 opacity-10"
                            style={{ background: "var(--gold)" }}
                          />
                        )}
                        <span className="font-semibold text-lg relative z-10">
                          {v}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={nextStep}
                  className={`px-10 py-3 rounded-full text-sm font-semibold transition-all ${
                    answers.materials.length > 0
                      ? "text-white"
                      : "border hover:bg-gray-100"
                  }`}
                  style={{
                    background:
                      answers.materials.length > 0
                        ? "var(--gold)"
                        : "transparent",
                    borderColor:
                      answers.materials.length > 0
                        ? "transparent"
                        : "var(--mist)",
                    color:
                      answers.materials.length > 0 ? "white" : "var(--forest)",
                  }}
                >
                  {answers.materials.length > 0
                    ? "Continuar"
                    : "Sem preferência"}
                </button>
              </div>
            )}

            {step === 6 && (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-3 gap-4 w-full mb-8">
                  {[
                    ["narrow", "Estreita"],
                    ["medium", "Média"],
                    ["wide", "Larga"],
                  ].map(([v, l]) => (
                    <button
                      key={v}
                      onClick={() => answerSingle("size", v)}
                      className="bg-white py-10 px-4 rounded-xl border hover:border-gray-400 transition-all flex flex-col items-center justify-center shadow-sm"
                      style={{
                        borderColor: "var(--mist)",
                        color: "var(--forest)",
                      }}
                    >
                      <div
                        className="w-16 h-16 mx-auto mb-4"
                        style={{ color: "var(--forest)", opacity: 0.8 }}
                      >
                        {FaceIcons.oval()}
                      </div>
                      <span className="font-semibold">{l}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={nextStep}
                  className="px-8 py-3 rounded-full border text-sm font-semibold transition-all hover:bg-gray-100"
                  style={{ borderColor: "var(--mist)", color: "var(--forest)" }}
                >
                  Não tenho certeza. Vamos pular.
                </button>
              </div>
            )}

            {step === 7 && (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
                  {["Sim", "Não"].map((v) => (
                    <button
                      key={v}
                      onClick={() => answerSingle("contacts", v)}
                      className="bg-white py-12 rounded-xl border hover:border-gray-400 transition-all flex items-center justify-center shadow-sm"
                      style={{
                        borderColor: "var(--mist)",
                        color: "var(--forest)",
                      }}
                    >
                      <span className="font-semibold text-lg">{v}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={nextStep}
                  className="px-10 py-3 rounded-full border text-sm font-semibold transition-all hover:bg-gray-100"
                  style={{ borderColor: "var(--mist)", color: "var(--forest)" }}
                >
                  Pular
                </button>
              </div>
            )}

            {step === 8 && (
              <div className="max-w-md mx-auto mt-8">
                <form onSubmit={finishQuiz} className="space-y-6">
                  <div className="relative">
                    <label
                      className="absolute -top-2 left-3 bg-[#f8f9fa] px-1 text-xs font-semibold"
                      style={{ color: "#666" }}
                    >
                      Endereço de e-mail
                    </label>
                    <input
                      type="email"
                      value={answers.email}
                      onChange={(e) =>
                        setAnswers({ ...answers, email: e.target.value })
                      }
                      className="w-full p-4 rounded-lg border focus:ring-1 outline-none transition-all"
                      style={{
                        borderColor: "var(--mist)",
                        background: "transparent",
                      }}
                      required
                    />
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={answers.optIn}
                      onChange={(e) =>
                        setAnswers({ ...answers, optIn: e.target.checked })
                      }
                      className="mt-1 w-5 h-5 rounded"
                      style={{ accentColor: "var(--gold)" }}
                    />
                    <span
                      className="text-sm leading-snug"
                      style={{ color: "var(--forest)" }}
                    >
                      Eu quero receber as últimas novidades sobre novas
                      armações, eventos e muito mais.
                    </span>
                  </label>
                  <button
                    type="submit"
                    className="w-full text-white font-semibold py-4 rounded-full transition-all"
                    style={{ background: "var(--gold)" }}
                  >
                    Continuar
                  </button>
                </form>
              </div>
            )}

            {step === 9 && (
              <div className="text-center py-20 fade-up">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div
                    className="absolute inset-0 rounded-full border-4"
                    style={{ borderColor: "var(--mist)" }}
                  />
                  <div
                    className="absolute inset-0 rounded-full border-4 border-transparent animate-spin-slow"
                    style={{ borderTopColor: "var(--forest)" }}
                  />
                </div>
                <h3
                  className="font-display text-2xl font-semibold mb-2"
                  style={{ color: "var(--forest)" }}
                >
                  A procurar as armações perfeitas...
                </h3>
                <p className="text-sm text-gray-500">
                  A analisar as suas preferências
                </p>
              </div>
            )}

            {step === 10 && (
              <div className="fade-up">
                <div className="text-center mb-10">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{ background: "#e8f5ee", color: "var(--forest)" }}
                  >
                    <CheckCircle size={32} />
                  </div>
                  <h2
                    className="font-display text-3xl font-semibold mb-2"
                    style={{ color: "var(--forest)" }}
                  >
                    As suas recomendações
                  </h2>
                  <p className="text-sm text-gray-500">
                    Selecionadas especialmente para o seu perfil
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-5 mb-8">
                  {results.map((p, i) => (
                    <div
                      key={p.id}
                      className="rounded-2xl overflow-hidden card-hover bg-white border relative"
                      style={{ borderColor: "var(--mist)" }}
                    >
                      {i === 0 && (
                        <div
                          className="absolute top-0 left-0 right-0 text-white text-center text-xs font-bold py-2 z-10 tracking-wider"
                          style={{ background: "var(--gold)" }}
                        >
                          ⭐ MELHOR COMBINAÇÃO
                        </div>
                      )}
                      <div
                        className="img-zoom aspect-square mt-8"
                        style={{ background: "var(--cream)" }}
                      >
                        <Img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover mix-blend-multiply"
                        />
                      </div>
                      <div className="p-5 border-t border-gray-100">
                        <p
                          className="text-xs font-semibold tracking-wide mb-0.5"
                          style={{ color: "var(--gold)" }}
                        >
                          {p.brand}
                        </p>
                        <h3 className="font-semibold mb-2 text-sm">{p.name}</h3>
                        <p
                          className="font-display text-2xl font-semibold mb-4"
                          style={{ color: "var(--forest)" }}
                        >
                          €{p.price}
                        </p>
                        <button
                          onClick={() => addCart(p)}
                          className="w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all text-white"
                          style={{ background: "var(--forest)" }}
                        >
                          <ShoppingBag size={14} /> Reservar na Loja
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
                  <button
                    onClick={openBook}
                    className="text-white px-8 py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                    style={{ background: "var(--forest)" }}
                  >
                    <Calendar size={15} /> Agendar Visita
                  </button>
                  <button
                    onClick={reset}
                    className="bg-white border text-black px-8 py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:bg-gray-50"
                    style={{ borderColor: "var(--mist)" }}
                  >
                    <ArrowRight size={15} className="rotate-180" /> Refazer Quiz
                  </button>
                </div>
              </div>
            )}

            {step > 1 && step <= 8 && (
              <div
                className="mt-16 text-center border-t pt-8"
                style={{ borderColor: "var(--mist)" }}
              >
                <button
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-black transition-all"
                >
                  <ChevronRight size={14} className="rotate-180" /> Voltar
                </button>
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
                img: "https://images.unsplash.com/photo-1589821540306-0391ab1a1200?w=600&h=400&fit=crop",
              },
              {
                icon: Calendar,
                title: "Cofidis Pay",
                desc: "Uma solução de pagamentos 100% digital e segura. Controle as suas despesas com total flexibilidade e sem burocracias.",
                highlight: "Até 12x Sem Juros",
                img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
              },
              {
                icon: MapPin,
                title: "Óptica ao Domicílio",
                desc: "Deslocamo-nos para consertos de óculos, aquisição de lentes e aros ou entregas, num raio de 20km da nossa loja.",
                highlight: "Deslocação Gratuita",
                img: "https://images.unsplash.com/photo-1615592389070-bcc97e050475?w=600&h=400&fit=crop",
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
                img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
              },
              {
                icon: Phone,
                title: "App Óptica 13",
                desc: "A nossa aplicação tem tudo: Loja online, marcação de consultas, cartão de fidelização e sistema de Cashback.",
                highlight: "Instale já e ganhe vantagens",
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
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
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
  const AboutPage = () => (
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
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=1000&fit=crop"
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
              <span className="font-display text-4xl font-bold">1986</span>
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
            Temos 38 anos de especialização na ótica, totalmente focados em
            satisfazer as suas necessidades.
          </h2>

          <div
            className="mt-8 rounded-2xl overflow-hidden mx-auto shadow-lg border relative z-10"
            style={{ maxWidth: "800px", borderColor: "var(--mist)" }}
          >
            {/* NOTA: Substituir o SRC desta imagem pelo URL da fotografia real da vossa equipa */}
            <Img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&h=600&fit=crop"
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
  const ContactPage = () => {
    const [form, setForm] = useState({
      name: "",
      email: "",
      phone: "",
      msg: "",
    });
    const [sent, setSent] = useState(false);

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
                onClick={openBook}
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
                      onClick={() => setSent(true)}
                      className="btn-forest w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                    >
                      <Send size={15} /> Enviar Mensagem
                    </button>
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
  return (
    <>
      <FontStyle />
      <div
        className="min-h-screen"
        style={{ background: "var(--cream)", fontFamily: "Jost, sans-serif" }}
      >
        {showPromo && (
          <div
            className="relative z-[60] text-center py-2.5 px-6 text-sm font-medium"
            style={{ background: "var(--forest)", color: "var(--gold)" }}
          >
            <span style={{ color: "#e2e8f0" }}>🎁 Consulta de Optometria </span>
            <button
              onClick={openBook}
              className="underline font-semibold mx-1"
              style={{ color: "var(--gold)" }}
            >
              Gratuita esta semana
            </button>
            <span style={{ color: "#e2e8f0" }}> — Agende agora</span>
            <button
              onClick={() => setShowPromo(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
              style={{ color: "#e2e8f0" }}
            >
              <X size={14} />
            </button>
          </div>
        )}
        <Header />

        {page === "home" && <HomePage />}
        {page === "services" && <ServicesPage />}
        {page === "vantagens" && <VantagensPage />}
        {page === "men" && <CollectionPage gender="men" />}
        {page === "women" && <CollectionPage gender="women" />}
        {page === "quiz" && <QuizPage />}
        {page === "about" && <AboutPage />}
        {page === "contact" && <ContactPage />}
        {page === "terms" && <TermsPage />}

        <BookingModal isOpen={booking} onClose={() => setBooking(false)} />
        {cartOpen && (
          <CartDrawer
            cart={cart}
            onClose={() => setCartOpen(false)}
            onRemove={removeFromCart}
            onQty={updateQty}
            onBook={() => {
              setCartOpen(false);
              openBook();
            }}
          />
        )}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAdd={addToCart}
            onBook={() => {
              setSelectedProduct(null);
              openBook();
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

        <Footer />
        <WhatsAppBtn />
        <CookieBanner />
      </div>
    </>
  );
}
