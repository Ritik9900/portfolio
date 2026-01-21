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
        <div class="status-dot"></div>
        <span>Currently Available for Projects</span>
      </div>

      <div class="services-grid">
        <!-- Machine Learning Models -->
        <div class="service-card">
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
          <div class="featured-badge">Popular</div>
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
            <span class="step-num">01</span>
            <h4>Discovery</h4>
            <p>Understand your requirements and define project scope</p>
          </div>
          <div class="process-step">
            <span class="step-num">02</span>
            <h4>Development</h4>
            <p>Build and train models with regular progress updates</p>
          </div>
          <div class="process-step">
            <span class="step-num">03</span>
            <h4>Testing</h4>
            <p>Rigorous testing and validation of model performance</p>
          </div>
          <div class="process-step">
            <span class="step-num">04</span>
            <h4>Delivery</h4>
            <p>Deploy to production with documentation and support</p>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <h3>Ready to Start Your AI Project?</h3>
        <p>Let's discuss how I can help bring your vision to life</p>
        <a href="#contact" class="cta-button">Get in Touch</a>
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
  background: var(--bg);
  padding: 3rem 0; /* Compact padding */
}

.services-header {
  text-align: center;
  margin-bottom: 2rem;
}

.availability-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 3rem;
  padding: 0.5rem 1.2rem;
  background: var(--bg-secondary);
  border-radius: 50px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid var(--border);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.service-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  aspect-ratio: 1; /* Enforce square shape */
  justify-content: space-between;
}

.service-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--primary);
  color: white;
  padding: 0.25rem 0.8rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
}

.service-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.service-card > p {
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  flex-grow: 1;
}

.service-features {
  list-style: none;
  margin-top: auto;
}

.service-features li {
  position: relative;
  padding-left: 1.2rem;
  margin-bottom: 0.6rem;
  color: var(--text-light);
  font-size: 0.9rem;
}

.service-features li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--text-light); /* Minimal dot instead of checkmark */
}

/* Work Process */
.work-process {
  margin-bottom: 5rem;
}

.work-process h3 {
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text);
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.process-step {
  text-align: center; 
}

.step-num {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  color: var(--bg-secondary); /* Text-fill effect background color */
  -webkit-text-stroke: 1px var(--border); /* Outline effect */
  margin-bottom: 1rem;
  line-height: 1;
}

.process-step h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.process-step p {
  color: var(--text-light);
  font-size: 0.9rem;
  line-height: 1.5;
}

/* CTA */
.cta-section {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--bg-secondary);
  border-radius: 16px;
  border: 1px solid var(--border);
}

.cta-section h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text);
}

.cta-section p {
  color: var(--text-light);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: var(--primary);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  opacity: 0.9;
}

@media (max-width: 968px) {
  .process-steps {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

@media (max-width: 600px) {
  .process-steps {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
