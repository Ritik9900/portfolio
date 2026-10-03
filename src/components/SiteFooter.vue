<template>
  <footer class="site-footer">
    <div class="container row">
      <p>© {{ year }} {{ profile.name }}</p>
      <div class="links">
        <a :href="profile.links.github" target="_blank" rel="noopener" class="icon-link" aria-label="GitHub"><Icon name="github" /></a>
        <a :href="profile.links.linkedin" target="_blank" rel="noopener" class="icon-link" aria-label="LinkedIn"><Icon name="linkedin" /></a>
        <a :href="profile.links.kaggle" target="_blank" rel="noopener" class="icon-link" aria-label="Kaggle"><Icon name="kaggle" :size="16" /></a>
        <a :href="`mailto:${profile.email}`" class="icon-link" aria-label="Email"><Icon name="mail" /></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Icon from './Icon.vue'
import { profile } from '../data/profile.js'

const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border);
  padding: 24px 0;
  color: var(--text-3);
  font-size: 0.875rem;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.links {
  display: flex;
  gap: 2px;
}
</style>
