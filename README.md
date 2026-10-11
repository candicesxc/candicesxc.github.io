# personal-website-2025

Static site for Candice Shen's homepage hosted on GitHub Pages.

## GitHub Pages setup
- Publish from the **main** branch with the root (`/`) folder selected.
- Confirm the `CNAME` file (at repository root) contains `candiceshen.com`.
- In GitHub Pages settings, set the custom domain to `candiceshen.com` and enforce HTTPS.

## Editing the home page

The home page is built from the source in `site/` (Vite + React + Tailwind). The files at the
repository root (`index.html`, `assets/`, `photos/`, `og.jpg`, `sitemap.xml`, `robots.txt`,
`llms.txt`) are its build output.

```bash
cd site
npm install
npm run dev      # preview at http://localhost:5183
npm run build    # writes site/dist
```

To publish, copy the contents of `site/dist/` to the repository root, replacing `index.html`
and the bundle files in `assets/`, then commit and push to `main`.

All copy lives in `site/src/content.js`; the countries on the map live in
`site/src/data/visited.js`. The image scripts in `site/scripts/` read original photos from
`Chapter N` folders that are kept outside this repository.
