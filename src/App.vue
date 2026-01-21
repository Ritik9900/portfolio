<template>
  <div id="app">
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <Experience />
    <Projects />
    <Services />
    <Education />
    <Resume />
    <Contact />
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Experience from './components/Experience.vue'
import Projects from './components/Projects.vue'
import Services from './components/Services.vue'
import Education from './components/Education.vue'
import Resume from './components/Resume.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Hero,
    About,
    Skills,
    Experience,
    Projects,
    Services,
    Education,
    Resume,
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

