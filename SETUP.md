# Setup: GitHub Pages and custom domain

Everything here is free. The site has no accounts or database: progress is saved in each visitor's browser.

## 1. Put the code on GitHub

The new site replaces the old one. The safest route is a branch in the existing repo:

```bash
git clone https://github.com/ArmandtErasmus/theactuarialedge.git
cd theactuarialedge
git checkout -b redesign
git rm -r -q .          # clears the old static site from this branch (it stays on main)
```

Copy everything from this `site/` folder into the repo root, except `node_modules/`, `dist/` and `public/data/`. Then:

```bash
npm install
npm run check
git add -A
git commit -m "Redesign: LeetCode-style practice platform"
git push -u origin redesign
```

Pushing to `redesign` runs the checks (Actions tab) without deploying. When you're happy, merge `redesign` into `main` to go live.

## 2. Turn on GitHub Pages

1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Under **Custom domain**, keep `theactuarialedge.com`. The `public/CNAME` file keeps it set on every deploy.
4. Tick **Enforce HTTPS** once the certificate is ready.

Every push to `main` now runs `.github/workflows/deploy.yml`. It checks the content, runs the unit tests, builds the site, smoke-tests the build in a browser, and only then deploys.

**No custom domain?** For `https://<user>.github.io/<repo>/`, add a repository variable `BASE_PATH` = `/<repo>/` (Settings → Secrets and variables → Actions → Variables) and delete `public/CNAME`.
