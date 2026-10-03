<template>
  <section id="skills" class="section" aria-labelledby="skills-title">
    <div class="container section-grid">
      <h2 id="skills-title" class="section-label">Skills</h2>
      <dl class="skills">
        <div v-for="s in skills" :key="s.area" class="skill">
          <dt>{{ s.area }}</dt>
          <dd>{{ s.items }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <section id="education" class="section" aria-labelledby="education-title">
    <div class="container section-grid">
      <h2 id="education-title" class="section-label">Education</h2>
      <div>
        <div class="edu">
          <div class="edu-text">
            <h3>{{ education.degree }}</h3>
            <p class="school">{{ education.school }}</p>
            <p class="period mono">{{ education.period }}</p>
            <p class="detail"><span class="k">{{ education.minors.length > 1 ? 'Minors' : 'Minor' }}</span> {{ education.minors.join(' · ') }}</p>
            <p class="detail"><span class="k">Coursework</span> {{ education.coursework }}</p>
            <p class="detail"><span class="k">Leadership</span> {{ education.activities }}</p>
          </div>
          <img :src="photo" alt="Ritik at the IIT Madras entrance sign" class="photo" width="1400" height="1050" loading="lazy" />
        </div>

        <h3 class="sub">Certifications</h3>
        <ul class="certs">
          <li v-for="c in certifications" :key="c.name">
            <component
              :is="c.url ? 'a' : 'div'"
              class="cert"
              v-bind="c.url ? { href: c.url, target: '_blank', rel: 'noopener', 'aria-label': `View ${c.name} certificate (opens in a new tab)` } : {}"
            >
              <span class="cert-text">
                <span class="cert-name">{{ c.name }}</span>
                <span class="cert-issuer">{{ c.issuer }}</span>
              </span>
              <span v-if="c.url" class="cert-view">View <Icon name="arrow-up-right" :size="13" /></span>
            </component>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import Icon from '../Icon.vue'
import { certifications, education, skills } from '../../data/profile.js'

const photo = `${import.meta.env.BASE_URL}${education.photo}`
</script>

<style scoped>
.skill {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 24px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
}

.skill:first-child {
  padding-top: 0;
}

.skill:last-child {
  border-bottom: 0;
}

dt {
  font-weight: 600;
  font-size: 0.9375rem;
}

dd {
  color: var(--text-2);
  font-size: 0.9375rem;
}

.edu {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 32px;
  align-items: start;
}

h3 {
  font-size: 1.125rem;
}

.school {
  color: var(--text-2);
}

.period {
  font-size: 0.8125rem;
  color: var(--text-3);
  margin-top: 2px;
}

.detail {
  margin-top: 14px;
  color: var(--text-2);
  font-size: 0.9375rem;
}

.k {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-3);
  margin-bottom: 2px;
}

.photo {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius);
  box-shadow: 0 0 0 1px var(--border);
}

.sub {
  margin: 48px 0 12px;
  font-size: 1rem;
}

.certs {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 32px;
}

.certs li {
  border-bottom: 1px solid var(--border);
  font-size: 0.9375rem;
}

.cert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
}

.cert-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.cert-name {
  font-weight: 550;
}

.cert-issuer {
  color: var(--text-3);
  font-size: 0.8125rem;
}

.cert-view {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  font-size: 0.8125rem;
  font-weight: 550;
  color: var(--accent);
}

a.cert:hover .cert-name {
  color: var(--accent);
}

@media (max-width: 760px) {
  .skill {
    grid-template-columns: 1fr;
    gap: 2px;
  }

  .edu {
    grid-template-columns: 1fr;
  }

  .photo {
    max-width: 420px;
  }

  .certs {
    grid-template-columns: 1fr;
  }
}
</style>
