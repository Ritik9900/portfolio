# Portfolio Overhaul: Engineering Specification & Content Package

**Target:** `ritik9900.github.io/portfolio` · **Repo:** `github.com/Ritik9900/portfolio`
**Constraint:** $0 budget — GitHub Pages, GitHub Actions (free tier), open-source libraries, free-tier services only.
**Audience:** FAANG/Google senior engineering leadership and technical recruiters.

---

## PART 1: TECHNICAL SPECIFICATIONS DOCUMENT (For Claude Sonnet / Opus)

> Feed each phase in §1.5 to the coding model **one phase at a time**, alongside the repo contents. Do not paste all phases at once — smaller, verifiable diffs prevent broken deployments.

### 1.1 Current State Assessment (verified against live-site screenshots, July 2026)

The live site is a well-executed *template* whose default content was never fully replaced. The issues below are ordered by damage, not by effort.

**P0 — Content-integrity defects (actively harmful; fix before anything else):**

1. **Work Experience is placeholder text.** The section shows "Company Name," "Freelance/Previous Company," and generic template bullets (Unity game backends, Vue.js frontends, "95% accuracy") that do not match the real career history (Ascendion/Charter, Gmonks). A recruiter who reads "Company Name" closes the tab — or worse, remembers it.
2. **Featured Projects are the template's demo projects.** "Image Classification System," "Unity Multiplayer Backend," "AI Recommendation Engine," etc. None of the real, differentiated work (enterprise RAG platform, IndicTTS top-4.5%, YOLOv8 Fargate deployment) appears.
3. **Certifications section lists credentials not on the resume** (TensorFlow Developer Certificate, AWS ML Specialty, Deep Learning Specialization, Vue.js Certification). Any credential not genuinely held must be deleted immediately — recruiters and background checks verify certifications, and a mismatch is disqualifying in a way a thin portfolio never is. Replace with the real ones (NPTEL Cloud Computing/Data Mining, Stanford Supervised ML).
4. **Two different contact emails.** Site shows `ritik.ranjan9900@gmail.com`; resume says `ritikranjan1212@gmail.com`. Pick one canonical address everywhere.
5. **Contact form has no backend.** GitHub Pages is static — the "Send" button does nothing. Wire it to Formspree or Web3Forms (both have free tiers) or replace with a `mailto:` + copy-to-clipboard button. A dead form on an engineer's site is a negative signal.

**P1 — Positioning defects (wrong audience):**

6. **The site is framed as a freelancer landing page**, not a senior-track engineer's portfolio: "Available for Contract Work," service cards ("AI Consulting & Strategy," "Popular" badge), the 01→04 "How I Work" process strip, and "Ready to Start Your AI Project?" CTA. Google/FAANG leadership reads this as agency marketing. Either delete these sections or move them to a separate `/freelance/` page excluded from the main nav.
7. **Diluted title.** "AI/ML Engineer & Full-Stack Developer" + About copy about Unity/Vue.js undercuts the specialist story. One spearpoint: production GenAI/RAG systems engineer.
8. **Vanity counters** ("1+ Years Experience," "10+ Projects Completed") quantify juniority. Replace with proof metrics: 91% retrieval precision, 500+ concurrent users at 99.9% availability, Top 4.5% Kaggle.
9. **Placeholder avatar** (gray silhouette). Use a real photo or remove the image card entirely — an empty frame is worse than no frame.
10. **Redundant CTAs** ("Hire Me" nav item + "Contact" button + "Get In Touch" hero button). Collapse to one primary CTA: *Read the RAG case study* (recruiters want evidence before contact), with Contact as secondary.
11. **Template-trope hero widget.** The `class AIEngineer: ... return "AI Solutions"` code window ships with hundreds of portfolio templates; senior reviewers recognize it instantly. See §1.2a for the replacement.

**P2 — Technical defects:**

12. **Animated particle/constellation canvas on every section** — continuous main-thread work, battery drain, INP risk, and the single strongest "template" tell. Remove or reduce to a static SVG texture; honor `prefers-reduced-motion` either way.
13. **Theme inconsistency** — light hero, dark everything else. Unify via CSS custom properties with a proper light/dark toggle.
14. No JSON-LD, no OG tags, single-page anchor nav only (no indexable case-study URLs), no CI/Lighthouse guard, no sitemap — as originally assumed.

**Technical objectives for the upgrade:**

| # | Objective | Success Metric |
|---|-----------|----------------|
| 1 | Core Web Vitals compliance | Lighthouse ≥ 95 (Performance, A11y, Best Practices, SEO); LCP < 2.0s, CLS < 0.05, INP < 200ms on throttled 4G |
| 2 | Entity-grade SEO | Valid `Person` + `ProfilePage` JSON-LD (0 errors in Rich Results Test); OG previews render on LinkedIn/X |
| 3 | Technical depth on-site | ≥ 3 long-form case studies (1,200–2,000 words) with architecture diagrams, indexable as standalone URLs |
| 4 | Zero-cost dynamism | Kaggle/GitHub stats refreshed automatically via scheduled GitHub Actions — no client-side API calls, no keys in the browser |
| 5 | Deployment safety | CI pipeline: HTML validation + Lighthouse CI budget check on every PR before Pages deploy |

### 1.2 UI/UX & Architecture Enhancements

#### 1.2a UI redesign directives specific to the current template

These map one-to-one to the audit in §1.1 and should be given to the coding model as explicit constraints:

- **Hero as thesis, not trope.** Replace the `class AIEngineer` code window with an artifact only *this* engineer could show: a compact, real architecture schematic of the 7-microservice RAG platform (build-time SVG — ingestion → hybrid retrieval → rerank → synthesis, with a Langfuse trace overlay), captioned with the 68%→91% precision result. Alternative: a styled "trace view" panel showing a real query's span waterfall with cost attribution — visually distinctive and instantly signals LLM observability depth. Keep the left column: name, sharpened title, 75-word summary (§2.1), one primary CTA.
- **Kill the particle canvas.** Substitute a static, near-invisible background texture (subtle radial gradient or a faint static "constellation" SVG at ~4% opacity, no animation). Budget: 0 ms of continuous main-thread work.
- **One design system.** Extract the template's ad-hoc colors into tokens: dark base + a single accent (the current blue is fine), 4–6 named values, light theme derived from the same tokens. `color-scheme: light dark`, toggle persisted to `localStorage`, `prefers-reduced-motion` disables all transitions.
- **Typography:** keep the monospace *only* as an accent (logo, metric numerals, tags) — it currently competes with body text. Body/headings on the system stack per §1.2 rule below.
- **Stats row → proof row.** Replace "1+ / 10+" counters with three real metrics tiles: `~91% retrieval precision`, `500+ concurrent users @ 99.9%`, `Top 4.5% · Kaggle`. Each tile links to the section/case study that substantiates it.
- **Experience cards:** real employers, `<article>` per role, metric-first bullets from §2.3, tag chips retained (they're good), collapsed to 3–4 visible bullets with a "more" disclosure to keep the page scannable.
- **Projects grid:** replace all six demo cards with the four real projects (§2.4) + the RAG platform as a full-width "flagship" card at the top linking to its case study. Keep the GitHub/Live-Demo link pattern; add `data-tags` for the filter system (§1.2 item 2).
- **Delete or relocate the freelance funnel:** "Available for Contract Work," "How I Work," and "Ready to Start Your AI Project?" move to `/freelance/` (noindex) or are removed. In their place: a "Writing / Case Studies" index section — this is what senior reviewers actually look for.
- **Certifications block:** real credentials only, demoted to a compact single-row strip under Education; achievements (Kaggle ranks) get promoted into the projects/proof row instead.
- **Contact:** one canonical email everywhere; form wired to Formspree/Web3Forms free tier with honeypot spam field, or replaced by `mailto:` + copy button + LinkedIn/GitHub links. Show a success/failure state — a form that proves it works is a tiny systems-engineering signal.

#### 1.2b General structural upgrades

**Stack decision (and the trade-off rationale a reviewer will respect):**

- **Plain HTML + modern CSS + vanilla JS** (or Eleventy if templating is needed — it builds in GitHub Actions for free). *Explicitly avoid* React/Next for a portfolio: zero hydration cost, zero JS framework payload, trivially perfect CWV. The portfolio's engineering signal comes from the case studies, not the frontend framework.
- **No web fonts for body text.** Use a system font stack (`ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto`) to eliminate font-loading CLS. If a display face is desired for headings only, self-host a single WOFF2 subset (~15 KB) with `font-display: swap` and `<link rel="preload">`.
- **No icon fonts.** Inline SVG only (tree-shaken, currentColor-driven for dark mode).

**Structural upgrades to implement:**

1. **Semantic document skeleton**
   ```
   <header> → nav (skip-link first)
   <main>
     <section id="hero">        — h1 (exactly one per page)
     <section id="expertise">   — h2 + definition-list matrix
     <section id="experience">  — h2 + <article> per role
     <section id="projects">    — h2 + filterable grid of <article> cards
     <section id="writing">     — h2 + case-study index
   </main>
   <footer> → contact, JSON-LD lives in <head>
   ```

2. **Filterable project grid — zero-dependency implementation**
   - Each card: `<article class="card" data-tags="rag llm aws">`.
   - Filter buttons toggle a `data-filter` attribute on the grid container; visibility handled purely in CSS:
     ```css
     .grid[data-filter="rag"] .card:not([data-tags~="rag"]) { display: none; }
     ```
     (Generate one rule per tag at build time, or ~10 lines of JS toggling a `hidden` attribute.) No Isotope.js, no jQuery — 0 KB added.
   - Persist active filter in `location.hash` so filtered views are deep-linkable (`/#projects?tag=rag`).

3. **Interactive architecture diagrams — Mermaid.js, lazy-loaded**
   - Author diagrams as fenced Mermaid blocks inside case studies.
   - **Performance rule:** Mermaid is ~900 KB. Never load it eagerly. Two compliant options:
     - *Preferred:* render Mermaid → static SVG at build time in a GitHub Action (`@mermaid-js/mermaid-cli`), commit/deploy the SVGs. Zero client JS.
     - *Fallback:* `IntersectionObserver` that injects the Mermaid ESM CDN bundle only when a diagram scrolls into view.
   - Each diagram gets a `<figcaption>` explaining the design decision it illustrates (recruiters skim captions).

4. **Dark mode** via `prefers-color-scheme` + a manual toggle persisted in `localStorage`, all colors as CSS custom properties. Set `color-scheme: light dark` on `:root` to get free correct form/scrollbar rendering.

5. **Responsive layout**: CSS Grid with `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))` for the project grid; content column `max-width: 72ch` for case studies; no breakpoint framework.

6. **Core Web Vitals hardening checklist**
   - All images: explicit `width`/`height` (CLS), `loading="lazy"` below the fold, AVIF/WebP with `<picture>` fallback (convert in a GitHub Action with `sharp`).
   - Inline critical CSS (<10 KB) in `<head>`; defer the rest.
   - `rel="preconnect"` only for origins actually used.
   - `Cache-Control` is handled by GitHub Pages; bust caches with hashed filenames from the build step.
   - Accessibility floor: visible `:focus-visible` styles, skip link, `prefers-reduced-motion` media query disabling all transitions.

### 1.3 Markdown-Based Case Study Template (Blueprint)

Each flagship project gets `/writing/<slug>/index.html` built from a Markdown source. Use this exact section contract — it is optimized for how senior engineers actually read:

```markdown
---
title: "<Outcome-first title, e.g. 'Hybrid Retrieval at 91% Precision: Engineering an Enterprise RAG Platform'>"
description: "<155-char meta description with primary keyword>"
date: YYYY-MM-DD
tags: [rag, langraph, fastapi, observability]
og_image: /assets/og/<slug>.png
---

# {title}

**TL;DR (3 bullets max):** problem → architecture → measured outcome.

## 1. Problem & Constraints
Business context, scale numbers, and the *constraints* (latency budget, cost ceiling,
compliance) — constraints are what make the design interesting.

## 2. System Architecture
Mermaid diagram (build-time SVG). One paragraph per service: responsibility,
interface, why it is a separate service (or why it isn't).

## 3. Key Design Decisions & Trade-offs   ← the section recruiters screenshot
Format each as: **Decision → Alternatives considered → Why → Cost accepted.**
(e.g., "RRF over learned fusion: no training data at launch; accepted ~2–3% precision
ceiling vs. a trained fusion model.")

## 4. Hardening for Production
Failure modes, circuit breakers, retries, checkpointing, observability. Show one
real bug story with root cause — debugging narratives are high-signal.

## 5. Results
A small table: metric | before | after | how measured.

## 6. What I'd Do Differently
2–3 honest items. Signals seniority more than any success metric.
```

**Priority case studies to write:** (1) Enterprise RAG platform (7 microservices), (2) Distributed tracing & LLM cost attribution with Langfuse, (3) YOLOv8 remote-inference deployment, (4) IndicTTS deepfake detection post-mortem.

### 1.4 Technical SEO & Meta Specifications

**JSON-LD — place in `<head>` of the homepage (exact syntax, edit URLs only):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "dateModified": "2026-07-07",
  "mainEntity": {
    "@type": "Person",
    "@id": "https://ritik9900.github.io/portfolio/#ritik-ranjan",
    "name": "Ritik Ranjan",
    "jobTitle": "GenAI / Machine Learning Engineer",
    "description": "Machine learning engineer specializing in production RAG systems, hybrid retrieval, LLM observability, and high-throughput FastAPI backends on AWS.",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Indian Institute of Technology Madras",
      "sameAs": "https://www.iitm.ac.in/"
    },
    "worksFor": { "@type": "Organization", "name": "Ascendion" },
    "knowsAbout": [
      "Retrieval-Augmented Generation", "LangGraph", "Hybrid Search",
      "Vector Databases", "FastAPI", "Distributed Tracing", "MLOps",
      "AWS ECS Fargate", "PyTorch", "Computer Vision"
    ],
    "sameAs": [
      "https://github.com/Ritik9900",
      "https://www.linkedin.com/in/ritik-ranjan9900",
      "https://www.kaggle.com/ritik9929"
    ],
    "url": "https://ritik9900.github.io/portfolio/",
    "email": "mailto:ritikranjan1212@gmail.com"
  }
}
</script>
```

**Per-case-study schema:** use `@type: "TechArticle"` with `author` referencing the Person `@id` above, plus `headline`, `datePublished`, `keywords`.

**Meta-tag template (every page):**

```html
<title>{Page-specific, ≤60 chars, keyword-front-loaded}</title>
<meta name="description" content="{≤155 chars, includes one high-intent phrase}">
<link rel="canonical" href="https://ritik9900.github.io/portfolio/{path}">
<meta property="og:type" content="website">        <!-- "article" on case studies -->
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:image" content="https://ritik9900.github.io/portfolio/assets/og/{slug}.png">
<meta property="og:url" content="{canonical}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0b0f14">
```

Generate 1200×630 OG images at build time with `satori` or a headless-Chrome GitHub Action — $0.

**High-intent programmatic keyword targets** (weave into headings/copy, never stuff):
`production RAG pipeline architecture`, `hybrid search BM25 reciprocal rank fusion`, `LangGraph multi-agent ingestion pipeline`, `LLM observability Langfuse cost tracking`, `pgvector hybrid retrieval`, `FastAPI microservices AWS Fargate`, `cross-encoder reranking precision`, `GenAI engineer Hyderabad`.

**Also ship:** `sitemap.xml` (build-time generated), `robots.txt` with sitemap pointer, and register the site in Google Search Console (free) via the HTML-file verification method.

### 1.5 Prompt-Engineered Implementation Roadmap

Paste these to the coding model sequentially. Each phase ends with a verification gate.

**Phase 0 — Safety net**
> "You are working in my GitHub Pages repo `Ritik9900/portfolio`. Create a branch `overhaul/phase-0`. Add a GitHub Actions workflow `.github/workflows/ci.yml` that on every push and PR: (1) validates HTML with `html-validate`, (2) runs Lighthouse CI (`treosh/lighthouse-ci-action`) against the built site with budgets: performance ≥ 90, accessibility ≥ 95, SEO ≥ 95, and fails the build otherwise. Do not modify any site content in this phase. Output the full workflow file and a `lighthouserc.json`."

**Phase 0.5 — Content-integrity hotfix (ship the same day; do not wait for the redesign)**
> "In `Ritik9900/portfolio`, without changing layout or styles: (1) Replace the Work Experience placeholders ('Company Name', 'Freelance/Previous Company' and their bullets) with the two real roles I provide [paste §2.3]. (2) Replace all six Featured Projects cards' titles/descriptions/tags with the real projects [paste §2.4], keeping the existing card markup. (3) Delete every certification entry except: NPTEL Cloud Computing, Stanford Supervised Machine Learning, NPTEL Data Mining, NPTEL Emotional Intelligence. (4) Replace every occurrence of `ritik.ranjan9900@gmail.com` with `ritikranjan1212@gmail.com` (verify with grep; report the count). (5) Update the About paragraphs with the summary in §2.1 and remove Unity/Vue.js claims. (6) Either wire the contact form to Formspree (I will add the endpoint ID) or convert it to a mailto link with a copy button — the Send button must not be a no-op. (7) Remove or comment out the 'Available for Contract Work', 'How I Work', and 'Ready to Start Your AI Project?' sections. Output a diff summary of every file touched."

**Phase 1 — Semantic skeleton, design tokens & template detox**
> "Refactor `index.html` into the semantic structure: single `<h1>`, landmark regions (`header/nav/main/footer`), sections `hero, expertise, experience, projects, writing, contact` with a logical h2/h3 hierarchy. Extract all colors/spacing/typography into CSS custom properties on `:root` with a `prefers-color-scheme: dark` override and `color-scheme: light dark`; unify the currently mismatched light hero / dark sections under these tokens. Remove the animated particle/constellation background entirely, replacing it with a static low-opacity SVG texture; remove its JS. Reserve the monospace font for the logo, tags, and metric numerals only; body and headings use a system font stack. Remove icon fonts and external font `<link>`s. Add a skip-link, `:focus-visible` styles, and a `prefers-reduced-motion` block disabling all transitions. Preserve Phase 0.5 content verbatim — structure and styling only."

**Phase 2 — Content injection**
> "Replace the copy in hero, experience, and projects sections with the content I provide below [paste Part 2 of this document]. Keep the Phase 1 structure intact. Every metric must appear exactly as written."

**Phase 3 — Project grid + filters**
> "Implement the filterable project grid: each project is an `<article data-tags='...'>`; filter buttons are real `<button>` elements with `aria-pressed`; filtering toggles the `hidden` attribute via ≤15 lines of vanilla JS; active filter syncs to `location.hash`. No libraries. Grid uses CSS Grid `auto-fill/minmax(320px,1fr)`. Verify keyboard operability."

**Phase 4 — Case-study pipeline**
> "Add an Eleventy (11ty) build: Markdown case studies in `/src/writing/*.md` using the front-matter contract [paste §1.3], output to `/writing/<slug>/`. Add a GitHub Action step that pre-renders Mermaid code blocks to static SVG with `@mermaid-js/mermaid-cli` during build. Update the Pages deploy workflow to `actions/deploy-pages` from the build artifact. Generate `sitemap.xml` and `robots.txt` in the build."

**Phase 5 — SEO layer**
> "Inject the JSON-LD and meta-tag templates [paste §1.4] into the base layout, parameterized per page from front matter. Add build-time OG-image generation (satori or puppeteer action) producing 1200×630 PNGs per case study. Verify with `npx structured-data-testing-tool` in CI."

**Phase 6 — Dynamic stats (see Part 3)**
> "Add the scheduled Kaggle/GitHub stats workflow from Part 3 §3.1. It must write JSON/SVG into `/assets/data/` and commit only when content changed (`git diff --quiet || git commit`)."

**Verification gate after every phase:** CI green + `npx lighthouse <preview-url>` locally + manual check that no URL that previously existed now 404s (add redirects or keep paths stable).

---
## PART 2: HIGH-IMPACT PROFESSIONAL CONTENT & SEO COPY

### 2.1 Hero Section & Professional Summary

**H1 (the one `<h1>` on the page):**

> **I build production RAG systems and the observability that keeps them honest.**

**Sub-headline:**

> GenAI/ML Engineer · IIT Madras (BS, Data Science) · Currently engineering a 7-microservice enterprise retrieval platform at Ascendion for Charter Communications.

**Professional summary (≤ 75 words, keyword-bearing, zero fluff):**

> I design and ship retrieval-augmented generation systems end to end — hybrid search (dense + BM25 + Reciprocal Rank Fusion), cross-encoder reranking, stateful LangGraph ingestion pipelines, and distributed tracing with per-query LLM cost attribution. My work runs in production on AWS (ECS Fargate, RDS, ElastiCache) behind FastAPI services serving 500+ concurrent users at 99.9% availability. I care about the trade-offs as much as the metrics.

**Hero CTAs:** `Read the RAG case study →` (primary) · `Resume (PDF)` · `GitHub` · `Kaggle`

### 2.2 Core Technical Expertise Matrix

| Domain | What I use in production | Depth signal |
|---|---|---|
| **Retrieval & GenAI** | LangGraph, hybrid search (pgvector + BM25 + RRF), cross-encoder reranking, semantic chunking, VLM image summarization, Azure OpenAI GPT-4o | 91% retrieval precision vs. 68% semantic-only baseline |
| **Backend Systems** | FastAPI microservices, PostgreSQL + pgvector, Redis/ElastiCache, REST + signed-URL security, Docker | 7-service platform; thousands of daily inference requests |
| **LLM Observability** | Langfuse distributed tracing, trace-context propagation over HTTP, decorator-based auto-instrumentation, token-level cost attribution | Unified trace graph across 4 services; 14-node pipeline instrumented without touching node code |
| **Cloud & MLOps** | AWS (EC2, ECS Fargate, RDS Multi-AZ, ALB, Spot GPU), Terraform, GitHub Actions CI/CD, Microsoft Graph & Confluence APIs | Auto-scaling 2→10 containers; 100% reproducible IaC environments |
| **Deep Learning** | PyTorch (mixed-precision, multi-GPU), ViT audio classifiers, YOLOv8, super-resolution GAN pipelines | 3× top-8% Kaggle finishes |
| **Languages & Data** | Python, SQL, Java, Bash, JavaScript; PySpark, Kafka | — |

### 2.3 Experience — Rewritten (X-Y-Z, metric-first)

#### Ascendion — GenAI/ML Engineer (Client: Charter Communications) · Dec 2025–Present

**Flagship: Enterprise RAG Platform — 7-microservice system for document ingestion, hybrid search, and conversational Q&A over enterprise knowledge bases (SharePoint, Confluence).**

- Architected a 7-microservice RAG platform (FastAPI, Angular, PostgreSQL + pgvector, Docker) spanning ingestion, retrieval, orchestration, and admin services — enabling conversational Q&A over enterprise SharePoint and Confluence corpora.
- Raised retrieval precision from ~68% to ~91% by building a LangGraph hybrid-search pipeline that fuses dense vector search and BM25 via Reciprocal Rank Fusion, then reranks with a cross-encoder before GPT-4o answer synthesis.
- Eliminated silent ingestion failures by designing a resilient, stateful LangGraph pipeline (IBM Docling parsing, VLM image summarization, semantic chunking, embedding generation) with circuit breakers, exponential-backoff retries, and resumable checkpointing — long-running jobs survive transient API and infra faults.
- Automated enterprise knowledge sync by building a scheduled batch-ingestion service over Microsoft Graph (SharePoint) and Confluence Cloud APIs that discovers and ingests new/changed source documents without manual triggers.
- Restored system-wide trace visibility and LLM cost tracking by diagnosing and fixing production bugs — broken exception handling in Python context managers and missing trace-ID propagation — that were silently disabling distributed tracing.
- Delivered per-query and per-ingestion-job cost attribution by implementing end-to-end Langfuse tracing across 4 microservices (trace context propagated via HTTP headers) and threading token-usage data through embedding and VLM calls via generation-vs-span observation typing.
- Instrumented a 14-node LangGraph pipeline with zero changes to node implementations by introducing decorator-based auto-instrumentation — full observability as a cross-cutting concern.
- Scaled multimodal ingestion to 300+ visual elements per document (charts, tables, images) with VLM-generated, deduplication-cached summaries; sustained 500+ concurrent users at 99.9% availability on auto-scaling ECS Fargate (2→10 containers).
- Improved GPU utilization by ~95% by decoupling inference: answer synthesis offloaded to an external LLM API while the VLM runs on on-demand Spot GPU instances.

#### Gmonks — AI/ML Engineer · Oct 2024–Nov 2025

- Cut client application size by 80 MB by moving YOLOv8 inference (0.339 mAP) to remote serving on AWS ECS Fargate behind a FastAPI API handling thousands of daily requests.
- Secured media delivery with ephemeral signed URLs and owned the full MLOps lifecycle from training to monitored production deployment.
- Reduced environment setup time by 95% and achieved 100% reproducible cloud environments by codifying all infrastructure in Terraform.

### 2.4 Key Projects — Rewritten

**IndicTTS Deepfake Detection — Top 4.5% (9/201), Kaggle**
Built a multilingual deepfake-speech detector achieving 0.923 ROC-AUC across 16 Indian languages by training a ViT on Mel spectrograms over 33K+ clips (~63 hrs); mixed-precision + multi-GPU training improved accuracy 12% while cutting epoch time 40%.

**Low-Light Denoising & 4× Super-Resolution — Top 6.2% (13/210), Kaggle**
Engineered a two-stage PyTorch pipeline — MRPNet denoising followed by a PixelShuffle generator for 4× upscaling — and fine-tuned PSNR-focused objectives over 70 epochs to place 13th of 210 on a low-light benchmark.

**GenAI Integration for SEEK Learning Platform — PM/Tech Lead, 7 engineers**
Led Agile delivery of a working prototype shipping three GenAI features (automated code feedback, interactive content generation, learner support) across multiple sprints.

**Sentiment Classification at Scale — Top 8% (79/977), Kaggle**
Reached 83.20% micro-F1 on 50K+ movie reviews with a leakage-safe XGBoost/Scikit-learn pipeline.

*(Card copy rule: first clause = outcome + metric; second clause = the how. Never open a bullet with a technology name.)*

---
## PART 3: ADVANCED KAGGLE & OPEN-SOURCE SHOWCASING ($0 COST)

### 3.1 Beyond the Link — Making Kaggle Work on a Static Site

**A. Auto-refreshed Kaggle stats via scheduled GitHub Actions (no client-side API calls)**

The Kaggle API is free. Store `KAGGLE_USERNAME`/`KAGGLE_KEY` as repo **Secrets**, then run nightly:

```yaml
# .github/workflows/kaggle-stats.yml
name: Refresh Kaggle stats
on:
  schedule: [{cron: "17 2 * * *"}]   # nightly; offset minute to avoid load spikes
  workflow_dispatch:
jobs:
  refresh:
    runs-on: ubuntu-latest
    permissions: {contents: write}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: {python-version: "3.12"}
      - run: pip install kaggle
      - env:
          KAGGLE_USERNAME: ${{ secrets.KAGGLE_USERNAME }}
          KAGGLE_KEY: ${{ secrets.KAGGLE_KEY }}
        run: python scripts/fetch_kaggle.py   # writes assets/data/kaggle.json + SVG badges
      - run: |
          git config user.name "stats-bot"
          git config user.email "actions@github.com"
          git add assets/data
          git diff --cached --quiet || git commit -m "chore: refresh kaggle stats" && git push
```

`fetch_kaggle.py` pulls competition standings/tier, writes a small JSON, and renders **static SVG badges** (string-templated — no image library needed). The site embeds `<img src="/assets/data/badge-indictts.svg">`. Result: "live" stats, zero runtime dependencies, zero cost, and the workflow itself is a public CI/CD artifact recruiters can read.

**B. Standalone interactive training curves — without shipping a charting library on the main page**

- Export loss/metric histories from your notebooks as small JSON files (`epoch, train_loss, val_loss, roc_auc`).
- Render them as **build-time SVG sparklines/charts** (tiny Python script with `matplotlib` → SVG, or hand-templated SVG polylines) embedded inline in case studies — 0 KB of JS.
- For genuinely interactive exploration, export **self-contained Plotly HTML** (`fig.write_html(include_plotlyjs="cdn")`) into `/labs/<experiment>.html` and link it as "Explore the training run →" — the heavy JS loads only for visitors who opt in. This keeps the main pages within the Lighthouse budget.

**C. Architectural post-mortems for top models (the highest-ROI move on this list)**

For each ranked finish, publish a case study using the §1.3 template with a Kaggle-specific §3: **"What separated top-5% from median"** — e.g., for IndicTTS: spectrogram front-end choices vs. raw-waveform models, language-imbalance handling across 16 languages, mixed-precision/multi-GPU throughput engineering, and validation-split design to avoid speaker leakage. Post-mortems convert a leaderboard number into demonstrated reasoning — exactly what distinguishes candidates in FAANG ML interviews.

**D. Reproducibility links** — pin the exact notebook version (Kaggle notebooks are permalink-able per version) and mirror the code in a public GitHub repo with a `README` that states hardware, runtime, and seed. "Reproducible" is a keyword senior reviewers actively scan for.

### 3.2 Value-Add GitHub Automations (all free)

1. **Profile README as a systems dashboard** — create the `Ritik9900/Ritik9900` repo; use `lowlighter/metrics` (free GitHub Action) to render language/commit/PR metrics as SVG nightly. Keep it to 2–3 panels; restraint reads as senior.
2. **Lighthouse CI as a public quality gate** — the Phase 0 workflow doubles as a showcase: add a "Built with a CI-enforced performance budget" footer link to the workflow file. A portfolio that *proves* its own CWV claims is a differentiator.
3. **Automated benchmarking artifact** — for any public repo with model code, add a workflow that runs a small CPU benchmark (e.g., tokens/sec of your chunker, or retrieval precision on a 100-doc fixture) on every push and writes results to the job summary (`$GITHUB_STEP_SUMMARY`). Demonstrates regression-testing discipline for ML systems.
4. **Release hygiene** — tag releases with `softprops/action-gh-release` and auto-generated changelogs; even for a portfolio, visible semver + changelog signals production habits.
5. **Free analytics without cookies** — GoatCounter (free tier, no cookie banner needed) or Cloudflare Web Analytics via a single `<script defer>`; use it to A/B check which case study recruiters actually read.
6. **Status badges, honestly used** — CI, Lighthouse score, and "last stats refresh" badges (shields.io, free) in the repo README. Skip vanity badges (visitor counters) — they read as junior.
7. **`security.txt` + `humans.txt`** — 5-minute additions under `/.well-known/` that quietly signal operational maturity.

### 3.3 Final Priority Order (if time-boxed)

0. **Phase 0.5 content-integrity hotfix — today.** Placeholder employers, template projects, unverifiable certifications, mismatched email, dead form. Every day these stay live costs more than any enhancement gains.
1. Phase 0 CI + Phase 1 semantic/CWV refactor (including particle-canvas removal) — the foundation everything else compounds on.
2. Part 2 copy injection — immediate recruiter-facing impact.
3. RAG platform case study + Langfuse observability case study — your two most senior-signal artifacts.
4. JSON-LD + OG + Search Console registration.
5. Kaggle stats automation + IndicTTS post-mortem.
6. Profile README + benchmarking workflows.

---

*Every item above runs on GitHub Pages + GitHub Actions free tier, open-source tooling, or free-tier services (Kaggle API, GoatCounter, Cloudflare Web Analytics, Google Search Console). No paid dependency exists anywhere in this plan.*
