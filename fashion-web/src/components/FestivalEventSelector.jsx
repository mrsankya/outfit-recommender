// src/components/FestivalEventSelector.jsx
import { useState } from 'react';
import { Sparkles, Crown, Sun, Music, Flame, Award, ChevronDown, ChevronUp } from 'lucide-react';
import './FestivalEventSelector.css';

export const INDIAN_FESTIVAL_EVENTS = [
  {
    id: 'diwali',
    name: 'Diwali & Puja',
    icon: '🪔',
    badge: 'Festive Grandeur',
    season: 'Winter',
    colors: ['Gold', 'Maroon', 'Saffron', 'Cream'],
    dressCode: 'Rich Silk Kurta Pajama, Brocade Sherwani, or Anarkali',
    tip: 'Opt for lustrous raw silk or tussar silk with subtle zari embroidery. Pair with embroidered mojaris.'
  },
  {
    id: 'wedding',
    name: 'Wedding & Reception',
    icon: '👑',
    badge: 'Royal Glamour',
    season: 'Winter',
    colors: ['Royal Blue', 'Deep Maroon', 'Ivory', 'Gold'],
    dressCode: 'Designer Embroidered Sherwani or Royal Bandhgala Suit',
    tip: 'A contrasting pashmina stole and heritage brooch instantly creates a regal wedding presence.'
  },
  {
    id: 'haldi',
    name: 'Haldi & Sangeet',
    icon: '💛',
    badge: 'Celebration',
    season: 'Spring/Autumn',
    colors: ['Mustard', 'Turmeric Yellow', 'Peach', 'Warm Orange'],
    dressCode: 'Bright Cotton/Linen Kurta with Nehru Jacket',
    tip: 'Haldi celebrations call for vibrant yellow tones in breathable fabrics that withstand ceremonies.'
  },
  {
    id: 'navratri',
    name: 'Navratri & Garba',
    icon: '🥁',
    badge: 'High Energy',
    season: 'Spring/Autumn',
    colors: ['Indigo', 'Bright Red', 'Emerald', 'Rust'],
    dressCode: 'Flared Short Kurta with Dhoti or Mirror-Work Bandi Jacket',
    tip: 'Prioritize mobility for dancing: choose lightweight breathable fabrics with festive thread or mirror accents.'
  },
  {
    id: 'eid',
    name: 'Eid & Festive Dawat',
    icon: '🌙',
    badge: 'Elegance',
    season: 'Summer',
    colors: ['Emerald Green', 'White', 'Mint', 'Silver'],
    dressCode: 'Lucknowi Chikankari Kurta or Pathani Suit with Stole',
    tip: 'White or pastel chikankari embroidery exude understated luxury for family gatherings.'
  },
  {
    id: 'college_day',
    name: 'College Traditional Day',
    icon: '🎓',
    badge: 'Campus Iconic',
    season: 'Winter',
    colors: ['Sky Blue', 'Saffron', 'Beige', 'Black'],
    dressCode: 'Short Cotton Kurta with Jeans or Khadi Kurta Pyjama',
    tip: 'Effortlessly sharp on campus: roll up sleeves of a mandarin collar short kurta paired with clean loafers.'
  }
];

export default function FestivalEventSelector({ onSelectEvent, activeEventId }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fes-wrapper">
      <div className="fes-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="fes-title">
          <span className="fes-badge"><Sparkles size={13} /> Indian Festive & Wedding Guide</span>
          <h3>Occasion & Festival Dress Code Selector</h3>
        </div>
        <button
          type="button"
          className="fes-toggle-btn"
          aria-label="Toggle festival events"
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {isOpen && (
        <div className="fes-content">
          <p className="fes-subtext">
            Tap any Indian cultural festival or wedding function to automatically apply tailored dress codes, colour palettes, and outfit recommendations:
          </p>

          <div className="fes-grid">
            {INDIAN_FESTIVAL_EVENTS.map(event => {
              const active = activeEventId === event.id;
              return (
                <div
                  key={event.id}
                  className={`fes-card ${active ? 'active' : ''}`}
                  onClick={() => onSelectEvent(event)}
                >
                  <div className="fes-card-top">
                    <span className="fes-icon">{event.icon}</span>
                    <span className="fes-card-badge">{event.badge}</span>
                  </div>
                  <h4 className="fes-card-name">{event.name}</h4>
                  <p className="fes-card-dress">{event.dressCode}</p>

                  <div className="fes-card-palette">
                    {event.colors.map(col => (
                      <span key={col} className="fes-color-tag">{col}</span>
                    ))}
                  </div>

                  {active && (
                    <div className="fes-active-tip">
                      💡 <strong>Stylist Tip:</strong> {event.tip}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
