# AIXA Presentation

Frontend presentation project built with Vite, Lit, Tailwind CSS, GSAP, and Three.js.

## Requirements

- Node.js 20+
- npm

## Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
```

Build output is generated in `dist/`.

## Preview Production Build

```bash
npm run preview
```

## Deploy to Vercel

### Option 1: Vercel Dashboard (Git Integration)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, click **Add New > Project** and import the repository.
3. Keep the default Vite settings (Vercel usually detects them automatically):
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**.

### Option 2: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Deploy from project root:
   ```bash
   vercel
   ```
3. For production deploys:
   ```bash
   vercel --prod
   ```

## Useful Scripts

- `npm run dev` - Start local development server
- `npm run build` - Create production build
- `npm run preview` - Preview the production build locally
