<template>
  <section class="projects section" id="projects">
    <div class="container">
      <h2 class="section-title">Featured Projects</h2>
      <div class="projects-grid">
        <div class="project-card" v-for="project in projects" :key="project.title">
          <div class="project-image" :style="{ background: project.gradient }">
            <div class="emoji-glass">
              <span class="project-emoji">{{ project.icon }}</span>
            </div>
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
          gradient: 'linear-gradient(135deg, #1A2980 0%, #26D0CE 100%)',
          description: 'Deep learning model for multi-class image classification using CNNs. Achieved 95%+ accuracy on custom dataset with data augmentation and transfer learning.',
          tags: ['PyTorch', 'CNN', 'Transfer Learning', 'Flask', 'Docker'],
          github: 'https://github.com/yourusername/project',
          demo: 'https://demo-link.com'
        },
        {
          title: 'NLP Sentiment Analysis',
          icon: '💬',
          gradient: 'linear-gradient(135deg, #614385 0%, #516395 100%)',
          description: 'Advanced sentiment analysis system using transformers and BERT. Processes customer reviews and provides detailed sentiment insights with visualization.',
          tags: ['Python', 'BERT', 'NLP', 'Transformers', 'FastAPI'],
          github: 'https://github.com/yourusername/project',
          demo: null
        },
        {
          title: 'Unity Multiplayer Backend',
          icon: '🎮',
          gradient: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)',
          description: 'Scalable backend system for Unity multiplayer game with real-time synchronization, player matchmaking, and leaderboard functionality.',
          tags: ['Node.js', 'Socket.io', 'MongoDB', 'Unity', 'C#', 'Redis'],
          github: 'https://github.com/yourusername/project',
          demo: null
        },
        {
          title: 'Real-Time Object Detection',
          icon: '📹',
          gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          description: 'Real-time object detection application using YOLO and OpenCV. Capable of detecting multiple objects with bounding boxes and confidence scores.',
          tags: ['Python', 'YOLO', 'OpenCV', 'TensorFlow', 'Streamlit'],
          github: 'https://github.com/yourusername/project',
          demo: 'https://demo-link.com'
        },
        {
          title: 'Data Analytics Dashboard',
          icon: '📊',
          gradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
          description: 'Interactive dashboard for data analysis and visualization using Vue.js. Features include real-time charts, filtering, and export capabilities.',
          tags: ['Vue.js', 'D3.js', 'Python', 'Pandas', 'API'],
          github: 'https://github.com/yourusername/project',
          demo: 'https://demo-link.com'
        },
        {
          title: 'AI Recommendation Engine',
          icon: '🎯',
          gradient: 'linear-gradient(135deg, #CB356B 0%, #BD3F32 100%)',
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
  background: var(--bg);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
}

.project-card {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.project-image {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Glass effect for emoji container */
.emoji-glass {
  width: 90px;
  height: 90px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  transform: translateY(0);
  transition: transform 0.4s ease;
}

.project-card:hover .emoji-glass {
  transform: scale(1.1) rotate(5deg);
}

.project-emoji {
  font-size: 3.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
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
  align-items: start;
  margin-bottom: 1rem;
}

.project-header h3 {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text);
  margin-right: 1rem;
  line-height: 1.3;
}

.project-links {
  display: flex;
  gap: 0.8rem;
}

.project-links a {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.3s ease;
}

.project-links a:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-3px) rotate(8deg);
  box-shadow: 0 5px 15px rgba(67, 206, 162, 0.3);
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
  padding: 0.35rem 0.85rem;
  background: var(--bg-secondary);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary-dark);
  transition: all 0.2s ease;
}

.project-card:hover .tag {
  background: var(--primary);
  color: white;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>

