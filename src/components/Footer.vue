<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section footer-brand">
          <h3 class="footer-logo mono">&lt;RR /&gt;</h3>
          <p>Building production RAG systems and the observability that keeps them honest.</p>
          <div class="social-links">
            <a href="https://github.com/Ritik9900" target="_blank" rel="noopener" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://linkedin.com/in/ritik-ranjan9900" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://www.kaggle.com/ritik9929" target="_blank" rel="noopener" aria-label="Kaggle">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.075.312z"/>
              </svg>
            </a>
            <a href="mailto:ritik.ranjan9900@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-section">
          <h4>Navigate</h4>
          <ul>
            <li><a href="#expertise">Expertise</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#education">Education</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:ritik.ranjan9900@gmail.com">ritik.ranjan9900@gmail.com</a></li>
            <li><a href="https://linkedin.com/in/ritik-ranjan9900" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="#contact">Get in Touch</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Focus Areas</h4>
          <ul>
            <li>RAG Systems</li>
            <li>LLM Observability</li>
            <li>Hybrid Search</li>
            <li>MLOps</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Ritik Ranjan.</p>
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
  color: #cbd5e1;
  padding: 3.5rem 0 1.5rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
}

.footer-logo {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: var(--primary);
}

.footer-brand > p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
}

.social-links {
  display: flex;
  gap: 0.6rem;
}

.social-links a {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  transition: all var(--transition-base);
}

.social-links a:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

.footer-section h4 {
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #e2e8f0;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: #64748b;
}

.footer-section ul li a {
  color: #64748b;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-section ul li a:hover {
  color: #e2e8f0;
}

.footer-bottom {
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
  color: #475569;
  font-size: 0.8rem;
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
}
</style>
