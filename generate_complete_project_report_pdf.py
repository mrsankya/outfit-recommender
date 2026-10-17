# generate_complete_project_report_pdf.py
import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class AcademicNumberedCanvas(canvas.Canvas):
    """Generates formal academic headers and 'Page X of Y' footers."""
    def __init__(self, *args, **kwargs):
        super(AcademicNumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(AcademicNumberedCanvas, self).showPage()
        super(AcademicNumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return  # Skip cover page

        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#718096"))

        # Header
        self.drawString(54, 750, "StyleSense: AI Fashion Outfit Recommendation System — Minor Project Report & Manual")
        self.drawRightString(612 - 54, 750, "G H Raisoni College, Jalgaon")
        self.setStrokeColor(colors.HexColor("#CBD5E0"))
        self.setLineWidth(0.5)
        self.line(54, 744, 612 - 54, 744)

        # Footer
        self.line(54, 45, 612 - 54, 45)
        self.drawString(54, 32, "Department of Computer Science and Engineering (Data Science) | Academic Year 2026–2027")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(612 - 54, 32, page_str)
        self.restoreState()


def build_complete_report_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    primary_color = colors.HexColor("#0F2942")   # Deep Oxford Navy
    secondary_color = colors.HexColor("#1E56A0") # Academic Blue
    accent_color = colors.HexColor("#C0392B")    # Crimson Accent
    text_dark = colors.HexColor("#1A202C")       # Rich Charcoal
    bg_soft = colors.HexColor("#F7FAFC")

    title_style = ParagraphStyle(
        'RepTitle', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=22, leading=26,
        textColor=primary_color, alignment=1, spaceAfter=8
    )

    subtitle_style = ParagraphStyle(
        'RepSubtitle', parent=styles['Normal'],
        fontName='Helvetica', fontSize=12, leading=16,
        textColor=secondary_color, alignment=1, spaceAfter=16
    )

    h1_style = ParagraphStyle(
        'RepH1', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=13.5, leading=17,
        textColor=primary_color, spaceBefore=14, spaceAfter=6, keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'RepH2', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=10.5, leading=14,
        textColor=secondary_color, spaceBefore=9, spaceAfter=4, keepWithNext=True
    )

    body_style = ParagraphStyle(
        'RepBody', parent=styles['Normal'],
        fontName='Helvetica', fontSize=8.8, leading=12.5,
        textColor=text_dark, spaceAfter=5
    )

    bullet_style = ParagraphStyle(
        'RepBullet', parent=body_style,
        leftIndent=12, firstLineIndent=-8, spaceAfter=3
    )

    code_style = ParagraphStyle(
        'RepCode', parent=styles['Normal'],
        fontName='Courier', fontSize=8, leading=10.5,
        textColor=colors.HexColor("#1A365D"), backColor=colors.HexColor("#EDF2F7"),
        leftIndent=10, rightIndent=10, spaceBefore=4, spaceAfter=6
    )

    callout_style = ParagraphStyle(
        'RepCallout', parent=styles['Normal'],
        fontName='Helvetica-Oblique', fontSize=8.5, leading=12,
        textColor=colors.HexColor("#2C5282")
    )

    story = []

    # ==========================================
    # COVER / TITLE PAGE
    # ==========================================
    story.append(Spacer(1, 15))
    story.append(Paragraph("A MINOR PROJECT REPORT ON", ParagraphStyle(
        'PType', fontName='Helvetica-Bold', fontSize=11, leading=14, alignment=1, textColor=secondary_color
    )))
    story.append(Spacer(1, 10))

    story.append(HRFlowable(width="100%", thickness=3, color=accent_color, spaceBefore=2, spaceAfter=14))
    story.append(Paragraph("StyleSense: Intelligent Fashion Outfit Recommendation System", title_style))
    story.append(Paragraph("A Dual-Edition Intelligent Wardrobe Coordination Platform with Color Theory Harmony, Real-Time Campus Weather Integration, Voice NLP Stylist & GenAI Virtual Try-On", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#CBD5E0"), spaceBefore=2, spaceAfter=20))

    story.append(Paragraph("SUBMITTED IN PARTIAL FULFILLMENT OF THE REQUIREMENTS FOR THE DEGREE OF", ParagraphStyle(
        'PReq', fontName='Helvetica', fontSize=9, leading=13, alignment=1, textColor=text_dark
    )))
    story.append(Paragraph("<b>BACHELOR OF TECHNOLOGY IN COMPUTER SCIENCE & ENGINEERING<br/>(DATA SCIENCE)</b>", ParagraphStyle(
        'PDeg', fontName='Helvetica-Bold', fontSize=11, leading=15, alignment=1, textColor=primary_color
    )))
    story.append(Spacer(1, 20))

    dept_table = [
        [Paragraph("<b>Submitted By:</b>", body_style), Paragraph("Final Year / Minor Project Student Team", body_style)],
        [Paragraph("<b>Department:</b>", body_style), Paragraph("Department of Computer Science and Engineering (Data Science)", body_style)],
        [Paragraph("<b>Institution:</b>", body_style), Paragraph("G H Raisoni College of Engineering and Management, Jalgaon (MH)", body_style)],
        [Paragraph("<b>Affiliation:</b>", body_style), Paragraph("KBC North Maharashtra University, Jalgaon / Autonomous", body_style)],
        [Paragraph("<b>Academic Year:</b>", body_style), Paragraph("2026 – 2027", body_style)],
        [Paragraph("<b>GitHub Repository:</b>", body_style), Paragraph("https://github.com/mrsankya/outfit-recommender.git", body_style)]
    ]
    t_dept = Table(dept_table, colWidths=[130, 374])
    t_dept.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg_soft),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E0")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('PADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(t_dept)

    story.append(Spacer(1, 25))
    notice_p = [
        [Paragraph("<b>Project Summary & Operational Handbook:</b> This technical report contains complete operational run commands, mathematical models, architectural blueprints, dataset catalogs, viva defense scripts, and rubric evaluations for academic examination.", callout_style)]
    ]
    t_not = Table(notice_p, colWidths=[504])
    t_not.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#EBF8FF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#BEE3F8")),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_not)

    story.append(PageBreak())

    # ==========================================
    # CERTIFICATE & ABSTRACT
    # ==========================================
    story.append(Paragraph("Certificate of Minor Project Completion", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=primary_color, spaceBefore=2, spaceAfter=8))
    story.append(Paragraph(
        "This is to certify that the project entitled <b>\"StyleSense: Fashion Outfit Recommendation System\"</b> is a bonafide work carried out by the undergraduate students of the <b>Department of Computer Science and Engineering (Data Science)</b> at <b>G H Raisoni College of Engineering and Management, Jalgaon</b>, in partial fulfillment of the requirements for the degree of Bachelor of Technology during the academic year 2026–2027.",
        body_style
    ))
    story.append(Spacer(1, 10))

    cert_signatures = [
        [Paragraph("<b>Project Guide</b><br/>Department of CSE (Data Science)", body_style), Paragraph("<b>Head of Department</b><br/>Department of CSE (Data Science)", body_style), Paragraph("<b>External Examiner</b><br/>University Evaluator", body_style)]
    ]
    t_sig = Table(cert_signatures, colWidths=[168, 168, 168])
    t_sig.setStyle(TableStyle([
        ('LINEBEFORE', (1,0), (-1,-1), 0.5, colors.HexColor("#CBD5E0")),
        ('TOPPADDING', (0,0), (-1,-1), 30),
        ('ALIGN', (0,0), (-1,-1), 'CENTER')
    ]))
    story.append(t_sig)
    story.append(Spacer(1, 14))

    story.append(Paragraph("Executive Abstract", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=primary_color, spaceBefore=2, spaceAfter=8))
    story.append(Paragraph(
        "StyleSense is a human-centered artificial intelligence platform designed to eliminate clothing coordination fatigue. "
        "Unlike commercial e-commerce systems that recommend isolated garments (e.g. only shirts or shoes), StyleSense recommends complete, "
        "harmonious four-piece ensembles (Topwear, Bottomwear, Footwear, and Accessories). "
        "The system incorporates an algorithmic <b>60-30-10 Color Theory Harmony Engine</b>, a <b>Skin Undertone & Silhouette Profiler</b>, "
        "a real-time <b>Open-Meteo Campus Weather Engine</b> specifically mapped to Jalgaon (21.0077° N, 75.5626° E) with ISP gateway correction, "
        "a <b>Web Speech Recognition Voice Stylist</b>, an <b>Indian Cultural Festival & Wedding Dress Code Selector</b>, "
        "a <b>Weekly 7-Day OOTD Calendar Planner</b>, a deterministic <b>₹ INR Budget Estimation Engine</b>, and an external <b>GenAI Studio Prompt Builder</b> "
        "for photorealistic visual try-on via Midjourney and Flux. "
        "The project is structured in a dual-edition architecture (offline Python standard library GUI + high-performance React 19/Vite web application) "
        "ensuring 100% academic compliance and commercial-grade usability.",
        body_style
    ))
    story.append(Spacer(1, 10))

    story.append(PageBreak())

    # ==========================================
    # CHAPTER 1: COMPLETE HOW TO RUN GUIDE
    # ==========================================
    story.append(Paragraph("1. Complete How to Run Guide (Execution Manual)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=primary_color, spaceBefore=2, spaceAfter=8))

    story.append(Paragraph("<b>1.1 System Prerequisites & Environment Setup</b>", h2_style))
    story.append(Paragraph("StyleSense is engineered to run seamlessly on standard college lab workstations and laptops. Required runtimes:", body_style))
    story.append(Paragraph("• <b>Python 3.8 to 3.12:</b> Used for the Desktop Edition and PDF report compilation. Uses only Python standard library (`tkinter`, `json`, `os`, `urllib`).", bullet_style))
    story.append(Paragraph("• <b>Node.js 18.x or 20.x LTS & npm:</b> Required to bundle and serve the modern React Web Edition.", bullet_style))
    story.append(Paragraph("• <b>Web Browser:</b> Google Chrome or Microsoft Edge (version 100+) for full HTML5 Web Speech Recognition and WebGL Three.js acceleration.", bullet_style))
    story.append(Paragraph("• <b>Git:</b> Installed on PATH for cloning and syncing with the central repository (`https://github.com/mrsankya/outfit-recommender.git`).", bullet_style))

    story.append(Paragraph("<b>1.2 Step-by-Step Launch Instructions</b>", h2_style))

    run_table = [
        ["Edition", "Operating Command", "Expected Output & Port"],
        [
            "Desktop Edition (Python / Tkinter)",
            "Method 1: Double-click 'run.bat'\nMethod 2: python fashion_outfit_recommendation.py",
            "Launches offline desktop application window with occasion/season/style filters, 48 outfits, and card viewer."
        ],
        [
            "Web Edition (React 19 + Vite)",
            "Method 1: Double-click 'run_web.bat'\nMethod 2: cd fashion-web && npm run dev",
            "Launches Vite development server at http://localhost:5173/ with 3D rack, voice stylist, and weekly planner."
        ],
        [
            "Jury Handbook PDF Generator",
            "python generate_jury_handbook_pdf.py",
            "Generates 8-page 'StyleSense_Fashion_Recommendation_Jury_Handbook.pdf' in project root."
        ],
        [
            "Comprehensive Project Report PDF",
            "python generate_complete_project_report_pdf.py",
            "Compiles complete formal academic project report PDF with full architectural diagrams and viva Q&A."
        ]
    ]
    t_run = Table([[Paragraph(f"<b>{c}</b>" if r == 0 else c.replace('\n', '<br/>'), body_style) for c in row] for r, row in enumerate(run_table)], colWidths=[120, 200, 184])
    t_run.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1E56A0")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E0")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor("#FFFFFF"), bg_soft]),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_run)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>1.3 Troubleshooting Common Run Issues</b>", h2_style))
    story.append(Paragraph("• <b>Port 5173 Busy:</b> If port 5173 is in use, Vite will automatically prompt or switch to port 5174. Open the URL displayed in the terminal.", bullet_style))
    story.append(Paragraph("• <b>Microphone Access Blocked:</b> Click the lock icon in the browser address bar, set 'Microphone' to 'Allow', and refresh the page.", bullet_style))
    story.append(Paragraph("• <b>Offline Weather Fallback:</b> If internet is unavailable, the weather widget automatically falls back to the default Jalgaon campus profile (26.2°C Summer / Mild) with zero crashing.", bullet_style))
    story.append(Paragraph("• <b>Git Push Buffer Error:</b> For large image assets, run `git config http.postBuffer 524288000` to prevent curl 55 reset errors.", bullet_style))

    story.append(Spacer(1, 10))

    # ==========================================
    # CHAPTER 2: SYSTEM ARCHITECTURE & MODULES
    # ==========================================
    story.append(Paragraph("2. System Architecture & Technological Blueprint", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=primary_color, spaceBefore=2, spaceAfter=8))

    story.append(Paragraph("<b>2.1 Dual-Edition Engineering Strategy</b>", h2_style))
    story.append(Paragraph(
        "A critical innovation of this project is its dual-edition implementation. In university evaluations, external examiners often demand proof of fundamentals (offline Python, standard libraries, zero external network dependency) while simultaneously demanding modern industrial relevance (responsive web SPAs, REST APIs, WebGL, Speech APIs). StyleSense satisfies both paradigms:",
        body_style
    ))
    story.append(Paragraph("• <b>Offline Core:</b> Python Tkinter GUI implementing object-oriented MVC architecture with deterministic state and zero pip installations.", bullet_style))
    story.append(Paragraph("• <b>Modern Production Suite:</b> React 19 component tree, Lucide icons, Framer Motion animations, Three.js 3D viewport, HTML5 LocalStorage persistence, and Web Speech API.", bullet_style))

    arch_spec_data = [
        ["Subsystem", "Component File", "Key Functionality"],
        ["Main Web Entry", "fashion-web/src/App.jsx", "Router orchestration, Navbar, Footer, ScrollToTop bug fix listener"],
        ["Recommendation Core", "fashion-web/src/pages/Recommend.jsx", "Multi-parameter filter state, voice integration, undertone score boosting"],
        ["Color Theory Engine", "fashion-web/src/utils/colorTheory.js", "60-30-10 distribution math, Euclidean distance, harmony classification"],
        ["Budget Pricing Engine", "fashion-web/src/utils/budgetPricing.js", "Deterministic retail price estimation in ₹ INR with itemized breakdown"],
        ["3D Fashion Rack", "fashion-web/src/components/ClothingRack.jsx", "Virtual boutique rail with side-to-front hover flips and 360° orbital viewer"],
        ["Voice Stylist", "fashion-web/src/components/VoiceSearch.jsx", "Web Speech recognition acoustic parser + Web Speech synthesis confirmation"],
        ["Weekly OOTD Planner", "fashion-web/src/components/WeeklyPlanner.jsx", "7-Day Monday–Sunday visual outfit calendar with auto-scheduling"],
        ["Festival Selector", "fashion-web/src/components/FestivalEventSelector.jsx", "Indian cultural event dress codes (Diwali, Haldi, Sangeet, Eid)"],
        ["Lookbook Modal", "fashion-web/src/components/LookbookModal.jsx", "Shareable Polaroid card snapshot, WhatsApp web sharing, print layout"],
        ["Campus Weather Engine", "fashion-web/src/components/WeatherWidget.jsx", "Open-Meteo REST integration, Jalgaon coordinates, ISP routing correction"]
    ]
    t_spec = Table([[Paragraph(f"<b>{c}</b>" if r == 0 else c, body_style) for c in row] for r, row in enumerate(arch_spec_data)], colWidths=[110, 170, 224])
    t_spec.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0F2942")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E0")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor("#FFFFFF"), bg_soft]),
        ('PADDING', (0,0), (-1,-1), 3.5),
    ]))
    story.append(t_spec)

    story.append(PageBreak())

    # ==========================================
    # CHAPTER 3: MATHEMATICAL & ALGORITHMIC MODELS
    # ==========================================
    story.append(Paragraph("3. Mathematical Models & Algorithmic Formulations", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=primary_color, spaceBefore=2, spaceAfter=8))

    story.append(Paragraph("<b>3.1 Multi-Attribute Recommendation Filtering Function</b>", h2_style))
    story.append(Paragraph(
        "Let O be the universe of outfits O = {o_1, o_2, ..., o_n}. Each outfit o_i is defined by a tuple:<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<b>o_i = (Occasion, Season, Style, Colors, Top, Bottom, Shoes, Accessory)</b><br/>"
        "Given user search filters (U_occ, U_sea, U_sty), the base matching set M is defined as:<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<b>M = { o ∈ O | (U_occ = 'Any' ∨ o.Occasion = U_occ) ∧ (U_sea = 'Any' ∨ o.Season = U_sea) ∧ (U_sty = 'Any' ∨ o.Style = U_sty) }</b>",
        body_style
    ))

    story.append(Paragraph("<b>3.2 Skin Undertone Palette Scoring & Boosting</b>", h2_style))
    story.append(Paragraph(
        "Let P_undertone = {c_1, c_2, ..., c_k} be the user's flattering color palette. For each outfit o ∈ M, the undertone harmony score S(o) is computed as:<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<b>S(o) = ∑_{item ∈ o.items} I(item.color ∈ P_undertone)</b><br/>"
        "Where I(·) is the indicator function returning 1 if the garment color harmonizes with the user's skin undertone and 0 otherwise. Outfits are ordered by descending S(o).",
        body_style
    ))

    story.append(Paragraph("<b>3.3 Color Theory 60-30-10 Distribution & Harmony Classification</b>", h2_style))
    story.append(Paragraph(
        "Color values are converted to RGB space. The Euclidean distance between color coordinates (R1, G1, B1) and (R2, G2, B2) is given by:<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<b>ΔE = √[ (R2 - R1)² + (G2 - G1)² + (B2 - B1)² ]</b><br/>"
        "• <b>Monochromatic:</b> ΔE < 45 across primary pieces (e.g. Navy jacket with Dark Navy trousers).<br/>"
        "• <b>Complementary:</b> Opposing wheel coordinates (e.g. Royal Blue with Mustard/Gold accents).<br/>"
        "• <b>Analogous:</b> Adjacent hue coordinates (e.g. Rust, Terracotta, and Camel).<br/>"
        "• <b>Proportional Ratio:</b> Ensembles are evaluated against the interior/fashion standard of 60% dominant base, 30% secondary structure, and 10% accent contrast.",
        body_style
    ))

    story.append(Paragraph("<b>3.4 Deterministic Budget Retail Pricing Engine (₹ INR)</b>", h2_style))
    story.append(Paragraph(
        "To provide realistic Indian market shopping intelligence without constant dynamic scraping, retail prices are computed via deterministic pseudo-random hashing seeded by outfit ID and garment complexity:<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<b>Cost(Top) = Base(Occasion, Style) + [(Seed × 173) mod Range]</b><br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<b>Total Outfit Cost = Cost(Top) + Cost(Bottom) + Cost(Footwear) + Cost(Accessories)</b><br/>"
        "Rounded to standard commercial retail endings (e.g., ₹1,499, ₹2,999, ₹8,499).",
        body_style
    ))

    story.append(Spacer(1, 10))

    # ==========================================
    # CHAPTER 4: DATASET ARCHITECTURE
    # ==========================================
    story.append(Paragraph("4. Multi-Source Fashion Dataset Architecture", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=primary_color, spaceBefore=2, spaceAfter=8))

    story.append(Paragraph(
        "StyleSense aggregates 108+ curated fashion garments and coordinated looks across three distinct industry repositories:",
        body_style
    ))

    dataset_summary = [
        ["Sub-Dataset", "Count", "Categories Covered", "Data Source & Description"],
        ["Handcrafted Coordinated Outfits", "43 Looks", "Traditional, Formal, Party, Sports, Casual", "Curated full ensembles with 4 matched pieces, color swatches, and styling tips (Indian Sherwanis, Silk Kurtas, Anarkalis, Suits)."],
        ["Kaggle Clothes Dataset", "30 Items", "Tees, Hoodies, Blazers, Pants, Shoes, Dresses", "Sampled from ryanbadai/clothes-dataset with high-res product photography and verified category alignment."],
        ["Global E-Commerce APIs", "35 Items", "Men's Shirts, Outerwear, Bags, Eyewear, Footwear", "Curated from FakeStore and DummyJSON APIs to ensure contemporary international streetwear variety."]
    ]
    t_data = Table([[Paragraph(f"<b>{c}</b>" if r == 0 else c, body_style) for c in row] for r, row in enumerate(dataset_summary)], colWidths=[120, 48, 140, 196])
    t_data.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1E56A0")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E0")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor("#FFFFFF"), bg_soft]),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_data)

    story.append(PageBreak())

    # ==========================================
    # CHAPTER 5: KEY VIVA QUESTIONS & PROJECT EVALUATION
    # ==========================================
    story.append(Paragraph("5. Academic Viva Examination Defense & Rubric Analysis", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=primary_color, spaceBefore=2, spaceAfter=8))

    core_viva_qa = [
        ("Q1. What makes StyleSense superior to conventional e-commerce filters (e.g. Myntra, Amazon)?",
         "Conventional e-commerce platforms filter single items in isolation. A user searching for a 'red shirt' receives a list of shirts with zero guidance on what trousers, shoes, or accessories match. StyleSense operates on a holistic coordination paradigm: it evaluates color theory (60-30-10 rule), occasion appropriateness, ambient campus weather, skin undertones, and budget tiers to recommend complete, ready-to-wear four-piece outfits."),
        ("Q2. How is the campus weather auto-detection implemented and how does it handle ISP proxying?",
         "The system queries Open-Meteo's REST API using precise geographical coordinates for Jalgaon (21.0077° N, 75.5626° E). Because North Maharashtra broadband ISPs frequently route IP traffic through regional gateway servers in Nashik, naive IP geolocation identifies the city as Nashik. StyleSense solves this through intelligent campus mapping: it verifies against default college coordinates and provides instant one-click campus presets."),
        ("Q3. What is the role of Generative AI in this project if models aren't hosted locally?",
         "Hosting multi-billion parameter diffusion models (like Midjourney or Stable Diffusion) requires enterprise-grade GPUs with 16GB+ VRAM that cannot run on college lab machines. StyleSense bridges this gap through prompt engineering: it generates photorealistic, hyper-detailed prompts containing camera lens specifications (85mm f/1.8), lighting ratios (cinematic rim lighting, golden hour), and background environments. Users can paste these directly into external GenAI tools to visualize how they look in the outfit."),
        ("Q4. How does the Voice-Controlled Stylist parse natural speech?",
         "It utilizes the HTML5 Web Speech Recognition API with Indian English ('en-IN') locale. The parsed transcript is processed by an intent and entity extraction algorithm that detects synonyms for occasions (e.g., 'marriage', 'shadi', 'puja' -> Traditional), seasons ('snow', 'chilly' -> Winter), and styles ('kurta', 'sherwani' -> Ethnic). It then sets state and provides spoken confirmation via SpeechSynthesis."),
        ("Q5. How is state persistence handled across page reloads?",
         "User saved wardrobe outfits, custom uploaded clothing items, skin undertone consultation preferences, and the 7-day weekly OOTD calendar are persisted client-side using HTML5 LocalStorage. A pre-loaded jury demo state is provided with 1-click restore functionality to guarantee reliable demonstrations."),
        ("Q6. How did you diagnose and resolve the vertical scroll freezing bug?",
         "During UI testing, closing certain modal overlays occasionally locked page scrolling. By profiling the DOM, we discovered modal unmount handlers failed to reset `document.body.style.overflow`. We resolved this by implementing safe cleanup effects (`return () => { document.body.style.overflow = ''; }`), adding `touch-action: pan-y` on Three.js canvases, and installing a router-level `ScrollToTop` listener on route change.")
    ]

    for q_text, ans_text in core_viva_qa:
        qa_b = []
        qa_b.append(Paragraph(f"<b>{q_text}</b>", h2_style))
        qa_b.append(Paragraph(f"<b>Answer:</b> {ans_text}", body_style))
        story.append(KeepTogether(qa_b))
        story.append(Spacer(1, 4))

    story.append(Spacer(1, 10))

    # ==========================================
    # CONCLUSION & REFERENCES
    # ==========================================
    story.append(Paragraph("6. Conclusion & Future Research Directions", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=primary_color, spaceBefore=2, spaceAfter=8))
    story.append(Paragraph(
        "StyleSense successfully demonstrates the fusion of Data Science, Computer Vision concepts, Human-Computer Interaction, "
        "and Web Engineering. By shifting the paradigm from isolated product discovery to context-aware, holistic outfit coordination, "
        "the project delivers tangible value for consumers, students, and fashion retailers alike. "
        "The project has been fully version-controlled, tested, and published to GitHub at https://github.com/mrsankya/outfit-recommender.git.",
        body_style
    ))
    story.append(Paragraph("<b>Future Scope:</b>", h2_style))
    story.append(Paragraph("1. Training fine-tuned YOLOv8 / MobileNet models directly in the browser via TensorFlow.js for automated item tagging from uploaded photos.", bullet_style))
    story.append(Paragraph("2. Graph Convolutional Networks (GCNs) for user-item collaborative filtering based on historical click streams.", bullet_style))
    story.append(Paragraph("3. Cross-platform mobile deployment using React Native / Flutter.", bullet_style))

    story.append(Spacer(1, 15))
    story.append(Paragraph("<b>Department of Computer Science and Engineering (Data Science)</b><br/>G H Raisoni College of Engineering and Management, Jalgaon (MH)", ParagraphStyle(
        'RepFootAffil', fontName='Helvetica-Bold', fontSize=9, leading=13, alignment=1, textColor=primary_color
    )))

    doc.build(story, canvasmaker=AcademicNumberedCanvas)
    print(f"Complete Project Report PDF successfully built: {filename}")


if __name__ == '__main__':
    out_pdf = os.path.join(os.getcwd(), "StyleSense_Complete_Project_Report_And_User_Guide.pdf")
    build_complete_report_pdf(out_pdf)
