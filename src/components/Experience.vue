<template>
  <section class="experience section" id="experience">
    <div class="container">
      <h2 class="section-title">Work Experience</h2>
      <div class="experience-list">
        <article class="job-item" v-for="(job, index) in jobs" :key="index">
          <div class="job-header">
            <div class="job-main-info">
              <h3>{{ job.title }}</h3>
              <h4>{{ job.company }}</h4>
              <p class="job-context" v-if="job.context">{{ job.context }}</p>
            </div>
            <span class="duration mono">{{ job.duration }}</span>
          </div>
          <ul class="responsibilities">
            <li v-for="(resp, idx) in job.visibleResponsibilities" :key="idx">
              {{ resp }}
            </li>
            <li v-for="(resp, idx) in job.hiddenResponsibilities" :key="'h-' + idx"
                v-show="job.expanded">
              {{ resp }}
            </li>
          </ul>
          <button v-if="job.hiddenResponsibilities && job.hiddenResponsibilities.length > 0"
                  class="show-more-btn"
                  @click="job.expanded = !job.expanded">
            {{ job.expanded ? 'Show less' : `Show ${job.hiddenResponsibilities.length} more` }}
          </button>
          <div class="technologies">
            <span class="tech-tag mono" v-for="tech in job.technologies" :key="tech">
              {{ tech }}
            </span>
          </div>
        </article>
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
          title: 'GenAI/ML Engineer',
          company: 'Ascendion (Client: Charter Communications)',
          duration: 'Dec 2025 – Present',
          context: 'Flagship: Enterprise RAG Platform — 7-microservice system for document ingestion, hybrid search, and conversational Q&A over enterprise knowledge bases (SharePoint, Confluence).',
          visibleResponsibilities: [
            'Architected a 7-microservice RAG platform (FastAPI, Angular, PostgreSQL + pgvector, Docker) spanning ingestion, retrieval, orchestration, and admin services — enabling conversational Q&A over enterprise SharePoint and Confluence corpora.',
            'Raised retrieval precision from ~68% to ~91% by building a LangGraph hybrid-search pipeline that fuses dense vector search and BM25 via Reciprocal Rank Fusion, then reranks with a cross-encoder before GPT-4o answer synthesis.',
            'Eliminated silent ingestion failures by designing a resilient, stateful LangGraph pipeline (IBM Docling parsing, VLM image summarization, semantic chunking, embedding generation) with circuit breakers, exponential-backoff retries, and resumable checkpointing.',
            'Delivered per-query and per-ingestion-job cost attribution by implementing end-to-end Langfuse tracing across 4 microservices (trace context propagated via HTTP headers) and threading token-usage data through embedding and VLM calls.'
          ],
          hiddenResponsibilities: [
            'Automated enterprise knowledge sync by building a scheduled batch-ingestion service over Microsoft Graph (SharePoint) and Confluence Cloud APIs that discovers and ingests new/changed source documents without manual triggers.',
            'Restored system-wide trace visibility and LLM cost tracking by diagnosing and fixing production bugs — broken exception handling in Python context managers and missing trace-ID propagation — that were silently disabling distributed tracing.',
            'Instrumented a 14-node LangGraph pipeline with zero changes to node implementations by introducing decorator-based auto-instrumentation — full observability as a cross-cutting concern.',
            'Scaled multimodal ingestion to 300+ visual elements per document (charts, tables, images) with VLM-generated, deduplication-cached summaries; sustained 500+ concurrent users at 99.9% availability on auto-scaling ECS Fargate (2→10 containers).',
            'Improved GPU utilization by ~95% by decoupling inference: answer synthesis offloaded to an external LLM API while the VLM runs on on-demand Spot GPU instances.'
          ],
          technologies: ['LangGraph', 'FastAPI', 'pgvector', 'GPT-4o', 'Langfuse', 'AWS ECS', 'Docker', 'PostgreSQL', 'Redis'],
          expanded: false
        },
        {
          title: 'AI/ML Engineer',
          company: 'Gmonks',
          duration: 'Oct 2024 – Nov 2025',
          context: null,
          visibleResponsibilities: [
            'Cut client application size by 80 MB by moving YOLOv8 inference (0.339 mAP) to remote serving on AWS ECS Fargate behind a FastAPI API handling thousands of daily requests.',
            'Secured media delivery with ephemeral signed URLs and owned the full MLOps lifecycle from training to monitored production deployment.',
            'Reduced environment setup time by 95% and achieved 100% reproducible cloud environments by codifying all infrastructure in Terraform.'
          ],
          hiddenResponsibilities: [],
          technologies: ['YOLOv8', 'FastAPI', 'AWS ECS Fargate', 'Terraform', 'Docker', 'Python'],
          expanded: false
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
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.job-item {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  transition: all var(--transition-base);
}

.job-item:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-md);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);
}

.job-main-info h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.15rem;
  letter-spacing: -0.01em;
}

.job-main-info h4 {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.job-context {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--primary);
}

.duration {
  font-size: 0.85rem;
  color: var(--primary);
  font-weight: 600;
  white-space: nowrap;
}

.responsibilities {
  list-style: none;
  margin-bottom: 1.25rem;
}

.responsibilities li {
  position: relative;
  padding-left: 1.2rem;
  margin-bottom: 0.75rem;
  color: var(--text);
  line-height: 1.65;
  font-size: 0.92rem;
}

.responsibilities li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--primary);
  opacity: 0.6;
}

.show-more-btn {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.3rem 0;
  margin-bottom: 1.25rem;
  transition: opacity var(--transition-fast);
}

.show-more-btn:hover {
  opacity: 0.8;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.25rem 0.65rem;
  background: var(--bg-secondary);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--primary);
  border: 1px solid transparent;
  transition: all var(--transition-fast);
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
