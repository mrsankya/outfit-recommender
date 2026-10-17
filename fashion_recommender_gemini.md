# fashion_recommender_gemini.md — Project Memory

## Project Name
Fashion Outfit Recommendation System

## Location
`C:\Users\sanke\Downloads\fashion-recommender-system-main\fashion-recommender-system-main\`

## College
G H Raisoni College of Engineering and Management, Jalgaon — CSE (Data Science) Minor Project

## Run Command
```bash
python fashion_outfit_recommendation.py
```

## Technology Stack
- Python 3 + Tkinter (ttk) — standard library only, no pip installs required
- Rule-based filtering algorithm
- Single-file GUI + separate catalogue module

## Key Files
| File | Purpose |
|------|---------|
| `fashion_outfit_recommendation.py` | Main Tkinter GUI app |
| `catalogue.py` | 48 outfit records across all occasion/season/style combos |
| `README.md` | Run instructions |

## Architecture
- `FashionApp(tk.Tk)` — main window class
- `get_recommendations(occasion, season, style)` — core filter function
- `build_outfit_card(parent, outfit, row, col)` — card renderer
- `OUTFITS` list in `catalogue.py` — data source

## Catalogue Statistics
- **108+ outfits total across multiple fashion repositories**:
  - **43 Handcrafted Complete Outfits** (Indian & Western styles with full top, bottom, shoes, accessories & palettes)
  - **30 Kaggle Clothes Dataset Items** (`ryanbadai/clothes-dataset` across 15 categories)
  - **35 Global Fashion Dataset Items** (curated from FakeStore & DummyJSON APIs: Men's Shirts/Outers, Women's Dresses, Shoes, Bags, Tops, Sunglasses)
- **6 Occasions**: Casual, Formal, Party, Sports, Traditional, Beach
- **4 Seasons**: Summer, Winter, Monsoon, Spring/Autumn
- **6 Styles**: Smart Casual, Ethnic, Sporty, Business Formal, Bohemian, Streetwear

## UI Colour Palette (Dark Theme)
- Background: #1A1A2E (deep navy)
- Cards: #0F3460 (dark blue)
- Accent: #E94560 (red-pink)
- Secondary: #533483 (purple)

## Editions Available
1. **Desktop Edition (Python / Tkinter)**
   - Run: `run.bat` or `python fashion_outfit_recommendation.py`
   - Zero pip install required, strictly follows the DRAFT report requirements.

2. **Full Web Edition (React + Vite + Modern UI + Rail Showcase)**
   - Run: `run_web.bat` (serves at http://localhost:5173)
   - Features:
     - "On The Rail" interactive 3D rack showcase (Liquid/Joonsite port) with side-to-front hover flips, full 360° drag-to-spin focus viewer, and auto-sliding mobile dots.
     - Occasion, Season, Style interactive pill recommendation filter with 106+ outfits.
     - **"Explore Random Outfits" (🎲)** button for instant surprise discovery across the full catalogue.
     - **Smart AI Prompt Generator ("AI Try-On Prompt")**: Generates photorealistic prompts for Midjourney, Stable Diffusion, and Flux so users can test how outfits look with custom models, body types, shot angles, and environments.
     - **Live Weather-Aware Auto-Recommendations**: Precise campus detection defaulting to **Jalgaon, Maharashtra (G H Raisoni Campus)** with exact coordinates (21.0077, 75.5626). Intelligently handles North Maharashtra ISP gateway routing (which routes through Nashik) by mapping to Jalgaon. Includes quick chips for Jalgaon (Campus), Pune, Mumbai, Delhi, plus GPS and manual search.
     - **Pre-populated Demo Wardrobe for Jury Presentation**: "My Wardrobe" comes loaded by default with 8 curated designer looks (Royal Sherwani, Silk Kurta, Floral Anarkali, Nehru Jacket, Classic Polo, Oxford Casual, Black Turtleneck Party Wear, Spring Blazer) with "Reset Demo Outfits" and "Restore Jury Demo Collection" buttons for seamless college project demonstrations.
     - **Upload Your Own Clothes**: Interactive photo upload modal where users can upload their garments (topwear, bottomwear, ethnic) to receive coordinated outfit pairings.
     - **Authentic Indian Ethnic Wear**: Includes silk kurtas, designer sherwanis, anarkali suits, and Nehru jackets across the 3D rail, 3D closet, and recommendation catalogue.
     - Sanitized image alignment: strictly verified that image names, garment types, and photo previews match 1:1 (hoodies display hoodies, blazers display blazers, dresses display dresses).
     - Visual badge indicating dataset source (Kaggle Dataset, FakeStore, DummyJSON, Curated).
     - "My Wardrobe" favorites management with localStorage persistence and instant demo reset.
     - Dark / Light mode toggle with Zara/minimalist aesthetic.
     - Smooth animations and loading splash screen.

3. **Academic & Jury Defense Documentation**:
   - Generated comprehensive 8-page PDF: `StyleSense_Fashion_Recommendation_Jury_Handbook.pdf`
   - Contains: Project Problem Statement, Dual-Architecture Analysis, Campus Weather Engine (Jalgaon), GenAI Try-On Prompt Mechanics, 8-Step Presentation Script, 25+ Detailed Viva Q&A, and Pre-Viva Verification Checklist.

4. **UI & Scroll Bug Fixes**:
   - Fixed intermittent vertical scroll lock/freeze bug:
     - Coordinated `html` and `body` overflow rules (`overflow-y: auto`, `min-height: 100vh`, `overscroll-behavior-y: auto`).
     - Fixed `ClothingRack.jsx` focus modal: guaranteed `document.body.style.overflow = ''` runs on `closeFocus` and component unmount.
     - Changed `.rk-rack` scroll styling to `overflow-y: visible` and `touch-action: pan-y pinch-zoom` to prevent scroll-trapping when cursor/finger is over the rail.
     - Added `touchAction: 'pan-y'` and non-blocking touch gestures to `Wardrobe3D.jsx` Three.js canvas.
     - Added `ScrollToTop` router navigation listener to guarantee zero scroll freeze across page transitions.
     - Added `overscroll-behavior: contain` to `PromptModal` and `ClothUploadModal` with safe unmount cleanup.

