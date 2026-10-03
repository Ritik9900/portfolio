<template>
  <section class="hero" id="home">
    <div class="hero-bg"></div>

    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="headline fade-in-up">
            I build production RAG systems and the observability that keeps them honest.
          </h1>
          <p class="sub-headline fade-in-up" style="animation-delay: 0.1s">
            GenAI/ML Engineer · IIT Madras (BS, Data Science) · Currently engineering a 7-microservice
            enterprise retrieval platform at Ascendion for Charter Communications.
          </p>
          <p class="summary fade-in-up" style="animation-delay: 0.2s">
            I design and ship retrieval-augmented generation systems end to end — hybrid search
            (dense + BM25 + Reciprocal Rank Fusion), cross-encoder reranking, stateful LangGraph
            ingestion pipelines, and distributed tracing with per-query LLM cost attribution.
            My work runs in production on AWS (ECS Fargate, RDS, ElastiCache) behind FastAPI
            services serving 500+ concurrent users at 99.9% availability.
          </p>
          <div class="hero-ctas fade-in-up" style="animation-delay: 0.3s">
            <a href="#projects" class="btn btn-primary">Read the RAG case study →</a>
            <button @click="openPdf" class="btn btn-secondary">Resume (PDF)</button>
          </div>
          <div class="hero-links fade-in-up" style="animation-delay: 0.4s">
            <a href="https://github.com/Ritik9900" target="_blank" rel="noopener" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/ritik-ranjan9900/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://www.kaggle.com/ritik9929" target="_blank" rel="noopener" aria-label="Kaggle">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.075.312z"/>
              </svg>
            </a>
            <a href="mailto:ritik.ranjan9900@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>

        <!-- RAG Architecture Diagram -->
        <div class="hero-visual fade-in" style="animation-delay: 0.3s">
          <div class="arch-diagram">
            <div class="arch-header">
              <span class="arch-label">Enterprise RAG Platform</span>
              <span class="arch-metric mono">68% → 91% precision</span>
            </div>
            <div class="arch-pipeline">
              <div class="arch-node">
                <div class="node-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <span class="node-label">Ingestion</span>
                <span class="node-detail mono">LangGraph · 14 nodes</span>
              </div>
              <div class="arch-arrow">→</div>
              <div class="arch-node">
                <div class="node-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <span class="node-label">Hybrid Search</span>
                <span class="node-detail mono">BM25 + pgvector + RRF</span>
              </div>
              <div class="arch-arrow">→</div>
              <div class="arch-node">
                <div class="node-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <span class="node-label">Rerank</span>
                <span class="node-detail mono">Cross-encoder</span>
              </div>
              <div class="arch-arrow">→</div>
              <div class="arch-node">
                <div class="node-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <span class="node-label">Synthesis</span>
                <span class="node-detail mono">GPT-4o</span>
              </div>
            </div>
            <div class="arch-footer">
              <span class="arch-tag">Langfuse tracing</span>
              <span class="arch-tag">4 services instrumented</span>
              <span class="arch-tag">per-query cost attribution</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Proof Metrics Row -->
      <div class="proof-row fade-in-up" style="animation-delay: 0.5s">
        <a href="#projects" class="proof-tile">
          <span class="proof-value mono">~91%</span>
          <span class="proof-label">Retrieval precision</span>
        </a>
        <a href="#experience" class="proof-tile">
          <span class="proof-value mono">500+</span>
          <span class="proof-label">Concurrent users @ 99.9%</span>
        </a>
        <a href="#projects" class="proof-tile">
          <span class="proof-value mono">Top 4.5%</span>
          <span class="proof-label">Kaggle · IndicTTS</span>
        </a>
      </div>
    </div>

    <!-- PDF Modal -->
    <PdfModal
      :is-open="modalOpen"
      :pdf-url="currentPdfUrl"
      :title="currentPdfTitle"
      @close="closeModal"
    />
  </section>
</template>

<script>
import PdfModal from './PdfModal.vue'

export default {
  name: 'Hero',
  components: {
    PdfModal
  },
  data() {
    return {
      modalOpen: false,
      currentPdfUrl: `${import.meta.env.BASE_URL}documents/Ritik_Ranjan_IIT-M.pdf#toolbar=0&navpanes=0&scrollbar=0`,
      currentPdfTitle: 'Resume / CV'
    }
  },
  methods: {
    openPdf() {
      this.modalOpen = true
    },
    closeModal() {
      this.modalOpen = false
    }
  }
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding-top: 80px;
  padding-bottom: 2rem;
  background: var(--bg);
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse 60% 50% at 20% 30%, var(--accent-subtle), transparent),
    radial-gradient(ellipse 40% 40% at 80% 70%, rgba(37, 99, 235, 0.04), transparent);
  pointer-events: none;
}

.hero .container {
  position: relative;
  z-index: 1;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 3rem;
}

/* --- Text column --- */
.headline {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--text);
  margin-bottom: 1rem;
}

.sub-headline {
  font-size: 1.05rem;
  color: var(--primary);
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.summary {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 560px;
}

.hero-ctas {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.8rem 1.75rem;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all var(--transition-base);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-2px);
}

.hero-links {
  display: flex;
  gap: 0.75rem;
}

.hero-links a {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all var(--transition-base);
}

.hero-links a:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  transform: translateY(-2px);
}

/* --- Architecture Diagram --- */
.arch-diagram {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-lg);
}

.arch-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.arch-label {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text);
}

.arch-metric {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary);
  background: var(--accent-subtle);
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
}

.arch-pipeline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.arch-node {
  flex: 1;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 0.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast);
}

.arch-node:hover {
  border-color: var(--primary);
}

.node-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.node-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text);
  text-align: center;
}

.node-detail {
  font-size: 0.65rem;
  color: var(--text-tertiary);
  text-align: center;
  line-height: 1.3;
}

.arch-arrow {
  color: var(--text-tertiary);
  font-size: 1.2rem;
  flex-shrink: 0;
  font-weight: 300;
}

.arch-footer {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.arch-tag {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--text-tertiary);
  background: var(--bg-secondary);
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  border: 1px solid var(--border);
}

/* --- Proof Row --- */
.proof-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  max-width: 800px;
  margin: 0 auto;
}

.proof-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 1.25rem 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-base);
}

.proof-tile:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.proof-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: -0.02em;
}

.proof-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-align: center;
}

/* --- Responsive --- */
@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .headline {
    font-size: 2rem;
  }

  .hero-visual {
    order: -1;
  }
}

@media (max-width: 640px) {
  .headline {
    font-size: 1.65rem;
  }

  .hero-ctas {
    flex-direction: column;
  }

  .btn {
    text-align: center;
    justify-content: center;
  }

  .proof-row {
    grid-template-columns: 1fr;
  }

  .arch-pipeline {
    flex-direction: column;
  }

  .arch-arrow {
    transform: rotate(90deg);
  }
}
</style>
