<template>
  <div 
    class="tilt-card" 
    ref="card" 
    @mousemove="handleMouseMove" 
    @mouseleave="handleMouseLeave"
    :style="cardStyle"
  >
    <div class="tilt-content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TiltCard',
  props: {
    maxRotation: {
      type: Number,
      default: 15
    },
    scale: {
      type: Number,
      default: 1.05
    },
    perspective: {
      type: Number,
      default: 1000
    },
    glare: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      rotateX: 0,
      rotateY: 0,
      scaleVal: 1
    }
  },
  computed: {
    cardStyle() {
      return {
        transform: `perspective(${this.perspective}px) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg) scale(${this.scaleVal})`,
        transition: 'transform 0.1s ease-out'
      }
    },
    contentStyle() {
      return {
        // Optional: inverse transform for content if needed, but usually not
      }
    }
  },
  methods: {
    handleMouseMove(e) {
      if (!this.$refs.card) return

      const card = this.$refs.card
      const rect = card.getBoundingClientRect()
      
      const x = e.clientX - rect.left // x position within the element
      const y = e.clientY - rect.top  // y position within the element
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      // Calculate rotation based on cursor position relative to center
      // Max rotation is applied at edges
      const rotateX = ((y - centerY) / centerY) * -this.maxRotation
      const rotateY = ((x - centerX) / centerX) * this.maxRotation

      this.rotateX = rotateX
      this.rotateY = rotateY
      this.scaleVal = this.scale
    },
    handleMouseLeave() {
      // Reset values on mouse leave
      this.rotateX = 0
      this.rotateY = 0
      this.scaleVal = 1
    }
  }
}
</script>

<style scoped>
.tilt-card {
  /* Requires 3d context in parent or self usually handled by perspective in transform */
  transform-style: preserve-3d;
  will-change: transform;
}

.tilt-content {
  /* transform: translateZ(20px); Optional for depth perception */
}
</style>
