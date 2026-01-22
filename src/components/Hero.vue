<template>
  <section class="hero" id="home">
    <div class="hero-bg">
      <div class="gradient-blob blob-1"></div>
      <div class="gradient-blob blob-2"></div>
      <div class="gradient-blob blob-3"></div>
    </div>
    
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <p class="greeting fade-in-up">Hi, I'm</p>
          <h1 class="name fade-in-up" style="animation-delay: 0.1s">Ritik Ranjan</h1>
          <h2 class="title fade-in-up" style="animation-delay: 0.2s">
            AI/ML Engineer & Full-Stack Developer
          </h2>
          <p class="education-text fade-in-up" style="animation-delay: 0.25s">
            IIT Madras Graduate with minors in Finance and Cloud Computing
          </p>
          <p class="description fade-in-up" style="animation-delay: 0.3s">
            Specializing in Deep Learning, Machine Learning, and building scalable applications. 
            Passionate about creating intelligent solutions that make a difference.
          </p>
          <div class="hero-buttons fade-in-up" style="animation-delay: 0.4s">
            <a href="#projects" class="btn btn-primary">View My Work</a>
            <a href="#contact" class="btn btn-outline">Get In Touch</a>
            <button @click="openPdf" class="btn btn-secondary">Resume</button>
          </div>
          <div class="social-links fade-in-up" style="animation-delay: 0.5s">
            <a href="https://github.com/Ritik9900" target="_blank" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/ritik-ranjan9900/" target="_blank" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="mailto:ritik.ranjan9900@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="code-window">
            <div class="window-header">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
            <div class="code-content">
              <pre><code><span class="keyword">class</span> <span class="class-name">AIEngineer</span>:
    <span class="keyword">def</span> <span class="function">__init__</span>(<span class="keyword">self</span>):
        <span class="keyword">self</span>.name = <span class="string">"Ritik Ranjan"</span>
        <span class="keyword">self</span>.role = <span class="string">"AI/ML Engineer"</span>
        <span class="keyword">self</span>.experience = <span class="number">1</span>
        <span class="keyword">self</span>.skills = [
            <span class="string">"Deep Learning"</span>,
            <span class="string">"Machine Learning"</span>,
            <span class="string">"DevOps/MLOps"</span>,
            <span class="string">"Backend"</span>
        ]
    
    <span class="keyword">def</span> <span class="function">build_future</span>(<span class="keyword">self</span>):
        <span class="keyword">return</span> <span class="string">"AI Solutions"</span></code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PDF Modal -->
    <PdfModal 
      :is-open="modalOpen" 
      :pdf-url="currentPdfUrl" 
      :title="currentPdfTitle"
      @close="closeModal"
    />
  </section>
</template>

<script>
import PdfModal from './PdfModal.vue'

export default {
  name: 'Hero',
  components: {
    PdfModal
  },
  data() {
    return {
      modalOpen: false,
      currentPdfUrl: `${import.meta.env.BASE_URL}documents/Ritik_Ranjan_IIT-M.pdf#toolbar=0&navpanes=0&scrollbar=0`,
      currentPdfTitle: 'Resume / CV'
    }
  },
  methods: {
    openPdf() {
      this.modalOpen = true
    },
    closeModal() {
      this.modalOpen = false
    }
  }
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
  
  /* Force Light Mode Theme Variables for this section */
  --primary: #0071e3;
  --text: #1d1d1f;
  --text-light: #86868b;
  background-color: #ffffff; 
  color: #1d1d1f;
  z-index: 0; /* Create stacking context so -1 children sit above background */
  
  /* Restore light mode gradients */
  --gradient-1: linear-gradient(135deg, #6dd5fa 0%, #2980b9 100%);
  --gradient-2: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
  --gradient-3: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);

  /* Restore light mode secondary backgrounds and borders for buttons/icons */
  --bg-secondary: #fbfbfd;
  --border: #d2d2d7;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
}

.gradient-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
  animation: float 8s ease-in-out infinite;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: var(--gradient-1);
  top: -100px;
  left: -100px;
}

.blob-2 {
  width: 350px;
  height: 350px;
  background: var(--gradient-2);
  bottom: -100px;
  right: -100px;
  animation-delay: -2s;
}

.blob-3 {
  width: 300px;
  height: 300px;
  background: var(--gradient-3);
  top: 50%;
  left: 50%;
  animation-delay: -4s;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.greeting {
  font-size: 1.2rem;
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.name {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 0.5rem;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1.5rem;
}

.education-text {
  font-size: 1.1rem;
  color: var(--primary);
  font-weight: 500;
  margin-bottom: 1.5rem;
  font-family: 'JetBrains Mono', monospace;
}

.description {
  font-size: 1.1rem;
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 550px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap; /* Allow wrapping for better mobile */
}

.btn {
  padding: 0.9rem 2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: var(--gradient-1);
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.btn-outline {
  border: 2px solid var(--primary);
  color: var(--primary);
  background: transparent;
}

.btn-outline:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-3px);
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: var(--gradient-1);
  color: white;
  transform: translateY(-3px);
}

.code-window {
  background: var(--bg-dark);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: float 6s ease-in-out infinite;
}

.window-header {
  background: #1e293b;
  padding: 0.8rem 1rem;
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #64748b;
}

.dot:nth-child(1) {
  background: #ef4444;
}

.dot:nth-child(2) {
  background: #f59e0b;
}

.dot:nth-child(3) {
  background: #10b981;
}

.code-content {
  padding: 1.5rem;
  overflow-x: auto;
}

.code-content pre {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.8;
}

.code-content code {
  color: #e2e8f0;
}

.keyword {
  color: #c678dd;
}

.class-name {
  color: #e5c07b;
}

.function {
  color: #61afef;
}

.string {
  color: #98c379;
}

.number {
  color: #d19a66;
}

@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-visual {
    order: -1;
  }

  .name {
    font-size: 3rem;
  }

  .title {
    font-size: 1.5rem;
  }
}

@media (max-width: 640px) {
  .name {
    font-size: 2.5rem;
  }

  .title {
    font-size: 1.3rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .btn {
    text-align: center;
  }
}
</style>

