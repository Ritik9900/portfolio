<template>
  <div class="neural-rain-container">
    <canvas ref="canvasLeft" class="rain-canvas left"></canvas>
    <canvas ref="canvasRight" class="rain-canvas right"></canvas>
  </div>
</template>

<script>
export default {
  name: 'NeuralRain',
  data() {
    return {
      ctxLeft: null,
      ctxRight: null,
      particlesLeft: [],
      particlesRight: [],
      animationFrame: null,
      resizeObserver: null,
      config: {
        color: '255, 153, 51', // Orange (#ff9933)
        particleCount: 40,
        connectionDistance: 100,
        speed: 1.5
      }
    }
  },
  mounted() {
    this.initCanvas()
    this.animationFrame = requestAnimationFrame(this.animate)
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    cancelAnimationFrame(this.animationFrame)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    initCanvas() {
      const left = this.$refs.canvasLeft
      const right = this.$refs.canvasRight
      
      this.setupCanvas(left, 'left')
      this.setupCanvas(right, 'right')
    },
    
    setupCanvas(canvas, side) {
      if (!canvas) return
      
      canvas.width = canvas.clientWidth
      canvas.height = window.innerHeight // Use window height for fixed background
      
      const ctx = canvas.getContext('2d')
      if (side === 'left') {
        this.ctxLeft = ctx
        this.particlesLeft = this.createParticles(canvas.width, canvas.height)
      } else {
        this.ctxRight = ctx
        this.particlesRight = this.createParticles(canvas.width, canvas.height)
      }
    },

    createParticles(width, height) {
      const particles = []
      for (let i = 0; i < this.config.particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: Math.random() * this.config.speed + 0.5,
          size: Math.random() * 2 + 1
        })
      }
      return particles
    },

    animate() {
      if (this.ctxLeft && this.$refs.canvasLeft) {
        this.updateAndDraw(this.ctxLeft, this.particlesLeft, this.$refs.canvasLeft.width, this.$refs.canvasLeft.height)
      }
      if (this.ctxRight && this.$refs.canvasRight) {
        this.updateAndDraw(this.ctxRight, this.particlesRight, this.$refs.canvasRight.width, this.$refs.canvasRight.height)
      }
      this.animationFrame = requestAnimationFrame(this.animate)
    },

    updateAndDraw(ctx, particles, width, height) {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = `rgba(${this.config.color}, 0.8)`
      ctx.strokeStyle = `rgba(${this.config.color}, 0.15)`
      ctx.lineWidth = 1

      // Update positions
      particles.forEach(p => {
        p.y += p.vy
        p.x += p.vx

        // Reset if out of bounds
        if (p.y > height) {
          p.y = -10
          p.x = Math.random() * width
        }
        if (p.x < 0 || p.x > width) {
          p.vx *= -1
        }
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < this.config.connectionDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${this.config.color}, ${1 - dist / this.config.connectionDistance})`
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
    },

    handleResize() {
      this.initCanvas()
    }
  }
}
</script>

<style scoped>
.neural-rain-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1; /* Behind content but in front of background? No, let's put it low */
  /* If we want it in margins, it should be visible. 
     Content container is max-width: 1400px.
     On large screens, margins are empty.
  */
}

.rain-canvas {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 15vw; /* Occupy 15% of width on each side */
  height: 100%;
}

.left {
  left: 0;
}

.right {
  right: 0;
}

@media (max-width: 1200px) {
  .rain-canvas {
    width: 10vw;
  }
}

@media (max-width: 768px) {
  .neural-rain-container {
    display: none; /* Hide on mobile */
  }
}
</style>
