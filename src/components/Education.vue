<template>
  <section class="education section" id="education">
    <div class="container">
      <h2 class="section-title">Education</h2>

      <div class="education-grid">
        <article class="education-card" v-for="edu in education" :key="edu.degree">
          <div class="edu-header">
            <div>
              <h3>{{ edu.degree }}</h3>
              <h4>{{ edu.school }}</h4>
            </div>
            <span class="duration mono">{{ edu.duration }}</span>
          </div>

          <div class="minors" v-if="edu.minors">
            <p class="minors-title">Minors:</p>
            <div class="minors-list">
              <span v-for="minor in edu.minors" :key="minor" class="minor-tag">{{ minor }}</span>
            </div>
          </div>

          <div class="coursework" v-if="edu.coursework">
            <p class="coursework-title">Key Coursework:</p>
            <div class="coursework-tags">
              <span v-for="course in edu.coursework" :key="course">{{ course }}</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Certifications strip -->
      <div class="certifications">
        <h3 class="cert-title">Certifications</h3>
        <div class="cert-strip">
          <div class="cert-item" v-for="cert in certifications" :key="cert.name">
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
  name: 'Education',
  data() {
    return {
      education: [
        {
          degree: 'Bachelor of Science in Data Science',
          school: 'Indian Institute of Technology Madras (IIT-M)',
          duration: '2021 – 2025',
          minors: ['Minor in Economics & Finance', 'Minor in Cloud Computing'],
          coursework: [
            'Machine Learning', 'Deep Learning', 'Neural Networks',
            'Statistical Analysis', 'Data Mining', 'Computer Vision',
            'Natural Language Processing', 'Big Data Analytics'
          ]
        }
      ],
      certifications: [
        { name: 'NPTEL Cloud Computing', issuer: 'IIT Kharagpur / NPTEL' },
        { name: 'Supervised Machine Learning', issuer: 'Stanford / Coursera' },
        { name: 'NPTEL Data Mining', issuer: 'IIT Kharagpur / NPTEL' },
        { name: 'NPTEL Emotional Intelligence', issuer: 'IIT / NPTEL' },
        { name: 'Advanced MCP', issuer: 'Anthropic' },
        { name: 'DP-800', issuer: 'Microsoft Azure' }
      ]
    }
  }
}
</script>

<style scoped>
.education {
  background: var(--bg-secondary);
}

.education-grid {
  margin-bottom: 3rem;
}

.education-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 2rem;
  border: 1px solid var(--border);
  transition: all var(--transition-base);
}

.education-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-md);
}

.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);
}

.edu-header h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.2rem;
  letter-spacing: -0.01em;
}

.edu-header h4 {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.duration {
  font-size: 0.85rem;
  color: var(--primary);
  font-weight: 600;
  white-space: nowrap;
}

.minors {
  margin-bottom: 1.5rem;
}

.minors-title,
.coursework-title {
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
}

.minors-list {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.minor-tag {
  padding: 0.35rem 0.9rem;
  background: var(--accent-subtle);
  color: var(--primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 500;
}

.coursework-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.coursework-tags span {
  padding: 0.25rem 0.7rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  border: 1px solid transparent;
  transition: all var(--transition-fast);
}

.coursework-tags span:hover {
  color: var(--primary);
  border-color: var(--primary);
}

/* Certifications strip */
.certifications {
  text-align: center;
}

.cert-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text);
}

.cert-strip {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.cert-item {
  background: var(--card-bg);
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  text-align: left;
  transition: all var(--transition-base);
}

.cert-item:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.cert-item h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.15rem;
}

.cert-item p {
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .edu-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .education-card {
    padding: 1.5rem;
  }

  .cert-strip {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .cert-strip {
    grid-template-columns: 1fr;
  }
}
</style>
