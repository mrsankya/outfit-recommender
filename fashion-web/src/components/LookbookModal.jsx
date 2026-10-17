// src/components/LookbookModal.jsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Copy, Check, Share2, Sparkles, Printer, Palette, IndianRupee } from 'lucide-react';
import { analyzeColorHarmony } from '../utils/colorTheory';
import { calculateOutfitBudget } from '../utils/budgetPricing';
import './LookbookModal.css';

export default function LookbookModal({ outfit, onClose }) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, []);

  const harmony = analyzeColorHarmony(outfit);
  const budget = calculateOutfitBudget(outfit);

  const getShareText = () => {
    return `✨ StyleSense AI Lookbook: ${outfit.name}\n` +
      `👗 Occasion: ${outfit.occasion} | Season: ${outfit.season} | Style: ${outfit.style}\n\n` +
      `👕 Top: ${outfit.top}\n` +
      `👖 Bottom: ${outfit.bottom}\n` +
      `👟 Footwear: ${outfit.shoes}\n` +
      `⌚ Accessory: ${outfit.accessory}\n\n` +
      `🎨 Color Harmony: ${harmony.harmonyType} (${harmony.matchScore}% Match)\n` +
      `💰 Est. Outfit Budget: ${budget.totalFormatted} (${budget.tierLabel})\n` +
      `💡 Stylist Tip: "${outfit.tip}"\n\n` +
      `— Styled by StyleSense AI (G H Raisoni CSE Data Science)`;
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      alert('Could not copy to clipboard.');
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="lb-backdrop" onClick={onClose}>
        <motion.div
          className="lb-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="lb-header">
            <div className="lb-header-title">
              <span className="lb-badge"><Sparkles size={13} /> OOTD Lookbook Card</span>
              <h3>Shareable Outfit Snapshot</h3>
            </div>
            <button className="lb-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          {/* Printable / Shareable Card Preview */}
          <div className="lb-body">
            <div className="lb-card" ref={cardRef}>
              <div className="lb-card-top-bar">
                <span className="lb-brand">STYLESENSE AI • LOOKBOOK</span>
                <span className="lb-serial">#OOTD-{outfit.id}</span>
              </div>

              <div className="lb-image-container">
                <img
                  src={outfit.image}
                  alt={outfit.name}
                  className="lb-outfit-img"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'; }}
                />
                <div className="lb-tag-overlay">
                  <span>{outfit.occasion}</span>
                  <span>{outfit.season}</span>
                  <span>{outfit.style}</span>
                </div>
              </div>

              <div className="lb-card-content">
                <h2 className="lb-outfit-title">{outfit.name}</h2>

                {/* Items Grid */}
                <div className="lb-items-grid">
                  <div className="lb-item-cell">
                    <span className="lb-cell-label">👕 TOP</span>
                    <span className="lb-cell-val">{outfit.top}</span>
                  </div>
                  <div className="lb-item-cell">
                    <span className="lb-cell-label">👖 BOTTOM</span>
                    <span className="lb-cell-val">{outfit.bottom}</span>
                  </div>
                  <div className="lb-item-cell">
                    <span className="lb-cell-label">👟 FOOTWEAR</span>
                    <span className="lb-cell-val">{outfit.shoes}</span>
                  </div>
                  <div className="lb-item-cell">
                    <span className="lb-cell-label">⌚ ACCESSORY</span>
                    <span className="lb-cell-val">{outfit.accessory}</span>
                  </div>
                </div>

                {/* Highlights bar */}
                <div className="lb-highlights-bar">
                  <div className="lb-hl-item">
                    <Palette size={13} style={{ color: harmony.badgeColor }} />
                    <span><strong>{harmony.harmonyType}</strong> ({harmony.matchScore}% Match)</span>
                  </div>
                  <div className="lb-hl-item">
                    <IndianRupee size={13} style={{ color: budget.tierColor }} />
                    <span><strong>{budget.totalFormatted}</strong> ({budget.tierLabel})</span>
                  </div>
                </div>

                {/* Swatches */}
                <div className="lb-swatches-row">
                  <span className="lb-swatch-label">PALETTE:</span>
                  <div className="lb-swatches">
                    {outfit.colours.map((col, idx) => (
                      <span key={idx} className="lb-swatch-pill">{col}</span>
                    ))}
                  </div>
                </div>

                {/* Stylist Tip */}
                <div className="lb-tip-box">
                  💡 <em>"{outfit.tip}"</em>
                </div>

                <div className="lb-watermark">
                  <span>✨ Curated by StyleSense AI • CSE Data Science Department</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="lb-actions-footer">
            <button className="lb-btn-copy" onClick={handleCopyText}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Lookbook Text'}</span>
            </button>
            <button className="lb-btn-whatsapp" onClick={handleWhatsAppShare}>
              <Share2 size={16} />
              <span>Share on WhatsApp</span>
            </button>
            <button className="lb-btn-print" onClick={handlePrint}>
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
