import files from 'virtual:notebooks'
import { competitions } from './kaggle.js'

// A competition's notebook is public/notebooks/<slug>.ipynb, or the filename set in `notebook`.
export function notebookPath(c) {
  const name = c.notebook || `${c.slug}.ipynb`
  return files.includes(name) ? `notebooks/${name}` : null
}

if (import.meta.env.DEV) {
  const claimed = new Set(competitions.map((c) => c.notebook || `${c.slug}.ipynb`))
  const orphans = files.filter((f) => !claimed.has(f))
  if (orphans.length) {
    console.warn(
      `[notebooks] Not linked to any competition: ${orphans.join(', ')}. ` +
        'Rename to <slug>.ipynb or set `notebook` in src/data/kaggle.js.'
    )
  }
}
