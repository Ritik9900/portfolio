<template>
  <section class="expertise section" id="expertise">
    <div class="container">
      <h2 class="section-title">Technical Expertise</h2>
      <div class="expertise-grid">
        <article class="expertise-card" v-for="area in expertiseAreas" :key="area.domain">
          <div class="expertise-header">
            <h3>{{ area.domain }}</h3>
            <span class="depth-signal mono" v-if="area.depthSignal">{{ area.depthSignal }}</span>
          </div>
          <div class="expertise-tools">
            <span class="tool-tag" v-for="tool in area.tools" :key="tool">{{ tool }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Expertise',
  data() {
    return {
      expertiseAreas: [
        {
          domain: 'Retrieval & GenAI',
          tools: ['LangGraph', 'Hybrid Search (pgvector + BM25 + RRF)', 'Cross-encoder Reranking', 'Semantic Chunking', 'VLM Image Summarization', 'Azure OpenAI GPT-4o'],
          depthSignal: '91% precision vs 68% baseline'
        },
        {
          domain: 'Backend Systems',
          tools: ['FastAPI Microservices', 'PostgreSQL + pgvector', 'Redis / ElastiCache', 'REST + Signed-URL Security', 'Docker'],
          depthSignal: '7-service platform'
        },
        {
          domain: 'LLM Observability',
          tools: ['Langfuse Distributed Tracing', 'Trace-context Propagation', 'Decorator-based Auto-instrumentation', 'Token-level Cost Attribution'],
          depthSignal: '14-node pipeline instrumented'
        },
        {
          domain: 'Cloud & MLOps',
          tools: ['AWS (EC2, ECS Fargate, RDS, ALB, Spot GPU)', 'Terraform', 'GitHub Actions CI/CD', 'Microsoft Graph & Confluence APIs'],
          depthSignal: 'Auto-scaling 2→10 containers'
        },
        {
          domain: 'Deep Learning',
          tools: ['PyTorch (Mixed-precision, Multi-GPU)', 'ViT Audio Classifiers', 'YOLOv8', 'Super-resolution GANs'],
          depthSignal: '3× top-8% Kaggle'
        },
        {
          domain: 'Languages & Data',
          tools: ['Python', 'SQL', 'Java', 'Bash', 'JavaScript', 'PySpark', 'Kafka'],
          depthSignal: null
        }
      ]
    }
  }
}
</script>

<style scoped>
.expertise {
  background: var(--bg);
}

.expertise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.25rem;
}

.expertise-card {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  transition: all var(--transition-base);
}

.expertise-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.expertise-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.expertise-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}

.depth-signal {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--primary);
  background: var(--accent-subtle);
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  white-space: nowrap;
  flex-shrink: 0;
}

.expertise-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tool-tag {
  padding: 0.3rem 0.7rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  border: 1px solid transparent;
}

.tool-tag:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--accent-subtle);
}

@media (max-width: 768px) {
  .expertise-grid {
    grid-template-columns: 1fr;
  }

  .expertise-header {
    flex-direction: column;
  }
}
</style>
