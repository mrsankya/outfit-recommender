// src/pages/Wardrobe.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, RotateCcw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWardrobe } from '../context/WardrobeContext';
import OutfitCard from '../components/OutfitCard';
import './Wardrobe.css';

export default function WardrobePage() {
  const { saved, clearWardrobe, resetToDemo } = useWardrobe();

  return (
    <div className="wardrobe-page">
      <div className="wardrobe-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="wardrobe-hero-top">
              <span className="page-eyebrow">✦ My Wardrobe</span>
              <span className="demo-live-badge">
                <Sparkles size={12} /> Jury Presentation Ready
              </span>
            </div>
            <h1 className="page-title">Curated Wardrobe Collection</h1>
            <p className="page-desc">
              Your personal closet of styled looks. Pre-populated with authentic Indian ethnic attire,
              business formals, party wear, and casuals for evaluation and jury demonstration.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container wardrobe-body">
        <AnimatePresence mode="wait">
          {saved.length === 0 ? (
            <motion.div
              key="empty"
              className="wardrobe-empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ShoppingBag size={64} strokeWidth={1} />
              <h3>Your wardrobe is empty</h3>
              <p>You can browse outfits and tap the ♡ to save them, or restore the pre-curated demo collection anytime.</p>
              <div className="wardrobe-empty-actions">
                <button onClick={resetToDemo} className="btn-restore-demo">
                  <RotateCcw size={15} /> Restore Jury Demo Collection
                </button>
                <Link to="/recommend" className="btn-primary">
                  Browse Recommendations
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="wardrobe-toolbar">
                <div className="toolbar-info">
                  <span className="results-count">{saved.length} outfit{saved.length !== 1 ? 's' : ''} saved</span>
                  <span className="toolbar-hint">Tap any outfit's "AI Try-On Prompt" to generate Midjourney/SD prompt</span>
                </div>
                <div className="toolbar-buttons">
                  <button
                    className="reset-demo-btn"
                    onClick={resetToDemo}
                    title="Reload the 8 standard demo garments for jury presentation"
                  >
                    <RotateCcw size={13} /> Reset Demo Outfits
                  </button>
                  <button
                    className="clear-btn"
                    onClick={clearWardrobe}
                  >
                    <Trash2 size={13} /> Clear All
                  </button>
                </div>
              </div>
              <div className="results-grid">
                {saved.map((outfit, i) => (
                  <OutfitCard key={outfit.id} outfit={outfit} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
