// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, ShoppingBag, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useWardrobe } from '../context/WardrobeContext';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { saved } = useWardrobe();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/',           label: 'Home' },
    { to: '/recommend',  label: 'Recommend' },
    { to: '/wardrobe',   label: 'My Wardrobe' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">✦</span>
          <span className="brand-text">StyleSense</span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar-links">
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}
              >
                {l.label}
                {l.to === '/wardrobe' && saved.length > 0 && (
                  <span className="badge">{saved.length}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <button onClick={toggle} className="icon-btn" title="Toggle theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <Link to="/wardrobe" className="icon-btn wardrobe-btn" title="My Wardrobe">
            <ShoppingBag size={18} />
            {saved.length > 0 && <span className="badge">{saved.length}</span>}
          </Link>
          <button className="icon-btn mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {links.map(l => (
            <Link key={l.to} to={l.to} className="mobile-link" onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
