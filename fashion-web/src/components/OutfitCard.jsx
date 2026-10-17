import { useState } from 'react';
import { Heart, Sparkles, Palette, IndianRupee, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWardrobe } from '../context/WardrobeContext';
import { analyzeColorHarmony } from '../utils/colorTheory';
import { calculateOutfitBudget } from '../utils/budgetPricing';
import PromptModal from './PromptModal';
import LookbookModal from './LookbookModal';
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
  const [showHarmony, setShowHarmony] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const [showLookbook, setShowLookbook] = useState(false);

  const harmony = analyzeColorHarmony(outfit);
  const budget = calculateOutfitBudget(outfit);

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

        {/* Color Theory 60-30-10 & Harmony Section */}
        <div className="card-harmony-box">
          <button
            type="button"
            className="harmony-toggle-btn"
            onClick={() => setShowHarmony(!showHarmony)}
            title="Explore 60-30-10 Color Theory & Harmony Breakdown"
          >
            <div className="harmony-btn-left">
              <Palette size={12} className="harmony-icon" />
              <span className="harmony-score-text">{harmony.matchScore}% Match</span>
              <span className="harmony-type-tag" style={{ borderColor: harmony.badgeColor, color: harmony.badgeColor }}>
                {harmony.harmonyType}
              </span>
            </div>
            {showHarmony ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>

          {showHarmony && (
            <div className="harmony-expanded-details">
              {/* 60-30-10 Proportional Visual Bar */}
              <div className="ratio-bar">
                <div
                  className="ratio-segment dominant"
                  style={{ width: '60%', background: harmony.dominant.hex }}
                  title={`60% Dominant: ${harmony.dominant.name}`}
                />
                <div
                  className="ratio-segment secondary"
                  style={{ width: '30%', background: harmony.secondary.hex }}
                  title={`30% Secondary: ${harmony.secondary.name}`}
                />
                <div
                  className="ratio-segment accent"
                  style={{ width: '10%', background: harmony.accent.hex }}
                  title={`10% Accent: ${harmony.accent.name}`}
                />
              </div>

              {/* 60-30-10 Breakdown Items */}
              <div className="ratio-labels">
                <div className="ratio-item">
                  <span className="ratio-dot" style={{ background: harmony.dominant.hex }} />
                  <span className="ratio-name"><strong>60%</strong> {harmony.dominant.name}</span>
                </div>
                <div className="ratio-item">
                  <span className="ratio-dot" style={{ background: harmony.secondary.hex }} />
                  <span className="ratio-name"><strong>30%</strong> {harmony.secondary.name}</span>
                </div>
                <div className="ratio-item">
                  <span className="ratio-dot" style={{ background: harmony.accent.hex }} />
                  <span className="ratio-name"><strong>10%</strong> {harmony.accent.name}</span>
                </div>
              </div>

              <p className="harmony-explanation">
                🎨 {harmony.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Estimated Outfit Cost & Budget Tier Breakdown */}
        <div className="card-budget-box">
          <button
            type="button"
            className="budget-toggle-btn"
            onClick={() => setShowBudget(!showBudget)}
            title="View Estimated Retail Price & Cost Breakdown"
          >
            <div className="budget-btn-left">
              <IndianRupee size={12} className="budget-icon" />
              <span className="budget-total-text">{budget.totalFormatted} Est.</span>
              <span className="budget-tier-tag" style={{ borderColor: budget.tierColor, color: budget.tierColor }}>
                {budget.tierLabel}
              </span>
            </div>
            {showBudget ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>

          {showBudget && (
            <div className="budget-expanded-details">
              <div className="budget-items-list">
                {budget.items.map(it => (
                  <div key={it.label} className="budget-item-row">
                    <span className="budget-item-label">{it.label}</span>
                    <span className="budget-item-val">{it.formatted}</span>
                  </div>
                ))}
              </div>
              <div className="budget-summary-row">
                <span>Total Retail Estimate</span>
                <strong>{budget.totalFormatted}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Tip */}
        <div className="card-tip">
          <span className="tip-icon">💡</span>
          <span className="tip-text">{outfit.tip}</span>
        </div>

        {/* Actions Footer: AI Try-On & Lookbook Modal Buttons */}
        <div className="card-actions-footer">
          <button
            className="ai-prompt-trigger-btn"
            onClick={() => setShowPrompt(true)}
            title="Generate AI prompt to visualize how you look in this outfit"
          >
            <Sparkles size={14} />
            <span>AI Try-On</span>
          </button>
          <button
            className="lookbook-trigger-btn"
            onClick={() => setShowLookbook(true)}
            title="Export / Share OOTD Lookbook Card"
          >
            <Share2 size={14} />
            <span>Lookbook</span>
          </button>
        </div>
      </motion.div>

      {showPrompt && (
        <PromptModal outfit={outfit} onClose={() => setShowPrompt(false)} />
      )}

      {showLookbook && (
        <LookbookModal outfit={outfit} onClose={() => setShowLookbook(false)} />
      )}
    </>
  );
}
