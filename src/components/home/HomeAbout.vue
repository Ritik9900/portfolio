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
            <a :href="c.url" target="_blank" rel="noopener" class="cert" :aria-label="`${c.name} — view credential (opens in a new tab)`">
              <img :src="asset(c.badge)" alt="" width="88" height="88" loading="lazy" class="cert-badge" />
              <span class="cert-text">
                <span class="cert-name">{{ c.name }}</span>
                <span class="cert-issuer">{{ c.issuer }}</span>
                <span class="cert-verify">Verify credential <Icon name="arrow-up-right" :size="13" /></span>
              </span>
            </a>
          </li>
        </ul>

        <h3 class="sub">Courses &amp; programs</h3>
        <ul class="courses">
          <li v-for="c in courses" :key="c.name">
            <component
              :is="c.url ? 'a' : 'div'"
              class="course"
              v-bind="c.url ? { href: c.url, target: '_blank', rel: 'noopener', 'aria-label': `${c.name}, ${c.issuer} — view certificate (opens in a new tab)` } : {}"
            >
              <span class="course-logo" aria-hidden="true">
                <Icon v-if="c.logo" :name="c.logo" :size="18" />
                <span v-else class="mono">{{ c.initials }}</span>
              </span>
              <span class="course-text">
                <span class="course-name">{{ c.name }}</span>
                <span class="course-issuer">{{ c.issuer }}</span>
              </span>
              <Icon v-if="c.url" name="arrow-up-right" :size="16" class="course-go" />
            </component>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import Icon from '../Icon.vue'
import { certifications, courses, education, skills } from '../../data/profile.js'

const photo = `${import.meta.env.BASE_URL}${education.photo}`
const asset = (path) => `${import.meta.env.BASE_URL}${path}`
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
  gap: 16px;
}

.cert {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 100%;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  transition: border-color 0.15s ease;
}

.cert:hover {
  border-color: var(--accent);
}

.cert-badge {
  flex-shrink: 0;
  width: 88px;
  height: 88px;
  object-fit: contain;
}

.cert-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.cert-name {
  font-weight: 600;
  line-height: 1.35;
}

.cert-issuer {
  font-size: 0.8125rem;
  color: var(--text-3);
}

.cert-verify {
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.8125rem;
  font-weight: 550;
  color: var(--accent);
}

.courses {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 32px;
}

.courses li {
  border-bottom: 1px solid var(--border);
}

.course {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  font-size: 0.9375rem;
}

.course-logo {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1px var(--border);
  color: var(--text-2);
  font-size: 0.6875rem;
  font-weight: 600;
}

.course-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-right: auto;
}

.course-name {
  font-weight: 550;
}

.course-issuer {
  font-size: 0.8125rem;
  color: var(--text-3);
}

.course-go {
  flex-shrink: 0;
  color: var(--text-3);
}

a.course:hover .course-name,
a.course:hover .course-go {
  color: var(--accent);
}

@media (max-width: 760px) {
  .certs,
  .courses {
    grid-template-columns: 1fr;
  }

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

}
</style>
