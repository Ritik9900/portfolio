# 🚀 Quick Start Guide

Get your portfolio up and running in minutes!

## Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all required packages (Vue, Vite, etc.)

## Step 2: Start Development Server

```bash
npm run dev
```

Your portfolio will open at: `http://localhost:5173`

You should see your portfolio running! 🎉

## Step 3: Setup Contact Form (Important!)

**Get messages from your contact form:**

1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email to get a free access key
3. Open `src/components/Contact.vue`
4. Line 134: Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your key

📖 See [CONTACT_SETUP.md](CONTACT_SETUP.md) for details

## Step 4: Add Your PDFs

Place these 4 files in `public/documents/`:
- `resume.pdf`
- `degree.pdf`
- `minor1.pdf`
- `minor2.pdf`

📖 See [PDF_SETUP.md](PDF_SETUP.md) for details

## Step 5: Customize Your Content

Now it's time to make it yours! Follow these steps:

### 3.1 Update Your Name and Info
Open `src/components/Hero.vue`:
- Line 11: Change "Your Name" to your actual name
- Update the description and social links

### 3.2 Personalize About Section
Open `src/components/About.vue`:
- Update the bio paragraphs with your story
- Change the statistics (years of experience, projects)

### 3.3 Add Your Skills
Open `src/components/Skills.vue`:
- Modify the `skillCategories` array with your actual skills
- Add or remove skill categories as needed

### 3.4 Add Work Experience
Open `src/components/Experience.vue`:
- Update the `jobs` array with your real work experience
- Add responsibilities and technologies for each role

### 3.5 Showcase Your Projects
Open `src/components/Projects.vue`:
- Replace the sample projects with your actual projects
- Add GitHub links and demo links
- Update descriptions and technologies

### 3.6 Update Education
Open `src/components/Education.vue`:
- Add your degree and university
- List your 2 minors
- Update certifications

### 5.7 Update Resume Section
Open `src/components/Resume.vue`:
- Update document titles to match your actual minors
- Verify your PDFs are in the `public/documents/` folder

### 5.8 Add Contact Information
Update these files with your contact info:
- `src/components/Contact.vue`
- `src/components/Footer.vue`
- `src/components/Navbar.vue`

**Search and replace throughout all files:**
- `yourusername` → Your GitHub username
- `your.email@example.com` → Your email address

## Step 6: Customize Colors (Optional)

Want to change the color scheme?

Open `src/style.css` and modify the CSS variables:
```css
:root {
  --primary: #6366f1;  /* Main brand color */
  --secondary: #06b6d4; /* Accent color */
  --accent: #8b5cf6;    /* Secondary accent */
}
```

## Step 7: Preview Your Changes

As you make changes, the browser will automatically reload!

Keep the development server running (`npm run dev`) and edit files.

## Step 8: Deploy to GitHub Pages

### 6.1 Update Configuration
Open `vite.config.js` and update line 6:
```javascript
base: '/your-repository-name/',  // Replace with your repo name
```

### 6.2 Create GitHub Repository
1. Go to GitHub.com
2. Create a new repository (e.g., "portfolio")
3. Make it public
4. Don't initialize with README

### 6.3 Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: My portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

### 6.4 Enable GitHub Pages
1. Go to repository Settings
2. Click "Pages" in sidebar
3. Under "Source", select "GitHub Actions"
4. Wait 2-3 minutes for deployment

Your site will be live at:
```
https://yourusername.github.io/portfolio/
```

## 📝 Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🎨 Customization Resources

For detailed customization instructions, see:
- `CUSTOMIZATION.md` - Complete customization guide
- `DEPLOYMENT.md` - Detailed deployment instructions
- `README.md` - Project overview and features

## ⚡ Quick Tips

1. **Save Often**: Changes auto-reload in the browser
2. **Check Console**: Open browser DevTools (F12) for any errors
3. **Mobile View**: Test responsive design using browser DevTools
4. **Images**: Place images in the `public` folder
5. **Icons**: Currently using SVG icons (lightweight and scalable)

## 🆘 Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Changes Not Showing
1. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
2. Clear browser cache
3. Restart dev server

### Installation Issues
Try:
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

## ✅ Pre-Deployment Checklist

Before deploying, make sure:
- [ ] All personal information is updated
- [ ] Social media links work
- [ ] Email addresses are correct
- [ ] Projects have valid GitHub links
- [ ] Tested on mobile view
- [ ] No console errors
- [ ] Updated `vite.config.js` with repo name

## 🎯 What's Next?

After deploying:
1. Share your portfolio on LinkedIn
2. Add it to your GitHub profile
3. Include it in job applications
4. Keep it updated with new projects
5. Consider adding Google Analytics

## 📧 Need Help?

Check these resources:
- [Vue.js Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

---

Happy coding! Your amazing portfolio awaits! 🌟

