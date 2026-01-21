<template>
  <section class="experience section" id="experience">
    <div class="container">
      <h2 class="section-title">Work Experience</h2>
      <div class="experience-list">
        <div class="job-item" v-for="(job, index) in jobs" :key="index">
          <div class="job-header">
            <div class="job-main-info">
              <h3>{{ job.title }}</h3>
              <h4>{{ job.company }}</h4>
            </div>
            <span class="duration">{{ job.duration }}</span>
          </div>
          <ul class="responsibilities">
            <li v-for="(resp, idx) in job.responsibilities" :key="idx">
              {{ resp }}
            </li>
          </ul>
          <div class="technologies">
            <span class="tech-tag" v-for="tech in job.technologies" :key="tech">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Experience',
  data() {
    return {
      jobs: [
        {
          title: 'AI/ML Engineer',
          company: 'Company Name',
          duration: 'Jan 2024 - Present',
          responsibilities: [
            'Developed and deployed deep learning models for computer vision applications, achieving 95% accuracy',
            'Built scalable machine learning pipelines using TensorFlow and PyTorch',
            'Implemented data preprocessing and feature engineering workflows for large datasets',
            'Collaborated with cross-functional teams to integrate ML models into production systems',
            'Optimized model performance and reduced inference time by 40%'
          ],
          technologies: ['Python', 'TensorFlow', 'PyTorch', 'Docker', 'AWS', 'Scikit-learn']
        },
        {
          title: 'Full-Stack Developer (Contract)',
          company: 'Freelance/Previous Company',
          duration: 'Jun 2023 - Dec 2023',
          responsibilities: [
            'Designed and developed responsive frontend applications using Vue.js',
            'Built RESTful APIs and backend services for Unity game applications',
            'Implemented real-time data synchronization between Unity clients and server',
            'Created admin dashboards for game analytics and user management',
            'Improved application performance and user experience'
          ],
          technologies: ['Vue.js', 'Node.js', 'Unity', 'C#', 'MongoDB', 'REST API']
        },
        {
          title: 'Data Science Intern',
          company: 'Company/University',
          duration: 'Jan 2023 - May 2023',
          responsibilities: [
            'Conducted exploratory data analysis on large datasets to extract actionable insights',
            'Built predictive models for business forecasting using machine learning',
            'Created interactive data visualizations using Python libraries',
            'Assisted in research projects related to natural language processing',
            'Documented findings and presented results to stakeholders'
          ],
          technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Jupyter']
        }
      ]
    }
  }
}
</script>

<style scoped>
.experience {
  background: var(--bg-secondary);
}

.experience-list {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.job-item {
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  position: relative;
}

.job-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border-color: var(--primary);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.job-main-info h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.2rem;
  letter-spacing: -0.01em;
}

.job-main-info h4 {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-light);
}

.duration {
  font-size: 0.9rem;
  color: var(--primary);
  font-weight: 500;
  white-space: nowrap;
}

.responsibilities {
  list-style: none;
  margin-bottom: 1.5rem;
}

.responsibilities li {
  position: relative;
  padding-left: 1.2rem;
  margin-bottom: 0.8rem;
  color: var(--text);
  line-height: 1.6;
  font-size: 0.95rem;
}

.responsibilities li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--text-light);
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.tech-tag {
  padding: 0.3rem 0.8rem;
  background: var(--bg);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--primary);
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.tech-tag:hover {
  background: var(--primary);
  color: white;
}

@media (max-width: 768px) {
  .job-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .job-item {
    padding: 1.5rem;
  }
}
</style>

