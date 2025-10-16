# Love Story Website - GitHub Pages Deployment

## 🌐 Deploying to GitHub Pages

Since GitHub Pages only serves static files, here's how to deploy your love story website:

### Option 1: Static Version (Recommended for GitHub Pages)

1. **Create a GitHub repository**
2. **Use the static files** (index.html, style.css, script-static.js)
3. **Pre-load images** into the repository

### Option 2: Keep Node.js Version for Local Use

1. **Deploy to other platforms** that support Node.js (Heroku, Vercel, Netlify)
2. **Use GitHub Pages for static demo** version

## 📁 Files for GitHub Pages Deployment

### Required Files:
- `index.html` ✅
- `style.css` ✅ 
- `script-static.js` (modified version without server calls)
- `images/` folder with your photos

### Steps to Deploy:

1. **Create new GitHub repository**
   ```bash
   git init
   git remote add origin https://github.com/yourusername/your-love-story.git
   ```

2. **Add your images to repository**
   ```bash
   # Copy your images to the repository
   cp -r images/ ./
   git add images/
   ```

3. **Commit and push**
   ```bash
   git add .
   git commit -m "Initial love story website"
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Save

5. **Access your site**
   - Your site will be available at: `https://yourusername.github.io/your-love-story/`

## ⚠️ Limitations with GitHub Pages:
- No server-side file uploads (images must be added to repository manually)
- No dynamic file management
- Images must be committed to the repository

## 🎯 Recommended Deployment Platforms:

### For Full Node.js Functionality:
- **Vercel** (free tier available)
- **Netlify** (free tier available) 
- **Heroku** (requires payment)
- **Railway** (free tier available)

### For Static Version:
- **GitHub Pages** (free)
- **Netlify** (free tier)
- **Vercel** (free tier)