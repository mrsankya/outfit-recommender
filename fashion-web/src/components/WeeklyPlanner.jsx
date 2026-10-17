// src/components/WeeklyPlanner.jsx
import { useState, useEffect } from 'react';
import { Calendar, Wand2, X, Plus, Check, Trash2, Sparkles, ChevronRight } from 'lucide-react';
import './WeeklyPlanner.css';

const DAYS_OF_WEEK = [
  { key: 'mon', label: 'Monday', short: 'Mon', theme: 'Fresh Start / College Sharp', icon: '💼', defaultOccasion: 'Formal' },
  { key: 'tue', label: 'Tuesday', short: 'Tue', theme: 'Smart Casual Focus', icon: '👔', defaultOccasion: 'Smart Casual' },
  { key: 'wed', label: 'Wednesday', short: 'Wed', theme: 'Midweek Comfort', icon: '☕', defaultOccasion: 'Casual' },
  { key: 'thu', label: 'Thursday', short: 'Thu', theme: 'Presentation / Semi-Formal', icon: '✨', defaultOccasion: 'Formal' },
  { key: 'fri', label: 'Friday', short: 'Fri', theme: 'Friday Street / Casual Vibes', icon: '🧢', defaultOccasion: 'Casual' },
  { key: 'sat', label: 'Saturday', short: 'Sat', theme: 'Weekend Party & Outing', icon: '🎉', defaultOccasion: 'Party' },
  { key: 'sun', label: 'Sunday', short: 'Sun', theme: 'Festive / Traditional / Relaxed', icon: '🪔', defaultOccasion: 'Traditional' },
];

export default function WeeklyPlanner({ savedOutfits }) {
  const [schedule, setSchedule] = useState(() => {
    try {
      const stored = localStorage.getItem('weeklyOutfitPlan');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [pickingDay, setPickingDay] = useState(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('weeklyOutfitPlan', JSON.stringify(schedule));
    } catch {}
  }, [schedule]);

  const handleAssign = (dayKey, outfit) => {
    setSchedule(prev => ({ ...prev, [dayKey]: outfit }));
    setPickingDay(null);
  };

  const handleRemove = (dayKey, e) => {
    e.stopPropagation();
    setSchedule(prev => {
      const copy = { ...prev };
      delete copy[dayKey];
      return copy;
    });
  };

  const handleClearWeek = () => {
    if (window.confirm('Clear all scheduled outfits for the week?')) {
      setSchedule({});
    }
  };

  const handleAutoSchedule = () => {
    if (!savedOutfits || savedOutfits.length === 0) return;

    const newSchedule = {};
    const usedIds = new Set();

    DAYS_OF_WEEK.forEach(day => {
      // Find outfit matching preferred occasion/style not yet used
      let match = savedOutfits.find(o =>
        !usedIds.has(o.id) &&
        (o.occasion === day.defaultOccasion || o.style === day.defaultOccasion)
      );

      // Fallback: any unused outfit
      if (!match) {
        match = savedOutfits.find(o => !usedIds.has(o.id));
      }

      // Fallback 2: pick cyclically if fewer than 7 outfits saved
      if (!match && savedOutfits.length > 0) {
        match = savedOutfits[Math.floor(Math.random() * savedOutfits.length)];
      }

      if (match) {
        newSchedule[day.key] = match;
        usedIds.add(match.id);
      }
    });

    setSchedule(newSchedule);
  };

  const plannedCount = Object.keys(schedule).filter(k => schedule[k]).length;

  return (
    <div className="weekly-planner-container">
      <div className="wp-header">
        <div className="wp-title-area">
          <span className="wp-badge"><Calendar size={13} /> 7-Day OOTD Planner</span>
          <h2>Weekly Outfit Calendar</h2>
          <p>Organize your outfits for college presentations, parties, and weekends.</p>
        </div>
        <div className="wp-actions">
          <button
            type="button"
            className="wp-auto-btn"
            onClick={handleAutoSchedule}
            disabled={!savedOutfits || savedOutfits.length === 0}
            title="Automatically schedule outfits across 7 days"
          >
            <Wand2 size={15} />
            <span>Auto-Schedule Week</span>
          </button>
          {plannedCount > 0 && (
            <button
              type="button"
              className="wp-clear-btn"
              onClick={handleClearWeek}
              title="Clear all days"
            >
              <Trash2 size={14} /> Clear Week
            </button>
          )}
        </div>
      </div>

      {/* 7 Days Grid */}
      <div className="wp-days-grid">
        {DAYS_OF_WEEK.map(day => {
          const outfit = schedule[day.key];
          return (
            <div
              key={day.key}
              className={`wp-day-card ${outfit ? 'has-outfit' : 'empty-day'}`}
              onClick={() => setPickingDay(day)}
            >
              <div className="wp-day-top">
                <span className="wp-day-icon">{day.icon}</span>
                <span className="wp-day-name">{day.short}</span>
              </div>
              <span className="wp-day-theme">{day.theme}</span>

              {outfit ? (
                <div className="wp-outfit-preview">
                  <div className="wp-outfit-img-wrap">
                    <img
                      src={outfit.image}
                      alt={outfit.title}
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80'; }}
                    />
                    <button
                      className="wp-day-remove-btn"
                      onClick={(e) => handleRemove(day.key, e)}
                      title="Remove outfit from this day"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <h4 className="wp-outfit-title">{outfit.title}</h4>
                  <div className="wp-outfit-tags">
                    <span>{outfit.occasion}</span>
                    <span>{outfit.season}</span>
                  </div>
                </div>
              ) : (
                <div className="wp-empty-slot">
                  <div className="wp-add-circle">
                    <Plus size={16} />
                  </div>
                  <span className="wp-empty-text">Plan Look</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Outfit Selector Modal */}
      {pickingDay && (
        <div className="wp-modal-backdrop" onClick={() => setPickingDay(null)}>
          <div className="wp-picker-modal" onClick={(e) => e.stopPropagation()}>
            <div className="wp-picker-header">
              <div className="wp-picker-title">
                <h3>Select Outfit for {pickingDay.label}</h3>
                <p>Choose an outfit from your saved wardrobe collection ({pickingDay.theme})</p>
              </div>
              <button className="wp-picker-close" onClick={() => setPickingDay(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="wp-picker-list">
              {(!savedOutfits || savedOutfits.length === 0) ? (
                <div className="wp-no-outfits">
                  <p>You have no saved outfits in your wardrobe.</p>
                  <p>Restore the demo wardrobe or browse recommendations first!</p>
                </div>
              ) : (
                savedOutfits.map(outfit => (
                  <div
                    key={outfit.id}
                    className="wp-picker-item"
                    onClick={() => handleAssign(pickingDay.key, outfit)}
                  >
                    <img
                      src={outfit.image}
                      alt={outfit.title}
                      className="wp-picker-img"
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80'; }}
                    />
                    <div className="wp-picker-info">
                      <h4>{outfit.title}</h4>
                      <p>{outfit.occasion} • {outfit.season} • {outfit.style}</p>
                    </div>
                    <button className="wp-select-btn">
                      <Check size={14} /> Assign
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
