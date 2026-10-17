// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import ClothingRack from '../components/ClothingRack/ClothingRack';
import './Home.css';

const features = [
  {
    icon: <Sparkles size={24} />,
    title: 'Smart Recommendations',
    desc: 'Rule-based filtering that matches outfits to your exact occasion, season, and personal style.'
  },
  {
    icon: <Zap size={24} />,
    title: '3D Wardrobe View',
    desc: 'Explore your digital wardrobe in an interactive 3D environment — drag, spin, and browse.'
  },
  {
    icon: <Shield size={24} />,
    title: 'Save Your Favourites',
    desc: 'Build your personal wardrobe collection by saving outfit recommendations you love.'
  }
];

const steps = [
  { num: '01', title: 'Choose Occasion', desc: 'Select from Casual, Formal, Party, Sports, Traditional, or Beach.' },
  { num: '02', title: 'Pick Your Season', desc: 'Filter by Summer, Winter, Monsoon, or Spring/Autumn.' },
  { num: '03', title: 'Select Your Style', desc: 'Smart Casual, Ethnic, Sporty, Business Formal, Bohemian, or Streetwear.' },
  { num: '04', title: 'Get Outfits', desc: 'Receive curated outfit recommendations with styling tips and colour palettes.' },
];

function FadeIn({ children, delay = 0, y = 24 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="home-page">

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <FadeIn>
              <span className="hero-eyebrow">✦ AI-Powered Styling</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="hero-title">
                Dress for every<br />
                <span className="hero-accent">moment.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="hero-desc">
                StyleSense recommends complete outfits based on your occasion, season,
                and personal style. No more wardrobe confusion — just perfect looks, instantly.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="hero-actions">
                <Link to="/recommend" className="btn-primary">
                  Get Recommendations <ArrowRight size={16} />
                </Link>
                <Link to="/wardrobe" className="btn-ghost">
                  My Wardrobe
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="hero-stats">
                <div className="stat"><strong>108+</strong><span>Outfits</span></div>
                <div className="stat-divider" />
                <div className="stat"><strong>6</strong><span>Occasions</span></div>
                <div className="stat-divider" />
                <div className="stat"><strong>4</strong><span>Seasons</span></div>
                <div className="stat-divider" />
                <div className="stat"><strong>6</strong><span>Styles</span></div>
              </div>
            </FadeIn>
          </div>

          {/* Hero Feature Highlight / Preview */}
          <motion.div
            className="hero-preview-card"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="hero-preview-badge">Featured Rail Showcase</div>
            <div className="hero-preview-content">
              <span className="hero-preview-icon">✨</span>
              <h3>Interactive 3D Garment Rail</h3>
              <p>Hover garments to flip from side profile to front view. Click any item to enter full 360° drag inspection.</p>
              <a href="#rail-showcase" className="btn-primary" style={{ marginTop: '12px' }}>
                Explore The Rack ↓
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ON THE RAIL (SHOWCASE SECTION) ── */}
      <div id="rail-showcase">
        <ClothingRack />
      </div>

      {/* ── FEATURES ── */}
      <section className="section features-section">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="section-eyebrow">Why StyleSense</span>
              <h2 className="section-title">Fashion made simple</h2>
            </div>
          </FadeIn>
          <div className="features-grid">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.12}>
                <div className="feature-card">
                  <div className="feature-icon">{f.icon}</div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section how-section">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="section-eyebrow">Process</span>
              <h2 className="section-title">How it works</h2>
            </div>
          </FadeIn>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.12}>
                <div className="step-card">
                  <span className="step-num">{s.num}</span>
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-desc">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <FadeIn>
            <div className="cta-box">
              <h2 className="cta-title">Ready to find your perfect outfit?</h2>
              <p className="cta-desc">Join thousands who dress better every day with StyleSense.</p>
              <Link to="/recommend" className="btn-primary btn-large">
                Start Recommending <ArrowRight size={18} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-brand">✦ StyleSense</span>
          <span className="footer-credit">Minor Project — G H Raisoni College of Engineering and Management, Jalgaon</span>
        </div>
      </footer>
    </div>
  );
}
