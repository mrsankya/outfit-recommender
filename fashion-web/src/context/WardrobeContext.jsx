// src/context/WardrobeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { OUTFITS } from '../data/catalogue';

const WardrobeContext = createContext();

// 8 curated outfits across Indian Ethnic, Western Formal, Party, Streetwear, and Casual
export const DEFAULT_DEMO_IDS = [22, 24, 41, 1, 30, 33, 2, 35];
export const DEFAULT_DEMO_WARDROBE = OUTFITS.filter(o => DEFAULT_DEMO_IDS.includes(o.id));

export function WardrobeProvider({ children }) {
  const [saved, setSaved] = useState(() => {
    try {
      const stored = localStorage.getItem('myWardrobe');
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        // If user explicitly cleared or had items, use that; sync with fresh catalogue images
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(item => {
            const fresh = OUTFITS.find(o => o.id === item.id);
            return fresh ? { ...item, image: fresh.image } : item;
          });
        }
      }
      return DEFAULT_DEMO_WARDROBE;
    } catch {
      return DEFAULT_DEMO_WARDROBE;
    }
  });

  useEffect(() => {
    localStorage.setItem('myWardrobe', JSON.stringify(saved));
  }, [saved]);

  const toggle = (outfit) => {
    setSaved(prev =>
      prev.find(o => o.id === outfit.id)
        ? prev.filter(o => o.id !== outfit.id)
        : [...prev, outfit]
    );
  };

  const clearWardrobe = () => {
    setSaved([]);
  };

  const resetToDemo = () => {
    setSaved(DEFAULT_DEMO_WARDROBE);
  };

  const isSaved = (id) => saved.some(o => o.id === id);

  return (
    <WardrobeContext.Provider value={{ saved, toggle, clearWardrobe, resetToDemo, isSaved }}>
      {children}
    </WardrobeContext.Provider>
  );
}

export const useWardrobe = () => useContext(WardrobeContext);
