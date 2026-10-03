<template>
  <a href="#main-content" class="skip-link">Skip to content</a>
  <header class="site-header" :class="{ raised: scrolled || open }">
    <div class="container bar">
      <RouterLink to="/" class="brand" @click="open = false">
        <span class="brand-mark mono" aria-hidden="true">RR</span>
        <span class="brand-name">{{ profile.name }}</span>
      </RouterLink>

      <nav class="nav" :class="{ open }" aria-label="Primary">
        <RouterLink v-for="item in nav" :key="item.hash" :to="{ path: '/', hash: item.hash }" class="nav-link" @click="open = false">
          {{ item.label }}
        </RouterLink>
        <a :href="resumeUrl" class="nav-link nav-resume" target="_blank" rel="noopener" @click="open = false">
          Resume
          <Icon name="arrow-up-right" :size="14" />
        </a>
      </nav>

      <div class="actions">
        <button class="icon-link" type="button" :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`" @click="toggleTheme">
          <Icon :name="theme === 'dark' ? 'sun' : 'moon'" />
        </button>
        <button class="icon-link menu-btn" type="button" :aria-expanded="open" aria-label="Menu" @click="open = !open">
          <Icon :name="open ? 'close' : 'menu'" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Icon from './Icon.vue'
import { profile } from '../data/profile.js'

const nav = [
  { label: 'Projects', hash: '#work' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Kaggle', hash: '#kaggle' },
  { label: 'Contact', hash: '#contact' }
]

const resumeUrl = `${import.meta.env.BASE_URL}${profile.resume}`
const open = ref(false)
const scrolled = ref(false)
const theme = ref(document.documentElement.getAttribute('data-theme') || 'light')

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme.value)
  try {
    localStorage.setItem('theme', theme.value)
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--header-h);
  background: color-mix(in srgb, var(--bg) 86%, transparent);
  backdrop-filter: saturate(160%) blur(10px);
  -webkit-backdrop-filter: saturate(160%) blur(10px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.site-header.raised {
  border-bottom-color: var(--border);
}

.bar {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 620;
  font-size: 0.9375rem;
  letter-spacing: -0.01em;
  margin-right: auto;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: var(--text);
  color: var(--bg);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0;
}

.nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--text-2);
  transition: color 0.15s ease, background-color 0.15s ease;
}

.nav-link:hover {
  color: var(--text);
  background: var(--surface-2);
}

.nav-resume {
  color: var(--text);
  font-weight: 550;
}

.actions {
  display: flex;
  align-items: center;
  gap: 2px;
}

.menu-btn {
  display: none;
}

@media (max-width: 760px) {
  .menu-btn {
    display: inline-flex;
  }

  .nav {
    position: absolute;
    top: var(--header-h);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 8px 16px 16px;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    display: none;
  }

  .nav.open {
    display: flex;
  }

  .nav-link {
    padding: 12px 8px;
    font-size: 1rem;
  }
}
</style>
