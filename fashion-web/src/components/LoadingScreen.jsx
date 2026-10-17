// src/components/LoadingScreen.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = [20, 45, 70, 90, 100];
    let i = 0;
    const tick = setInterval(() => {
      if (i < steps.length) { setProgress(steps[i++]); }
      else {
        clearInterval(tick);
        setTimeout(onDone, 400);
      }
    }, 260);
    return () => clearInterval(tick);
  }, [onDone]);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0D0D0D',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 32,
      }}
    >
      {/* Animated logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{ fontSize: 64, lineHeight: 1, marginBottom: 16 }}
        >
          👗
        </motion.div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 36,
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '-1px',
        }}>
          StyleSense
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: '#666',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginTop: 8,
        }}>
          Fashion Recommendation
        </div>
      </motion.div>

      {/* Progress bar */}
      <div style={{ width: 220, height: 2, background: '#222', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', background: '#FFFFFF', borderRadius: 2 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <div style={{ fontSize: 12, color: '#444', fontFamily: "'Inter', sans-serif" }}>
        {progress < 100 ? 'Preparing your wardrobe…' : 'Ready ✓'}
      </div>
    </motion.div>
  );
}
