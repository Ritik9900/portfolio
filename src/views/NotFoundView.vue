<template>
  <section class="container nf">
    <p class="code mono">404</p>
    <h1>This page doesn't exist.</h1>
    <p class="text">The link may be out of date.</p>
    <RouterLink to="/" class="btn btn-primary">Back to home</RouterLink>
  </section>
</template>

<style scoped>
.nf {
  padding-top: 120px;
  padding-bottom: 160px;
}

.code {
  color: var(--accent);
  font-size: 0.875rem;
}

h1 {
  font-size: 2rem;
  margin: 8px 0;
}

.text {
  color: var(--text-2);
  margin-bottom: 24px;
}
</style>
