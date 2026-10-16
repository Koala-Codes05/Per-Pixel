// Bottle 2/3 names, tasting notes and price are placeholders until Ghaslet confirms them.
export const SAUCES = [
  {
    id: 'classic', name: 'The Classic', word: 'CLASSIC', light: 'go', tag: 'starts here', heat: 1, price: 399,
    label: '#1F3DFF', accent: '#FFC21A', skin: '#FF9A3C', mood: 'grin',
    liquid: ['#3d0803', '#b01f0e', '#ff5a2e'],
    notes: 'Bright, tangy, garlicky. The one that lives on the table and goes on everything.',
    flavour: ['tangy', 'garlic', 'everyday'],
  },
  {
    id: 'smokey', name: 'The Smokey', word: 'SMOKEY', light: 'wait', tag: 'this one hits harder', heat: 2, price: 399,
    label: '#FFC21A', accent: '#140F0C', skin: '#7BC043', mood: 'smirk',
    liquid: ['#260703', '#701a09', '#c2441c'],
    notes: 'Deep and smoky with a slow climb. Tastes calm for three seconds. Then it isn\u2019t.',
    flavour: ['smoky', 'slow burn', 'deep'],
  },
  {
    id: 'spicy', name: 'The Spicy', word: 'SPICY', light: 'stop', tag: 'this one just wrecks you', heat: 3, price: 399,
    label: '#FF6A13', accent: '#FFF4E0', skin: '#E5251B', mood: 'scream',
    liquid: ['#4f0902', '#d0210b', '#ff6c3f'],
    notes: 'Sharp, loud, no brakes. For people who read the warning and kept going.',
    flavour: ['sharp', 'loud', 'zero mercy'],
  },
];

export const byId = Object.fromEntries(SAUCES.map((s) => [s.id, s]));

export const PAIRINGS = [
  ['Masala omelette', 'classic', 'a gentle start'],
  ['Momos', 'smokey', 'dunk, don\u2019t dab'],
  ['2am Maggi', 'spicy', 'stir it straight in'],
  ['Cheese toast', 'classic', 'melt first, then drizzle'],
  ['Fried chicken', 'smokey', 'glaze it while it\u2019s hot'],
  ['Pizza crusts', 'spicy', 'save the best for last'],
];

export const REEL = [
  ['hero-product.jpg', 'the classic, 2am, flash on', '26 10 02'],
  ['social-tasting.jpg', 'good food, better days', '26 09 14'],
  ['story-lifestyle.jpg', 'she said it wasn\u2019t that hot', '26 08 30'],
  ['food-wings.jpg', 'hot, sticky, gone', '26 08 11'],
  ['bottle-trio.jpg', 'three kinds of chaos', '26 07 27'],
  ['food-pairings.jpg', 'pass the bottle', '26 07 03'],
];

export const IG = 'https://www.instagram.com/ghaslet.in/';
