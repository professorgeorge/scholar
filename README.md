# Dr. Babu George — Disciplinary Scholarship & Epistemic Portal

An interactive academic portal showcasing the scholarship, intellectual trajectory, foundational disciplines, and interconnections of **Dr. Babu George** (Alcorn State University), configured for immediate deployment to **Cloudflare Pages**.

---

## 🏛️ Epistemic Architecture

This portal is structured around a three-tier epistemic hierarchy:

```
[ Tier 1: Foundational Disciplines ]
    ├── Philosophy & Epistemology (Ontological critique, limits to growth, ethics of AI)
    ├── Psychology & Behavioral Science (Cognitive dissonance, place attachment, UTAUT-2)
    ├── Economics & Political Economy (Financial inclusion, platform economics)
    └── Sociology & Spatial Geographies (Border regimes, digital divides)
                 │
                 ▼
[ Tier 2: Strategic Imperatives & Organizational Transformations ]
    ├── Boardroom Governance & Stewardship
    ├── Institutional Metamorphosis & Change Management
    └── Disruptive Technology & AI Integration
                 │
                 ▼
[ Tier 3: Empirical Proving Grounds (Peripheral Laboratories) ]
    ├── High-Touch Service & Mobility Systems
    ├── Higher Education Institutions
    └── Decentralized Financial Infrastructures (DFS)
```

---

## 🚀 One-Click Deployment to Cloudflare Pages

### Option 1: Direct Command-Line Deployment (Fastest)

```bash
# 1. Build the production site
npm run build

# 2. Deploy directly to Cloudflare Pages via Wrangler CLI
npx wrangler pages deploy dist --project-name=babu-george-scholarship
```

### Option 2: Continuous Deployment via GitHub (Recommended)

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of scholarly portal"
   git remote add origin https://github.com/YOUR_USERNAME/babu-george-scholarship.git
   git push -u origin main
   ```
2. In the **Cloudflare Dashboard**, navigate to **Workers & Pages** $\rightarrow$ **Create application** $\rightarrow$ **Pages** $\rightarrow$ **Connect to Git**.
3. Select your repository and set:
   * **Framework preset:** `Vite`
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
4. Click **Save and Deploy**. Cloudflare will deploy to a global edge URL (e.g., `babu-george-scholarship.pages.dev`).
5. Under **Custom domains**, add `babugeorge.com` or your chosen academic domain. Cloudflare provisions and maintains free SSL certificates automatically.

---

## 💻 Local Development

```bash
# Start local dev server at http://localhost:3000
npm run dev

# Run production build
npm run build

# Preview production build locally
npm run preview
```

