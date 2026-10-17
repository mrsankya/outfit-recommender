// src/components/StyleProfileModal.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Check, UserCheck, Flame, Droplets, Compass } from 'lucide-react';
import './StyleProfileModal.css';

export const UNDERTONE_PALETTES = {
  warm: {
    label: 'Warm Undertone',
    icon: '🔥',
    description: 'Golden, olive, or peachy complexion. Looks stunning in earthy tones, mustard, warm spice, and rich gold jewelry.',
    bestColors: ['Saffron', 'Mustard', 'Terracotta', 'Rust', 'Camel', 'Olive', 'Gold', 'Beige', 'Warm Orange'],
    hexes: ['#FF9933', '#E1AD01', '#C4603A', '#8B3A2A', '#C19A6B', '#6B6E2F', '#D4AF37', '#D4C5A9']
  },
  cool: {
    label: 'Cool Undertone',
    icon: '💎',
    description: 'Rosy, pink, or cool brown complexion. Looks radiant in crisp jewel tones, emerald, royal blue, burgundy, and silver.',
    bestColors: ['Royal Blue', 'Deep Teal', 'Burgundy', 'Lilac', 'Lavender', 'Charcoal', 'Silver', 'Navy', 'Dark Navy'],
    hexes: ['#2B4CC4', '#005F73', '#6D1C2A', '#C8A8D8', '#B39DDB', '#3C3C3C', '#C0C0C0', '#1B3A6B']
  },
  neutral: {
    label: 'Neutral Undertone',
    icon: '⚖️',
    description: 'Balanced complexion with mixed undertones. Blessed with versatility across both warm spices and cool jewel shades.',
    bestColors: ['Cream', 'Navy', 'Peach', 'Dusty Pink', 'Ivory', 'Light Blue', 'Off-White', 'Indigo'],
    hexes: ['#FFFDD0', '#1B3A6B', '#FFCBA4', '#D4808A', '#FFFFF0', '#A0C8E8', '#FAF9F6', '#274690']
  }
};

export default function StyleProfileModal({ onClose, onSaveProfile }) {
  const [undertone, setUndertone] = useState('warm');
  const [silhouette, setSilhouette] = useState('athletic');
  const [aesthetic, setAesthetic] = useState('Smart Casual');

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Load existing profile from localStorage
    try {
      const saved = localStorage.getItem('userStyleProfile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.undertone) setUndertone(parsed.undertone);
        if (parsed.silhouette) setSilhouette(parsed.silhouette);
        if (parsed.aesthetic) setAesthetic(parsed.aesthetic);
      }
    } catch {}

    return () => {
      document.body.style.overflow = prev || '';
    };
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const profile = {
      undertone,
      silhouette,
      aesthetic,
      palette: UNDERTONE_PALETTES[undertone]
    };
    try {
      localStorage.setItem('userStyleProfile', JSON.stringify(profile));
    } catch {}
    if (onSaveProfile) onSaveProfile(profile);
    onClose();
  };

  const currentPalette = UNDERTONE_PALETTES[undertone];

  return (
    <AnimatePresence>
      <div className="profile-modal-backdrop" onClick={onClose}>
        <motion.div
          className="profile-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="sp-header">
            <div className="sp-title-wrap">
              <span className="sp-badge"><Sparkles size={13} /> Personal Stylist Profiler</span>
              <h2>Your Skin Undertone & Fit Guide</h2>
              <p>Discover which clothing colors and silhouettes maximize your natural radiance for every occasion.</p>
            </div>
            <button className="sp-close" onClick={onClose}><X size={18} /></button>
          </div>

          <form onSubmit={handleSave} className="sp-form">
            {/* Step 1: Skin Undertone */}
            <div className="sp-section">
              <label className="sp-label">
                <span>1. Select Your Skin Undertone</span>
                <span className="sp-hint">Check wrist veins: Greenish = Warm, Bluish/Purple = Cool, Mixed = Neutral</span>
              </label>

              <div className="undertone-cards">
                <button
                  type="button"
                  className={`undertone-card ${undertone === 'warm' ? 'active' : ''}`}
                  onClick={() => setUndertone('warm')}
                >
                  <div className="ut-icon warm"><Flame size={18} /></div>
                  <div className="ut-info">
                    <strong>Warm Undertone</strong>
                    <span>Golden/Earthy tones, radiant in Mustard, Rust & Gold</span>
                  </div>
                  {undertone === 'warm' && <Check size={16} className="ut-check" />}
                </button>

                <button
                  type="button"
                  className={`undertone-card ${undertone === 'cool' ? 'active' : ''}`}
                  onClick={() => setUndertone('cool')}
                >
                  <div className="ut-icon cool"><Droplets size={18} /></div>
                  <div className="ut-info">
                    <strong>Cool Undertone</strong>
                    <span>Jewel tones, radiant in Royal Blue, Emerald & Silver</span>
                  </div>
                  {undertone === 'cool' && <Check size={16} className="ut-check" />}
                </button>

                <button
                  type="button"
                  className={`undertone-card ${undertone === 'neutral' ? 'active' : ''}`}
                  onClick={() => setUndertone('neutral')}
                >
                  <div className="ut-icon neutral"><Compass size={18} /></div>
                  <div className="ut-info">
                    <strong>Neutral Undertone</strong>
                    <span>Universal balance across both warm and cool shades</span>
                  </div>
                  {undertone === 'neutral' && <Check size={16} className="ut-check" />}
                </button>
              </div>
            </div>

            {/* Live Palette Preview for Selected Undertone */}
            <div className="sp-palette-preview">
              <div className="palette-preview-header">
                <span>✨ Best Color Palette for {currentPalette.label}:</span>
              </div>
              <div className="palette-swatches">
                {currentPalette.hexes.map((hex, i) => (
                  <span
                    key={hex}
                    className="palette-swatch-circle"
                    style={{ background: hex }}
                    title={currentPalette.bestColors[i] || hex}
                  />
                ))}
              </div>
              <p className="palette-desc">{currentPalette.description}</p>
            </div>

            {/* Step 2: Body Silhouette */}
            <div className="sp-section">
              <label className="sp-label">
                <span>2. Preferred Silhouette & Fit</span>
              </label>
              <div className="silhouette-grid">
                {[
                  ['athletic', 'Athletic / V-Taper', 'Broader shoulders, tapered waist (suits tailored blazers & open collars)'],
                  ['slim', 'Slim / Linear', 'Lean frame (suits structured layering, double-breasted & chinos)'],
                  ['relaxed', 'Relaxed / Easy Flow', 'Comfort-focused (suits flowing kurtas, unlined linen & overshirts)']
                ].map(([val, title, desc]) => (
                  <button
                    key={val}
                    type="button"
                    className={`silhouette-option ${silhouette === val ? 'active' : ''}`}
                    onClick={() => setSilhouette(val)}
                  >
                    <strong>{title}</strong>
                    <span>{desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sp-actions">
              <button type="button" className="btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                <UserCheck size={16} /> Save Profile & Highlight Best Outfits
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
