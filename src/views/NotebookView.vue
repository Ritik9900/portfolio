<template>
  <article v-if="c" class="container page">
    <RouterLink :to="{ path: '/', hash: '#kaggle' }" class="back"><Icon name="arrow-left" :size="15" /> All competitions</RouterLink>

    <header class="head">
      <p class="eyebrow mono">Kaggle · {{ c.type }} competition<template v-if="c.period"> · {{ c.period }}</template></p>
      <h1>{{ c.title }}</h1>
      <p class="summary">{{ c.summary }}</p>
      <p class="context">On Kaggle: “{{ c.context }}”</p>

      <ul class="facts">
        <li v-if="standing(c)"><span class="v accent">{{ standing(c) }}</span><span class="l">Final standing</span></li>
        <li v-if="c.rank"><span class="v">{{ c.rank.toLocaleString() }} / {{ c.teams.toLocaleString() }}</span><span class="l">Rank / teams</span></li>
        <li v-else><span class="v">Unranked</span><span class="l">{{ c.teams.toLocaleString() }} teams</span></li>
        <li v-if="c.metric"><span class="v">{{ c.metric.value }}</span><span class="l">{{ c.metric.name }}</span></li>
        <li><span class="v">{{ c.domain }}</span><span class="l">{{ c.team ? 'Team entry' : 'Domain' }}</span></li>
      </ul>

      <div class="actions">
        <a v-if="notebookUrl" :href="notebookUrl" :download="`${c.slug}.ipynb`" class="btn btn-secondary btn-sm">
          <Icon name="download" :size="14" /> Download .ipynb
        </a>
        <a :href="c.kaggleUrl || profile.links.kaggle" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
          <Icon name="kaggle" :size="13" /> {{ c.kaggleUrl ? 'Open on Kaggle' : 'Kaggle profile' }}
        </a>
      </div>
    </header>

    <section v-if="c.approach" class="approach" aria-labelledby="approach-title">
      <h2 id="approach-title">Approach</h2>
      <ul>
        <li v-for="a in c.approach" :key="a">{{ a }}</li>
      </ul>
      <div v-if="c.stack" class="tags"><span v-for="s in c.stack" :key="s" class="tag">{{ s }}</span></div>
    </section>

    <section class="notebook" aria-labelledby="nb-title">
      <h2 id="nb-title">Notebook</h2>

      <p v-if="!notebookUrl" class="state">
        The notebook for this competition hasn't been published here yet.
        <a :href="c.kaggleUrl || profile.links.kaggle" target="_blank" rel="noopener" class="link">See my Kaggle profile <Icon name="arrow-up-right" :size="14" /></a>
      </p>
      <p v-else-if="status === 'loading'" class="state" role="status">Loading notebook…</p>
      <p v-else-if="status === 'error'" class="state err" role="alert">Couldn't load the notebook: {{ error }}</p>
      <NotebookRenderer v-else-if="parsed" :notebook="parsed" />
    </section>
  </article>
</template>

<script setup>
import { computed, ref, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '../components/Icon.vue'
import NotebookRenderer from '../components/NotebookRenderer.vue'
import { findCompetition, standing } from '../data/kaggle.js'
import { notebookPath } from '../data/notebooks.js'
import { profile } from '../data/profile.js'
import { parseNotebook } from '../lib/notebook.js'

const route = useRoute()
const c = computed(() => findCompetition(route.params.slug))
const notebookUrl = computed(() => {
  const path = c.value && notebookPath(c.value)
  return path ? `${import.meta.env.BASE_URL}${path}` : null
})

const status = ref('idle')
const error = ref('')
const parsed = shallowRef(null)

async function load() {
  parsed.value = null
  if (!notebookUrl.value) return
  status.value = 'loading'
  try {
    const res = await fetch(notebookUrl.value)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    parsed.value = parseNotebook(await res.json())
    status.value = 'ready'
  } catch (e) {
    error.value = e.message
    status.value = 'error'
  }
}

watch(notebookUrl, load, { immediate: true })
</script>

<style scoped>
.page {
  padding-top: 48px;
  padding-bottom: 80px;
  max-width: 920px;
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
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  letter-spacing: -0.03em;
  line-height: 1.15;
  text-wrap: balance;
}

.summary {
  margin-top: 14px;
  color: var(--text-2);
  font-size: 1.0625rem;
  max-width: 64ch;
}

.facts {
  list-style: none;
  padding: 0;
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 40px;
}

.context {
  margin-top: 6px;
  font-size: 0.8125rem;
  color: var(--text-3);
}

.facts li {
  display: flex;
  flex-direction: column;
}

.v {
  font-size: 1.375rem;
  font-weight: 640;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.v.accent {
  color: var(--accent);
}

.l {
  font-size: 0.8125rem;
  color: var(--text-3);
}

.actions {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

h2 {
  font-size: 1.25rem;
  margin-bottom: 14px;
}

.approach {
  margin-top: 48px;
  padding-top: 40px;
  border-top: 1px solid var(--border);
}

.approach ul {
  padding-left: 1.1em;
  color: var(--text-2);
  margin-bottom: 18px;
}

.approach li + li {
  margin-top: 6px;
}

.notebook {
  margin-top: 48px;
  padding-top: 40px;
  border-top: 1px solid var(--border);
}

.state {
  color: var(--text-2);
  padding: 20px;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius);
}

.state.err {
  color: #b42318;
}
</style>
