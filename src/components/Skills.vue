<template>
  <section class="skills section" id="skills">
    <div class="container">
      <h2 class="section-title">Skills & Technologies</h2>
      <div class="skills-grid">
        <div class="skill-category" v-for="category in skillCategories" :key="category.title">
          <h3>{{ category.title }}</h3>
          <div class="skills-list">
            <span class="skill-tag" v-for="skill in category.skills" :key="skill">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Skills',
  data() {
    return {
      skillCategories: [
        {
          title: 'AI/ML & Deep Learning',
          skills: [
            'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn',
            'Neural Networks', 'Computer Vision', 'NLP', 'Model Deployment'
          ]
        },
        {
          title: 'Programming Languages',
          skills: [
            'Python', 'JavaScript', 'C#', 'SQL', 'TypeScript', 'R'
          ]
        },
        {
          title: 'Frontend Development',
          skills: [
            'Vue.js', 'HTML5', 'CSS3', 'Responsive Design',
            'JavaScript ES6+', 'Vite', 'UI/UX Design'
          ]
        },
        {
          title: 'Backend & Databases',
          skills: [
            'Node.js', 'Unity Backend', 'REST APIs',
            'MongoDB', 'PostgreSQL', 'Firebase', 'Docker'
          ]
        },
        {
          title: 'Data Science',
          skills: [
            'Pandas', 'NumPy', 'Matplotlib', 'Seaborn',
            'Jupyter', 'Statistical Analysis', 'Data Visualization'
          ]
        },
        {
          title: 'Tools & Platforms',
          skills: [
            'Git & GitHub', 'VS Code', 'Unity', 'AWS',
            'Google Cloud', 'Linux', 'Agile/Scrum'
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.skills {
  background: var(--bg);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-category {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.skill-category::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--primary);
  opacity: 0.7;
}

.skill-category:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border-color: var(--primary);
}

.skill-category h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text);
  letter-spacing: -0.02em;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.skill-tag {
  padding: 0.4rem 0.9rem;
  background: var(--bg-secondary);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--text);
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.skill-tag:hover {
  background: var(--bg);
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .skill-category {
    padding: 1.5rem;
  }
}
</style>

