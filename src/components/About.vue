<template>
  <section class="about section" id="about">
    <div class="container">
      <h2 class="section-title">About Me</h2>
      <div class="about-content">
        <div class="about-image">
          <div class="image-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div class="stats">
            <div class="stat-item">
              <h3>1+</h3>
              <p>Years Experience</p>
            </div>
            <div class="stat-item">
              <h3>10+</h3>
              <p>Projects Completed</p>
            </div>
          </div>
        </div>
        <div class="about-text">
          <h3>AI/ML Engineer passionate about creating intelligent solutions</h3>
          <p>
            I'm an AI/ML Engineer with 1 year of industry experience, specializing in Deep Learning 
            and Machine Learning. I hold a degree in Data Science with 2 minors, giving me a strong 
            foundation in both theoretical concepts and practical applications.
          </p>
          <p>
            My expertise extends beyond AI/ML - I've built robust backend systems for Unity applications 
            and crafted responsive frontends using Vue.js. I love working at the intersection of AI and 
            software engineering, creating solutions that are both intelligent and user-friendly.
          </p>
          <p>
            I'm constantly learning and staying updated with the latest advancements in AI/ML, always 
            looking for opportunities to apply cutting-edge technologies to solve real-world problems.
          </p>
          <div class="highlights">
            <div class="highlight-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Deep Learning & Neural Networks</span>
            </div>
            <div class="highlight-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Full-Stack Development</span>
            </div>
            <div class="highlight-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Data Science & Analytics</span>
            </div>
            <div class="highlight-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Unity Game Development</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  background: var(--bg-secondary);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: start;
}

.about-image {
  position: sticky;
  top: 100px;
}

.image-placeholder {
  width: 100%;
  aspect-ratio: 1;
  background: var(--gradient-1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.3);
}

.image-placeholder svg {
  width: 50%;
  height: 50%;
  color: white;
}

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-item {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.stat-item h3 {
  font-size: 2rem;
  font-weight: 800;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.3rem;
}

.stat-item p {
  font-size: 0.9rem;
  color: var(--text-light);
}

.about-text h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.about-text p {
  color: var(--text-light);
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.05rem;
}

.highlights {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  background: var(--card-bg);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.highlight-item:hover {
  transform: translateX(5px);
}

.highlight-item svg {
  width: 24px;
  height: 24px;
  color: var(--primary);
  flex-shrink: 0;
}

.highlight-item span {
  font-weight: 500;
  color: var(--text);
  font-size: 0.95rem;
}

@media (max-width: 968px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .about-image {
    position: static;
  }

  .highlights {
    grid-template-columns: 1fr;
  }
}
</style>

