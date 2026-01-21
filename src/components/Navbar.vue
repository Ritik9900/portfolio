<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="nav-content">
        <a href="#" class="logo">
          <span class="logo-text">&lt;AI/ML Engineer /&gt;</span>
        </a>
        
        <div class="nav-actions">
          <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle theme">
            <!-- Sun Icon -->
            <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
            <svg v-else viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>

          <button class="mobile-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <ul class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
          <li><a href="#about" @click="closeMobileMenu">About</a></li>

          <li><a href="#projects" @click="closeMobileMenu">Projects</a></li>
          <li><a href="#services" @click="closeMobileMenu">Hire Me</a></li>
          <li><a href="#resume" @click="closeMobileMenu">Resume</a></li>
          <li><a href="#contact" @click="closeMobileMenu" class="contact-btn">Contact</a></li>
        </ul>
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
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.navbar.scrolled {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  text-decoration: none;
  color: var(--text);
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'JetBrains Mono', monospace;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text);
  padding: 0.5rem;
  border-radius: 50%;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: var(--bg-secondary);
  transform: rotate(15deg);
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
  width: 25px;
  height: 3px;
  background-color: var(--text);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
}

/* Liquid Glass Hover Effect */
.nav-links a:hover {
  background: rgba(0, 113, 227, 0.08);
  color: var(--primary);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 
    inset 0 0 0 1px rgba(0, 113, 227, 0.1),
    0 4px 15px rgba(0, 113, 227, 0.1);
  transform: translateY(-1px);
}

.nav-links a:active {
  transform: scale(0.96);
}

/* Dark mode adjustment for the glass effect */
:global(body.dark-mode) .nav-links a:hover {
  background: rgba(10, 132, 255, 0.15);
  box-shadow: 
    inset 0 0 0 1px rgba(10, 132, 255, 0.2),
    0 4px 20px rgba(10, 132, 255, 0.15);
}

.contact-btn {
  background: var(--gradient-1);
  color: white !important;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-btn::after {
  display: none;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
  }
  
  .nav-actions {
    margin-left: auto;
    margin-right: 1.5rem;
  }

  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background-color: var(--bg);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-120%);
    opacity: 0;
    transition: all 0.3s ease;
    border-bottom: 2px solid var(--border);
  }

  .nav-links.mobile-open {
    transform: translateY(0);
    opacity: 1;
  }

  .nav-links a::after {
    display: none;
  }
}
</style>

