# StyleSense — Fashion Outfit Recommendation System

A modern, full-stack ready Fashion Recommendation platform developed for **G H Raisoni College of Engineering and Management, Jalgaon** (CSE - Data Science).

The project is packaged with **two ready-to-run editions**:
1. **Web Edition (React + Vite + Three.js + Interactive 3D Clothes Rail)** — Modern showcase with Zara/minimalist aesthetic.
2. **Desktop Edition (Python 3 + Tkinter)** — Standard desktop GUI matching the draft academic report specifications.

---

## 🚀 Quick Launch (1-Click Run)

### 1. Web Edition (Recommended for Demos & Clients)
Just double-click:
```
run_web.bat
```
*(Automatically starts the Vite dev server and opens `http://localhost:5173` in your default browser)*

### 2. Desktop Edition (For Offline / Tkinter Academic Submissions)
Just double-click:
```
run.bat
```
*(Runs with zero external pip dependencies — works out of the box on standard Windows Python 3)*

---

## 🌟 Key Features

### 🧥 1. Interactive 3D "On The Rail" Showcase
- **Real-Time Hover Flip**: Hovering any garment smoothly transitions it from side-profile on the rod to full front view with realistic perspective physics.
- **360° Drag Inspection Focus Modal**: Clicking any garment opens the inspection view with **Front/Back tabs** and interactive **mouse/touch drag-to-spin** (180° rotation).
- **Auto-Syncing Captions & Pricing**: Dynamic text and price updates on hover.
- **Mobile Touch Slider**: Auto-sliding continuous carousel with draggable dot indicators on smaller screens.

### 🔍 2. Preference Recommendation Engine
- **Multi-Factor Filtering**: Filter by **Occasion** *(Casual, Formal, Party, Sports, Traditional, Beach)*, **Season** *(Summer, Winter, Monsoon, Spring/Autumn)*, and **Style** *(Smart Casual, Ethnic, Sporty, Business Formal, Bohemian, Streetwear)*.
- **Visual Cards**: Each outfit includes a curated high-resolution photo, clothing breakdown (Top, Bottom, Shoes, Accessory), matching visual color chips, and styling tips.

### 💛 3. "My Wardrobe" Saved Outfits
- Bookmark and save favorite outfit recommendations with instant heart toggle.
- Saved outfits persist across sessions using `localStorage`.

### 🌓 4. Clean Minimalist Theme (Zara/H&M Style)
- Light & Dark mode support with smooth transitions.
- Intro splash loading animation.

---

## 📁 Project Directory Structure

```
fashion-recommender-system-main/
│
├── run_web.bat                        # 1-Click launcher for React Web Edition
├── run.bat                            # 1-Click launcher for Python Desktop Edition
├── README.md                          # Complete project documentation
├── fashion_recommender_gemini.md      # Project memory & implementation log
│
├── fashion_outfit_recommendation.py   # Desktop Tkinter GUI application
├── catalogue.py                       # Python outfit catalogue data (43 outfits)
│
└── fashion-web/                       # Modern React + Vite Web Application
    ├── index.html                     # Entry HTML
    ├── package.json                   # Dependencies (Three.js, Framer Motion, Lucide)
    ├── vite.config.js                 # Vite bundler configuration
    └── src/
        ├── App.jsx                    # Root component with routing & theme
        ├── index.css                  # Global variables & responsive reset
        ├── components/
        │   ├── Navbar.jsx             # Top navigation with theme toggle & badge
        │   ├── LoadingScreen.jsx      # Animated entry loader
        │   ├── OutfitCard.jsx         # Card component with photo & color chips
        │   ├── Wardrobe3D.jsx         # 3D Closet scene
        │   └── ClothingRack/          # "On The Rail" 3D rack component & styles
        ├── context/
        │   ├── ThemeContext.jsx       # Dark / Light theme state
        │   └── WardrobeContext.jsx    # Saved outfits state
        ├── data/
        │   └── catalogue.js           # 43+ rich outfit records with curated photos
        └── pages/
            ├── Home.jsx               # Hero & interactive showcase landing page
            ├── Recommend.jsx          # Filterable recommendation feed
            └── Wardrobe.jsx           # Saved looks gallery
```

---

## 📊 Sample Catalog Coverage
- **Total Outfits**: 43 handcrafted combinations
- **Occasions**: Beach, Casual, Formal, Party, Sports, Traditional
- **Seasons**: Summer, Winter, Monsoon, Spring/Autumn
- **Styles**: Bohemian, Business Formal, Ethnic, Smart Casual, Sporty, Streetwear

---

*G H Raisoni College of Engineering and Management, Jalgaon — Minor Project*
