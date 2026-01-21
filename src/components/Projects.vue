<template>
  <section class="projects section" id="projects">
    <div class="container">
      <h2 class="section-title">Featured Projects</h2>
      <div class="projects-grid">
        <div class="project-card" v-for="project in projects" :key="project.title">
          <div class="project-image" :style="{ background: project.gradient }">
            <span class="project-emoji">{{ project.icon }}</span>
          </div>
          <div class="project-content">
            <div class="project-header">
              <h3>{{ project.title }}</h3>
              <div class="project-links">
                <a :href="project.github" target="_blank" aria-label="GitHub" v-if="project.github">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a :href="project.demo" target="_blank" aria-label="Live Demo" v-if="project.demo">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
            <p>{{ project.description }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {
      projects: [
        {
          title: 'Image Classification System',
          icon: '🖼️',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          description: 'Deep learning model for multi-class image classification using CNNs. Achieved 95%+ accuracy on custom dataset with data augmentation and transfer learning.',
          tags: ['PyTorch', 'CNN', 'Transfer Learning', 'Flask', 'Docker'],
          github: 'https://github.com/yourusername/project',
          demo: 'https://demo-link.com'
        },
        {
          title: 'NLP Sentiment Analysis',
          icon: '💬',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          description: 'Advanced sentiment analysis system using transformers and BERT. Processes customer reviews and provides detailed sentiment insights with visualization.',
          tags: ['Python', 'BERT', 'NLP', 'Transformers', 'FastAPI'],
          github: 'https://github.com/yourusername/project',
          demo: null
        },
        {
          title: 'Unity Multiplayer Game Backend',
          icon: '🎮',
          gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          description: 'Scalable backend system for Unity multiplayer game with real-time synchronization, player matchmaking, and leaderboard functionality.',
          tags: ['Node.js', 'Socket.io', 'MongoDB', 'Unity', 'C#', 'Redis'],
          github: 'https://github.com/yourusername/project',
          demo: null
        },
        {
          title: 'Real-Time Object Detection',
          icon: '📹',
          gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          description: 'Real-time object detection application using YOLO and OpenCV. Capable of detecting multiple objects with bounding boxes and confidence scores.',
          tags: ['Python', 'YOLO', 'OpenCV', 'TensorFlow', 'Streamlit'],
          github: 'https://github.com/yourusername/project',
          demo: 'https://demo-link.com'
        },
        {
          title: 'Data Visualization Dashboard',
          icon: '📊',
          gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          description: 'Interactive dashboard for data analysis and visualization using Vue.js. Features include real-time charts, filtering, and export capabilities.',
          tags: ['Vue.js', 'D3.js', 'Python', 'Pandas', 'API'],
          github: 'https://github.com/yourusername/project',
          demo: 'https://demo-link.com'
        },
        {
          title: 'Recommendation System',
          icon: '🎯',
          gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
          description: 'Machine learning-based recommendation engine using collaborative filtering and content-based approaches. Deployed with FastAPI for production use.',
          tags: ['Python', 'Scikit-learn', 'FastAPI', 'SQL', 'AWS'],
          github: 'https://github.com/yourusername/project',
          demo: null
        }
      ]
    }
  }
}
</script>

<style scoped>
.projects {
  background: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid var(--border);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: var(--primary);
}

.project-image {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.project-emoji {
  font-size: 4rem;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2));
}

.project-content {
  padding: 1.8rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
}

.project-header h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
  flex: 1;
}

.project-links {
  display: flex;
  gap: 0.8rem;
}

.project-links a {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  transition: all 0.3s ease;
}

.project-links a:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

.project-content p {
  color: var(--text-light);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.tag {
  padding: 0.4rem 0.9rem;
  background: var(--bg-secondary);
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--primary);
  border: 1px solid var(--border);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>

