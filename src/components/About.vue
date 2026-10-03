<template>
  <section class="about section" id="about">
    <div class="container">
      <div class="about-content">
        <div class="about-image">
          <div class="image-wrapper">
            <img :src="profileSrc" alt="Ritik Ranjan — GenAI/ML Engineer" class="profile-pic" width="400" height="400" loading="lazy" @error="handleImgError" />
          </div>
        </div>
        <div class="about-text">
          <h2 class="section-title" style="text-align: left">About Me</h2>
          <p>
            I design and ship retrieval-augmented generation systems end to end — from hybrid search
            (dense + BM25 + Reciprocal Rank Fusion) and cross-encoder reranking to stateful LangGraph
            ingestion pipelines and distributed tracing with per-query LLM cost attribution.
          </p>
          <p>
            My work runs in production on AWS (ECS Fargate, RDS, ElastiCache) behind FastAPI services
            serving 500+ concurrent users at 99.9% availability. I care about the trade-offs as much
            as the metrics.
          </p>
          <p>
            Currently at Ascendion, I'm engineering a 7-microservice enterprise RAG platform for
            Charter Communications — building everything from document ingestion to conversational
            Q&A over enterprise knowledge bases.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      profileSrc: `${import.meta.env.BASE_URL}profile.JPG`
    }
  },
  methods: {
    handleImgError(e) {
      e.target.src = `${import.meta.env.BASE_URL}placeholder-profile.png`
    }
  }
}
</script>

<style scoped>
.about {
  background: var(--bg-secondary);
  padding: 4rem 0;
}

.about-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3rem;
  align-items: start;
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  background: var(--card-bg);
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.image-wrapper:hover .profile-pic {
  transform: scale(1.03);
}

.about-text .section-title {
  margin-bottom: 1.5rem;
}

.about-text .section-title::after {
  left: 0;
  transform: none;
}

.about-text p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.75;
  font-size: 1rem;
}

.about-text p:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-image {
    max-width: 240px;
    margin: 0 auto;
  }

  .about-text .section-title {
    text-align: center !important;
  }

  .about-text .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
