<template>
  <section class="projects section" id="projects">
    <div class="container">
      <h2 class="section-title">Featured Projects</h2>

      <!-- Filter buttons -->
      <div class="filter-bar">
        <button
          v-for="filter in filters"
          :key="filter.value"
          class="filter-btn mono"
          :class="{ active: activeFilter === filter.value }"
          :aria-pressed="activeFilter === filter.value"
          @click="setFilter(filter.value)"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Flagship project -->
      <article
        class="project-card flagship"
        :class="{ hidden: activeFilter !== 'all' && !flagship.tags.includes(activeFilter) }"
      >
        <div class="flagship-badge mono">Flagship</div>
        <div class="project-content">
          <div class="project-header">
            <h3>{{ flagship.title }}</h3>
            <div class="project-links">
              <a v-if="flagship.github" :href="flagship.github" target="_blank" rel="noopener">GitHub</a>
            </div>
          </div>
          <p>{{ flagship.description }}</p>
          <div class="project-tags">
            <span v-for="tag in flagship.displayTags" :key="tag" class="tag mono">{{ tag }}</span>
          </div>
        </div>
      </article>

      <!-- Project grid -->
      <div class="projects-grid">
        <article
          class="project-card"
          v-for="project in projects"
          :key="project.title"
          :class="{ hidden: activeFilter !== 'all' && !project.tags.includes(activeFilter) }"
        >
          <div class="project-content">
            <div class="project-header">
              <div>
                <h3>{{ project.title }}</h3>
                <span class="project-rank mono" v-if="project.rank">{{ project.rank }}</span>
              </div>
              <div class="project-links">
                <a v-if="project.github" :href="project.github" target="_blank" rel="noopener">GitHub</a>
                <a v-if="project.kaggle" :href="project.kaggle" target="_blank" rel="noopener" class="demo-link">Kaggle</a>
              </div>
            </div>
            <p>{{ project.description }}</p>
            <div class="project-tags">
              <span v-for="tag in project.displayTags" :key="tag" class="tag mono">{{ tag }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {
      activeFilter: 'all',
      filters: [
        { label: 'All', value: 'all' },
        { label: 'RAG', value: 'rag' },
        { label: 'Deep Learning', value: 'dl' },
        { label: 'MLOps', value: 'mlops' },
        { label: 'NLP', value: 'nlp' }
      ],
      flagship: {
        title: 'Enterprise RAG Platform',
        description: 'Architected a 7-microservice system for document ingestion, hybrid search, and conversational Q&A over enterprise knowledge bases. Raised retrieval precision from ~68% to ~91% with hybrid search (BM25 + pgvector + RRF) and cross-encoder reranking. End-to-end Langfuse tracing across 4 services with per-query LLM cost attribution.',
        tags: ['rag', 'mlops'],
        displayTags: ['LangGraph', 'FastAPI', 'pgvector', 'GPT-4o', 'Langfuse', 'AWS ECS', 'Docker'],
        github: null
      },
      projects: [
        {
          title: 'IndicTTS Deepfake Detection',
          rank: 'Top 4.5% (9/201)',
          description: 'Built a multilingual deepfake-speech detector achieving 0.923 ROC-AUC across 16 Indian languages by training a ViT on Mel spectrograms over 33K+ clips (~63 hrs); mixed-precision + multi-GPU training improved accuracy 12% while cutting epoch time 40%.',
          tags: ['dl'],
          displayTags: ['PyTorch', 'ViT', 'Mixed-precision', 'Multi-GPU', 'Audio ML'],
          github: 'https://github.com/Ritik9900',
          kaggle: 'https://www.kaggle.com/ritik9929'
        },
        {
          title: 'Low-Light Denoising & 4× Super-Resolution',
          rank: 'Top 6.2% (13/210)',
          description: 'Engineered a two-stage PyTorch pipeline — MRPNet denoising followed by a PixelShuffle generator for 4× upscaling — and fine-tuned PSNR-focused objectives over 70 epochs to place 13th of 210 on a low-light benchmark.',
          tags: ['dl'],
          displayTags: ['PyTorch', 'MRPNet', 'Super-resolution GAN', 'Computer Vision'],
          github: 'https://github.com/Ritik9900',
          kaggle: 'https://www.kaggle.com/ritik9929'
        },
        {
          title: 'GenAI Integration for SEEK Learning Platform',
          rank: 'PM/Tech Lead · 7 engineers',
          description: 'Led Agile delivery of a working prototype shipping three GenAI features (automated code feedback, interactive content generation, learner support) across multiple sprints.',
          tags: ['rag', 'nlp'],
          displayTags: ['GenAI', 'Agile', 'Product Management', 'LLM Integration'],
          github: null,
          kaggle: null
        },
        {
          title: 'Sentiment Classification at Scale',
          rank: 'Top 8% (79/977)',
          description: 'Reached 83.20% micro-F1 on 50K+ movie reviews with a leakage-safe XGBoost/Scikit-learn pipeline.',
          tags: ['nlp', 'dl'],
          displayTags: ['XGBoost', 'Scikit-learn', 'NLP', 'Feature Engineering'],
          github: 'https://github.com/Ritik9900',
          kaggle: 'https://www.kaggle.com/ritik9929'
        }
      ]
    }
  },
  mounted() {
    this.readFilterFromHash()
    window.addEventListener('hashchange', this.readFilterFromHash)
  },
  beforeUnmount() {
    window.removeEventListener('hashchange', this.readFilterFromHash)
  },
  methods: {
    setFilter(value) {
      this.activeFilter = value
      if (value === 'all') {
        history.replaceState(null, '', '#projects')
      } else {
        history.replaceState(null, '', `#projects?tag=${value}`)
      }
    },
    readFilterFromHash() {
      const hash = window.location.hash
      if (hash.startsWith('#projects?tag=')) {
        const tag = hash.replace('#projects?tag=', '')
        const valid = this.filters.some(f => f.value === tag)
        if (valid) {
          this.activeFilter = tag
        }
      }
    }
  }
}
</script>

<style scoped>
.projects {
  background: var(--bg);
}

/* Filter bar */
.filter-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.4rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

/* Cards */
.project-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  transition: all var(--transition-base);
  overflow: hidden;
}

.project-card.hidden {
  display: none;
}

.project-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
}

/* Flagship card */
.flagship {
  margin-bottom: 1.5rem;
  position: relative;
  border-color: var(--primary);
  background: linear-gradient(135deg, var(--accent-subtle), transparent 60%);
}

.flagship-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: white;
  background: var(--gradient-primary);
  padding: 0.2rem 0.75rem;
  border-radius: 100px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

.project-content {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;
}

.project-header h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.project-rank {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary);
  margin-top: 0.25rem;
}

.project-links {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}

.project-links a {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-tertiary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.project-links a:hover {
  color: var(--primary);
}

.project-links .demo-link {
  color: var(--primary);
}

.project-content > p {
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
  flex-grow: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
}

.tag {
  padding: 0.25rem 0.6rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.project-card:hover .tag {
  color: var(--primary);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
