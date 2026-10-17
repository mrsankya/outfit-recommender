import { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWardrobe } from '../context/WardrobeContext';
import PromptModal from './PromptModal';
import './OutfitCard.css';

const COLOUR_MAP = {
  'White': '#F5F5F5', 'Black': '#111111', 'Navy': '#1B3A6B',
  'Beige': '#D4C5A9', 'Light Brown': '#A07850', 'Olive': '#6B6E2F',
  'Charcoal': '#3C3C3C', 'Grey': '#888888', 'Red': '#C0392B',
  'Camel': '#C19A6B', 'Cream': '#FFFDD0', 'Rust': '#8B3A2A',
  'Gold': '#C4A000', 'Silver': '#AAAAAA', 'Burgundy': '#6D1C2A',
  'Lavender': '#B39DDB', 'Coral': '#E8775A', 'Aqua': '#00B4CC',
  'Sand': '#D4B483', 'Indigo': '#274690', 'Saffron': '#FF9500',
  'Mint Green': '#98D8C8', 'Sky Blue': '#74B9E0', 'Royal Blue': '#2B4CC4',
  'Maroon': '#6B0000', 'Peach': '#FFCBA4', 'Terracotta': '#C4603A',
  'Mustard': '#C4A000', 'Ivory': '#FFFFF0', 'Neon Yellow': '#E8FF00',
  'Electric Blue': '#0080FF', 'Turquoise': '#00D4CC', 'Burnt Orange': '#CC5500',
  'Lilac': '#C8A8D8', 'Deep Teal': '#007070', 'Pale Pink': '#F8C8D0',
  'Light Blue': '#A0C8E8', 'Dark Green': '#1A4A1A', 'Neon Orange': '#FF6000',
  'Forest Green': '#2D5A3D', 'Natural': '#C8B89A', 'Dusty Pink': '#D4808A',
  'Blue Check': '#4A6890', 'Dark Navy': '#111A3A', 'Tan': '#B08050',
  'Light Yellow': '#FFFAAA', 'Off-White': '#F8F6F0',
  'Reflective Grey': '#B0B0C0', 'Reflective Silver': '#D0D0E0',
};

function ColourChip({ colour }) {
  const bg = COLOUR_MAP[colour] || '#CCCCCC';
  const isLight = ['White','Cream','Ivory','Off-White','Light Yellow','Neon Yellow','Lavender','Pale Pink','Peach','Light Blue'].includes(colour);
  return (
    <span
      className="colour-chip"
      style={{ background: bg, color: isLight ? '#222' : '#fff', border: isLight ? '1px solid #ddd' : 'none' }}
      title={colour}
    >
      {colour}
    </span>
  );
}

export default function OutfitCard({ outfit, index }) {
  const { toggle, isSaved } = useWardrobe();
  const saved = isSaved(outfit.id);
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <>
      <motion.div
        className="outfit-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.07, ease: 'easeOut' }}
        layout
      >
        {/* Card Header & Photo */}
        <div className="card-header">
          <span className="card-emoji">{outfit.emoji}</span>
          <button
            className={`heart-btn ${saved ? 'saved' : ''}`}
            onClick={() => toggle(outfit)}
            title={saved ? 'Remove from wardrobe' : 'Save to wardrobe'}
          >
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {outfit.image && (
          <div className="card-image-wrap">
            <img src={outfit.image} alt={outfit.name} className="card-image" loading="lazy" />
          </div>
        )}

        {/* Name */}
        <h3 className="card-name">{outfit.name}</h3>

        {/* Tags */}
        <div className="card-tags">
          <span className="tag tag-occasion">{outfit.occasion}</span>
          <span className="tag tag-season">{outfit.season}</span>
          <span className="tag tag-style">{outfit.style}</span>
          {outfit.source && (
            <span className="tag" style={{ borderStyle: 'dashed', opacity: 0.75 }}>
              {outfit.source === 'kaggle_clothes_dataset' ? 'Kaggle Dataset' : outfit.source}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="card-details">
          {[
            ['👕', 'Top',       outfit.top],
            ['👖', 'Bottom',    outfit.bottom],
            ['👟', 'Shoes',     outfit.shoes],
            ['💼', 'Accessory', outfit.accessory],
          ].map(([icon, label, value]) => (
            <div key={label} className="detail-row">
              <span className="detail-label">{icon} {label}</span>
              <span className="detail-value">{value}</span>
            </div>
          ))}
        </div>

        {/* Colour Palette */}
        <div className="colour-row">
          {outfit.colours.map(c => <ColourChip key={c} colour={c} />)}
        </div>

        {/* Tip */}
        <div className="card-tip">
          <span className="tip-icon">💡</span>
          <span className="tip-text">{outfit.tip}</span>
        </div>

        {/* AI Try-on Visualizer Prompt Button */}
        <button
          className="ai-prompt-trigger-btn"
          onClick={() => setShowPrompt(true)}
          title="Generate AI prompt to visualize how you look in this outfit"
        >
          <Sparkles size={14} />
          <span>AI Try-On Prompt</span>
        </button>
      </motion.div>

      {showPrompt && (
        <PromptModal outfit={outfit} onClose={() => setShowPrompt(false)} />
      )}
    </>
  );
}
