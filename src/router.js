import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import { findCaseStudy } from './data/caseStudies.js'
import { findCompetition } from './data/kaggle.js'
import { profile } from './data/profile.js'

const SITE = `${profile.name} — ${profile.role}`

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { title: SITE } },
  {
    path: '/projects/:slug',
    name: 'case-study',
    component: () => import('./views/CaseStudyView.vue'),
    beforeEnter: (to) => (findCaseStudy(to.params.slug) ? true : { name: 'not-found', params: { pathMatch: to.path.slice(1).split('/') } })
  },
  {
    path: '/kaggle/:slug',
    name: 'kaggle',
    component: () => import('./views/NotebookView.vue'),
    beforeEnter: (to) => (findCompetition(to.params.slug) ? true : { name: 'not-found', params: { pathMatch: to.path.slice(1).split('/') } })
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./views/NotFoundView.vue'), meta: { title: `Not found — ${profile.name}` } }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) {
      // Wait a tick when arriving from another page so the target section exists.
      const delay = from.name && from.name !== to.name ? 60 : 0
      return new Promise((resolve) => setTimeout(() => resolve({ el: to.hash, behavior: delay ? 'instant' : 'smooth' }), delay))
    }
    return { top: 0 }
  }
})

router.afterEach((to) => {
  if (to.name === 'case-study') {
    const cs = findCaseStudy(to.params.slug)
    document.title = `${cs.title} — ${profile.name}`
  } else if (to.name === 'kaggle') {
    const c = findCompetition(to.params.slug)
    document.title = `${c.title} · Kaggle notebook — ${profile.name}`
  } else {
    document.title = to.meta.title || SITE
  }
})

export default router
