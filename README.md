# AI/ML Engineer Portfolio

A modern, professional portfolio website built with Vue.js to showcase my skills, projects, and experience as an AI/ML Engineer.

## 🚀 Features

- **Responsive Design** - Looks great on all devices
- **Modern UI/UX** - Clean and professional design with smooth animations
- **Orange/Yellow Gradient Theme** - Warm, professional color scheme
- **Sections Include:**
  - Hero section with animated code window
  - About Me with statistics
  - Skills & Technologies organized by category
  - Work Experience timeline
  - Featured Projects showcase
  - Education & Certifications
  - **Resume & Documents Viewer** - View-only PDF viewer for resume and certificates
  - **Working Contact Form** - Receive messages directly to your email
  - Social links

## 🛠️ Built With

- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **CSS3** - Modern styling with gradients and animations
- **GitHub Pages** - Free hosting

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## ⚙️ Initial Setup

### 1. Contact Form Setup (Required)
The contact form sends emails directly to your inbox using Web3Forms.

**Quick Setup:**
1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email and get a free access key
3. Open `src/components/Contact.vue` (line 134)
4. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key

📖 **Detailed guide:** See [CONTACT_SETUP.md](CONTACT_SETUP.md)

### 2. Add Your PDF Documents (Required)
Place your PDF files in `public/documents/`:
- `resume.pdf` - Your resume/CV
- `degree.pdf` - Your degree certificate  
- `minor1.pdf` - First minor certificate
- `minor2.pdf` - Second minor certificate

📖 **Detailed guide:** See [PDF_SETUP.md](PDF_SETUP.md)

## 🎨 Customization

To personalize this portfolio for yourself, update the following:

### 1. Personal Information
- Edit `src/components/Hero.vue` - Update name, title, and description
- Edit `src/components/About.vue` - Update your bio and statistics
- Edit `src/components/Contact.vue` - Update contact information

### 2. Skills
- Edit `src/components/Skills.vue` - Update the `skillCategories` array with your skills

### 3. Experience
- Edit `src/components/Experience.vue` - Update the `jobs` array with your work experience

### 4. Projects
- Edit `src/components/Projects.vue` - Update the `projects` array with your projects
- Add GitHub and demo links

### 5. Education
- Edit `src/components/Education.vue` - Update your degree, minors, and certifications

### 6. Social Links
Update links throughout the components:
- GitHub: Replace `yourusername` with your GitHub username
- LinkedIn: Replace `yourusername` with your LinkedIn username
- Email: Replace `your.email@example.com` with your email

### 7. Resume & Certificates
- Edit `src/components/Resume.vue` - Update document titles and descriptions
- Place your PDF files in `public/documents/` folder
- See [PDF_SETUP.md](PDF_SETUP.md) for detailed instructions

### 8. Colors & Branding
Current theme: Orange/Yellow gradient
Edit `src/style.css` to change the color scheme:
```css
:root {
  --primary: #f59e0b;
  --secondary: #fb923c;
  --accent: #fbbf24;
  /* ... more colors */
}
```

## 🚢 Deployment to GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. Update the `base` path in `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

2. Go to your GitHub repository settings
3. Navigate to **Settings > Pages**
4. Under **Source**, select **GitHub Actions**
5. Push your changes to the `main` branch
6. GitHub Actions will automatically build and deploy your site

### Method 2: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

Your portfolio will be live at: `https://yourusername.github.io/portfolio/`

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## ⭐ Show Your Support

If you found this portfolio template helpful, please consider giving it a star on GitHub!

## 📧 Contact

Your Name - your.email@example.com

GitHub: [@yourusername](https://github.com/yourusername)
LinkedIn: [Your Name](https://linkedin.com/in/yourusername)

---

Made with ❤️ and ☕ using Vue.js

