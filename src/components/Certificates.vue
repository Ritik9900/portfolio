<template>
  <section class="certifications section" id="certifications">
    <div class="container">
      <h3 class="section-title">Certifications & Achievements</h3>
      <div class="cert-grid">
        <div class="cert-item" v-for="cert in certifications" :key="cert.name">
          <div class="cert-content">
            <h4>{{ cert.name }}</h4>
            <p>{{ cert.issuer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Certificates',
  data() {
    return {
      certifications: [
        { name: 'TensorFlow Developer Certificate', issuer: 'Google' },
        { name: 'AWS Machine Learning Specialty', issuer: 'Amazon Web Services' },
        { name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI' },
        { name: 'Vue.js Certification', issuer: 'Vue School' }
      ]
    }
  }
}
</script>

<style scoped>
.certifications {
  background: var(--bg);
  padding: 3rem 0;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text);
}

.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.cert-item {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.cert-item:hover {
  transform: translateY(-3px);
  border-color: var(--primary);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.cert-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.3rem;
}

.cert-content p {
  font-size: 0.85rem;
  color: var(--text-light);
}
</style>
