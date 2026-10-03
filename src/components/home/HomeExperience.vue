<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <div class="container section-grid">
      <h2 id="experience-title" class="section-label">Experience</h2>
      <div class="jobs">
        <article v-for="job in experience" :key="job.company" class="job">
          <header class="head">
            <div>
              <h3>{{ job.role }}</h3>
              <p class="org">{{ job.company }} <span class="sep">·</span> {{ job.location }}</p>
            </div>
            <p class="period mono">{{ job.period }}</p>
          </header>

          <div v-for="p in job.projects" :key="p.name" class="project">
            <div class="project-head">
              <h4>{{ p.name }}</h4>
              <RouterLink v-if="p.caseStudy" :to="`/projects/${p.caseStudy}`" class="link">
                Write-up <Icon name="arrow-right" :size="14" />
              </RouterLink>
            </div>
            <ul class="points">
              <li v-for="h in p.highlights" :key="h">{{ h }}</li>
            </ul>
          </div>

          <ul v-if="job.highlights" class="points">
            <li v-for="h in job.highlights" :key="h">{{ h }}</li>
          </ul>

          <div class="tags">
            <span v-for="s in job.stack" :key="s" class="tag">{{ s }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import Icon from '../Icon.vue'
import { experience } from '../../data/profile.js'
</script>

<style scoped>
.job + .job {
  margin-top: 48px;
  padding-top: 48px;
  border-top: 1px solid var(--border);
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
}

h3 {
  font-size: 1.125rem;
}

.org {
  color: var(--text-2);
}

.sep {
  color: var(--text-3);
}

.period {
  font-size: 0.8125rem;
  color: var(--text-3);
  white-space: nowrap;
}

.project {
  margin-top: 22px;
  padding-left: 16px;
  border-left: 2px solid var(--border);
}

.project-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

h4 {
  font-size: 0.9375rem;
  font-weight: 620;
}

.project-head .link {
  font-size: 0.875rem;
  white-space: nowrap;
}

.points {
  margin-top: 10px;
  padding-left: 1.1em;
  color: var(--text-2);
  max-width: 72ch;
}

.points li + li {
  margin-top: 8px;
}

.points li::marker {
  color: var(--text-3);
}

.tags {
  margin-top: 20px;
}

@media (max-width: 640px) {
  .head {
    flex-direction: column;
    gap: 2px;
  }

  .project {
    padding-left: 12px;
  }
}
</style>
