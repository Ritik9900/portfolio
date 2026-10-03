<template>
  <defs>
    <marker :id="`${id}-arrow`" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" class="dg-marker" />
    </marker>
    <marker :id="`${id}-arrow-accent`" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" class="dg-marker accent" />
    </marker>
  </defs>
</template>

<script setup>
defineProps({ id: { type: String, required: true } })
</script>
