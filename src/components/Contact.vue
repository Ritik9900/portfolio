<template>
  <section class="contact section" id="contact">
    <div class="container">
      <h2 class="section-title">Get In Touch</h2>
      <div class="contact-content">
        <div class="contact-info">
          <h3>Let's work together!</h3>
          <p>
            I'm always interested in hearing about new opportunities, projects, or just having a chat 
            about AI/ML and technology. Feel free to reach out!
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

            <a href="https://linkedin.com/in/ritik-ranjan9900" target="_blank" class="contact-method">
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

            <a href="https://github.com/Ritik9900" target="_blank" class="contact-method">
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

          <div class="availability">
            <div class="status-indicator"></div>
            <span>Currently available for opportunities</span>
          </div>
        </div>

        <div class="contact-form-wrapper">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                placeholder="Your Name"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                placeholder="you@example.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                v-model="formData.subject" 
                placeholder="What's this about?"
                required
              />
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                rows="5"
                placeholder="Tell me about your project or opportunity..."
                required
              ></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
              <svg v-if="!isSubmitting" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <svg v-else class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </button>

            <!-- Success Message -->
            <div v-if="submitStatus === 'success'" class="status-message success-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Message sent successfully! I'll get back to you soon.</span>
            </div>

            <!-- Error Message -->
            <div v-if="submitStatus === 'error'" class="status-message error-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              <span>Failed to send message. Please try again or email me directly.</span>
            </div>
          </form>
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
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      isSubmitting: false,
      submitStatus: null, // 'success', 'error', or null
      // Get your free access key from https://web3forms.com
      accessKey: 'YOUR_WEB3FORMS_ACCESS_KEY'
    }
  },
  methods: {
    async handleSubmit() {
      this.isSubmitting = true
      this.submitStatus = null

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: this.accessKey,
            name: this.formData.name,
            email: this.formData.email,
            subject: this.formData.subject,
            message: this.formData.message,
            from_name: 'Portfolio Contact Form',
            to_name: 'Portfolio Owner'
          })
        })

        const result = await response.json()

        if (result.success) {
          this.submitStatus = 'success'
          // Reset form
          this.formData = {
            name: '',
            email: '',
            subject: '',
            message: ''
          }
          // Clear success message after 5 seconds
          setTimeout(() => {
            this.submitStatus = null
          }, 5000)
        } else {
          this.submitStatus = 'error'
        }
      } catch (error) {
        console.error('Form submission error:', error)
        this.submitStatus = 'error'
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
.contact {
  background: white;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1100px;
  margin: 0 auto;
}

.contact-info h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text);
}

.contact-info > p {
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 2.5rem;
  font-size: 1.05rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.contact-method:hover {
  background: white;
  border-color: var(--primary);
  transform: translateX(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.method-icon {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  flex-shrink: 0;
}

.contact-method svg {
  width: 24px;
  height: 24px;
}

.contact-method h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.2rem;
}

.contact-method p {
  font-size: 0.9rem;
  color: var(--text-light);
}

.availability {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  background: #d1fae5;
  border-radius: 10px;
  margin-top: 2rem;
}

.status-indicator {
  width: 12px;
  height: 12px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.availability span {
  color: #065f46;
  font-weight: 500;
  font-size: 0.95rem;
}

.contact-form-wrapper {
  background: var(--bg-secondary);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--text);
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  padding: 0.9rem 1.2rem;
  border: 2px solid var(--border);
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  background: white;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  padding: 1rem 2rem;
  background: var(--gradient-1);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.submit-btn svg {
  width: 20px;
  height: 20px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(67, 206, 162, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.status-message {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-message {
  background: #d1fae5;
  color: #065f46;
  border: 2px solid #10b981;
}

.error-message {
  background: #fee2e2;
  color: #991b1b;
  border: 2px solid #ef4444;
}

.status-message svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>

