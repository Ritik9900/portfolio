import { Marked } from 'marked'
import DOMPurify from 'dompurify'

const md = new Marked({ gfm: true, breaks: false })

// Notebook HTML outputs and Markdown can contain arbitrary markup; everything rendered
// with v-html goes through DOMPurify first.
export function sanitize(html) {
  return DOMPurify.sanitize(html, { ADD_ATTR: ['target'] })
}

export function renderMarkdown(text) {
  return sanitize(md.parse(text || ''))
}
