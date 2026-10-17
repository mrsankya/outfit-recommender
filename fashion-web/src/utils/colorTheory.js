// src/utils/colorTheory.js
// Fashion Color Theory Engine: 60-30-10 Rule & Chromatic Harmony Analysis

export const COLOR_HEX_MAP = {
  'White': '#F8F9FA',
  'Black': '#1A1A1A',
  'Navy': '#1B3A6B',
  'Beige': '#D4C5A9',
  'Light Brown': '#A07850',
  'Olive': '#6B6E2F',
  'Charcoal': '#3C3C3C',
  'Grey': '#888888',
  'Red': '#C0392B',
  'Camel': '#C19A6B',
  'Cream': '#FFFDD0',
  'Rust': '#8B3A2A',
  'Gold': '#D4AF37',
  'Silver': '#C0C0C0',
  'Burgundy': '#6D1C2A',
  'Lavender': '#B39DDB',
  'Coral': '#E8775A',
  'Aqua': '#00B4CC',
  'Sand': '#D4B483',
  'Indigo': '#274690',
  'Saffron': '#FF9933',
  'Mint Green': '#98D8C8',
  'Sky Blue': '#74B9E0',
  'Royal Blue': '#2B4CC4',
  'Maroon': '#800000',
  'Peach': '#FFCBA4',
  'Terracotta': '#C4603A',
  'Mustard': '#E1AD01',
  'Ivory': '#FFFFF0',
  'Neon Yellow': '#E8FF00',
  'Electric Blue': '#0080FF',
  'Turquoise': '#40E0D0',
  'Burnt Orange': '#CC5500',
  'Lilac': '#C8A8D8',
  'Deep Teal': '#005F73',
  'Pale Pink': '#FAD2E1',
  'Light Blue': '#A0C8E8',
  'Dark Green': '#1B4332',
  'Forest Green': '#2D5A3D',
  'Natural': '#C8B89A',
  'Dusty Pink': '#D4808A',
  'Blue Check': '#4A6890',
  'Dark Navy': '#0F1E36',
  'Tan': '#D2B48C',
  'Light Yellow': '#FFF3B0',
  'Off-White': '#FAF9F6',
  'Reflective Grey': '#A8A8B8',
  'Reflective Silver': '#D0D0E0',
};

// Evaluate color palette harmony and calculate 60-30-10 distribution
export function analyzeColorHarmony(outfit) {
  const colours = outfit.colours || ['White', 'Navy'];
  const count = colours.length;

  let harmonyType = 'Complementary';
  let badgeColor = '#3b82f6';
  let matchScore = 95;
  let explanation = '';

  const c1 = colours[0] || 'White';
  const c2 = colours[1] || 'Navy';
  const c3 = colours[2] || colours[0];

  const neutrals = ['White', 'Black', 'Grey', 'Charcoal', 'Off-White', 'Cream', 'Ivory', 'Beige', 'Tan', 'Navy', 'Dark Navy'];
  const allNeutrals = colours.every(c => neutrals.includes(c));

  // Determine Harmony Classification
  if (outfit.style === 'Ethnic' || outfit.occasion === 'Traditional') {
    harmonyType = 'Royal Festive Harmony';
    badgeColor = '#d97706';
    matchScore = 98;
    explanation = `Rich heritage contrast combining ${c1} foundation with ${c2} accents and ${c3} detailing. Ideal for festive radiance and photographic depth.`;
  } else if (allNeutrals) {
    if (colours.some(c => c.includes('Grey') || c.includes('Charcoal') || c.includes('Black'))) {
      harmonyType = 'Monochromatic Neutral';
      badgeColor = '#6b7280';
      matchScore = 94;
      explanation = `Tonal layering in the ${c1} / ${c2} spectrum. Creates an elongated silhouette with quiet luxury aesthetics.`;
    } else {
      harmonyType = 'Classic Sartorial';
      badgeColor = '#059669';
      matchScore = 96;
      explanation = `Timeless high-contrast balance between crisp ${c1} and grounded ${c2}, complying with international bespoke tailoring rules.`;
    }
  } else if (
    (colours.includes('Navy') && (colours.includes('Camel') || colours.includes('Beige') || colours.includes('Tan'))) ||
    (colours.includes('Terracotta') && colours.includes('Mustard')) ||
    (colours.includes('Sky Blue') && colours.includes('White'))
  ) {
    harmonyType = 'Complementary Harmony';
    badgeColor = '#a855f7';
    matchScore = 97;
    explanation = `Opposing color wheel synergy: cool ${c1} is dynamically balanced by warm ${c2}, creating maximum visual appeal without eye fatigue.`;
  } else {
    harmonyType = 'Analogous Harmony';
    badgeColor = '#2563eb';
    matchScore = 95;
    explanation = `Adjacent chromatic tones (${c1} & ${c2}) blend smoothly for a cohesive, natural aesthetic suited for ${outfit.season}.`;
  }

  return {
    harmonyType,
    badgeColor,
    matchScore,
    explanation,
    dominant: {
      name: c1,
      ratio: '60%',
      role: 'Dominant (Main Body / Topwear)',
      hex: COLOR_HEX_MAP[c1] || '#333333'
    },
    secondary: {
      name: c2,
      ratio: '30%',
      role: 'Secondary (Bottomwear / Coordinates)',
      hex: COLOR_HEX_MAP[c2] || '#666666'
    },
    accent: {
      name: c3,
      ratio: '10%',
      role: 'Accent (Footwear / Accessories)',
      hex: COLOR_HEX_MAP[c3] || '#D4AF37'
    }
  };
}
