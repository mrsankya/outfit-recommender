import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RotateCcw, SlidersHorizontal, Dices, UploadCloud } from 'lucide-react';
import { OCCASIONS, SEASONS, STYLES, getRecommendations, getRandomOutfits, ALL_OUTFITS } from '../data/catalogue';
import OutfitCard from '../components/OutfitCard';
import WeatherWidget from '../components/WeatherWidget';
import ClothUploadModal from '../components/ClothUploadModal';
import './Recommend.css';

const OCCASION_ICONS = {
  Any: '✨', Casual: '😎', Formal: '👔', Party: '🎉',
  Sports: '🏋️', Traditional: '🪔', Beach: '🏖️'
};
const SEASON_ICONS = {
  Any: '🌍', Summer: '☀️', Winter: '❄️', Monsoon: '🌧️', 'Spring/Autumn': '🍂'
};
const STYLE_ICONS = {
  Any: '💫', 'Smart Casual': '🧥', Ethnic: '🧶', Sporty: '⚡',
  'Business Formal': '💼', Bohemian: '🌺', Streetwear: '🧢'
};

function FilterPill({ value, current, onClick, icon }) {
  const active = current === value;
  return (
    <button
      className={`filter-pill ${active ? 'active' : ''}`}
      onClick={() => onClick(value)}
    >
      <span>{icon}</span>
      <span>{value}</span>
    </button>
  );
}

function FilterGroup({ label, values, icons, current, onChange }) {
  return (
    <div className="filter-group">
      <p className="filter-group-label">{label}</p>
      <div className="filter-pills">
        {values.map(v => (
          <FilterPill
            key={v}
            value={v}
            current={current}
            onClick={onChange}
            icon={icons[v] || '•'}
          />
        ))}
      </div>
    </div>
  );
}

export default function Recommend() {
  const [occasion, setOccasion] = useState('Any');
  const [season,   setSeason]   = useState('Any');
  const [style,    setStyle]    = useState('Any');
  const [results,  setResults]  = useState(null);
  const [searched, setSearched] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [customOutfits, setCustomOutfits] = useState([]);

  const handleSearch = useCallback(() => {
    const baseResults = getRecommendations(occasion, season, style);
    // Include user-uploaded matching outfits
    const matchedCustom = customOutfits.filter(o =>
      (occasion === "Any" || o.occasion === occasion) &&
      (season   === "Any" || o.season   === season)   &&
      (style    === "Any" || o.style    === style)
    );
    setResults([...matchedCustom, ...baseResults]);
    setSearched(true);
  }, [occasion, season, style, customOutfits]);

  const handleExploreRandom = useCallback(() => {
    const randomSet = getRandomOutfits(9);
    setResults(randomSet);
    setSearched(true);
  }, []);

  const handleWeatherApply = useCallback((detectedSeason, weatherObj) => {
    setSeason(detectedSeason);
    const r = getRecommendations('Any', detectedSeason, 'Any');
    setResults(r);
    setSearched(true);
  }, []);

  const handleCustomItemAdded = useCallback((newOutfit) => {
    setCustomOutfits(prev => [newOutfit, ...prev]);
    setResults(prev => [newOutfit, ...(prev || [])]);
    setSearched(true);
  }, []);

  const handleReset = () => {
    setOccasion('Any'); setSeason('Any'); setStyle('Any');
    setResults(null); setSearched(false);
  };

  return (
    <div className="recommend-page">
      <div className="recommend-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="page-eyebrow">✦ Smart AI Stylist</span>
            <h1 className="page-title">Find your look</h1>
            <p className="page-desc">
              Filter by occasion, season, and style, leverage live weather-aware recommendations,
              or upload photos of your own clothes to generate matching coordinated outfits.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container recommend-body">
        {/* Live Weather Stylist Widget */}
        <WeatherWidget onApplyWeatherSeason={handleWeatherApply} />

        {/* Filter Panel */}
        <motion.div
          className="filter-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="filter-panel-header">
            <span className="filter-panel-title"><SlidersHorizontal size={16} /> Filters</span>
            <button className="reset-link" onClick={handleReset}>
              <RotateCcw size={13} /> Reset All
            </button>
          </div>

          <FilterGroup
            label="Occasion"
            values={OCCASIONS}
            icons={OCCASION_ICONS}
            current={occasion}
            onChange={setOccasion}
          />
          <FilterGroup
            label="Season"
            values={SEASONS}
            icons={SEASON_ICONS}
            current={season}
            onChange={setSeason}
          />
          <FilterGroup
            label="Style"
            values={STYLES}
            icons={STYLE_ICONS}
            current={style}
            onChange={setStyle}
          />

          <div className="filter-actions-row">
            <button className="search-btn" onClick={handleSearch}>
              <Search size={16} />
              Recommend Outfits
            </button>
            <button className="random-btn" onClick={handleExploreRandom} title="Surprise me with random outfits">
              <Dices size={17} />
              Explore Random Outfits
            </button>
            <button className="upload-trigger-btn" onClick={() => setShowUploadModal(true)} title="Upload photo of your own clothes">
              <UploadCloud size={17} />
              Upload Your Clothes
            </button>
          </div>
        </motion.div>

        {showUploadModal && (
          <ClothUploadModal
            onClose={() => setShowUploadModal(false)}
            onCustomItemAdded={handleCustomItemAdded}
          />
        )}

        {/* Results */}
        <AnimatePresence mode="wait">
          {!searched && (
            <motion.div
              key="idle"
              className="idle-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span style={{ fontSize: 72 }}>👗</span>
              <h3>Set your preferences above</h3>
              <p>Choose occasion, season, and style — then click Recommend Outfits.</p>
            </motion.div>
          )}

          {searched && results?.length === 0 && (
            <motion.div
              key="empty"
              className="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <span style={{ fontSize: 72 }}>🔍</span>
              <h3>No outfits found</h3>
              <p>Try setting one or more filters to <strong>"Any"</strong> for broader results.</p>
              <button className="search-btn" style={{ marginTop: 16 }} onClick={handleReset}>
                Reset Filters
              </button>
            </motion.div>
          )}

          {searched && results?.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="results-header">
                <h2 className="results-count">
                  {results.length} outfit{results.length !== 1 ? 's' : ''} found
                </h2>
                <p className="results-sub">
                  Occasion: <strong>{occasion}</strong> &nbsp;·&nbsp;
                  Season: <strong>{season}</strong> &nbsp;·&nbsp;
                  Style: <strong>{style}</strong>
                </p>
              </div>
              <div className="results-grid">
                {results.map((outfit, i) => (
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
