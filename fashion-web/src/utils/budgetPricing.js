// src/utils/budgetPricing.js

/**
 * Deterministically generates realistic Indian Rupee (₹ INR) retail cost estimates
 * for an outfit based on occasion, style, and items.
 */
export function calculateOutfitBudget(outfit) {
  // Simple seed hash from outfit id or name for consistency
  const seed = (outfit.id ? Number(outfit.id) * 31 : 17) + (outfit.name?.length || 10);

  const occ = (outfit.occasion || '').toLowerCase();
  const sty = (outfit.style || '').toLowerCase();

  let topBase = 999;
  let bottomBase = 1199;
  let shoesBase = 1499;
  let accBase = 499;
  let tierLabel = 'Mid-Range';
  let tierColor = '#f59e0b'; // amber

  if (occ.includes('traditional') || sty.includes('ethnic') || outfit.name?.toLowerCase().includes('sherwani')) {
    topBase = 3499 + ((seed * 173) % 2500);
    bottomBase = 999 + ((seed * 71) % 800);
    shoesBase = 1299 + ((seed * 89) % 1000);
    accBase = 699 + ((seed * 43) % 600);
    tierLabel = 'Royal Festive';
    tierColor = '#8b5cf6'; // purple
  } else if (occ.includes('formal') || sty.includes('business')) {
    topBase = 2199 + ((seed * 131) % 1500);
    bottomBase = 1499 + ((seed * 67) % 700);
    shoesBase = 1999 + ((seed * 97) % 1200);
    accBase = 599 + ((seed * 37) % 400);
    tierLabel = 'Corporate Executive';
    tierColor = '#3b82f6'; // blue
  } else if (occ.includes('party')) {
    topBase = 1699 + ((seed * 109) % 1200);
    bottomBase = 1399 + ((seed * 59) % 600);
    shoesBase = 1799 + ((seed * 83) % 900);
    accBase = 499 + ((seed * 29) % 500);
    tierLabel = 'Night Glamour';
    tierColor = '#ec4899'; // pink
  } else if (sty.includes('streetwear') || occ.includes('sports')) {
    topBase = 799 + ((seed * 53) % 700);
    bottomBase = 899 + ((seed * 47) % 600);
    shoesBase = 1299 + ((seed * 79) % 800);
    accBase = 299 + ((seed * 19) % 300);
    tierLabel = 'College Budget';
    tierColor = '#10b981'; // green
  } else {
    // Casual / Smart Casual
    topBase = 899 + ((seed * 61) % 800);
    bottomBase = 1199 + ((seed * 41) % 600);
    shoesBase = 1499 + ((seed * 73) % 800);
    accBase = 399 + ((seed * 23) % 300);
    tierLabel = 'Daily Smart';
    tierColor = '#10b981'; // green
  }

  // Round to nearest 50 or 99
  const roundInr = (val) => Math.round(val / 50) * 50 - 1; // e.g. 1499, 899

  const topPrice = roundInr(topBase);
  const bottomPrice = roundInr(bottomBase);
  const shoesPrice = roundInr(shoesBase);
  const accPrice = roundInr(accBase);
  const totalPrice = topPrice + bottomPrice + shoesPrice + accPrice;

  return {
    total: totalPrice,
    totalFormatted: `₹${totalPrice.toLocaleString('en-IN')}`,
    tierLabel,
    tierColor,
    items: [
      { label: 'Top', name: outfit.top || 'Topwear', price: topPrice, formatted: `₹${topPrice.toLocaleString('en-IN')}` },
      { label: 'Bottom', name: outfit.bottom || 'Bottomwear', price: bottomPrice, formatted: `₹${bottomPrice.toLocaleString('en-IN')}` },
      { label: 'Shoes', name: outfit.shoes || 'Footwear', price: shoesPrice, formatted: `₹${shoesPrice.toLocaleString('en-IN')}` },
      { label: 'Accessory', name: outfit.accessory || 'Accents', price: accPrice, formatted: `₹${accPrice.toLocaleString('en-IN')}` }
    ]
  };
}
