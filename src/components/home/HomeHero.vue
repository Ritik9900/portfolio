<template>
  <section class="hero" aria-labelledby="hero-name">
    <div class="container">
      <div class="identity">
        <img :src="avatar" alt="" width="64" height="64" class="avatar" />
        <div>
          <h1 id="hero-name">{{ profile.name }}</h1>
          <p class="meta">{{ profile.role }} at {{ profile.employer }} · BS Data Science, {{ profile.school }}</p>
        </div>
      </div>

      <p class="headline">{{ profile.headline }}</p>
      <p class="summary">{{ profile.summary }}</p>

      <div class="cta">
        <RouterLink :to="{ path: '/', hash: '#work' }" class="btn btn-primary">
          See my projects
          <Icon name="arrow-right" :size="16" />
        </RouterLink>
        <a :href="resumeUrl" target="_blank" rel="noopener" class="btn btn-secondary">
          Resume
          <Icon name="arrow-up-right" :size="16" />
        </a>
        <span class="divider" aria-hidden="true"></span>
        <div class="socials">
          <a :href="profile.links.github" target="_blank" rel="noopener" class="icon-link" aria-label="GitHub"><Icon name="github" /></a>
          <a :href="profile.links.linkedin" target="_blank" rel="noopener" class="icon-link" aria-label="LinkedIn"><Icon name="linkedin" /></a>
          <a :href="profile.links.kaggle" target="_blank" rel="noopener" class="icon-link" aria-label="Kaggle"><Icon name="kaggle" :size="16" /></a>
          <a :href="`mailto:${profile.email}`" class="icon-link" aria-label="Email"><Icon name="mail" /></a>
        </div>
      </div>

      <ul class="metrics">
        <li v-for="m in profile.metrics" :key="m.label">
          <RouterLink :to="m.href" class="metric">
            <span class="metric-value">{{ m.value }}</span>
            <span class="metric-label">{{ m.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import Icon from '../Icon.vue'
import { profile } from '../../data/profile.js'

const base = import.meta.env.BASE_URL
const avatar = `${base}${profile.avatar}`
const resumeUrl = `${base}${profile.resume}`
</script>

<style scoped>
.hero {
  padding: 72px 0 64px;
}

.identity {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--surface-2);
  box-shadow: 0 0 0 1px var(--border);
}

h1 {
  font-size: 1.125rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.meta {
  color: var(--text-3);
  font-size: 0.9375rem;
}

.headline {
  font-size: clamp(2rem, 4.6vw, 3.25rem);
  line-height: 1.12;
  font-weight: 640;
  letter-spacing: -0.032em;
  color: var(--text);
  max-width: 19ch;
  text-wrap: balance;
}

.summary {
  margin-top: 24px;
  max-width: 62ch;
  font-size: 1.0625rem;
  color: var(--text-2);
}

.cta {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.divider {
  width: 1px;
  height: 24px;
  background: var(--border-strong);
  margin: 0 6px;
}

.socials {
  display: flex;
  gap: 2px;
}

.metrics {
  list-style: none;
  padding: 0;
  margin-top: 56px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--border);
}

.metrics li + li {
  border-left: 1px solid var(--border);
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 20px 4px;
  height: 100%;
}

.metrics li:first-child .metric {
  padding-left: 0;
}

.metric-value {
  font-size: 1.625rem;
  font-weight: 620;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--text);
  transition: color 0.15s ease;
}

.metric-label {
  font-size: 0.875rem;
  color: var(--text-3);
  line-height: 1.45;
}

.metric:hover .metric-value {
  color: var(--accent);
}

@media (max-width: 640px) {
  .hero {
    padding: 48px 0 40px;
  }

  .identity {
    margin-bottom: 28px;
  }

  .divider {
    display: none;
  }

  .metrics {
    grid-template-columns: 1fr;
    margin-top: 40px;
  }

  .metrics li + li {
    border-left: 0;
    border-top: 1px solid var(--border);
  }

  .metric {
    padding: 16px 0;
  }
}
</style>
