<template>
  <section class="resume section" id="resume">
    <div class="container">
      <h2 class="section-title">Resume</h2>
      
      <div class="documents-container">
        <!-- Resume Card -->
        <div class="document-card" @click="openPdf('resume')">
          <div class="doc-icon resume-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div class="doc-content">
            <h3>Resume / CV</h3>
            <p>View my complete professional resume</p>
            <span class="view-badge">Click to View</span>
          </div>
          <div class="arrow-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- PDF Modal -->
    <PdfModal 
      :is-open="modalOpen" 
      :pdf-url="currentPdfUrl" 
      :title="currentPdfTitle"
      @close="closeModal"
    />
  </section>
</template>

<script>
import PdfModal from './PdfModal.vue'

export default {
  name: 'Resume',
  components: {
    PdfModal
  },
  data() {
    return {
      modalOpen: false,
      currentPdfUrl: '',
      currentPdfTitle: '',
      documents: {
        resume: {
          url: `${import.meta.env.BASE_URL}documents/Ritik_Ranjan_IIT-M.pdf#toolbar=0&navpanes=0&scrollbar=0`,
          title: 'Resume / CV'
        }
      }
    }
  },
  methods: {
    openPdf(docType) {
      const doc = this.documents[docType]
      this.currentPdfUrl = doc.url
      this.currentPdfTitle = doc.title
      this.modalOpen = true
    },
    closeModal() {
      this.modalOpen = false
    }
  }
}
</script>

<style scoped>
.resume {
  background: var(--bg);
  padding: 3rem 0; /* Compact padding */
}

.documents-container {
  display: flex;
  justify-content: center;
  margin-bottom: 0; /* Removed bottom margin */
}

.document-card {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 600px;
}

.document-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08); /* Neutral shadow */
  border-color: var(--primary);
}

.doc-icon {
  width: 70px;
  height: 70px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.document-card:hover .doc-icon {
  transform: scale(1.1);
}

.resume-icon {
  background: var(--gradient-1);
}

.doc-icon svg {
  width: 35px;
  height: 35px;
  color: white;
}

.doc-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

.doc-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.doc-content p {
  color: var(--text-light);
  font-size: 1rem;
  margin-bottom: 0.8rem;
}

.view-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: var(--bg);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.arrow-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.document-card:hover .arrow-icon {
  background: var(--primary);
  transform: translateX(5px);
}

.arrow-icon svg {
  width: 20px;
  height: 20px;
  color: var(--primary);
  transition: color 0.3s ease;
}

.document-card:hover .arrow-icon svg {
  color: white;
}

@media (max-width: 768px) {
  .document-card {
    padding: 1.5rem;
    flex-direction: column;
    text-align: center;
  }
}
</style>
