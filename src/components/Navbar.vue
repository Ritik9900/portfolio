<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="nav-content">
        <a href="#" class="logo">
          <span class="logo-text mono">&lt;RR /&gt;</span>
        </a>

        <div class="nav-right">
          <ul class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
            <li><a href="#expertise" @click="closeMobileMenu">Expertise</a></li>
            <li><a href="#experience" @click="closeMobileMenu">Experience</a></li>
            <li><a href="#projects" @click="closeMobileMenu">Projects</a></li>
            <li><a href="#education" @click="closeMobileMenu">Education</a></li>
            <li><a href="#contact" @click="closeMobileMenu" class="contact-btn">Contact</a></li>
          </ul>

          <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle theme">
            <!-- Sun Icon -->
            <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <!-- Moon Icon -->
            <svg v-else viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>

          <button class="mobile-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isScrolled: false,
      mobileMenuOpen: false,
      theme: 'light'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.initTheme()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
    initTheme() {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        this.theme = savedTheme
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.theme = 'dark'
      }
      this.applyTheme()
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.applyTheme()
      localStorage.setItem('theme', this.theme)
    },
    applyTheme() {
      if (this.theme === 'dark') {
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--nav-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: box-shadow var(--transition-base);
}

.navbar.scrolled {
  box-shadow: var(--shadow-md);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 0;
}

.logo {
  text-decoration: none;
  color: var(--text);
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 0.25rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.nav-links a:hover {
  color: var(--primary);
  background: var(--accent-subtle);
}

.contact-btn {
  background: var(--gradient-primary) !important;
  color: white !important;
  padding: 0.5rem 1.25rem !important;
  border-radius: var(--radius-md) !important;
}

.contact-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  background: var(--gradient-primary) !important;
}

.theme-toggle {
  background: none;
  border: 1px solid var(--border);
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0.45rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
}

.theme-toggle:hover {
  background: var(--bg-secondary);
  color: var(--primary);
  border-color: var(--primary);
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.mobile-toggle span {
  width: 22px;
  height: 2px;
  background-color: var(--text);
  border-radius: 2px;
  transition: all var(--transition-base);
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: var(--bg);
    flex-direction: column;
    padding: 1.5rem;
    gap: 0.5rem;
    box-shadow: var(--shadow-lg);
    transform: translateY(-120%);
    opacity: 0;
    transition: all var(--transition-base);
    border-bottom: 1px solid var(--border);
  }

  .nav-links.mobile-open {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
