<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-logo">&lt;AI/ML Engineer /&gt;</h3>
          <p>Building intelligent solutions for tomorrow's challenges.</p>
          <div class="social-links">
            <a href="https://github.com/Ritik9900" target="_blank" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://linkedin.com/in/ritik-ranjan9900" target="_blank" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="mailto:ritik.ranjan9900@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About</a></li>

            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:ritik.ranjan9900@gmail.com">ritik.ranjan9900@gmail.com</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#contact">Get in Touch</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Interests</h4>
          <ul>
            <li>Deep Learning</li>
            <li>Computer Vision</li>
            <li>NLP</li>
            <li>Web Development</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} AI/ML Engineer Portfolio.</p>
        <p class="love">Made with <span>❤️</span> and ☕</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background: var(--bg-dark);
  color: #e2e8f0;
  padding: 4rem 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-family: 'JetBrains Mono', monospace;
}

.footer-logo {
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-section p {
  color: #94a3b8;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.footer-section h4 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.7rem;
}

.footer-section ul li a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: white;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e2e8f0;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: var(--gradient-1);
  transform: translateY(-3px);
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #94a3b8;
  font-size: 0.9rem;
}

.love {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.love span {
  animation: pulse 1.5s ease-in-out infinite;
}

@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 640px) {
  .footer-content {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>

