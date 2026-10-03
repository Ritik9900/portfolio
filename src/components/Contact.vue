<template>
  <section class="contact section" id="contact">
    <div class="container">
      <h2 class="section-title">Get In Touch</h2>
      <div class="contact-content">
        <div class="contact-info">
          <h3>Let's connect.</h3>
          <p>
            I'm always interested in hearing about new opportunities in GenAI/ML engineering,
            production RAG systems, or interesting technical challenges. Feel free to reach out.
          </p>

          <div class="contact-methods">
            <a href="mailto:ritik.ranjan9900@gmail.com" class="contact-method">
              <div class="method-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>ritik.ranjan9900@gmail.com</p>
              </div>
            </a>

            <a href="https://linkedin.com/in/ritik-ranjan9900" target="_blank" rel="noopener" class="contact-method">
              <div class="method-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
              <div>
                <h4>LinkedIn</h4>
                <p>linkedin.com/in/ritik-ranjan9900</p>
              </div>
            </a>

            <a href="https://github.com/Ritik9900" target="_blank" rel="noopener" class="contact-method">
              <div class="method-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </div>
              <div>
                <h4>GitHub</h4>
                <p>github.com/Ritik9900</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Mailto card with copy button -->
        <div class="mailto-card">
          <div class="mailto-header">
            <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="1.5" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <h3>Send me an email</h3>
          </div>
          <p class="mailto-desc">Click below to open your email client, or copy my address directly.</p>

          <a href="mailto:ritik.ranjan9900@gmail.com" class="mailto-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Open Email Client
          </a>

          <button class="copy-btn" @click="copyEmail">
            <svg v-if="!copied" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <svg v-else viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            {{ copied ? 'Copied!' : 'Copy email address' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      copied: false
    }
  },
  methods: {
    async copyEmail() {
      try {
        await navigator.clipboard.writeText('ritik.ranjan9900@gmail.com')
        this.copied = true
        setTimeout(() => { this.copied = false }, 3000)
      } catch {
        // Fallback
        const el = document.createElement('textarea')
        el.value = 'ritik.ranjan9900@gmail.com'
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
        this.copied = true
        setTimeout(() => { this.copied = false }, 3000)
      }
    }
  }
}
</script>

<style scoped>
.contact {
  background: var(--bg);
  padding: 4rem 0;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: start;
}

.contact-info h3 {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: var(--text);
}

.contact-info > p {
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-base);
  border: 1px solid transparent;
}

.contact-method:hover {
  background: var(--card-bg);
  border-color: var(--primary);
  transform: translateX(4px);
}

.method-icon {
  width: 38px;
  height: 38px;
  background: var(--card-bg);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  flex-shrink: 0;
}

.method-icon svg {
  width: 18px;
  height: 18px;
}

.contact-method h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.05rem;
}

.contact-method p {
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

/* Mailto card */
.mailto-card {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  text-align: center;
}

.mailto-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: var(--primary);
}

.mailto-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
}

.mailto-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.mailto-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-base);
  margin-bottom: 0.75rem;
  width: 100%;
  justify-content: center;
}

.mailto-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.25rem;
  background: var(--card-bg);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
  width: 100%;
  justify-content: center;
}

.copy-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style>
