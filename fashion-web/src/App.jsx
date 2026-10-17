// src/App.jsx
import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Recommend from './pages/Recommend';
import WardrobePage from './pages/Wardrobe';
import { ThemeProvider } from './context/ThemeContext';
import { WardrobeProvider } from './context/WardrobeContext';
import './App.css';

import { useEffect } from 'react';

/* Resets scroll position and unlocks overflow on route change */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    try {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    } catch {}
  }, [pathname]);

  return null;
}

/* Page transition wrapper */
function PageWrapper({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ width: '100%', overflow: 'visible' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <PageWrapper>
        <Routes location={location}>
          <Route path="/"          element={<Home />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/wardrobe"  element={<WardrobePage />} />
        </Routes>
      </PageWrapper>
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);

  return (
    <ThemeProvider>
      <WardrobeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AnimatePresence>
            {loading && <LoadingScreen key="loader" onDone={done} />}
          </AnimatePresence>
          {!loading && <AppRoutes />}
        </BrowserRouter>
      </WardrobeProvider>
    </ThemeProvider>
  );
}
