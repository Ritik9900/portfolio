<template>
  <section class="education section" id="education">
    <div class="container">
      <h2 class="section-title">Education</h2>
      <div class="education-grid">
        <div class="education-card" v-for="edu in education" :key="edu.degree">
          <div class="edu-content">
            <div class="edu-header">
              <div>
                <h3>{{ edu.degree }}</h3>
                <h4>{{ edu.school }}</h4>
              </div>
              <span class="duration">{{ edu.duration }}</span>
            </div>
            
            <div class="minors" v-if="edu.minors">
              <p class="minors-title">Minors:</p>
              <div class="minors-list">
                <span v-for="minor in edu.minors" :key="minor" class="minor-tag">
                  {{ minor }}
                </span>
              </div>
            </div>

            <ul class="highlights" v-if="edu.highlights">
              <li v-for="highlight in edu.highlights" :key="highlight">
                {{ highlight }}
              </li>
            </ul>

            <div class="coursework" v-if="edu.coursework">
              <p class="coursework-title">Key Coursework:</p>
              <div class="coursework-tags">
                <span v-for="course in edu.coursework" :key="course">
                  {{ course }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="certifications">
        <h3 class="cert-title">Certifications & Achievements</h3>
        <div class="cert-grid">
          <div class="cert-item" v-for="cert in certifications" :key="cert.name">
            <div class="cert-content">
              <h4>{{ cert.name }}</h4>
              <p>{{ cert.issuer }}</p>
            </div>
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
          duration: '2021 - 2025',
          minors: ['Minor in Economics & Finance', 'Minor in Cloud Computing'],
          highlights: [
            'GPA: 8.0/10.0',
            'Dean\'s List (All Semesters)',
            'Research Assistant in AI Lab',
            'Published research paper on deep learning applications'
          ],
          coursework: [
            'Machine Learning', 'Deep Learning', 'Neural Networks',
            'Statistical Analysis', 'Data Mining', 'Computer Vision',
            'Natural Language Processing', 'Big Data Analytics'
          ]
        }
      ],
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
.education {
  background: var(--bg-secondary);
}

.education-grid {
  width: 100%;
  max-width: 100%;
  margin: 0 auto 4rem;
}

.education-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2.5rem;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.education-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-color: var(--primary);
}

.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.edu-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.3rem;
  letter-spacing: -0.01em;
}

.edu-header h4 {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-light);
}

.duration {
  font-size: 0.95rem;
  color: var(--primary);
  font-weight: 500;
  white-space: nowrap;
}

.minors {
  margin-bottom: 1.5rem;
}

.minors-title {
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
}

.minors-list {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.minor-tag {
  padding: 0.4rem 1rem;
  background: var(--bg-secondary); /* Clean background instead of gradient */
  color: var(--primary);
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
}

.highlights {
  list-style: none;
  margin-bottom: 2rem;
}

.highlights li {
  position: relative;
  padding-left: 1.2rem;
  margin-bottom: 0.6rem;
  color: var(--text);
  font-size: 0.95rem;
  line-height: 1.6;
}

.highlights li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--text-light);
}

.coursework-title {
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
}

.coursework-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.coursework-tags span {
  padding: 0.3rem 0.8rem;
  background: var(--bg);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-light);
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.coursework-tags span:hover {
  color: var(--primary);
  background: var(--bg-secondary);
}

.certifications {
  width: 100%;
  max-width: 100%;
}

.cert-title {
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
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
}

.cert-item:hover {
  transform: translateY(-3px);
  border-color: var(--primary);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.cert-item h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.3rem;
}

.cert-item p {
  font-size: 0.85rem;
  color: var(--text-light);
}

@media (max-width: 768px) {
  .edu-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .duration {
    align-self: flex-start;
  }
  
  .education-card {
    padding: 1.5rem;
  }
}
</style>

