# Portfolio — Ritik Ranjan

Personal site at <https://ritik9900.github.io/portfolio/>. Vue 3 + Vite, deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173/portfolio/
npm run build    # production build in dist/
npm run preview  # serve the production build
```

Requires Node 20+.

## Where things live

| To change… | Edit |
|---|---|
| Name, headline, links, email, metrics, experience, skills, education, certifications | `src/data/profile.js` |
| Kaggle competitions and their notebooks | `src/data/kaggle.js` + `public/notebooks/` |
| System design case studies (text, tables, decisions) | `src/data/caseStudies.js` |
| Architecture diagrams | `src/components/diagrams/*.vue` |
| Colours, typography, light/dark tokens | `src/style.css` |
| Resume PDF | `public/documents/Ritik_Ranjan.pdf` (path set in `profile.js`) |
| Photos | `public/images/` |

Pages:

- `/` — home
- `/projects/<slug>` — case study (one per entry in `caseStudies.js`)
- `/kaggle/<slug>` — competition write-up and in-page notebook viewer

## Publishing a Kaggle notebook

1. On Kaggle, open the notebook → **File → Download notebook** (`.ipynb`).
2. Put it in `public/notebooks/`, named `<slug>.ipynb` where `<slug>` is the competition's `slug` in
   `src/data/kaggle.js` — or keep Kaggle's filename and set `notebook: '<filename>.ipynb'` on that entry.

That's all: the notebook list is generated from the folder at build time (and live in `npm run dev`, which also
warns in the browser console about notebooks that don't match any competition). The page at `/kaggle/<slug>`
then renders Markdown, syntax-highlighted code, text/HTML/DataFrame outputs, images and tracebacks, with
show/hide toggles and a download button. All HTML output is sanitised with DOMPurify.

Before publishing, run the notebook top to bottom so outputs are saved, and check it for API keys, Kaggle
credentials or local file paths — the `.ipynb` file is served publicly. For course competitions (e.g. IIT
Madras DLP), check the course's policy on sharing solutions first.

## Adding a case study

Add an object to `caseStudies` in `src/data/caseStudies.js`. Each section is a list of blocks:

- `{ type: 'md', text }` — Markdown, including tables
- `{ type: 'diagram', name, caption }` — a component registered in `src/components/diagrams/index.js`
- `{ type: 'image', src, alt, caption }` — an exported diagram (PNG/SVG) placed in `public/`
- `{ type: 'decisions', items: [{ title, alternatives, why, cost }] }`
- `{ type: 'callout', text }`

The route page and the static deep-link copy for GitHub Pages are generated automatically.

## Deep links on GitHub Pages

GitHub Pages has no SPA rewrites. `scripts/postbuild.mjs` copies `index.html` to every case-study and Kaggle
route, plus `404.html`, so shared links load directly.
