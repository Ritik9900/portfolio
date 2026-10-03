import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/python'
import { renderMarkdown, sanitize } from './markdown.js'

hljs.registerLanguage('python', python)

const join = (src) => (Array.isArray(src) ? src.join('') : src || '')

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Tracebacks and some library logs contain ANSI colour codes; strip them for display.
const stripAnsi = (s) => s.replace(/\u001b\[[0-9;]*[A-Za-z]/g, '')

function highlight(code) {
  try {
    return hljs.highlight(code, { language: 'python', ignoreIllegals: true }).value
  } catch {
    return escapeHtml(code)
  }
}

// Inline cell attachments (pasted images) referenced as `attachment:name`.
function inlineAttachments(text, attachments) {
  if (!attachments) return text
  return text.replace(/attachment:([^\s)"']+)/g, (m, name) => {
    const a = attachments[name]
    if (!a) return m
    const mime = Object.keys(a)[0]
    return `data:${mime};base64,${join(a[mime]).replace(/\s/g, '')}`
  })
}

// Pick the richest renderable representation of a display/execute output.
function renderData(data) {
  if (data['image/png']) return { kind: 'image', src: `data:image/png;base64,${join(data['image/png']).replace(/\s/g, '')}` }
  if (data['image/jpeg']) return { kind: 'image', src: `data:image/jpeg;base64,${join(data['image/jpeg']).replace(/\s/g, '')}` }
  if (data['image/svg+xml']) return { kind: 'html', html: sanitize(join(data['image/svg+xml'])) }
  if (data['text/html']) return { kind: 'html', html: sanitize(join(data['text/html'])) }
  if (data['text/markdown']) return { kind: 'html', html: renderMarkdown(join(data['text/markdown'])) }
  if (data['text/plain']) return { kind: 'text', text: stripAnsi(join(data['text/plain'])) }
  return null
}

function renderOutput(o) {
  switch (o.output_type) {
    case 'stream':
      return { kind: 'text', text: stripAnsi(join(o.text)), stderr: o.name === 'stderr' }
    case 'execute_result':
    case 'display_data':
      return renderData(o.data || {})
    case 'error':
      return { kind: 'error', text: stripAnsi((o.traceback || [`${o.ename}: ${o.evalue}`]).join('\n')) }
    default:
      return null
  }
}

/**
 * Parse an nbformat 4 notebook into render-ready cells.
 * Long stream outputs (training logs) are truncated with a flag so the UI can expand them.
 */
export function parseNotebook(nb) {
  if (!nb || !Array.isArray(nb.cells)) throw new Error('Not a Jupyter notebook (expected nbformat 4).')
  const language = nb.metadata?.kernelspec?.language || nb.metadata?.language_info?.name || 'python'

  const cells = nb.cells.map((c, i) => {
    const source = join(c.source)
    if (c.cell_type === 'markdown') {
      return { id: i, type: 'markdown', html: renderMarkdown(inlineAttachments(source, c.attachments)) }
    }
    if (c.cell_type === 'code') {
      return {
        id: i,
        type: 'code',
        // Kaggle's default first cell just lists every input file; collapse it by default.
        boilerplate: source.includes('kaggle/python Docker image'),
        count: c.execution_count,
        source,
        html: highlight(source),
        outputs: (c.outputs || []).map(renderOutput).filter(Boolean)
      }
    }
    return { id: i, type: 'raw', source }
  })

  return { language, cells: cells.filter((c) => c.type !== 'code' || c.source.trim() || c.outputs.length) }
}
