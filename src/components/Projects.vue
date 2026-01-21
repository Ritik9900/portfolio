<template>
  <section class="projects section" id="projects">
    <div class="container">
      <h2 class="section-title">Featured Projects</h2>
      <div class="projects-grid">
        <div class="project-card" v-for="project in projects" :key="project.title">
          <div class="project-content">
            <div class="project-header">
              <h3>{{ project.title }}</h3>
              <div class="project-links">
                <a :href="project.github" target="_blank" aria-label="GitHub" v-if="project.github">
                  GitHub
                </a>
                <a :href="project.demo" target="_blank" aria-label="Live Demo" v-if="project.demo" class="demo-link">
                  Live Demo
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
          description: 'Deep learning model for multi-class image classification using CNNs. Achieved 95%+ accuracy on custom dataset with data augmentation and transfer learning.',
          tags: ['PyTorch', 'CNN', 'Transfer Learning', 'Flask', 'Docker'],
          github: 'https://github.com/yourusername/project',
          demo: 'https://demo-link.com'
        },
        {
          title: 'NLP Sentiment Analysis',
          description: 'Advanced sentiment analysis system using transformers and BERT. Processes customer reviews and provides detailed sentiment insights with visualization.',
          tags: ['Python', 'BERT', 'NLP', 'Transformers', 'FastAPI'],
          github: 'https://github.com/yourusername/project',
          demo: null
        },
        {
          title: 'Unity Multiplayer Backend',
          description: 'Scalable backend system for Unity multiplayer game with real-time synchronization, player matchmaking, and leaderboard functionality.',
          tags: ['Node.js', 'Socket.io', 'MongoDB', 'Unity', 'C#'],
          github: 'https://github.com/yourusername/project',
          demo: null
        },
        {
          title: 'Real-Time Object Detection',
          description: 'Real-time object detection application using YOLO and OpenCV. Capable of detecting multiple objects with bounding boxes and confidence scores.',
          tags: ['Python', 'YOLO', 'OpenCV', 'TensorFlow', 'Streamlit'],
          github: 'https://github.com/yourusername/project',
          demo: 'https://demo-link.com'
        },
        {
          title: 'Data Analytics Dashboard',
          description: 'Interactive dashboard for analysis and visualization using Vue.js. Features include real-time charts, filtering, and export capabilities.',
          tags: ['Vue.js', 'D3.js', 'Python', 'Pandas', 'API'],
          github: 'https://github.com/yourusername/project',
          demo: 'https://demo-link.com'
        },
        {
          title: 'AI Recommendation Engine',
          description: 'Machine learning-based recommendation engine using collaborative filtering and content-based approaches. Deployed with FastAPI for production.',
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
  background: var(--bg);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
  border-color: var(--primary);
}

.project-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.project-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.project-links {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

.project-links a {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-light);
  text-decoration: none;
  transition: color 0.2s ease;
}

.project-links a:hover {
  color: var(--primary);
}

.project-links .demo-link {
  color: var(--primary);
}

.project-content p {
  color: var(--text-light);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  flex-grow: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: auto;
}

.tag {
  padding: 0.3rem 0.8rem;
  background: var(--bg-secondary);
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text);
  transition: all 0.2s ease;
}

.project-card:hover .tag {
  background: var(--bg);
  color: var(--primary);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>

