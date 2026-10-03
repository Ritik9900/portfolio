<template>
  <article v-if="cs" class="case">
    <header class="container head">
      <RouterLink :to="{ path: '/', hash: '#work' }" class="back"><Icon name="arrow-left" :size="15" /> All projects</RouterLink>
      <p class="eyebrow mono">{{ cs.org }} project · {{ cs.period }}</p>
      <h1>{{ cs.title }}</h1>
      <p class="subtitle">{{ cs.subtitle }}</p>

      <dl class="meta">
        <div>
          <dt>Role</dt>
          <dd>{{ cs.role }} · {{ cs.org }}</dd>
        </div>
        <div class="meta-stack">
          <dt>Stack</dt>
          <dd class="tags"><span v-for="s in cs.stack" :key="s" class="tag">{{ s }}</span></dd>
        </div>
      </dl>

      <ul class="facts">
        <li v-for="f in cs.facts" :key="f.label">
          <span class="fact-value">{{ f.value }}</span>
          <span class="fact-label">{{ f.label }}</span>
        </li>
      </ul>
    </header>

    <div class="container layout">
      <aside class="toc" aria-label="On this page">
        <p class="toc-title mono">On this page</p>
        <ol>
          <li v-for="s in cs.sections" :key="s.id">
            <a :href="`#${s.id}`" :class="{ active: active === s.id }" @click.prevent="go(s.id)">{{ s.title }}</a>
          </li>
        </ol>
      </aside>

      <div class="content">
        <section class="tldr" aria-label="Summary">
          <p class="tldr-title mono">TL;DR</p>
          <ul>
            <li v-for="(t, i) in cs.tldr" :key="i" v-html="inline(t)"></li>
          </ul>
        </section>

        <section v-for="s in cs.sections" :id="s.id" :key="s.id" class="cs-section" :data-section="s.id">
          <h2>{{ s.title }}</h2>
          <template v-for="(b, i) in s.blocks" :key="i">
            <div v-if="b.type === 'md'" class="prose" v-html="md(b.text)"></div>

            <div v-else-if="b.type === 'callout'" class="callout prose" v-html="md(b.text)"></div>

            <figure v-else-if="b.type === 'diagram' || b.type === 'image'" class="figure">
              <div class="figure-frame">
                <component :is="diagrams[b.name]" v-if="b.type === 'diagram'" />
                <img v-else :src="asset(b.src)" :alt="b.alt" loading="lazy" />
              </div>
              <figcaption v-if="b.caption">{{ b.caption }}</figcaption>
            </figure>

            <div v-else-if="b.type === 'decisions'" class="decisions">
              <article v-for="d in b.items" :key="d.title" class="decision">
                <h3>{{ d.title }}</h3>
                <p class="alts"><span class="k mono">Considered</span> {{ d.alternatives }}</p>
                <div class="dgrid">
                  <div>
                    <p class="k mono">Why</p>
                    <p>{{ d.why }}</p>
                  </div>
                  <div>
                    <p class="k mono">Cost accepted</p>
                    <p>{{ d.cost }}</p>
                  </div>
                </div>
              </article>
            </div>
          </template>
        </section>

        <nav class="next" aria-label="More projects">
          <RouterLink v-for="o in others" :key="o.slug" :to="`/projects/${o.slug}`" class="next-card">
            <span class="k mono">Next project</span>
            <span class="next-title">{{ o.title }} <Icon name="arrow-right" :size="16" /></span>
          </RouterLink>
          <RouterLink :to="{ path: '/', hash: '#kaggle' }" class="next-card">
            <span class="k mono">Also</span>
            <span class="next-title">Kaggle notebooks <Icon name="arrow-right" :size="16" /></span>
          </RouterLink>
        </nav>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '../components/Icon.vue'
import { diagrams } from '../components/diagrams/index.js'
import { caseStudies, findCaseStudy } from '../data/caseStudies.js'
import { renderMarkdown } from '../lib/markdown.js'

const route = useRoute()
const cs = computed(() => findCaseStudy(route.params.slug))
const others = computed(() => caseStudies.filter((c) => c.slug !== route.params.slug))

const cache = new Map()
function md(text) {
  if (!cache.has(text)) cache.set(text, renderMarkdown(text))
  return cache.get(text)
}
// TL;DR lines are single paragraphs; strip the wrapping <p>.
const inline = (t) => md(t).replace(/^<p>|<\/p>\s*$/g, '')
const asset = (src) => (/^https?:/.test(src) ? src : `${import.meta.env.BASE_URL}${src}`)

// Scroll-spy for the table of contents.
const active = ref('')
let observer

function observe() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible.length) active.value = visible[0].target.dataset.section
    },
    { rootMargin: '-80px 0px -65% 0px' }
  )
  document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el))
}

function go(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  history.replaceState(history.state, '', `#${id}`)
  active.value = id
}

onMounted(observe)
watch(() => route.params.slug, () => nextTick(observe))
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.head {
  padding-top: 48px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--border);
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: var(--text-3);
  margin-bottom: 32px;
}

.back:hover {
  color: var(--text);
}

.eyebrow {
  font-size: 0.75rem;
  color: var(--accent);
  margin-bottom: 10px;
}

h1 {
  font-size: clamp(2rem, 4.4vw, 3rem);
  letter-spacing: -0.03em;
  line-height: 1.1;
  font-weight: 650;
  max-width: 22ch;
  text-wrap: balance;
}

.subtitle {
  margin-top: 16px;
  font-size: 1.125rem;
  color: var(--text-2);
  max-width: 64ch;
}

.meta {
  margin-top: 28px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 12px 48px;
}

.meta dt,
.k {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-3);
  margin-bottom: 6px;
}

.meta dd {
  font-size: 0.9375rem;
}

.facts {
  list-style: none;
  padding: 0;
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.facts li {
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.facts li + li {
  border-left: 1px solid var(--border);
}

.fact-value {
  font-size: 1.375rem;
  font-weight: 640;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.fact-label {
  font-size: 0.8125rem;
  color: var(--text-3);
  line-height: 1.4;
}

/* Body layout: sticky TOC + reading column */
.layout {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 56px;
  padding-top: 48px;
  padding-bottom: 80px;
}

.toc {
  position: sticky;
  top: calc(var(--header-h) + 24px);
  align-self: start;
  max-height: calc(100vh - var(--header-h) - 48px);
  overflow-y: auto;
}

.toc-title {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-3);
  margin-bottom: 10px;
}

.toc ol {
  list-style: none;
  padding: 0;
  border-left: 1px solid var(--border);
}

.toc a {
  display: block;
  padding: 5px 0 5px 14px;
  margin-left: -1px;
  border-left: 1px solid transparent;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--text-3);
}

.toc a:hover {
  color: var(--text);
}

.toc a.active {
  color: var(--text);
  border-left-color: var(--accent);
  font-weight: 550;
}

.content {
  width: 100%;
  max-width: var(--reading);
  min-width: 0;
}

.tldr {
  padding: 20px 24px;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border);
}

.tldr-title {
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  color: var(--accent);
  margin-bottom: 8px;
}

.tldr ul {
  padding-left: 1.1em;
  color: var(--text-2);
}

.tldr li + li {
  margin-top: 8px;
}

.tldr :deep(strong) {
  color: var(--text);
  font-weight: 620;
}

.cs-section {
  margin-top: 64px;
  scroll-margin-top: calc(var(--header-h) + 24px);
}

.cs-section h2 {
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}

.cs-section > * + * {
  margin-top: 24px;
}

.callout {
  padding: 16px 20px;
  border-left: 3px solid var(--accent);
  background: var(--accent-soft);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: var(--text);
}

/* Figures break out slightly wider than the reading column */
.figure {
  margin-left: 0;
  margin-right: 0;
}

.figure-frame {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 20px;
  overflow-x: auto;
}

.figure-frame :deep(svg),
.figure-frame img {
  min-width: 680px;
  width: 100%;
  height: auto;
  margin: 0 auto;
}

figcaption {
  margin-top: 10px;
  font-size: 0.8125rem;
  color: var(--text-3);
  line-height: 1.5;
}

.decisions {
  display: grid;
  gap: 16px;
}

.decision {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 20px 22px;
}

.decision h3 {
  font-size: 1.0625rem;
}

.alts {
  margin-top: 6px;
  font-size: 0.875rem;
  color: var(--text-2);
}

.alts .k {
  margin-right: 6px;
}

.dgrid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  font-size: 0.9375rem;
  color: var(--text-2);
  line-height: 1.65;
}

.next {
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.next-card {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 18px 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  transition: border-color 0.15s ease;
}

.next-card:hover {
  border-color: var(--text-3);
}

.next-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
}

@media (max-width: 1000px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }

  .toc {
    display: none;
  }

  .content {
    margin: 0 auto;
  }
}

@media (max-width: 760px) {
  .facts {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .facts li:nth-child(3) {
    border-left: 0;
  }

  .facts li:nth-child(n + 3) {
    border-top: 1px solid var(--border);
  }

  .meta {
    grid-template-columns: 1fr;
  }

  .dgrid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .figure-frame {
    padding: 12px;
  }
}
</style>
