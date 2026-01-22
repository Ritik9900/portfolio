<template>
  <div id="app">
    <Navbar />
    <Hero />
    <About />

    <Experience />
    <Projects />
    <Services />
    <Certificates />
    <Contact />
    <Footer />
    <CursorGlow />
    <NeuralRain />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'

import Experience from './components/Experience.vue'
import Projects from './components/Projects.vue'
import Services from './components/Services.vue'
import Certificates from './components/Certificates.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import CursorGlow from './components/CursorGlow.vue'
import NeuralRain from './components/NeuralRain.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Hero,
    About,

    Experience,
    Projects,
    Services,
    Certificates,
    Contact,
    Footer,
    CursorGlow,
    NeuralRain
  }
}
</script>

<style scoped>
#app {
  width: 100%;
}
</style>

