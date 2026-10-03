<template>
  <div class="nb" @error.capture="hideBroken">
    <div class="nb-toolbar">
      <span class="mono count">{{ codeCount }} code {{ codeCount === 1 ? 'cell' : 'cells' }} · {{ notebook.language }}</span>
      <div class="toggles">
        <button type="button" class="btn btn-secondary btn-sm" :aria-pressed="!showCode" @click="showCode = !showCode">
          {{ showCode ? 'Hide code' : 'Show code' }}
        </button>
        <button type="button" class="btn btn-secondary btn-sm" :aria-pressed="!showOutputs" @click="showOutputs = !showOutputs">
          {{ showOutputs ? 'Hide outputs' : 'Show outputs' }}
        </button>
      </div>
    </div>

    <template v-for="cell in notebook.cells" :key="cell.id">
      <div v-if="cell.type === 'markdown'" class="nb-md prose" v-html="cell.html"></div>

      <div v-else-if="cell.type === 'code' && cell.boilerplate && !expanded[`bp-${cell.id}`]" class="nb-boiler">
        <span class="mono">[{{ cell.count ?? ' ' }}]</span>
        Kaggle starter cell — lists the competition's input files
        <button type="button" class="expand" @click="expanded[`bp-${cell.id}`] = true">Show</button>
      </div>

      <div v-else-if="cell.type === 'code'" class="nb-cell">
        <div v-if="showCode && cell.source.trim()" class="nb-in">
          <span class="prompt mono" aria-hidden="true">[{{ cell.count ?? ' ' }}]</span>
          <div class="code-wrap">
            <pre class="hljs"><code v-html="cell.html"></code></pre>
            <button type="button" class="copy" :aria-label="`Copy cell ${cell.count ?? ''}`" @click="copy(cell)">
              <Icon :name="copied === cell.id ? 'check' : 'copy'" :size="14" />
            </button>
          </div>
        </div>

        <div v-if="showOutputs && cell.outputs.length" class="nb-out">
          <template v-for="(o, j) in cell.outputs" :key="j">
            <img v-if="o.kind === 'image'" :src="o.src" alt="Notebook output figure" class="out-img" loading="lazy" />
            <div v-else-if="o.kind === 'html'" class="out-html" v-html="o.html"></div>
            <div v-else class="out-text-wrap">
              <pre :class="['out-text', { err: o.kind === 'error' || o.stderr, clamped: isLong(o) && !expanded[`${cell.id}-${j}`] }]">{{ o.text }}</pre>
              <button v-if="isLong(o)" type="button" class="expand" @click="expanded[`${cell.id}-${j}`] = !expanded[`${cell.id}-${j}`]">
                {{ expanded[`${cell.id}-${j}`] ? 'Collapse output' : `Show all ${lines(o)} lines` }}
              </button>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import Icon from './Icon.vue'
import 'highlight.js/styles/github.css'

const props = defineProps({ notebook: { type: Object, required: true } })

const showCode = ref(true)
const showOutputs = ref(true)
const expanded = reactive({})
const copied = ref(null)

// Markdown cells sometimes link external images (logos) that no longer load; hide them instead
// of showing a broken-image icon. `error` doesn't bubble, hence the capture listener.
function hideBroken(e) {
  if (e.target?.tagName === 'IMG') e.target.style.display = 'none'
}

const codeCount = computed(() => props.notebook.cells.filter((c) => c.type === 'code').length)

const MAX_LINES = 30
const lines = (o) => o.text.split('\n').length
const isLong = (o) => lines(o) > MAX_LINES

async function copy(cell) {
  try {
    await navigator.clipboard.writeText(cell.source)
    copied.value = cell.id
    setTimeout(() => copied.value === cell.id && (copied.value = null), 1800)
  } catch {
    // Clipboard unavailable (insecure context); the code is still selectable.
  }
}
</script>

<style scoped>
.nb-toolbar {
  position: sticky;
  top: var(--header-h);
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  margin-bottom: 8px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

.count {
  font-size: 0.75rem;
  color: var(--text-3);
}

.toggles {
  display: flex;
  gap: 8px;
}

.nb-md {
  margin: 28px 0 12px;
  font-size: 1rem;
}

.nb-md :deep(h1) {
  font-size: 1.5rem;
}

.nb-md :deep(h2) {
  font-size: 1.25rem;
}

.nb-md :deep(h1),
.nb-md :deep(h2),
.nb-md :deep(h3) {
  margin-top: 1.4em;
  color: var(--text);
}

.nb-cell {
  margin: 14px 0;
}

.nb-boiler {
  margin: 14px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  font-size: 0.8125rem;
  color: var(--text-3);
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-sm);
}

.nb-boiler .expand {
  margin: 0 0 0 auto;
}

.nb-in {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 8px;
}

.prompt {
  font-size: 0.75rem;
  color: var(--text-3);
  text-align: right;
  padding-top: 13px;
}

.code-wrap {
  position: relative;
  min-width: 0;
}

pre.hljs {
  margin: 0;
  padding: 12px 44px 12px 14px;
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  overflow-x: auto;
  font-size: 0.8125rem;
  line-height: 1.6;
}

.copy {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 5px;
  color: var(--text-3);
  opacity: 0;
  transition: opacity 0.15s ease;
}

.code-wrap:hover .copy,
.copy:focus-visible {
  opacity: 1;
}

.copy:hover {
  color: var(--text);
  background: var(--surface);
}

.nb-out {
  margin: 6px 0 0 52px;
  min-width: 0;
  display: grid;
  gap: 8px;
}

.out-img {
  max-width: 100%;
  height: auto;
  background: #fff;
  border-radius: 4px;
}

.out-html {
  overflow-x: auto;
  font-size: 0.8125rem;
}

/* pandas DataFrame tables */
.out-html :deep(table) {
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}

.out-html :deep(th),
.out-html :deep(td) {
  padding: 4px 10px;
  border-bottom: 1px solid var(--border);
  text-align: right;
  white-space: nowrap;
}

.out-html :deep(thead th) {
  border-bottom-color: var(--border-strong);
  font-weight: 600;
}

.out-text {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.55;
  color: var(--text-2);
  white-space: pre-wrap;
  word-break: break-word;
}

.out-text.clamped {
  max-height: calc(30 * 1.55em);
  overflow: hidden;
  mask-image: linear-gradient(to bottom, #000 80%, transparent);
}

.out-text.err {
  color: #b42318;
  background: color-mix(in srgb, #b42318 6%, transparent);
  padding: 8px 10px;
  border-radius: 4px;
}

:root[data-theme='dark'] .out-text.err {
  color: #f59e9e;
}

.expand {
  margin-top: 4px;
  font-size: 0.8125rem;
  font-weight: 550;
  color: var(--accent);
}

/* highlight.js theme follows the site theme */
:root[data-theme='dark'] .nb :deep(.hljs) {
  color: #d4d4d4;
}
:root[data-theme='dark'] .nb :deep(.hljs-keyword),
:root[data-theme='dark'] .nb :deep(.hljs-built_in) {
  color: #ff8f8a;
}
:root[data-theme='dark'] .nb :deep(.hljs-string) {
  color: #a5d6ff;
}
:root[data-theme='dark'] .nb :deep(.hljs-number),
:root[data-theme='dark'] .nb :deep(.hljs-literal) {
  color: #79c0ff;
}
:root[data-theme='dark'] .nb :deep(.hljs-comment) {
  color: #8b949e;
}
:root[data-theme='dark'] .nb :deep(.hljs-title),
:root[data-theme='dark'] .nb :deep(.hljs-title.function_) {
  color: #d2a8ff;
}
.nb :deep(.hljs) {
  background: transparent;
}

@media (max-width: 640px) {
  .nb-in {
    grid-template-columns: 1fr;
  }

  .prompt {
    display: none;
  }

  .nb-out {
    margin-left: 0;
  }

  .nb-toolbar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
