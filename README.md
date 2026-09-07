# Esteban Armas Vega — Personal Website

A polished, fully **static** personal website (HTML + CSS + JavaScript, **no build tools**).
It works on **GitHub Pages** out of the box — no compilation, no npm, no frameworks.

🔗 **Live site:** `https://esteban-armas.github.io/es73ban/` *(after GitHub Pages is enabled — see below).*

---

## 📁 Project structure

```
.
├── index.html                          # All page content + section markers
├── style.css                           # All styling + design tokens (:root)
├── script.js                           # Animations, nav, sorting, filters
├── assets/
│   ├── profile.jpg                     # Hero portrait
│   └── hexgrid.svg                     # Hero background pattern
├── Esteban_Armas_CV_All_Include-2.pdf  # Academic CV (downloadable)
├── esteban_armas_modern_cv-2.pdf       # Industry CV (downloadable)
├── .nojekyll                           # Tells GitHub Pages to serve files as-is
└── README.md                           # This file
```

---

## ✏️ How to update each section

Everything lives in **`index.html`**. Each section is clearly marked with a comment
like `<!-- SECTION: EXPERIENCE -->`. To add an entry, **copy an existing block, paste
it in place, and edit the text**. No other file needs to change.

### ➕ Add a new job (Experience)
Find `SECTION: EXPERIENCE`. Copy a block between `<!-- === timeline-item START === -->`
and `<!-- === timeline-item END === -->`, paste it at the **top** (most recent first) and edit:

```html
<div class="timeline-item">
  <div class="role">Your Job Title</div>
  <div class="company">Company / Institution</div>
  <span class="period">Mon YYYY – Present · Location</span>
  <ul>
    <li>Bullet describing what you did.</li>
    <li>Another bullet.</li>
  </ul>
</div>
```

### ➕ Add a degree (Education)
Find `SECTION: EDUCATION`. Copy an `edu-card` block:

```html
<div class="edu-card">
  <div class="degree">Degree name</div>
  <div class="inst">Institution</div>
  <div class="year">Month Year</div>
  <div class="thesis">Thesis: "…"</div>
</div>
```

### ➕ Add a publication
Find `SECTION: PUBLICATIONS`. Copy a `pub-card` block. **Important:** set
`data-citations="NN"` — the list auto-sorts by that number (highest first).

```html
<article class="pub-card" data-citations="12">
  <div class="pub-title">Paper title</div>
  <div class="pub-meta">Authors (use <b>E.A. Armas Vega</b> to bold your name)</div>
  <div class="pub-meta"><span class="pub-venue">Journal / Conference</span> · YEAR</div>
  <div class="pub-footer">
    <a href="https://doi.org/…" target="_blank" rel="noopener">DOI ↗</a>
    <span class="cite-badge">📈 <b>12</b>&nbsp;citations</span>
  </div>
</article>
```
Also update the total citations / h-index text in the section sub-title if needed.

### ➕ Add a research project
Find `SECTION: PROJECTS`. Copy a `project-card` block. Set
`data-status="active"` or `data-status="completed"` so the filter tabs work,
and use the matching `status-pill` class.

```html
<div class="project-card" data-status="active">
  <div class="proj-head">
    <span class="proj-name">PROJECT NAME</span>
    <span class="status-pill status-active">Active</span>   <!-- or status-completed / Completed -->
  </div>
  <div class="proj-prog">Programme · Grant number</div>
  <div class="proj-desc">One-line description.</div>
  <div class="proj-period">Start – End · <a href="URL" target="_blank" rel="noopener">Website ↗</a></div>
</div>
```

### ➕ Add a skill
Find `SECTION: SKILLS`. Add a badge inside the right group:
```html
<span class="badge">New Skill</span>
```
To add a whole new group, copy a `skill-group` block.

### ➕ Add a brand-new section
1. In `index.html`, copy any `<section id="…"> … </section>` block.
2. Give it a unique `id` and wrap content in `<div class="container reveal">`
   (the `reveal` class gives the fade-in on scroll).
3. Add a nav link in the NAVBAR: `<li><a href="#your-id">Label</a></li>`.

### 🔄 Update the CVs
Replace the two PDF files (keep the same filenames), or update the `href` in the
hero "Download CV" buttons if you rename them. Search `download` in `index.html`.

---

## 🎨 Changing the look

All colors, fonts and spacing are **design tokens** at the top of `style.css`:

```css
:root {
  --bg:     #0d1117;   /* background      */
  --accent: #00d4ff;   /* cyan accent     */
  --accent-2: #7c5cff; /* violet accent   */
  --font:   'Inter', sans-serif;
  ...
}
```
Change a value once and it applies everywhere.

---

## 🚀 Deploying on GitHub Pages

This repo is already set up to be served as-is. To enable Pages:

1. Go to the repo on GitHub → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Select branch **`main`** and folder **`/ (root)`**, then **Save**.
4. Wait ~1 minute. The site publishes at `https://esteban-armas.github.io/es73ban/`.

> **The repository must be public** for GitHub Pages to work on a free account.
> If it's private, either make it public (Settings → General → Danger Zone) or use
> GitHub Pro.

The `.nojekyll` file is included so GitHub serves all files (including any starting
with `_`) without running Jekyll.

---

## 🖥️ Preview locally

No build step needed. Just open `index.html` in a browser, or run a tiny server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## 📄 License

Content © Esteban Alejandro Armas Vega. Code is free to reuse.
