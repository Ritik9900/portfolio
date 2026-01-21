<template>
  <section class="services section" id="services">
    <div class="container">
      <div class="services-header">
        <h2 class="section-title">Available for Contract Work</h2>
        <p class="services-subtitle">
          Open to building cutting-edge ML/DL models and AI solutions on a contract basis. 
          Let's work together to bring your AI vision to life!
        </p>
      </div>

      <div class="availability-badge">
        <div class="pulse-dot"></div>
        <span>Currently Available for Projects</span>
      </div>

      <div class="services-grid">
        <!-- Machine Learning Models -->
        <div class="service-card">
          <div class="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <h3>Machine Learning Models</h3>
          <p>Build custom ML models tailored to your specific business needs</p>
          <ul class="service-features">
            <li>Predictive Analytics</li>
            <li>Classification & Regression</li>
            <li>Recommendation Systems</li>
            <li>Time Series Forecasting</li>
            <li>Anomaly Detection</li>
          </ul>
        </div>

        <!-- Deep Learning Solutions -->
        <div class="service-card featured">
          <div class="featured-badge">Most Popular</div>
          <div class="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
          <h3>Deep Learning Solutions</h3>
          <p>Advanced neural network architectures for complex problems</p>
          <ul class="service-features">
            <li>Computer Vision (CNN)</li>
            <li>Natural Language Processing</li>
            <li>Neural Network Design</li>
            <li>Transfer Learning</li>
            <li>Model Optimization</li>
          </ul>
        </div>

        <!-- AI Consulting -->
        <div class="service-card">
          <div class="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3>AI Consulting & Strategy</h3>
          <p>Expert guidance on AI implementation and strategy</p>
          <ul class="service-features">
            <li>AI Feasibility Analysis</li>
            <li>Model Architecture Design</li>
            <li>Performance Optimization</li>
            <li>Data Strategy</li>
            <li>Technology Stack Selection</li>
          </ul>
        </div>

        <!-- Model Deployment -->
        <div class="service-card">
          <div class="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          </div>
          <h3>Model Deployment</h3>
          <p>Deploy ML models to production with scalability</p>
          <ul class="service-features">
            <li>Cloud Deployment (AWS, GCP)</li>
            <li>API Development</li>
            <li>Model Monitoring</li>
            <li>CI/CD Pipelines</li>
            <li>Performance Optimization</li>
          </ul>
        </div>

        <!-- Data Engineering -->
        <div class="service-card">
          <div class="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M3 5v14a9 3 0 0 0 18 0V5"></path>
            </svg>
          </div>
          <h3>Data Engineering</h3>
          <p>Build robust data pipelines for ML workflows</p>
          <ul class="service-features">
            <li>Data Preprocessing</li>
            <li>Feature Engineering</li>
            <li>ETL Pipelines</li>
            <li>Data Quality Assurance</li>
            <li>Database Optimization</li>
          </ul>
        </div>

        <!-- Full Stack AI Apps -->
        <div class="service-card">
          <div class="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <h3>Full-Stack AI Applications</h3>
          <p>Complete AI-powered web applications</p>
          <ul class="service-features">
            <li>Frontend Development (Vue.js)</li>
            <li>Backend APIs</li>
            <li>Real-time ML Inference</li>
            <li>Unity Game Integration</li>
            <li>User Interface Design</li>
          </ul>
        </div>
      </div>

      <div class="work-process">
        <h3>How I Work</h3>
        <div class="process-steps">
          <div class="process-step">
            <div class="step-number">1</div>
            <h4>Discovery</h4>
            <p>Understand your requirements and define project scope</p>
          </div>
          <div class="process-arrow">→</div>
          <div class="process-step">
            <div class="step-number">2</div>
            <h4>Development</h4>
            <p>Build and train models with regular progress updates</p>
          </div>
          <div class="process-arrow">→</div>
          <div class="process-step">
            <div class="step-number">3</div>
            <h4>Testing</h4>
            <p>Rigorous testing and validation of model performance</p>
          </div>
          <div class="process-arrow">→</div>
          <div class="process-step">
            <div class="step-number">4</div>
            <h4>Delivery</h4>
            <p>Deploy to production with documentation and support</p>
          </div>
        </div>
      </div>

      <div class="contract-info">
        <div class="info-cards">
          <div class="info-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <div>
              <h4>Flexible Duration</h4>
              <p>Short-term projects to long-term contracts</p>
            </div>
          </div>
          <div class="info-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <div>
              <h4>Quality Assured</h4>
              <p>High-quality code with comprehensive testing</p>
            </div>
          </div>
          <div class="info-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <div>
              <h4>Clear Communication</h4>
              <p>Regular updates and transparent progress tracking</p>
            </div>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <h3>Ready to Start Your AI Project?</h3>
        <p>Let's discuss how I can help bring your vision to life</p>
        <a href="#contact" class="cta-button">
          Get in Touch
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Services'
}
</script>

<style scoped>
.services {
  background: var(--bg-secondary);
}

.services-header {
  text-align: center;
  margin-bottom: 2rem;
}

.services-subtitle {
  font-size: 1.15rem;
  color: var(--text-light);
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.8;
}

.availability-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 3rem;
  padding: 1rem 2rem;
  background: var(--card-bg);
  border-radius: 50px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 20px rgba(67, 206, 162, 0.2);
  border: 2px solid var(--primary);
}

.pulse-dot {
  width: 12px;
  height: 12px;
  background: var(--primary);
  border-radius: 50%;
  position: relative;
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% {
    box-shadow: 0 0 0 0 rgba(67, 206, 162, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(67, 206, 162, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(67, 206, 162, 0);
  }
}

.availability-badge span {
  font-weight: 600;
  color: var(--text);
  font-size: 0.95rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.service-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(67, 206, 162, 0.2);
  border-color: var(--primary);
}

.service-card.featured {
  border-color: var(--primary);
  box-shadow: 0 8px 30px rgba(67, 206, 162, 0.15);
}

.featured-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  background: var(--gradient-1);
  color: white;
  padding: 0.4rem 1.2rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(67, 206, 162, 0.3);
}

.service-icon {
  width: 70px;
  height: 70px;
  background: var(--gradient-1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px rgba(67, 206, 162, 0.3);
}

.service-icon svg {
  width: 35px;
  height: 35px;
  color: white;
}

.service-card h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
}

.service-card > p {
  color: var(--text-light);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.service-features {
  list-style: none;
}

.service-features li {
  position: relative;
  padding-left: 1.8rem;
  margin-bottom: 0.8rem;
  color: var(--text-light);
  font-size: 0.95rem;
}

.service-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: bold;
  font-size: 1.1rem;
}

.work-process {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.work-process h3 {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
}

.process-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.process-step {
  flex: 1;
  text-align: center;
}

.step-number {
  width: 60px;
  height: 60px;
  background: var(--gradient-1);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 15px rgba(67, 206, 162, 0.3);
}

.process-step h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.process-step p {
  color: var(--text-light);
  font-size: 0.9rem;
  line-height: 1.6;
}

.process-arrow {
  font-size: 2rem;
  color: var(--primary);
  font-weight: bold;
}

.contract-info {
  margin-bottom: 3rem;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.info-card {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  align-items: start;
  gap: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-3px);
}

.info-card svg {
  width: 40px;
  height: 40px;
  color: var(--primary);
  flex-shrink: 0;
}

.info-card h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.info-card p {
  color: var(--text-light);
  font-size: 0.9rem;
  line-height: 1.6;
}

.cta-section {
  background: var(--gradient-1);
  border-radius: 20px;
  padding: 4rem 2rem;
  text-align: center;
  color: white;
  box-shadow: 0 8px 30px rgba(67, 206, 162, 0.3);
}

.cta-section h3 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-section > p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2.5rem;
  background: white;
  color: var(--primary);
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.cta-button svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 968px) {
  .services-grid {
    grid-template-columns: 1fr;
  }

  .process-steps {
    flex-direction: column;
  }

  .process-arrow {
    transform: rotate(90deg);
    margin: 1rem 0;
  }

  .work-process {
    padding: 2rem 1.5rem;
  }

  .cta-section {
    padding: 3rem 1.5rem;
  }

  .cta-section h3 {
    font-size: 1.8rem;
  }
}
</style>

