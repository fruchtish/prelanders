# Deployment Instructions

## Prerequisites

Before deploying, ensure you have:
1. GitHub account
2. Netlify account
3. Cloudflare account

## GitHub Setup

1. Create a new repository on GitHub
2. Add the remote origin:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/prelanders.git
   ```
3. Push the code:
   ```bash
   git push -u origin main
   ```

## Netlify Deployment

### Option 1: GitHub Integration (Recommended)
1. Log in to Netlify
2. Click "New site from Git"
3. Connect to GitHub and select your repository
4. Configure build settings:
   - Build command: `./build-all.sh`
   - Publish directory: `dist`
5. Click "Deploy site"

### Option 2: Manual Deploy
1. Build all projects locally:
   ```bash
   ./build-all.sh
   ```
2. Use Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

### Environment Variables
Add these in Netlify dashboard under Site settings > Environment variables:
- None required for basic deployment

## Cloudflare Pages Deployment

1. Log in to Cloudflare Dashboard
2. Go to Pages
3. Create a new project
4. Connect to your GitHub repository
5. Configure build settings:
   - Framework preset: None
   - Build command: `./build-all.sh`
   - Build output directory: `/`
6. Click "Save and Deploy"

## GitHub Actions Secrets

Add these secrets in your GitHub repository settings:

### For Netlify:
- `NETLIFY_AUTH_TOKEN`: Get from Netlify user settings
- `NETLIFY_SITE_ID`: Get from Netlify site settings

### For Cloudflare:
- `CLOUDFLARE_API_TOKEN`: Create in Cloudflare dashboard
- `CLOUDFLARE_ACCOUNT_ID`: Found in Cloudflare dashboard

## Direct Deployment Commands

### Deploy to Netlify (requires Netlify CLI):
```bash
netlify deploy --dir=prelander-wheel-netlify/dist --site=wheel-site-id
netlify deploy --dir=prelander-newsletters-netlify/dist --site=newsletters-site-id
netlify deploy --dir=prelander-scratch-netlify/dist --site=scratch-site-id
netlify deploy --dir=prelander-slot-netlify/dist --site=slot-site-id
```

### Deploy to Cloudflare (requires Wrangler CLI):
```bash
npm install -g wrangler
wrangler pages deploy dist --project-name=prelanders
```

## Verifying Deployment

After deployment, check:
1. All pages load correctly
2. Interactive elements work (wheel spin, scratch card, slot machine)
3. Responsive design on mobile devices
4. SSL certificates are active

## Troubleshooting

### Build Failures
- Ensure all dependencies are installed
- Check for syntax errors in JSX files
- Verify Node.js version compatibility (requires v16+)

### Deployment Issues
- Verify API tokens and credentials
- Check build logs for errors
- Ensure dist folders are created after build

### Performance
- Enable caching on CDN
- Optimize images if added
- Enable compression in deployment settings