# Deployment Guide for GitHub Pages

This guide will help you deploy your portfolio to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Node.js and npm installed

## Step-by-Step Deployment

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top right and select **New repository**
3. Name your repository (e.g., `portfolio`)
4. Make it **Public**
5. Do NOT initialize with README (we already have one)
6. Click **Create repository**

### 2. Update Configuration

Before pushing to GitHub, update these files:

#### Update `vite.config.js`
```javascript
base: '/your-repository-name/',  // Replace with your actual repo name
```

#### Update Links Throughout the Site
Replace placeholder links with your actual links:
- GitHub: `https://github.com/yourusername`
- LinkedIn: `https://linkedin.com/in/yourusername`
- Email: `your.email@example.com`

### 3. Initialize Git and Push to GitHub

Open terminal in your project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Portfolio website"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages with Actions

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down and click **Pages** (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically trigger when you push to main branch

### 5. Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You'll see the deployment workflow running
3. Wait for it to complete (usually takes 2-3 minutes)
4. Once complete, your site will be live!

### 6. Access Your Portfolio

Your portfolio will be available at:
```
https://yourusername.github.io/portfolio/
```

Replace:
- `yourusername` with your GitHub username
- `portfolio` with your repository name

## Alternative: Manual Deployment

If you prefer to deploy manually without GitHub Actions:

1. Remove the `.github` folder
2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Update `package.json` to include:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

4. Run deployment:
```bash
npm run deploy
```

5. Enable GitHub Pages:
   - Go to Settings > Pages
   - Select `gh-pages` branch as source
   - Click Save

## Troubleshooting

### Issue: Site shows 404 or blank page

**Solution:** Check that the `base` path in `vite.config.js` matches your repository name:
```javascript
base: '/repository-name/'
```

### Issue: CSS/JS not loading

**Solution:** Make sure the `base` configuration is correct and rebuild:
```bash
npm run build
git add .
git commit -m "Fix base path"
git push
```

### Issue: GitHub Actions failing

**Solution:** 
1. Check the Actions tab for error messages
2. Make sure Pages is set to use GitHub Actions (Settings > Pages)
3. Verify your workflow file is in `.github/workflows/deploy.yml`

## Updating Your Portfolio

Whenever you make changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

GitHub Actions will automatically rebuild and redeploy your site!

## Custom Domain (Optional)

To use a custom domain:

1. Buy a domain from a registrar (e.g., Namecheap, Google Domains)
2. In your repository, go to Settings > Pages
3. Add your custom domain
4. Update your DNS settings with your registrar:
   - Add a CNAME record pointing to `yourusername.github.io`
5. Create a `public/CNAME` file with your domain name

## Performance Tips

- Images: Optimize images before adding them (use tools like TinyPNG)
- Fonts: The site uses Google Fonts - consider self-hosting for better performance
- Icons: Currently using SVG icons which are optimal

## Analytics (Optional)

To add Google Analytics:

1. Get your Google Analytics tracking ID
2. Add the tracking script to `index.html` in the `<head>` section

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vue.js Documentation](https://vuejs.org/)

---

Happy deploying! 🚀

