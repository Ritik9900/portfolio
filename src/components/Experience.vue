<template>
  <section class="experience section" id="experience">
    <div class="container">
      <h2 class="section-title">Work Experience</h2>
      <div class="timeline">
        <div class="timeline-item" v-for="(job, index) in jobs" :key="index">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="job-header">
              <div>
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

.timeline {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--gradient-1);
}

.timeline-item {
  position: relative;
  padding-left: 60px;
  padding-bottom: 3rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: 10px;
  top: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--gradient-1);
  border: 4px solid var(--bg-secondary);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
  z-index: 1;
}

.timeline-content {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-content:hover {
  transform: translateX(10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.job-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.3rem;
}

.job-header h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary);
}

.duration {
  padding: 0.4rem 1rem;
  background: var(--bg-secondary);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-light);
  white-space: nowrap;
}

.responsibilities {
  list-style: none;
  margin-bottom: 1.5rem;
}

.responsibilities li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.8rem;
  color: var(--text-light);
  line-height: 1.6;
}

.responsibilities li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--primary);
  font-size: 1.2rem;
  font-weight: bold;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.tech-tag {
  padding: 0.4rem 0.9rem;
  background: var(--bg-secondary);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--primary);
  border: 1px solid var(--border);
}

@media (max-width: 768px) {
  .timeline::before {
    left: 10px;
  }

  .timeline-item {
    padding-left: 45px;
  }

  .timeline-dot {
    left: 0;
  }

  .job-header {
    flex-direction: column;
  }

  .duration {
    align-self: flex-start;
  }
}
</style>

