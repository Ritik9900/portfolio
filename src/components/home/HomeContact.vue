<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <div class="container section-grid">
      <h2 id="contact-title" class="section-label">Contact</h2>
      <div>
        <p class="lead">
          I'm interested in GenAI engineering and data science roles, production ML systems and hard technical problems.
          Email is the fastest way to reach me.
        </p>
        <div class="email-row">
          <a :href="`mailto:${profile.email}`" class="email">{{ profile.email }}</a>
          <button type="button" class="btn btn-secondary btn-sm" @click="copy">
            <Icon :name="copied ? 'check' : 'copy'" :size="14" />
            {{ copied ? 'Copied' : 'Copy' }}
          </button>
          <span class="visually-hidden" aria-live="polite">{{ copied ? 'Email address copied' : '' }}</span>
        </div>
        <ul class="elsewhere">
          <li><a :href="profile.links.linkedin" target="_blank" rel="noopener">LinkedIn <Icon name="arrow-up-right" :size="14" /></a></li>
          <li><a :href="profile.links.github" target="_blank" rel="noopener">GitHub <Icon name="arrow-up-right" :size="14" /></a></li>
          <li><a :href="profile.links.kaggle" target="_blank" rel="noopener">Kaggle <Icon name="arrow-up-right" :size="14" /></a></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Icon from '../Icon.vue'
import { profile } from '../../data/profile.js'

const copied = ref(false)
let timer

async function copy() {
  try {
    await navigator.clipboard.writeText(profile.email)
  } catch {
    // Clipboard API needs a secure context; fall back to a temporary textarea.
    const el = document.createElement('textarea')
    el.value = profile.email
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    el.remove()
  }
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), 2500)
}
</script>

<style scoped>
.lead {
  color: var(--text-2);
  max-width: 58ch;
}

.email-row {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
}

.email {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 620;
  letter-spacing: -0.02em;
  color: var(--text);
  text-decoration: underline;
  text-decoration-color: var(--border-strong);
  text-underline-offset: 6px;
  text-decoration-thickness: 2px;
  word-break: break-all;
}

.email:hover {
  color: var(--accent);
  text-decoration-color: var(--accent);
}

.elsewhere {
  list-style: none;
  padding: 0;
  margin-top: 24px;
  display: flex;
  gap: 24px;
  font-size: 0.9375rem;
}

.elsewhere a {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: var(--text-2);
}

.elsewhere a:hover {
  color: var(--text);
}
</style>
