import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Check, Image as ImageIcon, Sparkles } from 'lucide-react';
import './ClothUploadModal.css';

export default function ClothUploadModal({ onClose, onCustomItemAdded }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [itemName, setItemName] = useState('');
  const [clothingType, setClothingType] = useState('Top');
  const [occasion, setOccasion] = useState('Casual');
  const [season, setSeason] = useState('Summer');
  const [style, setStyle] = useState('Smart Casual');
  const [dominantColor, setDominantColor] = useState('White');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        if (!itemName) {
          // Auto-generate a smart name
          setItemName(`My Custom ${dominantColor} ${clothingType}`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!imagePreview) {
      alert('Please select or drag an image of your clothing item.');
      return;
    }

    // Coordinated recommendations based on uploaded item
    let bottom = 'Tailored chinos or dark denim';
    let shoes = 'Minimalist leather sneakers or loafers';
    let accessory = 'Minimalist watch or leather bracelet';
    let tip = `Custom wardrobe piece. Contrast this ${dominantColor} ${clothingType.toLowerCase()} with neutral complementary tones.`;

    if (clothingType === 'Kurta / Ethnic Top') {
      bottom = 'White churidar or tapered linen trousers';
      shoes = 'Mojaris or Kolhapuri sandals';
      accessory = 'Silver bracelet or ethnic watch';
      tip = `Authentic Indian festive styling. Balance the ${dominantColor} hues with crisp white pyjama or neutral churidar.`;
    } else if (clothingType === 'Blazer / Coat') {
      bottom = 'Formal trousers or crisp selvedge denim';
      shoes = 'Black or brown Oxford dress shoes';
      accessory = 'Pocket square & leather folio';
      tip = 'Keep the inner shirt crisp to frame the collar line neatly.';
    } else if (clothingType === 'Dress / Gown') {
      bottom = 'Flowy coordinate hemline';
      shoes = 'Strappy heels or pointed flats';
      accessory = 'Delicate drop earrings & clutch';
    }

    const newCustomOutfit = {
      id: Date.now(),
      name: itemName || `My Custom ${clothingType}`,
      occasion,
      season,
      style,
      top: clothingType === 'Bottom' ? 'Classic Oxford Shirt' : (itemName || `My ${clothingType}`),
      bottom: clothingType === 'Bottom' ? (itemName || 'My Custom Bottom') : bottom,
      shoes,
      accessory,
      colours: [dominantColor, 'Neutral Grey', 'White'],
      tip,
      emoji: clothingType === 'Kurta / Ethnic Top' ? '🪔' : clothingType === 'Blazer / Coat' ? '🧥' : '👕',
      image: imagePreview,
      source: 'User Uploaded Wardrobe'
    };

    if (onCustomItemAdded) {
      onCustomItemAdded(newCustomOutfit);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="upload-modal-backdrop" onClick={onClose}>
        <motion.div
          className="upload-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="um-header">
            <div className="um-title-wrap">
              <span className="um-badge"><Sparkles size={13} /> Visual Closet Scanner</span>
              <h2>Add Your Own Clothes</h2>
              <p>Upload a photo of your shirt, kurta, blazer, or shoes. Our AI system will coordinate an outfit matching your piece.</p>
            </div>
            <button className="um-close" onClick={onClose}><X size={18} /></button>
          </div>

          <form onSubmit={handleSave} className="um-form">
            {/* Upload Area */}
            <div
              className={`um-dropzone ${imagePreview ? 'has-image' : ''}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              {imagePreview ? (
                <div className="um-preview-wrap">
                  <img src={imagePreview} alt="Uploaded clothing" className="um-preview-img" />
                  <span className="um-change-hint">Click to change photo</span>
                </div>
              ) : (
                <div className="um-empty-drop">
                  <Upload size={36} className="um-upload-icon" />
                  <h4>Click or Drag & Drop Photo of Your Clothes</h4>
                  <p>Supports JPG, PNG, WEBP (transparent or flat photo recommended)</p>
                </div>
              )}
            </div>

            {/* Inputs */}
            <div className="um-grid">
              <div className="um-field">
                <label>Item Name</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Navy Blue Cotton Kurta, Oversized Hoodie"
                  required
                />
              </div>

              <div className="um-field">
                <label>Garment Type</label>
                <select value={clothingType} onChange={(e) => setClothingType(e.target.value)}>
                  <option value="Top">Top / Shirt / Tee</option>
                  <option value="Kurta / Ethnic Top">Indian Kurta / Ethnic Wear</option>
                  <option value="Blazer / Coat">Blazer / Jacket / Coat</option>
                  <option value="Dress / Gown">Dress / Anarkali / Gown</option>
                  <option value="Bottom">Pants / Chinos / Jeans</option>
                </select>
              </div>

              <div className="um-field">
                <label>Occasion</label>
                <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                  <option value="Casual">Casual</option>
                  <option value="Formal">Formal</option>
                  <option value="Traditional">Traditional / Indian Festive</option>
                  <option value="Party">Party</option>
                  <option value="Sports">Sports</option>
                  <option value="Beach">Beach</option>
                </select>
              </div>

              <div className="um-field">
                <label>Season</label>
                <select value={season} onChange={(e) => setSeason(e.target.value)}>
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                  <option value="Monsoon">Monsoon</option>
                  <option value="Spring/Autumn">Spring/Autumn</option>
                </select>
              </div>

              <div className="um-field">
                <label>Style</label>
                <select value={style} onChange={(e) => setStyle(e.target.value)}>
                  <option value="Smart Casual">Smart Casual</option>
                  <option value="Ethnic">Ethnic / Traditional</option>
                  <option value="Streetwear">Streetwear</option>
                  <option value="Business Formal">Business Formal</option>
                  <option value="Bohemian">Bohemian</option>
                  <option value="Sporty">Sporty</option>
                </select>
              </div>

              <div className="um-field">
                <label>Primary Colour</label>
                <select value={dominantColor} onChange={(e) => setDominantColor(e.target.value)}>
                  <option value="White">White</option>
                  <option value="Black">Black</option>
                  <option value="Navy">Navy Blue</option>
                  <option value="Sky Blue">Sky Blue</option>
                  <option value="Saffron">Saffron / Mustard</option>
                  <option value="Maroon">Maroon / Burgundy</option>
                  <option value="Olive">Olive Green</option>
                  <option value="Beige">Beige / Sand</option>
                  <option value="Gold">Gold / Ivory</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="um-actions">
              <button type="button" className="btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={!imagePreview}>
                <Check size={16} /> Coordinate & Add to Wardrobe
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
