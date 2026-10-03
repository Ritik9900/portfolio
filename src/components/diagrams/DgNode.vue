<template>
  <g :class="['dg-node', tone && `dg-tone-${tone}`, { 'is-dashed': dashed }]">
    <title v-if="tip">{{ tip }}</title>
    <rect :x="x" :y="y" :width="w" :height="h" rx="6" />
    <text :x="cx" :y="titleY" text-anchor="middle" :class="['dg-title', { mono }]">{{ title }}</text>
    <text v-for="(s, i) in subs" :key="i" :x="cx" :y="titleY + 15 + i * 13" text-anchor="middle" class="dg-sub">{{ s }}</text>
  </g>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  w: { type: Number, default: 116 },
  h: { type: Number, default: 64 },
  title: { type: String, required: true },
  subs: { type: Array, default: () => [] },
  tone: { type: String, default: '' },
  dashed: { type: Boolean, default: false },
  mono: { type: Boolean, default: false },
  tip: { type: String, default: '' }
})

const cx = computed(() => props.x + props.w / 2)
// Vertically centre the title + subtitle block inside the box.
const titleY = computed(() => {
  const block = 12 + props.subs.length * 13 + (props.subs.length ? 3 : 0)
  return props.y + props.h / 2 - block / 2 + 10
})
</script>
