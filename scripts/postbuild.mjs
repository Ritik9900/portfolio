// GitHub Pages has no SPA rewrites. Copy the built index.html to every known route so
// deep links (e.g. /projects/multimodal-rag-pipeline) load with HTTP 200, and to 404.html
// so unknown paths still boot the app and show its not-found page.
import { copyFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { caseStudies } from '../src/data/caseStudies.js'
import { competitions } from '../src/data/kaggle.js'

const dist = 'dist'
const index = join(dist, 'index.html')

const routes = [
  ...caseStudies.map((c) => `projects/${c.slug}`),
  ...competitions.map((c) => `kaggle/${c.slug}`)
]

for (const r of routes) {
  mkdirSync(join(dist, r), { recursive: true })
  copyFileSync(index, join(dist, r, 'index.html'))
}
copyFileSync(index, join(dist, '404.html'))

console.log(`postbuild: wrote ${routes.length} route pages + 404.html`)
