<template>
  <div id="app">
    <header>
      <Navbar />
    </header>
    <main id="main-content">
      <Hero />
      <About />
      <Expertise />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Expertise from './components/Expertise.vue'
import Experience from './components/Experience.vue'
import Projects from './components/Projects.vue'
import Education from './components/Education.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Hero,
    About,
    Expertise,
    Experience,
    Projects,
    Education,
    Contact,
    Footer
  }
}
</script>

<style scoped>
#app {
  width: 100%;
}
</style>
