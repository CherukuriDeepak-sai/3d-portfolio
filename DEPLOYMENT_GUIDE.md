# GitHub Pages Deployment Guide

## Overview
Your 3D portfolio is configured to automatically deploy to GitHub Pages whenever you push code to the `main` branch. This guide explains the deployment process and how to make updates after launch.

## Current Status
- ✅ Repository: `https://github.com/CherukuriDeepak-sai/3d-portfolio`
- ✅ GitHub Actions workflow: `.github/workflows/deploy.yml` (configured)
- ✅ Build configuration: `vite.config.js` with base path `/3d-portfolio/`
- ⏳ Deployment: Ready after code is pushed to GitHub

## Step 1: Push Code to GitHub

Once you have valid GitHub authentication:

```bash
cd /workspaces/CherukuriDeepak-sai/reactjs18-3d-portfolio
git push -u origin main
```

This command:
1. Uploads all your code to GitHub
2. Automatically triggers the GitHub Actions workflow
3. Builds your portfolio for production
4. Deploys to GitHub Pages

## Step 2: Verify Deployment (2-5 minutes)

After pushing:

1. Visit: **`https://github.com/CherukuriDeepak-sai/3d-portfolio/actions`**
   - Watch the workflow progress
   - "Deploy to GitHub Pages" workflow should show green checkmark ✅

2. Access your live portfolio at:
   - **`https://CherukuriDeepak-sai.github.io/3d-portfolio/`**

## Making Updates After Deployment

### Adding New Certifications

1. Open `src/constants/index.ts`
2. Find the `certifications` array
3. Add a new object:
```typescript
{
  title: "Your Certification Title",
  provider: "Course Provider (e.g., Udemy, Coursera)",
  credentialType: "Professional Training" // or "Online Bootcamp", "Bootcamp", etc.
}
```
4. Save and commit:
```bash
git add src/constants/index.ts
git commit -m "Add new certification"
git push
```
5. GitHub Actions automatically deploys - check back in 2-5 minutes

### Adding New Experience/Education

1. Open `src/constants/index.ts`
2. Modify `experiences` or `education` arrays
3. For **active/current** positions, use dates like:
   - "Month 2024 - Present"
   - "Current"
   - "Expected 2025" (for future dates)
4. Timeline dots will automatically turn **green** for active, **yellow** for past
5. Push changes to trigger auto-deployment

### Updating Portfolio Text

1. Edit content in `src/constants/index.ts` or `src/constants/config.ts`
2. Commit and push:
```bash
git commit -am "Update portfolio content"
git push
```
3. Deployed within 2-5 minutes

### Adding New Projects

1. Open `src/constants/index.ts`
2. Add to the `projects` array with:
   - `name`, `description`, `tags`, `image_url`, `source_code_link`
3. Commit and push
4. Projects section updates automatically

## Understanding the Workflow

### What Happens When You Push:

```
You push → GitHub detects → Workflow triggers
    ↓
  npm install (dependencies)
    ↓
  npm run build (creates dist/ folder)
    ↓
  Deploy artifact → GitHub Pages
    ↓
  Live at github.io/3d-portfolio/
```

### Monitoring Deployment:
- **Real-time**: Visit `https://github.com/CherukuriDeepak-sai/3d-portfolio/actions`
- **Logs**: Click the workflow run to see build logs and debug any issues

## Configuration Details

### Base Path
- Your portfolio is deployed at `/3d-portfolio/` subdirectory
- `vite.config.js` has `base: "/3d-portfolio/"` configured
- All asset paths automatically adjusted

### Build Output
- Source files: `src/`
- Built files: `dist/` (created by `npm run build`)
- Only `dist/` deployed to GitHub Pages

## Troubleshooting

### Workflow Fails to Deploy
1. Visit https://github.com/CherukuriDeepak-sai/3d-portfolio/actions
2. Click the failed workflow
3. Check the error in "Deploy to GitHub Pages" job
4. Common issues:
   - Build failed: Check `npm run build` locally
   - Node version mismatch: Uses Node 20.x in workflow
   - File path issues: Ensure all imports are relative

### Portfolio Doesn't Update After Push
1. Wait 5 minutes (workflows can be slow)
2. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Check workflow status: https://github.com/CherukuriDeepak-sai/3d-portfolio/actions

### Local Build Works But Live Deployment Fails
1. Ensure `vite.config.js` has correct base path
2. Check `.github/workflows/deploy.yml` isn't modified
3. Clear npm cache: `npm cache clean --force`
4. Rebuild: `npm run build && npm run preview`

## Quick Reference: Common Tasks

| Task | File | Command |
|------|------|---------|
| Add Certification | `src/constants/index.ts` | `git commit -am "..." && git push` |
| Update Experience | `src/constants/index.ts` | `git commit -am "..." && git push` |
| Change Logo | `src/assets/logo.svg` | `git commit -am "..." && git push` |
| Modify Tool Icons | `src/assets/tech/` | `git commit -am "..." && git push` |
| Update Text Content | `src/constants/config.ts` | `git commit -am "..." && git push` |

All changes take 2-5 minutes to appear on your live site.

## Support

For issues:
1. Check GitHub Actions logs: https://github.com/CherukuriDeepak-sai/3d-portfolio/actions
2. Local test: `npm run build` then `npm run preview`
3. Verify changes: `git status` and `git diff`

---

**Your portfolio is production-ready! 🚀**
Push your code and watch it deploy automatically.
