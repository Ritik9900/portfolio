<template>
  <section class="about section" id="about">
    <div class="container">
      <h2 class="section-title">About Me</h2>
      <div class="about-content">
        <div class="about-image">
          <div class="image-wrapper">
             <!-- Replace the src below with your profile picture -->
            <img src="/placeholder-profile.png" alt="Profile Picture" class="profile-pic" />
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
  padding: 3rem 0; /* Compact padding */
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: center;
}

.about-image {
  position: sticky;
  top: 100px;
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  background: var(--card-bg); /* Fallback */
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.image-wrapper:hover .profile-pic {
  transform: scale(1.05);
}

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-item {
  background: var(--card-bg);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border);
}

.stat-item h3 {
  font-size: 1.8rem;
  font-weight: 800;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.2rem;
}

.stat-item p {
  font-size: 0.85rem;
  color: var(--text-light);
}

.about-text h3 {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.4;
  color: var(--text);
}

.about-text p {
  color: var(--text-light);
  margin-bottom: 1rem;
  line-height: 1.7;
  font-size: 1rem;
}



@media (max-width: 968px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-image {
    position: static;
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>

