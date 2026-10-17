"""
fashion_outfit_recommendation.py
---------------------------------
Fashion Outfit Recommendation System
Desktop prototype — G H Raisoni College of Engineering and Management, Jalgaon

Technology : Python 3 + Tkinter (standard library — no pip installs needed)
Algorithm  : Rule-based preference filtering over a local outfit catalogue
Run        : python fashion_outfit_recommendation.py
"""

import tkinter as tk
from tkinter import ttk, font as tkfont
from catalogue import OUTFITS, OCCASIONS, SEASONS, STYLES

# ─────────────────────────────────────────────────────────────────────────────
# COLOUR PALETTE & THEME
# ─────────────────────────────────────────────────────────────────────────────
PALETTE = {
    "bg_dark":     "#1A1A2E",   # deep navy background
    "bg_mid":      "#16213E",   # panel background
    "bg_card":     "#0F3460",   # outfit card background
    "accent":      "#E94560",   # red-pink accent
    "accent2":     "#533483",   # purple secondary
    "text_light":  "#F5F5F5",   # primary text
    "text_muted":  "#A8B2C1",   # secondary text
    "tag_bg":      "#E94560",   # colour-chip background
    "tag_fg":      "#FFFFFF",   # colour-chip text
    "btn_bg":      "#E94560",
    "btn_fg":      "#FFFFFF",
    "reset_bg":    "#533483",
    "reset_fg":    "#FFFFFF",
    "header_bg":   "#0D0D1F",
    "success":     "#2ECC71",
    "warning":     "#E67E22",
}


# ─────────────────────────────────────────────────────────────────────────────
# CORE RECOMMENDATION FILTER
# ─────────────────────────────────────────────────────────────────────────────
def get_recommendations(occasion: str, season: str, style: str) -> list:
    """
    Return all outfit records that match the selected preferences.
    A field set to 'Any' is treated as a wildcard and does not restrict results.
    """
    results = []
    for outfit in OUTFITS:
        match_occasion = (occasion == "Any" or outfit["occasion"] == occasion)
        match_season   = (season   == "Any" or outfit["season"]   == season)
        match_style    = (style    == "Any" or outfit["style"]     == style)
        if match_occasion and match_season and match_style:
            results.append(outfit)
    return results


# ─────────────────────────────────────────────────────────────────────────────
# OUTFIT CARD WIDGET
# ─────────────────────────────────────────────────────────────────────────────
def build_outfit_card(parent, outfit: dict, row: int, col: int):
    """Render one outfit as a styled card in the parent grid."""
    card = tk.Frame(
        parent,
        bg=PALETTE["bg_card"],
        bd=0,
        relief="flat",
        padx=18,
        pady=16,
        cursor="hand2",
    )
    card.grid(row=row, column=col, padx=10, pady=10, sticky="nsew")

    # ── Outfit Name ──
    tk.Label(
        card,
        text=outfit["name"],
        bg=PALETTE["bg_card"],
        fg=PALETTE["accent"],
        font=("Segoe UI", 13, "bold"),
        wraplength=270,
        justify="left",
        anchor="w",
    ).pack(anchor="w", pady=(0, 6))

    # ── Tags row (Occasion | Season | Style) ──
    tag_frame = tk.Frame(card, bg=PALETTE["bg_card"])
    tag_frame.pack(anchor="w", pady=(0, 10))
    for tag in [outfit["occasion"], outfit["season"], outfit["style"]]:
        tk.Label(
            tag_frame,
            text=f" {tag} ",
            bg=PALETTE["accent2"],
            fg=PALETTE["tag_fg"],
            font=("Segoe UI", 8, "bold"),
            relief="flat",
            padx=4,
            pady=2,
        ).pack(side="left", padx=(0, 4))

    # ── Clothing Details ──
    details = [
        ("👕  Top",       outfit["top"]),
        ("👖  Bottom",    outfit["bottom"]),
        ("👟  Shoes",     outfit["shoes"]),
        ("💼  Accessory", outfit["accessory"]),
    ]
    for label, value in details:
        row_f = tk.Frame(card, bg=PALETTE["bg_card"])
        row_f.pack(anchor="w", fill="x", pady=1)
        tk.Label(
            row_f,
            text=label,
            bg=PALETTE["bg_card"],
            fg=PALETTE["text_muted"],
            font=("Segoe UI", 9, "bold"),
            width=12,
            anchor="w",
        ).pack(side="left")
        tk.Label(
            row_f,
            text=value,
            bg=PALETTE["bg_card"],
            fg=PALETTE["text_light"],
            font=("Segoe UI", 9),
            wraplength=210,
            justify="left",
            anchor="w",
        ).pack(side="left", padx=(4, 0))

    # ── Colour Palette chips ──
    sep = tk.Frame(card, bg=PALETTE["accent2"], height=1)
    sep.pack(fill="x", pady=(10, 6))

    colour_frame = tk.Frame(card, bg=PALETTE["bg_card"])
    colour_frame.pack(anchor="w")
    tk.Label(
        colour_frame,
        text="🎨 Colours:",
        bg=PALETTE["bg_card"],
        fg=PALETTE["text_muted"],
        font=("Segoe UI", 8, "bold"),
    ).pack(side="left", padx=(0, 6))
    for colour in outfit["colours"]:
        tk.Label(
            colour_frame,
            text=colour,
            bg=PALETTE["tag_bg"],
            fg=PALETTE["tag_fg"],
            font=("Segoe UI", 8),
            padx=5,
            pady=1,
        ).pack(side="left", padx=2)

    # ── Styling Tip ──
    tip_frame = tk.Frame(card, bg="#0A2744", bd=0, padx=8, pady=6)
    tip_frame.pack(fill="x", pady=(8, 0))
    tk.Label(
        tip_frame,
        text="💡 Tip",
        bg="#0A2744",
        fg=PALETTE["success"],
        font=("Segoe UI", 8, "bold"),
    ).pack(anchor="w")
    tk.Label(
        tip_frame,
        text=outfit["tip"],
        bg="#0A2744",
        fg=PALETTE["text_light"],
        font=("Segoe UI", 8, "italic"),
        wraplength=265,
        justify="left",
    ).pack(anchor="w")


# ─────────────────────────────────────────────────────────────────────────────
# MAIN APPLICATION CLASS
# ─────────────────────────────────────────────────────────────────────────────
class FashionApp(tk.Tk):
    """Fashion Outfit Recommendation — Tkinter Desktop Application."""

    CARDS_PER_ROW = 3   # number of outfit cards displayed per row

    def __init__(self):
        super().__init__()
        self.title("Fashion Outfit Recommendation System")
        self.geometry("1100x750")
        self.minsize(900, 620)
        self.configure(bg=PALETTE["bg_dark"])
        self.resizable(True, True)

        self._build_header()
        self._build_filter_panel()
        self._build_results_area()
        self._show_initial_sample()

    # ── Header ─────────────────────────────────────────────────────────────
    def _build_header(self):
        header = tk.Frame(self, bg=PALETTE["header_bg"], pady=16)
        header.pack(fill="x")

        tk.Label(
            header,
            text="👗  Fashion Outfit Recommendation System",
            bg=PALETTE["header_bg"],
            fg=PALETTE["text_light"],
            font=("Segoe UI", 20, "bold"),
        ).pack()

        tk.Label(
            header,
            text="Select your occasion, season, and style — then click Recommend Outfits",
            bg=PALETTE["header_bg"],
            fg=PALETTE["text_muted"],
            font=("Segoe UI", 10),
        ).pack(pady=(4, 0))

    # ── Filter Panel ───────────────────────────────────────────────────────
    def _build_filter_panel(self):
        panel = tk.Frame(self, bg=PALETTE["bg_mid"], pady=18, padx=30)
        panel.pack(fill="x")

        # Style dropdowns
        style_opts = ttk.Style()
        style_opts.theme_use("clam")
        style_opts.configure(
            "Filter.TCombobox",
            fieldbackground=PALETTE["bg_card"],
            background=PALETTE["bg_card"],
            foreground=PALETTE["text_light"],
            selectbackground=PALETTE["accent"],
            selectforeground=PALETTE["text_light"],
            arrowcolor=PALETTE["accent"],
            bordercolor=PALETTE["accent2"],
            lightcolor=PALETTE["bg_card"],
            darkcolor=PALETTE["bg_card"],
        )

        # Row for filter widgets
        filter_row = tk.Frame(panel, bg=PALETTE["bg_mid"])
        filter_row.pack()

        # ── Occasion ──
        tk.Label(
            filter_row, text="Occasion", bg=PALETTE["bg_mid"],
            fg=PALETTE["text_muted"], font=("Segoe UI", 10, "bold"),
        ).grid(row=0, column=0, padx=(0, 4), sticky="w")
        self.var_occasion = tk.StringVar(value="Any")
        occ_cb = ttk.Combobox(
            filter_row, textvariable=self.var_occasion,
            values=["Any"] + OCCASIONS, state="readonly",
            width=18, style="Filter.TCombobox",
        )
        occ_cb.grid(row=1, column=0, padx=(0, 20))

        # ── Season ──
        tk.Label(
            filter_row, text="Season", bg=PALETTE["bg_mid"],
            fg=PALETTE["text_muted"], font=("Segoe UI", 10, "bold"),
        ).grid(row=0, column=1, padx=(0, 4), sticky="w")
        self.var_season = tk.StringVar(value="Any")
        sea_cb = ttk.Combobox(
            filter_row, textvariable=self.var_season,
            values=["Any"] + SEASONS, state="readonly",
            width=18, style="Filter.TCombobox",
        )
        sea_cb.grid(row=1, column=1, padx=(0, 20))

        # ── Style ──
        tk.Label(
            filter_row, text="Style", bg=PALETTE["bg_mid"],
            fg=PALETTE["text_muted"], font=("Segoe UI", 10, "bold"),
        ).grid(row=0, column=2, padx=(0, 4), sticky="w")
        self.var_style = tk.StringVar(value="Any")
        sty_cb = ttk.Combobox(
            filter_row, textvariable=self.var_style,
            values=["Any"] + STYLES, state="readonly",
            width=18, style="Filter.TCombobox",
        )
        sty_cb.grid(row=1, column=2, padx=(0, 30))

        # ── Buttons ──
        btn_frame = tk.Frame(filter_row, bg=PALETTE["bg_mid"])
        btn_frame.grid(row=1, column=3, padx=(0, 0))

        recommend_btn = tk.Button(
            btn_frame,
            text="🔍  Recommend Outfits",
            bg=PALETTE["btn_bg"],
            fg=PALETTE["btn_fg"],
            font=("Segoe UI", 10, "bold"),
            relief="flat",
            padx=14,
            pady=6,
            cursor="hand2",
            command=self._on_recommend,
            activebackground="#c73652",
            activeforeground="#ffffff",
        )
        recommend_btn.pack(side="left", padx=(0, 10))

        reset_btn = tk.Button(
            btn_frame,
            text="↺  Reset",
            bg=PALETTE["reset_bg"],
            fg=PALETTE["reset_fg"],
            font=("Segoe UI", 10, "bold"),
            relief="flat",
            padx=12,
            pady=6,
            cursor="hand2",
            command=self._on_reset,
            activebackground="#3d2566",
            activeforeground="#ffffff",
        )
        reset_btn.pack(side="left")

        # ── Result count label ──
        self.lbl_count = tk.Label(
            panel,
            text="",
            bg=PALETTE["bg_mid"],
            fg=PALETTE["text_muted"],
            font=("Segoe UI", 9, "italic"),
        )
        self.lbl_count.pack(pady=(10, 0))

    # ── Scrollable Results Area ────────────────────────────────────────────
    def _build_results_area(self):
        container = tk.Frame(self, bg=PALETTE["bg_dark"])
        container.pack(fill="both", expand=True, padx=10, pady=10)

        # Canvas + scrollbar
        self.canvas = tk.Canvas(
            container, bg=PALETTE["bg_dark"], highlightthickness=0
        )
        scrollbar = ttk.Scrollbar(
            container, orient="vertical", command=self.canvas.yview
        )
        self.canvas.configure(yscrollcommand=scrollbar.set)

        scrollbar.pack(side="right", fill="y")
        self.canvas.pack(side="left", fill="both", expand=True)

        # Inner frame that holds the cards
        self.inner_frame = tk.Frame(self.canvas, bg=PALETTE["bg_dark"])
        self.canvas_window = self.canvas.create_window(
            (0, 0), window=self.inner_frame, anchor="nw"
        )

        # Resize inner frame width with canvas
        self.canvas.bind(
            "<Configure>",
            lambda e: self.canvas.itemconfig(
                self.canvas_window, width=e.width
            ),
        )
        self.inner_frame.bind(
            "<Configure>",
            lambda e: self.canvas.configure(
                scrollregion=self.canvas.bbox("all")
            ),
        )

        # Mouse-wheel scrolling
        self.canvas.bind_all("<MouseWheel>",
            lambda e: self.canvas.yview_scroll(-1 * (e.delta // 120), "units")
        )

    # ── Render Outfit Cards ────────────────────────────────────────────────
    def _render_cards(self, outfits: list):
        # Clear existing cards
        for widget in self.inner_frame.winfo_children():
            widget.destroy()

        if not outfits:
            self._show_no_match()
            return

        # Configure equal-width columns
        n_cols = self.CARDS_PER_ROW
        for c in range(n_cols):
            self.inner_frame.columnconfigure(c, weight=1)

        for i, outfit in enumerate(outfits):
            build_outfit_card(
                self.inner_frame, outfit,
                row=i // n_cols,
                col=i % n_cols,
            )

        self.canvas.yview_moveto(0)

    def _show_no_match(self):
        """Display a friendly no-match message."""
        frame = tk.Frame(self.inner_frame, bg=PALETTE["bg_dark"])
        frame.pack(expand=True, pady=80)

        tk.Label(
            frame,
            text="🔍",
            bg=PALETTE["bg_dark"],
            fg=PALETTE["text_light"],
            font=("Segoe UI", 48),
        ).pack()
        tk.Label(
            frame,
            text="No outfits found for this combination.",
            bg=PALETTE["bg_dark"],
            fg=PALETTE["accent"],
            font=("Segoe UI", 16, "bold"),
        ).pack(pady=(8, 4))
        tk.Label(
            frame,
            text='Try setting one or more filters to "Any" or use the Reset button.',
            bg=PALETTE["bg_dark"],
            fg=PALETTE["text_muted"],
            font=("Segoe UI", 11),
        ).pack()

    # ── Initial Sample Display ─────────────────────────────────────────────
    def _show_initial_sample(self):
        """Show a few sample outfits on startup."""
        sample = OUTFITS[:6]
        self._render_cards(sample)
        self.lbl_count.config(
            text=f"Showing {len(sample)} sample outfits — select filters and click Recommend Outfits"
        )

    # ── Button Actions ─────────────────────────────────────────────────────
    def _on_recommend(self):
        occasion = self.var_occasion.get()
        season   = self.var_season.get()
        style    = self.var_style.get()

        results = get_recommendations(occasion, season, style)
        self._render_cards(results)

        if results:
            self.lbl_count.config(
                fg=PALETTE["success"],
                text=f"✔  {len(results)} outfit(s) found for "
                     f"Occasion={occasion} | Season={season} | Style={style}",
            )
        else:
            self.lbl_count.config(
                fg=PALETTE["warning"],
                text="⚠  No matches — try broadening your filters or click Reset.",
            )

    def _on_reset(self):
        self.var_occasion.set("Any")
        self.var_season.set("Any")
        self.var_style.set("Any")
        self._show_initial_sample()
        self.lbl_count.config(
            fg=PALETTE["text_muted"],
            text="Filters reset — showing sample outfits.",
        )


# ─────────────────────────────────────────────────────────────────────────────
# ENTRY POINT
# ─────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    app = FashionApp()
    app.mainloop()
