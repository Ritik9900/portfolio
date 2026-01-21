<template>
  <section class="resume section" id="resume">
    <div class="container">
      <h2 class="section-title">Resume & Documents</h2>
      
      <div class="documents-grid">
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

        <!-- Degree Certificate -->
        <div class="document-card" @click="openPdf('degree')">
          <div class="doc-icon degree-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <div class="doc-content">
            <h3>Degree Certificate</h3>
            <p>Bachelor of Science in Data Science</p>
            <span class="view-badge">Click to View</span>
          </div>
          <div class="arrow-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>

        <!-- Minor Certificate 1 -->
        <div class="document-card" @click="openPdf('minor1')">
          <div class="doc-icon minor-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div class="doc-content">
            <h3>Minor Certificate 1</h3>
            <p>Computer Science Minor</p>
            <span class="view-badge">Click to View</span>
          </div>
          <div class="arrow-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>

        <!-- Minor Certificate 2 -->
        <div class="document-card" @click="openPdf('minor2')">
          <div class="doc-icon minor-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div class="doc-content">
            <h3>Minor Certificate 2</h3>
            <p>Mathematics Minor</p>
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

      <div class="upload-instruction">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <p>To add your documents: Place your PDF files in the <code>public/documents/</code> folder</p>
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
          url: 'public/documents/Ritik_Ranjan_IIT-M.pdf#toolbar=0&navpanes=0&scrollbar=0',
          title: 'Resume / CV'
        },
        degree: {
          url: '/documents/degree.pdf#toolbar=0&navpanes=0&scrollbar=0',
          title: 'Degree Certificate'
        },
        minor1: {
          url: 'public/documents/Minor_Economics&Finance.pdf#toolbar=0&navpanes=0&scrollbar=0',
          title: 'Minor Certificate 1'
        },
        minor2: {
          url: '/documents/minor2.pdf#toolbar=0&navpanes=0&scrollbar=0',
          title: 'Minor Certificate 2'
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
  background: white;
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.document-card {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.document-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--gradient-1);
  opacity: 0;
  transition: all 0.4s ease;
  z-index: 0;
}

.document-card:hover::before {
  left: 0;
  opacity: 0.1;
}

.document-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(245, 158, 11, 0.3);
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

.degree-icon {
  background: var(--gradient-2);
}

.minor-icon {
  background: var(--gradient-3);
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
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.doc-content p {
  color: var(--text-light);
  font-size: 0.95rem;
  margin-bottom: 0.8rem;
}

.view-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.arrow-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
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

.upload-instruction {
  background: #fef3c7;
  border: 2px dashed var(--primary);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.upload-instruction svg {
  width: 24px;
  height: 24px;
  color: var(--primary);
  flex-shrink: 0;
}

.upload-instruction p {
  color: var(--text);
  font-size: 0.95rem;
  margin: 0;
}

.upload-instruction code {
  background: white;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: var(--primary);
}

@media (max-width: 768px) {
  .documents-grid {
    grid-template-columns: 1fr;
  }

  .document-card {
    padding: 1.5rem;
  }

  .doc-icon {
    width: 60px;
    height: 60px;
  }

  .doc-icon svg {
    width: 30px;
    height: 30px;
  }

  .upload-instruction {
    flex-direction: column;
    text-align: center;
  }
}
</style>

