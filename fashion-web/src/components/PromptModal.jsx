import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, X, Camera, Sliders } from 'lucide-react';
import './PromptModal.css';

export default function PromptModal({ outfit, onClose }) {
  const [gender, setGender] = useState('person');
  const [environment, setEnvironment] = useState('modern urban outdoor street setting with soft natural morning golden hour lighting');
  const [shotType, setShotType] = useState('full body fashion editorial shot');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, []);

  if (!outfit) return null;

  // Generate an ultra-detailed, photorealistic prompt for Midjourney / Flux / Stable Diffusion / Gemini Imagen
  const generatedPrompt = `Ultra-photorealistic 8k fashion photography, ${shotType} of a stylish ${gender} wearing ${outfit.top}, paired with ${outfit.bottom}, styled with ${outfit.shoes} and ${outfit.accessory}. Coordinated colour palette featuring ${outfit.colours.join(', ')}. The subject is in a ${environment}. Shot on Hasselblad H6D-100c, 85mm lens, f/1.8 aperture, crisp garment texture, natural drape, photorealistic skin detail, vogue editorial aesthetic, cinematic shadows, masterpiece --ar 4:5 --v 6.0 --style raw`;

  const negativePrompt = `blurry, deformed limbs, extra fingers, cartoon, 3d render, plastic look, oversaturated, lowres, watermark, distorted clothing, unrealistic fabric`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="prompt-modal-backdrop" onClick={onClose}>
        <motion.div
          className="prompt-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="pm-header">
            <div className="pm-title-wrap">
              <span className="pm-badge"><Sparkles size={13} /> AI Image Prompt Generator</span>
              <h2>Visualize "{outfit.name}"</h2>
              <p>Generate a professional diffusion prompt to see how you or a model would look in this outfit using Midjourney, Stable Diffusion, or Flux.</p>
            </div>
            <button className="pm-close" onClick={onClose}><X size={18} /></button>
          </div>

          {/* Controls */}
          <div className="pm-controls">
            <div className="pm-control-group">
              <label><Camera size={13} /> Subject / Model</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="young man with short styled hair">Male Model</option>
                <option value="young woman with natural elegant hair">Female Model</option>
                <option value="person with contemporary chic style">Neutral / Person</option>
                <option value="Indian male model with sharp features">Indian Male Model</option>
                <option value="Indian female model with graceful expression">Indian Female Model</option>
              </select>
            </div>

            <div className="pm-control-group">
              <label><Sliders size={13} /> Camera Shot Type</label>
              <select value={shotType} onChange={(e) => setShotType(e.target.value)}>
                <option value="full body fashion editorial shot">Full Body Editorial Shot</option>
                <option value="waist-up medium portrait shot">Medium Portrait (Waist Up)</option>
                <option value="dynamic street-style walking photograph">Dynamic Street Walking Shot</option>
                <option value="clean studio catalog lighting shot with seamless background">Studio Catalog Shot</option>
              </select>
            </div>

            <div className="pm-control-group">
              <label>Atmosphere & Backdrop</label>
              <select value={environment} onChange={(e) => setEnvironment(e.target.value)}>
                <option value="modern urban outdoor street setting with soft natural morning golden hour lighting">Urban Morning Street (Golden Hour)</option>
                <option value="chic luxury architectural cafe courtyard with warm evening glow">Luxury Architectural Cafe (Evening)</option>
                <option value="opulent royal Indian heritage palace courtyard with intricate sandstone arches">Royal Heritage Palace Courtyard</option>
                <option value="minimalist high-fashion studio with soft diffused rim lighting">Minimalist High-Fashion Studio</option>
                <option value="breezy tropical coastal seaside promenade at dusk">Coastal Seaside Promenade</option>
              </select>
            </div>
          </div>

          {/* Generated Prompt Box */}
          <div className="pm-output-section">
            <div className="pm-output-header">
              <span>Main AI Prompt</span>
              <button
                className={`pm-copy-btn ${copied ? 'copied' : ''}`}
                onClick={() => handleCopy(generatedPrompt)}
              >
                {copied ? <><Check size={14} /> Copied to Clipboard!</> : <><Copy size={14} /> Copy AI Prompt</>}
              </button>
            </div>
            <textarea
              className="pm-prompt-textarea"
              readOnly
              value={generatedPrompt}
              rows={4}
            />
          </div>

          {/* Negative Prompt */}
          <div className="pm-negative-section">
            <div className="pm-output-header">
              <span>Negative Prompt (What to Avoid)</span>
              <button
                className="pm-copy-link"
                onClick={() => handleCopy(negativePrompt)}
              >
                <Copy size={12} /> Copy
              </button>
            </div>
            <textarea
              className="pm-negative-textarea"
              readOnly
              value={negativePrompt}
              rows={2}
            />
          </div>

          {/* Instructions */}
          <div className="pm-tips">
            💡 <strong>How to use:</strong> Paste this prompt into <strong>Midjourney (`/imagine`)</strong>, <strong>Stable Diffusion WebUI</strong>, <strong>Fooocus</strong>, <strong>SeaArt</strong>, or <strong>Gemini Imagen</strong> to generate your photorealistic preview instantly.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
