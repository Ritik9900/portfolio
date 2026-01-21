# Customization Guide

This guide will help you personalize the portfolio with your own information.

## 🎯 Quick Customization Checklist

### Step 1: Update Personal Information

#### `src/components/Hero.vue`
```vue
Line 11: <h1 class="name fade-in-up">Your Name</h1>
         Change to your actual name

Line 16-18: Update the description paragraph with your bio

Line 26-30: Update social media links
- GitHub: https://github.com/YOUR_USERNAME
- LinkedIn: https://linkedin.com/in/YOUR_USERNAME  
- Email: your.email@example.com
```

### Step 2: Update About Section

#### `src/components/About.vue`
```vue
Lines 46-58: Update the three paragraphs with:
- Your background and experience
- Your education and specialties
- Your goals and interests
```

### Step 3: Customize Skills

#### `src/components/Skills.vue`
```vue
Lines 18-81: Update the skillCategories array

Each category has:
- title: Category name
- gradient: Color gradient
- icon: Emoji icon
- skills: Array of skill names

Add/remove categories and skills as needed
```

### Step 4: Update Work Experience

#### `src/components/Experience.vue`
```vue
Lines 34-82: Update the jobs array

For each job:
- title: Your job title
- company: Company name
- duration: Date range (e.g., "Jan 2024 - Present")
- responsibilities: Array of bullet points
- technologies: Array of tech used
```

### Step 5: Showcase Your Projects

#### `src/components/Projects.vue`
```vue
Lines 37-105: Update the projects array

For each project:
- title: Project name
- icon: Emoji that represents the project
- gradient: Color gradient for the card
- description: Brief project description
- tags: Technologies used
- github: GitHub repository URL
- demo: Live demo URL (or null if no demo)
```

### Step 6: Update Education

#### `src/components/Education.vue`
```vue
Lines 69-93: Update education array
- degree: Your degree name
- school: University/College name
- duration: Years attended
- minors: Array of your minors
- highlights: Achievements and honors
- coursework: Relevant courses

Lines 95-115: Update certifications array
- name: Certification name
- issuer: Who issued it
- icon: Emoji icon
```

### Step 7: Update Contact Information

#### `src/components/Contact.vue`
```vue
Lines 20, 35: Update email address
Lines 44, 60: Update LinkedIn URL
Lines 76, 92: Update GitHub URL

Line 149: Update email in handleSubmit method
```

#### `src/components/Footer.vue`
```vue
Lines 5: Update footer tagline (optional)
Lines 9-11: Update social links
Lines 21-39: Update footer links if needed
```

#### `src/components/Navbar.vue`
```vue
Line 8: Update the logo text if desired
```

## 🎨 Styling Customization

### Change Color Scheme

#### `src/style.css`
```css
Lines 11-22: Update CSS variables

Key colors:
--primary: Main brand color (currently purple-blue)
--secondary: Accent color (currently cyan)
--accent: Secondary accent (currently purple)

Gradients:
--gradient-1: Main gradient
--gradient-2: Secondary gradient
--gradient-3: Tertiary gradient
```

### Change Fonts

#### `index.html`
```html
Line 9-10: Google Fonts link
Currently using: Inter and JetBrains Mono

To change fonts:
1. Go to Google Fonts
2. Select your fonts
3. Replace the link
4. Update font-family in style.css
```

## 📝 Content Guidelines

### Writing Project Descriptions
- Keep it concise (2-3 sentences)
- Focus on impact and results
- Mention specific technologies
- Include metrics when possible

### Work Experience Tips
- Use action verbs (Developed, Built, Implemented, etc.)
- Quantify achievements when possible
- Highlight technologies used
- Focus on impact and results

### About Section
- Keep it personal but professional
- Highlight your unique strengths
- Mention your passions
- Include what you're looking for

## 🖼️ Adding Your Photo

### Option 1: Replace the Placeholder Icon
Edit `src/components/About.vue` and replace the SVG with an image:

```vue
<!-- Replace lines 5-11 with: -->
<div class="image-placeholder">
  <img src="/path-to-your-image.jpg" alt="Your Name" />
</div>

<!-- Add to style section: -->
.image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### Option 2: Add a Background Image
Place your image in the `public` folder and reference it directly.

## 🔗 Social Links

Find and replace these URLs throughout the codebase:
- `https://github.com/yourusername` → Your GitHub
- `https://linkedin.com/in/yourusername` → Your LinkedIn
- `your.email@example.com` → Your email

Files to update:
- `src/components/Hero.vue`
- `src/components/Contact.vue`
- `src/components/Footer.vue`
- `README.md`

## 📊 Statistics

Update the statistics in `src/components/About.vue`:
```vue
Lines 13-23: Update the numbers
- Years Experience
- Projects Completed
- Or add your own metrics
```

## 🎯 Deployment Configuration

### Update Repository Name

#### `vite.config.js`
```javascript
Line 6: base: '/portfolio/',
        Change 'portfolio' to your GitHub repository name
```

## ✅ Final Checklist

Before deploying, make sure you've updated:

- [ ] Your name in Hero section
- [ ] Bio in About section
- [ ] Skills that match your expertise
- [ ] Work experience details
- [ ] Project showcases with real projects
- [ ] Education and certifications
- [ ] All social media links
- [ ] Email addresses
- [ ] Repository name in vite.config.js
- [ ] README.md with your information

## 🆘 Need Help?

If you're stuck on any customization:
1. Check the comments in each component file
2. Refer to Vue.js documentation
3. The code is well-structured and commented

## 💡 Pro Tips

1. **Keep it Updated**: Regularly update your portfolio with new projects
2. **Test Thoroughly**: Test on different devices and browsers
3. **Get Feedback**: Ask friends or colleagues to review
4. **Analytics**: Consider adding Google Analytics to track visitors
5. **SEO**: Update meta tags in `index.html` for better search visibility

---

Happy customizing! 🎨

