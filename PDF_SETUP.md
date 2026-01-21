# PDF Documents Setup Guide

Your portfolio includes a beautiful PDF viewer section where visitors can view your resume and certificates without downloading them.

## 📁 How It Works

- PDFs are stored in the `public/documents/` folder
- Clicking a document card opens a popup modal
- PDFs display in an iframe with controls disabled
- Download toolbar is hidden (though not completely prevented)

## 🎯 Setup Instructions

### Step 1: Prepare Your PDFs

You need 4 PDF files:

1. **resume.pdf** - Your professional resume/CV
2. **degree.pdf** - Your Bachelor's degree certificate
3. **minor1.pdf** - Your first minor certificate
4. **minor2.pdf** - Your second minor certificate

### Step 2: Add Your PDFs

1. Place all 4 PDF files in the `public/documents/` folder
2. Make sure the file names match exactly (case-sensitive)
3. Recommended file size: Under 5MB each for fast loading

Folder structure:
```
public/
  documents/
    resume.pdf       ← Your resume
    degree.pdf       ← Your degree certificate
    minor1.pdf       ← First minor certificate
    minor2.pdf       ← Second minor certificate
    README.md
```

### Step 3: Customize Document Names

Open `src/components/Resume.vue` and update the document titles:

**For Resume (lines 12-15):**
```vue
<h3>Resume / CV</h3>
<p>View my complete professional resume</p>
```

**For Degree (lines 32-35):**
```vue
<h3>Degree Certificate</h3>
<p>Bachelor of Science in Data Science</p>
```

**For Minor 1 (lines 52-55):**
```vue
<h3>Minor Certificate 1</h3>
<p>Computer Science Minor</p>  ← Change this to your actual minor
```

**For Minor 2 (lines 72-75):**
```vue
<h3>Minor Certificate 2</h3>
<p>Mathematics Minor</p>  ← Change this to your actual minor
```

### Step 4: Test Locally

1. Start development server: `npm run dev`
2. Scroll to the "Resume & Documents" section
3. Click each card to verify PDFs open correctly
4. Test on different browsers

## 🎨 Customization Options

### Add More Documents

To add additional certificates or documents:

1. **Add the card in the template:**
```vue
<div class="document-card" @click="openPdf('newdoc')">
  <div class="doc-icon minor-icon">
    <!-- Your icon SVG -->
  </div>
  <div class="doc-content">
    <h3>New Document</h3>
    <p>Document description</p>
    <span class="view-badge">Click to View</span>
  </div>
  <div class="arrow-icon">
    <!-- Arrow SVG -->
  </div>
</div>
```

2. **Add to documents data:**
```javascript
documents: {
  // ... existing documents
  newdoc: {
    url: '/documents/newdoc.pdf#toolbar=0&navpanes=0&scrollbar=0',
    title: 'New Document Title'
  }
}
```

3. **Add the PDF file:**
Place `newdoc.pdf` in `public/documents/`

### Remove Documents

To remove a document section:

1. Delete the document card from the template in `Resume.vue`
2. Remove the entry from the `documents` object
3. Optionally delete the PDF file from `public/documents/`

### Change Colors/Icons

Document cards use three gradient styles:
- `.resume-icon` - Orange/yellow gradient
- `.degree-icon` - Lighter yellow gradient  
- `.minor-icon` - Peach/orange gradient

You can customize these in the `<style>` section of `Resume.vue`.

## 🔒 Download Protection

### Current Protection Level

- ✅ PDF toolbar hidden (no direct download button)
- ✅ Navigation panes disabled
- ✅ Right-click context menu works but discouraged
- ✅ Warning message: "Viewing only - Download disabled"

### Limitations

**Important**: While we hide download controls, technically savvy users can still:
- Use browser DevTools to find the PDF URL
- Screenshot or print the PDF
- Use browser extensions to download

### Enhanced Protection Options

For better protection, consider:

1. **Add Watermarks**
   - Add your name/logo to each page
   - Use PDF editing tools (Adobe Acrobat, PDFtk, etc.)

2. **Convert to Images**
   - Convert PDFs to image-based PDFs
   - Harder to extract text

3. **Use PDF Protection**
   - Password-protect PDFs
   - Set permissions (no printing, no copying)

4. **Cloud Viewer Services**
   - Google Drive Viewer
   - Microsoft OneDrive Viewer
   - Requires different implementation

## 🎯 Best Practices

### File Size Optimization

Large PDFs slow down your site. Optimize them:

1. **Use Online Tools:**
   - [iLovePDF](https://www.ilovepdf.com/compress_pdf) - Free compression
   - [SmallPDF](https://smallpdf.com/compress-pdf) - Easy to use
   - [Adobe Acrobat](https://www.adobe.com/acrobat/online/compress-pdf.html) - Best quality

2. **Target Size:**
   - Resume: Under 1MB (ideally 200-500KB)
   - Certificates: Under 2MB each

3. **Quality Settings:**
   - 150 DPI is usually sufficient for screen viewing
   - Use JPEG compression for images
   - Remove unnecessary metadata

### File Naming

- Use lowercase filenames: `resume.pdf` not `Resume.PDF`
- No spaces in filenames: `minor-1.pdf` not `minor 1.pdf`
- Be consistent with naming conventions

### Content Tips

**Resume:**
- Use a clean, professional template
- Include contact information
- Keep it to 1-2 pages
- Export as PDF (not scanned image)

**Certificates:**
- Scan at 300 DPI minimum
- Crop to remove excess whitespace
- Ensure text is readable when zoomed
- Save as PDF (not image file)

## 📱 Mobile Experience

The PDF viewer is fully responsive:
- Modal adapts to screen size
- Touch-friendly close button
- Pinch to zoom enabled
- Scroll gestures work smoothly

Tested on:
- iPhone Safari
- Android Chrome
- iPad
- Android tablets

## 🆘 Troubleshooting

### PDF Not Loading

1. **Check file path** - Verify PDF is in `public/documents/`
2. **Check filename** - Must match exactly (case-sensitive)
3. **File size** - Very large PDFs (>10MB) may fail to load
4. **File format** - Must be valid PDF, not corrupted

### Blank PDF Viewer

1. **Browser compatibility** - Some browsers block iframes
2. **PDF corruption** - Open PDF in Adobe Reader to verify
3. **Console errors** - Check browser DevTools (F12)

### Download Still Possible

This is expected behavior. The goal is to discourage downloads, not prevent them entirely. For true protection:
- Watermark your documents
- Use password protection
- Consider using a dedicated document viewer service

## 🔄 Alternative Implementations

### Option 1: Google Drive Viewer

```javascript
url: `https://drive.google.com/viewerng/viewer?embedded=true&url=${YOUR_PDF_URL}`
```

Pros: Better compatibility, harder to download
Cons: Requires public URL, Google dependency

### Option 2: PDF.js Library

Implement a full PDF viewer with PDF.js:
- Complete control over features
- Better security options
- More complex implementation

### Option 3: Convert to Images

Convert PDFs to images and display in a gallery:
- Impossible to download original PDF
- Requires conversion workflow
- Larger file sizes

## ✅ Deployment Checklist

Before deploying:

- [ ] All 4 PDFs are in `public/documents/` folder
- [ ] File names match exactly (resume.pdf, degree.pdf, etc.)
- [ ] PDFs are optimized (under 5MB each)
- [ ] Document titles/descriptions updated in Resume.vue
- [ ] Tested on local development server
- [ ] Opened each document to verify it loads
- [ ] Tested on mobile device
- [ ] No console errors
- [ ] PDFs contain correct information

## 💡 Pro Tips

1. **Update Regularly** - Keep your resume current
2. **Watermark Important Docs** - Add your name/contact
3. **Test After Updates** - Always test after adding new PDFs
4. **Monitor File Sizes** - Compress if over 2MB
5. **Backup Originals** - Keep original high-quality versions
6. **Version Control** - Don't commit PDFs to git (add to .gitignore if private)

## 🎨 Styling Customization

The PDF viewer modal can be customized in `PdfModal.vue`:

- Modal size: `.modal-container max-width`
- Colors: Update gradient backgrounds
- Close button: Modify `.close-btn` styles
- Notice banner: Style `.no-download-notice`

## 🚀 Going Live

When deploying to GitHub Pages:

1. PDFs will be accessible at: `https://yourusername.github.io/portfolio/documents/resume.pdf`
2. Make sure `public` folder is included in your deployment
3. Vite automatically copies `public` folder to `dist` during build
4. Test on the live site after deployment

---

Your portfolio now has a professional document viewing system! 🎉

