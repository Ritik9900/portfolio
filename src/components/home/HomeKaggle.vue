<template>
  <section id="kaggle" class="section" aria-labelledby="kaggle-title">
    <div class="container section-grid">
      <h2 id="kaggle-title" class="section-label">Kaggle</h2>
      <div>
        <p class="section-intro">
          {{ num(all.length, true) }} competitions across computer vision, NLP, audio and tabular data —
          {{ num(topTen) }} in the top 10%, best {{ best.rank }} of {{ best.teams.toLocaleString() }}. Each opens
          the full notebook, rendered in-page with code, outputs and plots.
        </p>

        <ol class="list">
          <li v-for="c in all" :key="c.slug" class="row">
            <div class="rank">
              <span v-if="standing(c)" class="pct">{{ standing(c) }}</span>
              <span v-else-if="!c.rank" class="pct muted">Unranked</span>
              <span class="pos mono">{{ c.rank ? `${c.rank.toLocaleString()} / ${c.teams.toLocaleString()}` : `${c.teams.toLocaleString()} teams` }}</span>
            </div>
            <div class="body">
              <h3><RouterLink :to="`/kaggle/${c.slug}`">{{ c.title }}</RouterLink></h3>
              <p class="meta">
                <span>{{ c.domain }}</span>
                <span>{{ c.type }}</span>
                <span v-if="c.team">Team</span>
                <span v-if="c.metric">{{ c.metric.name }} {{ c.metric.value }}</span>
              </p>
              <p class="summary">{{ c.summary }}</p>
            </div>
            <RouterLink :to="`/kaggle/${c.slug}`" class="open" :aria-label="`Open ${c.title}`">
              <span v-if="notebookPath(c)" class="nb mono"><Icon name="code" :size="13" /> Notebook</span>
              <Icon name="arrow-right" :size="16" />
            </RouterLink>
          </li>
        </ol>

      </div>
    </div>
  </section>
</template>

<script setup>
import Icon from '../Icon.vue'
import { ranked, standing, topTenCount } from '../../data/kaggle.js'
import { notebookPath } from '../../data/notebooks.js'

const all = ranked()
const best = all[0]
const topTen = topTenCount()
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']
const num = (n, capital = false) => {
  const w = WORDS[n] ?? String(n)
  return capital ? w[0].toUpperCase() + w.slice(1) : w
}
</script>

<style scoped>
.list {
  list-style: none;
  padding: 0;
  border-top: 1px solid var(--border);
}

.row {
  position: relative;
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr) auto;
  gap: 20px;
  align-items: start;
  padding: 18px 0;
  border-bottom: 1px solid var(--border);
}

.rank {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pct {
  font-size: 1.0625rem;
  font-weight: 640;
  letter-spacing: -0.01em;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}

.pct.muted {
  color: var(--text-3);
  font-weight: 550;
}

.pos {
  font-size: 0.75rem;
  color: var(--text-3);
}

h3 {
  font-size: 1rem;
}

/* Whole row is clickable through the title link */
h3 a::after {
  content: '';
  position: absolute;
  inset: 0;
}

.row:hover h3 a {
  color: var(--accent);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0 10px;
  font-size: 0.8125rem;
  color: var(--text-3);
  margin-top: 2px;
}

.meta span + span::before {
  content: '·';
  margin-right: 10px;
}

.summary {
  margin-top: 6px;
  color: var(--text-2);
  font-size: 0.9375rem;
  max-width: 64ch;
}

.open {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-3);
  padding-top: 2px;
}

.row:hover .open {
  color: var(--accent);
}

.nb {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.6875rem;
  padding: 2px 7px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface-2);
  color: var(--text-2);
}


@media (max-width: 560px) {
  .row {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 6px 12px;
  }

  .rank {
    grid-column: 1 / -1;
    flex-direction: row;
    align-items: baseline;
    gap: 10px;
  }
}
</style>
