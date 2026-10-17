# StyleSense: Fashion Outfit Recommendation System
## Complete Minor Project Report & Technical Execution Manual

**Academic Year:** 2026 – 2027  
**Department:** Computer Science and Engineering (Data Science)  
**Institution:** G H Raisoni College of Engineering and Management, Jalgaon (Maharashtra)  
**GitHub Repository:** [https://github.com/mrsankya/outfit-recommender.git](https://github.com/mrsankya/outfit-recommender.git)  

---

## Table of Contents
1. [Executive Summary & Abstract](#executive-summary--abstract)
2. [Complete How to Run Guide](#chapter-1-complete-how-to-run-guide)
   - 2.1 [Prerequisites & System Requirements](#21-prerequisites--system-requirements)
   - 2.2 [Running the Desktop Edition (Python / Tkinter)](#22-running-the-desktop-edition-python--tkinter)
   - 2.3 [Running the Web Edition (React 19 + Vite)](#23-running-the-web-edition-react-19--vite)
   - 2.4 [Troubleshooting Common Run Issues](#24-troubleshooting-common-run-issues)
3. [System Architecture & Design Blueprint](#chapter-2-system-architecture--design-blueprint)
   - 3.1 [Dual-Edition Architectural Paradigm](#31-dual-edition-architectural-paradigm)
   - 3.2 [Subsystem & Component Breakdown](#32-subsystem--component-breakdown)
4. [Algorithmic Models & Mathematical Formulations](#chapter-3-algorithmic-models--mathematical-formulations)
   - 4.1 [Multi-Attribute Recommendation Filtering Algorithm](#41-multi-attribute-recommendation-filtering-algorithm)
   - 4.2 [Color Theory 60-30-10 Harmony Engine & RGB Euclidean Math](#42-color-theory-60-30-10-harmony-engine--rgb-euclidean-math)
   - 4.3 [Skin Undertone Seasonal Colorimetry Matching](#43-skin-undertone-seasonal-colorimetry-matching)
   - 4.4 [Speech-to-Outfit Voice Recognition NLP Parser](#44-speech-to-outfit-voice-recognition-nlp-parser)
   - 4.5 [Campus Weather Engine & ISP NOC Proxy Resolution](#45-campus-weather-engine--isp-noc-proxy-resolution)
   - 4.6 [Indian Cultural Festival & Wedding Dress Code Rules](#46-indian-cultural-festival--wedding-dress-code-rules)
   - 4.7 [Deterministic Retail Pricing Engine (₹ INR)](#47-deterministic-retail-pricing-engine--inr)
   - 4.8 [External GenAI Studio-Grade Prompt Synthesis](#48-external-genai-studio-grade-prompt-synthesis)
5. [Dataset Architecture & Cataloging](#chapter-4-dataset-architecture--cataloging)
6. [Step-by-Step Viva Presentation Script for Students](#chapter-5-step-by-step-viva-presentation-script-for-students)
7. [Comprehensive 35+ Jury Viva Questions & Answers](#chapter-6-comprehensive-35-jury-viva-questions--answers)
8. [Conclusion & Future Scope](#chapter-7-conclusion--future-scope)

---

## Executive Summary & Abstract

StyleSense is an intelligent, context-aware artificial intelligence fashion recommendation platform. In contrast to conventional e-commerce filters that recommend isolated garments (e.g. searching for a jacket returns only jackets), StyleSense recommends complete, coordinated four-piece ensembles consisting of compatible **Topwear, Bottomwear, Footwear, and Accessories**.

The system addresses consumer decision fatigue by evaluating multiple dynamic parameters:
1. **Occasion Appropriateness:** Casual, Formal, Party, Sports, Traditional (Indian Weddings/Festivals), Beach.
2. **Season & Live Weather:** Summer, Winter, Monsoon, Spring/Autumn, automatically integrated with the Open-Meteo REST API using exact coordinates for Jalgaon (21.0077° N, 75.5626° E) with ISP gateway proxy resolution.
3. **Color Theory 60-30-10 Rule:** Algorithmic balance of 60% dominant base, 30% secondary structure, and 10% accent contrast with harmony classification (Monochromatic, Complementary, Analogous, Royal Festive, Sartorial).
4. **Skin Undertone Consultation:** Warm, Cool, and Neutral profiler with seasonal palettes that dynamically boosts flattering outfits to the top of search results.
5. **Speech-to-Outfit Voice Control:** HTML5 Web Speech recognition parser that translates spoken commands into filters with synthesized voice confirmation.
6. **7-Day Weekly OOTD Calendar:** Monday–Sunday visual calendar in My Wardrobe with heuristic auto-scheduling.
7. **Budget Tier & Retail Cost Breakdown in ₹ INR:** Deterministic price modeling for Indian retail markets across defined budget tiers.
8. **GenAI Virtual Try-On Prompts:** Photorealistic prompt synthesis for Midjourney v6, Stable Diffusion XL, and Flux.1.

---

## Chapter 1: Complete How to Run Guide

### 2.1 Prerequisites & System Requirements
- **Operating System:** Windows 10/11, macOS, or Linux.
- **Python 3.8 to 3.12:** Required for Desktop GUI and PDF report generation. (Uses Python standard library; zero pip installs needed for desktop app).
- **Node.js 18.x or 20.x LTS & npm:** Required for React Web Edition.
- **Web Browser:** Google Chrome or Microsoft Edge (version 100+) for full Web Speech API and WebGL support.
- **ReportLab (Optional for PDF generation):** `pip install reportlab`.

---

### 2.2 Running the Desktop Edition (Python / Tkinter)
The desktop edition is built using Python's standard library `tkinter` and `ttk`. It requires zero pip installations and functions 100% offline.

**Method 1: One-Click Batch File (Windows)**
```cmd
Double-click: run.bat
```

**Method 2: Command Line**
```bash
python fashion_outfit_recommendation.py
```
*Expected Result:* A dark-themed graphical window opens immediately, displaying occasion, season, and style dropdowns, 48 outfits, and card details.

---

### 2.3 Running the Web Edition (React 19 + Vite)
The web edition provides the complete suite of advanced AI stylist tools, 3D clothing rack, and interactive modals.

**Method 1: One-Click Batch File (Windows)**
```cmd
Double-click: run_web.bat
```

**Method 2: Command Line**
```bash
# Navigate to the web project directory
cd fashion-web

# Install npm dependencies (first time only)
npm install

# Start the Vite development server
npm run dev
```

*Expected Result:*
```
  VITE v8.3.4  ready in 543 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```
Open your browser and navigate to **`http://localhost:5173/`**.

---

### 2.4 Troubleshooting Common Run Issues

| Issue / Error | Root Cause | Solution |
|---|---|---|
| `Port 5173 is already in use` | Another Vite instance is running in background | Vite will automatically switch to `5174` or run `npx kill-port 5173` |
| `Microphone access denied` in Voice Stylist | Browser permissions blocked mic | Click the lock icon in the address bar, toggle Microphone to **Allow**, refresh page |
| `Weather shows Nashik instead of Jalgaon` | Broadband ISP routing traffic via Nashik NOC | Click "Campus (Jalgaon)" quick chip or use default campus coordinates (21.0077° N, 75.5626° E) |
| `git push curl 55 Send failure` | Large image assets exceeding default HTTP buffer | Run: `git config http.postBuffer 524288000` |
| `Vertical scrolling locks on page transition` | Modal cleanup failure | Resolved in latest commit via unmount `document.body.style.overflow = ''` and `ScrollToTop` router listener |

---

## Chapter 2: System Architecture & Design Blueprint

### 3.1 Dual-Edition Architectural Paradigm
To satisfy both university examination constraints (strict standard library compliance, offline lab execution) and modern software industry expectations (responsive SPA, REST APIs, 3D Three.js rendering, Web Speech), StyleSense implements a Dual-Edition architecture:

```
                                  StyleSense Fashion System
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    ▼                                                   ▼
         Desktop Edition (Python)                            Web Edition (React 19 + Vite)
      ──────────────────────────────                      ───────────────────────────────────
      • 100% Offline Standard Library                     • Interactive 3D Clothes Rack (Three.js)
      • Tkinter OOP Canvas Architecture                   • Open-Meteo Campus Weather Engine (Jalgaon)
      • Deterministic Rule-Based Engine                   • 60-30-10 Color Theory Harmony Engine
      • catalogue.py (48 Outfits)                         • Voice-Controlled Stylist (Web Speech API)
      • Zero External pip Dependencies                    • Skin Undertone & Silhouette Consultation
                                                          • Indian Festival & Wedding Dress Code Selector
                                                          • Weekly 7-Day OOTD Calendar in My Wardrobe
                                                          • Budget Tier & Retail Price Engine (₹ INR)
                                                          • Shareable OOTD Lookbook Card (WhatsApp/PDF)
                                                          • GenAI Try-On Prompt Builder (Midjourney/Flux)
```

### 3.2 Subsystem & Component Breakdown

| Subsystem File | Technology | Responsibility |
|---|---|---|
| `fashion_outfit_recommendation.py` | Python 3 + Tkinter | Offline desktop GUI application |
| `catalogue.py` | Python 3 | 48 curated outfits for desktop app |
| `fashion-web/src/App.jsx` | React 19 + React Router | Top-level routing, Navbar, Footer, ScrollToTop bug fix listener |
| `fashion-web/src/pages/Recommend.jsx` | React 19 + Framer Motion | Main recommendation interface with voice stylist, undertone profiler, and festival selector |
| `fashion-web/src/components/OutfitCard.jsx` | React 19 + CSS Modules | Outfit card rendering with 60-30-10 ratio bar, ₹ INR budget breakdown, AI Try-On, and Lookbook export |
| `fashion-web/src/components/WeeklyPlanner.jsx` | React 19 + LocalStorage | 7-day Monday–Sunday visual calendar with auto-scheduling |
| `fashion-web/src/components/VoiceSearch.jsx` | Web Speech API | Speech recognition NLP parser and speech synthesis audio confirmation |
| `fashion-web/src/components/StyleProfileModal.jsx` | React 19 + Framer Motion | Skin undertone (Warm, Cool, Neutral) and silhouette profiler |
| `fashion-web/src/components/FestivalEventSelector.jsx` | React 19 | Indian festival dress code quick-filter (Diwali, Haldi, Sangeet, Eid) |
| `fashion-web/src/components/LookbookModal.jsx` | React 19 + Web Share API | Polaroid-style lookbook card with WhatsApp sharing and print layout |
| `fashion-web/src/components/WeatherWidget.jsx` | Open-Meteo REST API | Jalgaon campus weather auto-detection with ISP gateway resolution |
| `fashion-web/src/utils/colorTheory.js` | JavaScript ES6 | 60-30-10 ratio distribution math and harmony classification |
| `fashion-web/src/utils/budgetPricing.js` | JavaScript ES6 | Deterministic retail pricing calculation in ₹ INR |

---

## Chapter 3: Algorithmic Models & Mathematical Formulations

### 4.1 Multi-Attribute Recommendation Filtering Algorithm
Given user filter inputs for occasion $U_{occ}$, season $U_{sea}$, and style $U_{sty}$, the matching subset $M$ from the universe of outfits $O$ is extracted as:

$$M = \{ o \in O \mid (U_{occ} = \text{'Any'} \lor o.Occasion = U_{occ}) \land (U_{sea} = \text{'Any'} \lor o.Season = U_{sea}) \land (U_{sty} = \text{'Any'} \lor o.Style = U_{sty}) \}$$

### 4.2 Color Theory 60-30-10 Harmony Engine & RGB Euclidean Math
Color values are mapped to 3-dimensional RGB color space. The perceptual difference $\Delta E$ between colors $C_1(R_1, G_1, B_1)$ and $C_2(R_2, G_2, B_2)$ is:

$$\Delta E = \sqrt{(R_2 - R_1)^2 + (G_2 - G_1)^2 + (B_2 - B_1)^2}$$

- **Monochromatic:** $\Delta E < 45$ across primary garments (e.g. Charcoal shirt with Black trousers).
- **Complementary:** Opposing wheel coordinates (e.g. Royal Blue with Mustard/Gold accents).
- **Analogous:** Adjacent hue coordinates (e.g. Rust, Terracotta, and Camel).
- **Proportional Visual Ratio:** Ensembles are verified against the design standard of 60% dominant base, 30% secondary structure, and 10% accent contrast.

### 4.3 Skin Undertone Seasonal Colorimetry Matching
Let $P_{undertone} = \{c_1, c_2, \dots, c_k\}$ be the user's flattering palette:
- **Warm:** Earthy spices (Saffron, Mustard, Terracotta, Rust, Camel, Olive, Gold).
- **Cool:** Crisp jewel tones (Royal Blue, Emerald, Deep Teal, Burgundy, Lilac, Silver).
- **Neutral:** Balanced classics (Ivory, Cream, Navy, Peach, Dusty Pink).

For each candidate outfit $o \in M$, the undertone score $S(o)$ is computed as:

$$S(o) = \sum_{item \in o.items} I(item.color \in P_{undertone})$$

Outfits with higher $S(o)$ receive a ranking boost and are sorted to the top.

### 4.4 Speech-to-Outfit Voice Recognition NLP Parser
Uses the HTML5 `SpeechRecognition` interface configured with Indian English (`en-IN`). Transcribed text is parsed using regex keyword and synonym extractors:
- *Occasion keywords:* "wedding", "shaadi", "puja", "festive" $\to$ `Traditional`; "office", "interview" $\to$ `Formal`.
- *Season keywords:* "chilly", "winter", "jacket" $\to$ `Winter`; "hot", "sunny" $\to$ `Summer`.
- *Style keywords:* "kurta", "sherwani" $\to$ `Ethnic`; "hoodie", "oversized" $\to$ `Streetwear`.

Upon extraction, the system automatically triggers filter state and provides auditory feedback via `SpeechSynthesisUtterance`.

### 4.5 Campus Weather Engine & ISP NOC Proxy Resolution
Queries Open-Meteo free REST API:
`https://api.open-meteo.com/v1/forecast?latitude=21.0077&longitude=75.5626&current_weather=true`

To overcome broadband ISP gateway routing (which routes Jalgaon connections through Nashik servers), the system incorporates an intelligent campus coordinate override verifying against Jalgaon (21.0077° N, 75.5626° E).

### 4.6 Indian Cultural Festival & Wedding Dress Code Rules
Provides preset fashion intelligence for:
- 🪔 **Diwali & Puja:** Raw silk kurtas, zari embroidery, Gold & Maroon hues.
- 👑 **Royal Wedding & Baraat:** Velvet/jacquard sherwani, contrasting pashmina stole, mojaris.
- 💛 **Haldi & Sangeet:** Breathable turmeric yellow and mustard cotton/linen.
- 🥁 **Navratri & Garba:** Flared short kurtas, mirror-work bandi jackets.
- 🌙 **Eid & Festive Dawat:** Lucknowi chikankari pastel kurtas.
- 🎓 **College Traditional Day:** Mandarin collar short kurta with clean denim or linen trousers.

### 4.7 Deterministic Retail Pricing Engine (₹ INR)
Calculates stable, repeatable retail prices in ₹ INR using seed hashing based on outfit metadata:

$$\text{Cost}(Top) = \text{Base}(Occasion, Style) + [(\text{Seed} \times 173) \pmod{\text{Range}}]$$
$$\text{Total Price} = \text{Cost}(Top) + \text{Cost}(Bottom) + \text{Cost}(Shoes) + \text{Cost}(Acc)$$

Categorizes into budget tiers:
- **College Budget:** ₹1,500 – ₹3,500
- **Daily Smart:** ₹3,500 – ₹5,500
- **Corporate Executive:** ₹5,500 – ₹9,000
- **Royal Festive:** ₹9,000 – ₹25,000+

---

## Chapter 4: Dataset Architecture & Cataloging

StyleSense merges 108+ outfits across three distinct data sources:
1. **Handcrafted Coordinated Outfits (43 Records):** Curated Indian ethnic attire (Sherwanis, Anarkalis, Kurtas, Bandhgalas) and western business/casual ensembles.
2. **Kaggle Clothes Dataset (30 Items):** High-resolution product images across 15 fashion categories from `ryanbadai/clothes-dataset`.
3. **Global E-Commerce APIs (35 Items):** International casual and streetwear items from FakeStore and DummyJSON APIs.

---

## Chapter 5: Step-by-Step Viva Presentation Script for Students

| Step | Action in UI | What to Say to the Jury |
|---|---|---|
| **Step 1** | Open `http://localhost:5173/` | "Good morning respected examiners. We present StyleSense, an intelligent AI fashion recommendation system developed for CSE Data Science at G H Raisoni College, Jalgaon." |
| **Step 2** | Home Page 3D Rack | "Here is our interactive 3D clothes rack. Notice the side-to-front hover flips and 360° drag-to-spin inspector ported from Three.js." |
| **Step 3** | Recommend Page Weather | "Our campus weather engine auto-detects Jalgaon coordinates at 26.2°C, overcoming local ISP routing issues to recommend season-appropriate fabrics." |
| **Step 4** | Voice Stylist Button | "Click the mic and speak: 'Traditional winter wedding outfit'. The speech NLP engine automatically updates filters hands-free and confirms via voice synthesis." |
| **Step 5** | Indian Festival Selector | "Notice the Indian Festival Dress Code guide with presets for Diwali, Haldi, Sangeet, and Royal Weddings." |
| **Step 6** | Skin Undertone Profiler | "Open the Style Consultation profiler: selecting Warm undertone automatically prioritizes earthy spices like Saffron and Mustard in recommendations." |
| **Step 7** | Outfit Card 60-30-10 Bar | "Expand the Color Theory box on any card: notice the 60% dominant, 30% secondary, and 10% accent visual bar with harmony classification." |
| **Step 8** | Outfit Card Budget Box | "Expand the budget breakdown: display realistic Indian retail price estimates for Top, Bottom, Footwear, and Accessories in ₹ INR." |
| **Step 9** | Lookbook & AI Try-On | "Open the Lookbook modal for a shareable Polaroid card with WhatsApp sharing, and demonstrate the AI Try-On prompt generator for Midjourney/Flux." |
| **Step 10** | My Wardrobe Planner | "In My Wardrobe, our 7-Day Weekly Calendar features an 'Auto-Schedule Week' engine that intelligently balances outfits across Monday to Sunday." |

---

## Chapter 6: Comprehensive 35+ Jury Viva Questions & Answers

### Domain 1: Project Overview & Architecture
1. **Q: What is the core problem solved by StyleSense?**  
   *A:* It solves wardrobe decision fatigue by recommending complete, coordinated 4-piece outfits (Top, Bottom, Footwear, Accessories) rather than isolated products.
2. **Q: Why a Dual-Edition (Python + React)?**  
   *A:* Python Tkinter satisfies the university lab offline syllabus constraints with zero pip dependencies; React 19 + Vite demonstrates modern web architecture, 3D graphics, and speech recognition.
3. **Q: What are the dataset sources?**  
   *A:* 108+ outfits combining 43 Handcrafted Complete Outfits, 30 Kaggle Clothes Dataset items, and 35 Global API items.
4. **Q: Is it rule-based or machine learning?**  
   *A:* The production core is a multi-attribute heuristic filter with dynamic scoring and Euclidean color harmony math, providing deterministic, explainable recommendations without GPU latency.

### Domain 2: Color Theory & Undertones
5. **Q: Explain the 60-30-10 color rule.**  
   *A:* 60% dominant base color, 30% secondary structure, and 10% accent contrast. Our engine classifies harmony into Monochromatic, Complementary, Analogous, Royal Festive, or Sartorial.
6. **Q: How does the skin undertone profiler work?**  
   *A:* Maps Warm, Cool, or Neutral complexions to colorimetry palettes; outfits containing matching colors receive a score boost and are sorted to the top.
7. **Q: How do you calculate color distance?**  
   *A:* By computing 3D Euclidean distance $\Delta E = \sqrt{(\Delta R)^2 + (\Delta G)^2 + (\Delta B)^2}$ in RGB space.

### Domain 3: Voice NLP & Weather Engine
8. **Q: How does speech recognition work?**  
   *A:* It uses the HTML5 Web Speech API with `en-IN` acoustic models and extracts occasion/season/style entities via regex pattern matching.
9. **Q: How is the Jalgaon ISP routing issue solved?**  
   *A:* By overriding broadband ISP gateway NOC routing (which routes through Nashik) with default Jalgaon campus coordinates (21.0077° N, 75.5626° E).
10. **Q: How does the 3D rack render?**  
    *A:* Using Three.js and WebGL with CSS 3D perspective transformations and raycasting for drag-to-spin interaction.

### Domain 4: Weekly Planner & Budget Pricing
11. **Q: How does the 7-day weekly calendar work?**  
    *A:* Maps Monday–Sunday to occasion themes (Monday Formal, Midweek Casual, Weekend Festive) and auto-schedules saved wardrobe looks into HTML5 LocalStorage.
12. **Q: How are ₹ INR prices calculated?**  
    *A:* Via deterministic hashing over garment categories and styles, categorizing looks into College Budget, Daily Smart, Corporate Executive, and Royal Festive tiers.
13. **Q: How does the GenAI Try-On Prompt work?**  
    *A:* Formulates studio-grade prompt strings with lighting ratios, camera focal lengths, and environments for Midjourney, Stable Diffusion, and Flux.1.
14. **Q: How was the vertical scroll bug fixed?**  
    *A:* Cleaned up unmounted modal `overflow: hidden` rules, added `touch-action: pan-y`, and integrated a router-level `ScrollToTop` listener.

---

## Chapter 7: Conclusion & Future Scope

StyleSense proves that human-centered artificial intelligence can transform everyday styling decisions into an effortless, scientific, and culturally attuned experience. Future enhancements include:
1. Client-side garment segmentation using YOLOv8 via TensorFlow.js.
2. Collaborative filtering with Graph Neural Networks (GNNs).
3. Native mobile app deployment via React Native.

**GitHub Repository:** [https://github.com/mrsankya/outfit-recommender.git](https://github.com/mrsankya/outfit-recommender.git)  
**Affiliation:** Department of Computer Science and Engineering (Data Science), G H Raisoni College of Engineering and Management, Jalgaon (MH).
