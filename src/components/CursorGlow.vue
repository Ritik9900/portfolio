<template>
  <div class="cursor-glow" ref="glow"></div>
</template>

<script>
export default {
  name: 'CursorGlow',
  mounted() {
    window.addEventListener('mousemove', this.moveGlow)
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.moveGlow)
  },
  methods: {
    moveGlow(e) {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        const x = e.clientX
        const y = e.clientY
        if (this.$refs.glow) {
          this.$refs.glow.style.background = `
            radial-gradient(
              600px circle at ${x}px ${y}px,
              rgba(139, 92, 246, 0.3),
              transparent 40%
            )
          `
        }
      })
    }
  }
}
</script>

<style scoped>
.cursor-glow {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999; /* Ensure it's on top of everything */
  transition: opacity 0.3s ease;
}

/* Only active in dark mode */
:global(body.dark-mode) .cursor-glow {
  display: block;
  /* Screen blend mode makes it invisible on white (Hero) and glowing on dark */
  mix-blend-mode: screen; 
}
</style>
