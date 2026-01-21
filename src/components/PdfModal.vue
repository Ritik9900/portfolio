<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button @click="closeModal" class="close-btn" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-content">
          <div class="pdf-viewer">
            <iframe 
              :src="pdfUrl" 
              type="application/pdf"
              width="100%" 
              height="100%"
              frameborder="0"
            ></iframe>
          </div>
          <div class="no-download-notice">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Viewing only - Download disabled</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PdfModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    pdfUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Document Viewer'
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
}

.modal-container {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 1000px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid var(--border);
}

.modal-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
}

.close-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: var(--bg-secondary);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--primary);
  transform: rotate(90deg);
}

.close-btn svg {
  width: 24px;
  height: 24px;
  color: var(--text);
}

.close-btn:hover svg {
  color: white;
}

.modal-content {
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.pdf-viewer {
  flex: 1;
  background: #525252;
  position: relative;
  overflow: hidden;
}

.pdf-viewer iframe {
  display: block;
}

.no-download-notice {
  padding: 1rem 2rem;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: var(--primary-dark);
  font-weight: 500;
}

.no-download-notice svg {
  width: 20px;
  height: 20px;
  color: var(--primary);
}

/* Modal Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }

  .modal-container {
    max-height: 85vh;
  }

  .modal-header {
    padding: 1rem 1.5rem;
  }

  .modal-header h3 {
    font-size: 1.2rem;
  }
}
</style>

