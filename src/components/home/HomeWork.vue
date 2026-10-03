<template>
  <section id="work" class="section" aria-labelledby="work-title">
    <div class="container section-grid">
      <h2 id="work-title" class="section-label">Projects</h2>
      <div>
        <p class="section-intro">
          Projects I designed and built at Ascendion, written up as design reviews: the architecture, the
          decisions and what they cost, how each one fails, and what I would change.
        </p>

        <div class="cards">
          <article v-for="cs in caseStudies" :key="cs.slug" class="card">
            <RouterLink :to="`/projects/${cs.slug}`" class="preview" tabindex="-1" aria-hidden="true">
              <component :is="diagrams[cs.preview]" />
            </RouterLink>
            <div class="body">
              <p class="eyebrow mono">{{ cs.org }} project · {{ cs.period }}</p>
              <h3><RouterLink :to="`/projects/${cs.slug}`">{{ cs.title }}</RouterLink></h3>
              <p class="tagline">{{ cs.tagline }}</p>
              <dl class="facts">
                <div v-for="f in cs.facts" :key="f.label">
                  <dt>{{ f.value }}</dt>
                  <dd>{{ f.label }}</dd>
                </div>
              </dl>
              <RouterLink :to="`/projects/${cs.slug}`" class="link">
                Read the full write-up <Icon name="arrow-right" :size="15" />
              </RouterLink>
            </div>
          </article>
        </div>

        <h3 class="sub">Other projects</h3>
        <ul class="others">
          <li v-for="p in otherProjects" :key="p.title">
            <p class="other-title">{{ p.title }}</p>
            <p class="other-role mono">{{ p.role }}</p>
            <p class="other-summary">{{ p.summary }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import Icon from '../Icon.vue'
import { caseStudies } from '../../data/caseStudies.js'
import { otherProjects } from '../../data/profile.js'
import { diagrams } from '../diagrams/index.js'
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
}

.card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  overflow: hidden;
  transition: border-color 0.15s ease;
}

.card:hover {
  border-color: var(--border-strong);
}

.preview {
  display: block;
  padding: 20px 20px 12px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

.preview :deep(svg) {
  width: 100%;
  height: auto;
}

.body {
  padding: 24px;
}

.eyebrow {
  font-size: 0.75rem;
  color: var(--text-3);
  margin-bottom: 6px;
}

h3 {
  font-size: 1.25rem;
}

h3 a:hover {
  color: var(--accent);
}

.tagline {
  margin-top: 8px;
  color: var(--text-2);
  max-width: 64ch;
}

.facts {
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.facts dt {
  font-size: 1.125rem;
  font-weight: 620;
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
}

.facts dd {
  font-size: 0.8125rem;
  color: var(--text-3);
  line-height: 1.4;
  margin-top: 2px;
}

.sub {
  margin: 48px 0 8px;
  font-size: 1rem;
}

.others {
  list-style: none;
  padding: 0;
}

.others li {
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}

.others li:last-child {
  border-bottom: 0;
}

.other-title {
  font-weight: 600;
}

.other-role {
  font-size: 0.75rem;
  color: var(--text-3);
  margin: 2px 0 6px;
}

.other-summary {
  color: var(--text-2);
  font-size: 0.9375rem;
}

@media (max-width: 760px) {
  .facts {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .preview {
    padding: 12px;
  }

  .body {
    padding: 20px;
  }
}
</style>
