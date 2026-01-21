<template>
  <section class="skills section" id="skills">
    <div class="container">
      <h2 class="section-title">Skills & Technologies</h2>
      <div class="skills-grid">
        <div class="skill-category" v-for="category in skillCategories" :key="category.title">
          <div class="category-icon" :style="{ background: category.gradient }">
            <span v-html="category.icon"></span>
          </div>
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
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          icon: '🤖',
          skills: [
            'TensorFlow',
            'PyTorch',
            'Keras',
            'Scikit-learn',
            'Neural Networks',
            'Computer Vision',
            'NLP',
            'Model Deployment'
          ]
        },
        {
          title: 'Programming Languages',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          icon: '💻',
          skills: [
            'Python',
            'JavaScript',
            'C#',
            'SQL',
            'TypeScript',
            'R'
          ]
        },
        {
          title: 'Frontend Development',
          gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          icon: '🎨',
          skills: [
            'Vue.js',
            'HTML5',
            'CSS3',
            'Responsive Design',
            'JavaScript ES6+',
            'Vite',
            'UI/UX Design'
          ]
        },
        {
          title: 'Backend & Databases',
          gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          icon: '⚙️',
          skills: [
            'Node.js',
            'Unity Backend',
            'REST APIs',
            'MongoDB',
            'PostgreSQL',
            'Firebase',
            'Docker'
          ]
        },
        {
          title: 'Data Science',
          gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          icon: '📊',
          skills: [
            'Pandas',
            'NumPy',
            'Matplotlib',
            'Seaborn',
            'Jupyter',
            'Statistical Analysis',
            'Data Visualization'
          ]
        },
        {
          title: 'Tools & Platforms',
          gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
          icon: '🛠️',
          skills: [
            'Git & GitHub',
            'VS Code',
            'Unity',
            'AWS',
            'Google Cloud',
            'Linux',
            'Agile/Scrum'
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.skills {
  background: white;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.skill-category {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
}

.skill-category:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-color: var(--primary);
}

.category-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.skill-category h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.skill-tag {
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: default;
}

.skill-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: var(--primary);
  color: white;
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>

