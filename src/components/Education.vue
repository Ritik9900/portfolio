<template>
  <section class="education section" id="education">
    <div class="container">
      <h2 class="section-title">Education</h2>
      <div class="education-grid">
        <div class="education-card" v-for="edu in education" :key="edu.degree">
          <div class="edu-icon" :style="{ background: edu.gradient }">
            {{ edu.icon }}
          </div>
          <div class="edu-content">
            <h3>{{ edu.degree }}</h3>
            <h4>{{ edu.school }}</h4>
            <p class="duration">{{ edu.duration }}</p>
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
        <h3>Certifications & Achievements</h3>
        <div class="cert-grid">
          <div class="cert-item" v-for="cert in certifications" :key="cert.name">
            <div class="cert-icon">{{ cert.icon }}</div>
            <div>
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
          icon: '🎓',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minors: ['Minor in Economics & Finance', 'Minor in Cloud Computing'],
          highlights: [
            'GPA: 8.0/10.0',
            'Dean\'s List (All Semesters)',
            'Research Assistant in AI Lab',
            'Published research paper on deep learning applications'
          ],
          coursework: [
            'Machine Learning',
            'Deep Learning',
            'Neural Networks',
            'Statistical Analysis',
            'Data Mining',
            'Computer Vision',
            'Natural Language Processing',
            'Big Data Analytics'
          ]
        }
      ],
      certifications: [
        {
          name: 'TensorFlow Developer Certificate',
          issuer: 'Google',
          icon: '📜'
        },
        {
          name: 'AWS Machine Learning Specialty',
          issuer: 'Amazon Web Services',
          icon: '☁️'
        },
        {
          name: 'Deep Learning Specialization',
          issuer: 'DeepLearning.AI',
          icon: '🧠'
        },
        {
          name: 'Vue.js Certification',
          issuer: 'Vue School',
          icon: '✅'
        }
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
  max-width: 900px;
  margin: 0 auto 4rem;
}

.education-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.education-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.edu-icon {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.edu-content {
  flex: 1;
}

.edu-content h3 {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.edu-content h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.duration {
  color: var(--text-light);
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.minors {
  margin-bottom: 1.5rem;
}

.minors-title {
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.8rem;
}

.minors-list {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.minor-tag {
  padding: 0.5rem 1.2rem;
  background: var(--gradient-1);
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
}

.highlights {
  list-style: none;
  margin-bottom: 1.5rem;
}

.highlights li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.6rem;
  color: var(--text-light);
}

.highlights li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: bold;
}

.coursework {
  margin-top: 1.5rem;
}

.coursework-title {
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.8rem;
}

.coursework-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.coursework-tags span {
  padding: 0.4rem 0.9rem;
  background: var(--bg-secondary);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text);
  border: 1px solid var(--border);
}

.certifications {
  max-width: 900px;
  margin: 0 auto;
}

.certifications h3 {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
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
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.cert-item:hover {
  transform: translateY(-3px);
}

.cert-icon {
  width: 50px;
  height: 50px;
  background: var(--bg-secondary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.cert-item h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.2rem;
}

.cert-item p {
  font-size: 0.85rem;
  color: var(--text-light);
}

@media (max-width: 768px) {
  .education-card {
    flex-direction: column;
    gap: 1.5rem;
  }

  .edu-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }

  .cert-grid {
    grid-template-columns: 1fr;
  }
}
</style>

