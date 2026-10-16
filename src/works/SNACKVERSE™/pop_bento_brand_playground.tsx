import React, { useState } from 'react';
import { 
  ShoppingBag, Sparkles, Flame, Disc, Lock, 
  Plus, Minus, RotateCcw, MousePointer, Star, Heart, Zap, 
  ArrowRight, Menu, X, Package, Utensils, ShieldCheck, Check, Info, Trash2
} from 'lucide-react';

// ==========================================
// GOOGLE FONTS & CUSTOM STYLES INJECTION
// ==========================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Permanent+Marker&family=Rubik+Bubbles&family=Silkscreen:wght@400;700&family=Space+Grotesk:wght@500;700&family=Syne:wght@700;800&family=Titan+One&display=swap');

    :root {
      --spring-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    body {
      overflow-x: hidden;
      user-select: none;
      font-family: 'Space Grotesk', sans-serif;
    }

    .font-bean { font-family: 'Titan One', cursive; letter-spacing: -0.02em; }
    .font-buffy { font-family: 'Rubik Bubbles', cursive; }
    .font-psico-serif { font-family: 'Instrument Serif', serif; }
    .font-psico-pixel { font-family: 'Silkscreen', monospace; }
    .font-script { font-family: 'Permanent Marker', cursive; }
    .font-syne { font-family: 'Syne', sans-serif; }

    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: flex;
      width: max-content;
      animation: marquee 24s linear infinite;
    }
    .animate-marquee:hover {
      animation-play-state: paused;
    }

    @keyframes floatSlow {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(3deg); }
    }
    .animate-float {
      animation: floatSlow 4s ease-in-out infinite;
    }

    @keyframes spinSlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      animation: spinSlow 14s linear infinite;
    }

    @keyframes popIn {
      0% { transform: scale(0) rotate(-25deg); opacity: 0; }
      70% { transform: scale(1.18) rotate(8deg); opacity: 1; }
      100% { transform: scale(1) rotate(var(--rot, 0deg)); opacity: 1; }
    }
    .animate-pop-in {
      animation: popIn 0.45s var(--spring-bounce) forwards;
    }

    @keyframes chomp {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(0.25); }
    }
    .animate-chomp {
      animation: chomp 0.28s ease-in-out 3;
    }

    .die-cut-shadow {
      filter: drop-shadow(0px 5px 0px rgba(17,17,17,0.85));
    }
    
    .bento-card {
      transition: transform 0.35s var(--spring-bounce), box-shadow 0.35s ease;
    }
    .bento-card:hover {
      transform: translateY(-4px);
    }

    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: #1a1a1a; }
    ::-webkit-scrollbar-thumb { background: #FF6AC2; border-radius: 99px; border: 2px solid #1a1a1a; }
  `}</style>
);

// ==========================================
// DIE-CUT SVG STICKER PACK (9 COLLECTIBLE STICKERS)
// ==========================================
const STICKER_CATALOG = [
  { id: 'random', name: 'Random Cycle', brand: 'all', bg: '#111111', accent: '#D4FF59' },
  { id: 'cool-bean', name: 'Cool Bean', brand: 'bean', bg: '#0038BA', accent: '#FFF394' },
  { id: 'buffy-bear', name: 'Buffy Chill Bear', brand: 'buffy', bg: '#D81E36', accent: '#FFD6E0' },
  { id: 'psico-girl', name: 'Spiky Anime Girl', brand: 'psico', bg: '#8C65F7', accent: '#FF6AC2' },
  { id: 'better-beans', name: 'Better Beans Seal', brand: 'bean', bg: '#FF2E17', accent: '#FFF394' },
  { id: 'cookie-area', name: 'Cookie Protected', brand: 'buffy', bg: '#FFD6E0', accent: '#3A1414' },
  { id: 'tamagotchi', name: 'Y2K Tamagotchi', brand: 'psico', bg: '#FF6AC2', accent: '#D4FF59' },
  { id: 'heart-lock', name: 'Pixel Heart Lock', brand: 'psico', bg: '#8C65F7', accent: '#FAF6F0' },
  { id: 'disco-ball', name: 'Cyber Disco Ball', brand: 'psico', bg: '#D4FF59', accent: '#1E1035' },
  { id: 'crunch-bolt', name: '110% Crunch Bolt', brand: 'bean', bg: '#FFF394', accent: '#0038BA' }
];

const DieCutStickerSVG = ({ type, className = "w-24 h-24" }) => {
  switch (type) {
    case 'cool-bean':
      return (
        <svg viewBox="0 0 120 120" className={`${className} die-cut-shadow overflow-visible`}>
          <g stroke="#FFFFFF" strokeWidth="10" strokeLinejoin="round">
            <ellipse cx="60" cy="62" rx="36" ry="44" fill="#FFF394" />
          </g>
          <ellipse cx="60" cy="62" rx="36" ry="44" fill="#FFF394" stroke="#111" strokeWidth="4" />
          <path d="M26,42 Q60,26 94,42 L92,54 Q60,40 28,54 Z" fill="#0038BA" stroke="#111" strokeWidth="3.5" />
          <polygon points="28,52 56,48 54,66 30,68" fill="#111" stroke="#FFF" strokeWidth="2.5" />
          <polygon points="64,48 92,52 90,68 66,66" fill="#111" stroke="#FFF" strokeWidth="2.5" />
          <polygon points="40,52 36,60 44,60 39,66" fill="#FFF394" />
          <polygon points="76,52 72,60 80,60 75,66" fill="#FFF394" />
          <path d="M48,78 Q60,86 72,76" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'buffy-bear':
      return (
        <svg viewBox="0 0 120 120" className={`${className} die-cut-shadow overflow-visible`}>
          <g stroke="#FFFFFF" strokeWidth="10" strokeLinejoin="round">
            <circle cx="34" cy="34" r="14" fill="#FFF7F0" />
            <circle cx="86" cy="34" r="14" fill="#FFF7F0" />
            <ellipse cx="60" cy="64" rx="42" ry="36" fill="#FFF7F0" />
          </g>
          <circle cx="34" cy="34" r="14" fill="#FFF7F0" stroke="#3A1414" strokeWidth="4" />
          <circle cx="86" cy="34" r="14" fill="#FFF7F0" stroke="#3A1414" strokeWidth="4" />
          <ellipse cx="60" cy="64" rx="42" ry="36" fill="#FFF7F0" stroke="#3A1414" strokeWidth="4" />
          <rect x="26" y="48" width="30" height="18" rx="7" fill="#3A1414" />
          <rect x="64" y="48" width="30" height="18" rx="7" fill="#3A1414" />
          <line x1="56" y1="54" x2="64" y2="54" stroke="#3A1414" strokeWidth="4" />
          <ellipse cx="60" cy="74" rx="12" ry="8" fill="#FFD6E0" />
          <ellipse cx="60" cy="72" rx="5" ry="3.5" fill="#3A1414" />
          <circle cx="92" cy="84" r="16" fill="#D99B52" stroke="#3A1414" strokeWidth="3.5" />
          <circle cx="88" cy="80" r="2.5" fill="#3A1414" />
          <circle cx="96" cy="86" r="3" fill="#3A1414" />
        </svg>
      );
    case 'psico-girl':
      return (
        <svg viewBox="0 0 120 120" className={`${className} die-cut-shadow overflow-visible`}>
          <g stroke="#FFFFFF" strokeWidth="9" strokeLinejoin="round">
            <polygon points="60,10 74,32 104,22 92,50 114,68 88,80 96,106 68,94 60,114 52,94 24,106 32,80 6,68 28,50 16,22 46,32" fill="#FF6AC2" />
          </g>
          <polygon points="60,10 74,32 104,22 92,50 114,68 88,80 96,106 68,94 60,114 52,94 24,106 32,80 6,68 28,50 16,22 46,32" fill="#FF6AC2" stroke="#1E1035" strokeWidth="3.5" />
          <ellipse cx="60" cy="64" rx="28" ry="26" fill="#FAF0E6" stroke="#1E1035" strokeWidth="3.5" />
          <path d="M32,56 C32,32 60,34 60,48 C60,34 88,32 88,56 Z" fill="#18151C" />
          <circle cx="48" cy="64" r="4" fill="#18151C" />
          <circle cx="72" cy="64" r="4" fill="#18151C" />
          <path d="M54,76 Q60,82 66,76" fill="none" stroke="#18151C" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'better-beans':
      return (
        <svg viewBox="0 0 120 120" className={`${className} die-cut-shadow overflow-visible`}>
          <path 
            d="M60,6 L73,18 L90,12 L96,29 L113,35 L107,52 L116,66 L102,78 L104,95 L87,99 L79,114 L62,108 L48,116 L36,102 L19,104 L15,87 L4,79 L12,62 L6,46 L21,36 L20,19 L37,17 L47,6 L60,14 Z" 
            fill="#FF2E17" 
            stroke="#FFFFFF" 
            strokeWidth="6"
          />
          <text x="60" y="55" textAnchor="middle" fill="#FFF394" fontSize="16" className="font-bean" transform="rotate(-10 60 60)">BETTER</text>
          <text x="60" y="75" textAnchor="middle" fill="#FFFFFF" fontSize="16" className="font-bean" transform="rotate(-10 60 60)">BEANS!</text>
        </svg>
      );
    case 'cookie-area':
      return (
        <svg viewBox="0 0 120 120" className={`${className} die-cut-shadow overflow-visible`}>
          <rect x="12" y="18" width="96" height="84" rx="18" fill="#FFD6E0" stroke="#FFFFFF" strokeWidth="8" />
          <rect x="12" y="18" width="96" height="84" rx="18" fill="#FFD6E0" stroke="#3A1414" strokeWidth="4" />
          <text x="60" y="45" textAnchor="middle" fontSize="22">🐻‍❄️</text>
          <text x="60" y="68" textAnchor="middle" fill="#D81E36" fontSize="18" className="font-buffy">COOKIE</text>
          <text x="60" y="84" textAnchor="middle" fill="#3A1414" fontSize="9" fontWeight="900">PROTECTED AREA</text>
        </svg>
      );
    case 'tamagotchi':
      return (
        <svg viewBox="0 0 120 120" className={`${className} die-cut-shadow overflow-visible`}>
          <ellipse cx="60" cy="62" rx="44" ry="50" fill="#FF6AC2" stroke="#FFFFFF" strokeWidth="8" />
          <ellipse cx="60" cy="62" rx="44" ry="50" fill="#FF6AC2" stroke="#1E1035" strokeWidth="4" />
          <rect x="34" y="36" width="52" height="40" rx="8" fill="#D4FF59" stroke="#1E1035" strokeWidth="3.5" />
          <path d="M52,50 h6 v4 h4 v-4 h6 v6 h-4 v6 h-6 v4 h-2 v-4 h-6 v-6 h-4 v-6 z" fill="#8C65F7" />
          <circle cx="44" cy="92" r="5" fill="#D4FF59" stroke="#1E1035" strokeWidth="2.5" />
          <circle cx="60" cy="95" r="5" fill="#D4FF59" stroke="#1E1035" strokeWidth="2.5" />
          <circle cx="76" cy="92" r="5" fill="#D4FF59" stroke="#1E1035" strokeWidth="2.5" />
        </svg>
      );
    case 'heart-lock':
      return (
        <svg viewBox="0 0 120 120" className={`${className} die-cut-shadow overflow-visible`}>
          <g stroke="#FFFFFF" strokeWidth="8" strokeLinejoin="round">
            <path d="M42,50 L42,30 C42,14 78,14 78,30 L78,50" fill="none" />
            <path d="M60,46 C38,24 14,42 14,68 C14,92 60,110 60,114 C60,110 106,92 106,68 C106,42 82,24 60,46 Z" fill="#FF6AC2" />
          </g>
          <path d="M42,50 L42,30 C42,14 78,14 78,30 L78,50" fill="none" stroke="#1E1035" strokeWidth="6" />
          <path d="M60,46 C38,24 14,42 14,68 C14,92 60,110 60,114 C60,110 106,92 106,68 C106,42 82,24 60,46 Z" fill="#FF6AC2" stroke="#1E1035" strokeWidth="4" />
          <circle cx="60" cy="72" r="7" fill="#D4FF59" stroke="#1E1035" strokeWidth="3" />
          <polygon points="56,76 64,76 66,92 54,92" fill="#1E1035" />
        </svg>
      );
    case 'disco-ball':
      return (
        <svg viewBox="0 0 120 120" className={`${className} die-cut-shadow overflow-visible`}>
          <circle cx="60" cy="60" r="46" fill="#D4FF59" stroke="#FFFFFF" strokeWidth="8" />
          <circle cx="60" cy="60" r="46" fill="#D4FF59" stroke="#1E1035" strokeWidth="4" />
          <ellipse cx="60" cy="60" rx="22" ry="46" fill="none" stroke="#8C65F7" strokeWidth="3.5" />
          <line x1="14" y1="60" x2="106" y2="60" stroke="#8C65F7" strokeWidth="3.5" />
          <line x1="20" y1="38" x2="100" y2="38" stroke="#8C65F7" strokeWidth="3" />
          <line x1="20" y1="82" x2="100" y2="82" stroke="#8C65F7" strokeWidth="3" />
          <polygon points="60,42 65,55 78,60 65,65 60,78 55,65 42,60 55,55" fill="#FF6AC2" stroke="#1E1035" strokeWidth="2.5" />
        </svg>
      );
    default: // 'crunch-bolt'
      return (
        <svg viewBox="0 0 120 120" className={`${className} die-cut-shadow overflow-visible`}>
          <rect x="8" y="34" width="104" height="52" rx="26" fill="#FFF394" stroke="#FFFFFF" strokeWidth="8" />
          <rect x="8" y="34" width="104" height="52" rx="26" fill="#FFF394" stroke="#0038BA" strokeWidth="4" />
          <text x="60" y="66" textAnchor="middle" fill="#0038BA" fontSize="18" className="font-bean">⚡ 110% CRUNCH</text>
        </svg>
      );
  }
};

// ==========================================
// PRODUCT CATALOG WITH RICH NUTRITION & INGREDIENTS
// ==========================================
const PRODUCTS = [
  {
    id: 'bean-blue',
    brand: 'bean',
    name: 'COBALT CRUNCH POUCH',
    subtitle: 'Sea Salt & Electric Apple Cider Vinegar',
    price: 14,
    color: '#0038BA',
    secondary: '#FFF394',
    accent: '#9AE6B4',
    badge: '14G PLANT PROTEIN',
    tags: ['High Protein', 'Savory & Tangy', 'Late Night Study'],
    description: 'Air-popped whole fava & lupini beans tumbled in flaky Mediterranean sea salt and a sharp electric zing of apple cider vinegar. All the loud kettle-chip crunch with 3x the protein and zero greasy fingers.',
    ingredients: ['Roasted Fava Beans', 'Lupini Bean Protein', 'Apple Cider Vinegar Powder', 'Sea Salt', 'High-Oleic Sunflower Oil'],
    nutrition: { serving: '1 Bag (50g)', calories: 170, protein: '14g', fiber: '8g', sugar: '1g', fat: '4.5g' },
    stats: { label1: 'CRUNCH LEVEL', val1: '110%', label2: 'PLANT PROTEIN', val2: '14G', label3: 'NET CARBS', val3: '9G' },
    type: 'pouch'
  },
  {
    id: 'bean-pink',
    brand: 'bean',
    name: 'BUBBLEGUM SRIRACHA',
    subtitle: 'Sweet Heat Roasted Fava & Edamame',
    price: 15,
    color: '#FF9CE9',
    secondary: '#0038BA',
    accent: '#FFF394',
    badge: 'SWEET HEAT HIT',
    tags: ['High Protein', 'Spicy Kick', 'Late Night Study'],
    description: 'Don’t let the pink bag fool you—these crispy roasted edamame & fava puffs pack a caramelized coconut-sugar glaze followed by a fiery red jalapeno sriracha kick.',
    ingredients: ['Crispy Fava Beans', 'Roasted Green Edamame', 'Red Jalapeño Sriracha', 'Organic Coconut Nectar', 'Garlic & Onion'],
    nutrition: { serving: '1 Bag (50g)', calories: 180, protein: '14g', fiber: '7g', sugar: '3g', fat: '5g' },
    stats: { label1: 'SPICE KICK', val1: '85%', label2: 'PLANT PROTEIN', val2: '14G', label3: 'SEROTONIN', val3: '100%' },
    type: 'pouch'
  },
  {
    id: 'bean-red',
    brand: 'bean',
    name: 'CRIMSON FUEGO PACK',
    subtitle: 'Smoky Chili Lime & Crispy Lupini',
    price: 16,
    color: '#FF2E17',
    secondary: '#FFF394',
    accent: '#0038BA',
    badge: 'FAN FAVORITE',
    tags: ['High Protein', 'Spicy Kick'],
    description: 'Rolled in real key-lime zest, smoked paprika, and guajillo chili pepper. Designed for extreme snackers who want red-finger intensity made from 100% clean ingredients.',
    ingredients: ['Whole Lupini Beans', 'Fava Crisps', 'Key Lime Juice Powder', 'Guajillo Chili', 'Smoked Sea Salt'],
    nutrition: { serving: '1 Bag (50g)', calories: 175, protein: '15g', fiber: '9g', sugar: '1g', fat: '4.5g' },
    stats: { label1: 'FIRE METER', val1: '99%', label2: 'FIBER BOOST', val2: '9G', label3: 'PROTEIN', val3: '15G' },
    type: 'pouch'
  },
  {
    id: 'buffy-bucket',
    brand: 'buffy',
    name: 'THE MINI COOKIE BUCKET',
    subtitle: 'Brown Butter & 70% Dark Fudge Drizzle',
    price: 22,
    color: '#D81E36',
    secondary: '#FFF7F0',
    accent: '#3A1414',
    badge: 'BESTSELLER BUCKET',
    tags: ['Sweet Tooth', 'Late Night Study'],
    description: '14 bite-sized soft-baked cookies crafted with 45-minute slow-simmered golden brown butter, flaky sea salt, and hand-piped ribbons of 70% Belgian dark chocolate.',
    ingredients: ['Cultured Brown Butter', '70% Belgian Dark Chocolate', 'Unbleached Pastry Flour', 'Dark Muscovado Sugar', 'Madagascar Vanilla Bean'],
    nutrition: { serving: '3 Mini Cookies (45g)', calories: 210, protein: '3g', fiber: '2g', sugar: '12g', fat: '11g' },
    stats: { label1: 'VIBE CHECK', val1: 'PASSED', label2: 'CHOCO DRIZZLE', val2: '70% DARK', label3: 'BAKED', val3: 'DAILY' },
    type: 'bucket'
  },
  {
    id: 'buffy-box',
    brand: 'buffy',
    name: 'VIP VIBE GIFT BOX',
    subtitle: '6x Quarter-Pound Stuffed Bakery Cookies',
    price: 28,
    color: '#B81428',
    secondary: '#FFD6E0',
    accent: '#3A1414',
    badge: 'GOOEY CORE',
    tags: ['Sweet Tooth', 'Gift Ready'],
    description: 'Six massive 4oz bakery cookies with molten espresso-fudge cores inside our signature red collector box. Pop in the microwave for 8 seconds for an instant bakery experience.',
    ingredients: ['Brown Butter', 'Espresso Ganache Core', 'Semi-Sweet Chocolate Chunks', 'Free-Range Eggs', 'Flaky Maldon Sea Salt'],
    nutrition: { serving: '1/2 Giant Cookie (56g)', calories: 250, protein: '4g', fiber: '2g', sugar: '15g', fat: '13g' },
    stats: { label1: 'GOOEY CORE', val1: '100%', label2: 'WARM TIME', val2: '8 SECS', label3: 'WEIGHT', val3: '24 OZ' },
    type: 'box'
  },
  {
    id: 'buffy-pink',
    brand: 'buffy',
    name: 'STRAWBERRY MILKSHAKE TIN',
    subtitle: 'Freeze-Dried Berry & White Choco Crunch',
    price: 24,
    color: '#FF85A2',
    secondary: '#3A1414',
    accent: '#FFF7F0',
    badge: 'LIMITED DROP',
    tags: ['Sweet Tooth'],
    description: 'Real freeze-dried Oregon strawberries folded into a whipped vanilla-bean cookie dough with caramelized white chocolate chunks.',
    ingredients: ['Freeze-Dried Strawberries', 'Caramelized White Chocolate', 'Sweet Cream Butter', 'Vanilla Bean Paste', 'Beetroot Tint'],
    nutrition: { serving: '3 Mini Cookies (45g)', calories: 200, protein: '3g', fiber: '2g', sugar: '13g', fat: '10g' },
    stats: { label1: 'REAL BERRY', val1: '100%', label2: 'SWEET SPOT', val2: '95%', label3: 'TIN', val3: 'REUSABLE' },
    type: 'bucket'
  },
  {
    id: 'psico-tumbler',
    brand: 'psico',
    name: 'PSICO SWIRL 40oz MEGA CUP',
    subtitle: 'Double-Wall Stainless Insulated Tumbler',
    price: 38,
    color: '#FF6AC2',
    secondary: '#8C65F7',
    accent: '#D4FF59',
    badge: '48-HR ICE COLD',
    tags: ['Y2K Collectibles', 'Late Night Study'],
    description: 'Keep your iced matcha or late-night cold brew freezing for 48 hours straight. Features our Cup-Holder Friendly tapered base, reusable silicone-tip straw, and baked-on Y2K lava-web art.',
    ingredients: ['18/8 Food-Grade Stainless Steel', 'Copper-Lined Vacuum Insulation', 'BPA-Free Splash-Proof Lid', 'Bonus Room 013 Charm'],
    nutrition: { serving: 'Capacity: 40 fl oz (1.18L)', calories: 0, protein: '0g', fiber: '0g', sugar: '0g', fat: '0g' },
    stats: { label1: 'ICE RETENTION', val1: '48 HRS', label2: 'HOT DRINKS', val2: '12 HRS', label3: 'CAPACITY', val3: '40 OZ' },
    type: 'tumbler'
  },
  {
    id: 'psico-bottle',
    brand: 'psico',
    name: 'CAOTIC 32oz HYDRO FLASK',
    subtitle: 'Lavender Matte Bottle + Neon Carabiner',
    price: 32,
    color: '#8C65F7',
    secondary: '#D4FF59',
    accent: '#FF6AC2',
    badge: 'INCLUDES STICKERS',
    tags: ['Y2K Collectibles', 'Gift Ready'],
    description: 'Wide-mouth chug bottle in soft-touch lavender with an acid-green backpack carabiner clip and a waterproof vinyl sticker pack so you can customize your bottle.',
    ingredients: ['Double-Wall Stainless Steel', 'Leakproof Chug Cap', 'Anodized Aluminum Carabiner', '10x Waterproof Vinyl Stickers'],
    nutrition: { serving: 'Capacity: 32 fl oz (946mL)', calories: 0, protein: '0g', fiber: '0g', sugar: '0g', fat: '0g' },
    stats: { label1: 'LEAKPROOF', val1: '100%', label2: 'STICKERS', val2: '10 PCS', label3: 'CARABINER', val3: 'INCLUDED' },
    type: 'bottle'
  },
  {
    id: 'psico-keychain',
    brand: 'psico',
    name: 'ROOM 013 TAMAGOTCHI BUNDLE',
    subtitle: 'Working Mini LCD Virtual Pet + 4 Charms',
    price: 19,
    color: '#D4FF59',
    secondary: '#1E1035',
    accent: '#FF6AC2',
    badge: 'WORKING MINI GAME',
    tags: ['Y2K Collectibles', 'Gift Ready'],
    description: 'Clip-on nostalgia for your bag or tumbler handle! Includes a playable 8-bit pixel pet keychain, puffy white bunny charm, Room 013 motel tag, and pink heart padlock.',
    ingredients: ['Working LCD Pixel Pet (Battery Included)', 'Acrylic Room 013 Tag', 'Enamel Bunny & Heart Lock', 'Heavy-Duty Clasp'],
    nutrition: { serving: '5-Piece Keychain Cluster', calories: 0, protein: '0g', fiber: '0g', sugar: '0g', fat: '0g' },
    stats: { label1: 'CHARM COUNT', val1: '5 PCS', label2: 'PIXEL PET', val2: 'PLAYABLE', label3: 'VIBE', val3: 'Y2K PEAK' },
    type: 'charm'
  }
];

// ==========================================
// CUSTOM MASCOT & PACKAGING SVG COMPONENTS
// ==========================================
const CoolBeanMascot = ({ mousePos, onClick, isJumping }) => {
  const eyeX = Math.max(-5, Math.min(5, (mousePos.x - 0.5) * 14));
  const eyeY = Math.max(-4, Math.min(4, (mousePos.y - 0.5) * 12));

  return (
    <svg 
      onClick={onClick}
      viewBox="0 0 240 290" 
      className={`w-full h-full cursor-pointer select-none die-cut-shadow transition-transform duration-300 ${isJumping ? '-translate-y-6 scale-110 rotate-6' : 'hover:scale-105'}`}
    >
      <g stroke="#FFFFFF" strokeWidth="14" strokeLinejoin="round" strokeLinecap="round">
        <path d="M75,45 C135,25 185,65 180,145 C175,210 130,225 85,205 C40,185 35,130 50,85 C58,60 65,50 75,45 Z" fill="#FFF394" />
      </g>
      <path d="M95,200 L115,255" stroke="#111" strokeWidth="12" strokeLinecap="round" />
      <path d="M135,200 L110,255" stroke="#111" strokeWidth="12" strokeLinecap="round" />
      <g transform="translate(72, 240)">
        <rect x="0" y="0" width="32" height="22" rx="10" fill="#FFF" stroke="#111" strokeWidth="4"/>
        <path d="M5,12 L25,12" stroke="#0038BA" strokeWidth="5" strokeLinecap="round"/>
      </g>
      <g transform="translate(105, 248)">
        <rect x="0" y="0" width="38" height="20" rx="9" fill="#FFF" stroke="#111" strokeWidth="4"/>
        <rect x="8" y="5" width="18" height="8" rx="3" fill="#0038BA"/>
      </g>
      <path d="M75,45 C135,25 185,65 180,145 C175,210 130,225 85,205 C40,185 35,130 50,85 C58,60 65,50 75,45 Z" fill="#FFF394" stroke="#111111" strokeWidth="4.5" />
      <path d="M65,160 C80,195 140,205 165,165" fill="none" stroke="#E6D250" strokeWidth="6" strokeLinecap="round" />
      <path d="M35,85 C20,85 10,100 12,115 C25,112 35,105 42,95" fill="#0038BA" stroke="#111" strokeWidth="4" />
      <path d="M44,82 C75,52 135,45 168,68 C172,82 172,92 168,96 C130,74 75,80 42,104 Z" fill="#0038BA" stroke="#111" strokeWidth="4.5" />
      <g transform={`translate(${eyeX}, ${eyeY})`}>
        <polygon points="48,108 102,96 98,132 54,138" fill="#FFFFFF" stroke="#111" strokeWidth="4" strokeLinejoin="round"/>
        <polygon points="56,113 94,104 91,126 60,131" fill="#111111"/>
        <polygon points="72,107 66,120 75,119 70,129 84,115 75,116" fill="#FFF394"/>
        <path d="M100,106 L112,103" stroke="#111" strokeWidth="5"/>
        <polygon points="108,95 160,86 155,122 112,128" fill="#FFFFFF" stroke="#111" strokeWidth="4" strokeLinejoin="round"/>
        <polygon points="115,100 152,93 148,116 118,121" fill="#111111"/>
        <polygon points="132,96 126,109 135,108 130,118 144,104 135,105" fill="#FFF394"/>
      </g>
      <path d="M98,142 Q115,150 126,136" fill="none" stroke="#111" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M52,155 C75,180 145,175 172,148" fill="none" stroke="#111" strokeWidth="13" strokeLinecap="round" />
      <circle cx="70" cy="158" r="14" fill="#FFF" stroke="#111" strokeWidth="4" />
      <circle cx="152" cy="154" r="14" fill="#FFF" stroke="#111" strokeWidth="4" />
    </svg>
  );
};

const BuffyBearMascot = ({ mousePos, onClick, isTossing }) => {
  const eyeX = Math.max(-4, Math.min(4, (mousePos.x - 0.5) * 10));

  return (
    <svg 
      onClick={onClick}
      viewBox="0 0 280 250" 
      className="w-full h-full cursor-pointer select-none die-cut-shadow group"
    >
      <g stroke="#FFF7F0" strokeWidth="16" strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="145" cy="175" rx="95" ry="52" fill="#FFD6E0" />
        <circle cx="135" cy="85" r="52" fill="#FFF7F0" />
      </g>
      <ellipse cx="145" cy="178" rx="95" ry="50" fill="#FFB6C9" stroke="#3A1414" strokeWidth="4.5" />
      <path d="M68,165 Q145,195 222,162" fill="none" stroke="#3A1414" strokeWidth="3.5" strokeDasharray="6 6" />
      <circle cx="92" cy="50" r="16" fill="#FFF7F0" stroke="#3A1414" strokeWidth="4.5" />
      <circle cx="92" cy="50" r="8" fill="#FFD6E0" />
      <circle cx="176" cy="58" r="16" fill="#FFF7F0" stroke="#3A1414" strokeWidth="4.5" />
      <circle cx="176" cy="58" r="8" fill="#FFD6E0" />
      <path d="M168,118 C205,105 215,75 178,72" fill="#FFF7F0" stroke="#3A1414" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M82,125 C70,165 85,195 145,195 C185,195 198,165 182,125 Z" fill="#D81E36" stroke="#3A1414" strokeWidth="4.5" strokeLinejoin="round" />
      <text x="128" y="168" fill="#FFF7F0" fontSize="30" className="font-buffy" transform="rotate(-8 128 168)">B</text>
      <ellipse cx="134" cy="90" rx="52" ry="44" fill="#FFF7F0" stroke="#3A1414" strokeWidth="4.5" transform="rotate(6 134 90)" />
      <g transform={`translate(${eyeX}, 0) rotate(6 134 86)`}>
        <path d="M84,78 L184,78" stroke="#3A1414" strokeWidth="4.5" />
        <rect x="92" y="72" width="36" height="24" rx="10" fill="#4A2525" stroke="#3A1414" strokeWidth="4" />
        <rect x="138" y="72" width="36" height="24" rx="10" fill="#4A2525" stroke="#3A1414" strokeWidth="4" />
        <line x1="98" y1="78" x2="108" y2="88" stroke="#FFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <line x1="144" y1="78" x2="154" y2="88" stroke="#FFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      </g>
      <ellipse cx="132" cy="104" rx="14" ry="10" fill="#FFEAE5" />
      <ellipse cx="132" cy="101" rx="6" ry="4.5" fill="#3A1414" />
      <path d="M127,109 Q132,114 138,109" fill="none" stroke="#3A1414" strokeWidth="3" strokeLinecap="round" />
      <g transform="translate(55, 165) rotate(-20)">
        <ellipse cx="22" cy="22" rx="18" ry="24" fill="#FFF7F0" stroke="#3A1414" strokeWidth="4.5" />
        <circle cx="15" cy="12" r="3.5" fill="#3A1414" />
        <circle cx="23" cy="10" r="3.5" fill="#3A1414" />
        <circle cx="30" cy="14" r="3.5" fill="#3A1414" />
        <ellipse cx="22" cy="25" rx="7" ry="6" fill="#3A1414" />
      </g>
      <g transform="translate(105, 180) rotate(-15)">
        <ellipse cx="22" cy="22" rx="18" ry="24" fill="#FFF7F0" stroke="#3A1414" strokeWidth="4.5" />
        <circle cx="15" cy="12" r="3.5" fill="#3A1414" />
        <circle cx="23" cy="10" r="3.5" fill="#3A1414" />
        <circle cx="30" cy="14" r="3.5" fill="#3A1414" />
        <ellipse cx="22" cy="25" rx="7" ry="6" fill="#3A1414" />
      </g>
      <g className={`transition-all duration-500 ${isTossing ? '-translate-y-16 rotate-45 scale-125' : 'translate-y-0 group-hover:-translate-y-3'}`}>
        <circle cx="225" cy="75" r="24" fill="#D99B52" stroke="#3A1414" strokeWidth="4" />
        <path d="M206,68 Q225,60 244,72 M204,80 Q225,74 245,84" fill="none" stroke="#3A1414" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="218" cy="65" r="3.5" fill="#3A1414" />
        <circle cx="234" cy="78" r="4" fill="#3A1414" />
        <circle cx="216" cy="86" r="3" fill="#3A1414" />
      </g>
    </svg>
  );
};

const PsicoGirlMascot = ({ mousePos, mood = 'cute', onClick }) => {
  const eyeX = Math.max(-5, Math.min(5, (mousePos.x - 0.5) * 14));
  const eyeY = Math.max(-3, Math.min(3, (mousePos.y - 0.5) * 10));

  return (
    <svg 
      onClick={onClick}
      viewBox="0 0 280 280" 
      className="w-full h-full cursor-pointer select-none group"
    >
      <path 
        d="M140,12 C152,12 162,58 175,62 C188,66 232,35 242,45 C252,55 215,98 220,112 C225,126 272,135 272,148 C272,162 222,175 218,188 C214,200 248,242 238,252 C228,262 185,225 172,230 C160,235 152,272 138,272 C124,272 115,232 102,228 C90,224 48,258 38,248 C28,238 65,196 60,184 C55,172 10,160 10,146 C10,132 58,122 62,110 C66,98 32,52 42,42 C52,32 95,66 108,62 C120,58 128,12 140,12 Z" 
        fill="#FAF6F0" 
        stroke="#FF6AC2"
        strokeWidth="3"
        className="transition-transform duration-500 group-hover:scale-105 origin-center"
      />
      <polygon points="82,110 30,85 52,118 22,132 62,142 38,165 80,152" fill="#18151C" stroke="#18151C" strokeWidth="3" strokeLinejoin="round" />
      <polygon points="198,110 250,85 228,118 258,132 218,142 242,165 200,152" fill="#18151C" stroke="#18151C" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="76" cy="175" r="14" fill="#FAF0E6" stroke="#18151C" strokeWidth="3.5" />
      <circle cx="74" cy="186" r="8" fill="none" stroke="#FF6AC2" strokeWidth="4" />
      <circle cx="204" cy="175" r="14" fill="#FAF0E6" stroke="#18151C" strokeWidth="3.5" />
      <circle cx="206" cy="186" r="8" fill="none" stroke="#FF6AC2" strokeWidth="4" />
      <path d="M82,125 C82,205 112,225 140,225 C168,225 198,205 198,125 C198,90 82,90 82,125 Z" fill="#FAF0E6" stroke="#18151C" strokeWidth="4" />
      <ellipse cx="102" cy="182" rx="14" ry="8" fill="#FFB3D9" opacity="0.7" />
      <ellipse cx="178" cy="182" rx="14" ry="8" fill="#FFB3D9" opacity="0.7" />
      <g transform={`translate(${eyeX}, ${eyeY})`}>
        <path d="M92,162 Q110,152 124,164" fill="none" stroke="#18151C" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M90,160 L83,154 M96,157 L92,150" stroke="#18151C" strokeWidth="3" strokeLinecap="round" />
        <circle cx="110" cy="164" r="6.5" fill="#18151C" />
        <circle cx="108" cy="162" r="2" fill="#FFF" />
        <path d="M156,164 Q170,152 188,162" fill="none" stroke="#18151C" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M190,160 L197,154 M184,157 L188,150" stroke="#18151C" strokeWidth="3" strokeLinecap="round" />
        <circle cx="170" cy="164" r="6.5" fill="#18151C" />
        <circle cx="168" cy="162" r="2" fill="#FFF" />
        <path d="M94,146 L124,152" stroke="#18151C" strokeWidth="4" strokeLinecap="round" />
        <path d="M186,146 L156,152" stroke="#18151C" strokeWidth="4" strokeLinecap="round" />
      </g>
      <circle cx="104" cy="176" r="2" fill="#18151C" />
      <circle cx="176" cy="176" r="2" fill="#18151C" />
      <path d="M136,182 Q140,186 144,182" fill="none" stroke="#18151C" strokeWidth="2.5" strokeLinecap="round" />
      {mood === 'cute' && (
        <g>
          <path d="M130,202 Q140,197 150,202 Q140,210 130,202 Z" fill="#18151C" stroke="#18151C" strokeWidth="2" />
          <path d="M134,204 Q140,207 146,204" stroke="#FF6AC2" strokeWidth="2" fill="none" />
        </g>
      )}
      {mood === 'overwhelmed' && (
        <path d="M128,204 Q134,198 140,204 Q146,210 152,204" fill="none" stroke="#18151C" strokeWidth="3.5" strokeLinecap="round" />
      )}
      {mood === 'chaotic' && (
        <path d="M126,198 L154,198 L140,214 Z" fill="#FF6AC2" stroke="#18151C" strokeWidth="3" strokeLinejoin="round" />
      )}
      <path d="M78,145 C78,92 138,88 140,115 C142,88 202,92 202,145 C185,125 155,118 140,102 C125,118 95,125 78,145 Z" fill="#18151C" />
      <line x1="140" y1="92" x2="140" y2="112" stroke="#FAF0E6" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="82,95 86,105 96,105 88,111 91,121 82,115 73,121 76,111 68,105 78,105" fill="#8C65F7" stroke="#18151C" strokeWidth="2" />
      <polygon points="198,95 202,105 212,105 204,111 207,121 198,115 189,121 192,111 184,105 194,105" fill="#8C65F7" stroke="#18151C" strokeWidth="2" />
      <rect x="92" y="124" width="14" height="7" rx="3" fill="#FF6AC2" stroke="#18151C" strokeWidth="2" transform="rotate(-25 92 124)" />
      <rect x="174" y="120" width="14" height="7" rx="3" fill="#FF6AC2" stroke="#18151C" strokeWidth="2" transform="rotate(25 174 120)" />
    </svg>
  );
};

const Y2KTamagotchiCluster = ({ petState, onFeed, onDisco, onMoodToggle }) => (
  <div className="relative w-full h-full flex flex-col items-center justify-center p-2">
    <svg viewBox="0 0 360 320" className="w-full h-full max-h-[310px] overflow-visible select-none die-cut-shadow">
      <g className="animate-float" style={{ transformOrigin: '115px 95px' }}>
        <path 
          d="M85,85 C72,30 92,12 105,20 C115,28 112,68 115,82 C125,80 135,82 142,86 C158,42 182,25 192,38 C202,52 175,85 162,102 C178,118 175,148 152,162 C125,175 82,168 68,145 C55,122 68,95 85,85 Z" 
          fill="#FAF6F0" 
          stroke="#FF9CE9" 
          strokeWidth="5" 
          strokeLinejoin="round"
        />
        <ellipse cx="96" cy="54" rx="7" ry="22" fill="#FFB3D9" transform="rotate(-8 96 54)" />
        <ellipse cx="168" cy="64" rx="7" ry="22" fill="#FFB3D9" transform="rotate(26 168 64)" />
        <ellipse cx="98" cy="118" rx="6" ry="9" fill="#FF6AC2" />
        <ellipse cx="142" cy="124" rx="6" ry="9" fill="#FF6AC2" />
        <path d="M114,132 L124,142 M124,132 L114,142" stroke="#FF6AC2" strokeWidth="4" strokeLinecap="round" />
        <polygon points="160,72 164,80 172,82 164,85 162,93 158,85 150,82 158,80" fill="#8C65F7" />
      </g>
      <g fill="#D8B4FE" stroke="#8C65F7" strokeWidth="2">
        <circle cx="185" cy="70" r="6" />
        <circle cx="198" cy="62" r="6" />
        <circle cx="212" cy="56" r="6" />
        <circle cx="228" cy="54" r="6" />
        <circle cx="244" cy="58" r="6" />
        <circle cx="256" cy="68" r="6" />
        <circle cx="262" cy="82" r="6" />
      </g>
      <g transform="translate(195, 72) rotate(-10)">
        <ellipse cx="75" cy="90" rx="66" ry="82" fill="#FF85C8" stroke="#D63384" strokeWidth="4" />
        <ellipse cx="62" cy="72" rx="48" ry="60" fill="#FFA6D8" opacity="0.45" />
        <polygon points="32,58 78,42 120,68 106,118 52,128 24,95" fill="#8C65F7" stroke="#5B37B7" strokeWidth="3" />
        <polygon points="40,64 78,50 110,72 98,110 56,118 34,92" fill="#D4FF59" />
        {petState === 'heart' && (
          <g transform="translate(52, 68)">
            <path d="M8,6 h8 v4 h8 v-4 h8 v6 h4 v8 h-4 v6 h-6 v6 h-6 v4 h-4 v-4 h-6 v-6 h-6 v-6 h-4 v-8 h4 z" fill="#8C65F7" />
            <path d="M12,10 h4 v4 h8 v-4 h4 v4 h2 v6 h-4 v6 h-6 v4 h-4 v-4 h-6 v-6 h-4 v-6 h2 z" fill="#FAF6F0" />
          </g>
        )}
        {petState === 'disco' && (
          <g transform="translate(56, 68)">
            <circle cx="18" cy="18" r="15" fill="#FF6AC2" stroke="#1E1035" strokeWidth="3" />
            <line x1="3" y1="18" x2="33" y2="18" stroke="#1E1035" strokeWidth="2" />
            <line x1="18" y1="3" x2="18" y2="33" stroke="#1E1035" strokeWidth="2" />
            <polygon points="18,8 21,15 28,18 21,21 18,28 15,21 8,18 15,15" fill="#FAF6F0" />
          </g>
        )}
        {petState === 'chaotic' && (
          <g transform="translate(52, 68)">
            <text x="2" y="24" fill="#1E1035" fontSize="15" className="font-psico-pixel font-bold">X_X</text>
            <text x="0" y="38" fill="#FF2E17" fontSize="9" className="font-psico-pixel">99% MESS</text>
          </g>
        )}
        <g className="cursor-pointer" onClick={(e) => { e.stopPropagation(); onFeed(); }}>
          <circle cx="48" cy="146" r="10" fill="#D4FF59" stroke="#1E1035" strokeWidth="3" className="hover:scale-125 transition-transform origin-center" />
        </g>
        <g className="cursor-pointer" onClick={(e) => { e.stopPropagation(); onDisco(); }}>
          <circle cx="76" cy="152" r="10" fill="#D4FF59" stroke="#1E1035" strokeWidth="3" className="hover:scale-125 transition-transform origin-center" />
        </g>
        <g className="cursor-pointer" onClick={(e) => { e.stopPropagation(); onMoodToggle(); }}>
          <circle cx="104" cy="144" r="10" fill="#D4FF59" stroke="#1E1035" strokeWidth="3" className="hover:scale-125 transition-transform origin-center" />
        </g>
      </g>
      <g transform="translate(105, 175)">
        <rect x="65" y="0" width="22" height="42" rx="11" fill="none" stroke="#2D2338" strokeWidth="6" />
        <g transform="translate(5, 48)">
          <circle cx="28" cy="28" r="24" fill="#D4FF59" stroke="#8C65F7" strokeWidth="2.5" />
          <ellipse cx="28" cy="28" rx="12" ry="24" fill="none" stroke="#8C65F7" strokeWidth="2" />
          <line x1="4" y1="20" x2="52" y2="20" stroke="#8C65F7" strokeWidth="2" />
          <line x1="4" y1="36" x2="52" y2="36" stroke="#8C65F7" strokeWidth="2" />
        </g>
        <g transform="translate(52, 42) rotate(12)">
          <path d="M18,0 L42,0 L56,18 L56,92 C56,100 48,106 40,106 L20,106 C12,106 4,100 4,92 L4,18 Z" fill="#FF85C8" stroke="#E0529C" strokeWidth="2.5" />
          <circle cx="30" cy="14" r="5" fill="#FAF6F0" />
          <text x="30" y="38" textAnchor="middle" fill="#1E1035" fontSize="9" fontWeight="bold">ROOM</text>
          <text x="30" y="54" textAnchor="middle" fill="#1E1035" fontSize="16" fontWeight="900">013</text>
          <text x="30" y="70" textAnchor="middle" fill="#1E1035" fontSize="6.5" fontWeight="bold">CUTE BUT</text>
          <text x="30" y="79" textAnchor="middle" fill="#1E1035" fontSize="6.5" fontWeight="bold">OVERWHELMED</text>
        </g>
        <g transform="translate(128, 22) rotate(-14)">
          <path d="M25,45 L25,22 C25,5 65,5 65,22 L65,45" fill="none" stroke="#F3D1E4" strokeWidth="12" strokeLinecap="round" />
          <path d="M25,45 L25,22 C25,5 65,5 65,22 L65,45" fill="none" stroke="#D63384" strokeWidth="2.5" />
          <path d="M45,42 C25,22 0,38 0,62 C0,88 45,112 45,118 C45,112 90,88 90,62 C90,38 65,22 45,42 Z" fill="#FF6AC2" stroke="#D63384" strokeWidth="3" />
          <circle cx="45" cy="72" r="7" fill="#1E1035" />
          <polygon points="41,75 49,75 52,92 38,92" fill="#1E1035" />
        </g>
      </g>
    </svg>
    <div className="mt-1 flex items-center gap-2 bg-[#1E1035] text-[#FAF6F0] px-3 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-md">
      <span className="w-2 h-2 rounded-full bg-[#D4FF59] animate-ping" />
      <span>PRESS TAMA BUTTONS:</span>
      <button onClick={onFeed} className="text-[#FF6AC2] hover:underline">HEART</button>•
      <button onClick={onDisco} className="text-[#D4FF59] hover:underline">DISCO</button>•
      <button onClick={onMoodToggle} className="text-[#8C65F7] hover:underline">CHAOS</button>
    </div>
  </div>
);

const ProductGraphic = ({ product, isHovered }) => {
  if (product.type === 'pouch') {
    return (
      <svg viewBox="0 0 220 260" className={`w-44 h-52 overflow-visible transition-transform duration-500 ${isHovered ? 'scale-110 -rotate-6' : 'rotate-2'}`}>
        <g className={`transition-all duration-500 ${isHovered ? 'opacity-100 -translate-y-6' : 'opacity-0 translate-y-4'}`}>
          <ellipse cx="35" cy="40" rx="14" ry="10" fill="#FFF394" stroke="#111" strokeWidth="3" transform="rotate(-25 35 40)" />
          <ellipse cx="185" cy="35" rx="15" ry="11" fill="#FFF394" stroke="#111" strokeWidth="3" transform="rotate(30 185 35)" />
          <ellipse cx="195" cy="190" rx="13" ry="9" fill="#FFF394" stroke="#111" strokeWidth="3" transform="rotate(15 195 190)" />
        </g>
        <path d="M35,25 L185,25 L195,235 L25,235 Z" fill={product.color} stroke="#111" strokeWidth="5" strokeLinejoin="round" />
        <rect x="32" y="18" width="156" height="14" fill={product.color} stroke="#111" strokeWidth="4" />
        <rect x="22" y="228" width="176" height="14" fill={product.color} stroke="#111" strokeWidth="4" />
        <path d="M48,40 L60,215" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.28" />
        <text x="110" y="62" textAnchor="middle" fill="#FFF" fontSize="13" className="font-bean">BEAN ME UP</text>
        <text x="110" y="102" textAnchor="middle" fill={product.secondary} fontSize="26" className="font-bean" stroke="#111" strokeWidth="1.5">SNACK</text>
        <text x="110" y="128" textAnchor="middle" fill={product.secondary} fontSize="24" className="font-bean" stroke="#111" strokeWidth="1.5">SMARTER.</text>
        <ellipse cx="115" cy="185" rx="28" ry="34" fill="#FFF394" stroke="#111" strokeWidth="4" />
        <path d="M90,168 Q115,158 140,168" stroke="#0038BA" strokeWidth="8" fill="none" />
        <rect x="96" y="172" width="16" height="10" fill="#111" />
        <rect x="118" y="172" width="16" height="10" fill="#111" />
        <circle cx="62" cy="165" r="22" fill={product.accent} stroke="#111" strokeWidth="3" />
        <text x="62" y="163" textAnchor="middle" fill="#111" fontSize="7" fontWeight="900">14G</text>
        <text x="62" y="172" textAnchor="middle" fill="#111" fontSize="7" fontWeight="900">PROTEIN</text>
      </svg>
    );
  }

  if (product.type === 'bucket' || product.type === 'box') {
    return (
      <svg viewBox="0 0 220 260" className={`w-44 h-52 overflow-visible transition-transform duration-500 ${isHovered ? 'scale-110 rotate-6' : '-rotate-2'}`}>
        <g className={`transition-transform duration-500 ${isHovered ? '-translate-y-4 scale-105' : ''}`}>
          <circle cx="82" cy="68" r="32" fill="#D99B52" stroke="#3A1414" strokeWidth="4.5" />
          <path d="M56,60 Q82,50 108,65 M54,74 Q82,66 110,78" stroke="#3A1414" strokeWidth="4" fill="none" />
          <circle cx="138" cy="64" r="34" fill="#C9883E" stroke="#3A1414" strokeWidth="4.5" />
          <path d="M112,54 Q138,44 164,58 M110,68 Q138,60 166,72" stroke="#3A1414" strokeWidth="4" fill="none" />
          <circle cx="110" cy="48" r="28" fill="#E3A862" stroke="#3A1414" strokeWidth="4.5" />
          <circle cx="102" cy="42" r="4" fill="#3A1414" />
          <circle cx="120" cy="48" r="4.5" fill="#3A1414" />
        </g>
        <polygon points="34,78 186,78 168,232 52,232" fill={product.color} stroke="#3A1414" strokeWidth="5" strokeLinejoin="round" />
        <rect x="26" y="68" width="168" height="16" rx="8" fill={product.color} stroke="#3A1414" strokeWidth="4.5" />
        <text x="110" y="152" textAnchor="middle" fill={product.secondary} fontSize="38" className="font-buffy" stroke="#3A1414" strokeWidth="2">BUFFY</text>
        <text x="110" y="178" textAnchor="middle" fill={product.secondary} fontSize="16" className="font-buffy">COOKIES</text>
        <rect x="60" y="198" width="100" height="18" rx="9" fill="#3A1414" />
        <text x="110" y="210" textAnchor="middle" fill="#FFF7F0" fontSize="8" fontWeight="bold" letterSpacing="1">{product.badge}</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 260" className={`w-44 h-52 overflow-visible transition-transform duration-500 ${isHovered ? 'scale-110 -rotate-3' : 'rotate-1'}`}>
      <polygon points="30,50 36,64 50,70 36,76 30,90 24,76 10,70 24,64" fill="#D4FF59" className="animate-pulse" />
      <polygon points="190,140 194,150 204,154 194,158 190,168 186,158 176,154 186,150" fill="#FF6AC2" />
      <rect x="98" y="8" width="12" height="55" rx="4" fill="#FF6AC2" stroke="#1E1035" strokeWidth="3.5" />
      <path d="M158,95 L188,95 C196,95 200,102 200,110 L200,175 C200,184 196,190 188,190 L152,190" fill="none" stroke={product.color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M158,95 L188,95 C196,95 200,102 200,110 L200,175 C200,184 196,190 188,190 L152,190" fill="none" stroke="#1E1035" strokeWidth="4" />
      <polygon points="48,55 162,55 150,235 60,235" fill={product.color} stroke="#1E1035" strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M52,90 Q105,130 158,85 M55,155 Q105,115 154,165 M58,205 Q105,175 150,215" fill="none" stroke={product.accent} strokeWidth="6" />
      <ellipse cx="105" cy="145" rx="38" ry="30" fill="#FAF6F0" stroke="#1E1035" strokeWidth="3.5" />
      <text x="105" y="143" textAnchor="middle" fill="#8C65F7" fontSize="22" className="font-psico-serif italic font-bold">Psico</text>
      <text x="105" y="161" textAnchor="middle" fill="#FF6AC2" fontSize="18" className="font-psico-pixel font-bold">mess</text>
      <rect x="42" y="45" width="126" height="16" rx="6" fill="#FAF6F0" stroke="#1E1035" strokeWidth="4" />
    </svg>
  );
};

// ==========================================
// MAIN SNACKVERSE D2C APPLICATION
// ==========================================
export default function App() {
  // 5 Consumer Pages: 'home' | 'shop' | 'bundle' | 'kitchen' | 'quiz'
  const [activePage, setActivePage] = useState('home');
  const [activeWorld, setActiveWorld] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Interactive Mascot States
  const [beanJumping, setBeanJumping] = useState(false);
  const [mouthChomping, setMouthChomping] = useState(false);
  const [beanQuoteIdx, setBeanQuoteIdx] = useState(0);
  const beanQuotes = [
    "THE BEAN HAS SPOKEN!",
    "14G PLANT PROTEIN!",
    "BEANS GOT UPGRADED!",
    "SNACK SMARTER BABY!"
  ];
  const [bearTossing, setBearTossing] = useState(false);
  const [buffyCrunchPop, setBuffyCrunchPop] = useState(false);
  const [tamaState, setTamaState] = useState('heart');
  const [girlMood, setGirlMood] = useState('cute');

  // Interactive Hotspot State ("What's Inside The Bag?")
  const [activeHotspot, setActiveHotspot] = useState(0);

  // UPGRADED STICKER SLAP MODE STATES
  const [slapMode, setSlapMode] = useState(false);
  const [selectedStickerType, setSelectedStickerType] = useState('random');
  const [slappedStickers, setSlappedStickers] = useState([]);
  const [randomCursorIdx, setRandomCursorIdx] = useState(0);

  // Psico Mess Highlight Modal & Wheel
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [wheelAngle, setWheelAngle] = useState(0);
  const [wheelPrize, setWheelPrize] = useState(null);

  // Shop Page States
  const [productFilter, setProductFilter] = useState('all');
  const [cravingTag, setCravingTag] = useState('All');
  const [packMultiplier, setPackMultiplier] = useState(1); // 1 = Single, 6 = 6-Pack (-10%), 12 = 12-Pack (-15%)
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Build-A-Box Bundle States
  const [boxSize, setBoxSize] = useState(4); // 4, 8, or 12 items
  const [bundleItems, setBundleItems] = useState([PRODUCTS[0], PRODUCTS[1], PRODUCTS[3], PRODUCTS[6]]);

  // Inside The Kitchen FAQ Accordion
  const [openFaq, setOpenFaq] = useState(0);

  // Craving Quiz States
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});

  // Cart State
  const [cart, setCart] = useState([
    { ...PRODUCTS[0], qty: 1 },
    { ...PRODUCTS[3], qty: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const handleMouseMove = (e) => {
    setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight
    });
  };

  // Upgraded Sticker Slap Click Handler
  const handleCanvasClick = (e) => {
    if (!slapMode) return;
    if (
      e.target.closest('button') || 
      e.target.closest('nav') || 
      e.target.closest('.sticker-dock') ||
      e.target.closest('.modal-card')
    ) return;

    const nonRandomStickers = STICKER_CATALOG.filter(s => s.id !== 'random');
    let chosenType = selectedStickerType;
    if (selectedStickerType === 'random') {
      chosenType = nonRandomStickers[randomCursorIdx % nonRandomStickers.length].id;
      setRandomCursorIdx(prev => prev + 1);
    }

    const rot = Math.floor(Math.random() * 46) - 23;
    setSlappedStickers(prev => [
      ...prev.slice(-24),
      {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY + window.scrollY,
        rot,
        type: chosenType
      }
    ]);
  };

  const triggerBeanAction = () => {
    setBeanJumping(true);
    setMouthChomping(true);
    setBeanQuoteIdx((prev) => (prev + 1) % beanQuotes.length);
    showToast("⚡ THE BEAN HAS SPOKEN: 14G PLANT PROTEIN CRUNCH!");
    setTimeout(() => setBeanJumping(false), 550);
    setTimeout(() => setMouthChomping(false), 900);
  };

  const triggerBearAction = () => {
    setBearTossing(true);
    setBuffyCrunchPop(true);
    showToast("🍪 BUFFY BEAR TOSSED YOU A WARM BROWN BUTTER COOKIE!");
    setTimeout(() => setBearTossing(false), 650);
    setTimeout(() => setBuffyCrunchPop(false), 1100);
  };

  const addToCart = (product, customPrice = null, customSuffix = '') => {
    const finalPrice = customPrice || product.price;
    const finalId = customSuffix ? `${product.id}-${customSuffix}` : product.id;
    const finalName = customSuffix ? `${product.name} (${customSuffix})` : product.name;

    setCart(prev => {
      const exists = prev.find(item => item.id === finalId);
      if (exists) {
        return prev.map(item => item.id === finalId ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, id: finalId, name: finalName, price: finalPrice, qty: 1 }];
    });
    showToast(`✨ ADDED "${finalName}" TO YOUR BAG!`);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev
      .map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
      .filter(item => item.qty > 0)
    );
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const freeShipProgress = Math.min(100, Math.round((cartTotal / 35) * 100));

  const spinMysteryWheel = () => {
    const extraSpins = 1080 + Math.floor(Math.random() * 360);
    setWheelAngle(wheelAngle + extraSpins);
    setWheelPrize(null);
    setTimeout(() => {
      const prizes = [
        "FREE HOLOGRAPHIC STICKER PACK!",
        "20% OFF CODE: BEANMEUP20",
        "FREE MINI BUFFY BUCKET!",
        "ROOM 013 VIP KEYCHAIN UNLOCKED!"
      ];
      setWheelPrize(prizes[Math.floor(Math.random() * prizes.length)]);
    }, 1600);
  };

  // Filtered Shop Catalog
  const displayedProducts = PRODUCTS.filter(p => {
    const brandMatch = productFilter === 'all' || p.brand === productFilter;
    const tagMatch = cravingTag === 'All' || (p.tags && p.tags.includes(cravingTag));
    return brandMatch && tagMatch;
  });

  // Navigation Tabs Configuration
  const NAV_PAGES = [
    { id: 'home', label: 'Home & Worlds', emoji: '🏠', activeBg: '#FFF394', activeText: '#111111' },
    { id: 'shop', label: 'Shop All', emoji: '🛍️', activeBg: '#0038BA', activeText: '#FFF394' },
    { id: 'bundle', label: 'Build-A-Box', badge: '-25%', emoji: '📦', activeBg: '#D81E36', activeText: '#FFF7F0' },
    { id: 'kitchen', label: 'Our Kitchen', emoji: '🥣', activeBg: '#D4FF59', activeText: '#111111' },
    { id: 'quiz', label: 'Craving Quiz', emoji: '✨', activeBg: '#8C65F7', activeText: '#FAF6F0' }
  ];

  const currentOuterBg = activeWorld === 'bean' 
    ? '#FF9CE9' 
    : activeWorld === 'buffy' 
    ? '#F3B8D8' 
    : activeWorld === 'psico' 
    ? '#8C65F7' 
    : '#F5B5E5';

  return (
    <div 
      onMouseMove={handleMouseMove}
      onClick={handleCanvasClick}
      style={{ backgroundColor: currentOuterBg }}
      className={`min-h-screen transition-colors duration-500 relative pb-28 ${slapMode ? 'cursor-crosshair' : ''}`}
    >
      <GlobalStyles />

      {/* ==========================================
          SLAPPED DIE-CUT SVG STICKERS OVERLAY LAYER
      ========================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-30">
        {slappedStickers.map((st) => (
          <div
            key={st.id}
            style={{
              left: st.x - 48,
              top: st.y - 48,
              '--rot': `${st.rot}deg`,
              transform: `rotate(${st.rot}deg)`
            }}
            title="Click sticker to peel off"
            className="absolute animate-pop-in pointer-events-auto cursor-pointer hover:scale-110 transition-transform group"
            onClick={(e) => {
              e.stopPropagation();
              setSlappedStickers(prev => prev.filter(s => s.id !== st.id));
            }}
          >
            <DieCutStickerSVG type={st.type} className="w-24 h-24 sm:w-28 sm:h-28" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 -right-2 bg-[#111] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">
              ✕
            </span>
          </div>
        ))}
      </div>

      {/* ==========================================
          TOP MARQUEE TICKER TAPE
      ========================================== */}
      <div className="bg-[#111111] text-[#FFF394] py-2 border-b-2 border-[#111111] overflow-hidden sticky top-0 z-50">
        <div className="animate-marquee flex items-center gap-8 text-xs font-bold tracking-widest uppercase">
          {[...Array(2)].map((_, idx) => (
            <React.Fragment key={idx}>
              <span className="flex items-center gap-1.5"><Zap size={13} className="text-[#FF9CE9]" /> BEAN ME UP: 14G PLANT PROTEIN PUFFS</span>
              <span>★</span>
              <span className="flex items-center gap-1.5"><Heart size={13} className="text-[#D81E36]" /> BUFFY: BROWN BUTTER & 70% DARK CHOCO BUCKETS</span>
              <span>★</span>
              <span className="flex items-center gap-1.5"><Sparkles size={13} className="text-[#D4FF59]" /> PSICO MESS: 48-HR ICE TUMBLERS & WORKING TAMAGOTCHIS</span>
              <span>★</span>
              <span className="text-[#D4FF59]">FREE SHIPPING & HOLOGRAPHIC STICKER PACK AT $35+</span>
              <span>★</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ==========================================
          SLEEK FLOATING NEO-BRUTALIST PILL DOCK NAVBAR
      ========================================== */}
      <header className="max-w-7xl mx-auto px-3 sm:px-5 pt-3.5 pb-2 sticky top-8 z-40">
        <nav className="bg-[#FAF6F0]/95 backdrop-blur-md border-[3px] border-[#111111] rounded-full px-2.5 sm:px-4 py-2 shadow-[0_6px_0_#111111] flex items-center justify-between gap-2">
          
          {/* LEFT: Bold Animated Brand Logo Badge */}
          <button
            onClick={() => { setActivePage('home'); setActiveWorld('all'); }}
            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-black/5 transition-colors group shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-[#FF2E17] border-2 border-[#111] flex items-center justify-center shadow-[0_2px_0_#111] group-hover:rotate-12 transition-transform">
              <span className="text-sm animate-bounce">⚡</span>
            </div>
            <div className="text-left leading-none">
              <span className="font-bean text-base sm:text-lg tracking-tight text-[#111] block">
                SNACKVERSE™
              </span>
              <span className="font-psico-pixel text-[8px] text-[#8C65F7] block">
                3 CRAVE WORLDS
              </span>
            </div>
          </button>

          {/* CENTER: Clean Color-Coded Pill Tabs for the 5 Consumer Pages */}
          <div className="hidden lg:flex items-center gap-1 bg-[#111111] p-1 rounded-full border-2 border-[#111111]">
            {NAV_PAGES.map((tab) => {
              const isActive = activePage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePage(tab.id)}
                  style={{
                    backgroundColor: isActive ? tab.activeBg : 'transparent',
                    color: isActive ? tab.activeText : '#FAF6F0'
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 relative ${
                    isActive 
                      ? 'shadow-[0_2px_0_rgba(0,0,0,0.4)] scale-[1.03]' 
                      : 'hover:bg-white/10 hover:text-[#FFF394]'
                  }`}
                >
                  <span>{tab.emoji}</span>
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="bg-[#D4FF59] text-[#111] font-psico-pixel text-[9px] px-1.5 py-0.2 rounded-full border border-[#111] leading-tight">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT: Sticker Mode Toggle + Clear + Mobile Menu + My Bag with Free Ship Progress */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Interactive STICKER MODE Toggle Pill */}
            <div className="flex items-center bg-[#111] rounded-full p-0.5 border-2 border-[#111]">
              <button
                onClick={() => {
                  const next = !slapMode;
                  setSlapMode(next);
                  showToast(next ? "🎨 STICKER MODE ON! PICK A STICKER BELOW & CLICK ANYWHERE!" : "STICKER MODE PAUSED");
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all ${
                  slapMode 
                    ? 'bg-[#D4FF59] text-[#111] shadow-[0_0_12px_#D4FF59]' 
                    : 'bg-[#FF9CE9] text-[#111] hover:bg-[#FFF394]'
                }`}
              >
                <MousePointer size={13} className={slapMode ? 'animate-bounce' : ''} />
                <span className="hidden sm:inline">STICKER MODE</span>
                <span className="bg-[#111] text-[#D4FF59] font-psico-pixel text-[9px] px-1.5 py-0.5 rounded-full">
                  {slapMode ? `ON (${slappedStickers.length})` : slappedStickers.length > 0 ? slappedStickers.length : 'OFF'}
                </span>
              </button>

              {slappedStickers.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlappedStickers([]);
                    showToast("🧹 CLEARED ALL SLAPPED STICKERS!");
                  }}
                  title="Clear All Stickers"
                  className="px-2 py-1 text-[#FFF394] hover:text-[#FF2E17] text-[10px] font-bold flex items-center gap-0.5 transition-colors"
                >
                  <RotateCcw size={12} />
                  <span className="hidden xl:inline">Clear</span>
                </button>
              )}
            </div>

            {/* "My Bag" Cart Trigger with Animated Counter & Mini Free-Shipping Bar */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-[#0038BA] hover:bg-[#FF2E17] text-white pl-3 pr-3.5 py-1.5 rounded-full border-2 border-[#111] shadow-[0_3px_0_#111] active:translate-y-0.5 transition-all flex items-center gap-2 group"
            >
              <div className="relative">
                <ShoppingBag size={15} />
                <span className="absolute -top-2 -right-2 bg-[#D4FF59] text-[#111] font-bean text-[10px] w-4 h-4 rounded-full border border-[#111] flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-bean text-[11px] leading-none">MY BAG (${cartTotal})</div>
                <div className="w-16 h-1.5 bg-black/40 rounded-full overflow-hidden mt-1 border border-white/30">
                  <div 
                    style={{ width: `${freeShipProgress}%` }}
                    className="h-full bg-[#D4FF59] transition-all duration-300"
                  />
                </div>
              </div>
            </button>

            {/* Mobile Hamburger Drawer Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-[#FFF394] border-2 border-[#111] text-[#111] shadow-[0_2px_0_#111]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Responsive Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-[#FAF6F0] border-4 border-[#111] rounded-3xl p-4 shadow-[0_8px_0_#111] animate-pop-in space-y-3">
            <div className="text-[10px] font-psico-pixel text-gray-500 uppercase px-1">
              Navigate Snackverse Pages
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {NAV_PAGES.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActivePage(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    backgroundColor: activePage === tab.id ? tab.activeBg : '#FFFFFF',
                    color: activePage === tab.id ? tab.activeText : '#111111'
                  }}
                  className="px-3 py-2.5 rounded-2xl border-2 border-[#111] font-bean text-xs flex items-center justify-center gap-1.5 shadow-[0_3px_0_#111]"
                >
                  <span>{tab.emoji}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ==========================================
          FLOATING BOTTOM STICKER DOCK (SLIDES UP WHEN STICKER MODE IS ON)
      ========================================== */}
      {slapMode && (
        <div className="sticker-dock fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl bg-[#111111]/95 backdrop-blur-md text-white border-4 border-[#D4FF59] rounded-3xl p-3 shadow-[0_10px_0_#000] animate-pop-in">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF59] animate-ping" />
              <span className="font-bean text-xs sm:text-sm text-[#D4FF59]">
                STICKER SLAP STUDIO — CLICK ANYWHERE ON THE PAGE TO SLAP!
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-300 font-bold">
                Slapped: {slappedStickers.length}
              </span>
              {slappedStickers.length > 0 && (
                <button
                  onClick={() => setSlappedStickers([])}
                  className="bg-[#FF2E17] text-white text-[10px] font-bean px-2.5 py-1 rounded-full border border-white flex items-center gap-1 hover:brightness-110"
                >
                  <Trash2 size={11} /> CLEAR ALL
                </button>
              )}
              <button
                onClick={() => setSlapMode(false)}
                className="bg-white/15 hover:bg-white/25 text-white text-[10px] font-bold px-2.5 py-1 rounded-full"
              >
                DONE ✕
              </button>
            </div>
          </div>

          {/* Horizontal Die-Cut Sticker Selector Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
            {STICKER_CATALOG.map((st) => {
              const isSelected = selectedStickerType === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStickerType(st.id)}
                  className={`shrink-0 px-3 py-1.5 rounded-2xl border-2 transition-all flex items-center gap-2 ${
                    isSelected 
                      ? 'bg-[#D4FF59] text-[#111] border-white scale-105 shadow-md' 
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  {st.id === 'random' ? (
                    <span className="text-lg">🎲</span>
                  ) : (
                    <div className="w-7 h-7 flex items-center justify-center">
                      <DieCutStickerSVG type={st.id} className="w-7 h-7" />
                    </div>
                  )}
                  <span className="font-bean text-[11px] whitespace-nowrap">{st.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ==========================================
          MAIN PAGE CONTENT ROUTER
      ========================================== */}
      <main className="max-w-7xl mx-auto px-4 space-y-12 mt-4">

        {/* ====================================================
            PAGE 1: HOME & WORLDS (BENTO HEROES + WHAT'S INSIDE + COMPARISON)
        ==================================================== */}
        {activePage === 'home' && (
          <>
            {/* Quick Brand World Filter Bar */}
            <div className="bg-[#FAF6F0] border-3 border-[#111] rounded-3xl p-3 shadow-[0_6px_0_#111] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 pl-2">
                <Sparkles size={16} className="text-[#8C65F7]" />
                <span className="font-bean text-xs sm:text-sm text-[#111]">
                  EXPLORE OUR 3 SNACK & LIFESTYLE UNIVERSES:
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'ALL 3 WORLDS ✨', bg: '#FFF394', fg: '#111' },
                  { id: 'bean', label: '🫘 BEAN ME UP (SAVORY)', bg: '#0038BA', fg: '#FFF394' },
                  { id: 'buffy', label: '🍪 BUFFY COOKIES (SWEET)', bg: '#D81E36', fg: '#FFF7F0' },
                  { id: 'psico', label: '👾 PSICO MESS (Y2K MERCH)', bg: '#8C65F7', fg: '#D4FF59' }
                ].map(w => (
                  <button
                    key={w.id}
                    onClick={() => setActiveWorld(w.id)}
                    style={{
                      backgroundColor: activeWorld === w.id ? w.bg : '#FFFFFF',
                      color: activeWorld === w.id ? w.fg : '#111111'
                    }}
                    className="px-3.5 py-1.5 rounded-full border-2 border-[#111] font-bean text-xs transition-transform active:translate-y-0.5"
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* WORLD 1: BEAN ME UP BENTO SHOWCASE */}
            {(activeWorld === 'all' || activeWorld === 'bean') && (
              <section className="bg-[#0038BA] p-4 md:p-6 rounded-[36px] border-4 border-[#001F6B] shadow-[0_14px_0_#001F6B] relative overflow-visible">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 px-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#FFF394] text-[#0038BA] font-bean text-xs px-3 py-1 rounded-full border-2 border-[#111]">
                      SAVORY PROTEIN SNACKS
                    </span>
                    <span className="text-white/90 text-xs font-bold tracking-wider uppercase">
                      14G PLANT PROTEIN • 8G FIBER • AIR-POPPED FAVA & LUPINI BEANS
                    </span>
                  </div>
                  <button 
                    onClick={() => { setActivePage('shop'); setProductFilter('bean'); }}
                    className="text-[#FFF394] font-bean text-xs underline hover:text-[#FF9CE9]"
                  >
                    SHOP ALL BEAN POUCHES →
                  </button>
                </div>

                {/* Top Bento Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 relative">
                  <div 
                    onClick={triggerBeanAction}
                    className="md:col-span-5 bg-[#FF9CE9] rounded-[28px] p-8 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden cursor-pointer bento-card border-2 border-[#111]/10 group"
                  >
                    <h1 className="font-bean text-6xl sm:text-7xl lg:text-8xl text-[#0038BA] tracking-tight leading-none select-none group-hover:scale-105 transition-transform">
                      BEAN
                    </h1>
                    <div className="bg-[#FFF394] px-7 py-2 rounded-full -rotate-6 -mt-3 shadow-md border-2 border-[#0038BA]/20 group-hover:rotate-3 transition-transform">
                      <span className="font-bean text-2xl sm:text-3xl text-[#0038BA] tracking-wide">
                        ME UP
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#0038BA]/80 mt-4 uppercase tracking-widest">
                      All the potato-chip crunch • 3x the protein
                    </span>
                  </div>

                  <div 
                    onClick={triggerBeanAction}
                    className="md:col-span-4 bg-[#FFF394] rounded-[28px] p-6 flex flex-col items-center justify-between min-h-[250px] relative cursor-pointer bento-card"
                  >
                    <div className="relative mt-2">
                      <svg viewBox="0 0 120 40" className="w-24 h-8 mx-auto -mb-2 relative z-10 animate-float">
                        <polygon points="10,12 52,6 48,32 14,35" fill="#FFF" stroke="#111" strokeWidth="3.5"/>
                        <polygon points="16,15 46,11 43,28 19,30" fill="#111"/>
                        <polygon points="62,6 106,12 102,35 66,32" fill="#FFF" stroke="#111" strokeWidth="3.5"/>
                        <polygon points="68,11 100,15 97,30 71,28" fill="#111"/>
                        <line x1="50" y1="14" x2="64" y2="14" stroke="#111" strokeWidth="4"/>
                      </svg>
                      <h2 className="font-bean text-2xl sm:text-3xl text-[#0038BA] text-center leading-tight">
                        {beanQuotes[beanQuoteIdx]}
                      </h2>
                    </div>

                    <div className={`w-40 h-28 my-1 ${mouthChomping ? 'animate-chomp' : 'hover:scale-110 transition-transform'}`}>
                      <svg viewBox="0 0 180 120" className="w-full h-full overflow-visible">
                        <path d="M20,35 C55,20 125,20 160,35 C175,85 135,112 90,112 C45,112 5,85 20,35 Z" fill="#111111" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
                        <path d="M26,36 C60,24 120,24 154,36 L146,56 C110,52 70,52 34,56 Z" fill="#FFFFFF" stroke="#111111" strokeWidth="3.5" />
                        <line x1="65" y1="30" x2="65" y2="54" stroke="#111" strokeWidth="3" />
                        <line x1="90" y1="28" x2="90" y2="54" stroke="#111" strokeWidth="3" />
                        <line x1="115" y1="30" x2="115" y2="54" stroke="#111" strokeWidth="3" />
                        <path d="M46,88 C65,68 115,68 134,88 C120,108 60,108 46,88 Z" fill="#FF9CE9" stroke="#111111" strokeWidth="3.5" />
                      </svg>
                    </div>

                    <div className="bg-[#FF9CE9] px-4 py-1 rounded-full">
                      <span className="font-bean text-[11px] text-[#0038BA]">NEVER FRIED • CLICK TO CHOMP</span>
                    </div>
                  </div>

                  <div className="md:col-span-3 bg-[#FFF7F0] rounded-[28px] p-5 flex flex-col justify-between min-h-[250px] relative overflow-hidden bento-card">
                    <div className="absolute -right-8 -bottom-8 w-44 h-56 rounded-t-full bg-[#D81E36]" />
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="bg-[#0038BA] text-white px-3 py-1 rounded-full font-bean text-[10px]">
                        WHY FAVA BEANS?
                      </span>
                    </div>
                    <div className="relative z-10 my-auto space-y-1.5 bg-white/90 p-3 rounded-2xl border-2 border-[#111] text-xs font-bold text-[#111]">
                      <div>✅ 14g Complete Plant Protein</div>
                      <div>✅ 8g Prebiotic Gut Fiber</div>
                      <div>✅ Zero Greasy Chip Fingers</div>
                      <div>✅ Gluten-Free & Non-GMO</div>
                    </div>
                    <button
                      onClick={() => setSelectedProductModal(PRODUCTS[0])}
                      className="relative z-10 bg-[#FFF394] border-2 border-[#111] text-[#111] font-bean text-xs px-3 py-2 rounded-xl shadow-[0_3px_0_#111] hover:bg-[#FF9CE9]"
                    >
                      SEE NUTRITION FACTS →
                    </button>
                  </div>

                  {/* Overlapping Starburst Seal */}
                  <div 
                    onClick={triggerBeanAction}
                    className="hidden md:flex absolute left-[36%] -bottom-10 z-30 w-28 h-28 cursor-pointer hover:scale-110 transition-transform items-center justify-center"
                  >
                    <svg viewBox="0 0 120 120" className="w-full h-full animate-spin-slow">
                      <path 
                        d="M60,4 L73,16 L90,10 L96,27 L113,33 L107,50 L118,64 L104,76 L106,94 L89,98 L81,114 L64,108 L50,118 L38,104 L20,106 L16,89 L2,81 L10,64 L4,48 L19,38 L18,20 L35,18 L45,4 L60,12 Z" 
                        fill="#FF2E17" 
                        stroke="#111" 
                        strokeWidth="3"
                      />
                    </svg>
                    <span className="absolute font-bean text-white text-xs text-center leading-tight -rotate-12 pointer-events-none">
                      BETTER<br/>BEANS
                    </span>
                  </div>
                </div>

                {/* Bottom Bento Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 relative">
                  <div className="md:col-span-5 bg-[#FF9CE9] rounded-[28px] p-6 min-h-[280px] relative flex items-center justify-end overflow-visible bento-card">
                    <div className="w-48 sm:w-56 h-64 absolute -left-4 -bottom-4 z-20">
                      <CoolBeanMascot mousePos={mousePos} onClick={triggerBeanAction} isJumping={beanJumping} />
                    </div>
                    <div className="w-3/5 pl-6 relative z-10 text-left">
                      <div className="font-bean text-4xl sm:text-5xl text-[#0038BA] leading-[0.95] uppercase">
                        <div>FUEL</div>
                        <div className="relative">
                          YOUR
                          <span className="font-script text-[#FFF394] text-4xl sm:text-5xl lowercase absolute -left-2 -top-2 -rotate-12 drop-shadow-[0_3px_0_#0038BA] pointer-events-none">
                            crunch
                          </span>
                        </div>
                        <div>FUN</div>
                      </div>
                      <div className="inline-block bg-[#FFF394] px-4 py-1.5 rounded-full mt-3 border-2 border-[#111]">
                        <span className="font-bean text-xs text-[#FF2E17] uppercase tracking-wider">
                          3 BOLD FLAVORS
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-7 bg-[#0038BA] rounded-[28px] p-6 min-h-[280px] border-4 border-[#FF9CE9]/30 relative flex flex-col sm:flex-row items-center justify-between overflow-hidden">
                    <div className="flex items-center justify-center -space-x-8 sm:-space-x-10 my-4 sm:my-0 z-20">
                      <div 
                        onClick={() => addToCart(PRODUCTS[0])}
                        className="w-36 sm:w-40 h-48 bg-[#1E56E0] border-4 border-[#111] rounded-2xl -rotate-12 p-3 shadow-2xl cursor-pointer hover:-translate-y-4 hover:rotate-0 transition-all flex flex-col justify-between"
                      >
                        <div className="text-center">
                          <span className="font-bean text-[9px] text-white">SEA SALT VINEGAR</span>
                          <div className="font-bean text-lg text-[#FF9CE9] leading-none mt-1">SNACK<br/>SMARTER.</div>
                        </div>
                        <span className="bg-[#48BB78] text-white font-bean text-[9px] px-2 py-1 rounded-full text-center">
                          + ADD ($14)
                        </span>
                      </div>
                      <div 
                        onClick={() => addToCart(PRODUCTS[2])}
                        className="w-36 sm:w-40 h-48 bg-[#FF2E17] border-4 border-[#111] rounded-2xl -translate-y-6 z-10 p-3 shadow-2xl cursor-pointer hover:-translate-y-10 transition-all flex flex-col justify-between"
                      >
                        <div className="text-center">
                          <span className="font-bean text-[9px] text-[#FFF394]">CHILI LIME FUEGO</span>
                          <div className="font-bean text-lg text-[#FFF394] leading-none mt-1">FUEL<br/>YOUR FUN</div>
                        </div>
                        <span className="bg-[#FFF394] text-[#111] font-bean text-[9px] px-2 py-1 rounded-full text-center">
                          + ADD FUEGO ($16)
                        </span>
                      </div>
                      <div 
                        onClick={() => addToCart(PRODUCTS[1])}
                        className="w-36 sm:w-40 h-48 bg-[#FF9CE9] border-4 border-[#111] rounded-2xl rotate-12 z-20 p-3 shadow-2xl cursor-pointer hover:-translate-y-4 hover:rotate-0 transition-all flex flex-col justify-between"
                      >
                        <div className="text-center">
                          <span className="font-bean text-[9px] text-[#0038BA]">SWEET SRIRACHA</span>
                          <div className="font-bean text-lg text-[#0038BA] leading-none mt-1">SNACK<br/>SMARTER.</div>
                        </div>
                        <span className="bg-[#0038BA] text-white font-bean text-[9px] px-2 py-1 rounded-full text-center">
                          + ADD PINK ($15)
                        </span>
                      </div>
                    </div>

                    <div className="text-right z-10 mt-4 sm:mt-0">
                      <div className="font-bean text-3xl lg:text-4xl text-[#FFF394] leading-none uppercase">
                        <div>BETTER</div>
                        <div>BEANS.</div>
                        <div className="text-[#FF9CE9] text-xs py-1">★ ZERO BORING ★</div>
                        <div>BETTER</div>
                        <div>TASTE</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* WORLD 2: BUFFY COOKIES BENTO SHOWCASE */}
            {(activeWorld === 'all' || activeWorld === 'buffy') && (
              <section className="bg-[#3A1414] p-4 md:p-6 rounded-[36px] border-4 border-[#210909] shadow-[0_14px_0_#210909] relative">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 px-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#D81E36] text-[#FFF7F0] font-buffy text-xs px-3.5 py-1 rounded-full border-2 border-[#FFF7F0]">
                      BAKERY COOKIE BUCKETS
                    </span>
                    <span className="text-[#FFD6E0] text-xs font-bold tracking-wider uppercase">
                      45-MIN SLOW-SIMMERED BROWN BUTTER • 70% BELGIAN DARK FUDGE DRIZZLE
                    </span>
                  </div>
                  <button 
                    onClick={() => { setActivePage('shop'); setProductFilter('buffy'); }}
                    className="text-[#FFD6E0] font-buffy text-xs underline"
                  >
                    SHOP ALL COOKIE BUCKETS →
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 relative">
                  <div className="lg:col-span-5 flex flex-col gap-4 relative">
                    <div 
                      onClick={triggerBearAction}
                      className="bg-[#D81E36] rounded-[28px] p-8 min-h-[260px] flex flex-col items-center justify-center relative overflow-visible cursor-pointer bento-card"
                    >
                      <div className="absolute -top-4 -left-3 z-20 bg-[#FFD6E0] border-4 border-[#FFF7F0] shadow-lg rounded-2xl px-3 py-2 -rotate-12 flex flex-col items-center">
                        <div className="text-xs">🐻‍❄️</div>
                        <span className="font-buffy text-[#3A1414] text-xs leading-none">COOKIE</span>
                        <span className="text-[7px] font-black text-[#3A1414] tracking-tighter">PROTECTED AREA</span>
                      </div>
                      <div className="relative z-10 flex flex-col items-center">
                        <span className="font-buffy text-6xl sm:text-7xl text-[#FFD6E0] drop-shadow-[0_6px_0_#3A1414] tracking-wide">
                          BUFFY
                        </span>
                        <span className="text-xs font-bold text-[#FFF7F0] mt-2 bg-[#3A1414] px-3 py-1 rounded-full">
                          BAKED FRESH & SEALED WARM
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4">
                      <div className="col-span-2 bg-[#B5E2FA] rounded-[24px] p-4 min-h-[170px] flex items-center justify-center relative overflow-hidden bento-card">
                        <div className="w-24 h-28 bg-[#D81E36] border-4 border-[#FFF7F0] rounded-3xl shadow-[6px_6px_0_#3A1414] flex items-center justify-center relative">
                          <span className="font-buffy text-6xl text-[#FFF7F0]">B</span>
                        </div>
                      </div>
                      <div 
                        onClick={() => addToCart(PRODUCTS[4])}
                        className="col-span-3 bg-[#F6A6B2] rounded-[24px] p-4 min-h-[170px] flex flex-col justify-end relative overflow-hidden cursor-pointer bento-card group"
                      >
                        <div className="bg-[#D81E36] border-2 border-[#3A1414] rounded-xl p-3 shadow-[0_8px_0_#3A1414] group-hover:-translate-y-1 transition-transform">
                          <div className="flex items-center justify-between">
                            <span className="font-buffy text-2xl text-[#FFD6E0]">B</span>
                            <span className="text-[9px] font-bold text-[#FFD6E0] bg-[#3A1414] px-2 py-0.5 rounded-full">
                              + ADD 6-PACK BOX ($28)
                            </span>
                          </div>
                          <div className="font-buffy text-[10px] text-[#FFD6E0] mt-1">
                            QUARTER-POUND STUFFED COOKIES
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-48 h-44 md:w-56 md:h-48 absolute -right-6 lg:-right-24 top-36 z-30">
                      <BuffyBearMascot mousePos={mousePos} onClick={triggerBearAction} isTossing={bearTossing} />
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-[#FFD6E0] rounded-[28px] p-6 sm:p-8 min-h-[446px] relative overflow-hidden flex flex-col justify-between bento-card">
                    <div className="relative z-10 flex items-start justify-between">
                      <div className="bg-[#3A1414] text-[#FFF7F0] px-4 py-1.5 rounded-full font-buffy text-xs shadow-md">
                        ★ 14 MINI COOKIES PER BUCKET
                      </div>
                      <button
                        onClick={() => setSelectedProductModal(PRODUCTS[3])}
                        className="bg-white border-2 border-[#3A1414] text-[#3A1414] font-buffy text-xs px-3 py-1.5 rounded-full hover:bg-[#FFF394]"
                      >
                        INGREDIENTS & INFO
                      </button>
                    </div>

                    <div className="relative z-10 my-auto flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
                      <div className="flex flex-col items-center text-center max-w-xs">
                        <svg viewBox="0 0 220 75" className="w-44 h-14 drop-shadow-md mb-2">
                          <rect x="12" y="10" width="88" height="52" rx="14" fill="#FFF7F0" stroke="#3A1414" strokeWidth="4.5" />
                          <rect x="22" y="18" width="68" height="36" rx="8" fill="#2A1212" />
                          <rect x="96" y="22" width="28" height="12" fill="#FFF7F0" stroke="#3A1414" strokeWidth="4" />
                          <rect x="120" y="10" width="88" height="52" rx="14" fill="#FFF7F0" stroke="#3A1414" strokeWidth="4.5" />
                          <rect x="130" y="18" width="68" height="36" rx="8" fill="#2A1212" />
                        </svg>
                        <h3 className="font-buffy text-3xl sm:text-4xl text-[#3A1414] leading-tight">
                          COOKIES THAT GET THE VIBE.
                        </h3>
                        <p className="text-xs font-bold text-[#3A1414]/80 mt-2">
                          Crispy golden edges, chewy brown-butter centers, and rich 70% dark chocolate fudge drizzle in a resealable share bucket.
                        </p>
                      </div>

                      <div onClick={() => addToCart(PRODUCTS[3])} className="cursor-pointer group relative">
                        <ProductGraphic product={PRODUCTS[3]} isHovered={buffyCrunchPop} />
                      </div>
                    </div>

                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-[#FFF7F0] p-3 rounded-2xl border-2 border-[#3A1414]">
                      <span className="font-buffy text-xs text-[#3A1414] pl-2">
                        THE MINI VERSION BUCKET • $22
                      </span>
                      <button
                        onClick={() => addToCart(PRODUCTS[3])}
                        className="bg-[#D81E36] text-[#FFF7F0] font-buffy text-xs px-5 py-2 rounded-xl border-2 border-[#3A1414] hover:bg-[#3A1414] transition-colors"
                      >
                        + ADD BUCKET TO BAG
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* WORLD 3: PSICO MESS Y2K MERCH & COLLECTIBLES SHOWCASE */}
            {(activeWorld === 'all' || activeWorld === 'psico') && (
              <section className="bg-[#8C65F7] p-4 md:p-7 rounded-[36px] border-4 border-[#1E1035] shadow-[0_14px_0_#1E1035] relative">
                <div className="border-2 border-[#FAF6F0] rounded-full px-6 py-2 mb-5 flex items-center justify-between text-[#FAF6F0]">
                  <span className="text-xs sm:text-sm font-bold tracking-wide">PSICO MESS • Y2K DRINKWARE & KEYCHAINS</span>
                  <span className="text-xl leading-none animate-spin-slow">✳</span>
                  <span className="text-xs sm:text-sm font-bold tracking-wide hidden sm:inline">48-HR ICE RETENTION</span>
                </div>

                <div className="bg-[#FAF6F0] border-2 border-[#1E1035] rounded-[28px] p-6 sm:p-10 text-center relative overflow-hidden mb-5 bento-card">
                  <div className="leading-none select-none">
                    <div className="inline-flex items-baseline justify-center flex-wrap">
                      <span className="font-psico-serif italic text-7xl sm:text-9xl text-[#8C65F7] tracking-tight pr-1">P</span>
                      <span className="font-psico-pixel text-5xl sm:text-7xl text-[#8C65F7] tracking-tighter">si</span>
                      <span className="font-psico-serif italic text-7xl sm:text-9xl text-[#FF6AC2] mx-1">c</span>
                      <span className="font-psico-pixel text-5xl sm:text-7xl text-[#8C65F7]">o</span>
                    </div>
                    <div className="flex items-baseline justify-center -mt-3 sm:-mt-5">
                      <span className="font-psico-serif italic font-bold text-6xl sm:text-8xl text-[#FF6AC2] tracking-tight mr-1">m</span>
                      <span className="font-psico-pixel text-5xl sm:text-7xl text-[#8C65F7]">es</span>
                      <span className="font-psico-pixel text-5xl sm:text-7xl text-[#D4FF59] drop-shadow-[2px_2px_0_#1E1035]">s</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#1E1035]/80 mt-2">
                    Insulated 40oz Stainless Tumblers, Sticker-Bombed Hydro Bottles & Working Virtual Pet Keychains
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div className="bg-[#FF6AC2] rounded-[28px] p-4 min-h-[330px] relative overflow-hidden flex flex-col items-center justify-center border-2 border-[#1E1035] bento-card">
                    <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full object-cover opacity-55 pointer-events-none">
                      <path d="M0,60 Q150,140 300,40 M0,180 Q150,90 300,210 M60,0 Q130,150 40,300 M220,0 Q160,150 250,300" stroke="#8C65F7" strokeWidth="14" fill="none" />
                      <path d="M0,120 Q150,200 300,110 M120,0 Q190,150 110,300" stroke="#D4FF59" strokeWidth="10" fill="none" />
                    </svg>
                    <div className="relative z-10 w-60 h-60">
                      <PsicoGirlMascot 
                        mousePos={mousePos} 
                        mood={girlMood} 
                        onClick={() => {
                          const nextMood = girlMood === 'cute' ? 'overwhelmed' : girlMood === 'overwhelmed' ? 'chaotic' : 'cute';
                          setGirlMood(nextMood);
                          showToast(`👾 PSICO GIRL MOOD: ${nextMood.toUpperCase()}`);
                        }} 
                      />
                    </div>
                    <span className="relative z-10 bg-[#1E1035] text-[#D4FF59] font-psico-pixel text-[10px] px-3 py-1 rounded-full">
                      MOOD: {girlMood.toUpperCase()} (CLICK HER FACE)
                    </span>
                  </div>

                  <div className="bg-[#FFD6EB] rounded-[28px] p-4 min-h-[330px] relative flex items-center justify-center border-2 border-[#1E1035] bento-card">
                    <Y2KTamagotchiCluster 
                      petState={tamaState}
                      onFeed={() => { setTamaState('heart'); showToast("💖 FED YOUR Y2K PET A PIXEL HEART!"); }}
                      onDisco={() => { setTamaState('disco'); showToast("🪩 Y2K DISCO PARTY MODE ACTIVATED!"); }}
                      onMoodToggle={() => { setTamaState('chaotic'); showToast("⚡ CHAOS METER AT 99.9%!"); }}
                    />
                  </div>
                </div>

                {/* 5 Circular Story Badges */}
                <div className="grid grid-cols-5 gap-2 sm:gap-4 my-6">
                  {[
                    { id: 'portal', bg: '#7B52E8', icon: 'spiral' },
                    { id: 'faq', bg: '#FAF6F0', icon: 'faq' },
                    { id: 'wheel', bg: '#D4FF59', icon: 'flame' },
                    { id: 'disco', bg: '#FF85C8', icon: 'globe' },
                    { id: 'secret', bg: '#FAF6F0', icon: 'lock' }
                  ].map((badge) => (
                    <button
                      key={badge.id}
                      onClick={() => setActiveHighlight(activeHighlight === badge.id ? null : badge.id)}
                      style={{ backgroundColor: badge.bg }}
                      className={`aspect-square rounded-full border-2 border-[#1E1035] shadow-lg flex flex-col items-center justify-center p-2 transition-transform hover:scale-105 ${
                        activeHighlight === badge.id ? 'ring-4 ring-[#D4FF59] scale-105' : ''
                      }`}
                    >
                      {badge.icon === 'spiral' && (
                        <svg viewBox="0 0 80 80" className="w-3/5 h-3/5 animate-spin-slow">
                          <path d="M40,40 C40,32 48,32 48,40 C48,52 30,52 30,38 C30,22 58,22 58,42 C58,64 20,64 20,36" fill="none" stroke="#FF85C8" strokeWidth="6" strokeLinecap="round" />
                        </svg>
                      )}
                      {badge.icon === 'faq' && <span className="font-psico-serif font-bold text-xl sm:text-4xl text-[#FF6AC2]">FAQ</span>}
                      {badge.icon === 'flame' && <Flame className="w-3/5 h-3/5 text-[#FF85C8] fill-[#FF85C8]" />}
                      {badge.icon === 'globe' && <Disc className="w-3/5 h-3/5 text-[#1E1035]" />}
                      {badge.icon === 'lock' && <Lock className="w-3/5 h-3/5 text-[#1E1035] fill-[#1E1035]" />}
                    </button>
                  ))}
                </div>

                {activeHighlight && (
                  <div className="bg-[#FAF6F0] border-4 border-[#1E1035] rounded-[24px] p-6 mb-6 animate-pop-in">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-psico-pixel text-xs bg-[#8C65F7] text-white px-3 py-1 rounded-full">
                        ★ UNLOCKED: {activeHighlight.toUpperCase()}
                      </span>
                      <button onClick={() => setActiveHighlight(null)} className="text-xs font-bold underline">CLOSE [X]</button>
                    </div>
                    {activeHighlight === 'wheel' ? (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div 
                            style={{ transform: `rotate(${wheelAngle}deg)`, transition: 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                            className="w-20 h-20 rounded-full border-4 border-[#1E1035] bg-gradient-to-tr from-[#FF6AC2] via-[#D4FF59] to-[#8C65F7] flex items-center justify-center"
                          >
                            <Star className="text-[#1E1035] fill-white" size={28} />
                          </div>
                          <div>
                            <h4 className="font-bean text-lg text-[#1E1035]">SPIN FOR A MYSTERY SNACK PERK!</h4>
                            {wheelPrize && (
                              <p className="mt-1 bg-[#D4FF59] border-2 border-[#1E1035] px-3 py-1 rounded-lg font-bold text-xs inline-block">
                                🎉 WON: {wheelPrize}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={spinMysteryWheel}
                          className="bg-[#FF6AC2] text-[#1E1035] font-bean px-5 py-2.5 rounded-full border-2 border-[#1E1035] shadow-[0_4px_0_#1E1035]"
                        >
                          SPIN WHEEL 🎲
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs sm:text-sm font-bold text-[#1E1035]">
                          All Psico Mess tumblers are crafted with double-wall copper-lined stainless steel that keeps iced drinks freezing for 48 hours and comes with a Room 013 charm!
                        </p>
                        <button
                          onClick={() => addToCart(PRODUCTS[6])}
                          className="bg-[#8C65F7] text-white font-psico-pixel text-xs px-4 py-2.5 rounded-xl border-2 border-[#1E1035] shrink-0"
                        >
                          + ADD 40oz TUMBLER ($38)
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Row of Psico Mess */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  <div className="md:col-span-7 bg-[#FAF6F0] rounded-[28px] p-6 border-2 border-[#1E1035] flex flex-col sm:flex-row items-center justify-between gap-6 bento-card">
                    <div className="flex items-end gap-3">
                      <div 
                        onClick={() => addToCart(PRODUCTS[7])}
                        className="w-24 h-52 bg-[#B794F4] border-4 border-[#1E1035] rounded-3xl p-2 flex flex-col justify-between items-center relative cursor-pointer hover:-translate-y-2 transition-transform shadow-lg"
                      >
                        <div className="w-10 h-6 bg-[#FF6AC2] border-2 border-[#1E1035] rounded-t-lg -mt-5" />
                        <span className="font-syne font-extrabold text-xs text-[#D4FF59] -rotate-90 whitespace-nowrap tracking-widest my-auto">
                          CAOTIC • PSICOMESS
                        </span>
                        <span className="bg-[#1E1035] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">$32</span>
                      </div>
                      <div onClick={() => addToCart(PRODUCTS[6])} className="cursor-pointer">
                        <ProductGraphic product={PRODUCTS[6]} isHovered={false} />
                      </div>
                    </div>
                    <div className="text-left space-y-2">
                      <span className="bg-[#D4FF59] text-[#1E1035] font-psico-pixel text-[10px] px-2.5 py-1 rounded-md border border-[#1E1035]">
                        48-HOUR ICE RETENTION
                      </span>
                      <h3 className="font-psico-serif italic text-4xl text-[#1E1035] leading-none">
                        Cute but Overwhelmed
                      </h3>
                      <p className="text-xs text-gray-600">
                        40oz acid-swirl insulated mug & 32oz sticker-bombed lavender bottle with neon carabiner.
                      </p>
                      <button
                        onClick={() => addToCart(PRODUCTS[6])}
                        className="bg-[#FF6AC2] text-[#1E1035] font-bold text-xs px-4 py-2 rounded-full border-2 border-[#1E1035] shadow-[0_3px_0_#1E1035] hover:bg-[#D4FF59]"
                      >
                        + ADD 40oz TUMBLER ($38)
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-5 flex flex-col justify-between gap-4">
                    <div className="bg-[#FF6AC2] border-2 border-[#FAF6F0] rounded-[24px] p-5 text-[#FAF6F0] flex flex-col justify-between min-h-[140px]">
                      <p className="font-syne font-bold text-base sm:text-lg leading-snug">
                        Every bottle & tumbler ships with a 10-piece waterproof vinyl sticker pack!
                      </p>
                      <button
                        onClick={() => setSlapMode(true)}
                        className="mt-2 bg-[#1E1035] text-[#D4FF59] font-psico-pixel text-[10px] px-3 py-2 rounded-xl flex items-center justify-between"
                      >
                        <span>TEST STICKERS ON THIS PAGE NOW</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { mood: 'cute', bg: '#FF85C8', label: 'CUTE' },
                        { mood: 'overwhelmed', bg: '#7B52E8', label: 'OVERWHELM' },
                        { mood: 'chaotic', bg: '#D4FF59', label: 'CHAOTIC' }
                      ].map((item) => (
                        <div
                          key={item.mood}
                          onClick={() => setGirlMood(item.mood)}
                          style={{ backgroundColor: item.bg }}
                          className={`aspect-square rounded-2xl border-2 border-[#1E1035] p-2 cursor-pointer flex flex-col items-center justify-center transition-transform hover:scale-105 ${
                            girlMood === item.mood ? 'ring-4 ring-white' : ''
                          }`}
                        >
                          <div className="w-16 h-16">
                            <PsicoGirlMascot mousePos={mousePos} mood={item.mood} />
                          </div>
                          <span className="font-psico-pixel text-[8px] text-[#1E1035] bg-white/80 px-1.5 rounded mt-1">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* INTERACTIVE "WHAT'S INSIDE THE BAG?" ANATOMY EXPLORER */}
            <section className="bg-[#FAF6F0] p-6 md:p-8 rounded-[36px] border-4 border-[#111] shadow-[0_12px_0_#111]">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-6 gap-4">
                <div>
                  <span className="bg-[#0038BA] text-[#FFF394] font-bean text-xs px-3 py-1 rounded-full border-2 border-[#111]">
                    PRODUCT TRANSPARENCY
                  </span>
                  <h2 className="font-bean text-3xl sm:text-4xl text-[#111] mt-2">
                    WHAT MAKES OUR SNACKS SO CRAVEABLE?
                  </h2>
                </div>
                <p className="text-xs font-bold text-gray-600 max-w-md">
                  Click the interactive hotspots below to inspect our ingredients, roasting process, and build quality.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-5 flex flex-col gap-3">
                  {[
                    {
                      title: '1. Air-Popped Whole Fava & Lupini Beans',
                      world: 'BEAN ME UP',
                      color: '#0038BA',
                      desc: 'Instead of deep-frying starchy potato paste, we air-roast whole Mediterranean fava and lupini beans so you get 14g of complete plant protein and 8g of fiber per bag.'
                    },
                    {
                      title: '2. 45-Minute Slow-Simmered Brown Butter',
                      world: 'BUFFY COOKIES',
                      color: '#D81E36',
                      desc: 'We toast cultured creamery butter for 45 minutes until the milk solids caramelize into a nutty toffee aroma, then fold in 70% Belgian dark chocolate ribbons.'
                    },
                    {
                      title: '3. Copper-Lined 48-Hour Vacuum Steel',
                      world: 'PSICO MESS',
                      color: '#8C65F7',
                      desc: 'Double-wall 18/8 food-grade stainless steel with an inner copper thermal shield keeps ice solid for 2 full days with zero exterior condensation.'
                    }
                  ].map((spot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveHotspot(idx)}
                      className={`text-left p-4 rounded-2xl border-3 transition-all ${
                        activeHotspot === idx 
                          ? 'bg-[#FFF394] border-[#111] shadow-[0_5px_0_#111] -translate-y-0.5' 
                          : 'bg-white border-gray-300 hover:border-[#111]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span style={{ backgroundColor: spot.color }} className="text-white font-bean text-[10px] px-2.5 py-0.5 rounded-full">
                          {spot.world}
                        </span>
                        <span className="font-psico-pixel text-[10px] text-[#111]">HOTSPOT 0{idx + 1}</span>
                      </div>
                      <h4 className="font-bean text-base text-[#111]">{spot.title}</h4>
                      <p className="text-xs text-gray-700 mt-1 leading-relaxed">{spot.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Comparison Table: Snackverse vs Ordinary Gas Station Snacks */}
                <div className="lg:col-span-7 bg-[#111111] text-white rounded-[28px] p-6 border-4 border-[#111]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bean text-xl sm:text-2xl text-[#D4FF59]">
                      SNACKVERSE™ VS. BORING AISLE SNACKS
                    </h3>
                    <span className="bg-[#FF6AC2] text-[#111] font-bean text-[10px] px-3 py-1 rounded-full">
                      THE STATS DON'T LIE
                    </span>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    {[
                      { metric: 'Protein Per Bag', us: '14g–15g Plant Protein', them: '1g–2g Empty Starch' },
                      { metric: 'Cooking Method', us: 'Air-Popped & Slow Brown-relished', them: 'Vat-Fried in Cheap Seed Oils' },
                      { metric: 'Chocolate Quality', us: '70% Belgian Dark Chocolate', them: 'Waxy Palm-Oil Compound Chips' },
                      { metric: 'Free Collectibles', us: 'Die-Cut Vinyl Stickers Every Order', them: 'Just Air in the Bag' }
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-12 items-center bg-white/10 rounded-2xl p-3 gap-2">
                        <div className="col-span-4 font-bold text-gray-300">{row.metric}</div>
                        <div className="col-span-4 bg-[#D4FF59] text-[#111] font-bean text-xs px-3 py-2 rounded-xl text-center">
                          ✓ {row.us}
                        </div>
                        <div className="col-span-4 text-gray-400 text-xs text-center line-through">
                          ✕ {row.them}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ====================================================
            PAGE 2: SHOP ALL SNACKS & MERCH (WITH PACK DISCOUNTS & NUTRITION MODALS)
        ==================================================== */}
        {activePage === 'shop' && (
          <section className="bg-[#FAF6F0] p-6 md:p-8 rounded-[36px] border-4 border-[#111111] shadow-[0_14px_0_#111111]">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
              <div>
                <span className="bg-[#111] text-[#D4FF59] font-psico-pixel text-xs px-3 py-1 rounded-full">
                  D2C PANTRY & MERCH STORE
                </span>
                <h2 className="font-bean text-3xl sm:text-5xl text-[#111] mt-2">
                  SHOP BY FLAVOR OR CRAVING
                </h2>
              </div>

              {/* Pack Size Multiplier Selector */}
              <div className="bg-[#FFF394] border-2 border-[#111] rounded-2xl p-2 flex items-center gap-1.5">
                <span className="font-bean text-xs px-2 text-[#111]">PACK SIZE:</span>
                {[
                  { mult: 1, label: 'Single Pack', disc: 1 },
                  { mult: 6, label: '6-Pack (-10%)', disc: 0.9 },
                  { mult: 12, label: '12-Case (-15%)', disc: 0.85 }
                ].map(pk => (
                  <button
                    key={pk.mult}
                    onClick={() => setPackMultiplier(pk.mult)}
                    className={`px-3 py-1.5 rounded-xl font-bean text-xs border-2 transition-all ${
                      packMultiplier === pk.mult 
                        ? 'bg-[#0038BA] text-white border-[#111]' 
                        : 'bg-white text-[#111] border-transparent hover:border-[#111]'
                    }`}
                  >
                    {pk.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand & Craving Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b-2 border-dashed border-gray-300">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'ALL ITEMS (9)', bg: '#111', fg: '#FFF' },
                  { id: 'bean', label: '🫘 BEAN ME UP', bg: '#0038BA', fg: '#FFF394' },
                  { id: 'buffy', label: '🍪 BUFFY COOKIES', bg: '#D81E36', fg: '#FFF7F0' },
                  { id: 'psico', label: '👾 PSICO MESS', bg: '#8C65F7', fg: '#D4FF59' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setProductFilter(tab.id)}
                    style={{
                      backgroundColor: productFilter === tab.id ? tab.bg : '#FFF',
                      color: productFilter === tab.id ? tab.fg : '#111'
                    }}
                    className="px-4 py-1.5 rounded-full border-2 border-[#111] font-bean text-xs shadow-[0_3px_0_#111]"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {['All', 'High Protein', 'Sweet Tooth', 'Spicy Kick', 'Late Night Study', 'Y2K Collectibles'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setCravingTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border border-[#111] ${
                      cravingTag === tag ? 'bg-[#FF6AC2] text-[#111]' : 'bg-white text-gray-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((product) => {
                const discountRate = packMultiplier === 6 ? 0.9 : packMultiplier === 12 ? 0.85 : 1;
                const finalPrice = Math.round(product.price * packMultiplier * discountRate);
                const packLabel = packMultiplier === 1 ? '' : `${packMultiplier}-Pack`;

                return (
                  <div
                    key={product.id}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    className="bg-white rounded-[28px] border-4 border-[#111] p-5 flex flex-col justify-between shadow-[0_8px_0_#111] hover:-translate-y-2 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span 
                          style={{ backgroundColor: product.color, color: product.secondary }}
                          className="font-bean text-[10px] px-3 py-1 rounded-full border-2 border-[#111]"
                        >
                          {product.badge}
                        </span>
                        <span className="font-bean text-xl text-[#111]">
                          ${finalPrice}
                        </span>
                      </div>

                      <div 
                        onClick={() => setSelectedProductModal(product)}
                        className="my-4 flex items-center justify-center bg-[#FAF6F0] rounded-2xl py-4 border-2 border-dashed border-gray-300 cursor-pointer relative group"
                      >
                        <ProductGraphic product={product} isHovered={hoveredProduct === product.id} />
                        <span className="absolute bottom-2 right-2 bg-[#111] text-white text-[10px] font-bold px-2.5 py-1 rounded-full opacity-80 group-hover:opacity-100 flex items-center gap-1">
                          <Info size={11} /> Nutrition & Inside
                        </span>
                      </div>

                      <h3 className="font-bean text-xl text-[#111] leading-tight">{product.name}</h3>
                      <p className="text-xs font-bold text-[#0038BA] mb-1.5">{product.subtitle}</p>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                    </div>

                    <div>
                      <div className="grid grid-cols-3 gap-1.5 bg-[#111] text-white p-2.5 rounded-xl mb-3 text-center">
                        <div>
                          <div className="text-[9px] text-gray-400 font-bold">{product.stats.label1}</div>
                          <div className="font-psico-pixel text-xs text-[#D4FF59]">{product.stats.val1}</div>
                        </div>
                        <div className="border-x border-gray-700">
                          <div className="text-[9px] text-gray-400 font-bold">{product.stats.label2}</div>
                          <div className="font-psico-pixel text-xs text-[#FF9CE9]">{product.stats.val2}</div>
                        </div>
                        <div>
                          <div className="text-[9px] text-gray-400 font-bold">{product.stats.label3}</div>
                          <div className="font-psico-pixel text-xs text-[#FFF394]">{product.stats.val3}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedProductModal(product)}
                          className="px-3 py-3 rounded-2xl border-2 border-[#111] bg-[#FAF6F0] font-bean text-xs hover:bg-[#FFF394]"
                        >
                          FACTS
                        </button>
                        <button
                          onClick={() => addToCart(product, finalPrice, packLabel)}
                          style={{ backgroundColor: product.color, color: product.secondary }}
                          className="flex-1 py-3 rounded-2xl border-2 border-[#111] font-bean text-sm shadow-[0_4px_0_#111] hover:brightness-110 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
                        >
                          <Plus size={16} /> ADD {packLabel} (${finalPrice})
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ====================================================
            PAGE 3: BUILD-A-BOX CUSTOM BUNDLE BUILDER (SAVE 25%)
        ==================================================== */}
        {activePage === 'bundle' && (
          <section className="bg-[#FAF6F0] p-6 md:p-8 rounded-[36px] border-4 border-[#111] shadow-[0_14px_0_#111]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b-4 border-[#111]">
              <div>
                <span className="bg-[#D81E36] text-white font-bean text-xs px-3 py-1 rounded-full border-2 border-[#111]">
                  MIX & MATCH ACROSS ALL 3 BRANDS • SAVE 25%
                </span>
                <h2 className="font-bean text-3xl sm:text-5xl text-[#111] mt-2">
                  BUILD YOUR CUSTOM SNACKVERSE BOX
                </h2>
              </div>

              <div className="flex items-center gap-2 bg-[#111] p-1.5 rounded-2xl">
                {[4, 8, 12].map(sz => (
                  <button
                    key={sz}
                    onClick={() => {
                      setBoxSize(sz);
                      if (bundleItems.length > sz) setBundleItems(bundleItems.slice(0, sz));
                    }}
                    className={`px-4 py-2 rounded-xl font-bean text-xs transition-all ${
                      boxSize === sz ? 'bg-[#D4FF59] text-[#111]' : 'text-white hover:text-[#FFF394]'
                    }`}
                  >
                    {sz}-ITEM BOX
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Items to Pick From */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-bean text-xl text-[#111]">
                  STEP 1: TAP SNACKS OR MERCH TO FILL YOUR {boxSize} SLOTS ({bundleItems.length}/{boxSize} FILLED)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTS.map(prod => (
                    <div key={prod.id} className="bg-white border-2 border-[#111] rounded-2xl p-3 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <div style={{ backgroundColor: prod.color }} className="w-12 h-12 rounded-xl border-2 border-[#111] flex items-center justify-center font-bean text-[10px] text-white shrink-0">
                          {prod.brand.toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bean text-xs text-[#111]">{prod.name}</div>
                          <div className="text-[11px] font-bold text-gray-500">${prod.price} value</div>
                        </div>
                      </div>
                      <button
                        disabled={bundleItems.length >= boxSize}
                        onClick={() => setBundleItems([...bundleItems, prod])}
                        className="bg-[#FFF394] disabled:opacity-40 border-2 border-[#111] px-3 py-1.5 rounded-xl font-bean text-xs hover:bg-[#D4FF59]"
                      >
                        + ADD
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Visual Bento Box Preview */}
              <div className="lg:col-span-5 bg-[#0038BA] text-white rounded-[28px] p-6 border-4 border-[#111] shadow-[0_8px_0_#111] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bean text-xl text-[#FFF394]">YOUR {boxSize}-PACK BOX</span>
                    <button onClick={() => setBundleItems([])} className="text-xs underline text-[#FF9CE9]">Reset Box</button>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {[...Array(boxSize)].map((_, i) => {
                      const item = bundleItems[i];
                      return (
                        <div
                          key={i}
                          className={`h-16 rounded-2xl border-2 flex items-center justify-between px-3 ${
                            item ? 'bg-white text-[#111] border-[#111]' : 'bg-white/10 border-dashed border-white/40 text-white/60'
                          }`}
                        >
                          {item ? (
                            <>
                              <span className="font-bean text-xs truncate pr-2">{item.name}</span>
                              <button
                                onClick={() => setBundleItems(bundleItems.filter((_, idx) => idx !== i))}
                                className="text-red-600 font-bold text-xs"
                              >
                                ✕
                              </button>
                            </>
                          ) : (
                            <span className="font-psico-pixel text-[10px]">EMPTY SLOT #{i + 1}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {(() => {
                  const rawSum = bundleItems.reduce((s, it) => s + it.price, 0);
                  const discounted = Math.round(rawSum * 0.75);
                  const isFull = bundleItems.length === boxSize;
                  return (
                    <div className="bg-[#111] p-4 rounded-2xl space-y-3">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Regular Value: <span className="line-through">${rawSum}</span></span>
                        <span className="text-[#D4FF59] font-bold">You Save 25% (${rawSum - discounted})</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bean text-lg">BUNDLE PRICE:</span>
                        <span className="font-bean text-3xl text-[#FFF394]">${discounted}</span>
                      </div>
                      <button
                        disabled={!isFull}
                        onClick={() => {
                          addToCart(
                            {
                              id: `custom-box-${Date.now()}`,
                              brand: 'bean',
                              name: `CUSTOM ${boxSize}-PACK SNACKVERSE BOX`,
                              color: '#D81E36',
                              price: discounted
                            },
                            discounted
                          );
                        }}
                        className="w-full py-3.5 rounded-xl bg-[#D4FF59] disabled:bg-gray-600 text-[#111] font-bean text-sm border-2 border-white shadow-md"
                      >
                        {isFull ? `ADD ${boxSize}-PACK BOX TO BAG ($${discounted}) →` : `ADD ${boxSize - bundleItems.length} MORE TO UNLOCK 25% OFF`}
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          </section>
        )}

        {/* ====================================================
            PAGE 4: INSIDE THE KITCHEN (CULINARY PROCESS, WARMING GUIDE & FAQ)
        ==================================================== */}
        {activePage === 'kitchen' && (
          <section className="space-y-8">
            <div className="bg-[#FAF6F0] p-6 md:p-8 rounded-[36px] border-4 border-[#111] shadow-[0_12px_0_#111]">
              <span className="bg-[#D4FF59] text-[#111] font-bean text-xs px-3 py-1 rounded-full border-2 border-[#111]">
                CULINARY CRAFT & QUALITY
              </span>
              <h2 className="font-bean text-3xl sm:text-5xl text-[#111] mt-2 mb-6">
                INSIDE THE SNACKVERSE KITCHEN
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0038BA] text-white p-6 rounded-[28px] border-4 border-[#111]">
                  <div className="font-bean text-3xl text-[#FFF394] mb-2">01. AIR-POPPED BEANS</div>
                  <p className="text-xs leading-relaxed text-white/90">
                    We soak whole Mediterranean fava and lupini beans for 12 hours, then high-velocity air-roast them without deep-frying. That locks in 14g of plant protein and creates an audible crunch that rivals kettle chips.
                  </p>
                </div>
                <div className="bg-[#D81E36] text-white p-6 rounded-[28px] border-4 border-[#111]">
                  <div className="font-buffy text-3xl text-[#FFD6E0] mb-2">02. 8-SECOND WARM UP</div>
                  <p className="text-xs leading-relaxed text-white/90">
                    Every Buffy Cookie is baked with golden brown butter and 70% dark Belgian chocolate. Eat them straight from the bucket or pop a cookie in the microwave for 8 seconds for a warm molten fudge center.
                  </p>
                </div>
                <div className="bg-[#8C65F7] text-white p-6 rounded-[28px] border-4 border-[#111]">
                  <div className="font-psico-pixel text-xl text-[#D4FF59] mb-2">03. 48-HR COLD STEEL</div>
                  <p className="text-xs leading-relaxed text-white/90">
                    Psico Mess drinkware uses double-wall vacuum-sealed 18/8 stainless steel with an internal copper lining—keeping your late-night iced coffee freezing cold for 48 hours straight.
                  </p>
                </div>
              </div>
            </div>

            {/* Consumer FAQ Accordion */}
            <div className="bg-[#FAF6F0] p-6 md:p-8 rounded-[36px] border-4 border-[#111] shadow-[0_12px_0_#111]">
              <h3 className="font-bean text-2xl sm:text-3xl text-[#111] mb-4">
                FREQUENTLY ASKED SNACK QUESTIONS
              </h3>
              <div className="space-y-3">
                {[
                  {
                    q: 'Are BEAN ME UP pouches gluten-free and vegan?',
                    a: 'Yes! 100% plant-based, certified gluten-free, non-GMO, and made without soy or dairy. Each 50g pouch packs 14g–15g of complete plant protein.'
                  },
                  {
                    q: 'How long do BUFFY Cookies stay fresh in the bucket?',
                    a: 'Our buckets feature an airtight freshness seal that keeps cookies soft-baked for up to 3 weeks at room temperature (or 3 months frozen).'
                  },
                  {
                    q: 'Does the PSICO MESS Tamagotchi keychain actually work?',
                    a: 'Yes! The Room 013 Charm Bundle includes a working mini LCD virtual pet with battery pre-installed, plus 4 collectible Y2K acrylic and enamel charms.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border-2 border-[#111] rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                      className="w-full p-4 text-left font-bean text-sm sm:text-base text-[#111] flex items-center justify-between"
                    >
                      <span>{item.q}</span>
                      <span>{openFaq === idx ? '−' : '+'}</span>
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-gray-700 font-medium border-t border-gray-200 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ====================================================
            PAGE 5: 2-MINUTE CRAVING FINDER QUIZ
        ==================================================== */}
        {activePage === 'quiz' && (
          <section className="bg-[#FAF6F0] p-6 md:p-10 rounded-[36px] border-4 border-[#111] shadow-[0_14px_0_#111] max-w-3xl mx-auto text-center">
            <span className="bg-[#8C65F7] text-[#D4FF59] font-psico-pixel text-xs px-3 py-1 rounded-full border-2 border-[#111]">
              CRAVING MATCHMAKER
            </span>
            <h2 className="font-bean text-3xl sm:text-5xl text-[#111] mt-3 mb-2">
              FIND YOUR SOUL SNACK IN 3 CLICKS
            </h2>

            {quizStep < 3 ? (
              <div className="mt-6 space-y-6">
                <div className="text-xs font-bold text-gray-500">QUESTION {quizStep + 1} OF 3</div>
                <h3 className="font-bean text-2xl text-[#0038BA]">
                  {quizStep === 0 && "What's your current snacking mood?"}
                  {quizStep === 1 && "Pick your ideal flavor intensity:"}
                  {quizStep === 2 && "What's your go-to bev while snacking?"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(quizStep === 0
                    ? [
                        { label: 'Loud Savory Crunch 🫘', val: 'bean' },
                        { label: 'Warm Gooey Choco 🍪', val: 'buffy' },
                        { label: 'Late-Night Chaos 👾', val: 'psico' }
                      ]
                    : quizStep === 1
                    ? [
                        { label: 'Zesty Sea Salt & Tang ⚡', val: 'tangy' },
                        { label: 'Rich Brown Butter Fudge 🍫', val: 'sweet' },
                        { label: 'Spicy Chili Lime Fuego 🔥', val: 'spicy' }
                      ]
                    : [
                        { label: 'Iced Matcha / Cold Brew 🧊', val: 'tumbler' },
                        { label: 'Cold Glass of Oat Milk 🥛', val: 'cookies' },
                        { label: 'Sparkling Prebiotic Soda 🫧', val: 'beans' }
                      ]
                  ).map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, [quizStep]: opt.val });
                        setQuizStep(quizStep + 1);
                      }}
                      className="bg-white hover:bg-[#FFF394] border-4 border-[#111] rounded-2xl p-6 font-bean text-base text-[#111] shadow-[0_6px_0_#111] hover:-translate-y-1 transition-all"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-6 bg-[#FFF394] border-4 border-[#111] rounded-3xl p-6 space-y-4 animate-pop-in">
                <span className="bg-[#FF2E17] text-white font-bean text-xs px-3 py-1 rounded-full">
                  100% VIBE MATCH UNLOCKED!
                </span>
                <h3 className="font-bean text-2xl sm:text-3xl text-[#111]">
                  THE ULTIMATE LATE-NIGHT TRIO PACK
                </h3>
                <p className="text-xs sm:text-sm font-bold text-gray-700 max-w-md mx-auto">
                  We paired 1x Cobalt Crunch Bean Pouch (14g Protein), 1x Mini Buffy Cookie Bucket, and 1x Psico Swirl 40oz Tumbler with 15% off!
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      addToCart(PRODUCTS[0]);
                      addToCart(PRODUCTS[3]);
                      addToCart(PRODUCTS[6]);
                    }}
                    className="bg-[#0038BA] text-[#FFF394] font-bean text-sm px-6 py-3 rounded-2xl border-2 border-[#111] shadow-[0_4px_0_#111]"
                  >
                    + ADD ALL 3 TO MY BAG
                  </button>
                  <button
                    onClick={() => setQuizStep(0)}
                    className="bg-white text-[#111] font-bean text-xs px-4 py-3 rounded-2xl border-2 border-[#111]"
                  >
                    RETAKE QUIZ
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

      </main>

      {/* ==========================================
          "INSIDE THE PACK" NUTRITION FACTS & INGREDIENT MODAL
      ========================================== */}
      {selectedProductModal && (
        <div 
          onClick={() => setSelectedProductModal(null)}
          className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="modal-card bg-[#FAF6F0] border-4 border-[#111] rounded-[32px] max-w-2xl w-full p-6 sm:p-8 shadow-[0_12px_0_#111] animate-pop-in max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span 
                  style={{ backgroundColor: selectedProductModal.color, color: selectedProductModal.secondary }}
                  className="font-bean text-xs px-3 py-1 rounded-full border-2 border-[#111]"
                >
                  {selectedProductModal.badge}
                </span>
                <h3 className="font-bean text-2xl sm:text-3xl text-[#111] mt-2">
                  {selectedProductModal.name}
                </h3>
                <p className="text-xs font-bold text-gray-600">{selectedProductModal.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedProductModal(null)}
                className="bg-[#FF2E17] text-white font-bean text-xs px-3 py-1.5 rounded-full border-2 border-[#111]"
              >
                CLOSE ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-4">
              {/* Left: Product Visual & Description */}
              <div className="sm:col-span-6 space-y-3">
                <div className="bg-white rounded-2xl p-4 border-2 border-[#111] flex justify-center">
                  <ProductGraphic product={selectedProductModal} isHovered={true} />
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  {selectedProductModal.description}
                </p>
                <div>
                  <div className="font-bean text-xs text-[#111] mb-1">CLEAN INGREDIENTS / SPECS:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProductModal.ingredients.map((ing, i) => (
                      <span key={i} className="bg-[#FFF394] border border-[#111] px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: FDA-Style Retro Nutrition Facts Label */}
              <div className="sm:col-span-6 bg-white border-4 border-[#111] p-4 rounded-2xl text-[#111]">
                <div className="font-bean text-2xl border-b-8 border-[#111] pb-1">
                  Nutrition & Specs
                </div>
                <div className="text-xs font-bold border-b-4 border-[#111] py-1 flex justify-between">
                  <span>Serving Size</span>
                  <span>{selectedProductModal.nutrition.serving}</span>
                </div>
                <div className="border-b-4 border-[#111] py-2 flex justify-between items-baseline">
                  <span className="font-bean text-lg">Calories</span>
                  <span className="font-bean text-3xl">{selectedProductModal.nutrition.calories}</span>
                </div>
                <div className="divide-y divide-gray-300 text-xs font-bold">
                  <div className="py-1.5 flex justify-between">
                    <span>Total Fat</span>
                    <span>{selectedProductModal.nutrition.fat}</span>
                  </div>
                  <div className="py-1.5 flex justify-between">
                    <span>Dietary Fiber</span>
                    <span>{selectedProductModal.nutrition.fiber}</span>
                  </div>
                  <div className="py-1.5 flex justify-between">
                    <span>Total Sugars</span>
                    <span>{selectedProductModal.nutrition.sugar}</span>
                  </div>
                  <div className="py-2 flex justify-between text-sm bg-[#D4FF59] px-2 rounded mt-1">
                    <span className="font-bean">Protein</span>
                    <span className="font-bean">{selectedProductModal.nutrition.protein}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                addToCart(selectedProductModal);
                setSelectedProductModal(null);
              }}
              className="w-full py-3.5 rounded-2xl bg-[#0038BA] text-[#FFF394] border-2 border-[#111] font-bean text-sm shadow-[0_4px_0_#111] hover:bg-[#FF2E17] hover:text-white transition-colors"
            >
              + ADD TO MY BAG (${selectedProductModal.price})
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          SLIDE-OVER SHOPPING BAG DRAWER
      ========================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-[#FAF6F0] h-full border-l-4 border-[#111] p-6 flex flex-col justify-between animate-pop-in">
            <div>
              <div className="flex items-center justify-between pb-4 border-b-4 border-[#111]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="text-[#0038BA]" />
                  <h3 className="font-bean text-2xl text-[#111]">MY SNACK BAG ({cartCount})</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#FF2E17] text-white font-bean text-xs px-3 py-1.5 rounded-full border-2 border-[#111]"
                >
                  CLOSE ✕
                </button>
              </div>

              {/* Free Shipping & Holographic Sticker Progress */}
              <div className="my-4 bg-[#FFF394] border-2 border-[#111] rounded-2xl p-3">
                <div className="flex justify-between text-xs font-extrabold mb-1">
                  <span>
                    {cartTotal >= 35 
                      ? '🎉 UNLOCKED: FREE SHIPPING + HOLO STICKER PACK!' 
                      : `ADD $${35 - cartTotal} MORE FOR FREE SHIPPING + STICKERS!`}
                  </span>
                  <span>{freeShipProgress}%</span>
                </div>
                <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[#111]">
                  <div 
                    style={{ width: `${freeShipProgress}%` }}
                    className="h-full bg-[#0038BA] transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-3 max-h-[52vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 font-bold">
                    Your bag is empty! Add some crunchy beans, warm cookies, or Y2K tumblers.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white border-2 border-[#111] rounded-2xl p-3 flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          style={{ backgroundColor: item.color }}
                          className="w-12 h-12 rounded-xl border-2 border-[#111] flex items-center justify-center font-bean text-[10px] text-white"
                        >
                          {(item.brand || 'BOX').toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bean text-sm text-[#111]">{item.name}</h4>
                          <p className="text-xs font-bold text-gray-500">${item.price} each</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateCartQty(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-gray-100 border border-[#111] flex items-center justify-center hover:bg-[#FF9CE9]"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-bean text-sm w-5 text-center">{item.qty}</span>
                        <button 
                          onClick={() => updateCartQty(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-gray-100 border border-[#111] flex items-center justify-center hover:bg-[#D4FF59]"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t-4 border-[#111] space-y-3">
              <div className="flex items-center justify-between font-bean text-xl">
                <span>SUBTOTAL</span>
                <span>${cartTotal}.00</span>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  showToast("🚀 ORDER CONFIRMED! SNACKS & STICKERS ON THE WAY!");
                }}
                className="w-full py-4 rounded-2xl bg-[#D4FF59] text-[#111] border-4 border-[#111] font-bean text-lg shadow-[0_6px_0_#111] hover:bg-[#FF6AC2] hover:text-white transition-colors"
              >
                CHECKOUT NOW →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          FLOATING TOAST NOTIFICATION
      ========================================== */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#111111] text-[#FFF394] border-4 border-white px-6 py-3 rounded-full font-bean text-xs sm:text-sm shadow-2xl animate-bounce whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}